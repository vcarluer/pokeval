import { recognizeImage } from './imageRecognition';
import { tcgApi } from '../api/tcgApi';
import { CardIdentificationError } from '../../utils/errors';

export const identifyCard = async (imageFile: File): Promise<string> => {
  try {
    const tags = await recognizeImage(imageFile);
    
    if (!tags || tags.length === 0) {
      throw new CardIdentificationError('Aucun élément n\'a été trouvé pour cette image');
    }

    const searchTags = tags
      .filter(tag => !['card', 'pokemon', 'trading'].includes(tag.className))
      .slice(0, 5)
      .map(tag => tag.className)
      .join(' ');

    if (!searchTags) {
      throw new CardIdentificationError('Pas assez d\'informations pour identifier la carte');
    }

    const response = await tcgApi.get('/cards', {
      params: {
        q: `name:"${searchTags}"`,
        pageSize: 1,
        orderBy: '-set.releaseDate'
      }
    });

    if (!response.data?.data?.[0]?.id) {
      throw new CardIdentificationError('Aucune carte correspondante trouvée');
    }

    return response.data.data[0].id;
  } catch (error) {
    console.error('Erreur lors de l\'identification:', error);
    throw new CardIdentificationError(
      error instanceof Error ? error.message : 'Erreur lors de l\'identification de la carte'
    );
  }
};