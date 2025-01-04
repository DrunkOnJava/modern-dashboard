import React from 'react';

interface CryptoConfigProps {
  config: { coins: string[] };
  onChange: (config: { coins: string[] }) => void;
}

export function CryptoConfig({ config, onChange }: CryptoConfigProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Cryptocurrencies (comma-separated)
      </label>
      <input
        type="text"
        value={config.coins.join(', ')}
        onChange={(e) => onChange({ 
          ...config, 
          coins: e.target.value.split(',').map(coin => coin.trim().toLowerCase())
        })}
        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="bitcoin, ethereum, dogecoin"
        required
      />
    </div>
  );
}