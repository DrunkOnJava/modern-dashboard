import React from 'react';
import { WeatherConfig } from './config/WeatherConfig';
import { CryptoConfig } from './config/CryptoConfig';
import { TrackingConfig } from './config/TrackingConfig';

interface WidgetConfigFieldsProps {
  type: string;
  config: Record<string, any>;
  onChange: (config: Record<string, any>) => void;
}

export function WidgetConfigFields({ type, config, onChange }: WidgetConfigFieldsProps) {
  switch (type) {
    case 'weather':
      return <WeatherConfig config={config} onChange={onChange} />;
    case 'crypto':
      return <CryptoConfig config={config} onChange={onChange} />;
    case 'tracking':
      return <TrackingConfig config={config} onChange={onChange} />;
    default:
      return null;
  }
}