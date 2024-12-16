import { SearchStrategy, SearchParams } from './types';
import { logInfo, logError } from '../../../utils/logger';

export const createStrategy = (
  name: string,
  method: string,
  queryBuilder: (params: SearchParams) => string
): SearchStrategy => ({
  name,
  method,
  search: async (api, params) => {
    try {
      const query = queryBuilder(params);
      
      logInfo(`Recherche ${name}:`, {
        strategy: name,
        params,
        query
      });

      const cards = await api.searchByNameAndType(query);
      
      logInfo(`Résultat recherche ${name}:`, {
        strategy: name,
        cardsFound: cards.length
      });

      return cards;
    } catch (error) {
      logError(`Échec de la stratégie ${name}:`, {
        error,
        params
      });
      return [];
    }
  }
});