import { PokemonInfo } from '../types/pokemon';

export const POKEMON_TYPES = [
  'Normal', 'Feu', 'Eau', 'Électrik', 'Plante', 'Glace', 'Combat', 'Poison',
  'Sol', 'Vol', 'Psy', 'Insecte', 'Roche', 'Spectre', 'Dragon', 'Ténèbres',
  'Acier', 'Fée'
];

// Liste partielle des Pokémon les plus connus pour l'exemple
export const KNOWN_POKEMON: PokemonInfo[] = [
  { name: 'Pikachu', types: ['Électrik'] },
  { name: 'Dracaufeu', types: ['Feu', 'Vol'] },
  { name: 'Mewtwo', types: ['Psy'] },
  { name: 'Rondoudou', types: ['Normal', 'Fée'] },
  { name: 'Évoli', types: ['Normal'] },
  // Ajoutez d'autres Pokémon selon les besoins
];