import { createApiClient } from '../../utils/api';
import { API_CONFIG } from '../../config/api';
import { TcgCard } from '../../types/pokemon';
import { logInfo, logError } from '../../utils/logger';

const tcgApiClient = createApiClient(
  'https://api.pokemontcg.io/v2',
  { 'X-Api-Key': API_CONFIG.TCG_API_KEY }
);

export const tcgApi = {
  searchByNameAndType: async (query: string): Promise<TcgCard[]> => {
    try {
      logInfo('Recherche TCG:', { query });

      const response = await tcgApiClient.get('/cards', {
        params: {
          q: query,
          orderBy: '-set.releaseDate',
          pageSize: 10
        }
      });

      const cards = response.data?.data || [];
      logInfo('Résultat recherche TCG:', { 
        query,
        cardsFound: cards.length 
      });

      return cards;
    } catch (error) {
      logError('Erreur recherche TCG:', {
        query,
        error: error instanceof Error ? error.message : error
      });
      throw new Error('Erreur lors de la recherche TCG');
    }
  }
};