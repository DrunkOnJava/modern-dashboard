import React from 'react';
import { LucideIcon } from 'lucide-react';
import { iconCategories } from '../utils/dashboardIcons';
import { colorMappings } from '../utils/colors';

interface IconPickerProps {
  onSelect: (icon: LucideIcon) => void;
  selectedIcon?: LucideIcon;
}

export function IconPicker({ onSelect, selectedIcon }: IconPickerProps) {
  return (
    <div className="space-y-6 p-4 max-h-[400px] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg">
      {iconCategories.map((category) => (
        <div key={category.name}>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {category.name}
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {category.icons.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => onSelect(Icon)}
                className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex flex-col items-center gap-1
                  ${selectedIcon === Icon ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                title={label}
              >
                <Icon className={`w-6 h-6 ${colorMappings.blue.light} ${colorMappings.blue.dark}`} />
                <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}