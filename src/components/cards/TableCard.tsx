import React from 'react';
import { LucideIcon } from 'lucide-react';
import { BaseCard } from './BaseCard';
import type { TableRow } from '../../types/dashboard';

interface TableCardProps {
  title: string;
  icon: LucideIcon;
  color?: string;
  history: number[];
  onSettings?: () => void;
}

export function TableCard({ 
  title, 
  icon, 
  color,
  history,
  onSettings 
}: TableCardProps) {
  const rows: TableRow[] = history.map((value, index) => ({
    label: `Row ${index + 1}`,
    value,
    trend: index > 0 ? ((value - history[index - 1]) / history[index - 1]) * 100 : undefined
  }));

  return (
    <BaseCard 
      title={title} 
      icon={icon} 
      color={color} 
      onSettings={onSettings}
    >
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {rows.map((row, index) => (
          <div key={index} className="py-2 flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">{row.label}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900 dark:text-white">{row.value}</span>
              {row.trend !== undefined && (
                <span className={`text-xs ${row.trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {row.trend >= 0 ? '↑' : '↓'} {Math.abs(row.trend).toFixed(1)}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  );
}