import { Question, BonusQuestion, Player } from '../types';
import { questions, bonusQuestions } from '../data/questions';

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getRandomQuestions = (count: number = 6): Question[] => {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const getRandomBonusQuestion = (): BonusQuestion => {
  const randomIndex = Math.floor(Math.random() * bonusQuestions.length);
  return bonusQuestions[randomIndex];
};

export const shouldShowBonus = (questionIndex: number): boolean => {
  // Show bonus every 2-3 questions
  return questionIndex > 0 && questionIndex % 2 === 0 && Math.random() > 0.5;
};

export const checkBonusAnswer = (userAnswer: string, correctAnswer: string): boolean => {
  const normalize = (text: string) => text.toLowerCase().trim().replace(/[^\w\s]/g, '');
  const normalizedUser = normalize(userAnswer);
  const normalizedCorrect = normalize(correctAnswer);
  
  // Check for exact match or partial match (at least 70% similarity)
  if (normalizedUser === normalizedCorrect) return true;
  
  // Check if the answer contains the correct answer or vice versa
  return normalizedUser.includes(normalizedCorrect) || normalizedCorrect.includes(normalizedUser);
};

export const saveScore = (players: Player[], newPlayer: Player): Player[] => {
  const updatedPlayers = [...players, newPlayer];
  return updatedPlayers
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, 50); // Keep only top 50 scores
};

export const getPlayerRank = (players: Player[], playerName: string, score: number): number => {
  const sorted = players.sort((a, b) => b.score - a.score);
  return sorted.findIndex(p => p.name === playerName && p.score === score) + 1;
};