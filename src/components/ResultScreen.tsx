import React from 'react';
import { Trophy, Star, Target, RotateCcw, Eye } from 'lucide-react';
import { translations } from '../data/translations';

// Definição das props que o componente ResultScreen 
interface ResultScreenProps {
  language: 'pt' | 'en'; // Idioma atual da aplicação (português ou inglês)
  playerName: string; // Nome do jogador
  finalScore: number; // Pontuação total obtida
  correctAnswers: number; // Número de respostas corretas
  totalQuestions: number; // Total de perguntas no quiz
  onPlayAgain: () => void; // Função chamada ao clicar em "Jogar Novamente"
  onViewLeaderboard: () => void; // Função chamada ao clicar em "Ver Ranking"
}

export default function ResultScreen({
  language,
  playerName,
  finalScore,
  correctAnswers,
  totalQuestions,
  onPlayAgain,
  onViewLeaderboard
}: ResultScreenProps) {
  // Seleciona as traduções com base no idioma
  const t = translations[language];

  // Calcula a porcentagem de acerto
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

  // Retorna uma mensagem com base no desempenho do usuário
  const getPerformanceMessage = () => {
    if (accuracy >= 90) return language === 'pt' ? '🌟 Excelente! Você é um expert!' : '🌟 Excellent! You are an expert!';
    if (accuracy >= 70) return language === 'pt' ? '🎉 Muito bem! Grande conhecimento!' : '🎉 Well done! Great knowledge!';
    if (accuracy >= 50) return language === 'pt' ? '👍 Bom trabalho! Continue aprendendo!' : '👍 Good job! Keep learning!';
    return language === 'pt' ? '💪 Continue tentando! A prática leva à perfeição!' : '💪 Keep trying! Practice makes perfect!';
  };

  // Define a cor do gradiente com base no desempenho do usuário
  const getScoreColor = () => {
    if (accuracy >= 90) return 'from-yellow-400 to-orange-500';
    if (accuracy >= 70) return 'from-green-400 to-cyan-500';
    if (accuracy >= 50) return 'from-cyan-400 to-purple-500';
    return 'from-purple-400 to-pink-500';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-3 lg:p-4">
      <div className="max-w-md w-full space-y-3 sm:space-y-4 fade-in">
        
        {/* Cabeçalho */}
        <div className="text-center">
          <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 mx-auto mb-2 sm:mb-3 pulse-animation" />
          <h1 className="font-futuristic text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-1.5">
            {t.quizCompleted}
          </h1>
          <p className="text-sm sm:text-base text-gray-300">
            {language === 'pt' ? `Parabéns, ${playerName}!` : `Congratulations, ${playerName}!`}
          </p>
        </div>

        {/* Cartão com os resultados do quiz */}
        <div className="glassmorphism rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4">
          
          {/* Pontuação final */}
          <div className="text-center">
            <div className={`inline-block bg-gradient-to-r ${getScoreColor()} text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl neon-glow`}>
              <div className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5 sm:w-6 sm:h-6" />
                <div>
                  <div className="text-xs font-medium opacity-90">{t.finalScore}</div>
                  <div className="text-lg sm:text-xl font-bold">{finalScore} {t.points}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas do desempenho */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            
            {/* Respostas corretas */}
            <div className="bg-gray-800/50 rounded-lg p-2.5 sm:p-3 text-center border border-gray-600">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mx-auto mb-1.5" />
              <div className="text-base sm:text-lg font-bold text-white">{correctAnswers}/{totalQuestions}</div>
              <div className="text-xs text-gray-400">{t.correctAnswers}</div>
            </div>
            
            {/* Precisão percentual */}
            <div className="bg-gray-800/50 rounded-lg p-2.5 sm:p-3 text-center border border-gray-600">
              <div className="text-base sm:text-lg font-bold text-cyan-400">{accuracy}%</div>
              <div className="text-xs text-gray-400">
                {language === 'pt' ? 'Precisão' : 'Accuracy'}
              </div>
            </div>
            
            {/* Categoria de desempenho */}
            <div className="bg-gray-800/50 rounded-lg p-2.5 sm:p-3 text-center border border-gray-600">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mx-auto mb-1.5" />
              <div className="text-xs text-yellow-400 font-medium">
                {accuracy >= 90 ? (language === 'pt' ? 'Expert' : 'Expert') : 
                 accuracy >= 70 ? (language === 'pt' ? 'Avançado' : 'Advanced') :
                 accuracy >= 50 ? (language === 'pt' ? 'Intermediário' : 'Intermediate') :
                 (language === 'pt' ? 'Iniciante' : 'Beginner')}
              </div>
            </div>
          </div>

          {/* Mensagem de feedback com base no desempenho */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-2.5 sm:p-3 border border-gray-600">
              <p className="text-xs sm:text-sm text-white font-medium">
                {getPerformanceMessage()}
              </p>
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          
          {/* Botão para jogar novamente */}
          <button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 active:from-cyan-600 active:to-purple-600 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 cyber-button neon-glow flex items-center justify-center gap-1.5 sm:gap-2 touch-friendly"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" /> {/* Ícone de recarregar */}
            <span className="text-xs sm:text-sm">{t.playAgain}</span> {/* Texto do botão */}
          </button>

          {/* Botão para ver o ranking */}
          <button
            onClick={onViewLeaderboard}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 active:from-purple-600 active:to-pink-600 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 cyber-button flex items-center justify-center gap-1.5 sm:gap-2 touch-friendly"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" /> {/* Ícone de visualizar */}
            <span className="text-xs sm:text-sm">{t.viewRanking}</span> {/* Texto do botão */}
          </button>
        </div>
      </div>
    </div>
  );
}