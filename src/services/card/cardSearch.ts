import { SearchResult } from '../../types/pokemon';
import { tcgApi } from '../api/tcgApi';
import { logInfo, logError } from '../../utils/logger';
import { searchStrategies } from './searchStrategies/strategies';
import { sortCardsBySimilarity } from '../ai/imageComparison';

export const searchCard = async (
  name: string,
  subtype?: string,
  hp?: string,
  imageFile?: File,
  onStrategyStart?: (strategy: string) => void
): Promise<SearchResult> => {
  logInfo('Début de la recherche:', { name, subtype, hp });

  try {
    const result = await tryAllStrategies(
      name,
      subtype,
      hp,
      imageFile,
      onStrategyStart
    );
    
    if (result) {
      logInfo('Carte trouvée');
      return result;
    }

    throw new Error('Impossible de trouver la carte');
  } catch (error) {
    logError('Erreur lors de la recherche:', error);
    throw error;
  }
};

const tryAllStrategies = async (
  name: string,
  subtype?: string,
  hp?: string,
  imageFile?: File,
  onStrategyStart?: (strategy: string) => void
): Promise<SearchResult | null> => {
  for (const strategy of searchStrategies) {
    try {
      if (onStrategyStart) {
        onStrategyStart(`Recherche par ${strategy.name}`);
      }

      logInfo(`Tentative avec la stratégie: ${strategy.name}`, {
        name,
        subtype,
        hp,
        strategy: strategy.name
      });

      const cards = await strategy.search(tcgApi, { 
        name, 
        subtype, 
        hp 
      });
      
      if (cards.length > 0) {
        logInfo(`Carte trouvée avec la stratégie: ${strategy.name}`, {
          cardsFound: cards.length
        });

        const sortedCards = imageFile && cards.length > 1
          ? await sortCardsBySimilarity(imageFile, cards)
          : cards;

        return {
          cards: sortedCards,
          searchMethod: strategy.name
        };
      }

      logInfo(`Aucune carte trouvée avec la stratégie: ${strategy.name}`);
    } catch (error) {
      logError(`Échec de la stratégie ${strategy.name}:`, {
        error,
        params: { name, subtype, hp }
      });
    }
  }

  return null;
};