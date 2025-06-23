// ===== INTERFACES ESSENCIAIS =====

export interface ProgressivePhrase {
  id: string
  english: string
  portuguese: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  requiredLevel: 'beginner' | 'intermediate' | 'advanced'
  context: string
  situations?: string[] // Exemplos de situações práticas
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
      
      // Chegada e saída do trabalho (10 frases)
      {
        id: 'work_phrase_1',
        english: 'Good morning!',
        portuguese: 'Bom dia!',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Saudação matinal formal',
        situations: [
          'Chegando no escritório de manhã → Você: "Good morning!" para os colegas',
          'Entrando em uma reunião matinal → Você: "Good morning everyone!"'
        ],
        order: 1
      },
      {
        id: 'work_phrase_2',
        english: 'Morning!',
        portuguese: 'Oi!',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Saudação matinal casual',
        situations: [
          'Passando pelo corredor e vendo um colega → Você: "Morning!"',
          'Chegando atrasado e cumprimentando rapidamente → Você: "Morning!" enquanto anda'
        ],
        order: 2
      },
      {
        id: 'work_phrase_3',
        english: 'How\'s it going?',
        portuguese: 'Como vai?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Cumprimento casual',
        situations: [
          'Encontrando um colega na cozinha → Você: "Hey! How\'s it going?"',
          'Colega parece estressado → Você: "How\'s it going? Everything okay?"'
        ],
        order: 3
      },
      {
        id: 'work_phrase_4',
        english: 'Busy day today, huh?',
        portuguese: 'Dia corrido hoje, né?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Small talk sobre o dia',
        situations: [
          'Vendo colega correndo com papéis → Você: "Busy day today, huh?"',
          'Notando movimento no escritório → Você: "Busy day today, huh?"'
        ],
        order: 4
      },
      {
        id: 'work_phrase_5',
        english: 'I just got in',
        portuguese: 'Acabei de chegar',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Chegada ao trabalho',
        situations: [
          'Colega: "Você estava na reunião?" → Você: "No, I just got in"',
          'Chefe: "Você viu meu email?" → Você: "Sorry, I just got in"'
        ],
        order: 5
      },
      {
        id: 'work_phrase_6',
        english: 'Time to get started',
        portuguese: 'Hora de começar',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Início do trabalho',
        situations: [
          'Chegando na mesa de manhã → Você: "Alright, time to get started!"',
          'Após o café → Você: "Okay team, time to get started"'
        ],
        order: 6
      },
      {
        id: 'work_phrase_7',
        english: 'Let\'s get to it',
        portuguese: 'Vamos nessa',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Motivação para começar',
        situations: [
          'Início de projeto em equipe → Você: "Alright everyone, let\'s get to it!"',
          'Voltando do almoço → Você: "Break\'s over, let\'s get to it"'
        ],
        order: 7
      },
      {
        id: 'work_phrase_8',
        english: 'I\'m heading out now',
        portuguese: 'Estou saindo agora',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Saída do trabalho',
        situations: [
          'Final do expediente → Você: "I\'m heading out now, see you tomorrow!"',
          'Saindo para almoço → Você: "I\'m heading out now for lunch"'
        ],
        order: 8
      },
      {
        id: 'work_phrase_9',
        english: 'See you tomorrow!',
        portuguese: 'Vejo você amanhã!',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Despedida do trabalho',
        situations: [
          'Saindo do escritório à noite → Você: "See you tomorrow!"',
          'Final da sexta-feira → Você: "See you tomorrow!" (ou Monday)'
        ],
        order: 9
      },
      {
        id: 'work_phrase_10',
        english: 'Have a good one!',
        portuguese: 'Tenha um bom dia!',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Despedida casual',
        situations: [
          'Colega saindo para o almoço → Você: "Have a good one!"',
          'Despedida casual no elevador → Você: "Have a good one!"'
        ],
        order: 10
      },

      // Conversas rápidas - small talk (15 frases)
      {
        id: 'work_phrase_11',
        english: 'How was your weekend?',
        portuguese: 'Como foi seu fim de semana?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Small talk segunda-feira',
        situations: [
          'Segunda-feira de manhã no elevador → Você: "How was your weekend?"',
          'Encontra um colega na cozinha → Você: "How was your weekend?"'
        ],
        order: 11
      },
      {
        id: 'work_phrase_12',
        english: 'Not bad, and you?',
        portuguese: 'Nada mal, e você?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Resposta casual',
        situations: [
          'Colega: "How are you doing?" → Você: "Not bad, and you?"',
          'Cliente: "How\'s everything?" → Você: "Not bad, and you?"'
        ],
        order: 12
      },
      {
        id: 'work_phrase_13',
        english: 'Same old, same old',
        portuguese: 'A mesma coisa de sempre',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Resposta sobre rotina',
        situations: [
          'Colega: "What\'s new?" → Você: "Same old, same old"',
          'Amigo: "How\'s work?" → Você: "Same old, same old"'
        ],
        order: 13
      },
      {
        id: 'work_phrase_14',
        english: 'Can\'t complain',
        portuguese: 'Não posso reclamar',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Resposta positiva',
        situations: [
          'Chefe: "How are things going?" → Você: "Can\'t complain!"',
          'Cliente: "How\'s business?" → Você: "Can\'t complain"'
        ],
        order: 14
      },
      {
        id: 'work_phrase_15',
        english: 'What time is your meeting?',
        portuguese: 'Que horas é sua reunião?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pergunta sobre agenda',
        situations: [
          'Planejando horário para conversar → Você: "What time is your meeting?"',
          'Vendo colega se preparando → Você: "What time is your meeting?"'
        ],
        order: 15
      },
      {
        id: 'work_phrase_16',
        english: 'Let me grab a coffee first',
        portuguese: 'Deixe-me pegar um café primeiro',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pausa para café',
        situations: [
          'Chegando cedo no trabalho → Você: "Let me grab a coffee first"',
          'Antes de uma reunião → Você: "Let me grab a coffee first, then we can start"'
        ],
        order: 16
      },
      {
        id: 'work_phrase_17',
        english: 'Just catching up on emails',
        portuguese: 'Só colocando os emails em dia',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Explicar o que está fazendo',
        situations: [
          'Colega: "What are you working on?" → Você: "Just catching up on emails"',
          'Chefe passa pela sua mesa → Você: "Just catching up on emails"'
        ],
        order: 17
      },
      {
        id: 'work_phrase_18',
        english: 'What\'s up?',
        portuguese: 'E aí?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Cumprimento entre colegas',
        situations: [
          'Encontrando um amigo do trabalho → Você: "Hey! What\'s up?"',
          'Colega chega na sua mesa → Você: "What\'s up?"'
        ],
        order: 18
      },
      {
        id: 'work_phrase_19',
        english: 'Take your time',
        portuguese: 'Sem pressa',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Dar tempo ao colega',
        situations: [
          'Colega procurando arquivo → Você: "Take your time, no rush"',
          'Alguém pensando na resposta → Você: "Take your time"'
        ],
        order: 19
      },
      {
        id: 'work_phrase_20',
        english: 'No rush',
        portuguese: 'Sem pressa',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Sem urgência',
        situations: [
          'Pedindo algo para colega → Você: "Can you send it today? No rush though"',
          'Colega se desculpando por demora → Você: "No rush, take your time"'
        ],
        order: 20
      },
      {
        id: 'work_phrase_21',
        english: 'That makes sense',
        portuguese: 'Faz sentido',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Concordar com lógica',
        situations: [
          'Colega explica um processo → Você: "Oh, that makes sense!"',
          'Chefe justifica uma decisão → Você: "Yes, that makes sense"'
        ],
        order: 21
      },
      {
        id: 'work_phrase_22',
        english: 'Got it!',
        portuguese: 'Entendi!',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Confirmar compreensão',
        situations: [
          'Colega explica instruções → Você: "Got it! I\'ll do that"',
          'Chefe dá orientações → Você: "Got it, thanks!"'
        ],
        order: 22
      },
      {
        id: 'work_phrase_23',
        english: 'I see what you mean',
        portuguese: 'Entendo o que você quer dizer',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Mostrar compreensão',
        situations: [
          'Após explicação complexa → Você: "Ah, I see what you mean now"',
          'Colega dá sugestão → Você: "I see what you mean, good point"'
        ],
        order: 23
      },
      {
        id: 'work_phrase_24',
        english: 'Exactly!',
        portuguese: 'Exatamente!',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Concordância enfática',
        situations: [
          'Colega: "This process is confusing" → Você: "Exactly! I think so too"',
          'Cliente: "We need better communication" → Você: "Exactly!"'
        ],
        order: 24
      },
      {
        id: 'work_phrase_25',
        english: 'You\'re right',
        portuguese: 'Você está certo',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Concordar com colega',
        situations: [
          'Colega aponta erro → Você: "You\'re right, I\'ll fix that"',
          'Discussão de ideias → Você: "You\'re right, that\'s better"'
        ],
        order: 25
      },

