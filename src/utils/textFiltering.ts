import { RecognizedText } from '../types/recognition';

const sortByConfidence = (texts: RecognizedText[]): RecognizedText[] => {
  return [...texts].sort((a, b) => b.confidence - a.confidence);
};

export const filterRecognizedTexts = async (
  texts: RecognizedText[],
  imageFile: File
): Promise<{
  pokemonNames: RecognizedText[];
  subtypes: RecognizedText[];
}> => {
  if (!texts || texts.length === 0) {
    return { pokemonNames: [], subtypes: [] };
  }

  // Filtrer les textes par longueur et type
  const pokemonNames = texts.filter(text => 
    text.text.length > 3 && 
    !text.text.match(/^(GX|V|VMAX|EX)$/i)
  );

  const subtypes = texts.filter(text => 
    text.text.match(/^(GX|V|VMAX|EX)$/i)
  );

  return {
    pokemonNames: sortByConfidence(pokemonNames),
    subtypes: sortByConfidence(subtypes)
  };
};