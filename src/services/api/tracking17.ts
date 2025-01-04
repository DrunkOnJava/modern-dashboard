import type { APIConnection } from '../../types/dashboard';

export interface TrackingInfo {
  status: string;
  location: string;
  timestamp: string;
}

export async function fetchTrackingInfo(connection: APIConnection, trackingNumber: string): Promise<TrackingInfo> {
  if (!trackingNumber?.trim()) {
    throw new Error('Tracking number is required');
  }


  if (!connection.key) {
    throw new Error('17Track API key is required');
  }

  try {
    // Add delay to respect rate limits
    const lastCallTime = (window as any).__last17TrackCall;
    const now = Date.now();
    if (lastCallTime && now - lastCallTime < 1000) {
      await new Promise(resolve => setTimeout(resolve, 1000 - (now - lastCallTime)));
    }
    (window as any).__last17TrackCall = Date.now();

    const response = await fetch(`${connection.endpoint}/register`, {
      method: 'POST',
      headers: {
        '17token': connection.key,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        numbers: [trackingNumber],
        timeZoneOffset: new Date().getTimezoneOffset()
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch tracking info (${response.status})`);
    }

    const data = await response.json();

    if (!data.data?.[0]) {
      throw new Error(`No tracking data available for ${trackingNumber}`);
    }

    const track = data.data[0];

    return {
      status: track.status || 'Unknown',
      location: track.location || 'Unknown',
      timestamp: track.lastUpdate || new Date().toISOString()
    };
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error(`Failed to fetch tracking info for ${trackingNumber}`);
  }
}