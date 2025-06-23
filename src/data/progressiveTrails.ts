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