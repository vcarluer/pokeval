import React from 'react';
import { PRICE_LANGUAGES } from '../constants/languages';

interface LanguageFilterProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const LanguageFilter: React.FC<LanguageFilterProps> = ({
  selectedLanguage,
  onLanguageChange
}) => {
  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
      <label className="text-sm font-medium text-gray-700">
        Langue :
      </label>
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      >
        {PRICE_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};