import React from 'react';
import { Line } from 'react-chartjs-2';
import type { TimeSeriesData } from '../../types';

interface TimeSeriesChartProps {
  data: TimeSeriesData;
}

export function TimeSeriesChart({ data }: TimeSeriesChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Users',
        data: data.users,
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4
      },
      {
        label: 'Load',
        data: data.load,
        borderColor: 'rgb(234, 88, 12)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
        System Performance
      </h3>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}