      // Emails e comunicação (15 frases)
      {
        id: 'work_phrase_26',
        english: 'Just a quick reminder',
        portuguese: 'Só um lembrete rápido',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Início de email',
        situations: [
          'Email: "Just a quick reminder that the meeting is at 3pm"',
          'Chat: "Just a quick reminder to send the report by Friday"'
        ],
        order: 26
      },
      {
        id: 'work_phrase_27',
        english: 'Let me know',
        portuguese: 'Me avise',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pedido de retorno',
        situations: [
          'Email: "Let me know if you need any changes"',
          'Conversa: "Let me know when you\'re done with the project"'
        ],
        order: 27
      },
      {
        id: 'work_phrase_28',
        english: 'Please find attached',
        portuguese: 'Segue anexo',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Email com anexo',
        situations: [
          'Enviando relatório por email → "Please find attached the monthly report"',
          'Enviando documento → "Please find attached the contract for review"'
        ],
        order: 28
      },
      {
        id: 'work_phrase_29',
        english: 'FYI',
        portuguese: 'Para sua informação',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Sigla comum em emails',
        situations: [
          'Email informativo → "FYI - meeting moved to 3pm"',
          'Compartilhando informação → "FYI, the client approved the proposal"'
        ],
        order: 29
      },
      {
        id: 'work_phrase_30',
        english: 'I\'ll get back to you',
        portuguese: 'Retorno para você',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Promessa de resposta',
        situations: [
          'Cliente: "Quando posso ter uma resposta?" → Você: "I\'ll get back to you by tomorrow"',
          'Colega: "Você pode verificar isso?" → Você: "I\'ll get back to you with the details"'
        ],
        order: 30
      },
      {
        id: 'work_phrase_31',
        english: 'Sounds good!',
        portuguese: 'Parece bom!',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Aprovação casual',
        situations: [
          'Colega sugere reunião → Você: "Tomorrow at 2pm? Sounds good!"',
          'Plano proposto → Você: "Sounds good, let\'s do it!"'
        ],
        order: 31
      },
      {
        id: 'work_phrase_32',
        english: 'Thanks in advance',
        portuguese: 'Obrigado antecipadamente',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Agradecimento por email',
        situations: [
          'Pedindo favor por email → "Can you review this? Thanks in advance"',
          'Solicitando informação → "Please send the data. Thanks in advance"'
        ],
        order: 32
      },
      {
        id: 'work_phrase_33',
        english: 'No worries',
        portuguese: 'Sem problemas',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Resposta tranquilizadora',
        situations: [
          'Colega se desculpa → Você: "No worries, it happens"',
          'Cliente agradece → Você: "No worries, happy to help"'
        ],
        order: 33
      },
      {
        id: 'work_phrase_34',
        english: 'No problem',
        portuguese: 'Sem problema',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Resposta positiva',
        situations: [
          'Pedido de ajuda → Você: "Can you help me?" → Colega: "No problem!"',
          'Agradecimento → Cliente: "Thank you!" → Você: "No problem"'
        ],
        order: 34
      },
      {
        id: 'work_phrase_35',
        english: 'Can you send it over?',
        portuguese: 'Pode me enviar?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pedido de arquivo',
        situations: [
          'Precisando de documento → Você: "Can you send it over by email?"',
          'Solicitando arquivo → Você: "Do you have the report? Can you send it over?"'
        ],
        order: 35
      },
      {
        id: 'work_phrase_36',
        english: 'I\'m copying you',
        portuguese: 'Estou te copiando',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'CC em email',
        situations: [
          'Incluindo alguém no email → "I\'m copying you on this email"',
          'Mantendo informado → "I\'m copying you so you\'re in the loop"'
        ],
        order: 36
      },

