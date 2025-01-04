import React, { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { BaseWidget } from './base/BaseWidget';
import { WidgetHeader } from './base/WidgetHeader';
import { fetchTrackingInfo, type TrackingInfo } from '../../services/api/tracking';
import type { Widget, APIConnection } from '../../types/dashboard';

interface TrackingWidgetProps {
  config: Widget['config'];
  connection: APIConnection;
}

export function TrackingWidget({ config, connection }: TrackingWidgetProps) {
  const [tracking, setTracking] = useState<TrackingInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrackingInfo(connection, config.trackingNumber);
        setTracking(data);
        setError(null);
      } catch (err) {
        setError('Failed to load tracking data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, connection.refreshInterval);
    return () => clearInterval(interval);
  }, [config.trackingNumber, connection]);

  return (
    <BaseWidget
      title="Package Tracking"
      error={error}
      loading={loading || !tracking}
    >
      <WidgetHeader
        icon={Package}
        title="Package Tracking"
        iconColor="orange"
      />
      <div className="space-y-2">
        <p className="font-medium text-gray-900 dark:text-gray-100">
          {config.trackingNumber}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Status: {tracking?.status}
        </p>
        <p className="text-sm text-gray-500">
          Last location: {tracking?.location}
        </p>
        <p className="text-xs text-gray-400">
          Updated: {tracking?.timestamp && new Date(tracking.timestamp).toLocaleString()}
        </p>
      </div>
    </BaseWidget>
  );
}