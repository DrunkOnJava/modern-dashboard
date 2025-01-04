import React from 'react';
import { Bell } from 'lucide-react';
import { NotificationList } from './NotificationList';
import { NotificationFilters } from './NotificationFilters';
import { useNotifications } from '../hooks/useNotifications';

export function NotificationCenter() {
  const { 
    notifications, 
    filters,
    updateFilters,
    markAsRead,
    clearAll 
  } = useNotifications();

  return (
    <div className="fixed right-4 top-4 z-50">
      <div className="relative">
        <button
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          {notifications.some(n => !n.read) && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          )}
        </button>

        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Notifications
              </h3>
              <button
                onClick={clearAll}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Clear all
              </button>
            </div>
            <NotificationFilters
              filters={filters}
              onUpdate={updateFilters}
            />
          </div>

          <NotificationList
            notifications={notifications}
            onMarkAsRead={markAsRead}
          />
        </div>
      </div>
    </div>
  );
}