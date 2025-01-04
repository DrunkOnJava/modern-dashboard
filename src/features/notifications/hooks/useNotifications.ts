import { useState, useEffect } from 'react';
import { fetchNotifications, markNotificationAsRead } from '../services/notifications';
import type { Notification, NotificationFilters } from '../types';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filters, setFilters] = useState<NotificationFilters>({
    showRead: true,
    showUnread: true
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchNotifications();
      setNotifications(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredNotifications = notifications.filter(notification => {
    if (notification.read && !filters.showRead) return false;
    if (!notification.read && !filters.showUnread) return false;
    return true;
  });

  const markAsRead = async (id: string) => {
    await markNotificationAsRead(id);
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications: filteredNotifications,
    filters,
    updateFilters: setFilters,
    markAsRead,
    clearAll
  };
}