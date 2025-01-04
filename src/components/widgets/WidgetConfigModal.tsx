import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WeatherConfig } from './config/WeatherConfig';
import { StockConfig } from './config/StockConfig';
import { TrackingConfig } from './config/TrackingConfig';
import { APIConfigurationModal } from './APIConfigurationModal';
import type { Widget } from '../../types/dashboard';

interface WidgetConfigModalProps {
  type: string;
  initialConfig?: any;
  onSave: (config: any) => void;
  onClose: () => void;
}

export function WidgetConfigModal({ type, initialConfig, onSave, onClose }: WidgetConfigModalProps) {
  const [config, setConfig] = useState(initialConfig || {});
  const [showAPIConfig, setShowAPIConfig] = useState(!initialConfig?.apiConnection);

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const renderConfigForm = () => {
    switch (type) {
      case 'weather':
        return <WeatherConfig config={config} onChange={setConfig} />;
      case 'stocks':
        return <StockConfig config={config} onChange={setConfig} />;
      case 'tracking':
        return <TrackingConfig config={config} onChange={setConfig} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Configure Widget
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {showAPIConfig ? (
          <APIConfigurationModal
            provider={type}
            onSave={(apiConfig) => {
              setConfig({ ...config, apiConnection: apiConfig });
              setShowAPIConfig(false);
            }}
            onClose={onClose}
          />
        ) : (
          <div className="space-y-6">
            {renderConfigForm()}
            
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 
                  dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                  transition-colors"
              >
                Save Configuration
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}