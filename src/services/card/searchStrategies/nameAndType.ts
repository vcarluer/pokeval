import { SearchStrategy, SearchParams } from './types';
import { createStrategy } from './baseStrategy';

export const nameAndTypeStrategy = createStrategy(
  'Nom et Type',
  'nameAndType',
  ({ name, subtype }: SearchParams) => {
    let query = `name:"${name}" supertype:pokemon`;
    if (subtype) query += ` subtypes:"${subtype}"`;
    return query;
  }
);