import { CardmarketCard, TcgCard } from '../types/pokemon';

export const mapCardmarketToCard = (cardmarketCard: CardmarketCard): TcgCard => ({
  id: cardmarketCard.idProduct,
  name: cardmarketCard.enName,
  setName: cardmarketCard.expansion,
  rarity: cardmarketCard.rarity,
  images: {
    small: cardmarketCard.image,
    large: cardmarketCard.image
  },
  cardmarket: {
    url: cardmarketCard.website,
    prices: {
      averageSellPrice: cardmarketCard.priceGuide?.avg30,
      lowPrice: cardmarketCard.priceGuide?.lowPrice,
      trendPrice: cardmarketCard.priceGuide?.trend
    }
  },
  set: {
    name: cardmarketCard.expansion,
    series: cardmarketCard.expansionSet
  }
});