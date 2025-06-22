export interface ProgressivePhrase {
  id: string
  english: string
  portuguese: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  requiredLevel: 'beginner' | 'intermediate' | 'advanced'
  context: string // Tema/categoria da frase (ex: "Solicitação de entrega", "Agenda", etc)
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
  currentLevelProgress: {
    level: 'beginner' | 'intermediate' | 'advanced'
    completedInLevel: number
    totalInLevel: number
    canAdvanceToNextLevel: boolean
  }
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
        context: 'Saudação matinal',
        order: 1
      },
      {
        id: 'work_phrase_2', 
        english: 'How are you today?',
        portuguese: 'Como você está hoje?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Conversa informal',
        order: 2
      },
      {
        id: 'work_phrase_3',
        english: 'I need help with this task',
        portuguese: 'Preciso de ajuda com esta tarefa',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Solicitação de ajuda',
        order: 3
      },
      
      // Intermediate Level
      {
        id: 'work_phrase_4',
        english: 'Could you schedule a meeting for tomorrow?',
        portuguese: 'Você poderia agendar uma reunião para amanhã?',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Agendamento de reunião',
        order: 4
      },
      {
        id: 'work_phrase_5',
        english: 'I need to review the quarterly report',
        portuguese: 'Preciso revisar o relatório trimestral',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Revisão de relatório',
        order: 5
      },
      {
        id: 'work_phrase_6',
        english: 'The project deadline has been moved up',
        portuguese: 'O prazo do projeto foi antecipado',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Alteração de prazo',
        order: 6
      },
      
      // Advanced Level  
      {
        id: 'work_phrase_7',
        english: 'We need to streamline our operational processes',
        portuguese: 'Precisamos otimizar nossos processos operacionais',
        difficulty: 'advanced' as const,
        requiredLevel: 'advanced' as const,
        context: 'Otimização de processos',
        order: 7
      },
      {
        id: 'work_phrase_8',
        english: 'Let\'s leverage synergies across departments',
        portuguese: 'Vamos aproveitar as sinergias entre departamentos',
        difficulty: 'advanced' as const,
        requiredLevel: 'advanced' as const,
        context: 'Colaboração entre departamentos',
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
        context: 'Localização do aeroporto',
        order: 1
      },
      {
        id: 'travel_phrase_2',
        english: 'I have a reservation',
        portuguese: 'Eu tenho uma reserva',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Check-in no hotel',
        order: 2
      },
      {
        id: 'travel_phrase_3',
        english: 'How much does this cost?',
        portuguese: 'Quanto custa isso?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pergunta sobre preço',
        order: 3
      },
      
      // Intermediate Level
      {
        id: 'travel_phrase_4',
        english: 'Could you recommend a good restaurant nearby?',
        portuguese: 'Você poderia recomendar um bom restaurante próximo?',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Pedido de recomendação',
        order: 4
      },
      {
        id: 'travel_phrase_5',
        english: 'I\'d like to book a tour for tomorrow',
        portuguese: 'Gostaria de reservar um tour para amanhã',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Reserva de passeio',
        order: 5
      },
      
      // Advanced Level
      {
        id: 'travel_phrase_6',
        english: 'I need to reschedule my connecting flight',
        portuguese: 'Preciso reagendar meu voo de conexão',
        difficulty: 'advanced' as const,
        requiredLevel: 'advanced' as const,
        context: 'Reagendamento de voo',
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
    const progress = JSON.parse(savedProgress)
    // Garantir que tem o novo campo currentLevelProgress
    if (!progress.currentLevelProgress) {
      progress.currentLevelProgress = {
        level: progress.userLevel || 'beginner',
        completedInLevel: 0,
        totalInLevel: 0,
        canAdvanceToNextLevel: false
      }
    }
    return progress
  }
  
  // Progresso inicial
  return {
    trailId,
    currentStepIndex: 0,
    completedSteps: [],
    totalSteps: 0,
    progressPercentage: 0,
    lastAccessedAt: new Date().toISOString(),
    userLevel: getUserLevel(userId),
    currentLevelProgress: {
      level: getUserLevel(userId),
      completedInLevel: 0,
      totalInLevel: 0,
      canAdvanceToNextLevel: false
    }
  }
}

export function saveUserTrailProgress(userId: string, progress: UserTrailProgress) {
  localStorage.setItem(`trail_progress_${userId}_${progress.trailId}`, JSON.stringify(progress))
}

// Função para calcular progresso por nível (apenas trilha trabalho)
export function calculateLevelProgress(
  steps: ProgressiveStep[], 
  completedSteps: string[], 
  currentLevel: 'beginner' | 'intermediate' | 'advanced'
): { completedInLevel: number, totalInLevel: number, canAdvanceToNextLevel: boolean } {
  const levelSteps = steps.filter(step => {
    if (step.phrase) {
      return step.phrase.difficulty === currentLevel
    }
    if (step.exercise?.phrase) {
      return step.exercise.phrase.difficulty === currentLevel
    }
    return false
  })
  
  const completedInLevel = levelSteps.filter(step => completedSteps.includes(step.id)).length
  const totalInLevel = levelSteps.length
  const canAdvanceToNextLevel = completedInLevel === totalInLevel && totalInLevel > 0
  
  return { completedInLevel, totalInLevel, canAdvanceToNextLevel }
}

