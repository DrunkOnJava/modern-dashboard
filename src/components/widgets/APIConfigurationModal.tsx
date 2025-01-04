import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { TextInput } from '../shared/form/TextInput';
import type { APIConnection } from '../../types/dashboard';

interface APIConfigurationModalProps {
  provider: string;
  onSave: (config: APIConnection) => void;
  onClose: () => void;
}

export function APIConfigurationModal({ provider, onSave, onClose }: APIConfigurationModalProps) {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    name: '',
    endpoint: '',
    key: ''
  });

  const getProviderDetails = () => {
    switch (provider) {
      case 'openweather':
        return {
          name: 'OpenWeather',
          instructions: 'Get your API key from OpenWeather: https://openweathermap.org/api',
          endpoint: 'https://api.openweathermap.org/data/2.5'
        };
      case 'alphavantage':
        return {
          name: 'Alpha Vantage',
          instructions: 'Get your API key from Alpha Vantage: https://www.alphavantage.co/support/#api-key',
          endpoint: 'https://www.alphavantage.co/query'
        };
      case 'tracking17':
        return {
          name: '17Track',
          instructions: 'Get your API key from 17Track: https://api.17track.net',
          endpoint: 'https://api.17track.net/track'
        };
      default:
        return { name: '', instructions: '', endpoint: '' };
    }
  };

  const details = getProviderDetails();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate API key
      const testResponse = await fetch(`${config.endpoint}/test`, {
        headers: { Authorization: `Bearer ${config.key}` }
      });

      if (!testResponse.ok) {
        throw new Error('Invalid API key');
      }

      onSave({
        id: crypto.randomUUID(),
        name: config.name || details.name,
        endpoint: config.endpoint || details.endpoint,
        key: config.key,
        refreshInterval: 30000
      });

      addToast('success', 'API configuration saved successfully');
      onClose();
    } catch (error) {
      addToast('error', 'Failed to validate API key');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Configure {details.name} API
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="API Key"
            type="password"
            value={config.key}
            onChange={(e) => setConfig({ ...config, key: e.target.value })}
            required
          />

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {details.instructions}
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
              transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Validating...' : (
              <>
                <Check className="w-5 h-5" />
                Save Configuration
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}