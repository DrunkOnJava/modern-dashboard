```typescript
import React from 'react';
import { AuditLogViewer } from '../components/audit/AuditLogViewer';

export function ActivityLogs() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Activity Logs</h1>
      <AuditLogViewer />
    </div>
  );
}
```