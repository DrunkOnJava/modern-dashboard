```typescript
import { supabase } from '../../../lib/supabase';
import type { AuditLog } from '../types';

export async function logAdminAction(
  userId: string,
  action: string,
  details: Record<string, any>,
  ipAddress: string
): Promise<void> {
  await supabase
    .from('activity_logs')
    .insert({
      user_id: userId,
      action,
      details,
      ip_address: ipAddress
    });
}

export async function getAuditLogs(
  filters?: Partial<AuditLog>
): Promise<AuditLog[]> {
  const query = supabase
    .from('activity_logs')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.userId) {
    query.eq('user_id', filters.userId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}
```