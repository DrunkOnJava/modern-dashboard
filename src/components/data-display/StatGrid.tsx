import React from 'react';
import { MetricCard } from './MetricCard';
import type { LucideIcon } from 'lucide-react';

interface Stat {
  id: string;
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: number;
  sparklineData?: number[];
  description?: string;
}

interface StatGridProps {
  stats: Stat[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatGrid({ stats, columns = 4, className = '' }: StatGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-4 ${className}`}>
      {stats.map(stat => (
        <MetricCard key={stat.id} {...stat} />
      ))}
    </div>
  );
}