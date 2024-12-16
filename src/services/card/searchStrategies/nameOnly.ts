import { SearchStrategy, SearchParams } from './types';
import { createStrategy } from './baseStrategy';

export const nameOnlyStrategy = createStrategy(
  'Nom Seul',
  'nameOnly',
  ({ name }: SearchParams) => `name:"${name}" supertype:pokemon`
);