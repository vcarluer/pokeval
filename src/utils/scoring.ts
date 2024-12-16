const WEIGHTS = {
  CONFIDENCE: 0.4,      // Poids pour la confiance de reconnaissance
  SIMILARITY: 0.6,      // Poids pour la similarité avec la base de référence
  NAME_BONUS: 0.2,      // Bonus pour les noms de Pokémon
  SUBTYPE_BONUS: 0.15,  // Bonus pour les subtypes
  LENGTH_BONUS: 0.05    // Petit bonus pour la longueur du texte
};

export interface TextScore {
  text: string;
  score: number;
  confidence: number;
  similarity: number;
  isPokemonName: boolean;
  isSubtype: boolean;
}

export const calculateTextScore = (
  text: RecognizedText,
  similarity: number,
  isPokemonName: boolean,
  isSubtype: boolean
): TextScore => {
  const normalizedConfidence = text.confidence / 100;
  const lengthBonus = Math.min(text.text.length / 20, 1) * WEIGHTS.LENGTH_BONUS;

  let score = (
    normalizedConfidence * WEIGHTS.CONFIDENCE +
    similarity * WEIGHTS.SIMILARITY +
    lengthBonus
  );

  if (isPokemonName) score += WEIGHTS.NAME_BONUS;
  if (isSubtype) score += WEIGHTS.SUBTYPE_BONUS;

  score = Math.min(1, score);

  return {
    text: text.text,
    score,
    confidence: normalizedConfidence,
    similarity,
    isPokemonName,
    isSubtype
  };
};