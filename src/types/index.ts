
// Interface que representa a pergunta do quiz
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


// Interface que representa uma pergunta bônus
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

// Interface que representa um jogador no ranking
export interface Player {
  name: string;
  score: number;
  timestamp: number;
}


// Estado global do jogo durante uma sessão ativa
export interface GameState {
  currentQuestion: number;
  score: number;
  answers: number[];
  startTime: number;
  playerName: string;
  language: 'pt' | 'en';
}

export type Screen = 'start' | 'instructions' | 'game' | 'leaderboard' | 'bonus' | 'result';