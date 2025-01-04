import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  items?: Omit<SidebarItem, 'items'>[];
}

interface SidebarProps {
  items: SidebarItem[];
  activeItem?: string;
  onSelect: (itemId: string) => void;
  className?: string;
}

export function Sidebar({ items, activeItem, onSelect, className = '' }: SidebarProps) {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderItem = (item: SidebarItem, depth = 0) => {
    const isActive = item.id === activeItem;
    const hasSubItems = item.items && item.items.length > 0;
    const isExpanded = expandedItems.includes(item.id);

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasSubItems) {
              toggleExpanded(item.id);
            } else {
              onSelect(item.id);
            }
          }}
          className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg
            ${isActive
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          style={{ paddingLeft: `${depth * 1.5 + 0.75}rem` }}
        >
          {item.icon}
          <span className="flex-1 text-left">{item.label}</span>
          {hasSubItems && (
            <ChevronDown className={`w-4 h-4 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`} />
          )}
        </button>
        {hasSubItems && isExpanded && (
          <div className="mt-1">
            {item.items!.map(subItem => renderItem(subItem, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`space-y-1 ${className}`}>
      {items.map(item => renderItem(item))}
    </nav>
  );
}