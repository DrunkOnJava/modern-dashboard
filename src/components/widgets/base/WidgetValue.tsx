import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface WidgetValueProps {
  value: string | number;
  change?: number;
  unit?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl'
};

export function WidgetValue({ 
  value, 
  change, 
  unit = '', 
  size = 'md' 
}: WidgetValueProps) {
  return (
    <div className="flex items-baseline gap-2">
      <span className={`${sizeClasses[size]} font-bold text-gray-900 dark:text-white`}>
        {value}{unit}
      </span>
      {change !== undefined && (
        <span className={`flex items-center text-sm ${
          change >= 0 ? 'text-green-500' : 'text-red-500'
        }`}>
          {change >= 0 ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          {Math.abs(change).toFixed(1)}%
        </span>
      )}
    </div>
  );
}