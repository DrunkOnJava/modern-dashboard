import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';
import { DarkModeToggle } from '../../../../components/DarkModeToggle';
import { useDarkMode } from '../../../../hooks/useDarkMode';

export function AdminHeader() {
  const { signOut } = useAuth();
  const [isDark, setIsDark] = useDarkMode();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <DarkModeToggle 
              isDark={isDark} 
              onToggle={() => setIsDark(!isDark)} 
            />
            
            <Link 
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Back to Dashboard
            </Link>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}