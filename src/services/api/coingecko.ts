const BASE_URL = 'https://api.coingecko.com/api/v3';

export interface CryptoPrice {
  id: string;
  symbol: string;
  current_price: number;
  price_change_24h: number;
}

export async function fetchCryptoPrices(coins: string[]): Promise<CryptoPrice[]> {
  const response = await fetch(
    `${BASE_URL}/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_24hr_change=true`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch crypto prices');
  }

  const data = await response.json();
  
  return Object.entries(data).map(([id, details]: [string, any]) => ({
    id,
    symbol: id,
    current_price: details.usd,
    price_change_24h: details.usd_24h_change
  }));
}