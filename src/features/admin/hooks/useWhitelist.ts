```typescript
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { logAdminAction } from '../utils/auditLog';

export function useWhitelist() {
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWhitelist();
  }, []);

  const fetchWhitelist = async () => {
    try {
      const { data, error } = await supabase
        .from('ip_whitelist')
        .select('ip_address');

      if (error) throw error;
      setWhitelist(data.map(item => item.ip_address));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load IP whitelist');
    } finally {
      setLoading(false);
    }
  };

  const addIp = async (ip: string) => {
    try {
      const { error } = await supabase
        .from('ip_whitelist')
        .insert({ ip_address: ip });

      if (error) throw error;

      await logAdminAction('ADD_IP_WHITELIST', null, { ip });
      setWhitelist(prev => [...prev, ip]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add IP');
    }
  };

  const removeIp = async (ip: string) => {
    try {
      const { error } = await supabase
        .from('ip_whitelist')
        .delete()
        .eq('ip_address', ip);

      if (error) throw error;

      await logAdminAction('REMOVE_IP_WHITELIST', null, { ip });
      setWhitelist(prev => prev.filter(item => item !== ip));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove IP');
    }
  };

  return {
    whitelist,
    loading,
    error,
    addIp,
    removeIp
  };
}
```