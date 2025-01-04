import type { APIConnection } from '../../types/dashboard';

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export async function fetchStockData(connection: APIConnection, symbol: string): Promise<StockData> {
  if (!symbol?.trim()) {
    throw new Error('Stock symbol is required');
  }


  if (!connection.key) {
    throw new Error('Alpha Vantage API key is required');
  }

  // Add delay to respect rate limits
  const lastCallTime = (window as any).__lastAlphaVantageCall;
  const now = Date.now();
  if (lastCallTime && now - lastCallTime < 12000) {
    await new Promise(resolve => setTimeout(resolve, 12000 - (now - lastCallTime)));
  }
  (window as any).__lastAlphaVantageCall = Date.now();

  const params = new URLSearchParams({
    function: 'GLOBAL_QUOTE',
    symbol,
    apikey: connection.key
  });

  try {
    const response = await fetch(`${connection.endpoint}?${params}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    const data = await response.json();

    // Check for API call frequency error
    if (data.Note?.includes('API call frequency')) {
      throw new Error('API call frequency exceeded. Please try again later.');
    }

    const quote = data['Global Quote'];
    if (!quote || Object.keys(quote).length === 0) {
      throw new Error(`No data available for ${symbol}`);
    }

    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
    };
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error(`Failed to fetch stock data for ${symbol}`);
  }
}