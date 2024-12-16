import { PokemonCard, TcgCard } from '../../types/pokemon';
import { logInfo } from '../../utils/logger';

export interface AnalysisResult {
  success: boolean;
  card?: PokemonCard;
  error?: string;
}

export const analyzePokemonCard = async (
  imageFile: File,
  selectedCard: TcgCard
): Promise<AnalysisResult> => {
  try {
    logInfo('Analyse de la carte:', {
      cardName: selectedCard.name,
      setName: selectedCard.set.name
    });

    const card: PokemonCard = {
      id: selectedCard.id,
      name: selectedCard.name,
      imageUrl: selectedCard.images.large,
      setName: selectedCard.set.name,
      rarity: selectedCard.rarity,
      cardMarketUrl: selectedCard.cardmarket?.url,
      cardmarket: selectedCard.cardmarket,
      tcgplayer: selectedCard.tcgplayer
    };

    return {
      success: true,
      card
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur lors de l\'analyse de la carte'
    };
  }
};