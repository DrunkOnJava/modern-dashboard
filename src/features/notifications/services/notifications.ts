import type { Notification } from '../types';

// Simulated API calls
export async function fetchNotifications(): Promise<Notification[]> {
  // In a real app, this would be an API call
  return [
    {
      id: '1',
      type: 'info',
      title: 'System Update',
      message: 'A new system update is available',
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'High CPU Usage',
      message: 'CPU usage has exceeded 80%',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: true
    }
  ];
}

export async function markNotificationAsRead(id: string): Promise<void> {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 100));
}