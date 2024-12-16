import { openaiClient } from './openaiClient';
import { imageToBase64 } from '../../utils/base64';
import { TcgCard } from '../../types/pokemon';
import { logInfo, logError } from '../../utils/logger';

const COMPARISON_PROMPT = `Compare visuellement ces deux cartes Pokémon en te concentrant UNIQUEMENT sur les aspects visuels suivants, en ignorant COMPLÈTEMENT tout texte :

1. Illustration principale :
   - Position et pose du Pokémon
   - Palette de couleurs
   - Style artistique
   - Détails de l'arrière-plan

2. Éléments graphiques :
   - Type de bordure
   - Motifs décoratifs
   - Effets visuels (holographique, texture, etc.)
   - Composition globale

IMPORTANT : Ne prends PAS en compte :
- Le texte (noms, descriptions, etc.)
- Les symboles d'énergie
- Les numéros
- La langue utilisée

Retourne uniquement un score de 0 à 100 représentant la similarité visuelle, où :
100 = Images visuellement identiques
75-99 = Même illustration avec variations mineures
50-74 = Même Pokémon, pose similaire
25-49 = Même Pokémon, illustration différente
0-24 = Illustrations différentes

Retourne UNIQUEMENT le score numérique, sans texte additionnel.`;

export const compareImages = async (
  userImage: string,
  referenceImage: string
): Promise<number> => {
  try {
    const response = await openaiClient.post('/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: COMPARISON_PROMPT },
            {
              type: 'image_url',
              image_url: { url: userImage }
            },
            {
              type: 'image_url',
              image_url: { url: referenceImage }
            }
          ]
        }
      ],
      max_tokens: 10,
      temperature: 0.1
    });

    const content = response.data?.choices?.[0]?.message?.content?.trim() || '0';
    const score = parseInt(content.match(/\d+/)?.[0] || '0');

    logInfo('Score de comparaison:', {
      score,
      rawResponse: content
    });

    return isNaN(score) ? 0 : Math.min(100, Math.max(0, score));
  } catch (error) {
    logError('Erreur lors de la comparaison d\'images:', error);
    return 0;
  }
};

export const sortCardsBySimilarity = async (
  userImageFile: File,
  cards: TcgCard[]
): Promise<TcgCard[]> => {
  try {
    const userImageBase64 = await imageToBase64(userImageFile);
    const userImageUrl = `data:image/jpeg;base64,${userImageBase64}`;

    // Comparer les cartes par lots de 3 pour éviter la surcharge
    const batchSize = 3;
    const scoredCards = [];
    
    for (let i = 0; i < cards.length; i += batchSize) {
      const batch = cards.slice(i, i + batchSize);
      const batchScores = await Promise.all(
        batch.map(async (card) => {
          const score = await compareImages(userImageUrl, card.images.large);
          return { card, score };
        })
      );
      scoredCards.push(...batchScores);

      // Log des scores du lot
      logInfo(`Scores batch ${i / batchSize + 1}:`, 
        batchScores.map(({ card, score }) => ({
          name: card.name,
          set: card.set.name,
          score
        }))
      );

      // Petite pause entre les lots
      if (i + batchSize < cards.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Tri des cartes
    const sortedCards = scoredCards
      .sort((a, b) => {
        // D'abord par score de similarité
        const scoreDiff = b.score - a.score;
        if (scoreDiff !== 0) return scoreDiff;
        
        // En cas d'égalité, privilégier les cartes plus récentes
        return (b.card.set.series || '').localeCompare(a.card.set.series || '');
      })
      .map(({ card }) => card);

    // Log du résultat final
    logInfo('Classement final:', 
      sortedCards.map((card, index) => ({
        position: index + 1,
        name: card.name,
        set: card.set.name,
        score: scoredCards.find(sc => sc.card.id === card.id)?.score
      }))
    );

    return sortedCards;
  } catch (error) {
    logError('Erreur lors du tri des cartes:', error);
    return cards;
  }
};