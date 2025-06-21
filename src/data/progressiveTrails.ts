export interface ProgressivePhrase {
  id: string
  english: string
  portuguese: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  requiredLevel: 'beginner' | 'intermediate' | 'advanced'
  order: number
}

export interface ProgressiveExercise {
  id: string
  type: 'drag-drop' | 'complete-sentence' | 'translation' | 'multiple-choice'
  phrase: ProgressivePhrase
  data: any // Dados específicos do exercício
  requiredToProgress: boolean // Se é obrigatório para avançar
  order: number
}

export interface ProgressiveStep {
  id: string
  type: 'phrase' | 'exercise'
  phrase?: ProgressivePhrase
  exercise?: ProgressiveExercise
  isCompleted: boolean
  isUnlocked: boolean
  order: number
}

export interface ProgressiveTrail {
  id: string
  title: string
  icon: string
  description: string
  color: string
  steps: ProgressiveStep[]
  userProgress: UserTrailProgress
}

export interface UserTrailProgress {
  trailId: string
  currentStepIndex: number
  completedSteps: string[]
  totalSteps: number
  progressPercentage: number
  lastAccessedAt: string
  userLevel: 'beginner' | 'intermediate' | 'advanced'
}

// Exercícios específicos para cada tipo
export interface DragDropExerciseData {
  correctSentence: string
  words: string[]
  translation: string
}

export interface CompleteSentenceData {
  sentence: string // Com _____ para completar
  options: string[]
  correctAnswer: number
  translation: string
}

export interface TranslationExerciseData {
  portugueseText: string
  correctEnglish: string
  alternatives: string[] // Respostas aceitas
  hint?: string
}

