```typescript
import React from 'react';
import { SecurityForm } from '../components/security/SecurityForm';

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Security Settings</h1>
      <SecurityForm />
    </div>
  );
}
```