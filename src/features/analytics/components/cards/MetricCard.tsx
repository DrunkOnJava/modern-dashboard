import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatMetricValue } from '../../utils/format';

interface MetricCardProps {
  title: string;
  value: number;
  trend?: number;
  type: 'number' | 'percentage' | 'time' | 'currency';
  unit?: string;
}

export function MetricCard({ title, value, trend, type, unit }: MetricCardProps) {
  const formattedValue = formatMetricValue(value, type, unit);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {formattedValue}
        </p>
        {trend !== undefined && (
          <span className={`flex items-center text-sm ${
            trend >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {trend >= 0 ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
}