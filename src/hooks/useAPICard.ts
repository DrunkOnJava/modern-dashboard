import { useState, useEffect } from 'react';
import type { APIConnection } from '../types/dashboard';

interface UseAPICardOptions<T> {
  fetchData: (connection: APIConnection, config: any) => Promise<T>;
  connection: APIConnection;
  config: any;
  enabled?: boolean;
  maxRetries?: number;
  retryDelay?: number;
}

export function useAPICard<T>({
  fetchData,
  connection,
  config,
  enabled = true,
  maxRetries = 3,
  retryDelay = 1000
}: UseAPICardOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    // Skip if not enabled or missing required config
    if (!enabled) {
      setLoading(false);
      return () => { mounted = false; };
    }

    // Validate connection and config
    if (!connection?.key || !connection?.endpoint) {
      setError(`${connection?.name || 'API'}: Invalid configuration - missing key or endpoint`);
      setLoading(false);
      return () => { mounted = false; };
    }

    if (!config) {
      setError(`${connection.name}: Missing configuration parameters`);
      setLoading(false);
      return () => { mounted = false; };
    }

    const exponentialDelay = (attempt: number) => {
      return Math.min(retryDelay * Math.pow(2, attempt), 60000);
    };

    const fetchWithRetry = async () => {
      try {
        for (let i = 0; i < maxRetries; i++) {
          try {
            // Add delay between retries
            if (i > 0) {
              setRetryCount(i);
              await new Promise(resolve => setTimeout(resolve, exponentialDelay(i)));
            }

            // Check if component is still mounted
            if (!mounted) return;

            const result = await fetchData(connection, config);
            if (!mounted) return;
            
            setData(result);
            setError(null);
            setRetryCount(0);
            return;
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            
            // Don't retry for certain error types
            if (errorMessage.includes('required') || 
                errorMessage.includes('Invalid configuration') ||
                errorMessage.includes('API call frequency exceeded')) {
              setError(`${connection.name}: ${errorMessage}`);
              return;
            }

            if (i === maxRetries - 1) {
              setError(`${connection.name}: ${errorMessage}`);
              setRetryCount(0);
              return;
            }

            // Wait longer for rate limit errors
            if (errorMessage.includes('rate limit')) {
              await new Promise(resolve => setTimeout(resolve, 30000));
            }
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const fetch = async () => {
      if (!mounted) return;
      setLoading(true);
      await fetchWithRetry();
    };

    fetch();

    // Set up refresh interval if specified
    const interval = connection.refreshInterval && connection.refreshInterval >= 5000
      ? setInterval(() => {
          if (!loading && mounted) {
            fetch();
          }
        }, Math.max(connection.refreshInterval, 5000))
      : null;

    return () => {
      mounted = false;
      if (interval) clearInterval(interval);
    };
  }, [connection, config, enabled, maxRetries, retryDelay]);

  return {
    data,
    error,
    loading,
    retrying: retryCount > 0,
    retryCount
  };
}