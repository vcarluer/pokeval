import { analyzeCardText } from '../ai/openaiService';

export const recognizeCardText = async (imageFile: File): Promise<{name: string, subtype?: string}> => {
  try {
    const result = await analyzeCardText(imageFile);
    if (!result.name) {
      throw new Error('Impossible de reconnaître le nom de la carte');
    }
    return {
      name: result.name,
      subtype: result.subtype
    };
  } catch (error) {
    console.error('Erreur lors de la reconnaissance:', error);
    throw new Error('Erreur lors de la reconnaissance du texte');
  }
};