```typescript
import React from 'react';
import { GeneralSettings } from '../components/settings/GeneralSettings';
import { BackupSettings } from '../components/settings/BackupSettings';

export function SystemSettings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">System Settings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GeneralSettings />
        <BackupSettings />
      </div>
    </div>
  );
}
```