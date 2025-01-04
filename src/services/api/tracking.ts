import type { APIConnection } from '../../types/dashboard';

const BASE_URL = 'https://api.17track.net/track';

export interface TrackingInfo {
  status: string;
  location: string;
  timestamp: string;
}

export async function fetchTrackingInfo(connection: APIConnection, trackingNumber: string): Promise<TrackingInfo> {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      '17token': connection.key,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      numbers: [trackingNumber]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tracking info');
  }

  const data = await response.json();
  const track = data.data[0];

  return {
    status: track.status,
    location: track.location,
    timestamp: track.timestamp
  };
}