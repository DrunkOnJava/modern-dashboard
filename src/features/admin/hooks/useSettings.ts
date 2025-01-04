import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

interface Settings {
  dashboardName: string;
  defaultTheme: 'light' | 'dark' | 'system';
  enableNotifications: boolean;
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    dashboardName: '',
    defaultTheme: 'system',
    enableNotifications: true
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
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (updates: Partial<Settings>) => {
    try {
      const { error } = await supabase
        .from('admin_settings')
        .update(updates)
        .eq('id', 1);

      if (error) throw error;
      setSettings(prev => ({ ...prev, ...updates }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings');
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