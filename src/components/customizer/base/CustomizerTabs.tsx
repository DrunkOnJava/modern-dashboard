import React from 'react';
import type { CustomizerTab } from '../../../types/customizer';

interface TabItem {
  id: CustomizerTab;
  label: string;
  icon: React.ReactNode;
}

interface CustomizerTabsProps {
  tabs: TabItem[];
  activeTab: CustomizerTab;
  onTabChange: (tab: CustomizerTab) => void;
}

export function CustomizerTabs({ tabs, activeTab, onTabChange }: CustomizerTabsProps) {
  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700">
      {tabs.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex-1 p-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors
            ${activeTab === id 
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
}