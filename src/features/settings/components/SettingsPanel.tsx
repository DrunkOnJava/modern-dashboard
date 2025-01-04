import React from 'react';
import { Settings } from 'lucide-react';
import { Container } from '@/components/shared';
import { ThemeSettings } from './ThemeSettings';
import { NotificationSettings } from './NotificationSettings';
import { ExportSettings } from './ExportSettings';
import { useSettings } from '../hooks/useSettings';

export function SettingsPanel() {
  const { settings, updateSettings } = useSettings();

  return (
    <Container className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h2>
      </div>

      <div className="space-y-8">
        <ThemeSettings
          theme={settings.theme}
          onUpdate={(theme) => updateSettings({ theme })}
        />
        
        <NotificationSettings
          notifications={settings.notifications}
          onUpdate={(notifications) => updateSettings({ notifications })}
        />
        
        <ExportSettings
          exportConfig={settings.exportConfig}
          onUpdate={(exportConfig) => updateSettings({ exportConfig })}
        />
      </div>
    </Container>
  );
}