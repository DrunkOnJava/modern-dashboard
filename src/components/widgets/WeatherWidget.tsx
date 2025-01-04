import React, { useEffect, useState } from 'react';
import { Cloud } from 'lucide-react';
import { BaseWidget } from './base/BaseWidget';
import { WidgetHeader } from './base/WidgetHeader';
import { WidgetValue } from './base/WidgetValue';
import { fetchWeatherData, type WeatherData } from '../../services/api/openweather';
import type { Widget, APIConnection } from '../../types/dashboard';

interface WeatherWidgetProps {
  config: Widget['config'];
  connection: APIConnection;
}

export function WeatherWidget({ config, connection }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData(connection, config.city);
        setWeather(data);
        setError(null);
      } catch (err) {
        setError('Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, connection.refreshInterval);
    return () => clearInterval(interval);
  }, [config.city, connection]);

  return (
    <BaseWidget
      title={config.city}
      error={error}
      loading={loading || !weather}
    >
      <WidgetHeader
        icon={Cloud}
        title={config.city}
        iconColor="blue"
      />
      <div className="space-y-2">
        <WidgetValue value={weather?.temp || 0} unit="°C" />
        <p className="text-gray-600 dark:text-gray-400 capitalize">
          {weather?.description}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Humidity: {weather?.humidity}%
        </p>
      </div>
    </BaseWidget>
  );
}