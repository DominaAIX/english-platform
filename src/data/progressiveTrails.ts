// ===== INTERFACES ESSENCIAIS =====

export interface ProgressivePhrase {
  id: string
  english: string
  portuguese: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  requiredLevel: 'beginner' | 'intermediate' | 'advanced'
  context: string
  order: number
}

export interface ProgressiveExercise {
  id: string
  type: 'drag-drop' | 'complete-sentence' | 'translation' | 'multiple-choice'
  phrase: ProgressivePhrase
  data: any
  requiredToProgress: boolean
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

// ===== DADOS DAS TRILHAS PROGRESSIVAS =====
export const PROGRESSIVE_TRAILS_DATA = {
  trabalho: {
    id: 'trabalho',
    title: 'Inglês para Trabalho',
    icon: '💼',
    description: 'Frases essenciais que nativos realmente usam no ambiente de trabalho',
    color: 'from-blue-500 to-cyan-500',
    phrases: [
      // ===== NÍVEL BÁSICO: FRASES REAIS DO DIA A DIA NO TRABALHO =====
      
      // Saudações e apresentações (10 frases)
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
        english: 'Nice to meet you',
        portuguese: 'Prazer em conhecê-lo',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Apresentação',
        order: 2
      },
      {
        id: 'work_phrase_3',
        english: 'How was your weekend?',
        portuguese: 'Como foi seu fim de semana?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Conversa informal',
        order: 3
      },
      {
        id: 'work_phrase_4',
        english: 'I work in the marketing department',
        portuguese: 'Trabalho no departamento de marketing',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Apresentação profissional',
        order: 4
      },
      {
        id: 'work_phrase_5',
        english: 'What do you do here?',
        portuguese: 'O que você faz aqui?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pergunta sobre função',
        order: 5
      },
      {
        id: 'work_phrase_6',
        english: 'Have a great day',
        portuguese: 'Tenha um ótimo dia',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Despedida',
        order: 6
      },
      {
        id: 'work_phrase_7',
        english: 'See you tomorrow',
        portuguese: 'Vejo você amanhã',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Despedida do trabalho',
        order: 7
      },
      {
        id: 'work_phrase_8',
        english: 'Welcome to the team',
        portuguese: 'Bem-vindo à equipe',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Recepção de novos colegas',
        order: 8
      },
      {
        id: 'work_phrase_9',
        english: 'How long have you been here?',
        portuguese: 'Há quanto tempo você está aqui?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pergunta sobre experiência',
        order: 9
      },
      {
        id: 'work_phrase_10',
        english: 'I just started last week',
        portuguese: 'Comecei na semana passada',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Resposta sobre tempo de empresa',
        order: 10
      },

      // Pedidos e solicitações (10 frases)
      {
        id: 'work_phrase_11',
        english: 'Can you help me with this?',
        portuguese: 'Você pode me ajudar com isso?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Solicitação de ajuda',
        order: 11
      },
      {
        id: 'work_phrase_12',
        english: 'Where is the bathroom?',
        portuguese: 'Onde fica o banheiro?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Orientação no escritório',
        order: 12
      },
      {
        id: 'work_phrase_13',
        english: 'Could you repeat that please?',
        portuguese: 'Você poderia repetir isso, por favor?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Clarificação',
        order: 13
      },
      {
        id: 'work_phrase_14',
        english: 'I need to make a copy',
        portuguese: 'Preciso fazer uma cópia',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Uso de equipamentos',
        order: 14
      },
      {
        id: 'work_phrase_15',
        english: 'The printer is not working',
        portuguese: 'A impressora não está funcionando',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Problema técnico',
        order: 15
      },
      {
        id: 'work_phrase_16',
        english: 'Do you have a pen?',
        portuguese: 'Você tem uma caneta?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Material de escritório',
        order: 16
      },
      {
        id: 'work_phrase_17',
        english: 'Thank you so much',
        portuguese: 'Muito obrigado',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Agradecimento',
        order: 17
      },
      {
        id: 'work_phrase_18',
        english: 'No problem at all',
        portuguese: 'Sem problema algum',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Resposta educada',
        order: 18
      },
      {
        id: 'work_phrase_19',
        english: 'Where can I find...?',
        portuguese: 'Onde posso encontrar...?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Procurar algo',
        order: 19
      },
      {
        id: 'work_phrase_20',
        english: 'I\'ll be right back',
        portuguese: 'Já volto',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Saída temporária',
        order: 20
      },

      // ===== NÍVEL INTERMEDIÁRIO: COMUNICAÇÃO MAIS COMPLEXA =====
      
      // Reuniões e discussões (10 frases)
      {
        id: 'work_phrase_21',
        english: 'Let\'s schedule a meeting',
        portuguese: 'Vamos agendar uma reunião',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Agendamento',
        order: 21
      },
      {
        id: 'work_phrase_22',
        english: 'I have a conflict at that time',
        portuguese: 'Tenho um conflito nesse horário',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Reagendamento',
        order: 22
      },
      {
        id: 'work_phrase_23',
        english: 'What do you think about this?',
        portuguese: 'O que você acha disso?',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Pedindo opinião',
        order: 23
      },
      {
        id: 'work_phrase_24',
        english: 'I disagree with that approach',
        portuguese: 'Discordo dessa abordagem',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Expressar discordância',
        order: 24
      },
      {
        id: 'work_phrase_25',
        english: 'That makes perfect sense',
        portuguese: 'Isso faz todo sentido',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Concordância',
        order: 25
      },
      {
        id: 'work_phrase_26',
        english: 'We need to discuss this further',
        portuguese: 'Precisamos discutir isso mais',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Discussão pendente',
        order: 26
      },
      {
        id: 'work_phrase_27',
        english: 'Let me get back to you on that',
        portuguese: 'Deixe-me retornar sobre isso',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Promessa de retorno',
        order: 27
      },
      {
        id: 'work_phrase_28',
        english: 'I\'ll look into it right away',
        portuguese: 'Vou verificar isso imediatamente',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Compromisso de ação',
        order: 28
      },
      {
        id: 'work_phrase_29',
        english: 'Can we move this to next week?',
        portuguese: 'Podemos mover isso para semana que vem?',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Reagendamento',
        order: 29
      },
      {
        id: 'work_phrase_30',
        english: 'I\'m swamped with work right now',
        portuguese: 'Estou sobrecarregado de trabalho agora',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Expressar sobrecarga',
        order: 30
      },

      // ===== NÍVEL AVANÇADO: EXPRESSÕES NATURAIS DOS NATIVOS =====
      
      // Expressões idiomáticas do trabalho (10 frases)
      {
        id: 'work_phrase_31',
        english: 'Let\'s touch base on this next week',
        portuguese: 'Vamos conversar sobre isso na próxima semana',
        difficulty: 'advanced' as const,
        requiredLevel: 'advanced' as const,
        context: 'Agendar contato futuro',
        order: 31
      },
      {
        id: 'work_phrase_32',
        english: 'I\'m really slammed today',
        portuguese: 'Estou realmente sobrecarregado hoje',
        difficulty: 'advanced' as const,
        requiredLevel: 'advanced' as const,
        context: 'Expressar ocupação',
        order: 32
      },
      {
        id: 'work_phrase_33',
        english: 'Let\'s circle back on that',
        portuguese: 'Vamos retomar isso depois',
        difficulty: 'advanced' as const,
        requiredLevel: 'advanced' as const,
        context: 'Adiar discussão',
        order: 33
      },
      {
        id: 'work_phrase_34',
        english: 'I\'m looping you in on this email',
        portuguese: 'Estou te incluindo neste email',
        difficulty: 'advanced' as const,
        requiredLevel: 'advanced' as const,
        context: 'Incluir em comunicação',
        order: 34
      },
      {
        id: 'work_phrase_35',
        english: 'Can you run point on this project?',
        portuguese: 'Você pode liderar este projeto?',
        difficulty: 'advanced' as const,
        requiredLevel: 'advanced' as const,
        context: 'Delegação de liderança',
        order: 35
      }
    ],
    exercises: [
      // Exercício após frase 3 (beginner)
      {
        id: 'work_ex_1',
        type: 'drag-drop' as const,
        phraseId: 'work_phrase_3',
        data: {
          correctSentence: 'How was your weekend?',
          words: ['How', 'was', 'your', 'weekend?'],
          translation: 'Como foi seu fim de semana?'
        } as DragDropExerciseData,
        requiredToProgress: true,
        order: 3.5
      },
      
      // Exercício após frase 7 (beginner)
      {
        id: 'work_ex_2', 
        type: 'complete-sentence' as const,
        phraseId: 'work_phrase_7',
        data: {
          sentence: 'See you _____',
          options: ['tomorrow', 'yesterday', 'never', 'always'],
          correctAnswer: 0,
          translation: 'Vejo você amanhã'
        } as CompleteSentenceData,
        requiredToProgress: true,
        order: 7.5
      },
      
      // Exercício após frase 15 (beginner)
      {
        id: 'work_ex_3',
        type: 'multiple-choice' as const,
        phraseId: 'work_phrase_15',
        data: {
          question: 'What do you say when equipment is broken?',
          options: [
            'The printer is not working',
            'The printer is very good', 
            'I love the printer',
            'The printer is expensive'
          ],
          correctAnswer: 0,
          explanation: 'Use "not working" to say something is broken'
        } as MultipleChoiceData,
        requiredToProgress: true,
        order: 15.5
      },

      // Exercício após frase 25 (intermediate)
      {
        id: 'work_ex_4',
        type: 'translation' as const,
        phraseId: 'work_phrase_25',
        data: {
          portugueseText: 'Isso faz todo sentido',
          correctEnglish: 'That makes perfect sense',
          alternatives: ['That makes total sense', 'This makes perfect sense'],
          hint: 'Use "makes sense" para expressar que algo é lógico'
        } as TranslationExerciseData,
        requiredToProgress: true,
        order: 25.5
      }
    ]
  },
  
  viagens: {
    id: 'viagens',
    title: 'Inglês para Viagens',  
    icon: '✈️',
    description: 'Frases essenciais para viajar com confiança',
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
          explanation: 'Use "Where is...?" to ask for location'
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
  
  // ESTRUTURA SIMPLES: Separar conteúdo por níveis - PROGRESSÃO SEQUENCIAL
  const beginnerPhrases = trailData.phrases.filter((p: any) => p.difficulty === 'beginner')
  const intermediatePhrases = trailData.phrases.filter((p: any) => p.difficulty === 'intermediate')
  const advancedPhrases = trailData.phrases.filter((p: any) => p.difficulty === 'advanced')
  
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