      // Durante o trabalho (15 frases)
      {
        id: 'work_phrase_37',
        english: 'I\'m working on it',
        portuguese: 'Estou trabalhando nisso',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Status de tarefa',
        situations: [
          'Chefe: "Como está o projeto?" → Você: "I\'m working on it, should be done soon"',
          'Cliente: "Qual o status da solicitação?" → Você: "I\'m working on it right now"'
        ],
        order: 37
      },
      {
        id: 'work_phrase_38',
        english: 'I\'ll do it right away',
        portuguese: 'Vou fazer agora mesmo',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Compromisso imediato',
        situations: [
          'Chefe pede tarefa urgente → Você: "I\'ll do it right away"',
          'Cliente solicita correção → Você: "I\'ll do it right away, sorry"'
        ],
        order: 38
      },
      {
        id: 'work_phrase_39',
        english: 'I\'m almost done',
        portuguese: 'Estou quase terminando',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Status próximo ao fim',
        situations: [
          'Chefe: "How\'s the report?" → Você: "I\'m almost done, 5 more minutes"',
          'Colega pergunta sobre progresso → Você: "I\'m almost done with this"'
        ],
        order: 39
      },
      {
        id: 'work_phrase_40',
        english: 'It\'s taking longer than expected',
        portuguese: 'Está demorando mais que esperado',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Atraso na tarefa',
        situations: [
          'Avisando sobre atraso → Você: "Sorry, it\'s taking longer than expected"',
          'Explicando demora → Você: "The task is complex, it\'s taking longer than expected"'
        ],
        order: 40
      },
      {
        id: 'work_phrase_41',
        english: 'I need a hand with this',
        portuguese: 'Preciso de uma ajuda com isso',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pedido de ajuda casual',
        situations: [
          'Tarefa complicada → Você: "I need a hand with this project"',
          'Problema técnico → Você: "I need a hand with this software issue"'
        ],
        order: 41
      },
      {
        id: 'work_phrase_42',
        english: 'Let\'s have a quick call',
        portuguese: 'Vamos fazer uma ligação rápida',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Sugestão de conversa',
        situations: [
          'Questão complexa por email → Você: "Let\'s have a quick call to discuss"',
          'Esclarecimento necessário → Você: "Let\'s have a quick call about this"'
        ],
        order: 42
      },
      {
        id: 'work_phrase_43',
        english: 'Can we talk real quick?',
        portuguese: 'Podemos conversar rapidinho?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pedido de conversa breve',
        situations: [
          'Passando na mesa do colega → Você: "Can we talk real quick?"',
          'Questão urgente → Você: "Can we talk real quick about the project?"'
        ],
        order: 43
      },
      {
        id: 'work_phrase_44',
        english: 'I\'m in a meeting',
        portuguese: 'Estou em uma reunião',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Status ocupado',
        situations: [
          'Telefone toca durante reunião → Você: "Sorry, I\'m in a meeting"',
          'Colega quer conversar → Você: "I\'m in a meeting, can we talk later?"'
        ],
        order: 44
      },
      {
        id: 'work_phrase_45',
        english: 'I\'ll join in a few minutes',
        portuguese: 'Vou entrar em alguns minutos',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Atraso para reunião',
        situations: [
          'Reunião já começou → Você: "I\'ll join in a few minutes"',
          'Mensagem para equipe → Você: "Starting another call, I\'ll join in a few minutes"'
        ],
        order: 45
      },
      {
        id: 'work_phrase_46',
        english: 'Can you help me out?',
        portuguese: 'Você pode me ajudar?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pedido direto de ajuda',
        situations: [
          'Você está com dificuldade em uma tarefa → "Can you help me out?"',
          'Precisa de uma segunda opinião → "Can you help me out with this?"'
        ],
        order: 46
      },
      {
        id: 'work_phrase_47',
        english: 'Could you send it to me?',
        portuguese: 'Você poderia me enviar?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pedido formal de arquivo',
        situations: [
          'Precisando de documento → Você: "Could you send it to me by email?"',
          'Solicitando relatório → Você: "When it\'s ready, could you send it to me?"'
        ],
        order: 47
      },
      {
        id: 'work_phrase_48',
        english: 'Do you need help?',
        portuguese: 'Você precisa de ajuda?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Oferta de ajuda',
        situations: [
          'Vendo colega com dificuldade → Você: "Do you need help with that?"',
          'Colega parece sobrecarregado → Você: "Do you need help?"'
        ],
        order: 48
      },
      {
        id: 'work_phrase_49',
        english: 'Want me to take a look?',
        portuguese: 'Quer que eu dê uma olhada?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Oferta de revisão',
        situations: [
          'Colega com problema → Você: "Want me to take a look?"',
          'Documento para revisar → Você: "Want me to take a look before you send it?"'
        ],
        order: 49
      },
      {
        id: 'work_phrase_50',
        english: 'I got this',
        portuguese: 'Eu resolvo isso',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Assumir responsabilidade',
        situations: [
          'Equipe: "Quem pode resolver este problema técnico?" → Você: "I got this"',
          'Chefe: "Preciso de alguém para apresentar ao cliente" → Você: "I got this"'
        ],
        order: 50
      },
      {
        id: 'work_phrase_51',
        english: 'Let me handle it',
        portuguese: 'Deixa comigo',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Assumir tarefa',
        situations: [
          'Problema difícil surgiu → Você: "Let me handle it"',
          'Situação delicada → Você: "Don\'t worry, let me handle it"'
        ],
        order: 51
      },
      {
        id: 'work_phrase_52',
        english: 'Don\'t worry about it',
        portuguese: 'Não se preocupe com isso',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Tranquilizar colega',
        situations: [
          'Colega se desculpa por erro → Você: "Don\'t worry about it, we\'ll fix it"',
          'Alguém preocupado → Você: "Don\'t worry about it, it\'s not a big deal"'
        ],
        order: 52
      },
      {
        id: 'work_phrase_53',
        english: 'I\'ll take care of it',
        portuguese: 'Vou cuidar disso',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Assumir responsabilidade',
        situations: [
          'Delegando responsabilidade → Você: "I\'ll take care of it"',
          'Problema precisa ser resolvido → Você: "Don\'t worry, I\'ll take care of it"'
        ],
        order: 53
      },
      {
        id: 'work_phrase_54',
        english: 'I\'m with you',
        portuguese: 'Estou contigo',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Apoiar colega',
        situations: [
          'Colega propõe ideia → Você: "I\'m with you on this"',
          'Decisão em grupo → Você: "I\'m with you, let\'s do it"'
        ],
        order: 54
      },
      {
        id: 'work_phrase_55',
        english: 'That\'s true',
        portuguese: 'É verdade',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Concordar',
        situations: [
          'Colega faz observação → Você: "That\'s true, I hadn\'t thought of that"',
          'Discussão sobre fatos → Você: "That\'s true, the data shows that"'
        ],
        order: 55
      },

