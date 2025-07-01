import React, { useState, useEffect } from 'react';
// Componentes principais do jogo
import VantaBackground from './components/VantaBackground';
import LanguageSwitcher from './components/LanguageSwitcher';
import StartScreen from './components/StartScreen';
import InstructionsScreen from './components/InstructionsScreen';
import GameScreen from './components/GameScreen';
import BonusScreen from './components/BonusScreen';
import ResultScreen from './components/ResultScreen';
import LeaderboardScreen from './components/LeaderboardScreen';

// Hooks personalizados
import { useLocalStorage } from './hooks/useLocalStorage';

// Utilitários de jogo
import { 
  getRandomQuestions, 
  getRandomBonusQuestion, 
  shouldShowBonus, 
  checkBonusAnswer, 
  saveScore 
} from './utils/gameUtils';

// Tipos utilizados no jogo
import { Question, BonusQuestion, Player, GameState, Screen } from './types';

function App() {
  // Estado para armazenar o idioma selecionado (persistido no localStorage)
  const [language, setLanguage] = useLocalStorage<'pt' | 'en'>('quiz-language', 'pt');

  // Estado para armazenar o ranking global (persistido no localStorage)
  const [players, setPlayers] = useLocalStorage<Player[]>('quiz-leaderboard', []);

  // Estado que controla qual tela está sendo exibida atualmente
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');

  // Nome do jogador atual
  const [playerName, setPlayerName] = useState('');

  // Estados relacionados ao jogo
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]); // Perguntas do quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Índice da pergunta atual
  const [score, setScore] = useState(0); // Pontuação atual do jogador
  const [answers, setAnswers] = useState<number[]>([]); // Respostas dadas pelo jogador
  const [showResult, setShowResult] = useState(false); // Indica se deve mostrar o resultado da resposta
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // Resposta selecionada
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // Indica se a resposta foi correta

  // Estados relacionados à pergunta bônus
  const [currentBonusQuestion, setCurrentBonusQuestion] = useState<BonusQuestion | null>(null);
  const [showBonusResult, setShowBonusResult] = useState(false); // Se deve mostrar o resultado do bônus
  const [bonusIsCorrect, setBonusIsCorrect] = useState<boolean | null>(null); // Se a resposta bônus foi correta

  /**
   * Função chamada ao iniciar o jogo
   * Seleciona perguntas aleatórias e reseta os estados relevantes
   */
  const startGame = () => {
    const questions = getRandomQuestions(6); // Gera 6 perguntas aleatórias
    setGameQuestions(questions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentBonusQuestion(null);
    setCurrentScreen('game'); // Muda para a tela de jogo
  };

  /**
   * Função chamada quando o usuário seleciona uma resposta
   * Verifica se é correta e atualiza o estado
   */
  const handleAnswerSelected = (answerIndex: number) => {
    const currentQuestion = gameQuestions[currentQuestionIndex];
    const correct = answerIndex === currentQuestion.correct;
    
    setSelectedAnswer(answerIndex);
    setIsCorrect(correct);
    setShowResult(true); // Mostra o feedback
    
    if (correct) {
      setScore(prev => prev + currentQuestion.points); // Adiciona pontos se correto
    }
    
    setAnswers(prev => [...prev, answerIndex]); // Registra a resposta
  };

  /**
   * Avança para a próxima pergunta
   * Também verifica se deve mostrar uma pergunta bônus
   */
  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    
    // Verifica se deve mostrar uma pergunta bônus
    if (shouldShowBonus(currentQuestionIndex)) {
      const bonusQuestion = getRandomBonusQuestion();
      setCurrentBonusQuestion(bonusQuestion);
      setCurrentScreen('bonus');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  /**
   * Trata a resposta do usuário na pergunta bônus
   * @param answer - Resposta digitada pelo usuário
   */
  const handleBonusAnswer = (answer: string) => {
    if (!currentBonusQuestion) return;
    
    const correct = checkBonusAnswer(answer, currentBonusQuestion.answer[language]);
    setBonusIsCorrect(correct);
    setShowBonusResult(true); // Mostra o resultado do bônus
    
    if (correct && currentBonusQuestion) {
      setScore(prev => prev + currentBonusQuestion.points); // Adiciona pontos se correto
    }
  };

  /**
   * Continua o jogo após a pergunta bônus
   */
  const handleBonusContinue = () => {
    setCurrentBonusQuestion(null);
    setShowBonusResult(false);
    setBonusIsCorrect(null);
    setCurrentQuestionIndex(prev => prev + 1); // Avança para a próxima pergunta
    setCurrentScreen('game');
  };

  /**
   * Finaliza o quiz e salva a pontuação no ranking
   */
  const finishQuiz = () => {
    const correctAnswers = answers.filter((answer, index) => answer === gameQuestions[index]?.correct).length;
    
    // Cria o novo registro do jogador
    const newPlayer: Player = {
      name: playerName,
      score: score,
      timestamp: Date.now()
    };
    
    const updatedPlayers = saveScore(players, newPlayer);
    setPlayers(updatedPlayers); // Atualiza o ranking
    
    setCurrentScreen('result'); // Vai para a tela final
  };

  /**
   * Reinicia o jogo e volta para a tela inicial
   */
  const resetGame = () => {
    setCurrentScreen('start');
    setPlayerName('');
  };

  /**
   * Define qual efeito do Vanta será usado com base na tela atual
   */
  const getVantaEffect = () => {
    switch (currentScreen) {
      case 'leaderboard':
        return 'globe'; // Efeito de globo na tela de ranking
      default:
        return 'net'; // Efeito padrão nas outras telas
    }
  };

  // Calcula o número total de respostas corretas
  const correctAnswers = answers.filter((answer, index) => answer === gameQuestions[index]?.correct).length;

  return (
    <VantaBackground effect={getVantaEffect()}>
      {/* Botão de troca de idioma */}
      <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
      
      {/* Tela Inicial */}
      {currentScreen === 'start' && (
        <StartScreen
          language={language}
          playerName={playerName}
          onPlayerNameChange={setPlayerName}
          onStartGame={startGame}
          onShowInstructions={() => setCurrentScreen('instructions')}
          onShowLeaderboard={() => setCurrentScreen('leaderboard')}
        />
      )}

      {/* Tela de Instruções */}
      {currentScreen === 'instructions' && (
        <InstructionsScreen
          language={language}
          onBack={() => setCurrentScreen('start')}
        />
      )}

      {/* Tela Principal do Jogo */}
      {currentScreen === 'game' && (
        <GameScreen
          language={language}
          questions={gameQuestions}
          currentQuestionIndex={currentQuestionIndex}
          score={score}
          onAnswerSelected={handleAnswerSelected}
          onNextQuestion={handleNextQuestion}
          onFinishQuiz={finishQuiz}
          showResult={showResult}
          isCorrect={isCorrect}
          selectedAnswer={selectedAnswer}
        />
      )}

      {/* Tela do Desafio Bônus */}
      {currentScreen === 'bonus' && currentBonusQuestion && (
        <BonusScreen
          language={language}
          bonusQuestion={currentBonusQuestion}
          onAnswerSubmitted={handleBonusAnswer}
          onContinue={handleBonusContinue}
          showResult={showBonusResult}
          isCorrect={bonusIsCorrect}
        />
      )}

      {/* Tela Final com Resultado */}
      {currentScreen === 'result' && (
        <ResultScreen
          language={language}
          playerName={playerName}
          finalScore={score}
          correctAnswers={correctAnswers}
          totalQuestions={gameQuestions.length}
          onPlayAgain={resetGame}
          onViewLeaderboard={() => setCurrentScreen('leaderboard')}
        />
      )}

      {/* Tela de Ranking Global */}
      {currentScreen === 'leaderboard' && (
        <LeaderboardScreen
          language={language}
          players={players}
          currentPlayer={playerName}
          onBack={() => setCurrentScreen('start')}
        />
      )}
    </VantaBackground>
  );
}

export default App;