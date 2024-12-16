import axios from 'axios';
import { API_CONFIG } from '../../config/api';

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

const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1];
        if (!base64Data) {
          reject(new Error('Format de fichier invalide'));
          return;
        }
        resolve(base64Data);
      } catch (error) {
        reject(new Error('Erreur lors du traitement de l\'image'));
      }
    };
    reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
    reader.readAsDataURL(file);
  });
};

export const analyzeCardImage = async (imageFile: File): Promise<CardAnalysisResult> => {
  try {
    const base64Image = await readFileAsBase64(imageFile);
    
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

    const content = response.data.choices[0].message.content;
    
    try {
      const result = JSON.parse(content.trim());
      return {
        name: result.name,
        subtype: result.subtype
      };
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', parseError);
      return {};
    }
  } catch (error) {
    console.error('Erreur lors de l\'analyse:', error);
    throw new Error('Erreur lors de l\'analyse de la carte');
  }
};