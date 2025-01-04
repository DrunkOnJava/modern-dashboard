export function getWidgetTitle(type: string): string {
  switch (type) {
    case 'weather':
      return 'Weather Widget';
    case 'crypto':
      return 'Cryptocurrency Tracker';
    case 'tracking':
      return 'Package Tracking';
    default:
      return 'Widget';
  }
}

export function getApiKeyInstructions(type: string): string {
  switch (type) {
    case 'weather':
      return 'Get your API key from OpenWeather: https://openweathermap.org/api';
    case 'crypto':
      return 'CoinGecko API is free and does not require an API key';
    case 'tracking':
      return 'Get your API key from 17Track: https://api.17track.net';
    default:
      return '';
  }
}

export function getEndpoint(type: string): string {
  switch (type) {
    case 'weather':
      return 'https://api.openweathermap.org/data/2.5';
    case 'crypto':
      return 'https://api.coingecko.com/api/v3';
    case 'tracking':
      return 'https://api.17track.net/track';
    default:
      return '';
  }
}

export function getInitialConfig(type: string): Record<string, any> {
  switch (type) {
    case 'weather':
      return { city: 'London' };
    case 'crypto':
      return { coins: ['bitcoin', 'ethereum', 'dogecoin'] };
    case 'tracking':
      return { trackingNumber: '' };
    default:
      return {};
  }
}