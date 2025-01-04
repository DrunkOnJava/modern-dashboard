import { useState, useEffect } from 'react';
import { fetchAnalytics } from '../services/analytics';
import type { Analytics } from '../types';

const REFRESH_INTERVAL = 30000; // 30 seconds

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics>({
    metrics: {
      totalUsers: 0,
      usersTrend: 0,
      activeSessions: 0,
      sessionsTrend: 0,
      averageLoad: 0,
      loadTrend: 0,
      responseTime: 0,
      responseTrend: 0
    },
    timeSeriesData: {
      labels: [],
      users: [],
      load: []
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAnalytics();
      setAnalytics(data);
    };

    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return analytics;
}