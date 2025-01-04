import React, { useState } from 'react';
import { Grip, Plus, X } from 'lucide-react';
import { WidgetPicker } from './WidgetPicker';
import type { DashboardConfig, Widget } from '../../types/dashboard';

interface ContentManagerProps {
  config: DashboardConfig;
  onUpdate: (config: DashboardConfig) => void;
}

export function ContentManager({ config, onUpdate }: ContentManagerProps) {  
  const [showWidgetPicker, setShowWidgetPicker] = useState(false);

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const items = Array.from(config.widgets);
    const [reorderedItem] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, reorderedItem);
    onUpdate({ ...config, widgets: items });
  };

  const handleAddWidget = (widget: Widget) => {
    onUpdate({
      ...config,
      widgets: [...config.widgets, widget]
    });
    setShowWidgetPicker(false);
  };

  const handleRemoveWidget = (widgetId: string) => {
    onUpdate({
      ...config,
      widgets: config.widgets.filter(w => w.id !== widgetId)
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Dashboard Content
        </h3>
        <button
          onClick={() => setShowWidgetPicker(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Widget
        </button>
      </div>

      <div className="space-y-2">
        {config.widgets.map((widget, index) => (
          <div
            key={widget.id}
            className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <button
              className="cursor-move"
              onMouseDown={() => {/* Handle reorder */}}
            >
              <Grip className="w-5 h-5 text-gray-400" />
            </button>
                      <span className="flex-1 text-sm text-gray-700 dark:text-gray-200">
                        {widget.title}
                      </span>
                      <button
                        onClick={() => handleRemoveWidget(widget.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

      {showWidgetPicker && (
        <WidgetPicker
          onSelect={handleAddWidget}
          onClose={() => setShowWidgetPicker(false)}
        />
      )}
    </div>
  );
}