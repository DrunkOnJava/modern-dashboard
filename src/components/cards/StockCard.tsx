import React from 'react';
import { TrendingUp } from 'lucide-react';
import { BaseCard } from './BaseCard';
import { WidgetHeader } from '../widgets/base/WidgetHeader';
import { WidgetValue } from '../widgets/base/WidgetValue';
import { fetchStockData, type StockData } from '../../services/api/alphavantage';
import { useAPICard } from '../../hooks/useAPICard';
import { useAPIConnection } from '../../hooks/useAPIConnection';
import type { Widget } from '../../types/dashboard';

interface StockCardProps {
  config: Widget['config'];
}

export function StockCard({ config }: StockCardProps) {
  const { connection, loading: connectionLoading, error: connectionError } = useAPIConnection('alphavantage');
  const { data: stock, error, loading, retrying, retryCount } = useAPICard<StockData>({
    fetchData: fetchStockData,
    connection: connection || { id: '', name: '', endpoint: '', key: '' },
    config: config.symbol,
    enabled: !!connection
  });

  const cardError = connectionError || error;
  const isLoading = connectionLoading || loading;

  return (
    <BaseCard
      title={`Stock: ${config.symbol}`}
      error={cardError}
      loading={isLoading}
      retrying={retrying}
      retryCount={retryCount}
    >
      <WidgetHeader
        icon={TrendingUp}
        title={config.symbol}
        iconColor="green"
      />
      {stock && (
        <div className="space-y-2">
          <WidgetValue
            value={stock.price}
            change={stock.changePercent}
            unit="$"
          />
          <p className="text-sm text-gray-500">
            Change: {stock.change > 0 ? '+' : ''}{stock.change}
          </p>
        </div>
      )}
    </BaseCard>
  );
}