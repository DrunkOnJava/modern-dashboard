import React from 'react';
import { Settings, Layout, Database } from 'lucide-react';
import { CustomizerTabs } from './customizer/base/CustomizerTabs';
import { LayoutControls } from './customizer/LayoutControls';
import { ContentManager } from './customizer/ContentManager';
import { APIManager } from './customizer/APIManager';
import { useDashboardConfig } from '../hooks/useDashboardConfig';
import type { CustomizerTab } from '../types/customizer';

export function DashboardCustomizer() {
  const { config, updateConfig } = useDashboardConfig();
  const [activeTab, setActiveTab] = React.useState<CustomizerTab>('content');

  const tabs: { id: CustomizerTab; label: string; icon: React.ReactNode }[] = [
    { id: 'content', label: 'Content', icon: <Settings className="w-5 h-5" /> },
    { id: 'layout', label: 'Layout', icon: <Layout className="w-5 h-5" /> },
    { id: 'api', label: 'API', icon: <Database className="w-5 h-5" /> },
  ];

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-white dark:bg-gray-800 shadow-lg border-l border-gray-200 dark:border-gray-700">
      <div className="flex flex-col h-full">
        <CustomizerTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'content' && (
            <ContentManager config={config} onUpdate={updateConfig} />
          )}
          {activeTab === 'layout' && (
            <LayoutControls config={config} onUpdate={updateConfig} />
          )}
          {activeTab === 'api' && (
            <APIManager config={config} onUpdate={updateConfig} />
          )}
        </div>
      </div>
    </div>
  );
}