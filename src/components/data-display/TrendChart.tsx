import React from 'react';
import { ChartContainer } from '../charts/ChartContainer';
import { AreaChart } from '../charts/AreaChart';

interface TrendData {
  timestamp: string;
  value: number;
}

interface TrendChartProps {
  title: string;
  data: TrendData[];
  height?: number;
  color?: string;
  className?: string;
}

export function TrendChart({
  title,
  data,
  height = 300,
  color = '#3B82F6',
  className = ''
}: TrendChartProps) {
  const chartData = data.map(item => ({
    x: new Date(item.timestamp).toLocaleDateString(),
    y: item.value
  }));

  return (
    <ChartContainer title={title} className={className}>
      <AreaChart
        data={chartData}
        height={height}
        color={color}
        showGrid
        showLabels
      />
    </ChartContainer>
  );
}