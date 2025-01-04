import React from 'react';
import { Link2, Github, Slack, Mail } from 'lucide-react';

interface ConnectedAccount {
  id: string;
  provider: string;
  connected: boolean;
  icon: React.ElementType;
}

export function ConnectedAccounts() {
  const accounts: ConnectedAccount[] = [
    { id: 'google', provider: 'Google', connected: true, icon: Mail },
    { id: 'github', provider: 'GitHub', connected: false, icon: Github },
    { id: 'slack', provider: 'Slack', connected: false, icon: Slack }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
        <Link2 className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Connected Accounts</h3>
      </div>

      <div className="space-y-4">
        {accounts.map(account => {
          const Icon = account.icon;
          return (
            <div key={account.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-gray-500" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {account.provider}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {account.connected ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  account.connected
                    ? 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
                    : 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
                }`}
              >
                {account.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}