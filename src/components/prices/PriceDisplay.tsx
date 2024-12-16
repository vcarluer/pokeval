import React, { useState } from 'react';
import { PokemonCard } from '../../types/pokemon';
import { formatPrice } from '../../utils/format';
import { CardComparison } from './CardComparison';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';

interface PriceDisplayProps {
  card: PokemonCard;
  userCardImage?: string;
  searchMethod?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  card, 
  userCardImage,
  searchMethod
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const averagePrice = card.cardmarket?.prices?.averageSellPrice || 0;
  const trendPrice = card.cardmarket?.prices?.trendPrice || 0;
  const previousTrendPrice = averagePrice; // Pour la démo, on compare avec le prix moyen

  const trendDirection = trendPrice > previousTrendPrice ? 'up' : 'down';
  const trendPercentage = previousTrendPrice ? 
    Math.abs(((trendPrice - previousTrendPrice) / previousTrendPrice) * 100) : 
    0;

  const hasCardmarketPrices = card.cardmarket?.prices && (
    card.cardmarket.prices.averageSellPrice ||
    card.cardmarket.prices.lowPrice ||
    card.cardmarket.prices.trendPrice
  );

  const hasTcgPlayerPrices = card.tcgplayer?.prices && (
    (card.tcgplayer.prices.holofoil?.market || card.tcgplayer.prices.holofoil?.low) ||
    (card.tcgplayer.prices.normal?.market || card.tcgplayer.prices.normal?.low)
  );

  if (!hasCardmarketPrices && !hasTcgPlayerPrices) {
    return (
      <div className="manga-container p-6">
        <p className="text-center text-gray-600">
          Aucun prix disponible pour cette carte
        </p>
      </div>
    );
  }

  return (
    <div className="manga-container p-6 space-y-6">
      {searchMethod && (
        <div className="text-center bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            Carte trouvée avec la stratégie : <span className="font-medium text-pokemon-red">{searchMethod}</span>
          </p>
        </div>
      )}

      {userCardImage && (
        <CardComparison
          userCardImage={userCardImage}
          recognizedCardImage={card.imageUrl}
          cardName={card.name}
        />
      )}
      
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800">{card.name}</h3>
        <p className="text-sm text-gray-600">{card.setName} - {card.rarity}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Prix moyen */}
        <div className="col-span-1 bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Prix moyen</p>
          <p className="text-2xl font-bold text-green-600">
            {formatPrice(averagePrice)}
          </p>
        </div>

        {/* Tendance */}
        <div className="col-span-1 bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-gray-600">Tendance</p>
            {trendDirection === 'up' ? (
              <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />
            ) : (
              <ArrowTrendingDownIcon className="w-5 h-5 text-red-500" />
            )}
          </div>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-green-600">
              {formatPrice(trendPrice)}
            </p>
            <span className={`text-sm ${
              trendDirection === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {trendPercentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Section détails dépliable */}
      <div className="border-t pt-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between text-gray-700 hover:text-gray-900"
        >
          <span className="font-medium">Détails des prix</span>
          {showDetails ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </button>

        {showDetails && (
          <div className="mt-4 space-y-6">
            {/* Prix Cardmarket */}
            {hasCardmarketPrices && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Prix Cardmarket</h4>
                <table className="w-full">
                  <tbody>
                    {card.cardmarket?.prices?.averageSellPrice && (
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Prix moyen de vente</td>
                        <td className="py-2 text-right font-medium text-green-600">
                          {formatPrice(card.cardmarket.prices.averageSellPrice)}
                        </td>
                      </tr>
                    )}
                    {card.cardmarket?.prices?.lowPrice && (
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Prix minimum</td>
                        <td className="py-2 text-right font-medium text-green-600">
                          {formatPrice(card.cardmarket.prices.lowPrice)}
                        </td>
                      </tr>
                    )}
                    {card.cardmarket?.prices?.trendPrice && (
                      <tr>
                        <td className="py-2 text-gray-600">Tendance du marché</td>
                        <td className="py-2 text-right font-medium text-green-600">
                          {formatPrice(card.cardmarket.prices.trendPrice)}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Prix TCGPlayer */}
            {hasTcgPlayerPrices && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Prix TCGPlayer</h4>
                {card.tcgplayer?.prices?.holofoil && (
                  <>
                    <p className="text-sm font-medium text-gray-700 mt-3">Version Holofoil</p>
                    <table className="w-full">
                      <tbody>
                        {card.tcgplayer.prices.holofoil.market && (
                          <tr className="border-b">
                            <td className="py-2 text-gray-600">Prix du marché</td>
                            <td className="py-2 text-right font-medium text-green-600">
                              {formatPrice(card.tcgplayer.prices.holofoil.market)}
                            </td>
                          </tr>
                        )}
                        {card.tcgplayer.prices.holofoil.low && (
                          <tr className="border-b">
                            <td className="py-2 text-gray-600">Prix minimum</td>
                            <td className="py-2 text-right font-medium text-green-600">
                              {formatPrice(card.tcgplayer.prices.holofoil.low)}
                            </td>
                          </tr>
                        )}
                        {card.tcgplayer.prices.holofoil.high && (
                          <tr>
                            <td className="py-2 text-gray-600">Prix maximum</td>
                            <td className="py-2 text-right font-medium text-green-600">
                              {formatPrice(card.tcgplayer.prices.holofoil.high)}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </>
                )}

                {card.tcgplayer?.prices?.normal && (
                  <>
                    <p className="text-sm font-medium text-gray-700 mt-3">Version Normale</p>
                    <table className="w-full">
                      <tbody>
                        {card.tcgplayer.prices.normal.market && (
                          <tr className="border-b">
                            <td className="py-2 text-gray-600">Prix du marché</td>
                            <td className="py-2 text-right font-medium text-green-600">
                              {formatPrice(card.tcgplayer.prices.normal.market)}
                            </td>
                          </tr>
                        )}
                        {card.tcgplayer.prices.normal.low && (
                          <tr className="border-b">
                            <td className="py-2 text-gray-600">Prix minimum</td>
                            <td className="py-2 text-right font-medium text-green-600">
                              {formatPrice(card.tcgplayer.prices.normal.low)}
                            </td>
                          </tr>
                        )}
                        {card.tcgplayer.prices.normal.high && (
                          <tr>
                            <td className="py-2 text-gray-600">Prix maximum</td>
                            <td className="py-2 text-right font-medium text-green-600">
                              {formatPrice(card.tcgplayer.prices.normal.high)}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {card.cardMarketUrl && (
        <div className="text-center pt-4">
          <a
            href={card.cardMarketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sketch-button inline-block px-6 py-2 text-pokemon-red hover:bg-gray-50"
          >
            Voir sur le marché
          </a>
        </div>
      )}
    </div>
  );
};