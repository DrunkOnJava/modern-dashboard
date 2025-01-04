import React from 'react';
import { TextInput } from '../../shared/form/TextInput';
import { Select } from '../../shared/form/Select';

interface TrackingConfigProps {
  config: {
    trackingNumber: string;
    carrier?: string;
    updateInterval?: number;
  };
  onChange: (config: any) => void;
}

export function TrackingConfig({ config, onChange }: TrackingConfigProps) {
  return (
    <div className="space-y-4">
      <TextInput
        label="Tracking Number"
        value={config.trackingNumber}
        onChange={(e) => onChange({ ...config, trackingNumber: e.target.value })}
        placeholder="Enter tracking number"
        required
      />

      <Select
        label="Carrier"
        value={config.carrier || 'auto'}
        options={[
          { value: 'auto', label: 'Auto Detect' },
          { value: 'usps', label: 'USPS' },
          { value: 'ups', label: 'UPS' },
          { value: 'fedex', label: 'FedEx' },
          { value: 'dhl', label: 'DHL' }
        ]}
        onChange={(value) => onChange({ ...config, carrier: value })}
      />

      <Select
        label="Update Interval"
        value={config.updateInterval || 900000}
        options={[
          { value: 900000, label: '15 minutes' },
          { value: 1800000, label: '30 minutes' },
          { value: 3600000, label: '1 hour' }
        ]}
        onChange={(value) => onChange({ ...config, updateInterval: Number(value) })}
      />
    </div>
  );
}