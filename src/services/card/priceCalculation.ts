import { TcgCard } from '../../types/pokemon';

const calculateAveragePrice = (prices: number[]): number => {
  if (prices.length === 0) return 0;
  const validPrices = prices.filter(price => isFinite(price) && price > 0);
  if (validPrices.length === 0) return 0;
  return validPrices.reduce((sum, price) => sum + price, 0) / validPrices.length;
};

const extractPrices = (card: TcgCard) => {
  const prices = {
    market: [] as number[],
    low: [] as number[],
    high: [] as number[],
    trend: [] as number[]
  };

  if (card.cardmarket?.prices) {
    const { averageSellPrice, lowPrice, trendPrice } = card.cardmarket.prices;
    if (averageSellPrice) prices.market.push(averageSellPrice);
    if (lowPrice) prices.low.push(lowPrice);
    if (trendPrice) prices.trend.push(trendPrice);
  }

  if (card.tcgplayer?.prices) {
    const { holofoil, normal } = card.tcgplayer.prices;
    
    if (holofoil) {
      if (holofoil.market) prices.market.push(holofoil.market);
      if (holofoil.low) prices.low.push(holofoil.low);
      if (holofoil.high) prices.high.push(holofoil.high);
    }
    
    if (normal) {
      if (normal.market) prices.market.push(normal.market);
      if (normal.low) prices.low.push(normal.low);
      if (normal.high) prices.high.push(normal.high);
    }
  }

  return prices;
};

export const calculatePrices = (card: TcgCard) => {
  const prices = extractPrices(card);

  return {
    market: calculateAveragePrice(prices.market),
    low: Math.min(...prices.low.filter(p => p > 0), Infinity),
    high: Math.max(...prices.high.filter(p => p > 0), 0),
    trend: calculateAveragePrice(prices.trend)
  };
};