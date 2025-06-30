export interface Question {
  id: number;
  category: 'culture' | 'language' | 'education';
  difficulty: 'easy' | 'medium' | 'hard';
  question: {
    pt: string;
    en: string;
  };
  options: {
    pt: string[];
    en: string[];
  };
  correct: number;
  explanation: {
    pt: string;
    en: string;
  };
  points: number;
}

export interface BonusQuestion {
  id: number;
  question: {
    pt: string;
    en: string;
  };
  answer: {
    pt: string;
    en: string;
  };
  points: number;
}

export interface Player {
  name: string;
  score: number;
  timestamp: number;
}

export interface GameState {
  currentQuestion: number;
  score: number;
  answers: number[];
  startTime: number;
  playerName: string;
  language: 'pt' | 'en';
}

export type Screen = 'start' | 'instructions' | 'game' | 'leaderboard' | 'bonus' | 'result';