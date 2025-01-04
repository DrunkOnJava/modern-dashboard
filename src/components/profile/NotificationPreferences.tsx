import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export function NotificationPreferences() {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'security',
      label: 'Security Alerts',
      description: 'Get notified about important security updates and login attempts',
      enabled: true
    },
    {
      id: 'updates',
      label: 'Product Updates',
      description: 'Stay informed about new features and improvements',
      enabled: true
    },
    {
      id: 'activity',
      label: 'Account Activity',
      description: 'Receive notifications about important account activities',
      enabled: false
    }
  ]);

  const handleToggle = async (id: string) => {
    setLoading(true);
    try {
      const newSettings = settings.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      );
      setSettings(newSettings);
      addToast('success', 'Notification preferences updated');
    } catch (error) {
      addToast('error', 'Failed to update notification preferences');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
        <Bell className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notification Preferences</h3>
      </div>

      <div className="space-y-4">
        {settings.map(setting => (
          <div key={setting.id} className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {setting.label}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {setting.description}
              </p>
            </div>
            <div className="ml-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={setting.enabled}
                  onChange={() => handleToggle(setting.id)}
                  disabled={loading}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
                  dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                  after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                  after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}