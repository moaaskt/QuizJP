import { Question, BonusQuestion } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    category: 'culture',
    difficulty: 'easy',
    question: {
      pt: 'Qual é o festival mais famoso do Brasil?',
      en: 'What is the most famous festival in Brazil?'
    },
    options: {
      pt: ['Carnaval', 'Festa Junina', 'Oktoberfest', 'Festival de Parintins'],
      en: ['Carnival', 'June Festival', 'Oktoberfest', 'Parintins Festival']
    },
    correct: 0,
    explanation: {
      pt: 'O Carnaval é a festa mais conhecida do Brasil mundialmente, especialmente o do Rio de Janeiro.',
      en: 'Carnival is Brazil\'s most internationally known festival, especially Rio de Janeiro\'s.'
    },
    points: 10
  },
  {
    id: 2,
    category: 'language',
    difficulty: 'medium',
    question: {
      pt: 'Quantas línguas são oficialmente reconhecidas na África do Sul?',
      en: 'How many languages are officially recognized in South Africa?'
    },
    options: {
      pt: ['5', '7', '11', '15'],
      en: ['5', '7', '11', '15']
    },
    correct: 2,
    explanation: {
      pt: 'A África do Sul tem 11 línguas oficiais, incluindo inglês, africâner e várias línguas bantus.',
      en: 'South Africa has 11 official languages, including English, Afrikaans, and several Bantu languages.'
    },
    points: 15
  },
  {
    id: 3,
    category: 'education',
    difficulty: 'hard',
    question: {
      pt: 'Qual país tem o sistema educacional onde estudantes usam uniformes até a universidade?',
      en: 'Which country has an educational system where students wear uniforms even to university?'
    },
    options: {
      pt: ['Japão', 'Coreia do Sul', 'Singapura', 'Reino Unido'],
      en: ['Japan', 'South Korea', 'Singapore', 'United Kingdom']
    },
    correct: 0,
    explanation: {
      pt: 'No Japão, muitas universidades mantêm a tradição do uniforme, especialmente para cerimônias.',
      en: 'In Japan, many universities maintain the uniform tradition, especially for ceremonies.'
    },
    points: 20
  },
  {
    id: 4,
    category: 'culture',
    difficulty: 'medium',
    question: {
      pt: 'Em qual país é tradicional tirar os sapatos antes de entrar em casa?',
      en: 'In which country is it traditional to remove shoes before entering a house?'
    },
    options: {
      pt: ['França', 'Japão', 'Brasil', 'Estados Unidos'],
      en: ['France', 'Japan', 'Brazil', 'United States']
    },
    correct: 1,
    explanation: {
      pt: 'No Japão, tirar os sapatos (genkan) é uma tradição milenar para manter a casa limpa.',
      en: 'In Japan, removing shoes (genkan) is an ancient tradition to keep the house clean.'
    },
    points: 15
  },
  {
    id: 5,
    category: 'language',
    difficulty: 'easy',
    question: {
      pt: 'Qual é a língua mais falada no mundo?',
      en: 'What is the most spoken language in the world?'
    },
    options: {
      pt: ['Inglês', 'Mandarim', 'Espanhol', 'Hindi'],
      en: ['English', 'Mandarin', 'Spanish', 'Hindi']
    },
    correct: 1,
    explanation: {
      pt: 'O Mandarim é falado por mais de 1 bilhão de pessoas, principalmente na China.',
      en: 'Mandarin is spoken by over 1 billion people, mainly in China.'
    },
    points: 10
  },
  {
    id: 6,
    category: 'education',
    difficulty: 'medium',
    question: {
      pt: 'Qual país oferece educação universitária gratuita para estudantes internacionais?',
      en: 'Which country offers free university education for international students?'
    },
    options: {
      pt: ['Alemanha', 'Estados Unidos', 'Reino Unido', 'Austrália'],
      en: ['Germany', 'United States', 'United Kingdom', 'Australia']
    },
    correct: 0,
    explanation: {
      pt: 'A Alemanha oferece educação superior gratuita em universidades públicas para todos os estudantes.',
      en: 'Germany offers free higher education at public universities for all students.'
    },
    points: 15
  }
];

export const bonusQuestions: BonusQuestion[] = [
  {
    id: 1,
    question: {
      pt: 'Em qual país as pessoas fazem fila de forma tão organizada que é considerado arte?',
      en: 'In which country do people queue so organized it\'s considered an art?'
    },
    answer: {
      pt: 'Reino Unido (Inglaterra)',
      en: 'United Kingdom (England)'
    },
    points: 25
  },
  {
    id: 2,
    question: {
      pt: 'Qual país tem a tradição de comer 12 uvas à meia-noite do Ano Novo?',
      en: 'Which country has the tradition of eating 12 grapes at midnight on New Year?'
    },
    answer: {
      pt: 'Espanha',
      en: 'Spain'
    },
    points: 25
  },
  {
    id: 3,
    question: {
      pt: 'Em qual país é comum dar presentes com as duas mãos como sinal de respeito?',
      en: 'In which country is it common to give gifts with both hands as a sign of respect?'
    },
    answer: {
      pt: 'Coreia do Sul',
      en: 'South Korea'
    },
    points: 25
  }
];