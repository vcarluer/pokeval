import React, { useState, useEffect } from 'react';
import { RecognizedText } from '../types/recognition';
import { TextSelectionList } from './TextSelectionList';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { filterRecognizedTexts } from '../utils/textFiltering';

interface TextSelectionPanelProps {
  recognizedTexts: RecognizedText[];
  onConfirm: (cardName: string, cardType?: string) => void;
  onCancel: () => void;
  imageFile: File;
}

export const TextSelectionPanel: React.FC<TextSelectionPanelProps> = ({
  recognizedTexts,
  onConfirm,
  onCancel,
  imageFile
}) => {
  const [selectedName, setSelectedName] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [filteredTexts, setFilteredTexts] = useState<{
    pokemonNames: RecognizedText[];
    subtypes: RecognizedText[];
  }>({ pokemonNames: [], subtypes: [] });

  useEffect(() => {
    const processTexts = async () => {
      const filtered = await filterRecognizedTexts(recognizedTexts, imageFile);
      setFilteredTexts(filtered);
      
      // Sélectionner automatiquement le premier résultat avec la plus haute confiance
      if (filtered.pokemonNames.length > 0) {
        setSelectedName(filtered.pokemonNames[0].text);
      }
      if (filtered.subtypes.length > 0) {
        setSelectedType(filtered.subtypes[0].text);
      }
    };
    processTexts();
  }, [recognizedTexts, imageFile]);

  const handleConfirm = () => {
    if (!selectedName) return;
    onConfirm(selectedName, selectedType || undefined);
  };

  return (
    <div className="manga-container p-6 space-y-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Nom de la carte
          </h3>
          <TextSelectionList
            texts={filteredTexts.pokemonNames}
            selectedText={selectedName}
            onSelect={setSelectedName}
            placeholder="Sélectionnez le nom de la carte"
          />
        </div>

        <div className="border-t pt-4">
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="flex items-center justify-between w-full text-left text-gray-600 hover:text-gray-900"
          >
            <span className="text-sm font-medium">Type de carte (optionnel)</span>
            {isAdvancedOpen ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </button>

          {isAdvancedOpen && (
            <div className="mt-4">
              <TextSelectionList
                texts={filteredTexts.subtypes}
                selectedText={selectedType}
                onSelect={setSelectedType}
                placeholder="Sélectionnez le type de carte (ex: GX, V, VMAX...)"
              />
            </div>
          )}
        </div>
      </div>

      {(selectedName || selectedType) && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md space-y-2">
          {selectedName && (
            <div>
              <span className="font-medium text-gray-700">Nom sélectionné : </span>
              <span className="text-blue-600">{selectedName}</span>
            </div>
          )}
          {selectedType && (
            <div>
              <span className="font-medium text-gray-700">Type de carte : </span>
              <span className="text-blue-600">{selectedType}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
        <button
          onClick={onCancel}
          className="sketch-button px-4 py-2 text-sm font-medium text-gray-700"
        >
          Annuler
        </button>
        <button
          onClick={handleConfirm}
          disabled={!selectedName}
          className={`sketch-button px-4 py-2 text-sm font-medium ${
            selectedName
              ? 'bg-pokemon-red text-white hover:bg-pokemon-dark-red'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Confirmer
        </button>
      </div>
    </div>
  );
};