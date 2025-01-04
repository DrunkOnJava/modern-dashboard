import React from 'react';
import { ArrowUpDown, Plus } from 'lucide-react';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import type { SortBy } from '../types';

interface DashboardHeaderProps {
  onToggleSort: () => void;
  onAddCard: () => void;
  sortBy: SortBy;
  isDark: boolean;
  onToggleDarkMode: () => void;
}

export function DashboardHeader({
  onToggleSort,
  onAddCard,
  sortBy,
  isDark,
  onToggleDarkMode
}: DashboardHeaderProps) {
  return (
    <header className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">System Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Real-time system metrics and performance indicators</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSort}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowUpDown className="w-4 h-4" />
          <span className="text-sm">Sort by {sortBy === 'title' ? 'value' : 'title'}</span>
        </button>
        <button
          onClick={onAddCard}
          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          aria-label="Add new card"
        >
          <Plus className="w-5 h-5" />
        </button>
        <DarkModeToggle isDark={isDark} onToggle={onToggleDarkMode} />
      </div>
    </header>
  );
}