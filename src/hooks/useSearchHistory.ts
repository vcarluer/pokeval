import { useState, useEffect, useCallback } from 'react';
import { SearchHistoryItem } from '../types/history';

const HISTORY_KEY = 'pokeval_search_history';
const MAX_HISTORY_ITEMS = 5;

export const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = useCallback((item: Omit<SearchHistoryItem, 'id' | 'date'>) => {
    const newItem: SearchHistoryItem = {
      ...item,
      id: item.cardId || crypto.randomUUID(),
      date: new Date().toISOString()
    };

    setHistory(prev => {
      // Éviter les doublons en vérifiant l'ID de la carte
      const filteredHistory = prev.filter(historyItem => 
        historyItem.cardId !== item.cardId // Utiliser cardId pour la comparaison
      );
      const newHistory = [newItem, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
  }, []);

  return {
    history,
    addToHistory,
    clearHistory
  };
};