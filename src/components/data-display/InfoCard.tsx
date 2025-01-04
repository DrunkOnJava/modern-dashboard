import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../shared/data-display/Card';
import { Badge } from '../shared/data-display/Badge';

interface InfoCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  status?: 'success' | 'warning' | 'error' | 'info';
  statusText?: string;
  children: React.ReactNode;
  className?: string;
}

export function InfoCard({
  title,
  subtitle,
  icon: Icon,
  status,
  statusText,
  children,
  className = ''
}: InfoCardProps) {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {status && statusText && (
          <Badge variant={status}>{statusText}</Badge>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </Card>
  );
}