import { useState, useCallback } from 'react';
import { analyzePokemonCard } from '../services/card/cardAnalysis';
import { searchCard } from '../services/card/cardSearch';
import { analyzeCard } from '../services/ai/cardAnalysis';
import { PokemonCard, TcgCard } from '../types/pokemon';
import { logInfo, logError } from '../utils/logger';
import { tcgApi } from '../services/api/tcgApi';

export const useCardAnalysis = () => {
  const [state, setState] = useState({
    isAnalyzing: false,
    analysisStep: '',
    error: null as string | null,
    analyzedCard: null as PokemonCard | null,
    currentFile: null as File | null,
    foundCards: null as TcgCard[] | null,
    searchMethod: undefined as string | undefined,
    recognizedInfo: null as {
      name?: string;
      englishName?: string;
      subtype?: string;
      hp?: string;
      cardFound?: boolean;
    } | null,
    searchProgress: [] as string[]
  });

  const resetState = useCallback(() => {
    setState({
      isAnalyzing: false,
      analysisStep: '',
      error: null,
      analyzedCard: null,
      currentFile: null,
      foundCards: null,
      searchMethod: undefined,
      recognizedInfo: null,
      searchProgress: []
    });
  }, []);

  const handleImageSelect = useCallback(async (file: File) => {
    setState(prev => ({ 
      ...prev, 
      isAnalyzing: true, 
      error: null, 
      currentFile: file,
      analysisStep: 'Analyse des textes de l\'image',
      searchProgress: []
    }));
    
    try {
      const result = await analyzeCard(file);
      logInfo('Résultat analyse OpenAI:', result);
      
      if (!result.name) {
        throw new Error('Impossible de reconnaître le nom de la carte');
      }

      setState(prev => ({
        ...prev,
        recognizedInfo: {
          ...result,
          cardFound: false
        },
        analysisStep: 'Recherche par similitude des images'
      }));

      const searchResult = await searchCard(
        result.name, 
        result.subtype,
        result.hp,
        file,
        (strategy: string) => {
          setState(prev => ({
            ...prev,
            searchProgress: [...prev.searchProgress, `Essai de la stratégie : ${strategy}`]
          }));
        }
      );
      
      if (searchResult.cards.length === 0) {
        throw new Error('Aucune carte correspondante trouvée');
      }

      const newSearchMethod = searchResult.searchMethod;
      
      if (searchResult.cards.length === 1) {
        const cardResult = await analyzePokemonCard(file, searchResult.cards[0]);
        if (cardResult.success && cardResult.card) {
          setState(prev => ({
            ...prev,
            analyzedCard: cardResult.card,
            searchMethod: newSearchMethod,
            recognizedInfo: { ...prev.recognizedInfo, cardFound: true },
            isAnalyzing: false,
            analysisStep: ''
          }));
        } else {
          throw new Error(cardResult.error || 'Erreur lors de l\'analyse');
        }
      } else {
        setState(prev => ({
          ...prev,
          foundCards: searchResult.cards,
          searchMethod: newSearchMethod,
          recognizedInfo: { ...prev.recognizedInfo, cardFound: true },
          isAnalyzing: false,
          analysisStep: ''
        }));
      }
    } catch (err) {
      logError('Erreur analyse carte:', err);
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Erreur lors de l\'analyse',
        isAnalyzing: false,
        analysisStep: ''
      }));
    }
  }, []);

  const handleCardSelection = useCallback(async (selectedCard: TcgCard) => {
    if (!state.currentFile) return;
    
    setState(prev => ({ 
      ...prev, 
      isAnalyzing: true, 
      error: null,
      analysisStep: 'Analyse de la carte sélectionnée'
    }));
    
    try {
      const result = await analyzePokemonCard(state.currentFile, selectedCard);
      if (result.success && result.card) {
        setState(prev => ({
          ...prev,
          analyzedCard: result.card,
          foundCards: null,
          isAnalyzing: false,
          analysisStep: ''
        }));
      } else {
        throw new Error(result.error || 'Une erreur est survenue lors de l\'analyse');
      }
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Une erreur inattendue est survenue',
        isAnalyzing: false,
        analysisStep: ''
      }));
    }
  }, [state.currentFile]);

  const loadCardById = useCallback(async (cardId: string) => {
    try {
      setState(prev => ({
        ...prev,
        isAnalyzing: true,
        analysisStep: 'Chargement des détails de la carte...',
        error: null
      }));

      const response = await tcgApi.searchByNameAndType(`id:${cardId}`);
      if (response.length === 0) {
        throw new Error('Carte non trouvée');
      }

      const cardResult = await analyzePokemonCard(null, response[0]);
      if (cardResult.success && cardResult.card) {
        setState(prev => ({
          ...prev,
          analyzedCard: cardResult.card,
          isAnalyzing: false,
          analysisStep: ''
        }));
      } else {
        throw new Error(cardResult.error || 'Erreur lors de l\'analyse');
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erreur lors du chargement de la carte',
        isAnalyzing: false,
        analysisStep: ''
      }));
    }
  }, []);

  return {
    ...state,
    handleImageSelect,
    handleCardSelection,
    loadCardById,
    resetState
  };
};