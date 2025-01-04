import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

interface Alert {
  id: string;
  type: 'error' | 'success' | 'info';
  message: string;
  timestamp: string;
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const { data, error } = await supabase
          .from('system_alerts')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(10);

        if (error) throw error;
        setAlerts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load alerts');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
    const subscription = supabase
      .channel('system_alerts')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public',
        table: 'system_alerts'
      }, () => {
        fetchAlerts();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { alerts, loading, error };
}