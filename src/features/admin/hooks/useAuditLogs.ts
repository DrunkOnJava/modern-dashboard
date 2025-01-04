import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import type { AuditLog } from '../types';

interface AuditLogFilters {
  action?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
}

export function useAuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AuditLogFilters>({});

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  const fetchLogs = async () => {
    try {
      let query = supabase
        .from('admin_audit_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters.action) {
        query = query.ilike('action', `%${filters.action}%`);
      }
      if (filters.userId) {
        query = query.eq('user_id', filters.userId);
      }
      if (filters.startDate) {
        query = query.gte('created_at', filters.startDate);
      }
      if (filters.endDate) {
        query = query.lte('created_at', filters.endDate);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setLogs(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  };

  return { logs, loading, error, filters, setFilters };
}