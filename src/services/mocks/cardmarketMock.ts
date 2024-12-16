import { CardmarketCard } from '../../types/pokemon';

const MOCK_CARDS: CardmarketCard[] = [
  {
    idProduct: 'swsh1-1',
    enName: 'Pikachu V',
    expansion: 'Épée et Bouclier',
    expansionSet: 'Sword & Shield',
    rarity: 'Ultra Rare',
    image: 'https://product-images.tcgplayer.com/fit-in/437x437/215825.jpg',
    website: 'https://www.cardmarket.com/fr/Pokemon/Products/Singles/Sword-Shield/Pikachu-V',
    priceGuide: {
      avg30: 15.50,
      lowPrice: 10.00,
      trend: 12.75
    }
  },
  {
    idProduct: 'swsh4-44',
    enName: 'Dracaufeu VMAX',
    expansion: 'Voltage Éclatant',
    expansionSet: 'Sword & Shield',
    rarity: 'Secret Rare',
    image: 'https://product-images.tcgplayer.com/fit-in/437x437/233768.jpg',
    website: 'https://www.cardmarket.com/fr/Pokemon/Products/Singles/Vivid-Voltage/Charizard-VMAX',
    priceGuide: {
      avg30: 185.00,
      lowPrice: 150.00,
      trend: 175.50
    }
  }
];

export const mockCardmarketSearch = (searchQuery: string): { data: CardmarketCard[] } => {
  const normalizedQuery = searchQuery.toLowerCase();
  
  const results = MOCK_CARDS.filter(card => {
    const name = card.enName.toLowerCase();
    const expansion = card.expansion.toLowerCase();
    return name.includes(normalizedQuery) || expansion.includes(normalizedQuery);
  });

  return { data: results };
};