import React from 'react';
import { Cloud } from 'lucide-react';
import { BaseCard } from './BaseCard';
import { WidgetHeader } from '../widgets/base/WidgetHeader';
import { WidgetValue } from '../widgets/base/WidgetValue';
import { fetchWeatherData, type WeatherData } from '../../services/api/openweather';
import { useAPICard } from '../../hooks/useAPICard';
import { useAPIConnection } from '../../hooks/useAPIConnection';
import type { Widget } from '../../types/dashboard';

interface WeatherCardProps {
  config: Widget['config'];
}

export function WeatherCard({ config }: WeatherCardProps) {
  const { connection, loading: connectionLoading, error: connectionError } = useAPIConnection('openweather');
  const { data: weather, error, loading, retrying, retryCount } = useAPICard<WeatherData>({
    fetchData: fetchWeatherData,
    connection: connection || { id: '', name: '', endpoint: '', key: '' },
    config: config.city,
    enabled: !!connection
  });

  const cardError = connectionError || error;
  const isLoading = connectionLoading || loading;

  return (
    <BaseCard
      title={config.city}
      error={cardError}
      loading={isLoading}
      retrying={retrying}
      retryCount={retryCount}
    >
      <WidgetHeader
        icon={Cloud}
        title={config.city}
        iconColor="blue"
      />
      {weather && (
        <div className="space-y-2">
          <WidgetValue value={weather.temp} unit="°C" />
          <p className="text-gray-600 dark:text-gray-400 capitalize">
            {weather.description}
          </p>
          <p className="text-sm text-gray-500">
            Humidity: {weather.humidity}%
          </p>
        </div>
      )}
    </BaseCard>
  );
}