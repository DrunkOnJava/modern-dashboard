import React from 'react';
import { Cpu, HardDrive, Activity } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { useSystemMetrics } from '../../hooks/useSystemMetrics';

export function SystemMetrics() {
  const { metrics, loading, error } = useSystemMetrics();

  if (loading) {
    return <div className="animate-pulse">Loading system metrics...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="CPU Usage"
        value={`${metrics.cpuUsage}%`}
        icon={Cpu}
        trend={metrics.cpuTrend}
        color="blue"
      />
      <MetricCard
        title="Memory Usage"
        value={`${metrics.memoryUsage}%`}
        icon={HardDrive}
        trend={metrics.memoryTrend}
        color="green"
      />
      <MetricCard
        title="API Requests"
        value={metrics.requestCount}
        icon={Activity}
        trend={metrics.requestTrend}
        color="purple"
      />
    </div>
  );
}