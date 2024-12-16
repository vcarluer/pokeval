import React from 'react';
import { ClockIcon, TrashIcon } from '@heroicons/react/24/outline';
import { SearchHistoryItem } from '../types/history';
import { Sparkle } from './common/Sparkle';

interface SearchHistoryProps {
  items: SearchHistoryItem[];
  onClear: () => void;
  onItemClick: (item: SearchHistoryItem) => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  items,
  onClear,
  onItemClick
}) => {
  if (items.length === 0) return null;

  return (
    <div className="manga-container p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <ClockIcon className="w-5 h-5 text-pokemon-red" />
          <h2 className="text-lg font-semibold text-gray-800">Historique de recherche</h2>
        </div>
        <button
          onClick={onClear}
          className="text-gray-500 hover:text-gray-700 p-1"
          title="Effacer l'historique"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item)}
            className="sketch-button flex items-center space-x-4 p-4 text-left w-full relative"
          >
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={item.cardName}
                className="w-16 h-24 object-contain rounded"
              />
              <Sparkle size="sm" position="top-right" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.cardName}</h3>
              <p className="text-sm text-gray-600">{item.setName}</p>
              <p className="text-xs text-gray-500">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};