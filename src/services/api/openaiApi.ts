import { createApiClient } from '../../utils/api';
import { API_CONFIG } from '../../config/api';
import { CardAnalysisResult } from '../../types/analysis';
import { ANALYSIS_PROMPT } from '../../constants/prompts';
import { imageToBase64 } from '../../utils/base64';
import { logInfo } from '../../utils/logger';

const openaiApiClient = createApiClient(
  'https://api.openai.com/v1',
  {
    'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  }
);

export const openaiApi = {
  analyzeCard: async (imageFile: File): Promise<CardAnalysisResult> => {
    const base64Image = await imageToBase64(imageFile);
    
    const response = await openaiApiClient.post('/chat/completions', {
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

    const jsonStr = content.trim().replace(/^```json\s*|\s*```$/g, '');
    const result = JSON.parse(jsonStr);

    return {
      name: result.name,
      subtype: result.subtype === 'null' ? undefined : result.subtype,
      tcgId: result.tcgId === 'null' ? undefined : result.tcgId
    };
  }
};