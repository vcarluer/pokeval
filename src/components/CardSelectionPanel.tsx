import React from 'react';
import { TcgCard } from '../types/pokemon';
import { Sparkle } from './common/Sparkle';
import clsx from 'clsx';

interface CardSelectionPanelProps {
  cards: TcgCard[];
  onSelect: (card: TcgCard) => void;
  onBack: () => void;
  currentFile: File;
  recognizedInfo?: {
    name?: string;
    subtype?: string;
    hp?: string;
  };
  searchMethod?: string;
}

export const CardSelectionPanel: React.FC<CardSelectionPanelProps> = ({
  cards,
  onSelect,
  onBack,
  currentFile,
  recognizedInfo,
  searchMethod
}) => {
  const userCardImage = currentFile ? URL.createObjectURL(currentFile) : null;

  return (
    <div className="manga-container p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Sélectionnez votre carte
        </h3>
        <p className="text-sm text-gray-600">
          Plusieurs cartes correspondent à votre recherche
        </p>
      </div>

      {userCardImage && (
        <div className="border-b pb-4">
          <h4 className="text-lg font-medium text-gray-800 mb-2">Votre carte :</h4>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={userCardImage}
                alt="Votre carte"
                className="w-40 h-56 object-contain rounded-lg shadow-md"
                onLoad={() => URL.revokeObjectURL(userCardImage)}
              />
              <Sparkle size="md" position="top-right" />
            </div>
            
            {recognizedInfo && (
              <div className="w-full bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Éléments reconnus :</span>
                  <Sparkle size="sm" position="top-right" />
                </div>
                
                {recognizedInfo.name && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Nom :</span>
                    <span className="text-pokemon-red font-medium">{recognizedInfo.name}</span>
                  </div>
                )}
                
                {recognizedInfo.subtype && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Type :</span>
                    <span className="text-pokemon-red font-medium">{recognizedInfo.subtype}</span>
                  </div>
                )}

                {recognizedInfo.hp && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Points de vie :</span>
                    <span className="text-pokemon-red font-medium">{recognizedInfo.hp}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => onSelect(card)}
            className={clsx(
              'sketch-button flex items-center space-x-4 p-4 text-left w-full relative',
              index === 0 && 'bg-yellow-50 border-pokemon-red'
            )}
          >
            <img
              src={card.images.small}
              alt={card.name}
              className="w-20 h-28 object-contain rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{card.name}</h4>
              <p className="text-sm text-gray-600">
                {card.set.series} - {card.set.name}
              </p>
              <p className="text-sm text-gray-600">
                Rareté: {card.rarity}
              </p>
            </div>
            {index === 0 && (
              <>
                <Sparkle size="sm" position="top-right" />
                <div className="absolute top-2 right-2 text-xs font-medium text-pokemon-red bg-white px-2 py-1 rounded-full border border-pokemon-red">
                  Meilleure correspondance
                </div>
              </>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-center pt-4 border-t">
        <button
          onClick={onBack}
          className="sketch-button px-6 py-2 text-sm font-medium text-gray-700"
        >
          Recommencer
        </button>
      </div>
    </div>
  );
};