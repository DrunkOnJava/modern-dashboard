import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { API_CONFIGS } from '../utils/apiConfig';
import type { APIConnection } from '../types/dashboard';

export function useAPIConnection(provider: string) {
  const { user } = useAuth();
  const [connection, setConnection] = useState<APIConnection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchConnection = async () => {
      try {
        // For development/demo, use local config
        if (!user || import.meta.env.DEV) {
          const config = API_CONFIGS[provider];
          if (!config) {
            throw new Error(`No configuration found for ${provider}`);
          }
          if (mounted) {
            setConnection(config);
            setError(null);
          }
          return;
        }

        // In production, fetch from Supabase
        const { data, error: fetchError } = await supabase
          .from('api_configs')
          .select('*')
          .eq('user_id', user.id)
          .eq('provider', provider)
          .eq('enabled', true)
          .single();

        if (fetchError) throw fetchError;

        if (data) {
          // Decrypt API key
          const { data: decryptedKey, error: decryptError } = await supabase.rpc(
            'decrypt_api_key',
            { config_id: data.id }
          );

          if (decryptError) throw decryptError;

          if (mounted) {
            setConnection({
              id: data.id,
              name: data.name,
              endpoint: data.endpoint,
              key: decryptedKey,
              refreshInterval: data.refresh_interval
            });
            setError(null);
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load API configuration');
          setConnection(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchConnection();

    return () => {
      mounted = false;
    };
  }, [user, provider]);

  return { connection, loading, error };
}