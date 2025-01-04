import React from 'react';
import { Grid } from '@/components/shared';
import { MetricCard } from './cards/MetricCard';
import type { Metrics } from '../types';

interface MetricsOverviewProps {
  metrics: Metrics;
}

export function MetricsOverview({ metrics }: MetricsOverviewProps) {
  return (
    <Grid cols={4} gap={4}>
      <MetricCard
        title="Total Users"
        value={metrics.totalUsers}
        trend={metrics.usersTrend}
        type="number"
      />
      <MetricCard
        title="Active Sessions"
        value={metrics.activeSessions}
        trend={metrics.sessionsTrend}
        type="number"
      />
      <MetricCard
        title="Average Load"
        value={metrics.averageLoad}
        trend={metrics.loadTrend}
        type="percentage"
      />
      <MetricCard
        title="Response Time"
        value={metrics.responseTime}
        trend={metrics.responseTrend}
        type="time"
        unit="ms"
      />
    </Grid>
  );
}