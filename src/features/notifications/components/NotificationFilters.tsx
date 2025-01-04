import React from 'react';
import type { NotificationFilters as Filters } from '../types';

interface NotificationFiltersProps {
  filters: Filters;
  onUpdate: (filters: Filters) => void;
}

export function NotificationFilters({ filters, onUpdate }: NotificationFiltersProps) {
  return (
    <div className="flex gap-2 mt-2">
      <button
        onClick={() => onUpdate({ ...filters, showRead: !filters.showRead })}
        className={`px-2 py-1 text-xs rounded-full transition-colors
          ${filters.showRead
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}
      >
        Read
      </button>
      <button
        onClick={() => onUpdate({ ...filters, showUnread: !filters.showUnread })}
        className={`px-2 py-1 text-xs rounded-full transition-colors
          ${filters.showUnread
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}
      >
        Unread
      </button>
    </div>
  );
}