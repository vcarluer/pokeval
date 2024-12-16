import { SearchStrategy, SearchParams } from './types';
import { createStrategy } from './baseStrategy';

export const nameAndHPStrategy = createStrategy(
  'Nom et HP',
  'nameAndHP',
  ({ name, hp }: SearchParams) => {
    let query = `name:"${name}" supertype:pokemon`;
    if (hp) query += ` hp:${hp}`;
    return query;
  }
);