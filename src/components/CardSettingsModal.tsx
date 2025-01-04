import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import type { DashboardCardData } from '../types/dashboard';

interface CardSettingsModalProps {
  card: DashboardCardData;
  onSave: (settings: Partial<DashboardCardData>) => void;
  onClose: () => void;
}

export function CardSettingsModal({ card, onSave, onClose }: CardSettingsModalProps) {
  const [settings, setSettings] = useState({
    title: card.title,
    minValue: card.minValue || 0,
    maxValue: card.maxValue || 100,
    format: card.format || '',
    type: card.type || 'default'
  });

  const cardTypes = [
    { value: 'default', label: 'Default' },
    { value: 'compact', label: 'Compact' },
    { value: 'detailed', label: 'Detailed' },
    { value: 'graph', label: 'Graph' },
    { value: 'table', label: 'Table' },
    { value: 'stat', label: 'Statistics' },
    { value: 'progress', label: 'Progress' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Card Settings - {card.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={settings.title}
              onChange={(e) => setSettings({ ...settings, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Display Type
            </label>
            <select
              value={settings.type}
              onChange={(e) => setSettings({ ...settings, type: e.target.value as any })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {cardTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Min Value
              </label>
              <input
                type="number"
                value={settings.minValue}
                onChange={(e) => setSettings({ ...settings, minValue: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Max Value
              </label>
              <input
                type="number"
                value={settings.maxValue}
                onChange={(e) => setSettings({ ...settings, maxValue: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Format (e.g., "$", "%", "ms")
            </label>
            <input
              type="text"
              value={settings.format}
              onChange={(e) => setSettings({ ...settings, format: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Leave empty for no format"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
              transition-colors flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}