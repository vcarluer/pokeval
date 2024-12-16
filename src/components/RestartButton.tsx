import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface RestartButtonProps {
  onRestart: () => void;
}

export const RestartButton: React.FC<RestartButtonProps> = ({ onRestart }) => (
  <button
    onClick={onRestart}
    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
  >
    <ArrowPathIcon className="w-4 h-4 mr-2" />
    Nouvelle recherche
  </button>
);