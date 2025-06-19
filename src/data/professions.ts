export interface ProfessionPhrase {
  id: string
  english: string
  portuguese: string
  situation: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface Profession {
  id: string
  title: string
  icon: string
  description: string
  color: string
  phrases: ProfessionPhrase[]
}

export const PROFESSIONS: Profession[] = [
  {
    id: 'doctor',
    title: 'Médico/Médica',
    icon: '👩‍⚕️',
    description: 'Frases essenciais para consultas e atendimento médico',
    color: 'from-red-600 to-pink-600',
    phrases: [
      {
        id: 'doc_1',
        english: "What brings you in today?",
        portuguese: "O que te trouxe aqui hoje?",
        situation: "Consulta inicial",
        difficulty: 'beginner'
      },
      {
        id: 'doc_2',
        english: "How long have you been experiencing these symptoms?",
        portuguese: "Há quanto tempo você tem esses sintomas?",
        situation: "Investigação médica",
        difficulty: 'intermediate'
      },
      {
        id: 'doc_3',
        english: "I need to examine you. Please lie down on the table.",
        portuguese: "Preciso examiná-lo. Por favor, deite-se na mesa.",
        situation: "Exame físico",
        difficulty: 'intermediate'
      },
      {
        id: 'doc_4',
        english: "Based on your symptoms, I recommend some tests.",
        portuguese: "Com base nos seus sintomas, recomendo alguns exames.",
        situation: "Diagnóstico",
        difficulty: 'advanced'
      },
      {
        id: 'doc_5',
        english: "Take this medication twice a day after meals.",
        portuguese: "Tome este medicamento duas vezes ao dia após as refeições.",
        situation: "Prescrição médica",
        difficulty: 'intermediate'
      }
    ]
  },
  {
    id: 'real-estate',
    title: 'Corretor de Imóveis',
    icon: '🏠',
    description: 'Vocabulário para vendas e negociação imobiliária',
    color: 'from-blue-600 to-cyan-600',
    phrases: [
      {
        id: 're_1',
        english: "Are you looking to buy or rent?",
        portuguese: "Você está procurando comprar ou alugar?",
        situation: "Primeiro contato",
        difficulty: 'beginner'
      },
      {
        id: 're_2',
        english: "This property has excellent natural lighting.",
        portuguese: "Este imóvel tem excelente iluminação natural.",
        situation: "Apresentação do imóvel",
        difficulty: 'intermediate'
      },
      {
        id: 're_3',
        english: "The asking price is negotiable depending on your offer.",
        portuguese: "O preço pedido é negociável dependendo da sua oferta.",
        situation: "Negociação",
        difficulty: 'advanced'
      },
      {
        id: 're_4',
        english: "The neighborhood has great schools and shopping centers.",
        portuguese: "O bairro tem ótimas escolas e centros comerciais.",
        situation: "Vantagens da localização",
        difficulty: 'intermediate'
      },
      {
        id: 're_5',
        english: "Would you like to schedule a viewing?",
        portuguese: "Gostaria de agendar uma visita?",
        situation: "Agendamento",
        difficulty: 'beginner'
      }
    ]
  },
  {
    id: 'it-professional',
    title: 'Profissional de TI',
    icon: '💻',
    description: 'Termos técnicos e situações do mundo da tecnologia',
    color: 'from-green-600 to-emerald-600',
    phrases: [
      {
        id: 'it_1',
        english: "Have you tried turning it off and on again?",
        portuguese: "Você tentou desligar e ligar novamente?",
        situation: "Suporte técnico básico",
        difficulty: 'beginner'
      },
      {
        id: 'it_2',
        english: "We need to deploy this update to the production server.",
        portuguese: "Precisamos fazer o deploy desta atualização no servidor de produção.",
        situation: "Desenvolvimento",
        difficulty: 'advanced'
      },
      {
        id: 'it_3',
        english: "The system is experiencing high traffic right now.",
        portuguese: "O sistema está enfrentando muito tráfego agora.",
        situation: "Monitoramento",
        difficulty: 'intermediate'
      },
      {
        id: 'it_4',
        english: "Let's schedule a code review for tomorrow morning.",
        portuguese: "Vamos agendar uma revisão de código para amanhã de manhã.",
        situation: "Gestão de projeto",
        difficulty: 'intermediate'
      },
      {
        id: 'it_5',
        english: "I'll create a backup before making any changes.",
        portuguese: "Vou criar um backup antes de fazer qualquer alteração.",
        situation: "Melhores práticas",
        difficulty: 'advanced'
      }
    ]
  },
  {
    id: 'nurse',
    title: 'Enfermeiro/Enfermeira',
    icon: '👩‍⚕️',
    description: 'Cuidados de enfermagem e atendimento ao paciente',
    color: 'from-purple-600 to-indigo-600',
    phrases: [
      {
        id: 'nurse_1',
        english: "How are you feeling today?",
        portuguese: "Como você está se sentindo hoje?",
        situation: "Avaliação do paciente",
        difficulty: 'beginner'
      },
      {
        id: 'nurse_2',
        english: "I need to check your vital signs now.",
        portuguese: "Preciso verificar seus sinais vitais agora.",
        situation: "Procedimentos de rotina",
        difficulty: 'intermediate'
      },
      {
        id: 'nurse_3',
        english: "Please let me know if you experience any pain.",
        portuguese: "Por favor, me avise se sentir alguma dor.",
        situation: "Monitoramento",
        difficulty: 'intermediate'
      },
      {
        id: 'nurse_4',
        english: "The doctor will see you shortly.",
        portuguese: "O médico te atenderá em breve.",
        situation: "Coordenação",
        difficulty: 'beginner'
      },
      {
        id: 'nurse_5',
        english: "Make sure to follow the medication schedule.",
        portuguese: "Certifique-se de seguir o horário da medicação.",
        situation: "Orientação ao paciente",
        difficulty: 'advanced'
      }
    ]
  },
  {
    id: 'psychologist',
    title: 'Psicólogo/Psicóloga',
    icon: '🧠',
    description: 'Comunicação terapêutica e apoio emocional',
    color: 'from-orange-600 to-red-600',
    phrases: [
      {
        id: 'psy_1',
        english: "How has your week been?",
        portuguese: "Como foi sua semana?",
        situation: "Início da sessão",
        difficulty: 'beginner'
      },
      {
        id: 'psy_2',
        english: "Can you tell me more about how that made you feel?",
        portuguese: "Pode me contar mais sobre como isso te fez sentir?",
        situation: "Exploração emocional",
        difficulty: 'intermediate'
      },
      {
        id: 'psy_3',
        english: "What coping strategies have you tried before?",
        portuguese: "Que estratégias de enfrentamento você já tentou antes?",
        situation: "Avaliação de recursos",
        difficulty: 'advanced'
      },
      {
        id: 'psy_4',
        english: "It's normal to feel this way given your situation.",
        portuguese: "É normal se sentir assim dada a sua situação.",
        situation: "Validação emocional",
        difficulty: 'intermediate'
      },
      {
        id: 'psy_5',
        english: "Let's work together to find some solutions.",
        portuguese: "Vamos trabalhar juntos para encontrar algumas soluções.",
        situation: "Colaboração terapêutica",
        difficulty: 'advanced'
      }
    ]
  },
  {
    id: 'personal-trainer',
    title: 'Personal Trainer',
    icon: '💪',
    description: 'Fitness, exercícios e motivação física',
    color: 'from-yellow-600 to-orange-600',
    phrases: [
      {
        id: 'pt_1',
        english: "What are your fitness goals?",
        portuguese: "Quais são seus objetivos de fitness?",
        situation: "Avaliação inicial",
        difficulty: 'beginner'
      },
      {
        id: 'pt_2',
        english: "Let's warm up with some light cardio.",
        portuguese: "Vamos aquecer com um pouco de cardio leve.",
        situation: "Início do treino",
        difficulty: 'intermediate'
      },
      {
        id: 'pt_3',
        english: "Focus on your form, not just the weight.",
        portuguese: "Foque na sua forma, não apenas no peso.",
        situation: "Correção técnica",
        difficulty: 'advanced'
      },
      {
        id: 'pt_4',
        english: "Great job! You're getting stronger every week.",
        portuguese: "Ótimo trabalho! Você está ficando mais forte a cada semana.",
        situation: "Motivação",
        difficulty: 'intermediate'
      },
      {
        id: 'pt_5',
        english: "Remember to stay hydrated throughout the workout.",
        portuguese: "Lembre-se de se manter hidratado durante o treino.",
        situation: "Orientação de saúde",
        difficulty: 'intermediate'
      }
    ]
  },
  {
    id: 'teacher',
    title: 'Professor/Professora',
    icon: '👩‍🏫',
    description: 'Ensino, educação e gestão de sala de aula',
    color: 'from-indigo-600 to-purple-600',
    phrases: [
      {
        id: 'teacher_1',
        english: "Good morning, class! Please take your seats.",
        portuguese: "Bom dia, turma! Por favor, sentem-se.",
        situation: "Início da aula",
        difficulty: 'beginner'
      },
      {
        id: 'teacher_2',
        english: "Does anyone have questions about yesterday's lesson?",
        portuguese: "Alguém tem dúvidas sobre a aula de ontem?",
        situation: "Revisão",
        difficulty: 'intermediate'
      },
      {
        id: 'teacher_3',
        english: "Let's work in pairs for this activity.",
        portuguese: "Vamos trabalhar em duplas para esta atividade.",
        situation: "Organização da atividade",
        difficulty: 'intermediate'
      },
      {
        id: 'teacher_4',
        english: "Your assignment is due next Friday.",
        portuguese: "Sua tarefa deve ser entregue na próxima sexta-feira.",
        situation: "Instruções",
        difficulty: 'advanced'
      },
      {
        id: 'teacher_5',
        english: "Excellent analysis! You really understood the concept.",
        portuguese: "Excelente análise! Você realmente entendeu o conceito.",
        situation: "Feedback positivo",
        difficulty: 'advanced'
      }
    ]
  },
  {
    id: 'chef',
    title: 'Chef/Cozinheiro',
    icon: '👨‍🍳',
    description: 'Culinária, ingredientes e técnicas gastronômicas',
    color: 'from-rose-600 to-pink-600',
    phrases: [
      {
        id: 'chef_1',
        english: "Today's special is grilled salmon with herbs.",
        portuguese: "O prato especial de hoje é salmão grelhado com ervas.",
        situation: "Apresentação do menu",
        difficulty: 'intermediate'
      },
      {
        id: 'chef_2',
        english: "The vegetables need to be diced, not chopped.",
        portuguese: "Os vegetais precisam ser cortados em cubinhos, não picados.",
        situation: "Instrução culinária",
        difficulty: 'advanced'
      },
      {
        id: 'chef_3',
        english: "Let the sauce simmer for about 10 minutes.",
        portuguese: "Deixe o molho ferver em fogo baixo por cerca de 10 minutos.",
        situation: "Técnica de cozimento",
        difficulty: 'advanced'
      },
      {
        id: 'chef_4',
        english: "This dish pairs well with white wine.",
        portuguese: "Este prato combina bem com vinho branco.",
        situation: "Recomendação",
        difficulty: 'intermediate'
      },
      {
        id: 'chef_5',
        english: "Always taste your food before serving.",
        portuguese: "Sempre prove sua comida antes de servir.",
        situation: "Dica profissional",
        difficulty: 'beginner'
      }
    ]
  },
  {
    id: 'lawyer',
    title: 'Advogado/Advogada',
    icon: '⚖️',
    description: 'Terminologia jurídica e comunicação legal',
    color: 'from-gray-600 to-slate-600',
    phrases: [
      {
        id: 'law_1',
        english: "I need to review your case documents first.",
        portuguese: "Preciso revisar os documentos do seu caso primeiro.",
        situation: "Consulta inicial",
        difficulty: 'intermediate'
      },
      {
        id: 'law_2',
        english: "We have strong evidence to support your claim.",
        portuguese: "Temos evidências sólidas para apoiar sua alegação.",
        situation: "Avaliação do caso",
        difficulty: 'advanced'
      },
      {
        id: 'law_3',
        english: "The defendant has 30 days to respond.",
        portuguese: "O réu tem 30 dias para responder.",
        situation: "Procedimento legal",
        difficulty: 'advanced'
      },
      {
        id: 'law_4',
        english: "Let's discuss the settlement options.",
        portuguese: "Vamos discutir as opções de acordo.",
        situation: "Negociação",
        difficulty: 'advanced'
      },
      {
        id: 'law_5',
        english: "I'll represent you in court if necessary.",
        portuguese: "Eu te representarei no tribunal se necessário.",
        situation: "Representação legal",
        difficulty: 'intermediate'
      }
    ]
  },
  {
    id: 'sales-representative',
    title: 'Representante de Vendas',
    icon: '💼',
    description: 'Técnicas de vendas e relacionamento com clientes',
    color: 'from-teal-600 to-cyan-600',
    phrases: [
      {
        id: 'sales_1',
        english: "What can I help you find today?",
        portuguese: "O que posso ajudá-lo a encontrar hoje?",
        situation: "Abordagem inicial",
        difficulty: 'beginner'
      },
      {
        id: 'sales_2',
        english: "This product comes with a one-year warranty.",
        portuguese: "Este produto vem com garantia de um ano.",
        situation: "Informação do produto",
        difficulty: 'intermediate'
      },
      {
        id: 'sales_3',
        english: "We're offering a 20% discount this week only.",
        portuguese: "Estamos oferecendo 20% de desconto apenas esta semana.",
        situation: "Promoção",
        difficulty: 'intermediate'
      },
      {
        id: 'sales_4',
        english: "Would you like to hear about our financing options?",
        portuguese: "Gostaria de saber sobre nossas opções de financiamento?",
        situation: "Facilitar a venda",
        difficulty: 'advanced'
      },
      {
        id: 'sales_5',
        english: "I'm confident this will meet all your needs.",
        portuguese: "Tenho certeza de que isso atenderá todas as suas necessidades.",
        situation: "Fechamento",
        difficulty: 'advanced'
      }
    ]
  }
]