import React from 'react';
import { LucideIcon } from 'lucide-react';
import { BaseCard } from './BaseCard';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  history: number[];
  onSettings?: () => void;
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  color,
  history,
  onSettings 
}: StatCardProps) {
  const lastValue = history[history.length - 2] || 0;
  const currentValue = history[history.length - 1] || 0;
  const percentChange = lastValue ? ((currentValue - lastValue) / lastValue) * 100 : 0;

  return (
    <BaseCard 
      title={title} 
      icon={icon} 
      color={color} 
      onSettings={onSettings}
    >
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
        <span className={`text-xs font-medium ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {percentChange >= 0 ? '↑' : '↓'} {Math.abs(percentChange).toFixed(1)}%
        </span>
      </div>
      <div className="mt-2 text-xs text-gray-500">vs previous period</div>
    </BaseCard>
  );
}