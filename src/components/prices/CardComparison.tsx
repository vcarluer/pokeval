import React from 'react';

interface CardComparisonProps {
  userCardImage: string;
  recognizedCardImage: string;
  cardName: string;
}

export const CardComparison: React.FC<CardComparisonProps> = ({
  userCardImage,
  recognizedCardImage,
  cardName
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
      <div className="flex flex-col items-center">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Votre carte</h4>
        <div className="relative">
          <img
            src={userCardImage}
            alt="Votre carte"
            className="w-40 h-56 object-contain rounded-lg shadow-md"
          />
          <div className="sparkle absolute -top-2 -right-2"></div>
        </div>
      </div>

      <div className="flex items-center justify-center w-12 h-12">
        <div className="w-8 h-8 border-t-2 border-r-2 border-pokemon-red transform rotate-45"></div>
      </div>

      <div className="flex flex-col items-center">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Carte reconnue</h4>
        <div className="relative">
          <img
            src={recognizedCardImage}
            alt={cardName}
            className="w-40 h-56 object-contain rounded-lg shadow-md"
          />
          <div className="sparkle absolute -top-2 -right-2"></div>
        </div>
      </div>
    </div>
  );
};