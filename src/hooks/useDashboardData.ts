import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Database } from '../types/database';

type Dashboard = Database['public']['Tables']['dashboards']['Row'];
type DashboardWithCards = Dashboard & {
  dashboard_cards: Database['public']['Tables']['dashboard_cards']['Row'][];
};

export function useDashboardData(dashboardId?: string) {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardWithCards | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !dashboardId) return;

    const fetchDashboard = async () => {
      try {
        const { data, error } = await supabase
          .from('dashboards')
          .select(`
            *,
            dashboard_cards (*)
          `)
          .eq('id', dashboardId)
          .single();

        if (error) throw error;
        setDashboard(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

    // Subscribe to realtime changes
    const dashboardSubscription = supabase
      .channel(`dashboard:${dashboardId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'dashboards',
        filter: `id=eq.${dashboardId}`
      }, (payload) => {
        setDashboard(prev => prev ? { ...prev, ...payload.new } : null);
      })
      .subscribe();

    const cardsSubscription = supabase
      .channel(`dashboard_cards:${dashboardId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'dashboard_cards',
        filter: `dashboard_id=eq.${dashboardId}`
      }, async () => {
        // Refetch all cards to maintain correct order
        const { data } = await supabase
          .from('dashboard_cards')
          .select('*')
          .eq('dashboard_id', dashboardId)
          .order('position');

        setDashboard(prev => prev ? { ...prev, dashboard_cards: data || [] } : null);
      })
      .subscribe();

    return () => {
      dashboardSubscription.unsubscribe();
      cardsSubscription.unsubscribe();
    };
  }, [user, dashboardId]);

  return { dashboard, loading, error };
}