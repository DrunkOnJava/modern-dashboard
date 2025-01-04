import React, { useState } from 'react';
import { Cloud, TrendingUp, Package, X, Settings } from 'lucide-react';
import { APIConfigurationModal } from './APIConfigurationModal';
import type { Widget } from '../../types/dashboard';
import type { APIConnection } from '../../types/dashboard';

interface WidgetPickerProps {
  onSelect: (widget: Widget) => void;
  onClose: () => void;
}

interface WidgetConfig {
  id: string;
  title: string;
  icon: any;
  description: string;
  apiProvider?: string;
  defaultConfig: Record<string, any>;
}

export function WidgetPicker({ onSelect, onClose }: WidgetPickerProps) {
  const [selectedWidget, setSelectedWidget] = useState<WidgetConfig | null>(null);
  const [showAPIConfig, setShowAPIConfig] = useState(false);

  const AVAILABLE_WIDGETS = [
    {
      id: 'weather',
      title: 'Weather',
      icon: Cloud,
      description: 'Display current weather for a location',
      apiProvider: 'openweather',
      defaultConfig: {
        city: 'London'
      }
    },
    {
      id: 'stocks',
      title: 'Stock Prices',
      icon: TrendingUp,
      description: 'Track stock market prices',
      apiProvider: 'alphavantage',
      defaultConfig: {
        symbol: 'AAPL'
      }
    },
    {
      id: 'tracking',
      title: 'Package Tracking',
      icon: Package,
      description: 'Track shipments and packages',
      apiProvider: 'tracking17',
      defaultConfig: {
        trackingNumber: ''
      }
    }
  ];

  const handleWidgetSelect = (widget: WidgetConfig) => {
    if (widget.apiProvider) {
      setSelectedWidget(widget);
      setShowAPIConfig(true);
    } else {
      onSelect({
        id: crypto.randomUUID(),
        type: widget.id,
        title: widget.title,
        config: widget.defaultConfig
      });
      onClose();
    }
  };

  const handleAPIConfigSave = (apiConfig: APIConnection) => {
    if (!selectedWidget) return;

    onSelect({
      id: crypto.randomUUID(),
      type: selectedWidget.id,
      title: selectedWidget.title,
      config: {
        ...selectedWidget.defaultConfig,
        apiConnection: apiConfig
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add Widget
          </h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
        </div>
        <div className="grid gap-4">
          {AVAILABLE_WIDGETS.map((widget) => {
            const Icon = widget.icon;
            return (
              <button
                key={widget.id}
                onClick={() => handleWidgetSelect(widget)}
                className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 
                  hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
              >
                <div className="flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {widget.title}
                    </h4>
                    {widget.apiProvider && (
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-700">
                        <Settings className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {widget.description}
                    {widget.apiProvider && (
                      <span className="block mt-1 text-xs text-gray-400 dark:text-gray-500">
                        Requires API configuration
                      </span>
                    )}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {showAPIConfig && selectedWidget && (
          <APIConfigurationModal
            provider={selectedWidget.apiProvider!}
            onSave={handleAPIConfigSave}
            onClose={() => setShowAPIConfig(false)}
          />
        )}
      </div>
    </div>
  );
}