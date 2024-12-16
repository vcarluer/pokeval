import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  subMessage?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Analyse en cours...',
  subMessage
}) => (
  <div className="text-center space-y-3">
    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
    <div className="space-y-1">
      <p className="text-gray-700 font-medium">{message}</p>
      {subMessage && (
        <p className="text-sm text-gray-500">{subMessage}</p>
      )}
    </div>
  </div>
);