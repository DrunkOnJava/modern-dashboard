import React from 'react';
import { LucideIcon } from 'lucide-react';
import { BaseCard } from './BaseCard';

interface GraphCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  history: number[];
  onSettings?: () => void;
}

export function GraphCard({ 
  title, 
  value, 
  icon, 
  color,
  history,
  onSettings 
}: GraphCardProps) {
  const max = Math.max(...history);
  const min = Math.min(...history);
  const range = max - min;

  return (
    <BaseCard 
      title={title} 
      icon={icon} 
      color={color} 
      onSettings={onSettings}
    >
      <p className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{value}</p>
      <div className="h-16 flex items-end gap-1">
        {history.map((point, i) => {
          const height = range ? ((point - min) / range) * 100 : 50;
          return (
            <div
              key={i}
              className={`flex-1 rounded-t ${color ? `bg-${color}-500` : 'bg-blue-500'}`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>
    </BaseCard>
  );
}