import axios from 'axios';
import { API_CONFIG } from '../../config/api';
import { OpenAIError } from '../../types/analysis';

export const openaiClient = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

openaiClient.interceptors.response.use(
  response => response,
  (error: OpenAIError) => {
    const status = error.response?.status;
    const message = error.response?.data?.error?.message;

    switch (status) {
      case 429:
        throw new Error('Limite d\'appels API atteinte. Veuillez réessayer plus tard.');
      case 400:
        throw new Error('Format d\'image non supporté ou trop volumineux');
      case 401:
        throw new Error('Erreur d\'authentification avec l\'API');
      default:
        throw new Error(message || 'Erreur lors de l\'analyse de la carte');
    }
  }
);