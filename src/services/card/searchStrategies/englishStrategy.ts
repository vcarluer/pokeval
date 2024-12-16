import { SearchStrategy } from './types';
import { translateToEnglish } from '../../ai/openaiTranslation';
import { logError } from '../../../utils/logger';

export const createEnglishStrategy = (baseStrategy: SearchStrategy): SearchStrategy => ({
  name: `${baseStrategy.name} (EN)`,
  method: `${baseStrategy.method}English`,
  search: async (api, params) => {
    try {
      const englishName = await translateToEnglish(params.name);
      return baseStrategy.search(api, { ...params, name: englishName });
    } catch (error) {
      logError(`Échec de la stratégie ${baseStrategy.name} (EN):`, {
        error,
        params
      });
      return [];
    }
  }
});