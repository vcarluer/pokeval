import React from 'react';

interface RecognitionInfoProps {
  name?: string;
  englishName?: string;
  subtype?: string;
  hp?: string;
  cardFound?: boolean;
  searchProgress?: string[];
}

export const RecognitionInfo: React.FC<RecognitionInfoProps> = ({ 
  name,
  englishName,
  subtype,
  hp,
  cardFound = false,
  searchProgress = []
}) => {
  if (!name) return null;

  return (
    <div className="manga-container p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Votre carte
        </h3>
        <div className="relative">
          <div className="sparkle absolute -top-2 -right-2"></div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-700">Nom :</span>
          <span className="text-pokemon-red">{name}</span>
        </div>

        {englishName && (
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-700">Nom anglais :</span>
            <span className="text-pokemon-red">{englishName}</span>
          </div>
        )}

        {subtype && (
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-700">Type :</span>
            <span className="text-pokemon-red">{subtype}</span>
          </div>
        )}

        {hp && (
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-700">Points de vie :</span>
            <span className="text-pokemon-red">{hp}</span>
          </div>
        )}
      </div>

      {searchProgress.length > 0 && !cardFound && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Progression de la recherche :</h4>
          <div className="space-y-1">
            {searchProgress.map((progress, index) => (
              <p key={index} className="text-sm text-gray-600">
                {progress}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          {cardFound 
            ? "Carte identifiée avec succès !"
            : "Recherche de correspondances en cours..."}
        </p>
      </div>
    </div>
  );
};