export function generateProgressiveSteps(
  trailData: any, 
  userLevel: 'beginner' | 'intermediate' | 'advanced',
  trailId?: string
): ProgressiveStep[] {
  const steps: ProgressiveStep[] = []
  let stepOrder = 0
  
  // Implementação pedagógica APENAS para trilha de trabalho
  if (trailId === 'trabalho') {
    return generateWorkTrailProgressiveSteps(trailData, userLevel)
  }
  
  // Lógica original para outras trilhas
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
      isUnlocked: index === 0,
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
        isUnlocked: false,
        order: stepOrder++
      })
    }
  })
  
  return steps
}

// Função específica para progressão pedagógica da trilha de trabalho
function generateWorkTrailProgressiveSteps(
  trailData: any, 
  userLevel: 'beginner' | 'intermediate' | 'advanced'
): ProgressiveStep[] {
  const steps: ProgressiveStep[] = []
  let stepOrder = 0
  
  // Separar conteúdo por níveis - PROGRESSÃO SEQUENCIAL
  const beginnerPhrases = trailData.phrases.filter((p: any) => p.difficulty === 'beginner' || p.difficulty === 'básico')
  const intermediatePhrases = trailData.phrases.filter((p: any) => p.difficulty === 'intermediate' || p.difficulty === 'médio')
  const advancedPhrases = trailData.phrases.filter((p: any) => p.difficulty === 'advanced' || p.difficulty === 'avançado')
  
  // PROGRESSÃO PEDAGÓGICA: Básico → Intermediário → Avançado
  
  // 1. NÍVEL BÁSICO - Sempre incluir
  beginnerPhrases.forEach((phrase: any, index: number) => {
    steps.push({
      id: `phrase_${phrase.id}`,
      type: 'phrase',
      phrase: { ...phrase, difficulty: 'beginner' },
      isCompleted: false,
      isUnlocked: index === 0, // Só a primeira frase básica desbloqueada inicialmente
      order: stepOrder++
    })
    
    // Exercício após cada frase básica
    const exercise = trailData.exercises?.find((ex: any) => ex.phraseId === phrase.id)
    if (exercise) {
      steps.push({
        id: `exercise_${exercise.id}`,
        type: 'exercise',
        exercise: {
          ...exercise,
          phrase: { ...phrase, difficulty: 'beginner' }
        },
        isCompleted: false,
        isUnlocked: false,
        order: stepOrder++
      })
    }
  })
  
  // Adicionar teste de progressão do básico
  if (beginnerPhrases.length > 0) {
    steps.push({
      id: 'level_test_beginner_to_intermediate',
      type: 'exercise',
      exercise: {
        id: 'level_test_beginner',
        type: 'multiple-choice',
        phrase: {
          id: 'test_beginner',
          english: 'Level Assessment Test',
          portuguese: 'Teste de Avaliação de Nível',
          difficulty: 'beginner',
          requiredLevel: 'beginner',
          context: 'Teste de Progressão',
          order: 999
        },
        data: {
          question: 'Complete: "Good morning! _____ can I help you today?"',
          options: ['How', 'What', 'Where', 'When'],
          correctAnswer: 0,
          explanation: 'Use "How" to offer help politely in business context.'
        } as MultipleChoiceData,
        requiredToProgress: true,
        order: stepOrder
      },
      isCompleted: false,
      isUnlocked: false, // Só destrava após completar todo o básico
      order: stepOrder++
    })
  }
  
  // 2. NÍVEL INTERMEDIÁRIO - Só disponível se usuário passou do básico
  if (userLevel === 'intermediate' || userLevel === 'advanced') {
    intermediatePhrases.forEach((phrase: any) => {
      steps.push({
        id: `phrase_${phrase.id}`,
        type: 'phrase',
        phrase: { ...phrase, difficulty: 'intermediate' },
        isCompleted: false,
        isUnlocked: false, // Destrava só após completar básico
        order: stepOrder++
      })
      
      const exercise = trailData.exercises?.find((ex: any) => ex.phraseId === phrase.id)
      if (exercise) {
        steps.push({
          id: `exercise_${exercise.id}`,
          type: 'exercise',
          exercise: {
            ...exercise,
            phrase: { ...phrase, difficulty: 'intermediate' }
          },
          isCompleted: false,
          isUnlocked: false,
          order: stepOrder++
        })
      }
    })
  }
  
  // 3. NÍVEL AVANÇADO - Só disponível se usuário é avançado
  if (userLevel === 'advanced') {
    advancedPhrases.forEach((phrase: any) => {
      steps.push({
        id: `phrase_${phrase.id}`,
        type: 'phrase',
        phrase: { ...phrase, difficulty: 'advanced' },
        isCompleted: false,
        isUnlocked: false, // Destrava só após completar intermediário
        order: stepOrder++
      })
      
      const exercise = trailData.exercises?.find((ex: any) => ex.phraseId === phrase.id)
      if (exercise) {
        steps.push({
          id: `exercise_${exercise.id}`,
          type: 'exercise',
          exercise: {
            ...exercise,
            phrase: { ...phrase, difficulty: 'advanced' }
          },
          isCompleted: false,
          isUnlocked: false,
          order: stepOrder++
        })
      }
    })
  }
  
  return steps
}