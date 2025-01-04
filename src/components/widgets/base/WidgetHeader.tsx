import React from 'react';
import { LucideIcon } from 'lucide-react';
import { colorMappings } from '../../../utils/colors';

interface WidgetHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  iconColor?: string;
}

export function WidgetHeader({ 
  icon: Icon, 
  title, 
  subtitle,
  iconColor = "blue" 
}: WidgetHeaderProps) {
  const colorClasses = colorMappings[iconColor] || colorMappings.blue;
  
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className={`${colorClasses.light} ${colorClasses.dark} p-2 rounded-lg`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
}