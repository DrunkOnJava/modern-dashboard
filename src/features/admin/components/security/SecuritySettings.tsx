```typescript
import React from 'react';
import { SecurityForm } from './SecurityForm';
import { WhitelistManager } from './WhitelistManager';
import { useSecuritySettings } from '../../hooks/useSecuritySettings';

export function SecuritySettings() {
  const { settings, updateSettings, loading, error } = useSecuritySettings();

  if (loading) {
    return <div className="animate-pulse">Loading security settings...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <SecurityForm 
        settings={settings} 
        onUpdate={updateSettings} 
      />
      <WhitelistManager />
    </div>
  );
}
```