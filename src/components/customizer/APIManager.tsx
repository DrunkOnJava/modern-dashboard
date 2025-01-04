import React from 'react';
import { CustomizerSection } from './base/CustomizerSection';
import { APIConnectionForm } from './api/APIConnectionForm';
import { APIConnectionList } from './api/APIConnectionList';
import type { DashboardConfig, APIConnection } from '../../types/dashboard';
import { useAPIValidation } from '../../hooks/useAPIValidation';

interface APIManagerProps {
  config: DashboardConfig;
  onUpdate: (config: DashboardConfig) => void;
}

export function APIManager({ config, onUpdate }: APIManagerProps) {
  const { validateAPI, isValidating, validationError } = useAPIValidation();

  const handleAddConnection = async (connection: Omit<APIConnection, 'id'>) => {
    const isValid = await validateAPI(connection as APIConnection);
    if (!isValid) return;

    onUpdate({
      ...config,
      apiConnections: [
        ...config.apiConnections,
        {
          id: crypto.randomUUID(),
          ...connection
        }
      ]
    });
  };

  const handleRemoveConnection = (id: string) => {
    onUpdate({
      ...config,
      apiConnections: config.apiConnections.filter(conn => conn.id !== id)
    });
  };

  const handleUpdateInterval = (id: string, interval: number) => {
    onUpdate({
      ...config,
      apiConnections: config.apiConnections.map(conn =>
        conn.id === id ? { ...conn, refreshInterval: interval } : conn
      )
    });
  };

  return (
    <div className="space-y-6">
      <CustomizerSection title="API Connections">
        <APIConnectionList
          connections={config.apiConnections}
          onRemove={handleRemoveConnection}
          onUpdateInterval={handleUpdateInterval}
        />
      </CustomizerSection>

      <CustomizerSection title="Add New Connection">
        <APIConnectionForm
          onSubmit={handleAddConnection}
          isValidating={isValidating}
          error={validationError}
        />
      </CustomizerSection>
    </div>
  );
}