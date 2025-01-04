import React from 'react';
import { User, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function ProfileCard() {
  const { user } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={user?.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {user?.user_metadata?.full_name || 'User'}
          </h2>
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                Joined {new Date(user?.created_at || '').toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}