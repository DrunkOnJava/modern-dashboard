import React from 'react';
import { Select } from '@/components/shared';
import { SettingsSection } from './base/SettingsSection';
import type { ExportConfig } from '../types';

interface ExportSettingsProps {
  exportConfig: ExportConfig;
  onUpdate: (config: ExportConfig) => void;
}

export function ExportSettings({ exportConfig, onUpdate }: ExportSettingsProps) {
  const formats = [
    { value: 'json', label: 'JSON' },
    { value: 'csv', label: 'CSV' },
    { value: 'excel', label: 'Excel' }
  ];

  const intervals = [
    { value: 'never', label: 'Never' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  return (
    <SettingsSection title="Export Settings">
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Export Format"
          options={formats}
          value={exportConfig.format}
          onChange={(format) => onUpdate({ ...exportConfig, format: format as string })}
        />
        
        <Select
          label="Auto Export"
          options={intervals}
          value={exportConfig.autoExport}
          onChange={(autoExport) => onUpdate({ ...exportConfig, autoExport: autoExport as string })}
        />
      </div>
    </SettingsSection>
  );
}