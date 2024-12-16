import React from 'react';
import { formatPrice } from '../../utils/format';
import { PriceItem } from './PriceItem';
import { CardPrices } from '../../types/pokemon';

interface MarketPricesProps {
  prices: NonNullable<CardPrices['cardmarket']>['prices'];
}

export const MarketPrices: React.FC<MarketPricesProps> = ({ prices }) => (
  <div className="grid grid-cols-2 gap-4">
    {prices.averageSellPrice && (
      <PriceItem
        label="Prix moyen de vente"
        value={formatPrice(prices.averageSellPrice)}
      />
    )}
    {prices.lowPrice && (
      <PriceItem
        label="Prix le plus bas"
        value={formatPrice(prices.lowPrice)}
      />
    )}
    {prices.trendPrice && (
      <PriceItem
        label="Tendance du marché"
        value={formatPrice(prices.trendPrice)}
      />
    )}
  </div>
);