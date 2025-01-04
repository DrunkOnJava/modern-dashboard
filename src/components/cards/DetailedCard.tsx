import React from 'react';
import { LucideIcon } from 'lucide-react';
import { BaseCard } from './BaseCard';
import { TrendIndicator } from './TrendIndicator';

interface DetailedCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  color?: string;
  description?: string;
  onSettings?: () => void;
}

export function DetailedCard({ 
  title, 
  value, 
  icon, 
  trend, 
  color,
  description,
  onSettings 
}: DetailedCardProps) {
  return (
    <BaseCard 
      title={title} 
      icon={icon} 
      color={color} 
      onSettings={onSettings}
    >
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 mb-4">{description}</p>
      )}
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
        {trend !== undefined && <TrendIndicator value={trend} />}
      </div>
    </BaseCard>
  );
}