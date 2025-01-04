```typescript
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { logAdminAction } from '../utils/auditLog';
import type { AdminSettings } from '../types';

export function useSecuritySettings() {
  const [settings, setSettings] = useState<AdminSettings>({
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    requireMFA: false,
    ipWhitelistEnabled: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load security settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (updates: Partial<AdminSettings>) => {
    try {
      const { error } = await supabase
        .from('admin_settings')
        .update(updates)
        .eq('id', 1);

      if (error) throw error;

      await logAdminAction(
        'UPDATE_SECURITY_SETTINGS',
        null,
        { updates }
      );

      setSettings(prev => ({ ...prev, ...updates }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update security settings');
      throw err;
    }
  };

  return {
    settings,
    updateSettings,
    loading,
    error
  };
}
```