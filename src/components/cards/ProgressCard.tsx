import React from 'react';
import { LucideIcon } from 'lucide-react';
import { BaseCard } from './BaseCard';
import { colorMappings } from '../../utils/colors';

interface ProgressCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  minValue?: number;
  maxValue?: number;
  onSettings?: () => void;
}

export function ProgressCard({ 
  title, 
  value, 
  icon, 
  color = 'blue',
  minValue = 0,
  maxValue = 100,
  onSettings 
}: ProgressCardProps) {
  const percentage = typeof value === 'number' ? 
    Math.min(100, Math.max(0, (value - minValue) / (maxValue - minValue) * 100)) : 0;

  return (
    <BaseCard 
      title={title} 
      icon={icon} 
      color={color} 
      onSettings={onSettings}
    >
      <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{value}</div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorMappings[color]?.bg || 'bg-blue-500'} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {percentage.toFixed(0)}% of {maxValue}
      </div>
    </BaseCard>
  );
}