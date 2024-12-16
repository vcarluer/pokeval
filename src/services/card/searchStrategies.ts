import { TcgCard } from '../../types/pokemon';
import { logInfo, logError } from '../../utils/logger';
import { translateToEnglish } from '../ai/openaiTranslation';

interface SearchParams {
  name: string;
  subtype?: string;
  hp?: string;
}

interface SearchStrategy {
  name: string;
  method: string;
  search: (api: any, params: SearchParams) => Promise<TcgCard[]>;
}

const createStrategy = (
  name: string,
  method: string,
  queryBuilder: (params: SearchParams) => string
): SearchStrategy => ({
  name,
  method,
  search: async (api, params) => {
    try {
      const query = queryBuilder(params);
      
      logInfo(`Recherche ${name}:`, {
        strategy: name,
        params,
        query
      });

      const cards = await api.searchByNameAndType(query);
      
      logInfo(`Résultat recherche ${name}:`, {
        strategy: name,
        cardsFound: cards.length
      });

      return cards;
    } catch (error) {
      logError(`Échec de la stratégie ${name}:`, {
        error,
        params
      });
      return [];
    }
  }
});

// Stratégies avec le nom original
const exactStrategy = createStrategy(
  'Exact',
  'exact',
  ({ name, subtype, hp }) => {
    let query = `!name:"${name}" supertype:pokemon`;
    if (subtype) query += ` subtypes:"${subtype}"`;
    if (hp) query += ` hp:${hp}`;
    return query;
  }
);

const nameAndTypeWithHPStrategy = createStrategy(
  'Nom, Type et HP',
  'nameAndTypeWithHP',
  ({ name, subtype, hp }) => {
    let query = `name:"${name}" supertype:pokemon`;
    if (subtype) query += ` subtypes:"${subtype}"`;
    if (hp) query += ` hp:${hp}`;
    return query;
  }
);

const nameAndHPStrategy = createStrategy(
  'Nom et HP',
  'nameAndHP',
  ({ name, hp }) => {
    let query = `name:"${name}" supertype:pokemon`;
    if (hp) query += ` hp:${hp}`;
    return query;
  }
);

const nameAndTypeStrategy = createStrategy(
  'Nom et Type',
  'nameAndType',
  ({ name, subtype }) => {
    let query = `name:"${name}" supertype:pokemon`;
    if (subtype) query += ` subtypes:"${subtype}"`;
    return query;
  }
);

const combinedNameStrategy = createStrategy(
  'Nom Combiné',
  'combinedName',
  ({ name, subtype }) => {
    const combinedName = subtype ? `${name} ${subtype}` : name;
    return `name:"${combinedName}" supertype:pokemon`;
  }
);

const nameOnlyStrategy = createStrategy(
  'Nom Seul',
  'nameOnly',
  ({ name }) => `name:"${name}" supertype:pokemon`
);

// Versions anglaises des stratégies
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

export const searchStrategies: SearchStrategy[] = [
  exactStrategy,
  nameAndTypeWithHPStrategy,
  nameAndHPStrategy,
  nameAndTypeStrategy,
  combinedNameStrategy,
  nameOnlyStrategy,
  createEnglishStrategy(exactStrategy),
  createEnglishStrategy(nameAndTypeWithHPStrategy),
  createEnglishStrategy(nameAndHPStrategy),
  createEnglishStrategy(nameAndTypeStrategy),
  createEnglishStrategy(combinedNameStrategy),
  createEnglishStrategy(nameOnlyStrategy)
];