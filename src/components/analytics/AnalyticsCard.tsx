import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { BaseCard } from '../cards/BaseCard';

interface AnalyticsCardProps {
  title: string;
  value: number;
  previousValue: number;
  unit?: string;
  precision?: number;
}

export function AnalyticsCard({ 
  title, 
  value, 
  previousValue, 
  unit = '', 
  precision = 1 
}: AnalyticsCardProps) {
  const percentChange = ((value - previousValue) / previousValue) * 100;
  const isPositive = percentChange >= 0;

  return (
    <BaseCard title={title}>
      <div className="space-y-2">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {value.toFixed(precision)}{unit}
        </div>
        <div className={`flex items-center text-sm ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          {Math.abs(percentChange).toFixed(1)}% vs previous
        </div>
      </div>
    </BaseCard>
  );
}