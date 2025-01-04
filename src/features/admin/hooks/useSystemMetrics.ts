import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

interface SystemMetrics {
  cpuUsage: number;
  cpuTrend: number;
  memoryUsage: number;
  memoryTrend: number;
  requestCount: number;
  requestTrend: number;
}

export function useSystemMetrics() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsage: 0,
    cpuTrend: 0,
    memoryUsage: 0,
    memoryTrend: 0,
    requestCount: 0,
    requestTrend: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data, error } = await supabase
          .from('system_metrics')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;
        setMetrics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load system metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { metrics, loading, error };
}