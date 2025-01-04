import React from 'react';
import { Settings } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';

export function GeneralSettings() {
  const { settings, updateSettings, loading, error } = useSettings();

  if (loading) {
    return <div className="animate-pulse">Loading settings...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          General Settings
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Dashboard Name
          </label>
          <input
            type="text"
            value={settings.dashboardName}
            onChange={(e) => updateSettings({ dashboardName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
              dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Default Theme
          </label>
          <select
            value={settings.defaultTheme}
            onChange={(e) => updateSettings({ defaultTheme: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
              dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.enableNotifications}
              onChange={(e) => updateSettings({ enableNotifications: e.target.checked })}
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Enable Notifications
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}