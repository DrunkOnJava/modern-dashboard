import React, { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { BaseWidget } from './base/BaseWidget';
import { WidgetHeader } from './base/WidgetHeader';
import { WidgetValue } from './base/WidgetValue';
import { fetchCryptoPrices, type CryptoPrice } from '../../services/api/coingecko';
import type { Widget } from '../../types/dashboard';

interface CryptoWidgetProps {
  config: Widget['config'];
}

export function CryptoWidget({ config }: CryptoWidgetProps) {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCryptoPrices(config.coins);
        setPrices(data);
        setError(null);
      } catch (err) {
        setError('Failed to load crypto prices');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // CoinGecko has rate limits
    return () => clearInterval(interval);
  }, [config.coins]);

  return (
    <BaseWidget 
      title="Crypto Prices"
      error={error}
      loading={loading || prices.length === 0}
    >
      <WidgetHeader
        icon={TrendingUp}
        title="Crypto Prices"
        iconColor="green"
      />
      <div className="space-y-3">
        {prices.map((coin) => (
          <div key={coin.id} className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400 uppercase">
              {coin.symbol}
            </span>
            <WidgetValue
              value={coin.current_price.toFixed(2)}
              change={coin.price_change_24h}
              unit="$"
            />
          </div>
        ))}
      </div>
    </BaseWidget>
  );
}