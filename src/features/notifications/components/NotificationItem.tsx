import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { formatRelativeTime } from '../utils/format';
import type { Notification } from '../types';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle
};

const colorMap = {
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500'
};

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const Icon = iconMap[notification.type];

  return (
    <div 
      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer
        ${notification.read ? 'opacity-75' : ''}`}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 mt-0.5 ${colorMap[notification.type]}`} />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {notification.title}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatRelativeTime(notification.timestamp)}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {notification.message}
          </p>
        </div>
      </div>
    </div>
  );
}