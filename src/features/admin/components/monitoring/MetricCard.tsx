import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  color?: string;
}

export function MetricCard({ title, value, icon: Icon, trend, color = 'blue' }: MetricCardProps) {
  const colors = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    red: 'text-red-500'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`${colors[color]} bg-opacity-10 p-3 rounded-lg`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
          </div>
        </div>
        {trend !== undefined && (
          <div className={`flex items-center ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="ml-1 text-sm">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}