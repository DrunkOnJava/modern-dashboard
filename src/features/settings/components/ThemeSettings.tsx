import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { SettingsSection } from './base/SettingsSection';
import type { ThemeConfig } from '../types';

interface ThemeSettingsProps {
  theme: ThemeConfig;
  onUpdate: (theme: ThemeConfig) => void;
}

export function ThemeSettings({ theme, onUpdate }: ThemeSettingsProps) {
  const themes = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor }
  ];

  return (
    <SettingsSection title="Theme">
      <div className="grid grid-cols-3 gap-4">
        {themes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onUpdate({ mode: id })}
            className={`p-4 rounded-lg border-2 transition-colors flex flex-col items-center gap-2
              ${theme.mode === id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-200'}`}
          >
            <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          </button>
        ))}
      </div>
    </SettingsSection>
  );
}