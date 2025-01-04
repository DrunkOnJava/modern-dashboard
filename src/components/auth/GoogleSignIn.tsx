import React from 'react';
import { LogIn } from 'lucide-react';

interface GoogleSignInProps {
  onSignIn: () => Promise<void>;
  loading?: boolean;
}

export function GoogleSignIn({ onSignIn, loading }: GoogleSignInProps) {
  return (
    <button
      onClick={onSignIn}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 
        dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white 
        dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      <LogIn className="w-5 h-5 text-blue-500" />
      <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
    </button>
  );
}