      // Expressões para se destacar no trabalho (8 frases básicas)
      {
        id: 'work_phrase_56',
        english: 'I\'m on it!',
        portuguese: 'Estou nisso!',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Aceitar tarefa com energia',
        situations: [
          'Chefe: "Preciso do relatório até 5pm" → Você: "I\'m on it!"',
          'Colega: "Quem pode resolver este problema?" → Você: "I\'m on it!"'
        ],
        order: 56
      },
      {
        id: 'work_phrase_57',
        english: 'Count on me',
        portuguese: 'Pode contar comigo',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Mostrar confiabilidade',
        situations: [
          'Chefe: "Preciso de alguém responsável para este projeto" → Você: "Count on me"',
          'Cliente: "É muito importante entregar no prazo" → Você: "Count on me"'
        ],
        order: 57
      },
      {
        id: 'work_phrase_58',
        english: 'I\'ll make it happen',
        portuguese: 'Vou fazer acontecer',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Compromisso com resultado',
        situations: [
          'Cliente: "Isso parece impossível de fazer" → Você: "I\'ll make it happen"',
          'Equipe: "Não sei como vamos terminar a tempo" → Você: "I\'ll make it happen"'
        ],
        order: 58
      },
      {
        id: 'work_phrase_59',
        english: 'Let\'s do this',
        portuguese: 'Vamos fazer isso',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Motivação para começar',
        situations: [
          'Início de projeto desafiador → Você: "Alright team, let\'s do this!"',
          'Motivando a equipe → Você: "We can handle this challenge, let\'s do this!"'
        ],
        order: 59
      },
      {
        id: 'work_phrase_60',
        english: 'I\'m ready',
        portuguese: 'Estou pronto',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Mostrar preparação',
        situations: [
          'Antes de apresentação → Você: "I\'m ready to present"',
          'Novo projeto → Você: "I\'m ready for the challenge"'
        ],
        order: 60
      },
      {
        id: 'work_phrase_61',
        english: 'I\'ll give it a try',
        portuguese: 'Vou tentar',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Aceitar desafio',
        situations: [
          'Tarefa nova e difícil → Você: "I\'ve never done this before, but I\'ll give it a try"',
          'Desafio proposto → Você: "Sounds challenging, but I\'ll give it a try"'
        ],
        order: 61
      },
      {
        id: 'work_phrase_62',
        english: 'Step by step',
        portuguese: 'Passo a passo',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Abordagem metodológica',
        situations: [
          'Projeto complexo → Você: "Let\'s take it step by step"',
          'Ensinando alguém → Você: "We\'ll do this step by step"'
        ],
        order: 62
      },
      {
        id: 'work_phrase_63',
        english: 'Practice makes perfect',
        portuguese: 'A prática leva à perfeição',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Mentalidade de melhoria',
        situations: [
          'Encorajando colega → Você: "Don\'t worry, practice makes perfect"',
          'Aprendendo nova skill → Você: "I\'ll keep trying, practice makes perfect"'
        ],
        order: 63
      },

      // ===== FRASES ADICIONAIS A1/A2 ESSENCIAIS =====
      
      // Conversas matinais e check-in (10 frases)
      {
        id: 'work_phrase_64',
        english: 'How\'s everything?',
        portuguese: 'Como está tudo?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Check-in geral',
        situations: [
          'Encontrando colega depois de alguns dias → Você: "Hey! How\'s everything?"',
          'Início de conversa casual → Você: "How\'s everything going with the project?"'
        ],
        order: 64
      },
      {
        id: 'work_phrase_65',
        english: 'Did you sleep well?',
        portuguese: 'Você dormiu bem?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Cuidado pessoal',
        situations: [
          'Colega parece cansado → Você: "Did you sleep well? You look tired"',
          'Segunda-feira de manhã → Você: "Did you sleep well? Ready for the week?"'
        ],
        order: 65
      },
      {
        id: 'work_phrase_66',
        english: 'What\'s on the schedule today?',
        portuguese: 'O que tem na agenda hoje?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Planejamento do dia',
        situations: [
          'Chegando no trabalho → Você: "What\'s on the schedule today?"',
          'Conversando com assistant → Você: "What\'s on the schedule today? Any meetings?"'
        ],
        order: 66
      },
      {
        id: 'work_phrase_67',
        english: 'Any news?',
        portuguese: 'Alguma novidade?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Buscar atualizações',
        situations: [
          'Chegando após folga → Você: "Any news while I was out?"',
          'Início do dia → Você: "Any news from the client?"'
        ],
        order: 67
      },
      {
        id: 'work_phrase_68',
        english: 'Busy day ahead!',
        portuguese: 'Dia corrido pela frente!',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Antecipação do dia',
        situations: [
          'Vendo agenda cheia → Você: "Busy day ahead! Better get started"',
          'Comentário matinal → Você: "Busy day ahead, but we got this!"'
        ],
        order: 68
      },

      // Gerenciamento de tarefas e prazos (15 frases)
      {
        id: 'work_phrase_69',
        english: 'I need more time.',
        portuguese: 'Preciso de mais tempo.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pedido de extensão',
        situations: [
          'Deadline apertado → Você: "I need more time to finish this properly"',
          'Tarefa complexa → Você: "This is more complex than expected, I need more time"'
        ],
        order: 69
      },
      {
        id: 'work_phrase_70',
        english: 'I\'ll send it soon.',
        portuguese: 'Vou enviar em breve.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Promessa de entrega',
        situations: [
          'Colega pergunta sobre arquivo → Você: "I\'ll send it soon, just reviewing"',
          'Cliente aguardando → Você: "I\'ll send it soon, within the hour"'
        ],
        order: 70
      },
      {
        id: 'work_phrase_71',
        english: 'Let me just finish this.',
        portuguese: 'Deixe-me só terminar isso.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pedindo tempo para finalizar',
        situations: [
          'Interrupção durante tarefa → Você: "Let me just finish this, then I\'ll help you"',
          'Colega quer conversar → Você: "Let me just finish this email"'
        ],
        order: 71
      },
      {
        id: 'work_phrase_72',
        english: 'I have a lot to do today.',
        portuguese: 'Tenho muito para fazer hoje.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Expressar alta carga de trabalho',
        situations: [
          'Explicando correria → Você: "I have a lot to do today, can we talk later?"',
          'Organizando prioridades → Você: "I have a lot to do today, what\'s most urgent?"'
        ],
        order: 72
      },
      {
        id: 'work_phrase_73',
        english: 'I\'ll start after lunch.',
        portuguese: 'Vou começar depois do almoço.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Planejamento de horário',
        situations: [
          'Nova tarefa recebida → Você: "I\'ll start after lunch, finishing this first"',
          'Organizando agenda → Você: "I\'ll start after lunch when I have more time"'
        ],
        order: 73
      },
      {
        id: 'work_phrase_74',
        english: 'I\'m multitasking today.',
        portuguese: 'Estou fazendo várias coisas hoje.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Trabalho simultâneo',
        situations: [
          'Dia corrido → Você: "I\'m multitasking today, bear with me"',
          'Várias demandas → Você: "I\'m multitasking today between projects"'
        ],
        order: 74
      },
      {
        id: 'work_phrase_75',
        english: 'It\'s in progress.',
        portuguese: 'Está em andamento.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Status de tarefa',
        situations: [
          'Pergunta sobre projeto → Você: "It\'s in progress, should be done tomorrow"',
          'Update de status → Você: "It\'s in progress, about 50% complete"'
        ],
        order: 75
      },
      {
        id: 'work_phrase_76',
        english: 'I ran into an issue.',
        portuguese: 'Encontrei um problema.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Reportar problema',
        situations: [
          'Bloqueio técnico → Você: "I ran into an issue with the software"',
          'Complicação inesperada → Você: "I ran into an issue, need some help"'
        ],
        order: 76
      },

