import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { IconPicker } from './IconPicker';
import type { DashboardCardData } from '../types/dashboard';
import { generateId } from '../utils/helpers';

interface AddCardModalProps {
  onAdd: (card: DashboardCardData) => void;
  onClose: () => void;
}

export function AddCardModal({ onAdd, onClose }: AddCardModalProps) {
  const [title, setTitle] = useState('');
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [format, setFormat] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<any>(null);
  const [color, setColor] = useState('blue');

  const colors = [
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'green', class: 'bg-green-500' },
    { name: 'red', class: 'bg-red-500' },
    { name: 'yellow', class: 'bg-yellow-500' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'pink', class: 'bg-pink-500' },
    { name: 'orange', class: 'bg-orange-500' },
    { name: 'teal', class: 'bg-teal-500' },
    { name: 'indigo', class: 'bg-indigo-500' },
    { name: 'cyan', class: 'bg-cyan-500' },
    { name: 'emerald', class: 'bg-emerald-500' },
    { name: 'rose', class: 'bg-rose-500' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedIcon) return;

    onAdd({
      id: generateId(),
      title,
      value: 0,
      icon: selectedIcon,
      color,
      minValue,
      maxValue,
      format
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Add New Card</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Value Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={minValue}
                onChange={(e) => setMinValue(Number(e.target.value))}
                placeholder="Min"
                className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="number"
                value={maxValue}
                onChange={(e) => setMaxValue(Number(e.target.value))}
                placeholder="Max"
                className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Format (e.g., "$", "%", "ms")
            </label>
            <input
              type="text"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Color
            </label>
            <div className="flex gap-2">
              {colors.map(({ name, class: bgClass }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setColor(name)}
                  className={`w-8 h-8 rounded-full ${bgClass} 
                    ${color === name ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Icon
            </label>
            <IconPicker onSelect={setSelectedIcon} selectedIcon={selectedIcon} />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
              transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Card
          </button>
        </form>
      </div>
    </div>
  );
}