import { useState, useEffect } from 'react';
import type { Settings } from '../types';

const DEFAULT_SETTINGS: Settings = {
  theme: {
    mode: 'system'
  },
  notifications: {
    alerts: true,
    updates: true,
    performance: true
  },
  exportConfig: {
    format: 'json',
    autoExport: 'never'
  }
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('dashboardSettings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return { settings, updateSettings };
}