import { tcgApi } from '../api/tcgApi';
import { CardPrices } from '../../types/pokemon';
import { PriceRetrievalError } from '../../utils/errors';
import { calculatePrices } from './priceCalculation';

export const getCardPrice = async (cardId: string): Promise<CardPrices> => {
  try {
    const response = await tcgApi.get(`/cards/${cardId}`);
    const card = response.data.data;

    if (!card) {
      throw new PriceRetrievalError('Carte non trouvée');
    }

    const prices = calculatePrices(card);

    if (prices.average === 0) {
      throw new PriceRetrievalError('Aucun prix disponible pour cette carte');
    }

    return prices;
  } catch (error) {
    console.error('Erreur lors de la récupération du prix:', error);
    throw new PriceRetrievalError(
      error instanceof PriceRetrievalError
        ? error.message
        : 'Impossible de récupérer le prix de la carte'
    );
  }
};