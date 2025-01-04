import React from 'react';
import { LucideIcon } from 'lucide-react';
import { colorMappings } from '../utils/colors';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  color?: string;
}

export function DashboardCard({ title, value, icon: Icon, trend, color = "blue" }: DashboardCardProps) {
  const colorClasses = colorMappings[color] || colorMappings.blue;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</h3>
        <div className={`${colorClasses.light} ${colorClasses.dark}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-semibold text-gray-800 dark:text-white">{value}</p>
        {trend !== undefined && (
          <span className={`flex items-center text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
}