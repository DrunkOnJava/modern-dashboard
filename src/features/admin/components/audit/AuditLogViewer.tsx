import React from 'react';
import { useAuditLogs } from '../../hooks/useAuditLogs';
import { AuditLogTable } from './AuditLogTable';
import { AuditLogFilters } from './AuditLogFilters';

export function AuditLogViewer() {
  const { logs, loading, error, filters, setFilters } = useAuditLogs();

  if (loading) {
    return <div className="animate-pulse">Loading audit logs...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <AuditLogFilters filters={filters} onFilterChange={setFilters} />
      <AuditLogTable logs={logs} />
    </div>
  );
}