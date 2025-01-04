import type { APIConnection } from '../../types/dashboard';

export interface WeatherData {
  temp: number;
  humidity: number;
  description: string;
  icon: string;
}

export async function fetchWeatherData(connection: APIConnection, city: string): Promise<WeatherData> {
  if (!city?.trim()) {
    throw new Error('City name is required');
  }

  if (!connection.key) {
    throw new Error('OpenWeather API key is required');
  }

  const params = new URLSearchParams({
    q: city,
    appid: connection.key,
    units: 'metric',
    lang: 'en',
    mode: 'json'
  });

  try {
    // Add delay to respect rate limits
    const lastCallTime = (window as any).__lastOpenWeatherCall;
    const now = Date.now();
    if (lastCallTime && now - lastCallTime < 1000) {
      await new Promise(resolve => setTimeout(resolve, 1000 - (now - lastCallTime)));
    }
    (window as any).__lastOpenWeatherCall = Date.now();

    const response = await fetch(`${connection.endpoint}/weather?${params}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch weather data (${response.status})`);
    }

    const data = await response.json();

    if (!data.main || !data.weather?.[0]) {
      throw new Error(`Invalid weather data received for ${city}`);
    }

    return {
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    };
  } catch (error) {
    console.error('Weather API error:', error);
    throw error instanceof Error ? error : new Error(`Failed to fetch weather data for ${city}`);
  }
}