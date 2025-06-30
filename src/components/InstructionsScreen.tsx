import React from 'react';
import { ArrowLeft, Target, Star, Gift, Trophy, Sparkles, Globe, BookOpen, GraduationCap } from 'lucide-react';
import { translations } from '../data/translations';

interface InstructionsScreenProps {
  language: 'pt' | 'en';
  onBack: () => void;
}

export default function InstructionsScreen({ language, onBack }: InstructionsScreenProps) {
  const t = translations[language];

  const categoryIcons = {
    culture: Globe,
    language: BookOpen,
    education: GraduationCap
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-3 lg:p-4">
      <div className="max-w-md w-full space-y-3 sm:space-y-4 fade-in">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-futuristic text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2 sm:mb-3">
            {t.instructionsTitle}
          </h1>
        </div>

        {/* Instructions Content */}
        <div className="glassmorphism rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4">
          {/* Game Rules */}
          <div className="space-y-2.5 sm:space-y-3">
            {t.instructionsText.map((instruction, index) => (
              <div key={index} className="flex items-start gap-2 slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {index + 1}
                </div>
                <p className="text-gray-200 leading-relaxed text-xs sm:text-sm">{instruction}</p>
              </div>
            ))}
          </div>

          {/* Categories */}
          <div className="border-t border-gray-600 pt-3 sm:pt-4">
            <h3 className="text-sm sm:text-base font-semibold text-cyan-400 mb-2 sm:mb-3 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {t.categories}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {(['culture', 'language', 'education'] as const).map((category) => {
                const Icon = categoryIcons[category];
                return (
                  <div key={category} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-2 sm:p-2.5 border border-gray-600">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                      <span className="font-semibold text-white text-xs sm:text-sm">{t[category]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Point System */}
          <div className="border-t border-gray-600 pt-3 sm:pt-4">
            <h3 className="text-sm sm:text-base font-semibold text-green-400 mb-2 sm:mb-3 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Sistema de Pontos / Point System
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-1.5 sm:p-2 text-center">
                <div className="text-green-400 font-bold text-xs sm:text-sm">10pts</div>
                <div className="text-xs text-gray-300">Easy/Fácil</div>
              </div>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-1.5 sm:p-2 text-center">
                <div className="text-yellow-400 font-bold text-xs sm:text-sm">15pts</div>
                <div className="text-xs text-gray-300">Medium/Médio</div>
              </div>
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-1.5 sm:p-2 text-center">
                <div className="text-red-400 font-bold text-xs sm:text-sm">20pts</div>
                <div className="text-xs text-gray-300">Hard/Difícil</div>
              </div>
              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-1.5 sm:p-2 text-center">
                <div className="text-purple-400 font-bold text-xs sm:text-sm">25pts</div>
                <div className="text-xs text-gray-300">Bonus/Bônus</div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 active:from-gray-700 active:to-gray-800 text-white font-semibold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition-all duration-300 cyber-button flex items-center justify-center gap-1.5 mx-auto touch-friendly"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">{t.backToMenu}</span>
          </button>
        </div>
      </div>
    </div>
  );
}