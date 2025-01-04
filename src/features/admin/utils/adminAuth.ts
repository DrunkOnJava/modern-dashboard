```typescript
import { supabase } from '../../../lib/supabase';

export async function checkAdminPermission(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error || !data) return false;
  return ['admin', 'super_admin'].includes(data.role);
}

export async function validateAdminSession(sessionId: string): Promise<boolean> {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session) return false;
  if (session.expires_at && new Date(session.expires_at) < new Date()) {
    return false;
  }
  
  return session.access_token === sessionId;
}

export function isIpWhitelisted(ip: string, whitelist: string[]): boolean {
  return whitelist.length === 0 || whitelist.includes(ip);
}
```