import React from 'react';
import { ChartContainer } from '../charts/ChartContainer';
import { BarChart } from '../charts/BarChart';

interface ComparisonData {
  label: string;
  current: number;
  previous: number;
}

interface ComparisonChartProps {
  title: string;
  data: ComparisonData[];
  height?: number;
  className?: string;
}

export function ComparisonChart({
  title,
  data,
  height = 300,
  className = ''
}: ComparisonChartProps) {
  const chartData = data.flatMap(item => [
    { label: `${item.label} (Current)`, value: item.current },
    { label: `${item.label} (Previous)`, value: item.previous }
  ]);

  return (
    <ChartContainer title={title} className={className}>
      <BarChart
        data={chartData}
        height={height}
        color="#3B82F6"
        showValues
      />
    </ChartContainer>
  );
}