      // Comunicação digital e envios (10 frases)
      {
        id: 'work_phrase_77',
        english: 'I sent it to you.',
        portuguese: 'Enviei para você.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Confirmação de envio',
        situations: [
          'Confirmando entrega → Você: "I sent it to you this morning, check your email"',
          'Esclarecendo envio → Você: "I sent it to you yesterday, did you receive it?"'
        ],
        order: 77
      },
      {
        id: 'work_phrase_78',
        english: 'Did you get it?',
        portuguese: 'Você recebeu?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Confirmação de recebimento',
        situations: [
          'Após enviar email → Você: "I sent the report, did you get it?"',
          'Seguimento de entrega → Você: "Did you get it? Let me know if you need anything else"'
        ],
        order: 78
      },
      {
        id: 'work_phrase_79',
        english: 'I didn\'t receive it yet.',
        portuguese: 'Ainda não recebi.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Indicar não recebimento',
        situations: [
          'Aguardando arquivo → Você: "I didn\'t receive it yet, can you resend?"',
          'Email esperado → Você: "I didn\'t receive it yet, maybe check the email address?"'
        ],
        order: 79
      },
      {
        id: 'work_phrase_80',
        english: 'It\'s in the attachment.',
        portuguese: 'Está no anexo.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Localizar arquivo',
        situations: [
          'Pergunta sobre documento → Você: "It\'s in the attachment, check the PDF"',
          'Enviando arquivo → Você: "The data you need is in the attachment"'
        ],
        order: 80
      },
      {
        id: 'work_phrase_81',
        english: 'Let me check.',
        portuguese: 'Deixe-me verificar.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Verificar informação',
        situations: [
          'Pergunta sobre dados → Você: "Let me check the latest numbers"',
          'Dúvida sobre status → Você: "Let me check with the team"'
        ],
        order: 81
      },
      {
        id: 'work_phrase_82',
        english: 'Can you repeat that?',
        portuguese: 'Pode repetir isso?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pedido de repetição',
        situations: [
          'Não entendeu bem → Você: "Sorry, can you repeat that?"',
          'Ruído na ligação → Você: "Can you repeat that? I couldn\'t hear clearly"'
        ],
        order: 82
      },
      {
        id: 'work_phrase_83',
        english: 'Sorry, I didn\'t get that.',
        portuguese: 'Desculpe, não entendi.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Não compreensão',
        situations: [
          'Explicação rápida → Você: "Sorry, I didn\'t get that. Can you explain again?"',
          'Instruções complexas → Você: "Sorry, I didn\'t get that last part"'
        ],
        order: 83
      },
      {
        id: 'work_phrase_84',
        english: 'I understand.',
        portuguese: 'Eu entendo.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Confirmar compreensão',
        situations: [
          'Após explicação → Você: "I understand, I\'ll take care of it"',
          'Instruções recebidas → Você: "I understand the requirements"'
        ],
        order: 84
      },

      // Reuniões e agenda (8 frases)
      {
        id: 'work_phrase_85',
        english: 'What time is the meeting?',
        portuguese: 'Que horas é a reunião?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Confirmar horário',
        situations: [
          'Agenda confusa → Você: "What time is the meeting with the client?"',
          'Planejamento do dia → Você: "What time is the meeting? I need to prepare"'
        ],
        order: 85
      },
      {
        id: 'work_phrase_86',
        english: 'I\'m running late.',
        portuguese: 'Estou atrasado.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Avisar sobre atraso',
        situations: [
          'Trânsito complicado → Você: "I\'m running late, start without me"',
          'Tarefa demorou → Você: "I\'m running late for the meeting, 5 more minutes"'
        ],
        order: 86
      },
      {
        id: 'work_phrase_87',
        english: 'I\'m joining now.',
        portuguese: 'Estou entrando agora.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Entrada em reunião',
        situations: [
          'Ligação online → Você: "I\'m joining now, sorry for the delay"',
          'Reunião começou → Você: "I\'m joining now, what did I miss?"'
        ],
        order: 87
      },
      {
        id: 'work_phrase_88',
        english: 'Great meeting!',
        portuguese: 'Ótima reunião!',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Feedback positivo',
        situations: [
          'Final de reunião produtiva → Você: "Great meeting! Let\'s follow up tomorrow"',
          'Boa discussão → Você: "Great meeting, thanks everyone"'
        ],
        order: 88
      },

