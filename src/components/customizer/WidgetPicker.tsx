import React from 'react';
import { Cloud, TrendingUp, Package, X } from 'lucide-react';
import type { Widget } from '../../types/dashboard';

interface WidgetPickerProps {
  onSelect: (widget: Widget) => void;
  onClose: () => void;
}

const AVAILABLE_WIDGETS = [
  {
    id: 'weather',
    title: 'Weather',
    icon: Cloud,
    description: 'Display current weather for a location',
    defaultConfig: {
      city: 'London'
    }
  },
  {
    id: 'crypto',
    title: 'Crypto Prices',
    icon: TrendingUp,
    description: 'Show cryptocurrency price updates',
    defaultConfig: {
      coins: ['bitcoin', 'ethereum', 'dogecoin']
    }
  },
  {
    id: 'tracking',
    title: 'Package Tracking',
    icon: Package,
    description: 'Track shipments and packages',
    defaultConfig: {
      trackingNumber: ''
    }
  }
];

export function WidgetPicker({ onSelect, onClose }: WidgetPickerProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Add Widget
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid gap-4">
          {AVAILABLE_WIDGETS.map((widget) => {
            const Icon = widget.icon;
            return (
              <button
                key={widget.id}
                onClick={() => onSelect({
                  id: crypto.randomUUID(),
                  type: widget.id,
                  title: widget.title,
                  config: widget.defaultConfig
                })}
                className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
              >
                <Icon className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {widget.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {widget.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}