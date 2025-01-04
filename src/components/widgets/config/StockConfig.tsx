import React from 'react';
import { TextInput } from '../../shared/form/TextInput';
import { Select } from '../../shared/form/Select';

interface StockConfigProps {
  config: {
    symbol: string;
    interval?: string;
    updateInterval?: number;
  };
  onChange: (config: any) => void;
}

export function StockConfig({ config, onChange }: StockConfigProps) {
  return (
    <div className="space-y-4">
      <TextInput
        label="Stock Symbol"
        value={config.symbol}
        onChange={(e) => onChange({ ...config, symbol: e.target.value.toUpperCase() })}
        placeholder="e.g., AAPL"
        required
      />

      <Select
        label="Price Interval"
        value={config.interval || '1min'}
        options={[
          { value: '1min', label: '1 minute' },
          { value: '5min', label: '5 minutes' },
          { value: '15min', label: '15 minutes' },
          { value: '30min', label: '30 minutes' },
          { value: '60min', label: '1 hour' }
        ]}
        onChange={(value) => onChange({ ...config, interval: value })}
      />

      <Select
        label="Update Interval"
        value={config.updateInterval || 60000}
        options={[
          { value: 60000, label: '1 minute' },
          { value: 300000, label: '5 minutes' },
          { value: 900000, label: '15 minutes' }
        ]}
        onChange={(value) => onChange({ ...config, updateInterval: Number(value) })}
      />
    </div>
  );
}