import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../shared/data-display/Card';
import { ProgressRing } from './ProgressRing';

interface KPIProps {
  title: string;
  value: string | number;
  target?: number;
  icon?: LucideIcon;
  trend?: number;
  progress?: number;
  className?: string;
}

export function KPI({
  title,
  value,
  target,
  icon: Icon,
  trend,
  progress,
  className = ''
}: KPIProps) {
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
            {target && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                / {target}
              </span>
            )}
          </div>
          {trend !== undefined && (
            <p className={`mt-1 text-sm ${
              trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last period
            </p>
          )}
        </div>
        {progress !== undefined && (
          <ProgressRing progress={progress} size={60} />
        )}
      </div>
    </Card>
  );
}