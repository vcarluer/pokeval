export interface CardPrices {
  cardmarket?: {
    url?: string;
    prices?: {
      averageSellPrice?: number;
      lowPrice?: number;
      trendPrice?: number;
    };
  };
  tcgplayer?: {
    url?: string;
    prices?: {
      holofoil?: {
        market?: number;
        low?: number;
        high?: number;
      };
      normal?: {
        market?: number;
        low?: number;
        high?: number;
      };
    };
  };
}

export interface TcgCard extends CardPrices {
  id: string;
  name: string;
  rarity: string;
  images: {
    small: string;
    large: string;
  };
  set: {
    name: string;
    series: string;
  };
}

export interface PokemonCard extends CardPrices {
  id: string;
  name: string;
  imageUrl: string;
  setName: string;
  rarity: string;
  cardMarketUrl?: string;
}

export interface SearchResult {
  cards: TcgCard[];
  searchMethod: string;
}

export interface PokemonInfo {
  name: string;
  types: string[];
}