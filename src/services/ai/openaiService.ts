import axios from 'axios';
import { API_CONFIG } from '../../config/api';
import { convertImageToBase64 } from '../../utils/imageProcessing';

const openaiApi = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

interface CardAnalysisResult {
  name?: string;
  subtype?: string;
}

export const analyzeCardText = async (imageFile: File): Promise<CardAnalysisResult> => {
  try {
    const base64Image = await convertImageToBase64(imageFile);
    
    const response = await openaiApi.post('/chat/completions', {
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyse cette carte Pokémon et retourne uniquement un objet JSON avec le nom du Pokémon et son sous-type. Format: {"name": "nom", "subtype": "GX/V/VMAX/etc"}'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 150
    });

    try {
      const content = response.data.choices[0].message.content;
      const result = JSON.parse(content.trim());
      return {
        name: result.name,
        subtype: result.subtype
      };
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', parseError);
      return {
        name: undefined,
        subtype: undefined
      };
    }
  } catch (error) {
    console.error('Erreur OpenAI:', error);
    throw new Error('Erreur lors de l\'analyse de la carte');
  }
};