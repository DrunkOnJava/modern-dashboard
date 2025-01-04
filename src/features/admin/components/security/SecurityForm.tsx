```typescript
import React from 'react';
import { Shield } from 'lucide-react';
import type { AdminSettings } from '../../types';

interface SecurityFormProps {
  settings: AdminSettings;
  onUpdate: (settings: Partial<AdminSettings>) => Promise<void>;
}

export function SecurityForm({ settings, onUpdate }: SecurityFormProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Security Settings
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            min="5"
            max="1440"
            value={settings.sessionTimeout}
            onChange={(e) => onUpdate({ sessionTimeout: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
              dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Max Login Attempts
          </label>
          <input
            type="number"
            min="3"
            max="10"
            value={settings.maxLoginAttempts}
            onChange={(e) => onUpdate({ maxLoginAttempts: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
              dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Require MFA
          </span>
          <button
            onClick={() => onUpdate({ requireMFA: !settings.requireMFA })}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full 
              border-2 border-transparent transition-colors duration-200 ease-in-out 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${settings.requireMFA ? 'bg-blue-600' : 'bg-gray-200'}`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full 
                bg-white shadow ring-0 transition duration-200 ease-in-out
                ${settings.requireMFA ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
```