```typescript
import React from 'react';
import { UserList } from '../components/users/UserList';

export function UserManagement() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">User Management</h1>
      <UserList />
    </div>
  );
}
```