import React from 'react';
import { TextInput } from '../../shared/form/TextInput';
import { Select } from '../../shared/form/Select';

interface WeatherConfigProps {
  config: {
    city: string;
    units?: 'metric' | 'imperial';
    updateInterval?: number;
  };
  onChange: (config: any) => void;
}

export function WeatherConfig({ config, onChange }: WeatherConfigProps) {
  return (
    <div className="space-y-4">
      <TextInput
        label="City"
        value={config.city}
        onChange={(e) => onChange({ ...config, city: e.target.value })}
        placeholder="Enter city name"
        required
      />

      <Select
        label="Units"
        value={config.units || 'metric'}
        options={[
          { value: 'metric', label: 'Celsius' },
          { value: 'imperial', label: 'Fahrenheit' }
        ]}
        onChange={(value) => onChange({ ...config, units: value })}
      />

      <Select
        label="Update Interval"
        value={config.updateInterval || 300000}
        options={[
          { value: 300000, label: '5 minutes' },
          { value: 600000, label: '10 minutes' },
          { value: 900000, label: '15 minutes' }
        ]}
        onChange={(value) => onChange({ ...config, updateInterval: Number(value) })}
      />
    </div>
  );
}