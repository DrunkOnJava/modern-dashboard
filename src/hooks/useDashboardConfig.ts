import { useState, useEffect } from 'react';
import type { DashboardConfig } from '../types/dashboard';

const DEFAULT_CONFIG: DashboardConfig = {
  widgets: [],
  layout: {
    type: 'grid',
    spacing: 4
  },
  apiConnections: []
};

export function useDashboardConfig() {
  const [config, setConfig] = useState<DashboardConfig>(() => {
    const saved = localStorage.getItem('dashboardConfig');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem('dashboardConfig', JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: DashboardConfig) => {
    setConfig(newConfig);
  };

  return { config, updateConfig };
}