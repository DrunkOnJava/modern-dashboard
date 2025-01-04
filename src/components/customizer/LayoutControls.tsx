import React from 'react';
import { Grid, Move } from 'lucide-react';
import { CustomizerSection } from './base/CustomizerSection';
import { LayoutOption } from './layout/LayoutOption';
import { SpacingControl } from './layout/SpacingControl';
import type { DashboardConfig, LayoutType } from '../../types/dashboard';

interface LayoutControlsProps {
  config: DashboardConfig;
  onUpdate: (config: DashboardConfig) => void;
}

export function LayoutControls({ config, onUpdate }: LayoutControlsProps) {
  const handleLayoutChange = (type: LayoutType) => {
    onUpdate({ ...config, layout: { ...config.layout, type } });
  };

  const handleSpacingChange = (spacing: number) => {
    onUpdate({ ...config, layout: { ...config.layout, spacing } });
  };

  return (
    <div className="space-y-6">
      <CustomizerSection title="Layout Type">
        <div className="grid grid-cols-2 gap-4">
          <LayoutOption
            icon={Grid}
            label="Grid Layout"
            selected={config.layout.type === 'grid'}
            onClick={() => handleLayoutChange('grid')}
          />
          <LayoutOption
            icon={Move}
            label="Free-form Layout"
            selected={config.layout.type === 'freeform'}
            onClick={() => handleLayoutChange('freeform')}
          />
        </div>
      </CustomizerSection>

      <CustomizerSection title="Spacing">
        <SpacingControl
          value={config.layout.spacing}
          onChange={handleSpacingChange}
        />
      </CustomizerSection>
    </div>
  );
}