      // Expressões de concordância e feedback (10 frases)
      {
        id: 'work_phrase_89',
        english: 'I agree.',
        portuguese: 'Concordo.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Expressão de concordância',
        situations: [
          'Proposta boa → Você: "I agree, that\'s the best approach"',
          'Discussão em grupo → Você: "I agree with Sarah\'s suggestion"'
        ],
        order: 89
      },
      {
        id: 'work_phrase_90',
        english: 'Let me think.',
        portuguese: 'Deixe-me pensar.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pedir tempo para refletir',
        situations: [
          'Pergunta complexa → Você: "Let me think about that for a moment"',
          'Decisão importante → Você: "Let me think and get back to you"'
        ],
        order: 90
      },
      {
        id: 'work_phrase_91',
        english: 'That\'s fine.',
        portuguese: 'Está bem.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Aceitação tranquila',
        situations: [
          'Mudança de planos → Você: "That\'s fine, we can adapt"',
          'Proposta alternativa → Você: "That\'s fine with me"'
        ],
        order: 91
      },
      {
        id: 'work_phrase_92',
        english: 'Not really.',
        portuguese: 'Na verdade não.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Discordância educada',
        situations: [
          'Pergunta sobre preferência → Você: "Do you like this approach?" "Not really"',
          'Opinião divergente → Você: "Is this working?" "Not really, we need changes"'
        ],
        order: 92
      },
      {
        id: 'work_phrase_93',
        english: 'I hope so.',
        portuguese: 'Espero que sim.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Expressar esperança',
        situations: [
          'Expectativa positiva → Você: "Will the project finish on time?" "I hope so"',
          'Desejo sobre resultado → Você: "Think the client will approve?" "I hope so"'
        ],
        order: 93
      },
      {
        id: 'work_phrase_94',
        english: 'Let\'s see.',
        portuguese: 'Vamos ver.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Aguardar para decidir',
        situations: [
          'Incerteza sobre resultado → Você: "Will this work?" "Let\'s see"',
          'Aguardar desenvolvimento → Você: "How will the client react?" "Let\'s see"'
        ],
        order: 94
      },
      {
        id: 'work_phrase_95',
        english: 'Just a moment.',
        portuguese: 'Só um momento.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pedir pausa breve',
        situations: [
          'Precisa verificar algo → Você: "Just a moment, let me check this"',
          'Telefone tocando → Você: "Just a moment, I need to take this call"'
        ],
        order: 95
      },
      {
        id: 'work_phrase_96',
        english: 'That\'s a great idea.',
        portuguese: 'Essa é uma ótima ideia.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Elogio à sugestão',
        situations: [
          'Colega sugere melhoria → Você: "That\'s a great idea! Let\'s try it"',
          'Proposta criativa → Você: "That\'s a great idea, how do we implement it?"'
        ],
        order: 96
      },

      // Finalizando o dia de trabalho (8 frases)
      {
        id: 'work_phrase_97',
        english: 'I\'m heading out.',
        portuguese: 'Estou saindo.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Anunciar saída',
        situations: [
          'Final do expediente → Você: "I\'m heading out, see you tomorrow"',
          'Saindo para compromisso → Você: "I\'m heading out for the meeting"'
        ],
        order: 97
      },
      {
        id: 'work_phrase_98',
        english: 'Take care!',
        portuguese: 'Se cuide!',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Despedida carinhosa',
        situations: [
          'Colega doente → Você: "Take care! Get well soon"',
          'Final de semana → Você: "Take care! Enjoy your weekend"'
        ],
        order: 98
      },
      {
        id: 'work_phrase_99',
        english: 'Good job today!',
        portuguese: 'Bom trabalho hoje!',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Reconhecimento do esforço',
        situations: [
          'Final de projeto → Você: "Good job today! We made great progress"',
          'Dia produtivo → Você: "Good job today, everyone!"'
        ],
        order: 99
      },
      {
        id: 'work_phrase_100',
        english: 'Let\'s finish this tomorrow.',
        portuguese: 'Vamos terminar isso amanhã.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Adiar conclusão',
        situations: [
          'Final do expediente → Você: "It\'s late, let\'s finish this tomorrow"',
          'Tarefa complexa → Você: "We\'re tired, let\'s finish this tomorrow"'
        ],
        order: 100
      },
      {
        id: 'work_phrase_101',
        english: 'It\'s time to go.',
        portuguese: 'É hora de ir.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Indicar fim do horário',
        situations: [
          'Horário de saída → Você: "It\'s 6pm, it\'s time to go"',
          'Encerrando atividades → Você: "It\'s time to go, let\'s continue tomorrow"'
        ],
        order: 101
      },
      {
        id: 'work_phrase_102',
        english: 'Have a great evening!',
        portuguese: 'Tenha uma ótima noite!',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Despedida noturna',
        situations: [
          'Saindo à noite → Você: "Have a great evening! See you tomorrow"',
          'Final de expediente → Você: "Have a great evening with your family"'
        ],
        order: 102
      },
      {
        id: 'work_phrase_103',
        english: 'I\'m logging off now.',
        portuguese: 'Estou desconectando agora.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Sair do sistema',
        situations: [
          'Trabalho remoto → Você: "I\'m logging off now, talk tomorrow"',
          'Final do home office → Você: "I\'m logging off now, good night everyone"'
        ],
        order: 103
      },
      {
        id: 'work_phrase_104',
        english: 'Don\'t forget to save.',
        portuguese: 'Não esqueça de salvar.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Lembrete importante',
        situations: [
          'Colega trabalhando → Você: "Don\'t forget to save your work"',
          'Final do dia → Você: "Don\'t forget to save before you leave"'
        ],
        order: 104
      },

      // Atendimento ao cliente básico (10 frases)
      {
        id: 'work_phrase_105',
        english: 'How can I help you today?',
        portuguese: 'Como posso ajudá-lo hoje?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Abertura de atendimento',
        situations: [
          'Cliente chegou → Você: "Good morning! How can I help you today?"',
          'Ligação de suporte → Você: "Thank you for calling, how can I help you today?"'
        ],
        order: 105
      },
      {
        id: 'work_phrase_106',
        english: 'Thank you for your patience.',
        portuguese: 'Obrigado pela sua paciência.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Agradecer espera',
        situations: [
          'Após resolver problema → Você: "Thank you for your patience while I fixed this"',
          'Demora no atendimento → Você: "Thank you for your patience, how can I help?"'
        ],
        order: 106
      },
      {
        id: 'work_phrase_107',
        english: 'I\'ll check that for you.',
        portuguese: 'Vou verificar isso para você.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Oferecer verificação',
        situations: [
          'Dúvida do cliente → Você: "I\'ll check that for you right away"',
          'Informação solicitada → Você: "I\'ll check that for you in our system"'
        ],
        order: 107
      },
      {
        id: 'work_phrase_108',
        english: 'Let me confirm the details.',
        portuguese: 'Deixe-me confirmar os detalhes.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Confirmar informações',
        situations: [
          'Pedido do cliente → Você: "Let me confirm the details before we proceed"',
          'Dados importantes → Você: "Let me confirm the details with you"'
        ],
        order: 108
      },
      {
        id: 'work_phrase_109',
        english: 'I understand your concern.',
        portuguese: 'Entendo sua preocupação.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Demonstrar empatia',
        situations: [
          'Cliente preocupado → Você: "I understand your concern, let me help"',
          'Problema relatado → Você: "I understand your concern about the delivery"'
        ],
        order: 109
      },
      {
        id: 'work_phrase_110',
        english: 'One moment, please.',
        portuguese: 'Um momento, por favor.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Pedir pausa formal',
        situations: [
          'Verificando sistema → Você: "One moment, please, I\'m checking your account"',
          'Consultando informação → Você: "One moment, please, let me find that"'
        ],
        order: 110
      },
      {
        id: 'work_phrase_111',
        english: 'I\'ll get back to you shortly.',
        portuguese: 'Retorno para você em breve.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Promessa de retorno',
        situations: [
          'Precisa consultar → Você: "I\'ll get back to you shortly with an answer"',
          'Investigação necessária → Você: "I\'ll get back to you shortly after I check this"'
        ],
        order: 111
      },
      {
        id: 'work_phrase_112',
        english: 'We\'ll take care of it.',
        portuguese: 'Vamos cuidar disso.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Assumir responsabilidade',
        situations: [
          'Problema do cliente → Você: "Don\'t worry, we\'ll take care of it"',
          'Solicitação especial → Você: "We\'ll take care of it right away"'
        ],
        order: 112
      },

