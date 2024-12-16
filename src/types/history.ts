export interface SearchHistoryItem {
  id: string;
  cardId?: string; // ID de la carte dans l'API TCG
  date: string;
  cardName: string;
  imageUrl: string;
  setName: string;
}