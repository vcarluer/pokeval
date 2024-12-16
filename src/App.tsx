import React, { useCallback, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { CardSelectionPanel } from './components/CardSelectionPanel';
import { PriceDisplay } from './components/prices/PriceDisplay';
import { RecognitionInfo } from './components/RecognitionInfo';
import { RestartButton } from './components/RestartButton';
import { SearchHistory } from './components/SearchHistory';
import { useCardAnalysis } from './hooks/useCardAnalysis';
import { useSearchHistory } from './hooks/useSearchHistory';

const App: React.FC = () => {
  const {
    isAnalyzing,
    analysisStep,
    error,
    analyzedCard,
    foundCards,
    currentFile,
    recognizedInfo,
    searchMethod,
    searchProgress,
    handleImageSelect,
    handleCardSelection,
    loadCardById,
    resetState
  } = useCardAnalysis();

  const {
    history,
    addToHistory,
    clearHistory
  } = useSearchHistory();

  const handleHistoryItemClick = useCallback((item) => {
    if (item.cardId) {
      loadCardById(item.cardId);
    }
  }, [loadCardById]);

  const historyItem = useMemo(() => {
    if (!analyzedCard) return null;
    return {
      cardId: analyzedCard.id,
      cardName: analyzedCard.name,
      imageUrl: analyzedCard.imageUrl,
      setName: analyzedCard.setName
    };
  }, [analyzedCard]);

  useEffect(() => {
    if (historyItem) {
      addToHistory(historyItem);
    }
  }, [historyItem, addToHistory]);

  const userCardImageUrl = currentFile ? URL.createObjectURL(currentFile) : undefined;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-8">
        <Header />
        
        {!recognizedInfo && !foundCards && !analyzedCard && (
          <>
            <ImageUploader
              onImageSelect={handleImageSelect}
              isLoading={isAnalyzing}
            />
            <SearchHistory
              items={history}
              onClear={clearHistory}
              onItemClick={handleHistoryItemClick}
            />
          </>
        )}

        {isAnalyzing && (
          <LoadingSpinner 
            message={analysisStep || 'Analyse en cours...'}
            subMessage={searchProgress[searchProgress.length - 1]}
          />
        )}
        
        {error && <ErrorMessage message={error} />}

        {recognizedInfo && !foundCards && !analyzedCard && (
          <RecognitionInfo
            name={recognizedInfo.name}
            englishName={recognizedInfo.englishName}
            subtype={recognizedInfo.subtype}
            hp={recognizedInfo.hp}
            cardFound={recognizedInfo.cardFound}
            searchProgress={searchProgress}
          />
        )}
        
        {foundCards && !isAnalyzing && currentFile && (
          <CardSelectionPanel
            cards={foundCards}
            onSelect={handleCardSelection}
            onBack={resetState}
            currentFile={currentFile}
            recognizedInfo={recognizedInfo}
            searchMethod={searchMethod}
          />
        )}
        
        {analyzedCard && !isAnalyzing && (
          <>
            <PriceDisplay 
              card={analyzedCard} 
              userCardImage={userCardImageUrl}
              searchMethod={searchMethod}
            />
            <div className="flex justify-center mt-6">
              <RestartButton onRestart={resetState} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;