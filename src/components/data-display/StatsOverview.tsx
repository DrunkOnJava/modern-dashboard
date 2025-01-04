import React from 'react';
import { Card } from '../shared/data-display/Card';
import { SparkLine } from '../charts/SparkLine';

interface Stat {
  label: string;
  value: string | number;
  change?: number;
  data?: number[];
}

interface StatsOverviewProps {
  title?: string;
  stats: Stat[];
  className?: string;
}

export function StatsOverview({ title, stats, className = '' }: StatsOverviewProps) {
  return (
    <Card className={`p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="relative">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {stat.label}
            </dt>
            <dd className="mt-2 flex items-baseline justify-between">
              <div className="flex items-baseline text-2xl font-semibold text-gray-900 dark:text-white">
                {stat.value}
                {stat.change && (
                  <span className={`ml-2 text-sm font-medium ${
                    stat.change >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change >= 0 ? '+' : ''}{stat.change}%
                  </span>
                )}
              </div>
              {stat.data && (
                <div className="min-w-[80px]">
                  <SparkLine data={stat.data} height={40} />
                </div>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}