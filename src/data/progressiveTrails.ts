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
      // ===== NÍVEL BÁSICO: FUNDAMENTOS DO INGLÊS CORPORATIVO (60 frases) =====
      
      // Módulo 1: Saudações e Apresentações (15 frases)
      {
        id: 'work_phrase_1',
        english: 'Good morning everyone',
        portuguese: 'Bom dia pessoal',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Saudações matinais',
        order: 1
      },
      {
        id: 'work_phrase_2',
        english: 'Good afternoon team',
        portuguese: 'Boa tarde equipe',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Saudações da tarde',
        order: 2
      },
      {
        id: 'work_phrase_3',
        english: 'Have a great day',
        portuguese: 'Tenha um ótimo dia',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Despedidas',
        order: 3
      },
      {
        id: 'work_phrase_4',
        english: 'Nice to meet you',
        portuguese: 'Prazer em conhecê-lo',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Apresentações',
        order: 4
      },
      {
        id: 'work_phrase_5',
        english: 'My name is...',
        portuguese: 'Meu nome é...',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Apresentação pessoal',
        order: 5
      },
      {
        id: 'work_phrase_6',
        english: 'I work in the sales department',
        portuguese: 'Trabalho no departamento de vendas',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Apresentação profissional',
        order: 6
      },
      {
        id: 'work_phrase_7',
        english: 'How are you today?',
        portuguese: 'Como você está hoje?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Conversa informal',
        order: 7
      },
      {
        id: 'work_phrase_8',
        english: 'I am fine, thank you',
        portuguese: 'Estou bem, obrigado',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Resposta educada',
        order: 8
      },
      {
        id: 'work_phrase_9',
        english: 'Welcome to our company',
        portuguese: 'Bem-vindo à nossa empresa',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Recepção de visitantes',
        order: 9
      },
      {
        id: 'work_phrase_10',
        english: 'See you tomorrow',
        portuguese: 'Vejo você amanhã',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Despedida do trabalho',
        order: 10
      },
      {
        id: 'work_phrase_11',
        english: 'Have a good weekend',
        portuguese: 'Tenha um bom fim de semana',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Despedida da semana',
        order: 11
      },
      {
        id: 'work_phrase_12',
        english: 'What is your job title?',
        portuguese: 'Qual é o seu cargo?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pergunta sobre função',
        order: 12
      },
      {
        id: 'work_phrase_13',
        english: 'I am a project manager',
        portuguese: 'Sou gerente de projetos',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Resposta sobre cargo',
        order: 13
      },
      {
        id: 'work_phrase_14',
        english: 'Which department do you work in?',
        portuguese: 'Em que departamento você trabalha?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pergunta sobre setor',
        order: 14
      },
      {
        id: 'work_phrase_15',
        english: 'I work in human resources',
        portuguese: 'Trabalho em recursos humanos',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Resposta sobre departamento',
        order: 15
      },

      // Módulo 2: Solicitações e Pedidos Básicos (15 frases)
      {
        id: 'work_phrase_16',
        english: 'I need help with this task',
        portuguese: 'Preciso de ajuda com esta tarefa',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Solicitação de ajuda',
        order: 16
      },
      {
        id: 'work_phrase_17',
        english: 'Can you help me please?',
        portuguese: 'Você pode me ajudar, por favor?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pedido educado',
        order: 17
      },
      {
        id: 'work_phrase_18',
        english: 'Where is the bathroom?',
        portuguese: 'Onde fica o banheiro?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Orientação no escritório',
        order: 18
      },
      {
        id: 'work_phrase_19',
        english: 'What time is it?',
        portuguese: 'Que horas são?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pergunta sobre horário',
        order: 19
      },
      {
        id: 'work_phrase_20',
        english: 'Can you repeat that please?',
        portuguese: 'Você pode repetir isso, por favor?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Clarificação',
        order: 20
      },
      {
        id: 'work_phrase_21',
        english: 'I do not understand',
        portuguese: 'Eu não entendo',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Expressão de dúvida',
        order: 21
      },
      {
        id: 'work_phrase_22',
        english: 'Please speak slowly',
        portuguese: 'Por favor, fale devagar',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pedido de clareza',
        order: 22
      },
      {
        id: 'work_phrase_23',
        english: 'Where is my desk?',
        portuguese: 'Onde fica minha mesa?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Localização no escritório',
        order: 23
      },
      {
        id: 'work_phrase_24',
        english: 'I need a pen',
        portuguese: 'Preciso de uma caneta',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Material de escritório',
        order: 24
      },
      {
        id: 'work_phrase_25',
        english: 'Do you have paper?',
        portuguese: 'Você tem papel?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pedido de material',
        order: 25
      },
      {
        id: 'work_phrase_26',
        english: 'The printer is not working',
        portuguese: 'A impressora não está funcionando',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Problema técnico básico',
        order: 26
      },
      {
        id: 'work_phrase_27',
        english: 'I need to make a copy',
        portuguese: 'Preciso fazer uma cópia',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Uso de equipamentos',
        order: 27
      },
      {
        id: 'work_phrase_28',
        english: 'Where is the coffee machine?',
        portuguese: 'Onde fica a máquina de café?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Área comum',
        order: 28
      },
      {
        id: 'work_phrase_29',
        english: 'I want some coffee',
        portuguese: 'Quero um pouco de café',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pausa para café',
        order: 29
      },
      {
        id: 'work_phrase_30',
        english: 'Thank you very much',
        portuguese: 'Muito obrigado',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Agradecimento',
        order: 30
      },

      // Módulo 3: Comunicação por Telefone e Email Básicos (15 frases)
      {
        id: 'work_phrase_31',
        english: 'Hello, this is John speaking',
        portuguese: 'Olá, aqui é o John falando',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Atendimento telefônico',
        order: 31
      },
      {
        id: 'work_phrase_32',
        english: 'How can I help you?',
        portuguese: 'Como posso ajudá-lo?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Oferta de ajuda',
        order: 32
      },
      {
        id: 'work_phrase_33',
        english: 'Please hold the line',
        portuguese: 'Por favor, aguarde na linha',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Telefone - espera',
        order: 33
      },
      {
        id: 'work_phrase_34',
        english: 'I will call you back',
        portuguese: 'Eu ligarei de volta',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Promessa de retorno',
        order: 34
      },
      {
        id: 'work_phrase_35',
        english: 'Send me an email',
        portuguese: 'Me envie um email',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Comunicação por email',
        order: 35
      },
      {
        id: 'work_phrase_36',
        english: 'I received your message',
        portuguese: 'Recebi sua mensagem',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Confirmação de recebimento',
        order: 36
      },
      {
        id: 'work_phrase_37',
        english: 'What is your email address?',
        portuguese: 'Qual é seu endereço de email?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Solicitação de contato',
        order: 37
      },
      {
        id: 'work_phrase_38',
        english: 'My email is john@company.com',
        portuguese: 'Meu email é john@empresa.com',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Fornecimento de email',
        order: 38
      },
      {
        id: 'work_phrase_39',
        english: 'Please check your email',
        portuguese: 'Por favor, verifique seu email',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Solicitação de verificação',
        order: 39
      },
      {
        id: 'work_phrase_40',
        english: 'I sent you the document',
        portuguese: 'Enviei o documento para você',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Envio de arquivo',
        order: 40
      },
      {
        id: 'work_phrase_41',
        english: 'Did you get my email?',
        portuguese: 'Você recebeu meu email?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Confirmação de envio',
        order: 41
      },
      {
        id: 'work_phrase_42',
        english: 'I will send it today',
        portuguese: 'Enviarei hoje',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Compromisso de envio',
        order: 42
      },
      {
        id: 'work_phrase_43',
        english: 'The line is busy',
        portuguese: 'A linha está ocupada',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Problema telefônico',
        order: 43
      },
      {
        id: 'work_phrase_44',
        english: 'Sorry, wrong number',
        portuguese: 'Desculpe, número errado',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Engano telefônico',
        order: 44
      },
      {
        id: 'work_phrase_45',
        english: 'Who is calling please?',
        portuguese: 'Quem está ligando, por favor?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Identificação do chamador',
        order: 45
      },

      // Módulo 4: Horários e Agenda Básica (15 frases)
      {
        id: 'work_phrase_46',
        english: 'What time do you start work?',
        portuguese: 'Que horas você começa a trabalhar?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Horário de trabalho',
        order: 46
      },
      {
        id: 'work_phrase_47',
        english: 'I start at 9 AM',
        portuguese: 'Começo às 9 da manhã',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Horário pessoal',
        order: 47
      },
      {
        id: 'work_phrase_48',
        english: 'What time is lunch?',
        portuguese: 'Que horas é o almoço?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pausa para almoço',
        order: 48
      },
      {
        id: 'work_phrase_49',
        english: 'Lunch is at 12 PM',
        portuguese: 'Almoço é ao meio-dia',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Horário de refeição',
        order: 49
      },
      {
        id: 'work_phrase_50',
        english: 'I have a meeting at 2 PM',
        portuguese: 'Tenho uma reunião às 2 da tarde',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Compromisso agendado',
        order: 50
      },
      {
        id: 'work_phrase_51',
        english: 'Are you free tomorrow?',
        portuguese: 'Você está livre amanhã?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Disponibilidade futura',
        order: 51
      },
      {
        id: 'work_phrase_52',
        english: 'I am busy this morning',
        portuguese: 'Estou ocupado esta manhã',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Indisponibilidade',
        order: 52
      },
      {
        id: 'work_phrase_53',
        english: 'When is the deadline?',
        portuguese: 'Quando é o prazo?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Prazo de entrega',
        order: 53
      },
      {
        id: 'work_phrase_54',
        english: 'The deadline is Friday',
        portuguese: 'O prazo é sexta-feira',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Data limite',
        order: 54
      },
      {
        id: 'work_phrase_55',
        english: 'I am late for work',
        portuguese: 'Estou atrasado para o trabalho',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Atraso profissional',
        order: 55
      },
      {
        id: 'work_phrase_56',
        english: 'I need to leave early today',
        portuguese: 'Preciso sair mais cedo hoje',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Saída antecipada',
        order: 56
      },
      {
        id: 'work_phrase_57',
        english: 'What day is today?',
        portuguese: 'Que dia é hoje?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Data atual',
        order: 57
      },
      {
        id: 'work_phrase_58',
        english: 'Today is Monday',
        portuguese: 'Hoje é segunda-feira',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Dia da semana',
        order: 58
      },
      {
        id: 'work_phrase_59',
        english: 'I will be back in 10 minutes',
        portuguese: 'Voltarei em 10 minutos',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Tempo de ausência',
        order: 59
      },
      {
        id: 'work_phrase_60',
        english: 'I work from Monday to Friday',
        portuguese: 'Trabalho de segunda a sexta',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Rotina semanal',
        order: 60
      },

      // ===== NÍVEL INTERMEDIÁRIO: COMUNICAÇÃO PROFISSIONAL (40 frases) =====
      
      // Módulo 5: Reuniões e Agendamentos (20 frases)
      {
        id: 'work_phrase_61',
        english: 'Could you schedule a meeting for tomorrow?',
        portuguese: 'Você poderia agendar uma reunião para amanhã?',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Agendamento de reunião',
        order: 61
      },
      {
        id: 'work_phrase_62',
        english: 'I would like to reschedule our appointment',
        portuguese: 'Gostaria de reagendar nosso compromisso',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Reagendamento',
        order: 62
      },
      {
        id: 'work_phrase_63',
        english: 'The meeting has been postponed until next week',
        portuguese: 'A reunião foi adiada para a próxima semana',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Alteração de agenda',
        order: 63
      },
      {
        id: 'work_phrase_64',
        english: 'We need to discuss the project timeline',
        portuguese: 'Precisamos discutir o cronograma do projeto',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Discussão de projeto',
        order: 64
      },
      {
        id: 'work_phrase_65',
        english: 'Let me check my calendar and get back to you',
        portuguese: 'Deixe-me verificar minha agenda e retorno para você',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Verificação de disponibilidade',
        order: 65
      }
      
      // ===== MAIS FRASES INTERMEDIÁRIAS E AVANÇADAS SERÃO ADICIONADAS =====
      // Total atual: 65 frases (60 básicas + 5 intermediárias)
      // Meta: 150+ frases para um curso completo
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