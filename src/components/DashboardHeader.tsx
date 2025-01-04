import React from 'react';
import { ArrowUpDown, Plus, Download, Upload, Keyboard, LogIn, User, LogOut, Settings, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { DarkModeToggle } from './DarkModeToggle';
import { Link } from 'react-router-dom';
import type { SortBy } from '../types/dashboard';

interface DashboardHeaderProps {
  onToggleSort: () => void;
  onAddCard: () => void;
  sortBy: SortBy;
  isDark: boolean;
  onToggleDarkMode: () => void;
  onExport: () => void;
  onImport: () => void;
  onShowShortcuts: () => void;
  onCustomize: () => void;
  onProfile: () => void;
  groupCards: boolean;
  onToggleGrouping: () => void;
}

export function DashboardHeader({ 
  onToggleSort,
  onAddCard,
  sortBy,
  isDark,
  onToggleDarkMode,
  onExport,
  onImport,
  onShowShortcuts,
  onCustomize,
  onProfile,
  groupCards,
  onToggleGrouping
}: DashboardHeaderProps) {
  const { user, isGuest, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">System Dashboard</h1>
            
            {/* Admin Link - Only show for admin users */}
            {user?.user_metadata?.role === 'admin' && (
              <Link 
                to="/admin"
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 
                  text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Center section */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSort}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg 
                bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>Sort by {sortBy === 'title' ? 'value' : 'title'}</span>
            </button>

            <button
              onClick={onAddCard}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg 
                hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Card</span>
            </button>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <DarkModeToggle isDark={isDark} onToggle={onToggleDarkMode} />
            
            <button
              onClick={onCustomize}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 
                dark:hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>

            {isGuest ? (
              <Link
                to="/auth"
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-500 
                  text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onProfile}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 
                    dark:hover:text-white transition-colors"
                >
                  <User className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 
                    dark:hover:text-white transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}