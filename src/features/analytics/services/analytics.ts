import type { Analytics } from '../types';

// Simulated API call
export async function fetchAnalytics(): Promise<Analytics> {
  // In a real application, this would be an API call
  return {
    metrics: {
      totalUsers: Math.floor(Math.random() * 1000),
      usersTrend: (Math.random() * 20) - 10,
      activeSessions: Math.floor(Math.random() * 500),
      sessionsTrend: (Math.random() * 20) - 10,
      averageLoad: Math.random() * 100,
      loadTrend: (Math.random() * 20) - 10,
      responseTime: Math.floor(Math.random() * 200),
      responseTrend: (Math.random() * 20) - 10
    },
    timeSeriesData: {
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      users: Array.from({ length: 24 }, () => Math.floor(Math.random() * 1000)),
      load: Array.from({ length: 24 }, () => Math.random() * 100)
    }
  };
}