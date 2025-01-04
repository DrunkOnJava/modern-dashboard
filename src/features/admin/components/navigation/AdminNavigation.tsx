import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Database, Shield, Activity, Settings } from 'lucide-react';

const navItems = [
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/api', icon: Database, label: 'API' },
  { to: '/admin/security', icon: Shield, label: 'Security' },
  { to: '/admin/activity', icon: Activity, label: 'Activity' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' }
];

export function AdminNavigation() {
  return (
    <nav className="w-64 bg-white dark:bg-gray-800 h-[calc(100vh-4rem)] border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => 
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}