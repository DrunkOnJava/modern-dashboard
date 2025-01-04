import React from 'react';
import { Loader } from 'lucide-react';

interface BaseWidgetProps {
  title: string;
  error?: string | null;
  loading?: boolean;
  children: React.ReactNode;
}

export function BaseWidget({ title, error, loading, children }: BaseWidgetProps) {
  if (error) {
    return (
      <div className="text-red-500 text-sm">{error}</div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg bg-white dark:bg-gray-800">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      {children}
    </div>
  );
}