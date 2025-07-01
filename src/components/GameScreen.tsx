import React, { useState, useEffect } from 'react';
import { Clock, Star, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { Question } from '../types';
import { translations } from '../data/translations';


// Definição das props que o componente GameScreen recebe
interface GameScreenProps {
  language: 'pt' | 'en'; 
  questions: Question[]; 
  currentQuestionIndex: number; // Índice da pergunta atual
  score: number; 
  onAnswerSelected: (answerIndex: number) => void; // Função chamada ao selecionar uma resposta
  onNextQuestion: () => void; // Função chamada ao passar para a próxima pergunta
  onFinishQuiz: () => void; // Função chamada ao finalizar o quiz
  showResult: boolean; // Indica se deve mostrar o resultado da resposta
  isCorrect: boolean | null; // Indica se a resposta foi correta
  selectedAnswer: number | null; // Resposta selecionada pelo usuário
}

export default function GameScreen({
  language,
  questions,
  currentQuestionIndex,
  score,
  onAnswerSelected,
  onNextQuestion,
  onFinishQuiz,
  showResult,
  isCorrect,
  selectedAnswer
}: GameScreenProps) {
  
  const t = translations[language];

  // Pergunta atual sendo exibida
  const currentQuestion = questions[currentQuestionIndex];

  // Tempo restante para responder à pergunta (30 segundos por padrão)
  const [timeLeft, setTimeLeft] = useState(30);

  // Indica se o usuário já respondeu à pergunta
  const [isAnswered, setIsAnswered] = useState(false);

  // Reinicia o temporizador sempre que mudar de pergunta
  useEffect(() => {
    setTimeLeft(30);
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  // Lida com o temporizador e resposta automática caso o tempo acabe
  useEffect(() => {
    if (showResult) {
      setIsAnswered(true); // Se estiver mostrando resultado, bloqueia mais interações
      return;
    }

    if (timeLeft > 0 && !isAnswered) {
      // Reduz o tempo a cada segundo
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer); // Limpa o timer ao desmontar ou mudar estado
    } else if (timeLeft === 0 && !isAnswered) {
      // Se o tempo acabou e não respondeu, considera como resposta errada (-1)
      onAnswerSelected(-1);
    }
  }, [timeLeft, isAnswered, showResult, onAnswerSelected]);

  // Função chamada quando o usuário clica em uma opção de resposta
  const handleAnswerClick = (answerIndex: number) => {
    if (!isAnswered) {
      setIsAnswered(true); // Marca como respondida
      onAnswerSelected(answerIndex); // Dispara a função de seleção
    }
  };

  // Define as classes CSS para estilização das opções de resposta
  const getOptionClass = (optionIndex: number) => {
    let baseClass = "w-full p-2.5 sm:p-3 text-left border-2 rounded-lg transition-all duration-300 cyber-button touch-friendly ";
    
    if (!showResult) {
      if (selectedAnswer === optionIndex) {
        baseClass += "border-cyan-500 bg-cyan-500/20 neon-glow "; // Resposta selecionada
      } else {
        baseClass += "border-gray-600 hover:border-cyan-400 active:border-cyan-400 hover:bg-cyan-400/10 active:bg-cyan-400/10 "; // Opção não selecionada
      }
    } else {
      if (optionIndex === currentQuestion.correct) {
        baseClass += "border-green-500 bg-green-500/20 neon-glow "; // Resposta correta
      } else if (selectedAnswer === optionIndex && optionIndex !== currentQuestion.correct) {
        baseClass += "border-red-500 bg-red-500/20 "; // Resposta errada do usuário
      } else {
        baseClass += "border-gray-600 bg-gray-800/50 "; // Outras respostas incorretas
      }
    }
    return baseClass;
  };

  // Retorna a classe de cor com base na categoria da pergunta
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'culture': return 'text-purple-400';
      case 'language': return 'text-cyan-400';
      case 'education': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  // Retorna a classe de cor com base na dificuldade da pergunta
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-3 lg:p-4">
      <div className="w-full max-w-lg lg:max-w-2xl space-y-3 sm:space-y-4 fade-in">
        
        {/* Cabeçalho com informações gerais */}
        <div className="flex flex-col sm:flex-row items-center justify-between glassmorphism rounded-lg p-2.5 sm:p-3 gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-white text-center sm:text-left">
              <span className="text-cyan-400 font-semibold text-sm sm:text-base">{t.question} {currentQuestionIndex + 1}</span>
              <span className="text-gray-300 text-sm sm:text-base"> {t.of} {questions.length}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              <span className="text-white font-bold text-sm sm:text-base">{score}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`flex items-center gap-1.5 ${timeLeft <= 10 ? 'text-red-400 pulse-animation' : 'text-cyan-400'}`}>
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-bold text-sm sm:text-base">{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Cartão com a pergunta e alternativas */}
        <div className="glassmorphism rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4">
          
          {/* Informações da pergunta (categoria, dificuldade e pontos) */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3">
            <span className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium ${getCategoryColor(currentQuestion.category)} bg-gray-800 border border-current`}>
              {t[currentQuestion.category as keyof typeof t]}
            </span>
            <span className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium ${getDifficultyColor(currentQuestion.difficulty)} bg-gray-800 border border-current`}>
              {currentQuestion.difficulty}
            </span>
            <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium text-yellow-400 bg-gray-800 border border-yellow-400">
              {currentQuestion.points} pts
            </span>
          </div>

          {/* Texto da pergunta */}
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-white leading-relaxed mb-3 sm:mb-4">
            {currentQuestion.question[language]}
          </h2>

          {/* Alternativas de resposta */}
          <div className="grid gap-2.5 sm:gap-3">
            {currentQuestion.options[language].map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={isAnswered}
                className={getOptionClass(index)}
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                    {String.fromCharCode(65 + index)} {/* A, B, C, D... */}
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base text-left flex-1 leading-relaxed">{option}</span>
                  {showResult && index === currentQuestion.correct && (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                  )}
                  {showResult && selectedAnswer === index && index !== currentQuestion.correct && (
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Feedback após responder */}
          {showResult && (
            <div className="border-t border-gray-600 pt-3 sm:pt-4 space-y-3 sm:space-y-4 slide-up">
              <div className={`flex items-center gap-2.5 sm:gap-3 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /> : <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
                <span className="text-lg sm:text-xl font-bold">
                  {isCorrect ? t.correct : t.incorrect}
                </span>
                {isCorrect && (
                  <span className="text-yellow-400 font-bold text-base sm:text-lg">+{currentQuestion.points} pts</span>
                )}
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
                <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                  {currentQuestion.explanation[language]}
                </p>
              </div>
              <div className="flex justify-center">
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    onClick={onNextQuestion}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 active:from-cyan-600 active:to-purple-600 text-white font-bold py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-all duration-300 cyber-button neon-glow touch-friendly text-sm sm:text-base"
                  >
                    {t.nextQuestion}
                  </button>
                ) : (
                  <button
                    onClick={onFinishQuiz}
                    className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 active:from-green-600 active:to-cyan-600 text-white font-bold py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-all duration-300 cyber-button neon-glow flex items-center gap-2 touch-friendly text-sm sm:text-base"
                  >
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t.finishQuiz}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Barra de progresso do quiz */}
        <div className="glassmorphism rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="text-cyan-400 font-medium text-xs sm:text-sm">Progresso:</span>
            <div className="flex-1 bg-gray-700 rounded-full h-2.5 sm:h-3">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2.5 sm:h-3 rounded-full transition-all duration-500 neon-glow"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-white font-medium text-xs sm:text-sm">
              {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}