import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Container } from '@/components/shared';
import { MetricsOverview } from './MetricsOverview';
import { TimeSeriesChart } from './charts/TimeSeriesChart';
import { useAnalytics } from '../hooks/useAnalytics';

export function AnalyticsPanel() {
  const { metrics, timeSeriesData } = useAnalytics();

  return (
    <Container className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics</h2>
      </div>

      <div className="space-y-8">
        <MetricsOverview metrics={metrics} />
        <TimeSeriesChart data={timeSeriesData} />
      </div>
    </Container>
  );
}