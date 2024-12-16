import { SearchStrategy } from './types';
import { createStrategy } from './baseStrategy';
import { translateToEnglish } from '../../ai/openaiTranslation';
import { logError } from '../../../utils/logger';

// Stratégies de base
const nameAndTypeWithHPStrategy = createStrategy(
  'Nom + Type + HP',
  'nameAndTypeWithHP',
  ({ name, subtype, hp }) => {
    let query = `name:"${name}" supertype:pokemon`;
    if (subtype) query += ` subtypes:"${subtype}"`;
    if (hp) query += ` hp:${hp}`;
    return query;
  }
);

const nameAndHPStrategy = createStrategy(
  'Nom + HP',
  'nameAndHP',
  ({ name, hp }) => {
    let query = `name:"${name}" supertype:pokemon`;
    if (hp) query += ` hp:${hp}`;
    return query;
  }
);

const nameAndTypeStrategy = createStrategy(
  'Nom + Type',
  'nameAndType',
  ({ name, subtype }) => {
    let query = `name:"${name}" supertype:pokemon`;
    if (subtype) query += ` subtypes:"${subtype}"`;
    return query;
  }
);

const nameOnlyStrategy = createStrategy(
  'Nom',
  'nameOnly',
  ({ name }) => `name:"${name}" supertype:pokemon`
);

// Création des versions anglaises
const createEnglishStrategy = (baseStrategy: SearchStrategy): SearchStrategy => ({
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

// Liste des stratégies dans l'ordre de priorité
const baseStrategies = [
  nameAndTypeWithHPStrategy,
  nameAndHPStrategy,
  nameAndTypeStrategy,
  nameOnlyStrategy
];

// Export des stratégies dans l'ordre de priorité
export const searchStrategies: SearchStrategy[] = [
  ...baseStrategies,
  ...baseStrategies.map(createEnglishStrategy)
];