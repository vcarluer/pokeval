import { openaiClient } from './openaiClient';
import { logInfo, logError } from '../../utils/logger';

export const translateToEnglish = async (name: string): Promise<string> => {
  try {
    const response = await openaiClient.post('/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Traduis uniquement ce nom de Pokémon en anglais, retourne uniquement le nom traduit sans autre texte : ${name}`
        }
      ],
      max_tokens: 50,
      temperature: 0.1
    });

    const englishName = response.data?.choices?.[0]?.message?.content?.trim();
    logInfo('Traduction du nom:', { 
      original: name, 
      translated: englishName 
    });

    if (!englishName) {
      throw new Error('Réponse de traduction invalide');
    }

    return englishName;
  } catch (error) {
    logError('Erreur lors de la traduction:', error);
    throw error;
  }
};