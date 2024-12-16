import React from 'react';
import { PokemonCard } from '../types/pokemon';
import { DetailedPriceDisplay } from './DetailedPriceDisplay';

interface PriceDisplayProps {
  card: PokemonCard;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ card }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center justify-center">
        <img
          src={card.imageUrl}
          alt={card.name}
          className="w-48 h-48 object-contain rounded-lg"
        />
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800">{card.name}</h3>
        <p className="text-sm text-gray-600">{card.setName} - {card.rarity}</p>
      </div>

      <DetailedPriceDisplay 
        cardmarket={card.cardmarket}
        tcgplayer={card.tcgplayer}
      />

      {card.cardMarketUrl && (
        <div className="text-center pt-4">
          <a
            href={card.cardMarketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Voir sur le marché
          </a>
        </div>
      )}
    </div>
  );
};