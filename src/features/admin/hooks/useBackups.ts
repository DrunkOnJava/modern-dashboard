import { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { logAdminAction } from '../utils/auditLog';

export function useBackups() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBackup = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: tables } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');

      const backup: Record<string, any> = {};

      for (const { table_name } of tables || []) {
        const { data } = await supabase
          .from(table_name)
          .select('*');
        backup[table_name] = data;
      }

      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      await logAdminAction('CREATE_BACKUP', null, {});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create backup');
    } finally {
      setLoading(false);
    }
  };

  const restoreBackup = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const content = await file.text();
      const backup = JSON.parse(content);

      for (const [table, data] of Object.entries(backup)) {
        await supabase
          .from(table)
          .upsert(data as any[]);
      }

      await logAdminAction('RESTORE_BACKUP', null, { filename: file.name });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to restore backup');
    } finally {
      setLoading(false);
    }
  };

  return {
    createBackup,
    restoreBackup,
    loading,
    error
  };
}