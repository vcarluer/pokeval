import { API_CONFIG } from '../../config/api';

export const getTcgAuthHeader = (): string => {
  return API_CONFIG.TCG_API_KEY;
};