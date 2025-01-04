```typescript
import React from 'react';
import type { AdminUser } from '../../types';

interface UserRoleBadgeProps {
  role: AdminUser['role'];
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  const colors = {
    admin: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    super_admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[role]}`}>
      {role.replace('_', ' ')}
    </span>
  );
}
```