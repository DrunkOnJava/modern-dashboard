import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Database } from '../types/database';

type UserPreferences = Database['public']['Tables']['user_preferences']['Row'];

export function useUserPreferences() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchPreferences = async () => {
      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setPreferences(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load preferences');
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel(`user_preferences:${user.id}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public',
        table: 'user_preferences',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        setPreferences(payload.new as UserPreferences);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user) throw new Error('No user logged in');

    try {
      const { error } = await supabase
        .from('user_preferences')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update preferences');
    }
  };

  return {
    preferences,
    loading,
    error,
    updatePreferences
  };
}