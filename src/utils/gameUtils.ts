// Utilitários para gerenciamento de jogo, perguntas e pontuações

import { Question, BonusQuestion, Player } from '../types';
import { questions, bonusQuestions } from '../data/questions';

/**
 * Embaralha um array utilizando o algoritmo Fisher-Yates (Knuth Shuffle)
 * @param array - O array que será embaralhado
 * @returns Um novo array com os elementos embaralhados
 */


export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Retorna uma quantidade específica de perguntas aleatórias do conjunto geral
 * @param count - Número de perguntas desejadas (padrão: 6)
 * @returns Array com perguntas aleatórias e únicas
 */
export const getRandomQuestions = (count: number = 6): Question[] => {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * Retorna uma pergunta bônus aleatória do conjunto disponível
 * @returns Uma única pergunta bônus aleatória
 */
export const getRandomBonusQuestion = (): BonusQuestion => {
  const randomIndex = Math.floor(Math.random() * bonusQuestions.length);
  return bonusQuestions[randomIndex];
};

/**
 * Determina se deve mostrar uma pergunta bônus com base no índice da pergunta atual
 * @param questionIndex - Índice da pergunta atual no quiz
 * @returns true se deve mostrar a pergunta bônus, false caso contrário
 */
export const shouldShowBonus = (questionIndex: number): boolean => {
  // Mostra o bônus a cada 2-3 perguntas, com chance aleatória
  return questionIndex > 0 && questionIndex % 2 === 0 && Math.random() > 0.5;
};

/**
 * Verifica se a resposta do usuário está correta para a pergunta bônus
 * @param userAnswer - Resposta digitada pelo usuário
 * @param correctAnswer - Resposta correta esperada
 * @returns true se a resposta estiver correta, false caso contrário
 */
export const checkBonusAnswer = (userAnswer: string, correctAnswer: string): boolean => {
  // Função auxiliar para normalizar texto (minúsculas, sem espaços extras ou pontuação)
  const normalize = (text: string) => text.toLowerCase().trim().replace(/[^\w\s]/g, '');

  const normalizedUser = normalize(userAnswer);
  const normalizedCorrect = normalize(correctAnswer);

  // Verifica por correspondência exata
  if (normalizedUser === normalizedCorrect) return true;

  // Verifica se a resposta contém a palavra correta ou vice-versa
  return normalizedUser.includes(normalizedCorrect) || normalizedCorrect.includes(normalizedUser);
};

/**
 * Salva uma nova pontuação no ranking global
 * @param players - Lista atual de jogadores
 * @param newPlayer - Novo jogador/pontuação a ser adicionado
 * @returns Nova lista ordenada com as melhores pontuações (máximo 50)
 */
export const saveScore = (players: Player[], newPlayer: Player): Player[] => {
  const updatedPlayers = [...players, newPlayer];
  return updatedPlayers
    .sort((a, b) => b.score - a.score) // Ordena por pontuação decrescente
    .slice(0, 50); // Mantém apenas as 50 melhores pontuações
};

/**
 * Retorna a posição de um jogador no ranking
 * @param players - Lista completa de jogadores
 * @param playerName - Nome do jogador a procurar
 * @param score - Pontuação do jogador
 * @returns A posição no ranking (começando em 1), ou -1 se não encontrado
 */
export const getPlayerRank = (players: Player[], playerName: string, score: number): number => {
  const sorted = players.sort((a, b) => b.score - a.score);
  return sorted.findIndex(p => p.name === playerName && p.score === score) + 1;
};