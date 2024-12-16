import React, { useState } from 'react';
import { RecognizedText } from '../services/card/textRecognition';
import clsx from 'clsx';

interface RecognitionStepProps {
  recognizedTexts: RecognizedText[];
  onConfirm: (cardName: string, cardType: string, cardId: string) => void;
  onCancel: () => void;
}

export const RecognitionStep: React.FC<RecognitionStepProps> = ({ 
  recognizedTexts, 
  onConfirm, 
  onCancel 
}) => {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string>('');

  // Trier tous les textes par confiance et limiter à 20
  const sortedTexts = [...recognizedTexts]
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 20);

  const handleNameToggle = (text: string) => {
    setSelectedNames(prev => 
      prev.includes(text)
        ? prev.filter(name => name !== text)
        : [...prev, text]
    );
  };

  const handleConfirm = () => {
    if (selectedNames.length > 0 && selectedType && selectedId) {
      const fullCardName = selectedNames.join(' ');
      onConfirm(fullCardName, selectedType, selectedId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h3 className="text-xl font-semibold text-center">Textes détectés sur la carte</h3>
      
      <div className="space-y-6">
        {/* Sélection du nom */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">
            Sélectionnez les parties du nom de la carte (sélection multiple possible) :
          </h4>
          <div className="grid gap-2">
            {sortedTexts.map((text, index) => (
              <button
                key={index}
                onClick={() => handleNameToggle(text.text)}
                className={clsx(
                  'p-2 text-left rounded-md transition-colors border',
                  selectedNames.includes(text.text)
                    ? 'bg-blue-100 border-blue-500'
                    : 'hover:bg-gray-50 border-gray-200'
                )}
              >
                <div className="flex justify-between items-center">
                  <span>{text.text}</span>
                  <span className="text-sm text-gray-500">
                    {text.confidence.toFixed(1)}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sélection du type */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Sélectionnez le type de la carte :</h4>
          <div className="grid gap-2">
            {sortedTexts.map((text, index) => (
              <button
                key={index}
                onClick={() => setSelectedType(text.text)}
                className={clsx(
                  'p-2 text-left rounded-md transition-colors border',
                  selectedType === text.text
                    ? 'bg-blue-100 border-blue-500'
                    : 'hover:bg-gray-50 border-gray-200'
                )}
              >
                <div className="flex justify-between items-center">
                  <span>{text.text}</span>
                  <span className="text-sm text-gray-500">
                    {text.confidence.toFixed(1)}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sélection de l'ID */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Sélectionnez le numéro d'identification :</h4>
          <div className="grid gap-2 max-h-96 overflow-y-auto">
            {sortedTexts.map((text, index) => (
              <button
                key={index}
                onClick={() => setSelectedId(text.text)}
                className={clsx(
                  'p-2 text-left rounded-md transition-colors border',
                  selectedId === text.text
                    ? 'bg-blue-100 border-blue-500'
                    : 'hover:bg-gray-50 border-gray-200'
                )}
              >
                <div className="flex justify-between items-center">
                  <span>{text.text}</span>
                  <span className="text-sm text-gray-500">
                    {text.confidence.toFixed(1)}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Résumé des sélections */}
        <div className="space-y-4 p-4 bg-gray-50 rounded-md">
          {selectedNames.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700">Nom complet sélectionné :</h4>
              <p className="text-blue-600">{selectedNames.join(' ')}</p>
            </div>
          )}
          {selectedType && (
            <div>
              <h4 className="font-medium text-gray-700">Type sélectionné :</h4>
              <p className="text-blue-600">{selectedType}</p>
            </div>
          )}
          {selectedId && (
            <div>
              <h4 className="font-medium text-gray-700">ID sélectionné :</h4>
              <p className="text-blue-600">{selectedId}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={handleConfirm}
          disabled={selectedNames.length === 0 || !selectedType || !selectedId}
          className={clsx(
            'px-4 py-2 rounded-md transition-colors',
            selectedNames.length > 0 && selectedType && selectedId
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          )}
        >
          Confirmer la sélection
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
};