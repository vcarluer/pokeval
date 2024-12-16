import { SearchStrategy, SearchParams } from './types';
import { createStrategy } from './baseStrategy';

export const nameAndTypeWithHPStrategy = createStrategy(
  'Nom, Type et HP',
  'nameAndTypeWithHP',
  ({ name, subtype, hp }: SearchParams) => {
    let query = `name:"${name}" supertype:pokemon`;
    if (subtype) query += ` subtypes:"${subtype}"`;
    if (hp) query += ` hp:${hp}`;
    return query;
  }
);