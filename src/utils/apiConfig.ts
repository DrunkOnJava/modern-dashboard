import type { APIConnection } from '../types/dashboard';

export const API_CONFIGS: Record<string, APIConnection> = {
  alphavantage: {
    id: 'alphavantage',
    name: 'Alpha Vantage',
    key: import.meta.env.VITE_ALPHAVANTAGE_API_KEY,
    endpoint: 'https://www.alphavantage.co/query/',
    refreshInterval: 60000 // 1 minute
  },
  tracking17: {
    id: 'tracking17',
    name: '17Track',
    key: import.meta.env.VITE_17TRACK_API_KEY,
    endpoint: 'https://api.17track.net/track/v2/',
    refreshInterval: 300000 // 5 minutes
  },
  openweather: {
    id: 'openweather',
    name: 'OpenWeather',
    key: import.meta.env.VITE_OPENWEATHER_API_KEY,
    endpoint: 'https://api.openweathermap.org/data/2.5',
    refreshInterval: 600000 // 10 minutes
  }
};