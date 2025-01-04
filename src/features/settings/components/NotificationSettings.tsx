import React from 'react';
import { Switch } from '@/components/shared/form/Switch';
import { SettingsSection } from './base/SettingsSection';
import type { NotificationConfig } from '../types';

interface NotificationSettingsProps {
  notifications: NotificationConfig;
  onUpdate: (notifications: NotificationConfig) => void;
}

export function NotificationSettings({ notifications, onUpdate }: NotificationSettingsProps) {
  return (
    <SettingsSection title="Notifications">
      <div className="space-y-4">
        <Switch
          label="Alert Notifications"
          description="Receive notifications for system alerts and warnings"
          checked={notifications.alerts}
          onChange={(alerts) => onUpdate({ ...notifications, alerts })}
        />
        
        <Switch
          label="Update Notifications"
          description="Get notified about system updates and changes"
          checked={notifications.updates}
          onChange={(updates) => onUpdate({ ...notifications, updates })}
        />
        
        <Switch
          label="Performance Alerts"
          description="Notifications for performance issues and thresholds"
          checked={notifications.performance}
          onChange={(performance) => onUpdate({ ...notifications, performance })}
        />
      </div>
    </SettingsSection>
  );
}