export interface MultipleChoiceData {
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

// Dados das trilhas progressivas baseadas nas trilhas existentes
export const PROGRESSIVE_TRAILS_DATA = {
  trabalho: {
    id: 'trabalho',
    title: 'Inglês para Trabalho',
    icon: '💼',
    description: 'Domine o inglês corporativo com uma progressão estruturada',
    color: 'from-blue-500 to-cyan-500',
    phrases: [
      // Beginner Level
      {
        id: 'work_phrase_1',
        english: 'Good morning everyone',
        portuguese: 'Bom dia pessoal',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        order: 1
      },
      {
        id: 'work_phrase_2', 
        english: 'How are you today?',
        portuguese: 'Como você está hoje?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        order: 2
      },
      {
        id: 'work_phrase_3',
        english: 'I need help with this task',
        portuguese: 'Preciso de ajuda com esta tarefa',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        order: 3
      },
      
      // Intermediate Level
      {
        id: 'work_phrase_4',
        english: 'Could you schedule a meeting for tomorrow?',
        portuguese: 'Você poderia agendar uma reunião para amanhã?',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        order: 4
      },
      {
        id: 'work_phrase_5',
        english: 'I need to review the quarterly report',
        portuguese: 'Preciso revisar o relatório trimestral',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        order: 5
      },
      {
        id: 'work_phrase_6',
        english: 'The project deadline has been moved up',
        portuguese: 'O prazo do projeto foi antecipado',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        order: 6
      },
      
      // Advanced Level  
      {
        id: 'work_phrase_7',
        english: 'We need to streamline our operational processes',
        portuguese: 'Precisamos otimizar nossos processos operacionais',
        difficulty: 'advanced' as const,
        requiredLevel: 'advanced' as const,
        order: 7
      },
      {
        id: 'work_phrase_8',
        english: 'Let\'s leverage synergies across departments',
        portuguese: 'Vamos aproveitar as sinergias entre departamentos',
        difficulty: 'advanced' as const,
        requiredLevel: 'advanced' as const,
        order: 8
      }
    ],
    exercises: [
      // Exercício após frase 2 (beginner)
      {
        id: 'work_ex_1',
        type: 'drag-drop' as const,
        phraseId: 'work_phrase_2',
        data: {
          correctSentence: 'How are you today?',
          words: ['How', 'are', 'you', 'today?'],
          translation: 'Como você está hoje?'
        } as DragDropExerciseData,
        requiredToProgress: true,
        order: 2.5
      },
      
      // Exercício após frase 4 (intermediate)
      {
        id: 'work_ex_2', 
        type: 'complete-sentence' as const,
        phraseId: 'work_phrase_4',
        data: {
          sentence: 'Could you _____ a meeting for tomorrow?',
          options: ['schedule', 'make', 'create', 'plan'],
          correctAnswer: 0,
          translation: 'Você poderia agendar uma reunião para amanhã?'
        } as CompleteSentenceData,
        requiredToProgress: true,
        order: 4.5
      },
      
      // Exercício após frase 6 (intermediate-advanced)
      {
        id: 'work_ex_3',
        type: 'translation' as const,
        phraseId: 'work_phrase_6', 
        data: {
          portugueseText: 'O prazo do projeto foi antecipado',
          correctEnglish: 'The project deadline has been moved up',
          alternatives: ['The project deadline was moved up', 'The deadline of the project has been moved up'],
          hint: 'Use "moved up" para "antecipado"'
        } as TranslationExerciseData,
        requiredToProgress: true,
        order: 6.5
      }
    ]
  },
  
  viagens: {
    id: 'viagens',
    title: 'Inglês para Viagens',  
    icon: '✈️',
    description: 'Aprenda inglês para viajar com confiança',
    color: 'from-green-500 to-emerald-500',
    phrases: [
      // Beginner Level
      {
        id: 'travel_phrase_1',
        english: 'Where is the airport?',
        portuguese: 'Onde fica o aeroporto?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        order: 1
      },
      {
        id: 'travel_phrase_2',
        english: 'I have a reservation',
        portuguese: 'Eu tenho uma reserva',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        order: 2
      },
      {
        id: 'travel_phrase_3',
        english: 'How much does this cost?',
        portuguese: 'Quanto custa isso?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        order: 3
      },
      
      // Intermediate Level
      {
        id: 'travel_phrase_4',
        english: 'Could you recommend a good restaurant nearby?',
        portuguese: 'Você poderia recomendar um bom restaurante próximo?',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        order: 4
      },
      {
        id: 'travel_phrase_5',
        english: 'I\'d like to book a tour for tomorrow',
        portuguese: 'Gostaria de reservar um tour para amanhã',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        order: 5
      },
      
      // Advanced Level
      {
        id: 'travel_phrase_6',
        english: 'I need to reschedule my connecting flight',
        portuguese: 'Preciso reagendar meu voo de conexão',
        difficulty: 'advanced' as const,
        requiredLevel: 'advanced' as const,
        order: 6
      }
    ],
    exercises: [
      {
        id: 'travel_ex_1',
        type: 'multiple-choice' as const,
        phraseId: 'travel_phrase_1',
        data: {
          question: 'How do you ask for directions to the airport?',
          options: [
            'Where is the airport?',
            'What is the airport?', 
            'When is the airport?',
            'Who is the airport?'
          ],
          correctAnswer: 0,
          explanation: 'Use "Where is..." to ask for location'
        } as MultipleChoiceData,
        requiredToProgress: true,
        order: 1.5
      }
    ]
  }
}

// Helper functions
export function getUserLevel(userId: string): 'beginner' | 'intermediate' | 'advanced' {
  const savedLevel = localStorage.getItem(`user_level_${userId}`)
  return (savedLevel as any) || 'beginner'
}

export function getUserTrailProgress(userId: string, trailId: string): UserTrailProgress {
  const savedProgress = localStorage.getItem(`trail_progress_${userId}_${trailId}`)
  if (savedProgress) {
    return JSON.parse(savedProgress)
  }
  
  // Progresso inicial
  return {
    trailId,
    currentStepIndex: 0,
    completedSteps: [],
    totalSteps: 0,
    progressPercentage: 0,
    lastAccessedAt: new Date().toISOString(),
    userLevel: getUserLevel(userId)
  }
}

export function saveUserTrailProgress(userId: string, progress: UserTrailProgress) {
  localStorage.setItem(`trail_progress_${userId}_${progress.trailId}`, JSON.stringify(progress))
}

export function generateProgressiveSteps(
  trailData: any, 
  userLevel: 'beginner' | 'intermediate' | 'advanced'
): ProgressiveStep[] {
  const steps: ProgressiveStep[] = []
  let stepOrder = 0
  
  // Filtrar frases baseado no nível do usuário - apenas nível atual e superiores
  const availablePhrases = trailData.phrases.filter((phrase: any) => {
    const levelOrder = { beginner: 1, intermediate: 2, advanced: 3 }
    return levelOrder[phrase.requiredLevel] >= levelOrder[userLevel]
  })
  
  availablePhrases.forEach((phrase: any, index: number) => {
    // Adicionar frase
    steps.push({
      id: `phrase_${phrase.id}`,
      type: 'phrase',
      phrase,
      isCompleted: false,
      isUnlocked: index === 0, // Primeira frase sempre desbloqueada
      order: stepOrder++
    })
    
    // Verificar se há exercício após esta frase
    const exercise = trailData.exercises?.find((ex: any) => ex.phraseId === phrase.id)
    if (exercise) {
      steps.push({
        id: `exercise_${exercise.id}`,
        type: 'exercise',
        exercise: {
          ...exercise,
          phrase
        },
        isCompleted: false,
        isUnlocked: false, // Exercício só é desbloqueado após completar a frase
        order: stepOrder++
      })
    }
  })
  
  return steps
}