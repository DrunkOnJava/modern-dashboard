import React from 'react';
import { Package } from 'lucide-react';
import { BaseCard } from './BaseCard';
import { WidgetHeader } from '../widgets/base/WidgetHeader';
import { fetchTrackingInfo, type TrackingInfo } from '../../services/api/tracking17';
import { useAPICard } from '../../hooks/useAPICard';
import { useAPIConnection } from '../../hooks/useAPIConnection';
import type { Widget } from '../../types/dashboard';

interface TrackingCardProps {
  config: Widget['config'];
}

export function TrackingCard({ config }: TrackingCardProps) {
  const { connection, loading: connectionLoading, error: connectionError } = useAPIConnection('tracking17');
  const { data: tracking, error, loading, retrying, retryCount } = useAPICard<TrackingInfo>({
    fetchData: fetchTrackingInfo,
    connection: connection || { id: '', name: '', endpoint: '', key: '' },
    config: config.trackingNumber,
    enabled: !!connection
  });

  const cardError = connectionError || error;
  const isLoading = connectionLoading || loading;

  return (
    <BaseCard
      title="Package Tracking"
      error={cardError}
      loading={isLoading}
      retrying={retrying}
      retryCount={retryCount}
    >
      <WidgetHeader
        icon={Package}
        title="Package Tracking"
        iconColor="orange"
      />
      {tracking && (
        <div className="space-y-2">
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {config.trackingNumber}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Status: {tracking.status}
          </p>
          <p className="text-sm text-gray-500">
            Last location: {tracking.location}
          </p>
          <p className="text-xs text-gray-400">
            Updated: {new Date(tracking.timestamp).toLocaleString()}
          </p>
        </div>
      )}
    </BaseCard>
  );
}