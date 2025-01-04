import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import type { APIConnection } from '../types';

export function useAPIConnections() {
  const [connections, setConnections] = useState<APIConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('api_connections')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setConnections(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load API connections');
    } finally {
      setLoading(false);
    }
  };

  const deleteConnection = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('api_connections')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      setConnections(prev => prev.filter(conn => conn.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete connection');
    }
  };

  return {
    connections,
    loading,
    error,
    deleteConnection,
    refresh: fetchConnections
  };
}