import { openaiClient } from './openaiClient';
import { imageToBase64 } from '../../utils/base64';
import { CardAnalysisResult } from '../../types/analysis';
import { logInfo, logError } from '../../utils/logger';
import { ANALYSIS_PROMPT } from '../../constants/prompts';

export const analyzeCard = async (imageFile: File): Promise<CardAnalysisResult> => {
  try {
    const base64Image = await imageToBase64(imageFile);
    
    const response = await openaiClient.post('/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: ANALYSIS_PROMPT },
            {
              type: 'image_url',
              image_url: { url: `data:image/jpeg;base64,${base64Image}` }
            }
          ]
        }
      ],
      max_tokens: 150,
      temperature: 0.1
    });

    const content = response.data?.choices?.[0]?.message?.content;
    logInfo('Réponse OpenAI:', content);

    if (!content) {
      throw new Error('Réponse invalide de l\'API');
    }

    return parseAnalysisResponse(content);
  } catch (error) {
    logError('Erreur lors de l\'analyse:', error);
    throw error;
  }
};

const parseAnalysisResponse = (content: string): CardAnalysisResult => {
  try {
    const jsonStr = content.trim().replace(/^```json\s*|\s*```$/g, '');
    const result = JSON.parse(jsonStr);
    
    if (!result.name || typeof result.name !== 'string') {
      throw new Error('Format de nom invalide');
    }
    
    return {
      name: result.name,
      englishName: result.englishName === 'null' ? undefined : result.englishName,
      subtype: result.subtype === 'null' ? undefined : result.subtype,
      hp: result.hp === 'null' ? undefined : result.hp
    };
  } catch (parseError) {
    logError('Erreur de parsing JSON:', parseError);
    throw new Error('Format de réponse invalide');
  }
};