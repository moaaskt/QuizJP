import React, { useState, useEffect } from 'react';
import VantaBackground from './components/VantaBackground';
import LanguageSwitcher from './components/LanguageSwitcher';
import StartScreen from './components/StartScreen';
import InstructionsScreen from './components/InstructionsScreen';
import GameScreen from './components/GameScreen';
import BonusScreen from './components/BonusScreen';
import ResultScreen from './components/ResultScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getRandomQuestions, getRandomBonusQuestion, shouldShowBonus, checkBonusAnswer, saveScore } from './utils/gameUtils';
import { Question, BonusQuestion, Player, GameState, Screen } from './types';

function App() {
  const [language, setLanguage] = useLocalStorage<'pt' | 'en'>('quiz-language', 'pt');
  const [players, setPlayers] = useLocalStorage<Player[]>('quiz-leaderboard', []);
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [playerName, setPlayerName] = useState('');
  
  // Game state
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  // Bonus state
  const [currentBonusQuestion, setCurrentBonusQuestion] = useState<BonusQuestion | null>(null);
  const [showBonusResult, setShowBonusResult] = useState(false);
  const [bonusIsCorrect, setBonusIsCorrect] = useState<boolean | null>(null);

  const startGame = () => {
    const questions = getRandomQuestions(6);
    setGameQuestions(questions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentBonusQuestion(null);
    setCurrentScreen('game');
  };

  const handleAnswerSelected = (answerIndex: number) => {
    const currentQuestion = gameQuestions[currentQuestionIndex];
    const correct = answerIndex === currentQuestion.correct;
    
    setSelectedAnswer(answerIndex);
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(prev => prev + currentQuestion.points);
    }
    
    setAnswers(prev => [...prev, answerIndex]);
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    
    // Check if we should show a bonus question
    if (shouldShowBonus(currentQuestionIndex)) {
      const bonusQuestion = getRandomBonusQuestion();
      setCurrentBonusQuestion(bonusQuestion);
      setCurrentScreen('bonus');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleBonusAnswer = (answer: string) => {
    if (!currentBonusQuestion) return;
    
    const correct = checkBonusAnswer(answer, currentBonusQuestion.answer[language]);
    setBonusIsCorrect(correct);
    setShowBonusResult(true);
    
    if (correct) {
      setScore(prev => prev + currentBonusQuestion.points);
    }
  };

  const handleBonusContinue = () => {
    setCurrentBonusQuestion(null);
    setShowBonusResult(false);
    setBonusIsCorrect(null);
    setCurrentQuestionIndex(prev => prev + 1);
    setCurrentScreen('game');
  };

  const finishQuiz = () => {
    const correctAnswers = answers.filter((answer, index) => answer === gameQuestions[index]?.correct).length;
    
    // Save score to leaderboard
    const newPlayer: Player = {
      name: playerName,
      score: score,
      timestamp: Date.now()
    };
    
    const updatedPlayers = saveScore(players, newPlayer);
    setPlayers(updatedPlayers);
    
    setCurrentScreen('result');
  };

  const resetGame = () => {
    setCurrentScreen('start');
    setPlayerName('');
  };

  const getVantaEffect = () => {
    switch (currentScreen) {
      case 'leaderboard':
        return 'globe';
      default:
        return 'net';
    }
  };

  const correctAnswers = answers.filter((answer, index) => answer === gameQuestions[index]?.correct).length;

  return (
    <VantaBackground effect={getVantaEffect()}>
      <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
      
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

      {currentScreen === 'instructions' && (
        <InstructionsScreen
          language={language}
          onBack={() => setCurrentScreen('start')}
        />
      )}

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