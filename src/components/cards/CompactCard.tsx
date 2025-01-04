import React from 'react';
import { LucideIcon } from 'lucide-react';
import { BaseCard } from './BaseCard';
import { TrendIndicator } from './TrendIndicator';

interface CompactCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  color?: string;
  onSettings?: () => void;
}

export function CompactCard({ 
  title, 
  value, 
  icon, 
  trend, 
  color,
  onSettings 
}: CompactCardProps) {
  return (
    <BaseCard 
      title={title} 
      icon={icon} 
      color={color} 
      onSettings={onSettings}
      className="p-3"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-900 dark:text-white">{value}</span>
        {trend !== undefined && <TrendIndicator value={trend} />}
      </div>
    </BaseCard>
  );
}