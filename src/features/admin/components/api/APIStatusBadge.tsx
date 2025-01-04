import React from 'react';

interface APIStatusBadgeProps {
  enabled: boolean;
}

export function APIStatusBadge({ enabled }: APIStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${enabled
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        }`}
    >
      {enabled ? 'Active' : 'Inactive'}
    </span>
  );
}