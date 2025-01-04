import React from 'react';
import { BarChart2, TrendingUp, Users } from 'lucide-react';

interface SummaryData {
  totalCards: number;
  activeUsers: number;
  growthRate: number;
}

interface DashboardSummaryProps {
  data: SummaryData;
}

export function DashboardSummary({ data }: DashboardSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <BarChart2 className="h-8 w-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Cards</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {data.totalCards}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {data.activeUsers}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-purple-500" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Growth Rate</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {data.growthRate}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}