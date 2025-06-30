import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLanguage: 'pt' | 'en';
  onLanguageChange: (lang: 'pt' | 'en') => void;
}

export default function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="fixed top-4 right-4 lg:top-6 lg:right-6 z-50 flex items-center gap-2 lg:gap-3 glassmorphism rounded-lg p-2 lg:p-3">
      <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-400" />
      <button
        onClick={() => onLanguageChange('pt')}
        className={`px-2 py-1 lg:px-3 lg:py-1.5 rounded text-sm lg:text-base font-medium transition-all touch-friendly ${
          currentLanguage === 'pt'
            ? 'bg-cyan-500 text-white neon-glow'
            : 'text-gray-300 hover:text-cyan-400 active:text-cyan-400'
        }`}
      >
        🇧🇷 PT
      </button>
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-2 py-1 lg:px-3 lg:py-1.5 rounded text-sm lg:text-base font-medium transition-all touch-friendly ${
          currentLanguage === 'en'
            ? 'bg-cyan-500 text-white neon-glow'
            : 'text-gray-300 hover:text-cyan-400 active:text-cyan-400'
        }`}
      >
        🇺🇸 EN
      </button>
    </div>
  );
}