import React from 'react';
import { Sparkle } from './common/Sparkle';

export const Header: React.FC = () => (
  <div className="text-center space-y-4">
    <div className="relative inline-block">
      <h1 className="pokemon-title text-4xl md:text-5xl">
        Pokeval
      </h1>
      <Sparkle size="lg" position="top-right" />
    </div>
    <p className="text-gray-700 font-medium relative z-10 max-w-md mx-auto">
      Quick Pokemon Card Value Checker
      <span className="absolute -z-10 w-full h-2 bg-yellow-200 bottom-0 left-0 transform -rotate-2"></span>
    </p>
  </div>
);