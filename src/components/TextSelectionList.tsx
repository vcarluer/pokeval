import React from 'react';
import { RecognizedText } from '../types/recognition';
import { formatConfidence } from '../utils/format';

interface TextSelectionListProps {
  texts: RecognizedText[];
  selectedText: string;
  onSelect: (text: string) => void;
  placeholder: string;
}

export const TextSelectionList: React.FC<TextSelectionListProps> = ({
  texts,
  selectedText,
  onSelect,
  placeholder
}) => {
  if (!texts || texts.length === 0) {
    return (
      <div className="text-gray-500 text-sm p-4 text-center bg-gray-50 rounded-lg">
        {placeholder}
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-60 overflow-y-auto">
      {texts.map((text, index) => (
        <button
          key={`${text.text}-${index}`}
          onClick={() => onSelect(text.text)}
          className={`sketch-button w-full p-3 text-left ${
            selectedText === text.text
              ? 'bg-pokemon-red text-white'
              : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="font-medium">
              {text.text}
            </span>
            <span className={`text-sm px-2 py-1 rounded ${
              selectedText === text.text
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-500'
            }`}>
              {formatConfidence(text.confidence)}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};