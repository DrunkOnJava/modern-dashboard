import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TrendIndicatorProps {
  value: number;
}

export function TrendIndicator({ value }: TrendIndicatorProps) {
  return (
    <span className={`flex items-center text-sm ${value >= 0 ? 'text-green-500' : 'text-red-500'}`}>
      {value >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
      {Math.abs(value)}%
    </span>
  );
}