import React, { useState } from 'react';
import { Play, BookOpen, Trophy, Zap } from 'lucide-react';
import { translations } from '../data/translations';

interface StartScreenProps {
  language: 'pt' | 'en';
  playerName: string;
  onPlayerNameChange: (name: string) => void;
  onStartGame: () => void;
  onShowInstructions: () => void;
  onShowLeaderboard: () => void;
}

export default function StartScreen({
  language,
  playerName,
  onPlayerNameChange,
  onStartGame,
  onShowInstructions,
  onShowLeaderboard
}: StartScreenProps) {
  const t = translations[language];
  const [nameError, setNameError] = useState(false);

  const handleStartGame = () => {
    if (!playerName.trim()) {
      setNameError(true);
      setTimeout(() => setNameError(false), 2000);
      return;
    }
    onStartGame();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-sm sm:max-w-md space-y-4 sm:space-y-6 fade-in">
        {/* Game Title */}
        <div className="text-center">
          <h1 className="font-futuristic text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-green-400 neon-text mb-2 sm:mb-3">
            {t.gameTitle}
          </h1>
          <div className="flex items-center justify-center gap-2 text-cyan-300">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Futuristic Educational Game</span>
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
        </div>

        {/* Player Name Input */}
        <div className="space-y-2.5 sm:space-y-3">
          <input
            type="text"
            placeholder={t.playerName}
            value={playerName}
            onChange={(e) => onPlayerNameChange(e.target.value)}
            className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-transparent border-2 rounded-lg text-white placeholder-gray-400 font-medium transition-all duration-300 focus:outline-none text-sm sm:text-base ${
              nameError
                ? 'border-red-500 neon-glow text-red-400'
                : 'border-cyan-500 focus:border-purple-500 focus:neon-glow'
            }`}
            maxLength={20}
          />
          {nameError && (
            <p className="text-red-400 text-xs sm:text-sm text-center animate-pulse">
              {t.enterName}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 sm:space-y-3">
          <button
            onClick={handleStartGame}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 active:from-cyan-600 active:to-purple-600 text-white font-bold py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-all duration-300 cyber-button neon-glow transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 touch-friendly"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">{t.play}</span>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <button
              onClick={onShowInstructions}
              className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 active:from-green-600 active:to-cyan-600 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 cyber-button flex items-center justify-center gap-1.5 sm:gap-2 touch-friendly"
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">{t.instructions}</span>
            </button>

            <button
              onClick={onShowLeaderboard}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 active:from-purple-600 active:to-pink-600 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 cyber-button flex items-center justify-center gap-1.5 sm:gap-2 touch-friendly"
            >
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">{t.ranking}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}