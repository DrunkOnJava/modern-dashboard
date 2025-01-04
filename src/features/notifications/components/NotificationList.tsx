import React from 'react';
import { NotificationItem } from './NotificationItem';
import type { Notification } from '../types';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export function NotificationList({ notifications, onMarkAsRead }: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        No notifications
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
}