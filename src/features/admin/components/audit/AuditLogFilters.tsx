import React from 'react';

interface AuditLogFilters {
  action?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
}

interface AuditLogFiltersProps {
  filters: AuditLogFilters;
  onFilterChange: (filters: AuditLogFilters) => void;
}

export function AuditLogFilters({ filters, onFilterChange }: AuditLogFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <input
        type="text"
        placeholder="Filter by action"
        value={filters.action || ''}
        onChange={(e) => onFilterChange({ ...filters, action: e.target.value })}
        className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
      />
      <input
        type="text"
        placeholder="Filter by user ID"
        value={filters.userId || ''}
        onChange={(e) => onFilterChange({ ...filters, userId: e.target.value })}
        className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
      />
      <input
        type="date"
        value={filters.startDate || ''}
        onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value })}
        className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
      />
      <input
        type="date"
        value={filters.endDate || ''}
        onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value })}
        className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
      />
    </div>
  );
}