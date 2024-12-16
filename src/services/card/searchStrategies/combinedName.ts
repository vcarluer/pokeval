import { SearchStrategy, SearchParams } from './types';
import { createStrategy } from './baseStrategy';

export const combinedNameStrategy = createStrategy(
  'Nom Combiné',
  'combinedName',
  ({ name, subtype }: SearchParams) => {
    const combinedName = subtype ? `${name} ${subtype}` : name;
    return `name:"${combinedName}" supertype:pokemon`;
  }
);