      // Problemas técnicos básicos (8 frases)
      {
        id: 'work_phrase_113',
        english: 'It\'s not working.',
        portuguese: 'Não está funcionando.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Reportar problema',
        situations: [
          'Sistema com falha → Você: "The printer is not working"',
          'Software com erro → Você: "My computer is not working properly"'
        ],
        order: 113
      },
      {
        id: 'work_phrase_114',
        english: 'Try restarting it.',
        portuguese: 'Tente reiniciar.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Sugestão de solução',
        situations: [
          'Problema técnico → Você: "Try restarting it, that usually helps"',
          'Sistema lento → Você: "Try restarting it to clear the memory"'
        ],
        order: 114
      },
      {
        id: 'work_phrase_115',
        english: 'I\'ll fix it.',
        portuguese: 'Vou consertar.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Promessa de reparo',
        situations: [
          'Erro identificado → Você: "I found the problem, I\'ll fix it"',
          'Assumindo tarefa → Você: "Don\'t worry, I\'ll fix it"'
        ],
        order: 115
      },
      {
        id: 'work_phrase_116',
        english: 'There\'s an error.',
        portuguese: 'Há um erro.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Identificar problema',
        situations: [
          'Verificando sistema → Você: "There\'s an error in the code"',
          'Analisando relatório → Você: "There\'s an error in these numbers"'
        ],
        order: 116
      },
      {
        id: 'work_phrase_117',
        english: 'Something went wrong.',
        portuguese: 'Algo deu errado.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Problema geral',
        situations: [
          'Processo falhou → Você: "Something went wrong with the upload"',
          'Resultado inesperado → Você: "Something went wrong, let me check"'
        ],
        order: 117
      },
      {
        id: 'work_phrase_118',
        english: 'The system is down.',
        portuguese: 'O sistema está fora do ar.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Sistema inoperante',
        situations: [
          'Falha total → Você: "The system is down, we can\'t access anything"',
          'Manutenção → Você: "The system is down for updates"'
        ],
        order: 118
      },
      {
        id: 'work_phrase_119',
        english: 'It\'s back online.',
        portuguese: 'Está online novamente.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Sistema restaurado',
        situations: [
          'Após reparo → Você: "Good news! It\'s back online"',
          'Sistema funcionando → Você: "It\'s back online, you can try again"'
        ],
        order: 119
      },
      {
        id: 'work_phrase_120',
        english: 'Everything\'s working now.',
        portuguese: 'Tudo está funcionando agora.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Confirmação de funcionamento',
        situations: [
          'Após correção → Você: "Everything\'s working now, you can proceed"',
          'Teste concluído → Você: "Everything\'s working now, problem solved"'
        ],
        order: 120
      },

      // Comunicação digital e online (8 frases)
      {
        id: 'work_phrase_121',
        english: 'You\'re on mute.',
        portuguese: 'Você está no mudo.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Problema de áudio',
        situations: [
          'Reunião online → Você: "Hi John, you\'re on mute, we can\'t hear you"',
          'Chamada de vídeo → Você: "You\'re on mute, can you unmute please?"'
        ],
        order: 121
      },
      {
        id: 'work_phrase_122',
        english: 'Can you hear me?',
        portuguese: 'Você consegue me ouvir?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Verificar áudio',
        situations: [
          'Início de ligação → Você: "Can you hear me? Is the audio working?"',
          'Problema técnico → Você: "Can you hear me clearly now?"'
        ],
        order: 122
      },
      {
        id: 'work_phrase_123',
        english: 'I can\'t see your screen.',
        portuguese: 'Não consigo ver sua tela.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Problema de compartilhamento',
        situations: [
          'Apresentação online → Você: "I can\'t see your screen, are you sharing?"',
          'Demonstração → Você: "I can\'t see your screen clearly"'
        ],
        order: 123
      },
      {
        id: 'work_phrase_124',
        english: 'Can you share your screen?',
        portuguese: 'Você pode compartilhar sua tela?',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Solicitar compartilhamento',
        situations: [
          'Precisando ver documento → Você: "Can you share your screen so we can see?"',
          'Apresentação → Você: "Can you share your screen with the presentation?"'
        ],
        order: 124
      },
      {
        id: 'work_phrase_125',
        english: 'The connection is bad.',
        portuguese: 'A conexão está ruim.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Problema de conexão',
        situations: [
          'Chamada instável → Você: "The connection is bad, you\'re cutting out"',
          'Vídeo travando → Você: "The connection is bad, can we try again?"'
        ],
        order: 125
      },
      {
        id: 'work_phrase_126',
        english: 'Let\'s use the chat.',
        portuguese: 'Vamos usar o chat.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Alternativa de comunicação',
        situations: [
          'Áudio não funciona → Você: "Let\'s use the chat if audio isn\'t working"',
          'Informação adicional → Você: "Let\'s use the chat for links and details"'
        ],
        order: 126
      },

