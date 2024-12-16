import React from 'react';
import { formatPrice } from '../../utils/format';
import { PriceItem } from './PriceItem';
import { CardPrices } from '../../types/pokemon';

interface TcgPlayerPricesProps {
  prices: NonNullable<CardPrices['tcgplayer']>['prices'];
}

export const TcgPlayerPrices: React.FC<TcgPlayerPricesProps> = ({ prices }) => (
  <div className="space-y-4">
    {prices.holofoil && (
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Version Holofoil</p>
        <div className="grid grid-cols-2 gap-4">
          {prices.holofoil.market && (
            <PriceItem
              label="Prix du marché"
              value={formatPrice(prices.holofoil.market)}
            />
          )}
          {prices.holofoil.low && (
            <PriceItem
              label="Prix minimum"
              value={formatPrice(prices.holofoil.low)}
            />
          )}
          {prices.holofoil.high && (
            <PriceItem
              label="Prix maximum"
              value={formatPrice(prices.holofoil.high)}
            />
          )}
        </div>
      </div>
    )}
    
    {prices.normal && (
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Version Normale</p>
        <div className="grid grid-cols-2 gap-4">
          {prices.normal.market && (
            <PriceItem
              label="Prix du marché"
              value={formatPrice(prices.normal.market)}
            />
          )}
          {prices.normal.low && (
            <PriceItem
              label="Prix minimum"
              value={formatPrice(prices.normal.low)}
            />
          )}
          {prices.normal.high && (
            <PriceItem
              label="Prix maximum"
              value={formatPrice(prices.normal.high)}
            />
          )}
        </div>
      </div>
    )}
  </div>
);