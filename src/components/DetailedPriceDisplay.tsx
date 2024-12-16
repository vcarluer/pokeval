import React from 'react';
import { MarketPrices } from './prices/MarketPrices';
import { TcgPlayerPrices } from './prices/TcgPlayerPrices';
import { PriceSection } from './prices/PriceSection';
import { CardPrices } from '../types/pokemon';

interface DetailedPriceDisplayProps {
  cardmarket?: CardPrices['cardmarket'];
  tcgplayer?: CardPrices['tcgplayer'];
}

export const DetailedPriceDisplay: React.FC<DetailedPriceDisplayProps> = ({
  cardmarket,
  tcgplayer
}) => {
  const hasCardmarketPrices = cardmarket?.prices && (
    cardmarket.prices.averageSellPrice ||
    cardmarket.prices.lowPrice ||
    cardmarket.prices.trendPrice
  );

  const hasTcgPlayerPrices = tcgplayer?.prices && (
    (tcgplayer.prices.holofoil?.market || tcgplayer.prices.holofoil?.low) ||
    (tcgplayer.prices.normal?.market || tcgplayer.prices.normal?.low)
  );

  if (!hasCardmarketPrices && !hasTcgPlayerPrices) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Aucun prix disponible pour cette carte</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {hasCardmarketPrices && (
        <PriceSection title="Prix Cardmarket">
          <MarketPrices prices={cardmarket.prices} />
        </PriceSection>
      )}

      {hasTcgPlayerPrices && (
        <PriceSection title="Prix TCGPlayer">
          <TcgPlayerPrices prices={tcgplayer.prices} />
        </PriceSection>
      )}
    </div>
  );
};