      // Passado e futuro simples no trabalho (10 frases)
      {
        id: 'work_phrase_127',
        english: 'I finished the report yesterday.',
        portuguese: 'Terminei o relatório ontem.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Passado recente',
        situations: [
          'Update de status → Você: "I finished the report yesterday, it\'s ready"',
          'Prestação de contas → Você: "I finished the report yesterday as requested"'
        ],
        order: 127
      },
      {
        id: 'work_phrase_128',
        english: 'I worked late last night.',
        portuguese: 'Trabalhei até tarde ontem à noite.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Explicar esforço extra',
        situations: [
          'Justificar progresso → Você: "I worked late last night to finish this"',
          'Explicar cansaço → Você: "I worked late last night, sorry if I\'m tired"'
        ],
        order: 128
      },
      {
        id: 'work_phrase_129',
        english: 'I sent the email this morning.',
        portuguese: 'Enviei o email esta manhã.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Confirmação de envio',
        situations: [
          'Confirmando ação → Você: "I sent the email this morning, check your inbox"',
          'Update ao chefe → Você: "I sent the email this morning as you requested"'
        ],
        order: 129
      },
      {
        id: 'work_phrase_130',
        english: 'I had a meeting earlier.',
        portuguese: 'Tive uma reunião mais cedo.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Explicar atividade passada',
        situations: [
          'Chegando atrasado → Você: "Sorry I\'m late, I had a meeting earlier"',
          'Compartilhando informação → Você: "I had a meeting earlier with the client"'
        ],
        order: 130
      },
      {
        id: 'work_phrase_131',
        english: 'I\'ll send it later.',
        portuguese: 'Vou enviar mais tarde.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Promessa futura',
        situations: [
          'Não está pronto → Você: "I\'ll send it later when it\'s complete"',
          'Planejando entrega → Você: "I\'ll send it later this afternoon"'
        ],
        order: 131
      },
      {
        id: 'work_phrase_132',
        english: 'I\'ll be at the office tomorrow.',
        portuguese: 'Estarei no escritório amanhã.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Informar presença futura',
        situations: [
          'Confirmando presença → Você: "I\'ll be at the office tomorrow for the meeting"',
          'Home office → Você: "I\'ll be at the office tomorrow if you need me"'
        ],
        order: 132
      },
      {
        id: 'work_phrase_133',
        english: 'I\'ll talk to him soon.',
        portuguese: 'Vou falar com ele em breve.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Promessa de contato',
        situations: [
          'Delegação → Você: "I\'ll talk to him soon about the project"',
          'Resolução pendente → Você: "I\'ll talk to him soon to clarify this"'
        ],
        order: 133
      },
      {
        id: 'work_phrase_134',
        english: 'I\'m going to check that now.',
        portuguese: 'Vou verificar isso agora.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Ação imediata futura',
        situations: [
          'Dúvida levantada → Você: "Good point, I\'m going to check that now"',
          'Pedido de verificação → Você: "I\'m going to check that now and confirm"'
        ],
        order: 134
      },
      {
        id: 'work_phrase_135',
        english: 'I\'ll finish it before lunch.',
        portuguese: 'Vou terminar antes do almoço.',
        difficulty: 'beginner' as const,
        requiredLevel: 'beginner' as const,
        context: 'Prazo específico',
        situations: [
          'Compromisso de entrega → Você: "I\'ll finish it before lunch as promised"',
          'Planejamento → Você: "I\'ll finish it before lunch so we can review together"'
        ],
        order: 135
      },

      // ===== NÍVEL INTERMEDIÁRIO: COMUNICAÇÃO MAIS COMPLEXA =====
      
      // Reuniões e agendamentos (15 frases)
      {
        id: 'work_phrase_56',
        english: 'Let\'s schedule a call',
        portuguese: 'Vamos agendar uma ligação',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Agendamento de reunião',
        order: 56
      },
      {
        id: 'work_phrase_57',
        english: 'Does 2pm work for you?',
        portuguese: '2 da tarde funciona para você?',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Confirmar horário',
        order: 57
      },
      {
        id: 'work_phrase_58',
        english: 'I\'ll send a calendar invite',
        portuguese: 'Vou enviar um convite de calendário',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Agendar reunião',
        order: 58
      },
      {
        id: 'work_phrase_59',
        english: 'Can we reschedule?',
        portuguese: 'Podemos reagendar?',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Reagendamento',
        order: 59
      },
      {
        id: 'work_phrase_60',
        english: 'Let\'s circle back on that',
        portuguese: 'Vamos retomar isso depois',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Adiar discussão',
        order: 60
      },
      {
        id: 'work_phrase_61',
        english: 'Let\'s take it offline',
        portuguese: 'Vamos conversar fora da reunião',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Conversa privada',
        order: 61
      },
      {
        id: 'work_phrase_62',
        english: 'Any updates on that?',
        portuguese: 'Alguma atualização sobre isso?',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Pedir status',
        order: 62
      },
      {
        id: 'work_phrase_63',
        english: 'That\'s a good point',
        portuguese: 'Esse é um bom ponto',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Reconhecer ideia',
        order: 63
      },
      {
        id: 'work_phrase_64',
        english: 'I\'m not sure, to be honest',
        portuguese: 'Não tenho certeza, para ser honesto',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Admitir incerteza',
        order: 64
      },
      {
        id: 'work_phrase_65',
        english: 'Let me check on that',
        portuguese: 'Deixe-me verificar isso',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Prometer verificação',
        order: 65
      },

      // Entrega de tarefas (10 frases)
      {
        id: 'work_phrase_66',
        english: 'It\'s done!',
        portuguese: 'Está pronto!',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Tarefa concluída',
        order: 66
      },
      {
        id: 'work_phrase_67',
        english: 'All set!',
        portuguese: 'Tudo certo!',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Conclusão de tarefa',
        order: 67
      },
      {
        id: 'work_phrase_68',
        english: 'I\'ve finished the report',
        portuguese: 'Terminei o relatório',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Entrega específica',
        order: 68
      },
      {
        id: 'work_phrase_69',
        english: 'It\'s ready to go',
        portuguese: 'Está pronto para ir',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Finalização',
        order: 69
      },
      {
        id: 'work_phrase_70',
        english: 'Let me double-check',
        portuguese: 'Deixe-me verificar novamente',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Revisão final',
        order: 70
      },
      {
        id: 'work_phrase_71',
        english: 'I\'ll fix it',
        portuguese: 'Vou corrigir',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Correção necessária',
        order: 71
      },
      {
        id: 'work_phrase_72',
        english: 'It\'s not working yet',
        portuguese: 'Ainda não está funcionando',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Problema técnico',
        order: 72
      },
      {
        id: 'work_phrase_73',
        english: 'Try again, please',
        portuguese: 'Tente novamente, por favor',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Pedido de nova tentativa',
        order: 73
      },
      {
        id: 'work_phrase_74',
        english: 'Good job!',
        portuguese: 'Bom trabalho!',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Elogio',
        order: 74
      },
      {
        id: 'work_phrase_75',
        english: 'Nice work!',
        portuguese: 'Ótimo trabalho!',
        difficulty: 'intermediate' as const,
        requiredLevel: 'intermediate' as const,
        context: 'Reconhecimento',
        order: 75
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