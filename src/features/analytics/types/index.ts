export interface Metrics {
  totalUsers: number;
  usersTrend: number;
  activeSessions: number;
  sessionsTrend: number;
  averageLoad: number;
  loadTrend: number;
  responseTime: number;
  responseTrend: number;
}

export interface TimeSeriesData {
  labels: string[];
  users: number[];
  load: number[];
}

export interface Analytics {
  metrics: Metrics;
  timeSeriesData: TimeSeriesData;
}