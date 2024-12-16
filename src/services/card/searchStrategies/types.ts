import { TcgCard } from '../../../types/pokemon';

export interface SearchParams {
  name: string;
  subtype?: string;
  hp?: string;
}

export interface SearchStrategy {
  name: string;
  method: string;
  search: (api: any, params: SearchParams) => Promise<TcgCard[]>;
}