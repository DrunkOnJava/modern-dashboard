import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useAlerts } from '../../hooks/useAlerts';

export function AlertsLog() {
  const { alerts, loading, error } = useAlerts();

  if (loading) {
    return <div className="animate-pulse">Loading alerts...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const icons = {
    error: AlertTriangle,
    success: CheckCircle,
    info: Info
  };

  const colors = {
    error: 'text-red-500',
    success: 'text-green-500',
    info: 'text-blue-500'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">System Alerts</h3>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {alerts.map((alert) => {
          const Icon = icons[alert.type];
          return (
            <div key={alert.id} className="p-4">
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 mt-0.5 ${colors[alert.type]}`} />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {alert.message}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}