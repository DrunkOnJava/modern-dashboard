```typescript
import React from 'react';
import { Ban, Edit, Trash2 } from 'lucide-react';
import { logAdminAction } from '../../utils/auditLog';
import type { AdminUser } from '../../types';

interface UserActionsProps {
  user: AdminUser;
  onUpdate: () => void;
}

export function UserActions({ user, onUpdate }: UserActionsProps) {
  const handleSuspend = async () => {
    try {
      await supabase
        .from('profiles')
        .update({ suspended: true })
        .eq('id', user.id);

      await logAdminAction(
        user.id,
        'SUSPEND_USER',
        { userId: user.id },
        window.location.hostname
      );
      
      onUpdate();
    } catch (error) {
      console.error('Failed to suspend user:', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {/* Handle edit */}}
        className="p-1 text-gray-400 hover:text-gray-500"
        title="Edit user"
      >
        <Edit className="h-4 w-4" />
      </button>
      <button
        onClick={handleSuspend}
        className="p-1 text-gray-400 hover:text-red-500"
        title="Suspend user"
      >
        <Ban className="h-4 w-4" />
      </button>
      <button
        onClick={() => {/* Handle delete */}}
        className="p-1 text-gray-400 hover:text-red-500"
        title="Delete user"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
```