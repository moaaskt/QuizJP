import React from 'react';
import { Trophy, Crown, Medal, Star, ArrowLeft } from 'lucide-react';
import { Player } from '../types';
import { translations } from '../data/translations';

interface LeaderboardScreenProps {
  language: 'pt' | 'en';
  players: Player[];
  currentPlayer?: string;
  onBack: () => void;
}

export default function LeaderboardScreen({ language, players, currentPlayer, onBack }: LeaderboardScreenProps) {
  const t = translations[language];

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />;
      case 2: return <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />;
      case 3: return <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />;
      default: return <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-gray-400 font-bold text-xs">{position}</div>;
    }
  };

  const getPositionClass = (position: number, isCurrentPlayer: boolean) => {
    let baseClass = "glassmorphism rounded-lg p-2.5 sm:p-3 transition-all duration-300 ";
    
    if (isCurrentPlayer) {
      baseClass += "border-2 border-cyan-500 neon-glow ";
    }
    
    switch (position) {
      case 1: return baseClass + "bg-gradient-to-r from-yellow-500/20 to-orange-500/20";
      case 2: return baseClass + "bg-gradient-to-r from-gray-400/20 to-gray-500/20";
      case 3: return baseClass + "bg-gradient-to-r from-orange-400/20 to-orange-500/20";
      default: return baseClass + "bg-gray-800/30";
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-3 lg:p-4 overflow-hidden">
      <div className="max-w-lg w-full h-[90vh] flex flex-col fade-in">
        {/* Header */}
        <div className="text-center mb-3 sm:mb-4">
          <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 mx-auto mb-2 sm:mb-3 pulse-animation" />
          <h1 className="font-futuristic text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-1.5">
            {t.leaderboard}
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm">
            {language === 'pt' ? 'Os melhores jogadores de todos os tempos' : 'The best players of all time'}
          </p>
        </div>

        {/* Leaderboard - Scrollable Area */}
        <div className="flex-1 overflow-y-auto pb-2 custom-scrollbar">
          {players.length === 0 ? (
            <div className="glassmorphism rounded-xl p-4 sm:p-6 text-center">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2 sm:mb-3" />
              <p className="text-sm sm:text-base text-gray-400">{t.noScores}</p>
            </div>
          ) : (
            <>
              {/* Top 3 Podium - Hidden on mobile */}
              {players.length >= 3 && (
                <div className="hidden sm:grid grid-cols-3 gap-3 mb-4 sm:mb-6">
                  {/* 2nd Place */}
                  <div className="text-center slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="glassmorphism rounded-lg p-2.5 sm:p-3 bg-gradient-to-r from-gray-400/20 to-gray-500/20 mb-2">
                      <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 mx-auto mb-1.5" />
                      <div className="text-xs sm:text-sm font-bold text-white truncate">{players[1].name}</div>
                      <div className="text-sm sm:text-base font-bold text-gray-300">{players[1].score}</div>
                      <div className="text-xs text-gray-400">2º</div>
                    </div>
                  </div>

                  {/* 1st Place */}
                  <div className="text-center slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="glassmorphism rounded-lg p-3 sm:p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 mb-2 transform scale-105">
                      <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400 mx-auto mb-1.5 pulse-animation" />
                      <div className="text-sm sm:text-base font-bold text-white truncate">{players[0].name}</div>
                      <div className="text-base sm:text-lg font-bold text-yellow-400 neon-text">{players[0].score}</div>
                      <div className="text-xs text-yellow-400">👑 CAMPEÃO</div>
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="text-center slide-up" style={{ animationDelay: '0.3s' }}>
                    <div className="glassmorphism rounded-lg p-2.5 sm:p-3 bg-gradient-to-r from-orange-400/20 to-orange-500/20 mb-2">
                      <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 mx-auto mb-1.5" />
                      <div className="text-xs sm:text-sm font-bold text-white truncate">{players[2].name}</div>
                      <div className="text-sm sm:text-base font-bold text-orange-400">{players[2].score}</div>
                      <div className="text-xs text-gray-400">3º</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Leaderboard */}
              <div className="glassmorphism rounded-xl p-3 sm:p-4">
                <div className="space-y-2">
                  {players.slice(0, 10).map((player, index) => {
                    const position = index + 1;
                    const isCurrentPlayer = player.name === currentPlayer;
                    
                    return (
                      <div 
                        key={`${player.name}-${player.timestamp}`}
                        className={getPositionClass(position, isCurrentPlayer)}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            {getPositionIcon(position)}
                            <div className="min-w-0 flex-1">
                              <div className={`font-bold truncate ${isCurrentPlayer ? 'text-cyan-400' : 'text-white'} text-xs sm:text-sm`}>
                                {player.name}
                                {isCurrentPlayer && <span className="ml-1 text-xs text-cyan-400">(Você / You)</span>}
                              </div>
                              <div className="text-xs text-gray-400 truncate">
                                {formatDate(player.timestamp)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className={`text-sm sm:text-base font-bold ${
                              position === 1 ? 'text-yellow-400' :
                              position === 2 ? 'text-gray-300' :
                              position === 3 ? 'text-orange-400' :
                              'text-white'
                            }`}>
                              {player.score}
                            </div>
                            <div className="text-xs text-gray-400">{t.points}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Back Button - Fixed at bottom */}
        <div className="pt-3 pb-1 sticky bottom-0 bg-gradient-to-t from-gray-900/80 to-transparent">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 active:from-gray-700 active:to-gray-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 w-full max-w-xs mx-auto flex items-center justify-center gap-1.5 touch-friendly"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{t.backToMenu}</span>
          </button>
        </div>
      </div>
    </div>
  );
}