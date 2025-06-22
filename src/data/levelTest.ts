export interface LevelTestQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  explanation?: string
}

export interface LevelTestResult {
  level: 'beginner' | 'intermediate' | 'advanced'
  score: number
  correctAnswers: number
  totalQuestions: number
  completedAt: string
}

export const LEVEL_TEST_QUESTIONS: LevelTestQuestion[] = [
  // Beginner Questions (1-5)
  {
    id: 'q1',
    question: 'How do you greet someone in the morning?',
    options: ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
    correctAnswer: 1,
    difficulty: 'beginner'
  },
  {
    id: 'q2', 
    question: 'What is the correct form? "I _____ English every day."',
    options: ['study', 'studies', 'studied', 'studying'],
    correctAnswer: 0,
    difficulty: 'beginner'
  },
  {
    id: 'q3',
    question: 'Choose the correct sentence:',
    options: [
      'She have a car',
      'She has a car', 
      'She having a car',
      'She had have a car'
    ],
    correctAnswer: 1,
    difficulty: 'beginner'
  },
  {
    id: 'q4',
    question: 'What time is it? It\'s _____ o\'clock.',
    options: ['five', 'fives', 'fifth', 'fifteen'],
    correctAnswer: 0,
    difficulty: 'beginner'
  },
  {
    id: 'q5',
    question: 'Where _____ you from?',
    options: ['is', 'am', 'are', 'be'],
    correctAnswer: 2,
    difficulty: 'beginner'
  },

  // Intermediate Questions (6-10)
  {
    id: 'q6',
    question: 'I _____ to the gym yesterday.',
    options: ['go', 'went', 'going', 'have gone'],
    correctAnswer: 1,
    difficulty: 'intermediate'
  },
  {
    id: 'q7',
    question: 'If I _____ more money, I would travel around the world.',
    options: ['have', 'had', 'will have', 'would have'],
    correctAnswer: 1,
    difficulty: 'intermediate'
  },
  {
    id: 'q8',
    question: 'The book _____ by millions of people.',
    options: ['was read', 'read', 'is reading', 'has read'],
    correctAnswer: 0,
    difficulty: 'intermediate'
  },
  {
    id: 'q9',
    question: 'I _____ English for five years.',
    options: ['study', 'studied', 'have been studying', 'was studying'],
    correctAnswer: 2,
    difficulty: 'intermediate'
  },
  {
    id: 'q10',
    question: 'She asked me _____ I could help her.',
    options: ['that', 'if', 'what', 'how'],
    correctAnswer: 1,
    difficulty: 'intermediate'
  },

  // Advanced Questions (11-15)
  {
    id: 'q11',
    question: 'Had I known about the meeting, I _____ attended.',
    options: ['would have', 'will have', 'would', 'had'],
    correctAnswer: 0,
    difficulty: 'advanced'
  },
  {
    id: 'q12',
    question: 'The project _____ completed by the time you arrive.',
    options: ['will be', 'will have been', 'would be', 'has been'],
    correctAnswer: 1,
    difficulty: 'advanced'
  },
  {
    id: 'q13',
    question: 'Choose the sentence with the correct meaning:',
    options: [
      'I wish I was taller',
      'I wish I were taller',
      'I wish I am taller', 
      'I wish I will be taller'
    ],
    correctAnswer: 1,
    difficulty: 'advanced'
  },
  {
    id: 'q14',
    question: 'Not only _____ late, but he also forgot his presentation.',
    options: ['he was', 'was he', 'he has been', 'has he been'],
    correctAnswer: 1,
    difficulty: 'advanced'
  },
  {
    id: 'q15',
    question: 'The proposal _____ by the committee before the deadline.',
    options: [
      'should have been reviewed',
      'should be reviewing',
      'should have reviewed',
      'should reviewed'
    ],
    correctAnswer: 0,
    difficulty: 'advanced'
  },

  // Additional Questions (16-20)
  {
    id: 'q16',
    question: 'Where _____ you from?',
    options: ['are', 'is', 'am', 'be'],
    correctAnswer: 0,
    difficulty: 'beginner'
  },
  {
    id: 'q17',
    question: 'If I had more time, I _____ travel around the world.',
    options: ['will', 'would', 'can', 'should'],
    correctAnswer: 1,
    difficulty: 'intermediate'
  },
  {
    id: 'q18',
    question: 'She _____ working here for five years.',
    options: ['has been', 'have been', 'is', 'was'],
    correctAnswer: 0,
    difficulty: 'intermediate'
  },
  {
    id: 'q19',
    question: 'Choose the correct sentence:',
    options: [
      "I don't have nothing to say",
      "I have nothing to say",
      "I don't have anything to say",
      "Both B and C are correct"
    ],
    correctAnswer: 3,
    difficulty: 'advanced'
  },
  {
    id: 'q20',
    question: 'Had I known about the meeting, I _____ attended.',
    options: [
      'would have',
      'will have',
      'would',
      'will'
    ],
    correctAnswer: 0,
    difficulty: 'advanced'
  }
]

export function calculateLevel(correctAnswers: number, totalQuestions: number): 'beginner' | 'intermediate' | 'advanced' {
  const percentage = (correctAnswers / totalQuestions) * 100
  
  if (percentage >= 80) {
    return 'advanced'
  } else if (percentage >= 60) {
    return 'intermediate'
  } else {
    return 'beginner'
  }
}

export function getLevelDescription(level: 'beginner' | 'intermediate' | 'advanced'): string {
  switch (level) {
    case 'beginner':
      return 'Você está começando sua jornada no inglês! Vamos focar no básico: vocabulário essencial, frases simples e estruturas fundamentais.'
    case 'intermediate':
      return 'Você já tem uma boa base! Vamos aprimorar sua fluência com estruturas mais complexas e vocabulário mais avançado.'
    case 'advanced':
      return 'Excelente nível! Vamos refinar suas habilidades com expressões idiomáticas, gramática avançada e comunicação sofisticada.'
  }
}

export function getLevelColor(level: 'beginner' | 'intermediate' | 'advanced'): string {
  switch (level) {
    case 'beginner':
      return 'from-green-500 to-emerald-500'
    case 'intermediate':
      return 'from-yellow-500 to-orange-500'
    case 'advanced':
      return 'from-red-500 to-pink-500'
  }
}

export function getLevelIcon(level: 'beginner' | 'intermediate' | 'advanced'): string {
  switch (level) {
    case 'beginner':
      return '🌱'
    case 'intermediate':
      return '🌿'
    case 'advanced':
      return '🌳'
  }
}