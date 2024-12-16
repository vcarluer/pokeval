import { RecognizedText } from '../types/recognition';
import { findBestMatches } from './textMatching';
import { calculateTextScore, TextScore } from './scoring';

export const sortRecognizedTexts = (texts: RecognizedText[]): RecognizedText[] => {
  // Calculer les scores pour chaque texte
  const scoredTexts: (RecognizedText & { score: number })[] = texts.map(text => {
    const matches = findBestMatches(text.text);
    const score = calculateTextScore(
      text,
      matches.similarity,
      matches.isPokemonName,
      matches.isType
    );
    return { ...text, score: score.score };
  });

  // Trier par score décroissant
  return scoredTexts.sort((a, b) => b.score - a.score);
};