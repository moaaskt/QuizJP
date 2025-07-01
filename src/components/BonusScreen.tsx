import React, { useState, useEffect } from 'react';
import { Clock, Star, CheckCircle, XCircle, Gift } from 'lucide-react';
import { BonusQuestion } from '../types';
import { translations } from '../data/translations';

// Tipagem das propriedades do componente
interface BonusScreenProps {
  language: 'pt' | 'en'; // Idioma selecionado
  bonusQuestion: BonusQuestion; // Dados da pergunta bônus
  onAnswerSubmitted: (answer: string) => void; // Callback ao enviar resposta
  onContinue: () => void; // Callback para continuar o quiz
  showResult: boolean; // Flag para mostrar resultado
  isCorrect: boolean | null; // Se a resposta está correta
}

export default function BonusScreen({
  language,
  bonusQuestion,
  onAnswerSubmitted,
  onContinue,
  showResult,
  isCorrect
}: BonusScreenProps) {
  const t = translations[language]; // Textos traduzidos
  const [answer, setAnswer] = useState(''); // Resposta do usuário
  const [timeLeft, setTimeLeft] = useState(20); // Tempo restante
  const [isAnswered, setIsAnswered] = useState(false); // Se já respondeu

  // Reseta o estado quando muda a pergunta
  useEffect(() => {
    setTimeLeft(20);
    setIsAnswered(false);
    setAnswer('');
  }, [bonusQuestion]);

  // Contagem regressiva do tempo
  useEffect(() => {
    if (showResult) {
      setIsAnswered(true);
      return;
    }

    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleSubmit(); // Submete automaticamente ao acabar o tempo
    }
  }, [timeLeft, isAnswered, showResult]);

  // Envia a resposta
  const handleSubmit = () => {
    if (!isAnswered) {
      setIsAnswered(true);
      onAnswerSubmitted(answer.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-3 lg:p-4">
      <div className="max-w-md w-full space-y-3 sm:space-y-4 fade-in">
        {/* Cabeçalho com título e indicadores */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 pulse-animation" />
            <h1 className="font-futuristic text-lg sm:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              {t.bonusChallenge}
            </h1>
            <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 pulse-animation" />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 glassmorphism rounded-lg p-2 inline-flex">
            {/* Temporizador (fica vermelho nos últimos 5 segundos) */}
            <div className={`flex items-center gap-1.5 ${timeLeft <= 5 ? 'text-red-400 pulse-animation' : 'text-cyan-400'}`}>
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-bold text-xs sm:text-sm">{timeLeft}s</span>
            </div>
            {/* Pontos da questão */}
            <div className="flex items-center gap-1.5 text-purple-400">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-bold text-xs sm:text-sm">+{bonusQuestion.points} pts</span>
            </div>
          </div>
        </div>

        {/* Card da pergunta bônus */}
        <div className="glassmorphism rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4">
          {/* Texto da pergunta */}
          <div className="text-center">
            <h2 className="text-purple-400 mb-2 sm:mb-3 font-semibold text-sm sm:text-base">{t.bonusQuestion}</h2>
            <p className="text-sm sm:text-base lg:text-lg font-medium text-white leading-relaxed">
              {bonusQuestion.question[language]}
            </p>
          </div>

          {!showResult ? (
            /* Seção de resposta (antes do resultado) */
            <div className="space-y-2.5 sm:space-y-3">
              {/* Input de resposta */}
              <div>
                <label className="block text-cyan-400 font-medium mb-1.5 text-xs sm:text-sm">{t.yourAnswer}:</label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  disabled={isAnswered}
                  className="w-full px-3 py-2 sm:px-3 sm:py-2.5 bg-transparent border-2 border-purple-500 rounded-lg text-white placeholder-gray-400 font-medium transition-all duration-300 focus:outline-none focus:border-cyan-500 focus:neon-glow text-xs sm:text-sm"
                  placeholder="Digite sua resposta... / Type your answer..."
                  maxLength={50}
                />
              </div>

              {/* Botão de enviar */}
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  disabled={isAnswered || !answer.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 active:from-purple-600 active:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg transition-all duration-300 cyber-button neon-glow disabled:opacity-50 touch-friendly text-xs sm:text-sm"
                >
                  {t.submitAnswer}
                </button>
              </div>
            </div>
          ) : (
            /* Seção de resultado (após responder) */
            <div className="space-y-3 sm:space-y-4 slide-up">
              {/* Ícone e mensagem de acerto/erro */}
              <div className={`flex items-center justify-center gap-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /> : <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
                <span className="text-base sm:text-lg font-bold">
                  {isCorrect ? t.bonusCorrect : t.bonusIncorrect}
                </span>
              </div>

              {/* Mostra a resposta correta */}
              <div className="bg-gray-800/50 rounded-lg p-2.5 sm:p-3 text-center">
                <p className="text-cyan-400 font-medium mb-1.5 text-xs sm:text-sm">Resposta Correta / Correct Answer:</p>
                <p className="text-white text-sm sm:text-base font-semibold">
                  {bonusQuestion.answer[language]}
                </p>
              </div>

              {/* Mensagem de pontos extras (se acertou) */}
              {isCorrect && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold neon-glow">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">+{bonusQuestion.points} pontos extras!</span>
                  </div>
                </div>
              )}

              {/* Botão para continuar */}
              <div className="text-center">
                <button
                  onClick={onContinue}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 active:from-cyan-600 active:to-purple-600 text-white font-bold py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg transition-all duration-300 cyber-button neon-glow touch-friendly text-xs sm:text-sm"
                >
                  {t.continueQuiz}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}