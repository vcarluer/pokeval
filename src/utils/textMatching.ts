import { KNOWN_POKEMON, CARD_SUBTYPES } from '../data/cardData';
import { RecognizedText } from '../types/recognition';

const calculateSimilarity = (str1: string, str2: string): number => {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  if (s1 === s2) return 1;
  if (s1.includes(s2) || s2.includes(s1)) return 0.9;
  
  let matches = 0;
  const words1 = s1.split(/\s+/);
  const words2 = s2.split(/\s+/);
  
  words1.forEach(w1 => {
    if (words2.some(w2 => w2.includes(w1) || w1.includes(w2))) {
      matches++;
    }
  });
  
  return matches / Math.max(words1.length, words2.length);
};

export const findBestMatches = (text: string): {
  isPokemonName: boolean;
  isSubtype: boolean;
  similarity: number;
} => {
  let bestNameMatch = 0;
  let bestSubtypeMatch = 0;

  // Vérification des noms de Pokémon
  KNOWN_POKEMON.forEach(pokemon => {
    const similarity = calculateSimilarity(text, pokemon);
    bestNameMatch = Math.max(bestNameMatch, similarity);
  });

  // Vérification des subtypes
  CARD_SUBTYPES.forEach(subtype => {
    const similarity = calculateSimilarity(text, subtype);
    bestSubtypeMatch = Math.max(bestSubtypeMatch, similarity);
  });

  return {
    isPokemonName: bestNameMatch > 0.6,
    isSubtype: bestSubtypeMatch > 0.7,
    similarity: Math.max(bestNameMatch, bestSubtypeMatch)
  };
};