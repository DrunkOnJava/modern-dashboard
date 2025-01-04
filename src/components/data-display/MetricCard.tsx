import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../shared/data-display/Card';
import { SparkLine } from '../charts/SparkLine';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: number;
  sparklineData?: number[];
  description?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  sparklineData,
  description,
  className = ''
}: MetricCardProps) {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            {Icon && (
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            )}
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
            {trend !== undefined && (
              <span className={`text-sm ${
                trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
        {sparklineData && (
          <div className="mt-2">
            <SparkLine data={sparklineData} />
          </div>
        )}
      </div>
    </Card>
  );
}