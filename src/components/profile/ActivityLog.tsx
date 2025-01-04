import React from 'react';
import { Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

export function ActivityLog() {
  // This would typically come from an API
  const activities: Activity[] = [
    {
      id: '1',
      type: 'update',
      description: 'Updated profile picture',
      timestamp: '2024-01-10T14:30:00Z'
    },
    {
      id: '2',
      type: 'login',
      description: 'Logged in from new device',
      timestamp: '2024-01-09T10:15:00Z'
    },
    {
      id: '3',
      type: 'settings',
      description: 'Changed notification settings',
      timestamp: '2024-01-08T16:45:00Z'
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start space-x-3 py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
        >
          <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 dark:text-white">
              {activity.description}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(activity.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}