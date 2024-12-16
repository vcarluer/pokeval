import axios from 'axios';
import { CardmarketError } from '../../types/errors';
import { mockCardmarketSearch } from '../mocks/cardmarketMock';
import { logError } from '../../utils/logger';

// Simulation de l'API Cardmarket en attendant l'accès à l'API réelle
export const cardmarketApi = {
  get: async (endpoint: string, params: any) => {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (endpoint === '/cards/pokemon/find') {
        const result = mockCardmarketSearch(params.search);
        logError('Cardmarket Search Result:', {
          query: params.search,
          resultsCount: result.data.length,
          results: result.data
        });
        return result;
      }
      
      const error = new CardmarketError('Endpoint non supporté');
      logError('Cardmarket API Error - Unsupported Endpoint:', {
        endpoint,
        params
      });
      throw error;
    } catch (error) {
      logError('Cardmarket API Error:', {
        endpoint,
        params,
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });
      
      throw new CardmarketError(
        error instanceof Error ? error.message : 'Erreur lors de la communication avec Cardmarket'
      );
    }
  }
};