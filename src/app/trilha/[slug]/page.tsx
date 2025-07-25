import SimpleTrailContent from '@/components/SimpleTrailContent'

const trailsData = {
  trabalho: {
    title: 'Inglês para Trabalho',
    icon: '💼',
    description: 'Domine frases essenciais para reuniões, e-mails e feedbacks profissionais',
    phrases: [
      // ========== FRASES FREE (10) ==========
      {
        english: "Could you please send me the report by Friday?",
        portuguese: "Você poderia me enviar o relatório até sexta-feira?",
        level: 'básico',
        context: 'Solicitação de entrega',
        situations: [
          'Em uma reunião: "Could you please send me the report by Friday so I can review it?"',
          'Por email: "Hi Sarah, could you please send me the monthly report by Friday?"'
        ]
      },
      {
        english: "I'd like to schedule a meeting for next week.",
        portuguese: "Gostaria de agendar uma reunião para a próxima semana.",
        level: 'básico',
        context: 'Agendamento',
        situations: [
          'Ao telefone: "Hi John, I\'d like to schedule a meeting for next week to discuss the project."',
          'Por email: "I\'d like to schedule a meeting for next week. Are you available Tuesday morning?"'
        ]
      },
      {
        english: "The deadline has been moved to next month.",
        portuguese: "O prazo foi movido para o próximo mês.",
        level: 'médio',
        context: 'Alteração de prazo',
        situations: [
          'Informando a equipe: "Good news everyone, the deadline has been moved to next month."',
          'Em email para cliente: "I wanted to inform you that the deadline has been moved to next month."'
        ]
      },
      {
        english: "I appreciate your feedback on this proposal.",
        portuguese: "Agradeço seu feedback sobre esta proposta.",
        level: 'básico',
        context: 'Agradecimento',
        situations: [
          'Após apresentação: "Thank you for listening. I appreciate your feedback on this proposal."',
          'Respondendo email: "Hi Mark, I appreciate your feedback on this proposal. I\'ll make the changes."'
        ]
      },
      {
        english: "Let's circle back on this issue tomorrow.",
        portuguese: "Vamos retomar esta questão amanhã.",
        level: 'médio',
        context: 'Adiamento',
        situations: [
          'Final de reunião: "We\'re running out of time. Let\'s circle back on this issue tomorrow."',
          'Questão complexa: "This needs more research. Let\'s circle back on this issue tomorrow with more data."'
        ]
      },
      {
        english: "Can we touch base about the project status?",
        portuguese: "Podemos conversar sobre o status do projeto?",
        level: 'médio',
        context: 'Check-in',
        situations: [
          'Por telefone: "Hi Sarah, can we touch base about the project status this afternoon?"',
          'Encontrando colega: "When you have a moment, can we touch base about the project status?"'
        ]
      },
      {
        english: "I'll keep you in the loop on any updates.",
        portuguese: "Vou te manter informado sobre qualquer atualização.",
        level: 'médio',
        context: 'Comunicação',
        situations: [
          'Final de reunião: "Thanks for joining. I\'ll keep you in the loop on any updates."',
          'Por email: "I\'ll keep you in the loop on any updates regarding the client\'s decision."'
        ]
      },
      {
        english: "We need to think outside the box for this solution.",
        portuguese: "Precisamos pensar fora da caixa para esta solução.",
        level: 'avançado',
        context: 'Criatividade',
        situations: [
          'Brainstorming: "The usual approach isn\'t working. We need to think outside the box for this solution."',
          'Apresentando desafio: "This problem requires creativity. We need to think outside the box for this solution."'
        ]
      },
      {
        english: "Let's table this discussion for now.",
        portuguese: "Vamos deixar esta discussão para depois.",
        level: 'avançado',
        context: 'Pausa na discussão',
        situations: [
          'Controlando reunião: "We\'re running out of time. Let\'s table this discussion for now."',
          'Evitando conflito: "This is getting heated. Let\'s table this discussion for now and cool down."'
        ]
      },
      {
        english: "Can you walk me through the process?",
        portuguese: "Você pode me explicar o processo passo a passo?",
        level: 'básico',
        context: 'Explicação',
        situations: [
          'Treinamento: "I\'m new to this system. Can you walk me through the process?"',
          'Reunião técnica: "Before we start, can you walk me through the process so everyone understands?"'
        ]
      },

      // ========== CATEGORIA: REUNIÕES (40 frases) ==========
      {
        english: "Let's kick off this meeting.",
        portuguese: "Vamos começar esta reunião.",
        level: 'básico',
        context: 'Reuniões',
        situations: [
          'Iniciando reunião: "Good morning everyone! Let\'s kick off this meeting by reviewing last week\'s actions."',
          'Após chat informal: "Alright team, let\'s kick off this meeting. We have a lot to cover today."'
        ]
      },
      {
        english: "Can everyone see my screen?",
        portuguese: "Todos conseguem ver minha tela?",
        level: 'básico',
        context: 'Reuniões',
        situations: [
          'Compartilhando tela: "I\'m about to share my presentation. Can everyone see my screen?"',
          'Problema técnico: "I just shared my screen. Can everyone see my screen or should I try again?"'
        ]
      },
      {
        english: "You're on mute.",
        portuguese: "Você está no mudo.",
        level: 'básico',
        context: 'Reuniões',
        situations: [
          'Alguém tentando falar: "Sorry Sarah, you\'re on mute. We can\'t hear you."',
          'Interrompendo gentilmente: "John, you\'re on mute. Could you unmute yourself?"'
        ]
      },
      {
        english: "Can you speak up? You're breaking up.",
        portuguese: "Você pode falar mais alto? Está cortando.",
        level: 'básico',
        context: 'Reuniões',
        situations: [
          'Problema de áudio: "Sorry Mike, can you speak up? You\'re breaking up and we\'re missing parts."',
          'Conexão ruim: "Can you speak up? You\'re breaking up. Maybe try turning off your video?"'
        ]
      },
      {
        english: "Let's go around the room for introductions.",
        portuguese: "Vamos fazer uma rodada de apresentações.",
        level: 'médio',
        context: 'Reuniões',
        situations: [
          'Primeira reunião: "We have some new team members today. Let\'s go around the room for introductions."',
          'Reunindo equipes: "Since we\'re working together now, let\'s go around the room for introductions."'
        ]
      },
      {
        english: "I'd like to add something to the agenda.",
        portuguese: "Gostaria de acrescentar algo à agenda.",
        level: 'médio',
        context: 'Reuniões',
        situations: [
          'Início da reunião: "Before we start, I\'d like to add something to the agenda if that\'s okay."',
          'Questão urgente: "Sorry to interrupt, but I\'d like to add something to the agenda - it\'s quite urgent."'
        ]
      },
      {
        english: "Can we park that discussion for later?",
        portuguese: "Podemos deixar essa discussão para depois?",
        level: 'avançado',
        context: 'Reuniões',
        situations: [
          'Controlando tempo: "This is important but we\'re running late. Can we park that discussion for later?"',
          'Focando na agenda: "That\'s a good point, but can we park that discussion for later? Let\'s stay on topic."'
        ]
      },
      {
        english: "Let's dive deeper into this topic.",
        portuguese: "Vamos nos aprofundar neste tópico.",
        level: 'médio',
        context: 'Reuniões',
        situations: [
          'Após apresentação superficial: "This is interesting. Let\'s dive deeper into this topic and understand the implications."',
          'Identificando área chave: "This seems to be our main challenge. Let\'s dive deeper into this topic in our next meeting."'
        ]
      },
      {
        english: "I have a hard stop at 3 PM.",
        portuguese: "Tenho que sair às 15h em ponto.",
        level: 'avançado',
        context: 'Reuniões',
        situations: [
          'Início da reunião: "Just so you know, I have a hard stop at 3 PM for another meeting."',
          'Controlando tempo: "We need to wrap up soon - I have a hard stop at 3 PM today."'
        ]
      },
      {
        english: "Can we take this offline?",
        portuguese: "Podemos discutir isso separadamente?",
        level: 'avançado',
        context: 'Reuniões',
        situations: [
          'Discussão técnica detalhada: "This is getting quite technical. Can we take this offline and share the results later?"',
          'Questão sensível: "This involves confidential information. Can we take this offline after the meeting?"'
        ]
      },
      {
        english: "Let's circle back to this next week.",
        portuguese: "Vamos retomar isso na próxima semana.",
        level: 'médio',
        context: 'Reuniões',
        situations: [
          'Questão não urgente: "This isn\'t critical right now. Let\'s circle back to this next week when we have more data."',
          'Falta de tempo: "We\'re running out of time today. Let\'s circle back to this next week with fresh minds."'
        ]
      },
      {
        english: "I'd like to piggyback on what Sarah said.",
        portuguese: "Gostaria de complementar o que a Sarah disse.",
        level: 'avançado',
        context: 'Reuniões',
        situations: [
          'Concordando e expandindo: "I\'d like to piggyback on what Sarah said and add that we also need to consider the budget implications."',
          'Apoiando colega: "I\'d like to piggyback on what Sarah said - she\'s absolutely right about the timeline concerns."'
        ]
      },
      {
        english: "Can we get a consensus on this?",
        portuguese: "Podemos chegar a um consenso sobre isso?",
        level: 'médio',
        context: 'Reuniões',
        situations: [
          'Decisão importante: "Before we move forward, can we get a consensus on this approach from everyone?"',
          'Finalizando discussão: "We\'ve heard different viewpoints. Can we get a consensus on this so we can proceed?"'
        ]
      },
      {
        english: "Let's put this to a vote.",
        portuguese: "Vamos votar sobre isso.",
        level: 'básico',
        context: 'Reuniões',
        situations: [
          'Impasse na discussão: "We can\'t seem to agree on this. Let\'s put this to a vote and move forward."',
          'Decisão democrática: "Everyone has voiced their opinion. Let\'s put this to a vote to decide fairly."'
        ]
      },
      {
        english: "I need to step out for a moment.",
        portuguese: "Preciso me ausentar por um momento.",
        level: 'básico',
        context: 'Reuniões',
        situations: [
          'Chamada urgente: "Sorry everyone, I need to step out for a moment - there\'s an urgent call I have to take."',
          'Necessidade pessoal: "Excuse me, I need to step out for a moment. Please continue without me."'
        ]
      },
      {
        english: "Can we stick to the agenda?",
        portuguese: "Podemos seguir a agenda?",
        level: 'médio',
        context: 'Reuniões',
        situations: [
          'Controlando a reunião: "We\'re getting off track. Can we stick to the agenda so we finish on time?"',
          'Focando nos objetivos: "That\'s an interesting point, but can we stick to the agenda for today\'s meeting?"'
        ]
      },
      {
        english: "Let's recap the action items.",
        portuguese: "Vamos recapitular os itens de ação.",
        level: 'médio',
        context: 'Reuniões',
        situations: [
          'Final da reunião: "Before we finish, let\'s recap the action items so everyone knows what they need to do."',
          'Organizando tarefas: "We\'ve covered a lot. Let\'s recap the action items and assign owners and deadlines."'
        ]
      },
      {
        english: "Who's taking the minutes?",
        portuguese: "Quem está fazendo a ata?",
        level: 'médio',
        context: 'Reuniões',
        situations: [
          'Início da reunião: "Before we start, who\'s taking the minutes today? We need to document our decisions."',
          'Reunião importante: "This is a critical discussion. Who\'s taking the minutes so we have a record?"'
        ]
      },
      {
        english: "Can we schedule a follow-up?",
        portuguese: "Podemos agendar um acompanhamento?",
        level: 'básico',
        context: 'Reuniões',
        situations: [
          'Final da reunião: "We\'ve made good progress today. Can we schedule a follow-up to check on our action items?"',
          'Questões pendentes: "There are still some open questions. Can we schedule a follow-up meeting next week?"'
        ]
      },
      {
        english: "I'm going to play devil's advocate here.",
        portuguese: "Vou fazer o papel do advogado do diabo aqui.",
        level: 'avançado',
        context: 'Reuniões',
        situations: [
          'Questionando consenso: "I\'m going to play devil\'s advocate here - what if this approach doesn\'t work as expected?"',
          'Testando idéias: "Let me play devil\'s advocate here and challenge some of our assumptions about the market."'
        ]
      },
      {
        english: "Let's move on to the next item.",
        portuguese: "Vamos para o próximo item.",
        level: 'básico',
        context: 'Reuniões',
        situations: [
          'Controlando agenda: "We\'ve covered this topic well. Let\'s move on to the next item on our agenda."',
          'Gestão de tempo: "We\'re running behind schedule. Let\'s move on to the next item and come back to this later."'
        ]
      },
      {
        english: "Can we get some buy-in from the team?",
        portuguese: "Podemos conseguir o apoio da equipe?",
        level: 'avançado',
        context: 'Reuniões',
        situations: [
          'Nova iniciativa: "This is a big change. Can we get some buy-in from the team before we proceed?"',
          'Implementação de projeto: "For this to succeed, can we get some buy-in from the team leaders first?"'
        ]
      },
      {
        english: "I'd like to push back on that idea.",
        portuguese: "Gostaria de questionar essa ideia.",
        level: 'avançado',
        context: 'Reuniões',
        situations: [
          'Discordando respeitosamente: "I\'d like to push back on that idea - I think we need to consider the risks involved."',
          'Apresentando alternativa: "I\'d like to push back on that idea and suggest we explore a different approach instead."'
        ]
      },
      {
        english: "Let's table this for now.",
        portuguese: "Vamos deixar isso de lado por enquanto.",
        level: 'médio',
        context: 'Reuniões',
        situations: [
          'Questão complexa: "This needs more research. Let\'s table this for now and come back with more information."',
          'Falta de tempo: "We won\'t resolve this today. Let\'s table this for now and schedule a dedicated session."'
        ]
      },
      {
        english: "Can we get alignment on the timeline?",
        portuguese: "Podemos nos alinhar sobre o cronograma?",
        level: 'avançado',
        context: 'Reuniões',
        situations: [
          'Planejamento de projeto: "Before we finalize the scope, can we get alignment on the timeline from all stakeholders?"',
          'Coordenando equipes: "Different teams have different expectations. Can we get alignment on the timeline?"'
        ]
      },
      {
        english: "I want to level-set expectations.",
        portuguese: "Quero alinhar as expectativas.",
        level: 'avançado',
        context: 'Reuniões',
        situations: [
          'Início de projeto: "Before we start, I want to level-set expectations about deliverables and timelines."',
          'Gerenciando equipe: "There seems to be confusion. I want to level-set expectations about our goals this quarter."'
        ]
      },
      {
        english: "Let's brainstorm some solutions.",
        portuguese: "Vamos fazer um brainstorm de soluções.",
        level: 'médio',
        context: 'Reuniões',
        situations: [
          'Enfrentando problema: "We\'ve identified the issue. Now let\'s brainstorm some solutions together."',
          'Sessão criativa: "No wrong answers here - let\'s brainstorm some solutions and see what we come up with."'
        ]
      },
      {
        english: "Can we do a quick temperature check?",
        portuguese: "Podemos fazer uma verificação rápida?",
        level: 'avançado',
        context: 'Reuniões',
        situations: [
          'Verificando opiniões: "Before we finalize this, can we do a quick temperature check? How does everyone feel?"',
          'Após apresentação: "Can we do a quick temperature check on this proposal? Any concerns or questions?"'
        ]
      },
      {
        english: "I need to jump on another call.",
        portuguese: "Preciso entrar em outra chamada.",
        level: 'médio',
        context: 'Reuniões',
        situations: [
          'Saindo da reunião: "Thanks everyone. I need to jump on another call but please continue without me."',
          'Conflito de horário: "Sorry, I need to jump on another call with the client. Can you send me the notes?"'
        ]
      },
      {
        english: "Let's wrap this up.",
        portuguese: "Vamos finalizar isso.",
        level: 'básico',
        context: 'Reuniões',
        situations: [
          'Encerrando reunião: "We\'ve covered everything on the agenda. Let\'s wrap this up and get back to work."',
          'Controlando tempo: "We\'re running over time. Let\'s wrap this up and schedule a follow-up if needed."'
        ]
      },
      {
        english: "Can we get some concrete next steps?",
        portuguese: "Podemos definir próximos passos concretos?",
        level: 'médio',
        context: 'Reuniões',
        situations: [
          'Finalizando discussão: "Great discussion everyone. Can we get some concrete next steps with owners and dates?"',
          'Após brainstorm: "We have lots of good ideas. Can we get some concrete next steps to move forward?"'
        ]
      },
      {
        english: "I'd like to challenge that assumption.",
        portuguese: "Gostaria de questionar essa suposição.",
        level: 'avançado',
        context: 'Reuniões',
        situations: [
          'Análise crítica: "I\'d like to challenge that assumption - do we have data to support this belief?"',
          'Questionando estratégia: "Before we proceed, I\'d like to challenge that assumption about customer behavior."'
        ]
      },
      {
        english: "Let's sync up offline about this.",
        portuguese: "Vamos nos alinhar sobre isso separadamente.",
        level: 'avançado',
        context: 'Reuniões',
        situations: [
          'Questão específica: "This is getting into implementation details. Let\'s sync up offline about this after the meeting."',
          'Discussão entre duas pessoas: "This mainly concerns our two teams. Let\'s sync up offline about this later."'
        ]
      },
      {
        english: "Can we establish some ground rules?",
        portuguese: "Podemos estabelecer algumas regras básicas?",
        level: 'médio',
        context: 'Reuniões',
        situations: [
          'Reunião tensa: "Before we continue, can we establish some ground rules for respectful discussion?"',
          'Nova equipe: "Since we\'re working together for the first time, can we establish some ground rules for our meetings?"'
        ]
      },
      {
        english: "I want to bring everyone up to speed.",
        portuguese: "Quero colocar todos a par da situação.",
        level: 'médio',
        context: 'Reuniões',
        situations: [
          'Novos membros: "We have some new team members joining us. I want to bring everyone up to speed on our current progress."',
          'Atualização importante: "A lot has happened since our last meeting. I want to bring everyone up to speed before we proceed."'
        ]
      },
      {
        english: "Let's do a post-mortem on this project.",
        portuguese: "Vamos fazer uma análise pós-projeto.",
        level: 'avançado',
        context: 'Reuniões',
        situations: [
          'Final de projeto: "Now that we\'ve completed the launch, let\'s do a post-mortem on this project to learn from it."',
          'Após falha: "We need to understand what went wrong. Let\'s do a post-mortem on this project next week."'
        ]
      },
      {
        english: "Can we get some visibility into the process?",
        portuguese: "Podemos ter mais visibilidade do processo?",
        level: 'avançado',
        context: 'Reuniões',
        situations: [
          'Falta de transparencia: "We\'re not sure what\'s happening with the development. Can we get some visibility into the process?"',
          'Gerenciamento de projeto: "To better support the team, can we get some visibility into the process and bottlenecks?"'
        ]
      },
      {
        english: "I'd like to propose an alternative approach.",
        portuguese: "Gostaria de propor uma abordagem alternativa.",
        level: 'médio',
        context: 'Reuniões',
        situations: [
          'Solução melhor: "While this plan could work, I\'d like to propose an alternative approach that might be more efficient."',
          'Superando obstáculos: "We\'re facing some challenges with the current method. I\'d like to propose an alternative approach."'
        ]
      },
      {
        english: "Let's put a pin in this and come back to it.",
        portuguese: "Vamos marcar isso e voltar depois.",
        level: 'avançado',
        context: 'Reuniões',
        situations: [
          'Questão importante mas não urgente: "This is worth discussing, but let\'s put a pin in this and come back to it when we have more time."',
          'Priorizando agenda: "We have limited time today. Let\'s put a pin in this and come back to it in our next meeting."'
        ]
      },
      {
        english: "Can we get ownership assigned for each task?",
        portuguese: "Podemos definir responsáveis para cada tarefa?",
        level: 'avançado',
        context: 'Reuniões',
        situations: [
          'Finalizando planejamento: "We\'ve outlined the tasks. Can we get ownership assigned for each task with clear deadlines?"',
          'Accountability: "To ensure nothing falls through the cracks, can we get ownership assigned for each task we discussed?"'
        ]
      },

      // ========== CATEGORIA: E-MAILS (35 frases) ==========
      {
        english: "I hope this email finds you well.",
        portuguese: "Espero que este email o encontre bem.",
        level: 'básico',
        context: 'E-mails',
        situations: [
          'Email formal: "Dear Mr. Johnson, I hope this email finds you well. I wanted to follow up on our meeting."',
          'Retomando contato: "Hi Sarah, I hope this email finds you well. It\'s been a while since we last spoke."'
        ]
      },
      {
        english: "I'm writing to follow up on our conversation.",
        portuguese: "Estou escrevendo para dar seguimento à nossa conversa.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Após reunião: "Hi Team, I\'m writing to follow up on our conversation yesterday about the Q3 budget."',
          'Follow-up comercial: "Dear Client, I\'m writing to follow up on our conversation about your software needs."'
        ]
      },
      {
        english: "Please find the attached document.",
        portuguese: "Segue em anexo o documento.",
        level: 'básico',
        context: 'E-mails',
        situations: [
          'Enviando relatório: "Please find the attached document with the quarterly sales report as requested."',
          'Compartilhando proposta: "Please find the attached document containing our revised proposal for your review."'
        ]
      },
      {
        english: "I'm cc'ing John on this email.",
        portuguese: "Estou colocando o John em cópia neste email.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Incluindo gerente: "I\'m cc\'ing John on this email since this relates to his department\'s budget."',
          'Transparencia: "For visibility, I\'m cc\'ing John on this email so he\'s aware of the timeline changes."'
        ]
      },
      {
        english: "Thanks for looping me in.",
        portuguese: "Obrigado por me incluir.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Sendo incluído em conversa: "Thanks for looping me in. I can provide some insights on the technical requirements."',
          'Agradecendo inclusão: "Thanks for looping me in on this discussion. I wasn\'t aware of these developments."'
        ]
      },
      {
        english: "I'll circle back with more details.",
        portuguese: "Retornarei com mais detalhes.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Promessa de follow-up: "I need to check with my team first. I\'ll circle back with more details by Friday."',
          'Informação pendente: "I don\'t have all the numbers yet, but I\'ll circle back with more details after the meeting."'
        ]
      },
      {
        english: "Please let me know if you have any questions.",
        portuguese: "Por favor, me avise se tiver alguma dúvida.",
        level: 'básico',
        context: 'E-mails',
        situations: [
          'Final de explicação: "I\'ve outlined the process above. Please let me know if you have any questions."',
          'Oferta de ajuda: "Here\'s the information you requested. Please let me know if you have any questions."'
        ]
      },
      {
        english: "I wanted to reach out regarding...",
        portuguese: "Queria entrar em contato sobre...",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Iniciando conversa: "Hi Sarah, I wanted to reach out regarding the marketing campaign we discussed last month."',
          'Questão de negócios: "Dear Team, I wanted to reach out regarding some concerns about our current workflow."'
        ]
      },
      {
        english: "Moving you to BCC to reduce inbox clutter.",
        portuguese: "Movendo você para CCO para reduzir spam na caixa.",
        level: 'avançado',
        context: 'E-mails',
        situations: [
          'Gestão de email: "This conversation is getting lengthy. Moving you to BCC to reduce inbox clutter unless you need to stay involved."',
          'Consideração pela equipe: "Since this is now mostly between Sales and Marketing, moving you to BCC to reduce inbox clutter."'
        ]
      },
      {
        english: "Per our conversation, here are the next steps.",
        portuguese: "Conforme nossa conversa, seguem os próximos passos.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Follow-up de reunião: "Thanks for the productive meeting yesterday. Per our conversation, here are the next steps we agreed on."',
          'Confirmação de ações: "Per our conversation this morning, here are the next steps for the project implementation."'
        ]
      },
      {
        english: "I'm bumping this to the top of your inbox.",
        portuguese: "Estou priorizando isso na sua caixa de entrada.",
        level: 'avançado',
        context: 'E-mails',
        situations: [
          'Urgência: "This deadline has moved up. I\'m bumping this to the top of your inbox since it\'s now critical."',
          'Priorizando task: "The client is asking for updates. I\'m bumping this to the top of your inbox for immediate attention."'
        ]
      },
      {
        english: "Thanks for your quick turnaround on this.",
        portuguese: "Obrigado pela resposta rápida sobre isso.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Agradecendo agilidade: "Thanks for your quick turnaround on this - it helped us meet our client deadline."',
          'Reconhecendo esforço: "I know you\'re busy. Thanks for your quick turnaround on this urgent request."'
        ]
      },
      {
        english: "I'm following up on the action items from yesterday.",
        portuguese: "Estou acompanhando os itens de ação de ontem.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Follow-up de reunião: "Good morning team, I\'m following up on the action items from yesterday\'s planning meeting."',
          'Cobrando progress: "Hi everyone, I\'m following up on the action items from yesterday. Here\'s the current status."'
        ]
      },
      {
        english: "Could you please confirm receipt?",
        portuguese: "Você poderia confirmar o recebimento?",
        level: 'básico',
        context: 'E-mails',
        situations: [
          'Documento importante: "I\'ve sent the signed contract. Could you please confirm receipt so I know it arrived safely?"',
          'Informação crítica: "This contains sensitive information. Could you please confirm receipt when you\'ve received it?"'
        ]
      },
      {
        english: "I'm forwarding this for your awareness.",
        portuguese: "Estou encaminhando isso para seu conhecimento.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Compartilhando informação: "I\'m forwarding this for your awareness - it might impact our Q4 planning."',
          'FYI: "No action needed from you, but I\'m forwarding this for your awareness since it relates to your project."'
        ]
      },
      {
        english: "Please reply all so everyone stays in the loop.",
        portuguese: "Por favor, responda a todos para manter todos informados.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Transparencia em equipe: "When you respond, please reply all so everyone stays in the loop about the timeline changes."',
          'Coordenação: "For visibility across departments, please reply all so everyone stays in the loop."'
        ]
      },
      {
        english: "I'll send a separate email with the details.",
        portuguese: "Enviarei um email separado com os detalhes.",
        level: 'básico',
        context: 'E-mails',
        situations: [
          'Informação complexa: "This email is getting long. I\'ll send a separate email with the details about the technical requirements."',
          'Audiencia diferente: "I\'ll send a separate email with the details to just the development team since it\'s technical."'
        ]
      },
      {
        english: "Thanks for bringing this to my attention.",
        portuguese: "Obrigado por trazer isso à minha atenção.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Problema identificado: "Thanks for bringing this to my attention. I wasn\'t aware of the budget concerns."',
          'Oportunidade: "Thanks for bringing this to my attention. This could be a great opportunity for our team."'
        ]
      },
      {
        english: "I'm tagging the relevant team members.",
        portuguese: "Estou marcando os membros relevantes da equipe.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Incluindo pessoas necessárias: "This affects multiple departments. I\'m tagging the relevant team members who need to be involved."',
          'Expertise necessária: "For their input on this technical issue, I\'m tagging the relevant team members from Engineering."'
        ]
      },
      {
        english: "This is time-sensitive, so please prioritize.",
        portuguese: "Isso é urgente, então por favor priorize.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Deadline apertado: "The client needs this by end of day. This is time-sensitive, so please prioritize."',
          'Urgência: "We have a board meeting tomorrow morning. This is time-sensitive, so please prioritize."'
        ]
      },
      {
        english: "I'm setting up a separate thread for this discussion.",
        portuguese: "Estou criando uma conversa separada para esta discussão.",
        level: 'avançado',
        context: 'E-mails',
        situations: [
          'Tópico novo: "This is a different topic entirely. I\'m setting up a separate thread for this discussion to keep things organized."',
          'Audiencia específica: "This involves different stakeholders. I\'m setting up a separate thread for this discussion with the right people."'
        ]
      },
      {
        english: "Could you please provide an ETA?",
        portuguese: "Você poderia fornecer um prazo estimado?",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Planejamento: "I need to update the client on progress. Could you please provide an ETA for the final deliverable?"',
          'Coordenação: "To plan our next steps, could you please provide an ETA for when the review will be complete?"'
        ]
      },
      {
        english: "I'm updating the distribution list.",
        portuguese: "Estou atualizando a lista de distribuição.",
        level: 'avançado',
        context: 'E-mails',
        situations: [
          'Mudanças na equipe: "Since John left the company, I\'m updating the distribution list for our weekly reports."',
          'Organizando comunicação: "To ensure the right people get these updates, I\'m updating the distribution list based on new roles."'
        ]
      },
      {
        english: "Please see my comments inline.",
        portuguese: "Por favor, veja meus comentários no texto.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Review de documento: "I\'ve reviewed your proposal. Please see my comments inline for specific feedback."',
          'Discussão detalhada: "Rather than write a long email, please see my comments inline to address each point."'
        ]
      },
      {
        english: "I'm archiving this thread as it's resolved.",
        portuguese: "Estou arquivando esta conversa pois foi resolvida.",
        level: 'avançado',
        context: 'E-mails',
        situations: [
          'Fechando questão: "Thanks for the confirmation. I\'m archiving this thread as it\'s resolved and the issue is closed."',
          'Organizando inbox: "Perfect, we\'ve reached a solution. I\'m archiving this thread as it\'s resolved."'
        ]
      },
      {
        english: "Thanks for the heads up.",
        portuguese: "Obrigado pelo aviso.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Aviso antecipado: "Thanks for the heads up about the system maintenance. I\'ll plan accordingly."',
          'Informação útil: "Thanks for the heads up on the client\'s concerns. I\'ll address this in our next meeting."'
        ]
      },
      {
        english: "I'll keep you posted on the progress.",
        portuguese: "Te manterei informado sobre o progresso.",
        level: 'básico',
        context: 'E-mails',
        situations: [
          'Projeto em andamento: "We\'re starting the implementation next week. I\'ll keep you posted on the progress."',
          'Atualizações regulares: "The negotiations are ongoing. I\'ll keep you posted on the progress as things develop."'
        ]
      },
      {
        english: "Could you please double-check this?",
        portuguese: "Você poderia verificar isso novamente?",
        level: 'básico',
        context: 'E-mails',
        situations: [
          'Verificação de dados: "The numbers seem unusual. Could you please double-check this before we send it to the client?"',
          'Confirmação: "I want to make sure we\'re accurate. Could you please double-check this calculation?"'
        ]
      },
      {
        english: "I'm escalating this to management.",
        portuguese: "Estou escalando isso para a gerência.",
        level: 'avançado',
        context: 'E-mails',
        situations: [
          'Problema sério: "This issue requires executive decision. I\'m escalating this to management for resolution."',
          'Impasse: "We can\'t reach agreement at our level. I\'m escalating this to management to break the deadlock."'
        ]
      },
      {
        english: "Please disregard my previous email.",
        portuguese: "Por favor, desconsidere meu email anterior.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Correção: "I sent incorrect information by mistake. Please disregard my previous email and use this updated version."',
          'Email enviado por engano: "I sent that to the wrong group. Please disregard my previous email - it wasn\'t meant for this list."'
        ]
      },
      {
        english: "I'm scheduling a follow-up meeting.",
        portuguese: "Estou agendando uma reunião de acompanhamento.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Próximos passos: "We\'ve covered a lot in this email. I\'m scheduling a follow-up meeting to discuss the details."',
          'Questões complexas: "This needs more discussion than email allows. I\'m scheduling a follow-up meeting for next week."'
        ]
      },
      {
        english: "Could you please review and approve?",
        portuguese: "Você poderia revisar e aprovar?",
        level: 'básico',
        context: 'E-mails',
        situations: [
          'Solicitação de aprovação: "I\'ve attached the final proposal. Could you please review and approve by Friday?"',
          'Processo formal: "This needs your sign-off before we proceed. Could you please review and approve?"'
        ]
      },
      {
        english: "I'm flagging this as high priority.",
        portuguese: "Estou marcando isso como alta prioridade.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Urgência: "The client deadline has been moved up. I\'m flagging this as high priority for immediate attention."',
          'Importância: "This affects our Q4 goals. I\'m flagging this as high priority so it doesn\'t get overlooked."'
        ]
      },
      {
        english: "Thanks for your patience on this matter.",
        portuguese: "Obrigado pela sua paciência neste assunto.",
        level: 'médio',
        context: 'E-mails',
        situations: [
          'Atraso na resolução: "The issue took longer to resolve than expected. Thanks for your patience on this matter."',
          'Processo demorado: "I know this approval process is lengthy. Thanks for your patience on this matter."'
        ]
      },
      {
        english: "I'll get back to you with a timeline.",
        portuguese: "Retornarei com um cronograma.",
        level: 'básico',
        context: 'E-mails',
        situations: [
          'Planejamento necessário: "I need to check with the team first. I\'ll get back to you with a timeline by tomorrow."',
          'Estimativa de projeto: "Let me assess the scope properly. I\'ll get back to you with a timeline for completion."'
        ]
      },

      // ========== CATEGORIA: APRESENTAÇÕES (30 frases) ==========
      {
        english: "Good morning everyone, thank you for joining us today.",
        portuguese: "Bom dia pessoal, obrigado por se juntarem a nós hoje.",
        level: 'básico',
        context: 'Apresentações',
        situations: [
          'Abertura de apresentação: "Good morning everyone, thank you for joining us today. We have some exciting updates to share."',
          'Reunião com clientes: "Good morning everyone, thank you for joining us today for our quarterly business review."'
        ]
      },
      {
        english: "Let me walk you through the agenda.",
        portuguese: "Deixem-me apresentar a agenda.",
        level: 'médio',
        context: 'Apresentações',
        situations: [
          'Estruturando apresentação: "Before we begin, let me walk you through the agenda so you know what to expect."',
          'Organizando tempo: "We have a lot to cover in an hour. Let me walk you through the agenda quickly."'
        ]
      },
      {
        english: "As you can see on this slide...",
        portuguese: "Como vocês podem ver neste slide...",
        level: 'básico',
        context: 'Apresentações',
        situations: [
          'Referenciando visual: "As you can see on this slide, our revenue has increased by 25% this quarter."',
          'Explicando dados: "As you can see on this slide, the trend shows consistent growth over the past year."'
        ]
      },
      {
        english: "Let's dive into the key findings.",
        portuguese: "Vamos nos aprofundar nas principais descobertas.",
        level: 'médio',
        context: 'Apresentações',
        situations: [
          'Apresentando resultados: "Now that I\'ve provided the background, let\'s dive into the key findings from our research."',
          'Focando no essencial: "We have limited time, so let\'s dive into the key findings that will impact our decision."'
        ]
      },
      {
        english: "I'd like to highlight three main points.",
        portuguese: "Gostaria de destacar três pontos principais.",
        level: 'médio',
        context: 'Apresentações',
        situations: [
          'Estruturando conteúdo: "From our analysis, I\'d like to highlight three main points that are critical for our strategy."',
          'Resumindo apresentação: "Before we move to Q&A, I\'d like to highlight three main points from today\'s presentation."'
        ]
      },
      {
        english: "Moving on to the next section...",
        portuguese: "Passando para a próxima seção...",
        level: 'básico',
        context: 'Apresentações',
        situations: [
          'Transição natural: "I think we\'ve covered the challenges well. Moving on to the next section, let\'s discuss solutions."',
          'Controlando ritmo: "We\'re making good progress. Moving on to the next section about implementation timelines."'
        ]
      },
      {
        english: "This brings us to our recommendation.",
        portuguese: "Isso nos leva à nossa recomendação.",
        level: 'médio',
        context: 'Apresentações',
        situations: [
          'Concluindo análise: "After reviewing all the data and options, this brings us to our recommendation for moving forward."',
          'Proposta de solução: "Based on the challenges we\'ve identified, this brings us to our recommendation to restructure the process."'
        ]
      },
      {
        english: "Let me break this down for you.",
        portuguese: "Deixem-me detalhar isso para vocês.",
        level: 'médio',
        context: 'Apresentações',
        situations: [
          'Simplificando complexidade: "I know this process seems complicated. Let me break this down for you step by step."',
          'Explicando detalhes: "These numbers represent several components. Let me break this down for you to show how we arrived at this total."'
        ]
      },
      {
        english: "The data clearly shows...",
        portuguese: "Os dados mostram claramente...",
        level: 'básico',
        context: 'Apresentações',
        situations: [
          'Evidencia forte: "Looking at our quarterly results, the data clearly shows that our new strategy is working."',
          'Comprovando ponto: "I know some of you had concerns, but the data clearly shows that customer satisfaction has improved."'
        ]
      },
      {
        english: "I'll pause here for questions.",
        portuguese: "Vou pausar aqui para perguntas.",
        level: 'básico',
        context: 'Apresentações',
        situations: [
          'Meio da apresentação: "I\'ve covered a lot of information. I\'ll pause here for questions before moving to the next section."',
          'Checando entendimento: "This is a complex topic. I\'ll pause here for questions to make sure everyone\'s following."'
        ]
      },
      {
        english: "Let's take a step back and look at the big picture.",
        portuguese: "Vamos dar um passo atrás e ver o panorama geral.",
        level: 'médio',
        context: 'Apresentações',
        situations: [
          'Contextualizando: "We\'ve been discussing details. Let\'s take a step back and look at the big picture of our market position."',
          'Reorientando foco: "I see we\'re getting caught up in specifics. Let\'s take a step back and look at the big picture."'
        ]
      },
      {
        english: "This is a game-changer for our industry.",
        portuguese: "Isso é revolucionário para nossa indústria.",
        level: 'avançado',
        context: 'Apresentações',
        situations: [
          'Apresentando inovação: "This new technology isn\'t just an improvement - this is a game-changer for our industry."',
          'Destacando impacto: "I don\'t think we fully grasp the implications yet. This is a game-changer for our industry."'
        ]
      },
      {
        english: "The ROI speaks for itself.",
        portuguese: "O ROI fala por si só.",
        level: 'avançado',
        context: 'Apresentações',
        situations: [
          'Justificando investimento: "Looking at these numbers, the ROI speaks for itself - this project will pay for itself within 6 months."',
          'Convencendo stakeholders: "I know the initial cost seems high, but the ROI speaks for itself when you see the long-term benefits."'
        ]
      },
      {
        english: "Let me put this in perspective.",
        portuguese: "Deixem-me colocar isso em perspectiva.",
        level: 'médio',
        context: 'Apresentações',
        situations: [
          'Contextualizando números: "This might seem like a big number. Let me put this in perspective - it\'s only 2% of our annual budget."',
          'Comparando resultados: "Our competitor gained 5% market share. Let me put this in perspective - we gained 12%."'
        ]
      },
      {
        english: "We're seeing a significant uptick in...",
        portuguese: "Estamos vendo um aumento significativo em...",
        level: 'avançado',
        context: 'Apresentações',
        situations: [
          'Relatando tendência: "Since launching the new campaign, we\'re seeing a significant uptick in customer engagement."',
          'Destacando melhoria: "After implementing the changes, we\'re seeing a significant uptick in productivity across all teams."'
        ]
      },
      {
        english: "This aligns perfectly with our strategy.",
        portuguese: "Isso se alinha perfeitamente com nossa estratégia.",
        level: 'médio',
        context: 'Apresentações',
        situations: [
          'Conectando à visão: "This new opportunity isn\'t just profitable - this aligns perfectly with our strategy of expanding globally."',
          'Justificando proposta: "I know this seems like a departure, but this aligns perfectly with our strategy of customer-first innovation."'
        ]
      },
      {
        english: "Let me drill down into the specifics.",
        portuguese: "Deixem-me entrar nos detalhes específicos.",
        level: 'avançado',
        context: 'Apresentações',
        situations: [
          'Aprofundando análise: "Now that you understand the concept, let me drill down into the specifics of how this will work."',
          'Respondendo questões: "I see you have concerns about implementation. Let me drill down into the specifics of our plan."'
        ]
      },
      {
        english: "The bottom line is...",
        portuguese: "A linha de fundo é...",
        level: 'médio',
        context: 'Apresentações',
        situations: [
          'Resumindo essencial: "We\'ve discussed many factors, but the bottom line is that this will save us $2 million annually."',
          'Concluindo argumento: "I know there are risks to consider, but the bottom line is that we can\'t afford not to act."'
        ]
      },
      {
        english: "This represents a paradigm shift.",
        portuguese: "Isso representa uma mudança de paradigma.",
        level: 'avançado',
        context: 'Apresentações',
        situations: [
          'Mudanca radical: "We\'re not just improving our process - this represents a paradigm shift in how we think about customer service."',
          'Inovação disruptiva: "This technology isn\'t an upgrade - this represents a paradigm shift that will transform our industry."'
        ]
      },
      {
        english: "Let's talk about the implementation roadmap.",
        portuguese: "Vamos falar sobre o roteiro de implementação.",
        level: 'avançado',
        context: 'Apresentações',
        situations: [
          'Planejamento prático: "You\'ve seen the vision and benefits. Now let\'s talk about the implementation roadmap for the next 12 months."',
          'Próximos passos: "I know you\'re wondering about execution. Let\'s talk about the implementation roadmap and timelines."'
        ]
      },
      {
        english: "I want to address the elephant in the room.",
        portuguese: "Quero abordar o elefante na sala.",
        level: 'avançado',
        context: 'Apresentações',
        situations: [
          'Questão óbvia: "Before we continue, I want to address the elephant in the room - yes, this will require layoffs."',
          'Preocupação não dita: "I can see you\'re all thinking it. I want to address the elephant in the room about our budget constraints."'
        ]
      },
      {
        english: "This is low-hanging fruit we can tackle immediately.",
        portuguese: "Essa é uma oportunidade fácil que podemos abordar imediatamente.",
        level: 'avançado',
        context: 'Apresentações',
        situations: [
          'Oportunidade fácil: "While the big project will take months, this is low-hanging fruit we can tackle immediately for quick wins."',
          'Priorizando ações: "Looking for immediate impact? This is low-hanging fruit we can tackle immediately with our current resources."'
        ]
      },
      {
        english: "We need to think outside the box here.",
        portuguese: "Precisamos pensar fora da caixa aqui.",
        level: 'médio',
        context: 'Apresentações',
        situations: [
          'Desafio complexo: "Traditional approaches haven\'t worked. We need to think outside the box here to solve this problem."',
          'Inovação necessária: "Our competitors are catching up. We need to think outside the box here to stay ahead."'
        ]
      },
      {
        english: "This is mission-critical for our success.",
        portuguese: "Isso é fundamental para nosso sucesso.",
        level: 'avançado',
        context: 'Apresentações',
        situations: [
          'Enfatizando importância: "I can\'t overstate this - this digital transformation is mission-critical for our success in the next decade."',
          'Urgencia estratégica: "While other projects are important, this partnership is mission-critical for our success this year."'
        ]
      },
      {
        english: "Let me give you some context.",
        portuguese: "Deixem-me dar algum contexto.",
        level: 'básico',
        context: 'Apresentações',
        situations: [
          'Fornecendo background: "Before we dive into the numbers, let me give you some context about the market conditions."',
          'Situando audiência: "Some of you are new to this project. Let me give you some context about how we got here."'
        ]
      },
      {
        english: "We're at an inflection point.",
        portuguese: "Estamos em um ponto de inflexão.",
        level: 'avançado',
        context: 'Apresentações',
        situations: [
          'Momento decisivo: "After five years of steady growth, we\'re at an inflection point where we must decide our next strategy."',
          'Mudança de direção: "The market is changing rapidly. We\'re at an inflection point that will determine our future."'
        ]
      },
      {
        english: "This will move the needle significantly.",
        portuguese: "Isso fará uma diferença significativa.",
        level: 'avançado',
        context: 'Apresentações',
        situations: [
          'Impacto substancial: "While other initiatives show modest gains, this will move the needle significantly on our revenue."',
          'Resultados mensuráveis: "We need breakthrough results, not incremental improvements. This will move the needle significantly."'
        ]
      },
      {
        english: "Let's recap the key takeaways.",
        portuguese: "Vamos recapitular os pontos principais.",
        level: 'médio',
        context: 'Apresentações',
        situations: [
          'Resumindo apresentação: "We\'ve covered a lot of ground today. Let\'s recap the key takeaways before we close."',
          'Enfatizando pontos: "Before you leave, let\'s recap the key takeaways that you should remember from today\'s session."'
        ]
      },
      {
        english: "I'll open the floor for questions now.",
        portuguese: "Vou abrir para perguntas agora.",
        level: 'médio',
        context: 'Apresentações',
        situations: [
          'Final da apresentação: "That concludes my presentation. I\'ll open the floor for questions now - please feel free to ask anything."',
          'Interagindo com audiência: "I\'ve shared a lot of information. I\'ll open the floor for questions now to clarify any points."'
        ]
      },
      {
        english: "Thank you for your time and attention.",
        portuguese: "Obrigado pelo seu tempo e atenção.",
        level: 'básico',
        context: 'Apresentações',
        situations: [
          'Encerrando apresentação: "That\'s all I have for today. Thank you for your time and attention - I look forward to your feedback."',
          'Agradecendo participação: "Thank you for your time and attention. I know you\'re all busy, so I appreciate you being here."'
        ]
      },

      // ========== CATEGORIA: FEEDBACK (25 frases) ==========
      {
        english: "I'd like to give you some constructive feedback.",
        portuguese: "Gostaria de dar um feedback construtivo.",
        level: 'médio',
        context: 'Feedback',
        situations: [
          'Reunião one-on-one: "I\'d like to give you some constructive feedback about your presentation yesterday."',
          'Feedback formal: "I\'d like to give you some constructive feedback to help you grow in this role."'
        ]
      },
      {
        english: "You did an excellent job on this project.",
        portuguese: "Você fez um excelente trabalho neste projeto.",
        level: 'básico',
        context: 'Feedback',
        situations: [
          'Elogio direto: "You did an excellent job on this project. The client was very impressed with the results."',
          'Review de performance: "You did an excellent job on this project and delivered it ahead of schedule."'
        ]
      },
      {
        english: "There's room for improvement in this area.",
        portuguese: "Há espaço para melhoria nesta área.",
        level: 'médio',
        context: 'Feedback',
        situations: [
          'Feedback construtivo: "Your analysis was good, but there\'s room for improvement in this area of data interpretation."',
          'Review anual: "Overall great performance, though there\'s room for improvement in this area of communication."'
        ]
      },
      {
        english: "I appreciate your attention to detail.",
        portuguese: "Agradeço sua atenção aos detalhes.",
        level: 'médio',
        context: 'Feedback',
        situations: [
          'Reconhecendo qualidade: "I appreciate your attention to detail in this report - you caught several important issues."',
          'Feedback positivo: "I appreciate your attention to detail. It really shows in the quality of your work."'
        ]
      },
      {
        english: "You exceeded expectations on this deliverable.",
        portuguese: "Você superou as expectativas nesta entrega.",
        level: 'médio',
        context: 'Feedback',
        situations: [
          'Elogio especial: "You exceeded expectations on this deliverable. The quality was outstanding and delivered early."',
          'Review de projeto: "You exceeded expectations on this deliverable - both the client and I are very impressed."'
        ]
      },
      {
        english: "I'd like to see more initiative from you.",
        portuguese: "Gostaria de ver mais iniciativa de você.",
        level: 'médio',
        context: 'Feedback',
        situations: [
          'Desenvolvimento: "You\'re doing well with assigned tasks, but I\'d like to see more initiative from you in proposing solutions."',
          'One-on-one: "I\'d like to see more initiative from you when it comes to taking on new challenges and projects."'
        ]
      },
      {
        english: "Your communication skills have really improved.",
        portuguese: "Suas habilidades de comunicação realmente melhoraram.",
        level: 'médio',
        context: 'Feedback',
        situations: [
          'Reconhecendo progresso: "Your communication skills have really improved since we started working together."',
          'Review trimestral: "I wanted to highlight that your communication skills have really improved over the past quarter."'
        ]
      },
      {
        english: "Let's work on making your presentations more engaging.",
        portuguese: "Vamos trabalhar para tornar suas apresentações mais envolventes.",
        level: 'avançado',
        context: 'Feedback',
        situations: [
          'Desenvolvimento de habilidades: "Your content is solid, but let\'s work on making your presentations more engaging for the audience."',
          'Coaching: "Let\'s work on making your presentations more engaging by adding more stories and interactive elements."'
        ]
      },
      {
        english: "You have great potential for leadership.",
        portuguese: "Você tem grande potencial para liderança.",
        level: 'médio',
        context: 'Feedback',
        situations: [
          'Encorajamento: "You have great potential for leadership. I\'d like to see you take on more team coordination responsibilities."',
          'Planejamento de carreira: "You have great potential for leadership - let\'s discuss what development opportunities would help you grow."'
        ]
      },
      {
        english: "I'd like you to take ownership of this process.",
        portuguese: "Gostaria que você assumisse a responsabilidade por este processo.",
        level: 'avançado',
        context: 'Feedback',
        situations: [
          'Delegando responsabilidade: "I\'d like you to take ownership of this process from planning to execution."',
          'Desenvolvimento: "Moving forward, I\'d like you to take ownership of this process and make the key decisions."'
        ]
      },
      {
        english: "Your proactive approach is commendable.",
        portuguese: "Sua abordagem proativa é louvável.",
        level: 'avançado',
        context: 'Feedback'
      },
      {
        english: "Let's discuss areas for professional development.",
        portuguese: "Vamos discutir áreas para desenvolvimento profissional.",
        level: 'avançado',
        context: 'Feedback'
      },
      {
        english: "You're really hitting your stride now.",
        portuguese: "Você está realmente no seu melhor agora.",
        level: 'avançado',
        context: 'Feedback'
      },
      {
        english: "I'd like to see more collaboration with the team.",
        portuguese: "Gostaria de ver mais colaboração com a equipe.",
        level: 'médio',
        context: 'Feedback'
      },
      {
        english: "Your work quality is consistently high.",
        portuguese: "A qualidade do seu trabalho é consistentemente alta.",
        level: 'médio',
        context: 'Feedback'
      },
      {
        english: "You need to work on your time management.",
        portuguese: "Você precisa trabalhar na gestão do seu tempo.",
        level: 'médio',
        context: 'Feedback'
      },
      {
        english: "I'm impressed with your problem-solving skills.",
        portuguese: "Estou impressionado com suas habilidades de resolução de problemas.",
        level: 'médio',
        context: 'Feedback'
      },
      {
        english: "Let's set some SMART goals for next quarter.",
        portuguese: "Vamos definir algumas metas SMART para o próximo trimestre.",
        level: 'avançado',
        context: 'Feedback'
      },
      {
        english: "You're a valuable asset to the team.",
        portuguese: "Você é um recurso valioso para a equipe.",
        level: 'médio',
        context: 'Feedback'
      },
      {
        english: "I'd like to see you stretch yourself more.",
        portuguese: "Gostaria de ver você se desafiar mais.",
        level: 'avançado',
        context: 'Feedback'
      },
      {
        english: "Your growth mindset is really showing.",
        portuguese: "Sua mentalidade de crescimento está realmente aparecendo.",
        level: 'avançado',
        context: 'Feedback'
      },
      {
        english: "Let's work on building your confidence.",
        portuguese: "Vamos trabalhar para construir sua confiança.",
        level: 'médio',
        context: 'Feedback'
      },
      {
        english: "You're demonstrating real leadership potential.",
        portuguese: "Você está demonstrando real potencial de liderança.",
        level: 'avançado',
        context: 'Feedback'
      },
      {
        english: "I appreciate how you handle challenging situations.",
        portuguese: "Agradeço como você lida com situações desafiadoras.",
        level: 'avançado',
        context: 'Feedback'
      },
      {
        english: "Let's discuss your career aspirations.",
        portuguese: "Vamos discutir suas aspirações de carreira.",
        level: 'médio',
        context: 'Feedback'
      },

      // ========== CATEGORIA: NETWORKING (25 frases) ==========
      {
        english: "It's great to finally meet you in person.",
        portuguese: "É ótimo finalmente conhecê-lo pessoalmente.",
        level: 'básico',
        context: 'Networking',
        situations: [
          'Primeiro encontro presencial: "It\'s great to finally meet you in person after all our video calls and emails."',
          'Evento de networking: "It\'s great to finally meet you in person! I\'ve been following your company\'s work."'
        ]
      },
      {
        english: "I've heard great things about your work.",
        portuguese: "Ouvi coisas ótimas sobre seu trabalho.",
        level: 'médio',
        context: 'Networking',
        situations: [
          'Elogio inicial: "Hi Sarah, I\'ve heard great things about your work in digital marketing from mutual connections."',
          'Quebra-gelo: "I\'ve heard great things about your work on sustainability initiatives. I\'d love to learn more."'
        ]
      },
      {
        english: "What brings you to this event?",
        portuguese: "O que te trouxe a este evento?",
        level: 'básico',
        context: 'Networking',
        situations: [
          'Iniciando conversa: "Hi, I\'m John from TechCorp. What brings you to this event today?"',
          'Descobrindo interesses: "What brings you to this event? Are you looking for new partnerships or clients?"'
        ]
      },
      {
        english: "I'd love to learn more about your company.",
        portuguese: "Adoraria saber mais sobre sua empresa.",
        level: 'básico',
        context: 'Networking',
        situations: [
          'Interesse genuino: "Your business model sounds fascinating. I\'d love to learn more about your company and how you got started."',
          'Explorando parceria: "I\'d love to learn more about your company - it seems like we might have some complementary services."'
        ]
      },
      {
        english: "We should definitely stay in touch.",
        portuguese: "Definitivamente devemos manter contato.",
        level: 'básico',
        context: 'Networking',
        situations: [
          'Encerrando conversa positiva: "This has been such an insightful conversation. We should definitely stay in touch."',
          'Potencial colaboração: "I see several ways we could work together. We should definitely stay in touch about potential opportunities."'
        ]
      },
      {
        english: "Do you have a business card?",
        portuguese: "Você tem cartão de visita?",
        level: 'básico',
        context: 'Networking',
        situations: [
          'Trocando contatos: "This was a great conversation. Do you have a business card so we can connect later?"',
          'Final de networking: "I\'d love to follow up with you next week. Do you have a business card?"'
        ]
      },
      {
        english: "I think there might be some synergies between our companies.",
        portuguese: "Acho que pode haver algumas sinergias entre nossas empresas.",
        level: 'avançado',
        context: 'Networking',
        situations: [
          'Explorando parceria: "Based on what you\'ve told me, I think there might be some synergies between our companies."',
          'Propondo colaboração: "I think there might be some synergies between our companies - perhaps we could explore a partnership."'
        ]
      },
      {
        english: "I'd like to introduce you to someone.",
        portuguese: "Gostaria de apresentá-lo a alguém.",
        level: 'básico',
        context: 'Networking',
        situations: [
          'Facilitando conexões: "I\'d like to introduce you to someone who works in your industry - I think you\'d get along well."',
          'Networking ativo: "There\'s someone here I\'d like to introduce you to. She\'s facing similar challenges in her business."'
        ]
      },
      {
        english: "What's your take on the industry trends?",
        portuguese: "Qual sua opinião sobre as tendências da indústria?",
        level: 'médio',
        context: 'Networking',
        situations: [
          'Conversa técnica: "What\'s your take on the industry trends? I\'m curious about your perspective on AI adoption."',
          'Buscando insights: "You have so much experience in this field. What\'s your take on the industry trends we\'re seeing?"'
        ]
      },
      {
        english: "I'm always looking to expand my professional network.",
        portuguese: "Estou sempre procurando expandir minha rede profissional.",
        level: 'médio',
        context: 'Networking',
        situations: [
          'Sendo direto: "I\'m always looking to expand my professional network and meet people in different industries."',
          'Explicando presença: "I\'m always looking to expand my professional network, which is why I try to attend these events regularly."'
        ]
      },
      {
        english: "Your presentation was really insightful.",
        portuguese: "Sua apresentação foi realmente perspicaz.",
        level: 'médio',
        context: 'Networking'
      },
      {
        english: "I'd love to explore potential collaboration opportunities.",
        portuguese: "Adoraria explorar oportunidades de colaboração potenciais.",
        level: 'avançado',
        context: 'Networking'
      },
      {
        english: "What challenges are you facing in your role?",
        portuguese: "Que desafios você está enfrentando em seu cargo?",
        level: 'médio',
        context: 'Networking'
      },
      {
        english: "I think we could learn a lot from each other.",
        portuguese: "Acho que poderíamos aprender muito um com o outro.",
        level: 'médio',
        context: 'Networking'
      },
      {
        english: "Let's schedule a coffee meeting next week.",
        portuguese: "Vamos agendar um café na próxima semana.",
        level: 'básico',
        context: 'Networking'
      },
      {
        english: "I'm connected with you on LinkedIn now.",
        portuguese: "Agora estou conectado com você no LinkedIn.",
        level: 'básico',
        context: 'Networking'
      },
      {
        english: "What's your biggest priority this quarter?",
        portuguese: "Qual sua maior prioridade neste trimestre?",
        level: 'médio',
        context: 'Networking'
      },
      {
        english: "I'd be happy to make some introductions for you.",
        portuguese: "Ficaria feliz em fazer algumas apresentações para você.",
        level: 'médio',
        context: 'Networking'
      },
      {
        english: "Your expertise in this area is impressive.",
        portuguese: "Sua expertise nesta área é impressionante.",
        level: 'médio',
        context: 'Networking'
      },
      {
        english: "I think you'd be a great addition to our advisory board.",
        portuguese: "Acho que você seria uma ótima adição ao nosso conselho consultivo.",
        level: 'avançado',
        context: 'Networking'
      },
      {
        english: "What's your secret to success in this field?",
        portuguese: "Qual seu segredo para o sucesso neste campo?",
        level: 'médio',
        context: 'Networking'
      },
      {
        english: "I'd love to pick your brain about this topic.",
        portuguese: "Adoraria explorar suas ideias sobre este tópico.",
        level: 'avançado',
        context: 'Networking'
      },
      {
        english: "Thanks for sharing your insights with me.",
        portuguese: "Obrigado por compartilhar suas percepções comigo.",
        level: 'médio',
        context: 'Networking'
      },
      {
        english: "I think our paths will cross again soon.",
        portuguese: "Acho que nossos caminhos se cruzarão novamente em breve.",
        level: 'médio',
        context: 'Networking'
      },
      {
        english: "Let's keep the conversation going via email.",
        portuguese: "Vamos continuar a conversa por email.",
        level: 'básico',
        context: 'Networking'
      },

      // ========== CATEGORIA: NEGOCIAÇÃO (25 frases) ==========
      {
        english: "Let's find a win-win solution.",
        portuguese: "Vamos encontrar uma solução ganha-ganha.",
        level: 'médio',
        context: 'Negociação',
        situations: [
          'Resolvendo impasse: "I can see both sides have valid concerns. Let\'s find a win-win solution that works for everyone."',
          'Negociação de contrato: "Instead of arguing about price, let\'s find a win-win solution that provides value to both companies."'
        ]
      },
      {
        english: "I think we can work something out.",
        portuguese: "Acho que podemos chegar a um acordo.",
        level: 'médio',
        context: 'Negociação',
        situations: [
          'Otimismo na negociação: "This seems complicated, but I think we can work something out if we\'re both flexible."',
          'Resolvendo diferenças: "I think we can work something out. Let me see what options I have on my end."'
        ]
      },
      {
        english: "What's your bottom line on this?",
        portuguese: "Qual seu limite mínimo nisto?",
        level: 'avançado',
        context: 'Negociação',
        situations: [
          'Pergunta direta: "We\'ve been going back and forth on price. What\'s your bottom line on this deal?"',
          'Buscando clareza: "Before we continue negotiating, what\'s your bottom line on this? I want to know if we\'re in the same ballpark."'
        ]
      },
      {
        english: "I'd like to propose a different approach.",
        portuguese: "Gostaria de propor uma abordagem diferente.",
        level: 'médio',
        context: 'Negociação',
        situations: [
          'Mudando estratégia: "This isn\'t working for either of us. I\'d like to propose a different approach to this negotiation."',
          'Criatividade na negociação: "I\'d like to propose a different approach - what if we structure the payment terms differently?"'
        ]
      },
      {
        english: "Can we meet somewhere in the middle?",
        portuguese: "Podemos nos encontrar no meio do caminho?",
        level: 'médio',
        context: 'Negociação',
        situations: [
          'Compromisso: "You\'re asking for $10k and I\'m offering $8k. Can we meet somewhere in the middle?"',
          'Buscando acordo: "We both need to give a little. Can we meet somewhere in the middle on these terms?"'
        ]
      },
      {
        english: "I need to run this by my team first.",
        portuguese: "Preciso passar isso pela minha equipe primeiro.",
        level: 'médio',
        context: 'Negociação',
        situations: [
          'Ganhando tempo: "This sounds interesting, but I need to run this by my team first before I can commit."',
          'Decisão importante: "I need to run this by my team first. Can we schedule a follow-up meeting next week?"'
        ]
      },
      {
        english: "Let's explore some alternative options.",
        portuguese: "Vamos explorar algumas opções alternativas.",
        level: 'médio',
        context: 'Negociação',
        situations: [
          'Buscando soluções: "The current proposal isn\'t working for us. Let\'s explore some alternative options."',
          'Criatividade na negociação: "Let\'s explore some alternative options that could benefit both parties."'
        ]
      },
      {
        english: "I'm willing to be flexible on the terms.",
        portuguese: "Estou disposto a ser flexível nos termos.",
        level: 'médio',
        context: 'Negociação',
        situations: [
          'Mostrando abertura: "I want to make this work. I\'m willing to be flexible on the terms if you can meet our main requirements."',
          'Fechando negócio: "I\'m willing to be flexible on the terms, but the timeline is non-negotiable for us."'
        ]
      },
      {
        english: "That's outside our budget range.",
        portuguese: "Isso está fora da nossa faixa orçamentária.",
        level: 'básico',
        context: 'Negociação',
        situations: [
          'Rejeitando preço: "I appreciate the proposal, but that\'s outside our budget range. Can you work with $10,000?"',
          'Sendo direto: "That\'s outside our budget range. What\'s the best price you can offer?"'
        ]
      },
      {
        english: "Can we structure this as a phased approach?",
        portuguese: "Podemos estruturar isso como uma abordagem em fases?",
        level: 'avançado',
        context: 'Negociação',
        situations: [
          'Reduzindo risco: "This is a big investment for us. Can we structure this as a phased approach to minimize risk?"',
          'Proposta criativa: "Can we structure this as a phased approach? Start with a pilot and expand based on results?"'
        ]
      },
      {
        english: "I need to understand the value proposition better.",
        portuguese: "Preciso entender melhor a proposta de valor.",
        level: 'avançado',
        context: 'Negociação',
        situations: [
          'Antes de decidir: "The price seems high for what you’re offering. I need to understand the value proposition better before we proceed."',
          'Comparando opções: "I’ve seen similar solutions for less money. Can you help me understand the value proposition better?"'
        ]
      },
      {
        english: "Let's put our cards on the table.",
        portuguese: "Vamos colocar as cartas na mesa.",
        level: 'avançado',
        context: 'Negociação',
        situations: [
          'Sendo direto: "We’ve been dancing around this for hours. Let’s put our cards on the table and talk real numbers."',
          'Buscando transparência: "I think we’re both wasting time. Let’s put our cards on the table about what we really need."'
        ]
      },
      {
        english: "I'm not comfortable with those terms.",
        portuguese: "Não me sinto confortável com esses termos.",
        level: 'médio',
        context: 'Negociação',
        situations: [
          'Rejeitando educadamente: "I appreciate the offer, but I’m not comfortable with those terms. Can we discuss alternatives?"',
          'Expressando preocupação: "The payment schedule is too aggressive. I’m not comfortable with those terms for this project."'
        ]
      },
      {
        english: "Can we revisit the pricing structure?",
        portuguese: "Podemos revisar a estrutura de preços?",
        level: 'médio',
        context: 'Negociação',
        situations: [
          'Questionando preços: "The upfront cost is too high for our budget. Can we revisit the pricing structure with monthly payments?"',
          'Buscando flexibilidade: "I like the proposal, but the pricing doesn’t work for us. Can we revisit the pricing structure?"'
        ]
      },
      {
        english: "I think we're close to a deal.",
        portuguese: "Acho que estamos perto de um acordo.",
        level: 'médio',
        context: 'Negociação',
        situations: [
          'Otimismo na conclusão: "We’ve resolved most of the major issues. I think we’re close to a deal - what do you think?"',
          'Encorajando acordo: "Both sides have made good compromises. I think we’re close to a deal that works for everyone."'
        ]
      },
      {
        english: "Let's iron out the details.",
        portuguese: "Vamos resolver os detalhes.",
        level: 'avançado',
        context: 'Negociação',
        situations: [
          'Finalizando acordo: "Great! We have agreement on the main terms. Now let’s iron out the details like delivery dates and payment schedule."',
          'Próximos passos: "The concept looks good to both parties. Let’s iron out the details so we can get contracts signed."'
        ]
      },
      {
        english: "I'd like to sweeten the deal.",
        portuguese: "Gostaria de melhorar a oferta.",
        level: 'avançado',
        context: 'Negociação',
        situations: [
          'Adicionando valor: "I can see you’re hesitating. I’d like to sweeten the deal by including free training for your team."',
          'Fechando negócio: "To get this deal done today, I’d like to sweeten the deal with an additional 10% discount."'
        ]
      },
      {
        english: "That's a deal-breaker for us.",
        portuguese: "Isso é um impedimento para nós.",
        level: 'avançado',
        context: 'Negociação',
        situations: [
          'Linha vermelha: "I’m sorry, but requiring exclusivity for 5 years - that’s a deal-breaker for us."',
          'Sendo claro: "We can negotiate on many things, but changing our core methodology - that’s a deal-breaker for us."'
        ]
      },
      {
        english: "Can we include some performance incentives?",
        portuguese: "Podemos incluir alguns incentivos de performance?",
        level: 'avançado',
        context: 'Negociação',
        situations: [
          'Estruturando acordo: "The base rate works for us. Can we include some performance incentives for exceeding targets?"',
          'Motivando resultado: "I want us both to win. Can we include some performance incentives tied to specific outcomes?"'
        ]
      },
      {
        english: "I need some time to think this over.",
        portuguese: "Preciso de um tempo para pensar sobre isso.",
        level: 'básico',
        context: 'Negociação',
        situations: [
          'Precisando refletir: "This is a big decision for our company. I need some time to think this over before committing."',
          'Consultando equipe: "The proposal looks interesting, but I need some time to think this over and discuss with my team."'
        ]
      },
      {
        english: "Let's draft a preliminary agreement.",
        portuguese: "Vamos rascunhar um acordo preliminar.",
        level: 'avançado',
        context: 'Negociação',
        situations: [
          'Avançando no processo: "I think we’re aligned on the main points. Let’s draft a preliminary agreement to formalize this."',
          'Próximo passo: "Great progress today! Should we let the lawyers draft a preliminary agreement based on what we’ve discussed?"'
        ]
      },
      {
        english: "I think we can make this work.",
        portuguese: "Acho que podemos fazer isso funcionar.",
        level: 'básico',
        context: 'Negociação',
        situations: [
          'Mostrando interesse: "Your proposal needs some adjustments, but I think we can make this work if we’re both flexible."',
          'Otimismo cauteloso: "There are still some challenges, but I think we can make this work with the right approach."'
        ]
      },
      {
        english: "What are your non-negotiables?",
        portuguese: "Quais são seus pontos inegociáveis?",
        level: 'avançado',
        context: 'Negociação',
        situations: [
          'Entendendo limites: "Before we go further, let me ask: what are your non-negotiables? I want to respect your boundaries."',
          'Evitando perda de tempo: "Let\'s be efficient about this. What are your non-negotiables so we can focus on areas with flexibility?"'
        ]
      },
      {
        english: "Let's shake on it.",
        portuguese: "Vamos apertar as mãos.",
        level: 'básico',
        context: 'Negociação',
        situations: [
          'Fechando acordo: "Perfect! We have a deal then. Let\'s shake on it before we call the lawyers."',
          'Confirmando acordo: "I think we\'ve covered everything important. Let\'s shake on it and move forward with the partnership."'
        ]
      },
      {
        english: "I'm confident we can reach an agreement.",
        portuguese: "Estou confiante de que podemos chegar a um acordo.",
        level: 'médio',
        context: 'Negociação',
        situations: [
          'Finalizando negociação: "We’ve made great progress today. I’m confident we can reach an agreement that works for both companies."',
          'Encorajando parceiro: "I know there are still some details to work out, but I’m confident we can reach an agreement soon."'
        ]
      },

      // ========== CATEGORIA: GESTÃO DE TEMPO (20 frases) ==========
      {
        english: "I'm running behind schedule today.",
        portuguese: "Estou atrasado na programação hoje.",
        level: 'básico',
        context: 'Gestão de tempo',
        situations: [
          'Explicando atraso: "Sorry I\'m late to the meeting. I\'m running behind schedule today due to an urgent client call."',
          'Reorganizando agenda: "I\'m running behind schedule today. Can we reschedule our 3 PM meeting to tomorrow?"'
        ]
      },
      {
        english: "Can we push this meeting back 30 minutes?",
        portuguese: "Podemos adiar esta reunião por 30 minutos?",
        level: 'básico',
        context: 'Gestão de tempo',
        situations: [
          'Conflito de horário: "My previous meeting is running long. Can we push this meeting back 30 minutes?"',
          'Preparando melhor: "I need more time to prepare the presentation. Can we push this meeting back 30 minutes?"'
        ]
      },
      {
        english: "I need to prioritize my tasks for today.",
        portuguese: "Preciso priorizar minhas tarefas para hoje.",
        level: 'básico',
        context: 'Gestão de tempo',
        situations: [
          'Planejando o dia: "I have too many things on my plate. I need to prioritize my tasks for today."',
          'Conversando com chefe: "With the new urgent project, I need to prioritize my tasks for today. What should I focus on first?"'
        ]
      },
      {
        english: "Let's do a quick time check.",
        portuguese: "Vamos fazer uma verificação rápida do tempo.",
        level: 'básico',
        context: 'Gestão de tempo',
        situations: [
          'Durante reunião longa: "We\'ve been discussing this for a while. Let\'s do a quick time check - we have 15 minutes left."',
          'Controlando agenda: "Before we move to the next topic, let\'s do a quick time check to make sure we stay on track."'
        ]
      },
      {
        english: "I'm blocked until I get approval on this.",
        portuguese: "Estou bloqueado até conseguir aprovação nisto.",
        level: 'médio',
        context: 'Gestão de tempo',
        situations: [
          'Explicando atraso: "I can\'t proceed with the next phase because I\'m blocked until I get approval on this budget."',
          'Status update: "The project is on hold - I\'m blocked until I get approval on this new requirement from legal."'
        ]
      },
      {
        english: "Can we timebox this discussion to 15 minutes?",
        portuguese: "Podemos limitar esta discussão a 15 minutos?",
        level: 'avançado',
        context: 'Gestão de tempo',
        situations: [
          'Controlando reunião: "This topic could go on forever. Can we timebox this discussion to 15 minutes and make a decision?"',
          'Agenda apertada: "We have several topics to cover. Can we timebox this discussion to 15 minutes so we don\'t run over?"'
        ]
      },
      {
        english: "I'm trying to batch similar tasks together.",
        portuguese: "Estou tentando agrupar tarefas similares.",
        level: 'avançado',
        context: 'Gestão de tempo',
        situations: [
          'Explicando método: "To be more efficient, I\'m trying to batch similar tasks together - like doing all my emails at once."',
          'Otimizando tempo: "Instead of switching between different types of work, I\'m trying to batch similar tasks together."'
        ]
      },
      {
        english: "This is eating up too much of my bandwidth.",
        portuguese: "Isso está consumindo muito do meu tempo.",
        level: 'avançado',
        context: 'Gestão de tempo',
        situations: [
          'Sobrecarga de trabalho: "These daily status meetings are eating up too much of my bandwidth. Can we make them weekly?"',
          'Pedindo ajuda: "This administrative work is eating up too much of my bandwidth. Can someone else handle it?"'
        ]
      },
      {
        english: "Let's set a realistic timeline for this project.",
        portuguese: "Vamos definir um cronograma realista para este projeto.",
        level: 'médio',
        context: 'Gestão de tempo',
        situations: [
          'Planejamento inicial: "Before we start, let’s set a realistic timeline for this project based on our available resources."',
          'Ajustando expectativas: "The client wants it in 2 weeks, but let’s set a realistic timeline for this project - I think we need 4 weeks."'
        ]
      },
      {
        english: "I need to block off some focus time.",
        portuguese: "Preciso reservar um tempo para concentração.",
        level: 'médio',
        context: 'Gestão de tempo',
        situations: [
          'Pedindo espaço: "I have a complex report to write. I need to block off some focus time this afternoon with no meetings."',
          'Gerenciando interrupções: "These constant emails are killing my productivity. I need to block off some focus time to get this done."'
        ]
      },
      {
        english: "Can we fast-track this process?",
        portuguese: "Podemos acelerar este processo?",
        level: 'médio',
        context: 'Gestão de tempo',
        situations: [
          'Urgência: "We have a tight deadline from the client. Can we fast-track this process by skipping some of the usual reviews?"',
          'Oportunidade: "This could be a game-changer for us. Can we fast-track this process to get to market before competitors?"'
        ]
      },
      {
        english: "I'm trying to optimize my workflow.",
        portuguese: "Estou tentando otimizar meu fluxo de trabalho.",
        level: 'avançado',
        context: 'Gestão de tempo',
        situations: [
          'Melhoria contínua: "I’m trying to optimize my workflow by using automation tools for repetitive tasks."',
          'Explicando mudanças: "I’m trying to optimize my workflow, so I’ll be organizing my tasks differently starting next week."'
        ]
      },
      {
        english: "Let's identify the critical path.",
        portuguese: "Vamos identificar o caminho crítico.",
        level: 'avançado',
        context: 'Gestão de tempo',
        situations: [
          'Planejamento de projeto: "We have multiple dependencies here. Let’s identify the critical path so we know where delays will hurt us most."',
          'Priorizando tarefas: "Time is running short. Let’s identify the critical path and focus our resources on those essential tasks."'
        ]
      },
      {
        english: "I need to delegate some of these tasks.",
        portuguese: "Preciso delegar algumas dessas tarefas.",
        level: 'médio',
        context: 'Gestão de tempo',
        situations: [
          'Sobrecarga: "I’m completely swamped this week. I need to delegate some of these tasks to keep the project on track."',
          'Desenvolvimento da equipe: "To help the team grow, I need to delegate some of these tasks and give others more responsibility."'
        ]
      },
      {
        english: "Can we run these processes in parallel?",
        portuguese: "Podemos executar esses processos em paralelo?",
        level: 'avançado',
        context: 'Gestão de tempo',
        situations: [
          'Otimizando tempo: "Instead of doing design then development sequentially, can we run these processes in parallel to save time?"',
          'Acelerar projeto: "We’re behind schedule. Can we run these processes in parallel instead of waiting for each phase to complete?"'
        ]
      },
      {
        english: "I'm trying to minimize context switching.",
        portuguese: "Estou tentando minimizar a troca de contexto.",
        level: 'avançado',
        context: 'Gestão de tempo',
        situations: [
          'Explicando método: "I’m trying to minimize context switching by working on similar tasks in blocks rather than jumping between projects."',
          'Pedindo concentração: "I’m trying to minimize context switching today, so can we schedule all my calls back-to-back this afternoon?"'
        ]
      },
      {
        english: "Let's establish some buffer time.",
        portuguese: "Vamos estabelecer um tempo de folga.",
        level: 'médio',
        context: 'Gestão de tempo',
        situations: [
          'Planejamento conservador: "This timeline looks tight. Let’s establish some buffer time in case we run into unexpected issues."',
          'Gestão de risco: "Given the complexity of this project, let’s establish some buffer time between major milestones."'
        ]
      },
      {
        english: "I need to reschedule our one-on-one.",
        portuguese: "Preciso reagendar nossa reunião individual.",
        level: 'básico',
        context: 'Gestão de tempo',
        situations: [
          'Conflito de agenda: "Something urgent came up. I need to reschedule our one-on-one from Thursday to Friday."',
          'Viagem de trabalho: "I’ll be traveling next week. I need to reschedule our one-on-one to the week after."'
        ]
      },
      {
        english: "Can we compress the timeline?",
        portuguese: "Podemos comprimir o cronograma?",
        level: 'médio',
        context: 'Gestão de tempo',
        situations: [
          'Pressão de prazo: "The client moved up the launch date. Can we compress the timeline without sacrificing quality?"',
          'Oportunidade urgente: "We have a chance to beat competitors to market. Can we compress the timeline for this feature?"'
        ]
      },
      {
        english: "I'm working to eliminate time wasters.",
        portuguese: "Estou trabalhando para eliminar desperdiçadores de tempo.",
        level: 'avançado',
        context: 'Gestão de tempo',
        situations: [
          'Melhoria de produtividade: "I’m working to eliminate time wasters like unnecessary meetings and excessive email checking."',
          'Otimização pessoal: "To be more effective, I’m working to eliminate time wasters and focus on high-impact activities."'
        ]
      }
    ],
    exercises: [
      {
        id: 'trabalho-ex-1',
        correctSentence: 'Good morning team!',
        words: ['Good', 'morning', 'team!'],
        translation: 'Bom dia, equipe!'
      },
      {
        id: 'trabalho-ex-2',
        correctSentence: 'Can we schedule a meeting?',
        words: ['Can', 'we', 'schedule', 'a', 'meeting?'],
        translation: 'Podemos agendar uma reunião?'
      },
      {
        id: 'trabalho-ex-3',
        correctSentence: 'I need to finish this report.',
        words: ['I', 'need', 'to', 'finish', 'this', 'report.'],
        translation: 'Preciso terminar este relatório.'
      },
      {
        id: 'trabalho-ex-4',
        correctSentence: 'What is our deadline?',
        words: ['What', 'is', 'our', 'deadline?'],
        translation: 'Qual é nosso prazo?'
      },
      {
        id: 'trabalho-ex-5',
        correctSentence: 'Great job everyone!',
        words: ['Great', 'job', 'everyone!'],
        translation: 'Ótimo trabalho pessoal!'
      }
    ]
  },
  viagens: {
    title: 'Inglês para Viagens',
    icon: '✈️',
    description: 'Frases essenciais para aeroporto, hotel, restaurante e turismo',
    phrases: [
      // ========== FRASES FREE (10) ==========
      {
        english: "Where is the boarding gate for flight AA123?",
        portuguese: "Onde fica o portão de embarque do voo AA123?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Chegando no aeroporto: "Excuse me, where is the boarding gate for flight AA123? I can\'t find it on the departure board."',
          'Com pressa: "Where is the boarding gate for flight AA123? My boarding time is in 20 minutes and I\'m lost."'
        ]
      },
      {
        english: "I'd like to check in, please.",
        portuguese: "Gostaria de fazer o check-in, por favor.",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Na recepção: "Good afternoon, I\'d like to check in, please. I have a reservation under the name Smith."',
          'Chegando ao hotel: "Hi, I\'d like to check in, please. I booked a room online for tonight."'
        ]
      },
      {
        english: "Is breakfast included in the room rate?",
        portuguese: "O café da manhã está incluso na diária?",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Verificando amenidades: "Is breakfast included in the room rate, or do I need to pay extra for it?"',
          'Planejando orçamento: "Before I confirm, is breakfast included in the room rate? I want to know the total cost."'
        ]
      },
      {
        english: "Could you recommend a good restaurant nearby?",
        portuguese: "Você poderia recomendar um bom restaurante aqui perto?",
        level: 'básico',
        context: 'Recomendação',
        situations: [
          'Ao concierge: "Could you recommend a good restaurant nearby? I\'m looking for local cuisine, not tourist traps."',
          'Procurando jantar: "Could you recommend a good restaurant nearby that\'s within walking distance?"'
        ]
      },
      {
        english: "How much does a taxi to downtown cost?",
        portuguese: "Quanto custa um táxi para o centro?",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'Planejando transporte: "How much does a taxi to downtown cost? Is it cheaper than taking the metro?"',
          'No hotel: "How much does a taxi to downtown cost from here? I need to budget for transportation."'
        ]
      },
      {
        english: "I need to exchange some money.",
        portuguese: "Preciso trocar um pouco de dinheiro.",
        level: 'básico',
        context: 'Câmbio',
        situations: [
          'No banco: "I need to exchange some money. What\'s the current exchange rate for US dollars to euros?"',
          'Em viagem: "I need to exchange some money. Where\'s the nearest currency exchange office?"'
        ]
      },
      {
        english: "What time does the museum close?",
        portuguese: "Que horas o museu fecha?",
        level: 'básico',
        context: 'Turismo',
        situations: [
          'Planejando visita: "What time does the museum close today? I want to make sure I have enough time to see everything."',
          'Na entrada: "What time does the museum close? I\'d like to know how long I can stay."'
        ]
      },
      {
        english: "Is there a pharmacy around here?",
        portuguese: "Há uma farmácia aqui por perto?",
        level: 'básico',
        context: 'Emergência',
        situations: [
          'Precisando remédio: "Is there a pharmacy around here? I need to buy some pain medication."',
          'Emergência: "Is there a pharmacy around here that\'s open 24 hours? I need medicine urgently."'
        ]
      },
      {
        english: "Can I get a receipt, please?",
        portuguese: "Posso pegar um recibo, por favor?",
        level: 'básico',
        context: 'Compras',
        situations: [
          'Após compra: "Can I get a receipt, please? I need it for my expense report."',
          'Para garantia: "Can I get a receipt, please? I want to keep it in case I need to return the item."'
        ]
      },
      {
        english: "I'm looking for the tourist information center.",
        portuguese: "Estou procurando o centro de informações turísticas.",
        level: 'médio',
        context: 'Orientação',
        situations: [
          'Chegando na cidade: "Excuse me, I\'m looking for the tourist information center. Can you point me in the right direction?"',
          'Precisando de mapas: "I\'m looking for the tourist information center. I need city maps and attraction brochures."'
        ]
      },

      // ========== CATEGORIA: AEROPORTO (35 frases) ==========
      {
        english: "I'd like to check in for my flight.",
        portuguese: "Gostaria de fazer o check-in para meu voo.",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'No balcão da companhia: "Good morning, I\'d like to check in for my flight to New York, please."',
          'Check-in automático: "I\'m having trouble with the machine. I\'d like to check in for my flight - can you help me?"'
        ]
      },
      {
        english: "Can I have an aisle seat, please?",
        portuguese: "Posso ter um assento no corredor, por favor?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Durante check-in: "Can I have an aisle seat, please? I have long legs and need the extra space."',
          'Mudando assento: "I see my boarding pass shows a middle seat. Can I have an aisle seat, please?"'
        ]
      },
      {
        english: "How many bags can I check in?",
        portuguese: "Quantas bagagens posso despachar?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'No check-in: "I have three bags with me. How many bags can I check in with this ticket?"',
          'Confirmando limite: "How many bags can I check in for free? And what\'s the charge for additional bags?"'
        ]
      },
      {
        english: "Is this carry-on allowed?",
        portuguese: "Esta bagagem de mão é permitida?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Na segurança: "Is this carry-on allowed on the plane? It\'s slightly larger than usual."',
          'Verificando regras: "I\'m not sure about the size restrictions. Is this carry-on allowed?"'
        ]
      },
      {
        english: "Where is the security checkpoint?",
        portuguese: "Onde fica o controle de segurança?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Perdido no aeroporto: "Excuse me, where is the security checkpoint? I need to get to gate B12."',
          'Primeira vez: "I\'m new to this airport. Where is the security checkpoint for international flights?"'
        ]
      },
      {
        english: "I need to declare these items.",
        portuguese: "Preciso declarar esses itens.",
        level: 'médio',
        context: 'Aeroporto',
        situations: [
          'Na alfândega: "I have some expensive electronics with me. I need to declare these items."',
          'Trazendo presentes: "I brought gifts worth over $500 from abroad. I need to declare these items."'
        ]
      },
      {
        english: "My flight has been delayed.",
        portuguese: "Meu voo foi atrasado.",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Informando companheiro: "I just got a notification. My flight has been delayed by 2 hours due to bad weather."',
          'Perguntando detalhes: "The board shows my flight has been delayed. Do you know how long the delay will be?"'
        ]
      },
      {
        english: "Where can I find the departure lounge?",
        portuguese: "Onde posso encontrar a sala de embarque?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Após segurança: "I’ve just passed through security. Where can I find the departure lounge for gate A15?"',
          'Primeira viagem: "This is my first time flying. Where can I find the departure lounge? I have 2 hours to wait."'
        ]
      },
      {
        english: "Is there free WiFi at the airport?",
        portuguese: "Há WiFi gratuito no aeroporto?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Precisando trabalhar: "I need to check my emails during the layover. Is there free WiFi at the airport?"',
          'No balcão de informações: "Excuse me, is there free WiFi at the airport? I need to video call my family."'
        ]
      },
      {
        english: "I missed my connecting flight.",
        portuguese: "Perdi meu voo de conexão.",
        level: 'médio',
        context: 'Aeroporto',
        situations: [
          'Situação urgente: "The first flight was delayed and I missed my connecting flight. What are my options?"',
          'Pedindo ajuda: "I’m really stressed. I missed my connecting flight to London. Can you help me get on the next one?"'
        ]
      },
      {
        english: "Can you help me with rebooking?",
        portuguese: "Você pode me ajudar com a remarcação?",
        level: 'médio',
        context: 'Aeroporto',
        situations: [
          'Voo cancelado: "My flight was cancelled due to the storm. Can you help me with rebooking on the next available flight?"',
          'Emergência familiar: "I have a family emergency and need to fly out earlier. Can you help me with rebooking?"'
        ]
      },
      {
        english: "Where is the baggage claim area?",
        portuguese: "Onde fica a área de retirada de bagagem?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Chegando no destino: "I’ve just landed and this is my first time here. Where is the baggage claim area?"',
          'Perguntando na imigração: "After I finish here, where is the baggage claim area? I need to collect my suitcase."'
        ]
      },
      {
        english: "My luggage didn't arrive.",
        portuguese: "Minha bagagem não chegou.",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Na esteira de bagagem: "I’ve been waiting for 30 minutes but my luggage didn’t arrive. What should I do?"',
          'Reportando problema: "My luggage didn’t arrive on flight AA123 from New York. Can you help me locate it?"'
        ]
      },
      {
        english: "I need to file a lost luggage report.",
        portuguese: "Preciso registrar um relatório de bagagem perdida.",
        level: 'médio',
        context: 'Aeroporto',
        situations: [
          'Bagagem perdida: "My suitcase never showed up on the carousel. I need to file a lost luggage report."',
          'Para seguro: "I need to file a lost luggage report for insurance purposes. Where do I go?"'
        ]
      },
      {
        english: "What's the boarding time?",
        portuguese: "Qual é o horário de embarque?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Verificando horários: "My boarding pass says departure at 3:15. What’s the boarding time?"',
          'Planejando tempo: "I want to grab some food before my flight. What’s the boarding time for flight 456?"'
        ]
      },
      {
        english: "Is the flight on time?",
        portuguese: "O voo está no horário?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Verificando status: "I see some weather alerts on the news. Is the flight on time?"',
          'No portão: "The departure board shows my gate, but is the flight on time? I don’t want to miss it."'
        ]
      },
      {
        english: "I'd like to upgrade to business class.",
        portuguese: "Gostaria de fazer upgrade para classe executiva.",
        level: 'médio',
        context: 'Aeroporto',
        situations: [
          'No check-in: "It’s a long flight and I’d like to upgrade to business class. Are there any seats available?"',
          'Usando milhas: "I have frequent flyer miles. I’d like to upgrade to business class if possible."'
        ]
      },
      {
        english: "Where can I get a trolley?",
        portuguese: "Onde posso pegar um carrinho?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Chegada com bagagem: "I have three heavy suitcases. Where can I get a trolley to help carry them?"',
          'Chegando no aeroporto: "Where can I get a trolley? I need to transport my luggage to the check-in counter."'
        ]
      },
      {
        english: "Is there a duty-free shop here?",
        portuguese: "Há uma loja duty-free aqui?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Procurando presenças: "I want to buy some gifts before my flight. Is there a duty-free shop here?"',
          'Comprando perfume: "Is there a duty-free shop here? I need to buy some perfume that’s cheaper than at home."'
        ]
      },
      {
        english: "I need assistance with my wheelchair.",
        portuguese: "Preciso de assistência com minha cadeira de rodas.",
        level: 'médio',
        context: 'Aeroporto',
        situations: [
          'Chegada no aeroporto: "Hello, I need assistance with my wheelchair. Can someone help me get to my gate?"',
          'Solicitando serviço: "I need assistance with my wheelchair throughout the airport. Where do I request this service?"'
        ]
      },
      {
        english: "Can I change my seat assignment?",
        portuguese: "Posso mudar minha designação de assento?",
        level: 'médio',
        context: 'Aeroporto',
        situations: [
          'Assento indesejado: "I’m in a middle seat between two strangers. Can I change my seat assignment?"',
          'Viajando em grupo: "My family got separated. Can I change my seat assignment to sit together?"'
        ]
      },
      {
        english: "Where is the nearest restroom?",
        portuguese: "Onde fica o banheiro mais próximo?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Urgência pessoal: "Excuse me, this is urgent. Where is the nearest restroom?"',
          'Com crianças: "My child needs to use the bathroom. Where is the nearest restroom?"'
        ]
      },
      {
        english: "I need to page someone.",
        portuguese: "Preciso chamar alguém pelo alto-falante.",
        level: 'avançado',
        context: 'Aeroporto',
        situations: [
          'Pessoa perdida: "My friend is lost somewhere in the airport. I need to page someone - can you help?"',
          'Encontro no aeroporto: "I’m supposed to meet my colleague here but can’t find him. I need to page someone."'
        ]
      },
      {
        english: "What's the weight limit for checked bags?",
        portuguese: "Qual é o limite de peso para bagagens despachadas?",
        level: 'médio',
        context: 'Aeroporto',
        situations: [
          'Verificando antes de despachar: "Before I check this suitcase, what’s the weight limit for checked bags?"',
          'Evitando taxa extra: "What’s the weight limit for checked bags? I don’t want to pay overweight fees."'
        ]
      },
      {
        english: "I have a layover here.",
        portuguese: "Tenho uma escala aqui.",
        level: 'médio',
        context: 'Aeroporto',
        situations: [
          'Explicando situação: "I’m not staying in the city - I have a layover here for 4 hours before my next flight."',
          'Perguntando sobre serviços: "I have a layover here for 6 hours. Are there places to rest or shower in the airport?"'
        ]
      },
      {
        english: "Where can I store my luggage?",
        portuguese: "Onde posso guardar minha bagagem?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Longa conexão: "I have an 8-hour layover and want to explore the city. Where can I store my luggage?"',
          'Check-in não aberto: "My flight isn’t until tonight but I have to leave my hotel now. Where can I store my luggage?"'
        ]
      },
      {
        english: "I need a boarding pass reprint.",
        portuguese: "Preciso reimprimir meu cartão de embarque.",
        level: 'médio',
        context: 'Aeroporto',
        situations: [
          'Cartão danificado: "My boarding pass got damaged when I spilled coffee on it. I need a boarding pass reprint."',
          'Cartão perdido: "I can’t find my boarding pass anywhere. I need a boarding pass reprint before boarding starts."'
        ]
      },
      {
        english: "Is there a pharmacy in the airport?",
        portuguese: "Há uma farmácia no aeroporto?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Precisando remédio: "I forgot to pack my headache medication. Is there a pharmacy in the airport?"',
          'Emergência de saúde: "My child has a fever and I need medicine. Is there a pharmacy in the airport?"'
        ]
      },
      {
        english: "I'm traveling with an infant.",
        portuguese: "Estou viajando com um bebê.",
        level: 'médio',
        context: 'Aeroporto',
        situations: [
          'Informando na segurança: "I’m traveling with an infant and have baby formula and milk. Is that okay to bring through?"',
          'Solicitando assistência: "I’m traveling with an infant. Do you have priority boarding or any special assistance?"'
        ]
      },
      {
        english: "Where can I get travel insurance?",
        portuguese: "Onde posso conseguir seguro viagem?",
        level: 'médio',
        context: 'Aeroporto',
        situations: [
          'Esqueceu de comprar: "I forgot to buy travel insurance online. Where can I get travel insurance here at the airport?"',
          'Viagem de última hora: "This is a last-minute trip. Where can I get travel insurance before my flight?"'
        ]
      },
      {
        english: "I need to cancel my flight.",
        portuguese: "Preciso cancelar meu voo.",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Emergência familiar: "I just received bad news about my family. I need to cancel my flight and stay here."',
          'Problemas de saúde: "I’m feeling very sick and can’t travel today. I need to cancel my flight."'
        ]
      },
      {
        english: "What terminal is my departure from?",
        portuguese: "De qual terminal é minha partida?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Primeiro voo: "This is my first time at this airport. What terminal is my departure from for international flights?"',
          'Transfer entre voos: "I just arrived and need to catch my connecting flight. What terminal is my departure from?"'
        ]
      },
      {
        english: "I need special meal assistance.",
        portuguese: "Preciso de assistência para refeição especial.",
        level: 'médio',
        context: 'Aeroporto',
        situations: [
          'Restrições alimentares: "I have severe allergies and I need special meal assistance. Can you note this in my booking?"',
          'Dieta especial: "I’m vegetarian and I need special meal assistance for my long flight. Is this possible?"'
        ]
      },
      {
        english: "Where is the airport information desk?",
        portuguese: "Onde fica o balcão de informações do aeroporto?",
        level: 'básico',
        context: 'Aeroporto',
        situations: [
          'Perdido no aeroporto: "I’m completely lost. Where is the airport information desk? I need help finding my gate."',
          'Informações gerais: "Where is the airport information desk? I need to ask about transportation to the city."'
        ]
      },
      {
        english: "I'm here for an international transfer.",
        portuguese: "Estou aqui para uma transferência internacional.",
        level: 'avançado',
        context: 'Aeroporto',
        situations: [
          'Na imigração: "I’m not entering the country - I’m here for an international transfer to my final destination."',
          'Explicando situação: "I’m here for an international transfer. Do I need to go through customs or can I stay in the transit area?"'
        ]
      },

      // ========== CATEGORIA: HOTEL (30 frases) ==========
      {
        english: "I have a reservation under the name Smith.",
        portuguese: "Tenho uma reserva no nome Smith.",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Check-in no hotel: "Good evening, I have a reservation under the name Smith for tonight."',
          'Confirmando reserva: "Hi, I have a reservation under the name Smith. Can you confirm the room details?"'
        ]
      },
      {
        english: "What time is check-out?",
        portuguese: "Que horas é o check-out?",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Planejando saída: "I need to plan my departure. What time is check-out tomorrow?"',
          'Primeira pergunta: "What time is check-out? And can I extend if needed?"'
        ]
      },
      {
        english: "Can I have a wake-up call at 7 AM?",
        portuguese: "Posso ter uma chamada de despertar às 7h?",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Pedindo serviço: "I have an early meeting tomorrow. Can I have a wake-up call at 7 AM?"',
          'Na recepção: "Can I have a wake-up call at 7 AM? I don\'t trust my phone alarm."'
        ]
      },
      {
        english: "I'd like to extend my stay.",
        portuguese: "Gostaria de estender minha estadia.",
        level: 'médio',
        context: 'Hotel',
        situations: [
          'Mudando planos: "My business meetings are running longer than expected. I\'d like to extend my stay for two more nights."',
          'Gostando do hotel: "I\'d like to extend my stay if possible. Are there any rooms available for tomorrow night?"'
        ]
      },
      {
        english: "Is there a safe in the room?",
        portuguese: "Há um cofre no quarto?",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Preocupação com segurança: "I have some valuable items with me. Is there a safe in the room?"',
          'Pergunta durante check-in: "Is there a safe in the room where I can store my laptop and documents?"'
        ]
      },
      {
        english: "The air conditioning isn't working.",
        portuguese: "O ar condicionado não está funcionando.",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Reportando problema: "Excuse me, the air conditioning isn\'t working in room 205. Can you send someone to fix it?"',
          'Ligando para recepção: "Hi, this is room 312. The air conditioning isn\'t working and it\'s quite warm in here."'
        ]
      },
      {
        english: "Can I get extra towels?",
        portuguese: "Posso ter toalhas extras?",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Pedindo housekeeping: "Can I get extra towels? We\'re a family of four and need more than what\'s provided."',
          'Na recepção: "Can I get extra towels sent to room 408? The ones we have are quite worn."'
        ]
      },
      {
        english: "Where is the fitness center?",
        portuguese: "Onde fica a academia?",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Procurando facilidades: "I\'d like to work out this morning. Where is the fitness center?"',
          'Pergunta no check-in: "Where is the fitness center and what are the operating hours?"'
        ]
      },
      {
        english: "What's the WiFi password?",
        portuguese: "Qual é a senha do WiFi?",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Precisando de internet: "I need to check my emails. What\'s the WiFi password for guests?"',
          'Problema de conexão: "My laptop isn\'t connecting to the network. What\'s the WiFi password?"'
        ]
      },
      {
        english: "I need to charge my phone.",
        portuguese: "Preciso carregar meu telefone.",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Problema técnico: "I need to charge my phone but I forgot my charger. Do you have one I can borrow?"',
          'Procurando tomada: "I need to charge my phone. Are there any outlets near the lobby seating area?"'
        ]
      },
      {
        english: "Can you call a taxi for me?",
        portuguese: "Você pode chamar um táxi para mim?",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Saindo do hotel: "I need to get to the airport in 30 minutes. Can you call a taxi for me?"',
          'Pedindo ajuda: "Can you call a taxi for me? I need to go to the business district downtown."'
        ]
      },
      {
        english: "I'd like to make a dinner reservation.",
        portuguese: "Gostaria de fazer uma reserva para jantar.",
        level: 'médio',
        context: 'Hotel',
        situations: [
          'No restaurante do hotel: "I\'d like to make a dinner reservation for two at 7 PM tonight."',
          'Pedindo ajuda ao concierge: "I\'d like to make a dinner reservation at a good local restaurant. Can you recommend one?"'
        ]
      },
      {
        english: "Is room service available?",
        portuguese: "O serviço de quarto está disponível?",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Tarde da noite: "I just arrived and I’m very tired. Is room service available? I’d like to order dinner."',
          'Convenência: "I have work to do in my room. Is room service available for breakfast tomorrow morning?"'
        ]
      },
      {
        english: "Can I store my luggage after checkout?",
        portuguese: "Posso guardar minha bagagem depois do checkout?",
        level: 'médio',
        context: 'Hotel',
        situations: [
          'Voo tarde: "My flight isn’t until 8 PM but I need to check out now. Can I store my luggage after checkout?"',
          'Explorando cidade: "Can I store my luggage after checkout? I want to explore the city before heading to the airport."'
        ]
      },
      {
        english: "I need an iron and ironing board.",
        portuguese: "Preciso de um ferro e tábua de passar.",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Reunião importante: "I have an important meeting tomorrow. I need an iron and ironing board for my shirt."',
          'Roupa amassada: "My clothes got wrinkled in the suitcase. I need an iron and ironing board, please."'
        ]
      },
      {
        english: "Where can I do laundry?",
        portuguese: "Onde posso lavar roupa?",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Viagem longa: "I’ve been traveling for a week and my clothes are dirty. Where can I do laundry?"',
          'Precisando lavar: "Where can I do laundry? I only brought a few clothes and need to wash them."'
        ]
      },
      {
        english: "I locked myself out of my room.",
        portuguese: "Me tranquei para fora do meu quarto.",
        level: 'médio',
        context: 'Hotel',
        situations: [
          'Situação embaraçosa: "This is so embarrassing. I locked myself out of my room and my key card is inside."',
          'Pedindo ajuda: "Can you help me? I locked myself out of my room. I’m in room 205."'
        ]
      },
      {
        english: "Can I have a different room?",
        portuguese: "Posso ter um quarto diferente?",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Quarto com problemas: "The air conditioning isn’t working in my room. Can I have a different room?"',
          'Vista ruim: "My room faces a construction site and it’s very noisy. Can I have a different room?"'
        ]
      },
      {
        english: "The room is too noisy.",
        portuguese: "O quarto está muito barulhento.",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Reclamando na recepção: "I couldn’t sleep last night because the room is too noisy. It’s right next to the elevator."',
          'Pedindo solução: "The room is too noisy - there’s loud music from the street. Can you move me to a quieter room?"'
        ]
      },
      {
        english: "I need a crib for my baby.",
        portuguese: "Preciso de um berço para meu bebê.",
        level: 'médio',
        context: 'Hotel',
        situations: [
          'Check-in com bebê: "I’m traveling with my 8-month-old baby. I need a crib for my baby. Do you have one available?"',
          'Esqueceu de pedir: "I forgot to mention when I booked - I need a crib for my baby. Is that possible?"'
        ]
      },
      {
        english: "What time does the pool close?",
        portuguese: "Que horas a piscina fecha?",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Planejando nadar: "I’d like to go for a swim after dinner. What time does the pool close?"',
          'Com crianças: "My kids want to use the pool. What time does the pool close so we can plan our evening?"'
        ]
      },
      {
        english: "Can I get a late checkout?",
        portuguese: "Posso ter um checkout tardio?",
        level: 'médio',
        context: 'Hotel',
        situations: [
          'Voo tarde: "My flight isn’t until 6 PM. Can I get a late checkout until 2 PM?"',
          'Reunião pela manhã: "I have meetings until noon tomorrow. Can I get a late checkout without extra charges?"'
        ]
      },
      {
        english: "I need help with my bill.",
        portuguese: "Preciso de ajuda com minha conta.",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Erro na conta: "There are charges I don’t recognize on my bill. I need help with my bill, please."',
          'Dúvidas sobre cobraças: "I need help with my bill. Can you explain what this room service charge is for?"'
        ]
      },
      {
        english: "Is there a business center?",
        portuguese: "Há um centro de negócios?",
        level: 'médio',
        context: 'Hotel',
        situations: [
          'Viagem de negócios: "I need to print some documents and use a computer. Is there a business center?"',
          'Trabalho remoto: "Is there a business center where I can work quietly and make video calls?"'
        ]
      },
      {
        english: "Where can I park my car?",
        portuguese: "Onde posso estacionar meu carro?",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Chegando de carro: "I just arrived by car. Where can I park my car? Is parking free for guests?"',
          'Localizando estacionamento: "Where can I park my car overnight? Is there valet parking available?"'
        ]
      },
      {
        english: "I need directions to downtown.",
        portuguese: "Preciso de direções para o centro.",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Explorando cidade: "I want to do some shopping and sightseeing. I need directions to downtown."',
          'Reunião de negócios: "I have a meeting in the financial district. I need directions to downtown from here."'
        ]
      },
      {
        english: "Can you recommend local attractions?",
        portuguese: "Você pode recomendar atrações locais?",
        level: 'médio',
        context: 'Hotel',
        situations: [
          'Turista pela primeira vez: "This is my first time visiting this city. Can you recommend local attractions worth seeing?"',
          'Tempo livre: "I have a free afternoon tomorrow. Can you recommend local attractions that are walking distance from here?"'
        ]
      },
      {
        english: "I'd like to book a spa treatment.",
        portuguese: "Gostaria de agendar um tratamento de spa.",
        level: 'médio',
        context: 'Hotel',
        situations: [
          'Relaxamento: "I’ve had a stressful week of meetings. I’d like to book a spa treatment for tomorrow."',
          'Presente para parceiro: "It’s my wife’s birthday. I’d like to book a spa treatment for her as a surprise."'
        ]
      },
      {
        english: "The elevator is out of order.",
        portuguese: "O elevador está fora de ordem.",
        level: 'médio',
        context: 'Hotel',
        situations: [
          'Informando problema: "I just wanted to let you know that the elevator is out of order on the 5th floor."',
          'Pedindo alternativa: "The elevator is out of order and I’m on the 12th floor with heavy luggage. Can someone help me?"'
        ]
      },
      {
        english: "Can I get a receipt for my stay?",
        portuguese: "Posso ter um recibo da minha estadia?",
        level: 'básico',
        context: 'Hotel',
        situations: [
          'Para empresa: "This is a business trip. Can I get a receipt for my stay for reimbursement purposes?"',
          'Controle financeiro: "Can I get a receipt for my stay? I need it for my expense records."'
        ]
      },

      // ========== CATEGORIA: RESTAURANTE (30 frases) ==========
      {
        english: "Do you have a table for two?",
        portuguese: "Vocês têm uma mesa para dois?",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Chegando ao restaurante: "Good evening, do you have a table for two? We don\'t have a reservation."',
          'Pergunta ao host: "Do you have a table for two available now, or should we wait?"'
        ]
      },
      {
        english: "Can I see the menu, please?",
        portuguese: "Posso ver o cardápio, por favor?",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Sentando à mesa: "Thank you for seating us. Can I see the menu, please?"',
          'Pedindo ao garçom: "Can I see the menu, please? And do you have any daily specials?"'
        ]
      },
      {
        english: "What do you recommend?",
        portuguese: "O que você recomenda?",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Pedindo sugestão: "This is our first time here. What do you recommend as your most popular dish?"',
          'Indeciso no cardápio: "I can\'t decide between these options. What do you recommend?"'
        ]
      },
      {
        english: "I'm allergic to nuts.",
        portuguese: "Sou alérgico a nozes.",
        level: 'médio',
        context: 'Restaurante',
        situations: [
          'Informando restrição: "Before I order, I need to let you know that I\'m allergic to nuts. Which dishes are safe for me?"',
          'Pergunta importante: "I\'m allergic to nuts. Can you check if this dish contains any nuts or nut oils?"'
        ]
      },
      {
        english: "Can I have the check, please?",
        portuguese: "Posso ter a conta, por favor?",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Final da refeição: "We\'ve finished our meal and it was delicious. Can I have the check, please?"',
          'Chamando o garçom: "Excuse me, can I have the check, please? We need to leave soon."'
        ]
      },
      {
        english: "I'll have the salmon.",
        portuguese: "Vou querer o salmão.",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Fazendo pedido: "I\'ll have the salmon, please. How is it prepared?"',
          'Decidindo prato: "After looking at the menu, I\'ll have the salmon with vegetables."'
        ]
      },
      {
        english: "Is this dish spicy?",
        portuguese: "Este prato é picante?",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Pergunta antes de pedir: "Is this dish spicy? I don\'t handle spicy food very well."',
          'Verificando tempero: "Is this dish spicy or mild? I\'m ordering for someone who doesn\'t like spicy food."'
        ]
      },
      {
        english: "Can we split the bill?",
        portuguese: "Podemos dividir a conta?",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Pagamento em grupo: "Can we split the bill between the four of us equally?"',
          'Entre amigos: "Can we split the bill? We\'d like to pay separately for what we ordered."'
        ]
      },
      {
        english: "I'd like my steak medium-rare.",
        portuguese: "Gostaria do meu bife mal passado.",
        level: 'médio',
        context: 'Restaurante',
        situations: [
          'Fazendo pedido: "I\'d like my steak medium-rare, please. Not too bloody, but still pink in the middle."',
          'Especificando preparo: "For the ribeye, I\'d like my steak medium-rare. Is that how the chef recommends it?"'
        ]
      },
      {
        english: "Do you have vegetarian options?",
        portuguese: "Vocês têm opções vegetarianas?",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Perguntando ao garçom: "I don\'t eat meat. Do you have vegetarian options on the menu?"',
          'Verificando cardápio: "Do you have vegetarian options? I can\'t find any meat-free dishes on this menu."'
        ]
      },
      {
        english: "Can I substitute the fries?",
        portuguese: "Posso substituir as batatas fritas?",
        level: 'médio',
        context: 'Restaurante',
        situations: [
          'Preferência alimentar: "I’m trying to eat healthier. Can I substitute the fries for a salad instead?"',
          'Não gosta de batata: "I don’t really like potatoes. Can I substitute the fries for vegetables?"'
        ]
      },
      {
        english: "This isn't what I ordered.",
        portuguese: "Isso não é o que pedi.",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Erro no pedido: "Excuse me, this isn’t what I ordered. I asked for the grilled chicken, not the fish."',
          'Corrigindo garçom: "I’m sorry, but this isn’t what I ordered. I ordered the vegetarian pasta."'
        ]
      },
      {
        english: "Could I get a to-go box?",
        portuguese: "Poderia pegar uma caixa para viagem?",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Sobrou comida: "This portion was huge and I’m full. Could I get a to-go box for the rest?"',
          'Levando para casa: "Could I get a to-go box? I’d like to take this home for dinner tomorrow."'
        ]
      },
      {
        english: "What's the soup of the day?",
        portuguese: "Qual é a sopa do dia?",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Perguntando especialidade: "I love trying new soups. What’s the soup of the day?"',
          'Decidindo entrada: "What’s the soup of the day? I’m thinking of starting with soup."'
        ]
      },
      {
        english: "I'd like to make a reservation.",
        portuguese: "Gostaria de fazer uma reserva.",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Ligando para restaurante: "Hello, I’d like to make a reservation for four people tomorrow at 7 PM."',
          'Planejando jantar: "I’d like to make a reservation for this Saturday evening. Do you have availability?"'
        ]
      },
      {
        english: "Can we sit by the window?",
        portuguese: "Podemos sentar perto da janela?",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Preferência por vista: "It’s such a beautiful day outside. Can we sit by the window?"',
          'Ambiente romântico: "We’re celebrating our anniversary. Can we sit by the window for a nice view?"'
        ]
      },
      {
        english: "I'll start with an appetizer.",
        portuguese: "Vou começar com uma entrada.",
        level: 'médio',
        context: 'Restaurante',
        situations: [
          'Montando refeição: "I’m quite hungry tonight. I’ll start with an appetizer, then the main course."',
          'Compartilhando: "Let’s share something. I’ll start with an appetizer that we can all try."'
        ]
      },
      {
        english: "What wines do you have by the glass?",
        portuguese: "Que vinhos vocês têm por taça?",
        level: 'médio',
        context: 'Restaurante',
        situations: [
          'Não quer garrafa: "I’m dining alone and don’t want a whole bottle. What wines do you have by the glass?"',
          'Experimentando: "I’d like to try different wines with each course. What wines do you have by the glass?"'
        ]
      },
      {
        english: "Is service charge included?",
        portuguese: "A taxa de serviço está inclusa?",
        level: 'médio',
        context: 'Restaurante',
        situations: [
          'Verificando conta: "Before I pay, is service charge included in this bill or should I add a tip?"',
          'Estrangeiro perguntando: "I’m not familiar with local customs. Is service charge included or do I need to tip separately?"'
        ]
      },
      {
        english: "Could I get extra sauce on the side?",
        portuguese: "Poderia ter molho extra à parte?",
        level: 'médio',
        context: 'Restaurante',
        situations: [
          'Gosta de molho: "I really love this sauce. Could I get extra sauce on the side?"',
          'Controlando quantidade: "Could I get extra sauce on the side? I like to add it gradually while eating."'
        ]
      },
      {
        english: "This food is cold.",
        portuguese: "Esta comida está fria.",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Reclamando educadamente: "Excuse me, this food is cold. Could you please warm it up for me?"',
          'Problema com pedido: "I’m sorry to bother you, but this food is cold. It should be served hot."'
        ]
      },
      {
        english: "Do you accept credit cards?",
        portuguese: "Vocês aceitam cartão de crédito?",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Antes de pedir: "Before we order, do you accept credit cards or only cash?"',
          'Na hora de pagar: "Do you accept credit cards? I don’t have enough cash with me."'
        ]
      },
      {
        english: "Can I see the dessert menu?",
        portuguese: "Posso ver o cardápio de sobremesas?",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Após prato principal: "That was delicious! Can I see the dessert menu? I’d like something sweet."',
          'Gosta de sobremesa: "Can I see the dessert menu? I never skip dessert when I eat out."'
        ]
      },
      {
        english: "I'm on a diet.",
        portuguese: "Estou de dieta.",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Escolhendo prato: "I’m on a diet, so I need something low in calories. What do you recommend?"',
          'Recusando sobremesa: "The desserts look amazing, but I’m on a diet. I’ll just have coffee, please."'
        ]
      },
      {
        english: "Could you make it less salty?",
        portuguese: "Vocês poderiam fazer com menos sal?",
        level: 'médio',
        context: 'Restaurante',
        situations: [
          'Restrição médica: "I have high blood pressure. Could you make it less salty when preparing my meal?"',
          'Preferência pessoal: "I don’t like very salty food. Could you make it less salty than usual?"'
        ]
      },
      {
        english: "We're ready to order.",
        portuguese: "Estamos prontos para pedir.",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Sinalizando garçom: "Excuse me, we’ve decided on everything. We’re ready to order."',
          'Após analisar cardápio: "We’ve looked at the menu and we’re ready to order now."'
        ]
      },
      {
        english: "Can I get a refill?",
        portuguese: "Posso ter um refil?",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Bebida vazia: "This soda is really good. Can I get a refill?"',
          'Durante refeição: "Can I get a refill on my coffee? I’m still working on my meal."'
        ]
      },
      {
        english: "I'd like to speak to the manager.",
        portuguese: "Gostaria de falar com o gerente.",
        level: 'médio',
        context: 'Restaurante',
        situations: [
          'Problema sério: "I’ve had a very unpleasant experience tonight. I’d like to speak to the manager, please."',
          'Elogio especial: "The service was exceptional tonight. I’d like to speak to the manager to give compliments."'
        ]
      },
      {
        english: "Do you have a kids menu?",
        portuguese: "Vocês têm cardápio infantil?",
        level: 'básico',
        context: 'Restaurante',
        situations: [
          'Família com crianças: "We have two young children with us. Do you have a kids menu with smaller portions?"',
          'Criança exigente: "My daughter is very picky about food. Do you have a kids menu with simple options?"'
        ]
      },
      {
        english: "Could we get some bread while we wait?",
        portuguese: "Poderíamos ter um pouco de pão enquanto esperamos?",
        level: 'médio',
        context: 'Restaurante',
        situations: [
          'Esperando pedido: "We’re quite hungry and the kitchen seems busy. Could we get some bread while we wait?"',
          'Aberitivo simples: "Could we get some bread while we wait for our appetizers? Something to nibble on."'
        ]
      },

      // ========== CATEGORIA: TRANSPORTE (25 frases) ==========
      {
        english: "How do I get to the city center?",
        portuguese: "Como chego ao centro da cidade?",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'Perguntando direções: "Excuse me, I\'m new here. How do I get to the city center from the airport?"',
          'No hotel: "How do I get to the city center? Is there public transportation nearby?"'
        ]
      },
      {
        english: "Where is the nearest subway station?",
        portuguese: "Onde fica a estação de metrô mais próxima?",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'Procurando transporte: "I need to catch the subway. Where is the nearest subway station?"',
          'Pergunta na rua: "Excuse me, where is the nearest subway station? I need to get downtown."'
        ]
      },
      {
        english: "How much is a one-way ticket?",
        portuguese: "Quanto custa uma passagem só de ida?",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'Na bilheteria: "How much is a one-way ticket to downtown? And do you accept credit cards?"',
          'Comprando passagem: "How much is a one-way ticket on this bus route?"'
        ]
      },
      {
        english: "Does this bus go to the airport?",
        portuguese: "Este ônibus vai para o aeroporto?",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'No ponto de ônibus: "Excuse me, does this bus go to the airport? I have a flight in two hours."',
          'Confirmando rota: "Does this bus go to the airport, or do I need to transfer somewhere?"'
        ]
      },
      {
        english: "I'd like to rent a car.",
        portuguese: "Gostaria de alugar um carro.",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'Na locadora: "Good morning, I\'d like to rent a car for three days. What options do you have available?"',
          'Fazendo reserva: "I\'d like to rent a car for my business trip. Do you have any compact cars available?"'
        ]
      },
      {
        english: "Can you call me a taxi?",
        portuguese: "Você pode chamar um táxi para mim?",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'Na recepção do hotel: "I need to get to the airport quickly. Can you call me a taxi?"',
          'Pedindo ajuda: "It’s raining heavily and I can’t find any taxis. Can you call me a taxi?"'
        ]
      },
      {
        english: "What time does the last train leave?",
        portuguese: "Que horas sai o último trem?",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'Planejando volta: "I’ll be working late tonight. What time does the last train leave to the suburbs?"',
          'Na estação: "I don’t want to get stranded here. What time does the last train leave for downtown?"'
        ]
      },
      {
        english: "I need to buy a metro card.",
        portuguese: "Preciso comprar um cartão do metrô.",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'Primeira vez no metrô: "I’m visiting from out of town. I need to buy a metro card - where can I get one?"',
          'Cartão vazio: "My metro card is empty. I need to buy a metro card or add money to this one."'
        ]
      },
      {
        english: "Which platform for the train to Boston?",
        portuguese: "Qual plataforma para o trem para Boston?",
        level: 'médio',
        context: 'Transporte',
        situations: [
          'Na estação: "Excuse me, which platform for the train to Boston? I can’t find it on the departure board."',
          'Com bagagem: "I have heavy luggage. Which platform for the train to Boston so I can find the elevator?"'
        ]
      },
      {
        english: "Is this seat taken?",
        portuguese: "Este assento está ocupado?",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'No trem lotado: "Excuse me, is this seat taken? The train is very crowded today."',
          'No ônibus: "Is this seat taken, or can I sit here? I have a long ride ahead."'
        ]
      },
      {
        english: "I missed my stop.",
        portuguese: "Perdi minha parada.",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'Pedindo ajuda: "Oh no, I missed my stop because I was looking at my phone. How do I get back?"',
          'Primeira vez na cidade: "I’m not familiar with this area and I missed my stop. Where should I get off to go back?"'
        ]
      },
      {
        english: "How long does the journey take?",
        portuguese: "Quanto tempo demora a viagem?",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'Planejando horário: "I have a meeting at 3 PM downtown. How long does the journey take from here?"',
          'Comprando passagem: "How long does the journey take to the airport? I need to catch a flight."'
        ]
      },
      {
        english: "Can I get a transfer?",
        portuguese: "Posso pegar uma transferência?",
        level: 'médio',
        context: 'Transporte',
        situations: [
          'Mudando de linha: "I need to switch to the blue line. Can I get a transfer with this ticket?"',
          'Pagando tarifa: "Can I get a transfer to the bus, or do I need to pay another fare?"'
        ]
      },
      {
        english: "Where do I validate my ticket?",
        portuguese: "Onde valido minha passagem?",
        level: 'médio',
        context: 'Transporte',
        situations: [
          'Primeira viagem: "I just bought this ticket but I don’t see a conductor. Where do I validate my ticket?"',
          'Sistema diferente: "The transport system here is different from my city. Where do I validate my ticket?"'
        ]
      },
      {
        english: "Is there a direct route?",
        portuguese: "Há uma rota direta?",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'Evitando transferência: "I have heavy luggage. Is there a direct route to the hotel, or do I need to change trains?"',
          'Economizando tempo: "I’m in a hurry. Is there a direct route to downtown from here?"'
        ]
      },
      {
        english: "I need to get off at the next stop.",
        portuguese: "Preciso descer na próxima parada.",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'No ônibus lotado: "Excuse me, I need to get off at the next stop. Can I squeeze through please?"',
          'Avisando motorista: "Driver, I need to get off at the next stop. Could you please open the doors?"'
        ]
      },
      {
        english: "How often do buses run?",
        portuguese: "Com que frequência os ônibus passam?",
        level: 'médio',
        context: 'Transporte',
        situations: [
          'Planejando viagem: "I need to get to work by 9 AM. How often do buses run on this route in the morning?"',
          'No ponto de ônibus: "I just missed the bus. How often do buses run? Should I wait or call a taxi?"'
        ]
      },
      {
        english: "Can I pay with exact change?",
        portuguese: "Posso pagar com troco exato?",
        level: 'médio',
        context: 'Transporte',
        situations: [
          'No ônibus: "I only have coins and small bills. Can I pay with exact change, or do you give change?"',
          'Preocupado com troco: "Can I pay with exact change? I don’t want to hold up the line waiting for change."'
        ]
      },
      {
        english: "I'd like a window seat.",
        portuguese: "Gostaria de um assento na janela.",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'No trem de longa distância: "I’ll be traveling for 6 hours. I’d like a window seat to enjoy the scenery."',
          'Reservando assento: "This is my first time on this route. I’d like a window seat if one is available."'
        ]
      },
      {
        english: "Where can I catch a bus to downtown?",
        portuguese: "Onde posso pegar um ônibus para o centro?",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'Turista perdido: "I’m staying at a hotel outside the city. Where can I catch a bus to downtown?"',
          'Economizando dinheiro: "Taxis are too expensive. Where can I catch a bus to downtown instead?"'
        ]
      },
      {
        english: "Is this the right train?",
        portuguese: "Este é o trem certo?",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'Confirmando antes de embarcar: "Excuse me, is this the right train for Central Station? I don’t want to go the wrong direction."',
          'Primeira vez na estação: "I’m new to this city. Is this the right train to get to the airport?"'
        ]
      },
      {
        english: "I need a receipt for my fare.",
        portuguese: "Preciso de um recibo da minha passagem.",
        level: 'médio',
        context: 'Transporte',
        situations: [
          'Viagem de negócios: "This is a business trip. I need a receipt for my fare to submit for reimbursement."',
          'Controle de gastos: "I need a receipt for my fare for my expense tracking. Do you have one?"'
        ]
      },
      {
        english: "Can I bring my luggage on board?",
        portuguese: "Posso levar minha bagagem a bordo?",
        level: 'médio',
        context: 'Transporte',
        situations: [
          'Com bagagem grande: "I have a large suitcase. Can I bring my luggage on board, or does it need to go in cargo?"',
          'Viagem do aeroporto: "Can I bring my luggage on board this bus? I’m coming from the airport."'
        ]
      },
      {
        english: "Is there WiFi on this bus?",
        portuguese: "Há WiFi neste ônibus?",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'Viagem longa: "I have a 3-hour bus ride ahead. Is there WiFi on this bus so I can work?"',
          'Precisando de internet: "I need to check my emails during the trip. Is there WiFi on this bus?"'
        ]
      },
      {
        english: "What's the fare to the museum?",
        portuguese: "Qual é a tarifa para o museu?",
        level: 'básico',
        context: 'Transporte',
        situations: [
          'Planejando visita: "I want to visit the art museum today. What’s the fare to the museum district?"',
          'Comparando opções: "What’s the fare to the museum by bus versus by subway? Which is cheaper?"'
        ]
      },

      // ========== CATEGORIA: COMPRAS (25 frases) ==========
      {
        english: "How much does this cost?",
        portuguese: "Quanto custa isso?",
        level: 'básico',
        context: 'Compras',
        situations: [
          'Na loja: "Excuse me, how much does this cost? I don\'t see a price tag."',
          'Interessado em produto: "This looks nice. How much does this cost?"'
        ]
      },
      {
        english: "Do you accept credit cards?",
        portuguese: "Vocês aceitam cartão de crédito?",
        level: 'básico',
        context: 'Compras',
        situations: [
          'Antes de comprar: "Do you accept credit cards, or is it cash only?"',
          'No caixa: "Do you accept credit cards? I don\'t have enough cash with me."'
        ]
      },
      {
        english: "Can I try this on?",
        portuguese: "Posso experimentar isso?",
        level: 'básico',
        context: 'Compras',
        situations: [
          'Loja de roupas: "I like this jacket. Can I try this on? Where are the fitting rooms?"',
          'Experimentando roupa: "Can I try this on to see if it fits properly?"'
        ]
      },
      {
        english: "Do you have this in a different size?",
        portuguese: "Vocês têm isso em um tamanho diferente?",
        level: 'básico',
        context: 'Compras',
        situations: [
          'Tamanho errado: "This is too small for me. Do you have this in a different size?"',
          'Procurando opções: "I love this style, but do you have this in a different size? Maybe a large?"'
        ]
      },
      {
        english: "I'm just browsing, thanks.",
        portuguese: "Estou só olhando, obrigado.",
        level: 'básico',
        context: 'Compras',
        situations: [
          'Vendedor se aproxima: "Can I help you find anything?" - "I\'m just browsing, thanks. I\'ll let you know if I need assistance."',
          'Recusando ajuda educadamente: "I\'m just browsing, thanks. I\'m not looking for anything specific right now."'
        ]
      },
      {
        english: "Can I get a discount?",
        portuguese: "Posso ter um desconto?",
        level: 'básico',
        context: 'Compras',
        situations: [
          'Comprando vários itens: "I\'m buying several items. Can I get a discount for purchasing multiple pieces?"',
          'Produto caro: "This is quite expensive. Can I get a discount? I\'m a regular customer here."'
        ]
      },
      {
        english: "What's your return policy?",
        portuguese: "Qual é sua política de devolução?",
        level: 'médio',
        context: 'Compras',
        situations: [
          'Antes de comprar: "Before I buy this expensive item, what\'s your return policy if it doesn\'t fit?"',
          'Comprando presente: "I\'m buying this as a gift. What\'s your return policy in case they want to exchange it?"'
        ]
      },
      {
        english: "I'd like to return this item.",
        portuguese: "Gostaria de devolver este item.",
        level: 'básico',
        context: 'Compras',
        situations: [
          'Com recibo: "I\'d like to return this item. I have the receipt and it\'s still in the original packaging."',
          'Não serviu: "This shirt doesn\'t fit properly. I\'d like to return this item and get a refund."'
        ]
      },
      {
        english: "Do you have this in stock?",
        portuguese: "Vocês têm isso em estoque?",
        level: 'básico',
        context: 'Compras',
        situations: [
          'Produto não encontrado: "I can\'t find this item on the shelves. Do you have this in stock in the storage room?"',
          'Tamanho específico: "I need this in size Large. Do you have this in stock, or do I need to order it?"'
        ]
      },
      {
        english: "Where is the fitting room?",
        portuguese: "Onde fica o provador?",
        level: 'básico',
        context: 'Compras',
        situations: [
          'Comprando roupas: "I\'d like to try these pants on. Where is the fitting room?"',
          'Loja nova: "This is my first time in this store. Where is the fitting room located?"'
        ]
      },
      {
        english: "Can I pay in cash?",
        portuguese: "Posso pagar em dinheiro?",
        level: 'básico',
        context: 'Compras',
        situations: [
          'Preferindo dinheiro: "I don\'t like using cards. Can I pay in cash for this purchase?"',
          'Problema com cartão: "My credit card isn\'t working. Can I pay in cash instead?"'
        ]
      },
      {
        english: "Is this on sale?",
        portuguese: "Isso está em promoção?",
        level: 'básico',
        context: 'Compras',
        situations: [
          'Produto com etiqueta: "I see a red tag on this item. Is this on sale or is that the regular price?"',
          'Verificando preço: "This seems expensive for what it is. Is this on sale or is this the normal price?"'
        ]
      },
      {
        english: "Can you hold this for me?",
        portuguese: "Você pode guardar isso para mim?",
        level: 'médio',
        context: 'Compras',
        situations: [
          'Continuando compras: "I\'m not ready to buy this yet, but I want it. Can you hold this for me while I shop for other items?"',
          'Voltando depois: "I need to get money from the ATM. Can you hold this for me for about 20 minutes?"'
        ]
      },
      {
        english: "Do you offer gift wrapping?",
        portuguese: "Vocês oferecem embrulho para presente?",
        level: 'médio',
        context: 'Compras',
        situations: [
          'Comprando presente: "This is for my friend\'s birthday. Do you offer gift wrapping service?"',
          'Feriado: "It\'s Christmas season and this is a gift. Do you offer gift wrapping?"'
        ]
      },
      {
        english: "I need a bag for this.",
        portuguese: "Preciso de uma sacola para isso.",
        level: 'básico',
        context: 'Compras',
        situations: [
          'Após pagamento: "I need a bag for this. Do you have something strong enough for these heavy items?"',
          'Levando vários itens: "I\'m walking home and I need a bag for this. Something with handles would be perfect."'
        ]
      },
      {
        english: "Can I see that item in the window?",
        portuguese: "Posso ver aquele item na vitrine?",
        level: 'médio',
        context: 'Compras',
        situations: [
          'Interesse em produto: "That dress in the window looks beautiful. Can I see that item in the window up close?"',
          'Verificando detalhes: "Can I see that item in the window? I want to check the quality and price tag."'
        ]
      },
      {
        english: "What time do you close?",
        portuguese: "Que horas vocês fecham?",
        level: 'básico',
        context: 'Compras',
        situations: [
          'Planejando tempo: "I need to think about this purchase. What time do you close today?"',
          'Voltando depois: "I need to get more money. What time do you close? I want to come back later."'
        ]
      },
      {
        english: "Do you ship internationally?",
        portuguese: "Vocês fazem envio internacional?",
        level: 'médio',
        context: 'Compras',
        situations: [
          'Comprando no exterior: "I\'m from Brazil and want to send this to my family. Do you ship internationally?"',
          'Turista: "I\'m traveling and can\'t carry this home. Do you ship internationally to Canada?"'
        ]
      },
      {
        english: "I'm looking for a gift.",
        portuguese: "Estou procurando um presente.",
        level: 'básico',
        context: 'Compras',
        situations: [
          'Pedindo ajuda: "I\'m looking for a gift for my girlfriend\'s birthday. What do you recommend?"',
          'Aniversário: "I\'m looking for a gift for my 10-year-old nephew. Do you have anything age-appropriate?"'
        ]
      },
      {
        english: "Can I exchange this for something else?",
        portuguese: "Posso trocar isso por outra coisa?",
        level: 'médio',
        context: 'Compras',
        situations: [
          'Produto não serviu: "This shirt is too small for me. Can I exchange this for something else in a larger size?"',
          'Mudando de ideia: "I changed my mind about the color. Can I exchange this for something else in blue instead?"'
        ]
      },
      {
        english: "Do you have a loyalty program?",
        portuguese: "Vocês têm programa de fidelidade?",
        level: 'médio',
        context: 'Compras',
        situations: [
          'Cliente regular: "I shop here frequently. Do you have a loyalty program with discounts or rewards?"',
          'Primeira compra: "Before I make this purchase, do you have a loyalty program I can sign up for?"'
        ]
      },
      {
        english: "I need to speak to a manager.",
        portuguese: "Preciso falar com um gerente.",
        level: 'médio',
        context: 'Compras',
        situations: [
          'Problema não resolvido: "This employee can\'t help me with my issue. I need to speak to a manager."',
          'Reclamação: "I\'m not satisfied with the service I received. I need to speak to a manager."'
        ]
      },
      {
        english: "Can you check if you have this in the back?",
        portuguese: "Você pode verificar se têm isso no estoque?",
        level: 'médio',
        context: 'Compras',
        situations: [
          'Produto esgotado: "I don\'t see my size on the rack. Can you check if you have this in the back?"',
          'Item procurado: "This shelf is empty but I really need this item. Can you check if you have this in the back?"'
        ]
      },
      {
        english: "I'd like to open a store account.",
        portuguese: "Gostaria de abrir uma conta na loja.",
        level: 'avançado',
        context: 'Compras',
        situations: [
          'Beneficios: "I shop here often and want the special discounts. I\'d like to open a store account."',
          'Crédito: "I\'d like to open a store account to get the store credit card and payment options."'
        ]
      },
      {
        english: "When will you restock this item?",
        portuguese: "Quando vocês vão repor este item?",
        level: 'médio',
        context: 'Compras',
        situations: [
          'Item esgotado: "This is exactly what I need but it\'s out of stock. When will you restock this item?"',
          'Planejando compra: "I can wait a few days. When will you restock this item? I really want to buy it."'
        ]
      },

      // ========== CATEGORIA: EMERGÊNCIA (20 frases) ==========
      {
        english: "I need help!",
        portuguese: "Preciso de ajuda!",
        level: 'básico',
        context: 'Emergência',
        situations: [
          'Situação de perigo: "Help! I need help! Someone call the police!"',
          'Pedindo socorro: "Excuse me, I need help! My friend is injured and we need assistance."'
        ]
      },
      {
        english: "Call the police!",
        portuguese: "Chame a polícia!",
        level: 'básico',
        context: 'Emergência',
        situations: [
          'Crime em andamento: "There\'s a robbery happening! Call the police immediately!"',
          'Situação perigosa: "Call the police! I just witnessed an accident and people are hurt."'
        ]
      },
      {
        english: "I need to go to the hospital.",
        portuguese: "Preciso ir ao hospital.",
        level: 'básico',
        context: 'Emergência',
        situations: [
          'Problema de saúde: "I\'m feeling very sick and have chest pain. I need to go to the hospital."',
          'Ferimento: "I think I broke my arm. I need to go to the hospital right away."'
        ]
      },
      {
        english: "Where is the nearest pharmacy?",
        portuguese: "Onde fica a farmácia mais próxima?",
        level: 'básico',
        context: 'Emergência',
        situations: [
          'Precisando de remédio: "My child has a fever. Where is the nearest pharmacy that\'s open now?"',
          'Emergência médica: "I need to buy medicine urgently. Where is the nearest pharmacy?"'
        ]
      },
      {
        english: "I lost my passport.",
        portuguese: "Perdi meu passaporte.",
        level: 'básico',
        context: 'Emergência',
        situations: [
          'Na polícia: "I need to file a report. I lost my passport and all my identification documents."',
          'No consulado: "I lost my passport while traveling. What do I need to do to get a replacement?"'
        ]
      },
      {
        english: "Someone stole my wallet.",
        portuguese: "Alguém roubou minha carteira.",
        level: 'básico',
        context: 'Emergência',
        situations: [
          'Reportando à polícia: "I was at the market when someone stole my wallet. I need to file a police report."',
          'No hotel: "Someone stole my wallet this morning. Can you help me contact the police and my bank?"'
        ]
      },
      {
        english: "I need to contact my embassy.",
        portuguese: "Preciso contatar minha embaixada.",
        level: 'médio',
        context: 'Emergência',
        situations: [
          'Perdeu documentos: "I lost all my documents including my passport. I need to contact my embassy immediately."',
          'Problemas legais: "I\'m having legal issues and need consular assistance. How can I contact my embassy?"'
        ]
      },
      {
        english: "Can you call an ambulance?",
        portuguese: "Você pode chamar uma ambulância?",
        level: 'básico',
        context: 'Emergência',
        situations: [
          'Emergência médica: "My friend fell and isn\'t responding. Can you call an ambulance immediately?"',
          'Acidente grave: "There\'s been a serious car accident. Can you call an ambulance? Someone is badly injured."'
        ]
      },
      {
        english: "I'm having chest pain.",
        portuguese: "Estou com dor no peito.",
        level: 'médio',
        context: 'Emergência',
        situations: [
          'No hospital: "I’m having severe chest pain that started an hour ago. I think I need immediate medical attention."',
          'Chamando emergência: "I’m having chest pain and shortness of breath. I think I need to go to the emergency room."'
        ]
      },
      {
        english: "I'm allergic to this medication.",
        portuguese: "Sou alérgico a este medicamento.",
        level: 'médio',
        context: 'Emergência',
        situations: [
          'Na farmácia: "Wait, I can’t take this. I’m allergic to this medication. Do you have an alternative?"',
          'Com médico: "Before you prescribe anything, I need to tell you I’m allergic to this medication."'
        ]
      },
      {
        english: "I need to file a police report.",
        portuguese: "Preciso registrar um boletim de ocorrência.",
        level: 'avançado',
        context: 'Emergência',
        situations: [
          'Após roubo: "My wallet was stolen this morning. I need to file a police report for insurance purposes."',
          'Acidente de trânsito: "There was a car accident and we need to exchange information. Do I need to file a police report?"'
        ]
      },
      {
        english: "My car broke down.",
        portuguese: "Meu carro quebrou.",
        level: 'básico',
        context: 'Emergência',
        situations: [
          'Ligando para assistência: "I’m stranded on the highway. My car broke down and I need a tow truck."',
          'Pedindo ajuda: "My car broke down in the parking lot. Do you know a good mechanic nearby?"'
        ]
      },
      {
        english: "I locked my keys in the car.",
        portuguese: "Tranquei as chaves no carro.",
        level: 'médio',
        context: 'Emergência',
        situations: [
          'Pedindo ajuda: "I’m so embarrassed. I locked my keys in the car with the engine running. Can you help me?"',
          'Chamando chaveiro: "I locked my keys in the car at the shopping mall. How quickly can a locksmith get here?"'
        ]
      },
      {
        english: "I need roadside assistance.",
        portuguese: "Preciso de assistência na estrada.",
        level: 'avançado',
        context: 'Emergência',
        situations: [
          'Pneu furado: "I have a flat tire on a busy road. I need roadside assistance because I don’t have the tools to change it."',
          'Bateria descarregada: "My car won’t start - the battery is dead. I need roadside assistance for a jump start."'
        ]
      },
      {
        english: "There's been an accident.",
        portuguese: "Houve um acidente.",
        level: 'básico',
        context: 'Emergência',
        situations: [
          'Ligando para 911: "There’s been an accident on Highway 101 near the mall. We need police and an ambulance."',
          'Informando ao chefe: "I’m going to be late to the meeting. There’s been an accident and traffic is completely stopped."'
        ]
      },
      {
        english: "I feel dizzy.",
        portuguese: "Estou me sentindo tonto.",
        level: 'básico',
        context: 'Emergência',
        situations: [
          'No médico: "I’ve been feeling dizzy for the past two hours, especially when I stand up quickly."',
          'Pedindo ajuda: "I feel dizzy and nauseous. Can you help me sit down and maybe get me some water?"'
        ]
      },
      {
        english: "I need a doctor who speaks English.",
        portuguese: "Preciso de um médico que fale inglês.",
        level: 'médio',
        context: 'Emergência',
        situations: [
          'No hospital: "This is very urgent and I need a doctor who speaks English. I can’t explain my symptoms in another language."',
          'Na recepção: "I have a medical emergency but I need a doctor who speaks English. Is there one available?"'
        ]
      },
      {
        english: "Where is the nearest hospital?",
        portuguese: "Onde fica o hospital mais próximo?",
        level: 'básico',
        context: 'Emergência',
        situations: [
          'Emergência médica: "My friend is having severe chest pain. Where is the nearest hospital? We need to get there immediately."',
          'Acidente: "There’s been an accident and someone is injured. Where is the nearest hospital with an emergency room?"'
        ]
      },
      {
        english: "I need travel insurance assistance.",
        portuguese: "Preciso de assistência do seguro viagem.",
        level: 'avançado',
        context: 'Emergência',
        situations: [
          'Problema médico: "I had to go to the emergency room abroad. I need travel insurance assistance to cover the medical bills."',
          'Cancelamento de viagem: "My flight was cancelled due to a family emergency. I need travel insurance assistance for the additional costs."'
        ]
      },
      {
        english: "My flight was cancelled due to weather.",
        portuguese: "Meu voo foi cancelado devido ao tempo.",
        level: 'médio',
        context: 'Emergência',
        situations: [
          'No aeroporto: "My flight was cancelled due to weather. When is the next available flight to the same destination?"',
          'Ligando para a companhia: "My connecting flight was cancelled due to weather. Can you rebook me on the next flight without extra charges?"'
        ]
      },

      // ========== CATEGORIA: TURISMO (20 frases) ==========
      {
        english: "What are the must-see attractions?",
        portuguese: "Quais são as atrações imperdíveis?",
        level: 'médio',
        context: 'Turismo',
        situations: [
          'Centro de informações: "Hi, I\'m visiting for just two days. What are the must-see attractions in this city?"',
          'Perguntando a local: "I\'m a tourist and want to make the most of my time. What are the must-see attractions here?"'
        ]
      },
      {
        english: "How much is the entrance fee?",
        portuguese: "Quanto custa a entrada?",
        level: 'básico',
        context: 'Turismo',
        situations: [
          'Na bilheteria do museu: "How much is the entrance fee for adults? Do you have any discounts?"',
          'Planejando orçamento: "Before I decide to visit, how much is the entrance fee to this attraction?"'
        ]
      },
      {
        english: "Are there guided tours available?",
        portuguese: "Há tours guiados disponíveis?",
        level: 'médio',
        context: 'Turismo',
        situations: [
          'Querendo guia: "I’d like to learn more about the history of this place. Are there guided tours available?"',
          'No museu: "Are there guided tours available in English? I want to understand the exhibits better."'
        ]
      },
      {
        english: "Can I take pictures here?",
        portuguese: "Posso tirar fotos aqui?",
        level: 'básico',
        context: 'Turismo',
        situations: [
          'No museu: "This artwork is beautiful. Can I take pictures here, or is photography prohibited?"',
          'Em local histórico: "Can I take pictures here? I want to share this with my family back home."'
        ]
      },
      {
        english: "What time do you open?",
        portuguese: "Que horas vocês abrem?",
        level: 'básico',
        context: 'Turismo',
        situations: [
          'Planejando visita: "I want to be here first thing in the morning. What time do you open?"',
          'Ligando antes: "What time do you open tomorrow? I’d like to plan my day around visiting."'
        ]
      },
      {
        english: "Is there a student discount?",
        portuguese: "Há desconto para estudante?",
        level: 'básico',
        context: 'Turismo',
        situations: [
          'Na bilheteria: "I\'m a university student with valid ID. Is there a student discount for admission?"',
          'Economizando: "Is there a student discount? I\'m traveling on a tight budget and every saving helps."'
        ]
      },
      {
        english: "How long does the tour last?",
        portuguese: "Quanto tempo dura o tour?",
        level: 'básico',
        context: 'Turismo',
        situations: [
          'Planejando horário: "I have other plans later today. How long does the tour last?"',
          'Decidindo participar: "How long does the tour last? I want to make sure I have enough time."'
        ]
      },
      {
        english: "Can I book tickets online?",
        portuguese: "Posso comprar ingressos online?",
        level: 'básico',
        context: 'Turismo',
        situations: [
          'Evitando filas: "Can I book tickets online to skip the line? I don\'t want to wait for hours."',
          'Planejando antecipadamente: "Can I book tickets online in advance? I\'m visiting next month and want to secure my spot."'
        ]
      },
      {
        english: "Where can I buy souvenirs?",
        portuguese: "Onde posso comprar lembrancinhas?",
        level: 'básico',
        context: 'Turismo',
        situations: [
          'Para família: "I want to bring something back for my family. Where can I buy souvenirs around here?"',
          'Procurando autênticos: "Where can I buy souvenirs that are locally made? I prefer authentic items over mass-produced ones."'
        ]
      },
      {
        english: "Is there an audio guide?",
        portuguese: "Há um guia de áudio?",
        level: 'médio',
        context: 'Turismo',
        situations: [
          'No museu: "Is there an audio guide available in English? I\'d like to learn more about each exhibit."',
          'Visitando sozinho: "I\'m exploring on my own. Is there an audio guide that can provide detailed information?"'
        ]
      },
      {
        english: "What's the history of this place?",
        portuguese: "Qual é a história deste lugar?",
        level: 'médio',
        context: 'Turismo',
        situations: [
          'Curiosidade histórica: "This building looks ancient. What\'s the history of this place? When was it built?"',
          'Para guia: "What\'s the history of this place? I\'d love to hear some interesting stories or legends."'
        ]
      },
      {
        english: "Are there any festivals this week?",
        portuguese: "Há algum festival esta semana?",
        level: 'médio',
        context: 'Turismo',
        situations: [
          'No centro de informações: "I\'m here for a few days. Are there any festivals this week that I shouldn\'t miss?"',
          'Experiência cultural: "Are there any festivals this week? I\'d love to experience local culture and traditions."'
        ]
      },
      {
        english: "Can you recommend a local restaurant?",
        portuguese: "Você pode recomendar um restaurante local?",
        level: 'básico',
        context: 'Turismo',
        situations: [
          'Perguntando ao concierge: "Can you recommend a local restaurant with authentic cuisine? I want to try traditional dishes."',
          'Para morador local: "Can you recommend a local restaurant where locals eat? I prefer authentic places over tourist spots."'
        ]
      },
      {
        english: "Where is the best viewpoint?",
        portuguese: "Onde fica o melhor mirante?",
        level: 'básico',
        context: 'Turismo',
        situations: [
          'Para fotos: "I want to take some great photos of the city. Where is the best viewpoint around here?"',
          'Admirando paisagem: "Where is the best viewpoint to see the sunset? I heard there\'s an amazing spot nearby."'
        ]
      },
      {
        english: "Is it safe to walk here at night?",
        portuguese: "É seguro caminhar aqui à noite?",
        level: 'médio',
        context: 'Turismo',
        situations: [
          'Preocupação com segurança: "I\'m staying nearby and planning to walk back to my hotel. Is it safe to walk here at night?"',
          'Planejando atividade noturna: "Is it safe to walk here at night? I\'d like to explore the nightlife in this area."'
        ]
      },
      {
        english: "Can I get a map of the area?",
        portuguese: "Posso pegar um mapa da área?",
        level: 'básico',
        context: 'Turismo',
        situations: [
          'No centro de informações: "Can I get a map of the area? I want to explore on foot and see all the main attractions."',
          'Orientação: "Can I get a map of the area? I prefer having a physical map instead of using my phone all the time."'
        ]
      },
      {
        english: "What's the local specialty?",
        portuguese: "Qual é a especialidade local?",
        level: 'básico',
        context: 'Turismo',
        situations: [
          'Descobrindo culinária: "I want to try something authentic. What\'s the local specialty that I absolutely must taste?"',
          'No restaurante: "What\'s the local specialty here? I\'d like to order something traditional and representative of this region."'
        ]
      },
      {
        english: "Are there any free activities?",
        portuguese: "Há alguma atividade gratuita?",
        level: 'básico',
        context: 'Turismo',
        situations: [
          'Viajando com orçamento apertado: "I\'m traveling on a budget. Are there any free activities or attractions I can enjoy here?"',
          'Economizando: "Are there any free activities like walking tours, parks, or museums with free admission days?"'
        ]
      },
      {
        english: "How do I get to the old town?",
        portuguese: "Como chego à cidade velha?",
        level: 'básico',
        context: 'Turismo',
        situations: [
          'Pedindo direções: "I want to visit the historic center. How do I get to the old town from here?"',
          'Transporte: "How do I get to the old town? Should I take the bus, metro, or is it walking distance?"'
        ]
      },
      {
        english: "Is this area wheelchair accessible?",
        portuguese: "Esta área é acessível para cadeira de rodas?",
        level: 'avançado',
        context: 'Turismo',
        situations: [
          'Verificando acessibilidade: "I\'m traveling with someone who uses a wheelchair. Is this area wheelchair accessible?"',
          'Planejando visita: "Is this area wheelchair accessible? We need to plan our route carefully for accessibility."'
        ]
      }
    ],
    exercises: [
      {
        id: 'viagens-ex-1',
        correctSentence: 'Where is the boarding gate?',
        words: ['Where', 'is', 'the', 'boarding', 'gate?'],
        translation: 'Onde fica o portão de embarque?',
        situations: [
          'No aeroporto: "Excuse me, I\'m looking for gate A15. Where is the boarding gate for flight AA123?"',
          'Chegada tardia: "I\'m late for my flight to Miami. Where is the boarding gate? Do I still have time?"'
        ]
      },
      {
        id: 'viagens-ex-2',
        correctSentence: 'I need a taxi please.',
        words: ['I', 'need', 'a', 'taxi', 'please.'],
        translation: 'Preciso de um táxi, por favor.',
        situations: [
          'Saindo do aeroporto: "I just arrived and I have heavy luggage. I need a taxi please to go downtown."',
          'Na rua: "It\'s raining and I can\'t walk to my hotel. I need a taxi please. How long is the wait?"'
        ]
      },
      {
        id: 'viagens-ex-3',
        correctSentence: 'How much is this room?',
        words: ['How', 'much', 'is', 'this', 'room?'],
        translation: 'Quanto custa este quarto?',
        situations: [
          'No hotel: "I\'m interested in staying here for 3 nights. How much is this room per night?"',
          'Negociando preço: "This looks like a nice room. How much is this room? Do you have any discounts available?"'
        ]
      },
      {
        id: 'viagens-ex-4',
        correctSentence: 'Can I see the menu?',
        words: ['Can', 'I', 'see', 'the', 'menu?'],
        translation: 'Posso ver o cardápio?',
        situations: [
          'No restaurante: "Good evening, we\'d like to order dinner. Can I see the menu, please?"',
          'Pedindo em inglês: "We don\'t speak the local language well. Can I see the menu in English if you have one?"'
        ]
      },
      {
        id: 'viagens-ex-5',
        correctSentence: 'What time is checkout?',
        words: ['What', 'time', 'is', 'checkout?'],
        translation: 'Que horas é o checkout?',
        situations: [
          'No hotel: "We\'re planning our last day here. What time is checkout? Can we leave our bags after that?"',
          'Pedindo extensão: "We have a late flight today. What time is checkout? Is late checkout possible for an extra fee?"'
        ]
      }
    ]
  },
  mercado: {
    title: 'Inglês para Mercado/Compras',
    icon: '🛒',
    description: 'Frases para compras, preços e formas de pagamento',
    phrases: [
      // ========== FRASES FREE (10) ==========
      {
        english: "How much does this cost?",
        portuguese: "Quanto custa isso?",
        level: 'básico',
        context: 'Preços',
        situations: [
          'No supermercado: "Excuse me, this item doesn\'t have a price tag. How much does this cost?"',
          'Comparando preços: "I\'m interested in buying this. How much does this cost compared to similar products?"'
        ]
      },
      {
        english: "Do you accept credit cards?",
        portuguese: "Vocês aceitam cartão de crédito?",
        level: 'básico',
        context: 'Pagamento',
        situations: [
          'No caixa: "I\'d like to pay for these groceries. Do you accept credit cards or only cash?"',
          'Loja pequena: "Before I choose items, do you accept credit cards? I don\'t have cash with me."'
        ]
      },
      {
        english: "Can I get a receipt?",
        portuguese: "Posso pegar um recibo?",
        level: 'básico',
        context: 'Comprovante',
        situations: [
          'Após pagamento: "Can I get a receipt for this purchase? I need it for my expense report."',
          'Para garantia: "Can I get a receipt? I want to keep it in case I need to return anything."'
        ]
      },
      {
        english: "Where is the checkout?",
        portuguese: "Onde fica o caixa?",
        level: 'básico',
        context: 'Orientação',
        situations: [
          'Pronto para pagar: "I\'ve finished shopping and I\'m ready to pay. Where is the checkout?"',
          'Loja grande: "This store is huge and I\'m lost. Where is the checkout to pay for these items?"'
        ]
      },
      {
        english: "Is this on sale?",
        portuguese: "Isso está em promoção?",
        level: 'básico',
        context: 'Promoção',
        situations: [
          'Vendo etiqueta: "I see a red tag on this item. Is this on sale or is that the regular price?"',
          'Procurando ofertas: "This seems like a good price. Is this on sale or is this the normal cost?"'
        ]
      },
      {
        english: "Can I try this on?",
        portuguese: "Posso experimentar isso?",
        level: 'básico',
        context: 'Experimentar',
        situations: [
          'Comprando roupa: "I like this shirt but I\'m not sure about the size. Can I try this on?"',
          'Verificando caimento: "This looks nice on the hanger. Can I try this on to see how it fits?"'
        ]
      },
      {
        english: "Do you have this in a different size?",
        portuguese: "Vocês têm isso em um tamanho diferente?",
        level: 'básico',
        context: 'Tamanhos',
        situations: [
          'Tamanho errado: "I love this dress but it\'s too small. Do you have this in a different size, like Large?"',
          'Para outra pessoa: "This is perfect but it\'s for my sister. Do you have this in a different size?"'
        ]
      },
      {
        english: "I'm just looking, thanks.",
        portuguese: "Estou só olhando, obrigado.",
        level: 'básico',
        context: 'Navegação',
        situations: [
          'Vendedor se aproxima: "Can I help you find anything?" - "I\'m just looking, thanks. I\'ll let you know if I need help."',
          'Recusando ajuda: "I\'m just looking, thanks. I\'m not buying anything specific today."'
        ]
      },
      {
        english: "Can I get a discount?",
        portuguese: "Posso ter um desconto?",
        level: 'médio',
        context: 'Negociação',
        situations: [
          'Comprando muito: "I\'m buying several items today. Can I get a discount for multiple purchases?"',
          'Cliente regular: "I shop here often. Can I get a discount? I\'m a loyal customer."'
        ]
      },
      {
        english: "What's your return policy?",
        portuguese: "Qual é sua política de devolução?",
        level: 'médio',
        context: 'Devolução',
        situations: [
          'Antes de comprar: "Before I buy this expensive item, what\'s your return policy if it doesn\'t work?"',
          'Comprando presente: "I\'m buying this as a gift. What\'s your return policy if they want to exchange it?"'
        ]
      },

      // ========== FRASES PREMIUM ==========
      {
        english: "I'd like to return this item.",
        portuguese: "Gostaria de devolver este item.",
        level: 'básico',
        context: 'Devolução',
        situations: [
          'Com recibo: "I\'d like to return this item. I have the receipt and it\'s still in the original packaging."',
          'Não serviu: "This shirt doesn\'t fit properly. I\'d like to return this item and get a refund."'
        ]
      },
      {
        english: "Do you have this in stock?",
        portuguese: "Vocês têm isso em estoque?",
        level: 'básico',
        context: 'Estoque',
        situations: [
          'Produto não encontrado: "I can\'t find this item on the shelves. Do you have this in stock in the back?"',
          'Tamanho específico: "I need this in size Large. Do you have this in stock, or do I need to order it?"'
        ]
      },
      {
        english: "Where is the fitting room?",
        portuguese: "Onde fica o provador?",
        level: 'básico',
        context: 'Localização',
        situations: [
          'Comprando roupas: "I\'d like to try these pants on. Where is the fitting room?"',
          'Primeira vez na loja: "This is my first time here. Where is the fitting room located?"'
        ]
      },
      {
        english: "Can I pay in cash?",
        portuguese: "Posso pagar em dinheiro?",
        level: 'básico',
        context: 'Pagamento',
        situations: [
          'Sem cartão: "I don\'t have my credit card with me today. Can I pay in cash?"',
          'Preferindo dinheiro: "Can I pay in cash? I prefer not to use cards for small purchases."'
        ]
      },
      {
        english: "Can you hold this for me?",
        portuguese: "Você pode guardar isso para mim?",
        level: 'médio',
        context: 'Reserva',
        situations: [
          'Continuando compras: "I like this jacket but I want to keep shopping. Can you hold this for me for an hour?"',
          'Decidindo depois: "Can you hold this for me while I check if I have enough money on my card?"'
        ]
      },
      {
        english: "Do you offer gift wrapping?",
        portuguese: "Vocês fazem embrulho para presente?",
        level: 'médio',
        context: 'Serviços',
        situations: [
          'Comprando presente: "This is for my friend\'s birthday. Do you offer gift wrapping service?"',
          'Feriado: "It\'s Christmas season and this is a gift. Do you offer gift wrapping?"'
        ]
      },
      
      // SUPERMERCADO - BÁSICO
      {
        english: "Where are the milk products?",
        portuguese: "Onde ficam os laticínios?",
        level: 'básico',
        context: 'Supermercado',
        situations: [
          'Procurando seção: "Excuse me, where are the milk products? I need to buy some yogurt and cheese."',
          'No supermercado: "I can\'t find the dairy section. Where are the milk products located?"'
        ]
      },
      {
        english: "Paper or plastic?",
        portuguese: "Papel ou plástico?",
        level: 'básico',
        context: 'Supermercado',
        situations: [
          'No caixa: "Would you like paper or plastic bags for your groceries?"',
          'Opções de sacola: "For bagging your items, paper or plastic? We also have reusable bags."'
        ]
      },
      {
        english: "I need a shopping cart.",
        portuguese: "Preciso de um carrinho de compras.",
        level: 'básico',
        context: 'Supermercado',
        situations: [
          'Entrada do mercado: "I\'m doing a big grocery shopping. I need a shopping cart before I start."',
          'Compras grandes: "I need a shopping cart. I\'m buying food for the whole week."'
        ]
      },
      {
        english: "Where's the bread section?",
        portuguese: "Onde fica a seção de pães?",
        level: 'básico',
        context: 'Supermercado',
        situations: [
          'Procurando pães: "I need to buy some fresh bread. Where\'s the bread section?"',
          'Primeira vez: "This is a big store. Where\'s the bread section? I\'m looking for whole wheat bread."'
        ]
      },
      {
        english: "Do you have fresh fish?",
        portuguese: "Vocês têm peixe fresco?",
        level: 'básico',
        context: 'Supermercado',
        situations: [
          'No açougue: "I\'m making dinner tonight. Do you have fresh fish, like salmon or cod?"',
          'Procurando qualidade: "Do you have fresh fish that arrived today? I want the best quality."'
        ]
      },
      {
        english: "I'm looking for organic vegetables.",
        portuguese: "Estou procurando vegetais orgânicos.",
        level: 'médio',
        context: 'Supermercado',
        situations: [
          'Opção saudável: "I\'m looking for organic vegetables. Do you have a special section for organic produce?"',
          'Qualidade: "I\'m looking for organic vegetables without pesticides. Where can I find them?"'
        ]
      },
      {
        english: "Can I get this sliced?",
        portuguese: "Posso pedir para fatiar isso?",
        level: 'básico',
        context: 'Supermercado',
        situations: [
          'No açougue: "I\'d like to buy this ham. Can I get this sliced thin for sandwiches?"',
          'Queijos: "This cheese looks perfect. Can I get this sliced, about medium thickness?"'
        ]
      },
      {
        english: "What time do you close?",
        portuguese: "Que horas vocês fecham?",
        level: 'básico',
        context: 'Informação',
        situations: [
          'Planejando compras: "I need to buy a few more things. What time do you close today?"',
          'Verificando horário: "What time do you close? I want to make sure I have enough time to shop."'
        ]
      },
      {
        english: "Do you have a loyalty card?",
        portuguese: "Vocês têm cartão fidelidade?",
        level: 'médio',
        context: 'Supermercado',
        situations: [
          'Economizando: "I shop here regularly. Do you have a loyalty card with discounts and rewards?"',
          'Primeira compra: "Do you have a loyalty card program? I\'d like to sign up for benefits."'
        ]
      },
      {
        english: "I forgot my shopping list.",
        portuguese: "Esqueci minha lista de compras.",
        level: 'básico',
        context: 'Supermercado',
        situations: [
          'Conversando: "I forgot my shopping list at home. I hope I remember everything I need."',
          'Pedindo ajuda: "I forgot my shopping list. Can you help me find basic groceries like milk and bread?"'
        ]
      },
      
      // ROUPAS E MODA - BÁSICO
      {
        english: "What size is this?",
        portuguese: "Que tamanho é este?",
        level: 'básico',
        context: 'Roupas',
        situations: [
          'Etiqueta apagada: "The tag is worn out and I can\'t read it. What size is this shirt?"',
          'Comparando tamanhos: "What size is this? I usually wear Medium but this looks different."'
        ]
      },
      {
        english: "Do you have this in blue?",
        portuguese: "Vocês têm isso em azul?",
        level: 'básico',
        context: 'Roupas',
        situations: [
          'Preferindo cor: "I love this style but I prefer blue. Do you have this in blue?"',
          'Combinando roupas: "Do you have this in blue? It would match my jeans perfectly."'
        ]
      },
      {
        english: "This doesn't fit.",
        portuguese: "Isso não serve.",
        level: 'básico',
        context: 'Roupas',
        situations: [
          'Após experimentar: "I tried it on but this doesn\'t fit. It\'s too tight around the waist."',
          'Precisando trocar: "This doesn\'t fit properly. Can I exchange it for a larger size?"'
        ]
      },
      {
        english: "Can I exchange this?",
        portuguese: "Posso trocar isso?",
        level: 'básico',
        context: 'Troca',
        situations: [
          'Tamanho errado: "This shirt is too small. Can I exchange this for a Medium size?"',
          'Mudando ideia: "I changed my mind about the color. Can I exchange this for the black one?"'
        ]
      },
      {
        english: "It's too tight.",
        portuguese: "Está muito apertado.",
        level: 'básico',
        context: 'Roupas',
        situations: [
          'Experimentando: "I tried on this jacket but it\'s too tight around the shoulders."',
          'Feedback: "This looks nice but it\'s too tight. Do you have a looser fit?"'
        ]
      },
      {
        english: "Do you have a larger size?",
        portuguese: "Vocês têm um tamanho maior?",
        level: 'básico',
        context: 'Roupas',
        situations: [
          'Roupa pequena: "This Medium is too small for me. Do you have a larger size like Large or XL?"',
          'Para presente: "This is for my husband and he\'s bigger than me. Do you have a larger size?"'
        ]
      },
      {
        english: "I need size medium.",
        portuguese: "Preciso do tamanho médio.",
        level: 'básico',
        context: 'Roupas',
        situations: [
          'Especificando tamanho: "I like this shirt. I need size medium. Do you have it in stock?"',
          'Sabendo tamanho: "I always wear size medium in this brand. Where can I find it?"'
        ]
      },
      {
        english: "This is perfect!",
        portuguese: "Isso está perfeito!",
        level: 'básico',
        context: 'Aprovação',
        situations: [
          'Após experimentar: "I tried it on and this is perfect! It fits exactly how I like it."',
          'Encontrando ideal: "This is perfect! This is exactly what I was looking for."'
        ]
      },
      
      // PAGAMENTO - MÉDIO
      {
        english: "Do you accept contactless payment?",
        portuguese: "Vocês aceitam pagamento sem contato?",
        level: 'médio',
        context: 'Pagamento',
        situations: [
          'Pagamento moderno: "I prefer not to touch the card reader. Do you accept contactless payment?"',
          'Por segurança: "For hygiene reasons, do you accept contactless payment like tap-to-pay?"'
        ]
      },
      {
        english: "Can I pay with my phone?",
        portuguese: "Posso pagar com meu celular?",
        level: 'médio',
        context: 'Pagamento',
        situations: [
          'Pagamento digital: "I have Apple Pay set up. Can I pay with my phone instead of my card?"',
          'Sem carteira: "I forgot my wallet at home. Can I pay with my phone using the app?"'
        ]
      },
      {
        english: "My card was declined.",
        portuguese: "Meu cartão foi recusado.",
        level: 'médio',
        context: 'Pagamento',
        situations: [
          'Problema no cartão: "My card was declined. Let me try a different card or use cash instead."',
          'Verificando limite: "My card was declined. I should check if I have enough credit limit available."'
        ]
      },
      {
        english: "Can I split the payment?",
        portuguese: "Posso dividir o pagamento?",
        level: 'médio',
        context: 'Pagamento',
        situations: [
          'Comprando junto: "We\'re shopping together but paying separately. Can I split the payment between two cards?"',
          'Limitando gasto: "This is expensive. Can I split the payment - half on credit and half cash?"'
        ]
      },
      {
        english: "I need to insert my PIN.",
        portuguese: "Preciso digitar minha senha.",
        level: 'médio',
        context: 'Pagamento',
        situations: [
          'Cartão de débito: "The terminal is asking for a PIN. I need to insert my PIN for this debit transaction."',
          'Segurança extra: "For security, I need to insert my PIN even though I tapped my card."'
        ]
      },
      {
        english: "Do you take installments?",
        portuguese: "Vocês parcelam?",
        level: 'médio',
        context: 'Pagamento',
        situations: [
          'Compra cara: "This is a big purchase for me. Do you take installments or payment plans?"',
          'Orçamento: "I\'d like to buy this but spread the cost. Do you take installments over several months?"'
        ]
      },
      {
        english: "Can I pay in three payments?",
        portuguese: "Posso pagar em três vezes?",
        level: 'médio',
        context: 'Pagamento',
        situations: [
          'Parcelamento específico: "This costs $300. Can I pay in three payments of $100 each month?"',
          'Facilitando pagamento: "To make this more affordable, can I pay in three payments instead of all at once?"'
        ]
      },
      {
        english: "Is there a transaction fee?",
        portuguese: "Há taxa de transação?",
        level: 'avançado',
        context: 'Pagamento',
        situations: [
          'Verificando custos: "Before I pay with my card, is there a transaction fee for credit card payments?"',
          'Comparando opções: "Is there a transaction fee if I use my debit card versus cash?"'
        ]
      },
      
      // COMPRAS ONLINE - MÉDIO/AVANÇADO
      {
        english: "What's the shipping cost?",
        portuguese: "Qual é o custo do frete?",
        level: 'médio',
        context: 'Online',
        situations: [
          'Calculando total: "I like this item but what\'s the shipping cost? I want to know the total price."',
          'Comparando opções: "What\'s the shipping cost for standard delivery versus express shipping?"'
        ]
      },
      {
        english: "How long is delivery?",
        portuguese: "Quanto tempo demora a entrega?",
        level: 'médio',
        context: 'Online',
        situations: [
          'Planejando compra: "I need this for next week. How long is delivery to my address?"',
          'Decidindo shipping: "How long is delivery with regular shipping versus express?"'
        ]
      },
      {
        english: "Can I track my order?",
        portuguese: "Posso rastrear meu pedido?",
        level: 'médio',
        context: 'Online',
        situations: [
          'Após compra: "I just placed my order. Can I track my order to see when it will arrive?"',
          'Verificando status: "It\'s been 3 days since I ordered. Can I track my order online?"'
        ]
      },
      {
        english: "I need to update my address.",
        portuguese: "Preciso atualizar meu endereço.",
        level: 'médio',
        context: 'Online',
        situations: [
          'Mudou endereço: "I moved last month. I need to update my address before placing this order."',
          'Entrega diferente: "I need to update my address. I want this delivered to my office instead of home."'
        ]
      },
      {
        english: "Is expedited shipping available?",
        portuguese: "Há entrega expressa disponível?",
        level: 'avançado',
        context: 'Online',
        situations: [
          'Urgência: "I need this urgently for a meeting tomorrow. Is expedited shipping available?"',
          'Pagando mais: "I\'m willing to pay extra for faster delivery. Is expedited shipping available?"'
        ]
      },
      {
        english: "My package was damaged.",
        portuguese: "Meu pacote foi danificado.",
        level: 'médio',
        context: 'Online',
        situations: [
          'Reclamando: "I received my order today but my package was damaged during shipping. What can you do?"',
          'Pedindo solução: "My package was damaged and the item inside is broken. Can I get a replacement?"'
        ]
      },
      {
        english: "I didn't receive my order.",
        portuguese: "Não recebi meu pedido.",
        level: 'médio',
        context: 'Online',
        situations: [
          'Prazo vencido: "It\'s been a week past the delivery date. I didn\'t receive my order yet."',
          'Investigando: "The tracking says it was delivered but I didn\'t receive my order. Can you check?"'
        ]
      },
      
      // MERCADO/FEIRA - BÁSICO
      {
        english: "How much per pound?",
        portuguese: "Quanto por libra?",
        level: 'básico',
        context: 'Feira',
        situations: [
          'Na feira: "These apples look great. How much per pound for the red ones?"',
          'Comparando preços: "How much per pound for these tomatoes versus those organic ones?"'
        ]
      },
      {
        english: "Are these apples fresh?",
        portuguese: "Essas maçãs estão frescas?",
        level: 'básico',
        context: 'Feira',
        situations: [
          'Verificando qualidade: "Are these apples fresh? They look good but I want to make sure."',
          'Para cozinhar: "I\'m making a pie tonight. Are these apples fresh and good for baking?"'
        ]
      },
      {
        english: "Can I taste this?",
        portuguese: "Posso provar isso?",
        level: 'básico',
        context: 'Feira',
        situations: [
          'Experimentando: "This cheese looks interesting. Can I taste this before buying?"',
          'Verificando sabor: "I\'ve never tried this fruit before. Can I taste this to see if I like it?"'
        ]
      },
      {
        english: "I'll take two pounds.",
        portuguese: "Vou levar duas libras.",
        level: 'básico',
        context: 'Feira',
        situations: [
          'Comprando quantidade: "These bananas are perfect. I\'ll take two pounds, please."',
          'Após escolher: "I\'ve picked the ones I want. I\'ll take two pounds of these carrots."'
        ]
      },
      {
        english: "What's the best price?",
        portuguese: "Qual é o melhor preço?",
        level: 'médio',
        context: 'Negociação',
        situations: [
          'Negociando: "I\'m buying a lot today. What\'s the best price you can give me for these items?"',
          'Pechinchando: "What\'s the best price for this? Can you do better than the marked price?"'
        ]
      },
      {
        english: "These look good.",
        portuguese: "Esses parecem bons.",
        level: 'básico',
        context: 'Aprovação',
        situations: [
          'Escolhendo produtos: "I\'ve been looking at different options. These look good - I\'ll take them."',
          'Elogiando qualidade: "These look good! Much better quality than the other store."'
        ]
      },
      {
        english: "Do you have ripe bananas?",
        portuguese: "Vocês têm bananas maduras?",
        level: 'básico',
        context: 'Feira',
        situations: [
          'Para comer hoje: "I want to eat them today. Do you have ripe bananas that are ready to eat?"',
          'Fazendo smoothie: "I\'m making a smoothie tonight. Do you have ripe bananas that are sweet?"'
        ]
      },
      
      // FARMÁCIA - MÉDIO
      {
        english: "I need something for a headache.",
        portuguese: "Preciso de algo para dor de cabeça.",
        level: 'médio',
        context: 'Farmácia',
        situations: [
          'Na farmácia: "I have a terrible headache. I need something for a headache that works fast."',
          'Pedindo ajuda: "I need something for a headache. What do you recommend that\'s not too strong?"'
        ]
      },
      {
        english: "Do I need a prescription?",
        portuguese: "Preciso de receita médica?",
        level: 'médio',
        context: 'Farmácia',
        situations: [
          'Perguntando sobre remédio: "I\'d like to buy this antibiotic. Do I need a prescription or can I get it over the counter?"',
          'Verificando requisitos: "Do I need a prescription for this medicine, or can you sell it to me directly?"'
        ]
      },
      {
        english: "What are the side effects?",
        portuguese: "Quais são os efeitos colaterais?",
        level: 'avançado',
        context: 'Farmácia',
        situations: [
          'Preocupação com segurança: "Before I take this medication, what are the side effects I should watch for?"',
          'Informação importante: "What are the side effects of this medicine? I want to know what to expect."'
        ]
      },
      {
        english: "Do you have the generic version?",
        portuguese: "Vocês têm a versão genérica?",
        level: 'avançado',
        context: 'Farmácia',
        situations: [
          'Economizando dinheiro: "This brand name is expensive. Do you have the generic version that\'s cheaper?"',
          'Mesma fórmula: "Do you have the generic version of this medicine? It should have the same active ingredient."'
        ]
      },
      {
        english: "How often should I take this?",
        portuguese: "Com que frequência devo tomar isso?",
        level: 'médio',
        context: 'Farmácia',
        situations: [
          'Seguindo instruções: "I want to take this correctly. How often should I take this medicine - once or twice a day?"',
          'Dosagem correta: "How often should I take this? The label isn\'t clear about the timing."'
        ]
      },
      {
        english: "Is this covered by insurance?",
        portuguese: "Isso é coberto pelo seguro?",
        level: 'avançado',
        context: 'Farmácia',
        situations: [
          'Verificando cobertura: "This medication is expensive. Is this covered by insurance or do I pay the full price?"',
          'Consultando benefícios: "Before I buy this, is this covered by insurance? I have Blue Cross coverage."'
        ]
      },
      
      // ELETRÔNICOS - MÉDIO/AVANÇADO
      {
        english: "Does this come with a warranty?",
        portuguese: "Isso vem com garantia?",
        level: 'médio',
        context: 'Eletrônicos',
        situations: [
          'Comprando eletrônico: "This laptop is expensive. Does this come with a warranty in case something breaks?"',
          'Segurança na compra: "Does this come with a warranty? I want protection if it stops working."'
        ]
      },
      {
        english: "Can you show me how it works?",
        portuguese: "Pode me mostrar como funciona?",
        level: 'médio',
        context: 'Demonstração',
        situations: [
          'Produto novo: "I\'ve never used this type of device. Can you show me how it works before I buy it?"',
          'Entendendo funções: "This has many features. Can you show me how it works? I want to understand all the options."'
        ]
      },
      {
        english: "What's the battery life?",
        portuguese: "Qual é a duração da bateria?",
        level: 'médio',
        context: 'Eletrônicos',
        situations: [
          'Sobre celular: "I use my phone a lot during the day. What\'s the battery life - will it last all day?"',
          'Comparando modelos: "What\'s the battery life on this model compared to the other one you showed me?"'
        ]
      },
      {
        english: "Is this model newer?",
        portuguese: "Este modelo é mais novo?",
        level: 'médio',
        context: 'Comparação',
        situations: [
          'Comparando opções: "You showed me two phones. Is this model newer than the other one?"',
          'Querendo o mais recente: "I want the latest technology. Is this model newer or do you have something more recent?"'
        ]
      },
      {
        english: "Do you offer tech support?",
        portuguese: "Vocês oferecem suporte técnico?",
        level: 'avançado',
        context: 'Eletrônicos',
        situations: [
          'Suporte pós-venda: "If I have problems setting this up, do you offer tech support or help with installation?"',
          'Assistência técnica: "Do you offer tech support if something goes wrong? I\'m not very tech-savvy."'
        ]
      },
      {
        english: "Can I trade in my old device?",
        portuguese: "Posso dar meu aparelho antigo como parte do pagamento?",
        level: 'avançado',
        context: 'Eletrônicos',
        situations: [
          'Trocando por novo: "I have an old iPhone that still works. Can I trade in my old device for credit toward this new one?"',
          'Economizando dinheiro: "Can I trade in my old device? I\'d like to reduce the cost of this new tablet."'
        ]
      },
      {
        english: "What's the return window?",
        portuguese: "Qual é o prazo para devolução?",
        level: 'avançado',
        context: 'Política',
        situations: [
          'Segurança na compra: "In case I don\'t like it or it doesn\'t work, what\'s the return window - 30 days?"',
          'Planejando teste: "I want to try this at home first. What\'s the return window if I need to bring it back?"'
        ]
      },
      
      // COMPRAS GERAIS - BÁSICO/MÉDIO
      {
        english: "Excuse me, where can I find...?",
        portuguese: "Com licença, onde posso encontrar...?",
        level: 'básico',
        context: 'Orientação',
        situations: [
          'Procurando produto: "Excuse me, where can I find the electronics section? I need to buy headphones."',
          'Item específico: "Excuse me, where can I find organic vegetables? I don\'t see them in the regular produce section."'
        ]
      },
      {
        english: "Is there an elevator?",
        portuguese: "Há elevador?",
        level: 'básico',
        context: 'Orientação',
        situations: [
          'Com carrinho pesado: "I have a heavy shopping cart and need to go upstairs. Is there an elevator?"',
          'Acessibilidade: "My grandmother is in a wheelchair. Is there an elevator to access the second floor?"'
        ]
      },
      {
        english: "Where's the restroom?",
        portuguese: "Onde fica o banheiro?",
        level: 'básico',
        context: 'Orientação',
        situations: [
          'Urgência: "Excuse me, this is urgent. Where\'s the restroom?"',
          'Com crianças: "My child needs to use the bathroom. Where\'s the restroom?"'
        ]
      },
      {
        english: "What floor is electronics on?",
        portuguese: "Em que andar fica eletrônicos?",
        level: 'básico',
        context: 'Orientação',
        situations: [
          'Procurando seção: "I need to buy a phone charger. What floor is electronics on?"',
          'Loja de departamentos: "This is a big store. What floor is electronics on? I need a laptop."'
        ]
      },
      {
        english: "Do you have a store map?",
        portuguese: "Vocês têm um mapa da loja?",
        level: 'básico',
        context: 'Orientação',
        situations: [
          'Loja grande: "This store is enormous and confusing. Do you have a store map to help me navigate?"',
          'Primeira visita: "This is my first time here. Do you have a store map? I\'m looking for several departments."'
        ]
      },
      {
        english: "I'm looking for customer service.",
        portuguese: "Estou procurando atendimento ao cliente.",
        level: 'médio',
        context: 'Serviços',
        situations: [
          'Precisando ajuda: "I have a problem with my purchase. I\'m looking for customer service to help me resolve it."',
          'Devolução: "I\'m looking for customer service. I need to return this item and get my money back."'
        ]
      },
      {
        english: "Can I speak to a manager?",
        portuguese: "Posso falar com um gerente?",
        level: 'médio',
        context: 'Reclamação',
        situations: [
          'Problema sério: "This employee was very rude to me. Can I speak to a manager about this situation?"',
          'Resolução de conflito: "I\'m not satisfied with this service. Can I speak to a manager to resolve this issue?"'
        ]
      },
      {
        english: "I have a complaint.",
        portuguese: "Tenho uma reclamação.",
        level: 'médio',
        context: 'Reclamação',
        situations: [
          'Insatisfação: "I have a complaint about the service I received today. The staff was very unprofessional."',
          'Produto defeituoso: "I have a complaint. This item broke after just one day and I want a full refund."'
        ]
      },
      
      // PREÇOS E OFERTAS - BÁSICO/MÉDIO
      {
        english: "Is there a student discount?",
        portuguese: "Há desconto para estudante?",
        level: 'médio',
        context: 'Desconto',
        situations: [
          'Economizando: "I\'m a college student on a budget. Is there a student discount I can use?"',
          'Com ID estudantil: "Is there a student discount? I have my student ID card with me."'
        ]
      },
      {
        english: "Do you price match?",
        portuguese: "Vocês igualam preços?",
        level: 'avançado',
        context: 'Preços',
        situations: [
          'Melhor preço: "I found this same item cheaper at another store. Do you price match their offer?"',
          'Comparando lojas: "Do you price match? I want to buy here but I saw a better price online."'
        ]
      },
      {
        english: "When does the sale end?",
        portuguese: "Quando acaba a promoção?",
        level: 'básico',
        context: 'Promoção',
        situations: [
          'Planejando compra: "I\'m interested in these discounted items. When does the sale end?"',
          'Urgência: "When does the sale end? I need to know if I should buy this today or if I have more time."'
        ]
      },
      {
        english: "Can I get a rain check?",
        portuguese: "Posso pegar um vale para quando houver estoque?",
        level: 'avançado',
        context: 'Estoque',
        situations: [
          'Item em falta: "This sale item is out of stock. Can I get a rain check so I can buy it later at this price?"',
          'Garantindo preço: "Can I get a rain check? I want to make sure I get this sale price when the item is back in stock."'
        ]
      },
      {
        english: "Is this the final price?",
        portuguese: "Este é o preço final?",
        level: 'básico',
        context: 'Preços',
        situations: [
          'Verificando total: "Is this the final price or are there taxes and fees that will be added at checkout?"',
          'Confirmando custo: "Before I buy this, is this the final price I\'ll pay, or will there be additional charges?"'
        ]
      },
      {
        english: "Are there any hidden fees?",
        portuguese: "Há taxas escondidas?",
        level: 'avançado',
        context: 'Preços',
        situations: [
          'Desconfiando: "The price seems too good to be true. Are there any hidden fees I should know about?"',
          'Transparencia: "Are there any hidden fees like processing charges, shipping, or handling fees added later?"'
        ]
      },
      {
        english: "That's a bit expensive.",
        portuguese: "Isso está um pouco caro.",
        level: 'básico',
        context: 'Preços'
      },
      {
        english: "Can you do better on the price?",
        portuguese: "Você pode melhorar o preço?",
        level: 'médio',
        context: 'Negociação'
      },
      {
        english: "I'll think about it.",
        portuguese: "Vou pensar sobre isso.",
        level: 'básico',
        context: 'Decisão'
      },
      {
        english: "I'll take it!",
        portuguese: "Vou levar!",
        level: 'básico',
        context: 'Decisão'
      },
      
      // DELIVERY E COMPRAS ONLINE - AVANÇADO
      {
        english: "Can I schedule a delivery?",
        portuguese: "Posso agendar uma entrega?",
        level: 'médio',
        context: 'Entrega'
      },
      {
        english: "I need curbside pickup.",
        portuguese: "Preciso de retirada no carro.",
        level: 'avançado',
        context: 'Entrega'
      },
      {
        english: "Is same-day delivery available?",
        portuguese: "Há entrega no mesmo dia?",
        level: 'médio',
        context: 'Entrega'
      },
      {
        english: "Can I modify my order?",
        portuguese: "Posso modificar meu pedido?",
        level: 'médio',
        context: 'Online'
      },
      {
        english: "I want to cancel my order.",
        portuguese: "Quero cancelar meu pedido.",
        level: 'médio',
        context: 'Online'
      },
      {
        english: "The website is not working.",
        portuguese: "O site não está funcionando.",
        level: 'médio',
        context: 'Online'
      },
      {
        english: "I forgot my password.",
        portuguese: "Esqueci minha senha.",
        level: 'básico',
        context: 'Online'
      },
      {
        english: "Can I create an account?",
        portuguese: "Posso criar uma conta?",
        level: 'básico',
        context: 'Online'
      },
      
      // FINAL - CORTESIA E FINALIZAÇÕES
      {
        english: "Thank you for your help.",
        portuguese: "Obrigado pela sua ajuda.",
        level: 'básico',
        context: 'Cortesia'
      },
      {
        english: "Have a great day!",
        portuguese: "Tenha um ótimo dia!",
        level: 'básico',
        context: 'Cortesia'
      },
      {
        english: "I'll come back later.",
        portuguese: "Volto mais tarde.",
        level: 'básico',
        context: 'Despedida'
      },
      {
        english: "This store has great service.",
        portuguese: "Esta loja tem ótimo atendimento.",
        level: 'médio',
        context: 'Elogio'
      },
      {
        english: "I'll recommend this place.",
        portuguese: "Vou recomendar este lugar.",
        level: 'médio',
        context: 'Elogio'
      }
    ],
    exercises: [
      {
        id: 'mercado-ex-1',
        correctSentence: 'How much does this cost?',
        words: ['How', 'much', 'does', 'this', 'cost?'],
        translation: 'Quanto custa isso?'
      },
      {
        id: 'mercado-ex-2',
        correctSentence: 'Can I pay by card?',
        words: ['Can', 'I', 'pay', 'by', 'card?'],
        translation: 'Posso pagar com cartão?'
      },
      {
        id: 'mercado-ex-3',
        correctSentence: 'Where is the milk section?',
        words: ['Where', 'is', 'the', 'milk', 'section?'],
        translation: 'Onde fica a seção de leites?'
      },
      {
        id: 'mercado-ex-4',
        correctSentence: 'Do you have a shopping cart?',
        words: ['Do', 'you', 'have', 'a', 'shopping', 'cart?'],
        translation: 'Vocês têm carrinho de compras?'
      },
      {
        id: 'mercado-ex-5',
        correctSentence: 'Is there a discount today?',
        words: ['Is', 'there', 'a', 'discount', 'today?'],
        translation: 'Há desconto hoje?'
      }
    ]
  },
  passeios: {
    title: 'Inglês para Passeios',
    icon: '🚶‍♂️',
    description: 'Frases para tickets, atrações e direções',
    phrases: [
      // ========== FRASES FREE (10) ==========
      {
        english: "How much is the entrance fee?",
        portuguese: "Quanto custa a entrada?",
        level: 'básico',
        context: 'Ingressos',
        situations: [
          'Na bilheteria: "I\'m interested in visiting today. How much is the entrance fee for one adult?"',
          'Planejando orçamento: "Before I decide to visit, how much is the entrance fee? I\'m traveling on a budget."'
        ]
      },
      {
        english: "Where can I buy tickets?",
        portuguese: "Onde posso comprar ingressos?",
        level: 'básico',
        context: 'Ingressos',
        situations: [
          'Chegando no local: "I just arrived and I\'m ready to visit. Where can I buy tickets?"',
          'Procurando bilheteria: "Where can I buy tickets? I don\'t see a ticket office around here."'
        ]
      },
      {
        english: "What time does it close?",
        portuguese: "Que horas fecha?",
        level: 'básico',
        context: 'Horários',
        situations: [
          'Planejando visita: "I want to make sure I have enough time to see everything. What time does it close?"',
          'Chegando tarde: "It\'s already 4 PM. What time does it close? Do I still have time for a visit?"'
        ]
      },
      {
        english: "How do I get there?",
        portuguese: "Como chego lá?",
        level: 'básico',
        context: 'Direções',
        situations: [
          'Pedindo direções: "I\'m staying downtown and want to visit the museum. How do I get there by public transport?"',
          'Opções de transporte: "How do I get there from the airport? Should I take a taxi, bus, or metro?"'
        ]
      },
      {
        english: "Is there a guided tour?",
        portuguese: "Há tour guiado?",
        level: 'básico',
        context: 'Tours',
        situations: [
          'Querendo mais informações: "I want to learn about the history and details. Is there a guided tour available?"',
          'Primeira visita: "This is my first time here. Is there a guided tour that explains everything?"'
        ]
      },
      {
        english: "Can I take pictures here?",
        portuguese: "Posso tirar fotos aqui?",
        level: 'básico',
        context: 'Fotografia',
        situations: [
          'Respeitando regras: "This is beautiful and I\'d love to capture it. Can I take pictures here?"',
          'Verificando permissão: "Can I take pictures here or are there restrictions? I want to follow the rules."'
        ]
      },
      {
        english: "What time do you open?",
        portuguese: "Que horas vocês abrem?",
        level: 'básico',
        context: 'Horários',
        situations: [
          'Planejando dia: "I want to start early tomorrow. What time do you open in the morning?"',
          'Chegando cedo: "What time do you open? I\'d like to be one of the first visitors to avoid crowds."'
        ]
      },
      {
        english: "Is there a student discount?",
        portuguese: "Há desconto para estudante?",
        level: 'básico',
        context: 'Desconto',
        situations: [
          'Economizando: "I\'m a college student and money is tight. Is there a student discount available?"',
          'Com documentação: "Is there a student discount? I have my student ID card with me as proof."'
        ]
      },
      {
        english: "How long does the tour last?",
        portuguese: "Quanto tempo dura o tour?",
        level: 'médio',
        context: 'Tours',
        situations: [
          'Planejando agenda: "I have other plans today. How long does the tour last? I need to know for scheduling."',
          'Organizando tempo: "How long does the tour last? I want to plan my day and see other attractions too."'
        ]
      },
      {
        english: "Can I book tickets online?",
        portuguese: "Posso comprar ingressos online?",
        level: 'médio',
        context: 'Reserva',
        situations: [
          'Evitando filas: "I hate waiting in lines. Can I book tickets online and skip the queue?"',
          'Planejando viagem: "Can I book tickets online before my trip? I want to guarantee my entry."'
        ]
      },

      // ========== FRASES PREMIUM ==========
      {
        english: "Where can I buy souvenirs?",
        portuguese: "Onde posso comprar lembrancinhas?",
        level: 'básico',
        context: 'Compras',
        situations: [
          'Para família: "I want to bring something back for my family. Where can I buy souvenirs around here?"',
          'Procurando autênticos: "Where can I buy souvenirs that are locally made? I prefer authentic items over mass-produced ones."'
        ]
      },
      {
        english: "Is there an audio guide?",
        portuguese: "Há um guia de áudio?",
        level: 'médio',
        context: 'Guia',
        situations: [
          'Visitando sozinho: "I\'m exploring on my own. Is there an audio guide that can provide detailed information?"',
          'Em outro idioma: "Is there an audio guide available in English? I want to understand the exhibits better."'
        ]
      },
      {
        english: "What's the history of this place?",
        portuguese: "Qual é a história deste lugar?",
        level: 'médio',
        context: 'História',
        situations: [
          'Curiosidade histórica: "This building looks ancient and fascinating. What\'s the history of this place?"',
          'Para guia: "What\'s the history of this place? I\'d love to hear some interesting stories or legends."'
        ]
      },
      {
        english: "Are there any festivals this week?",
        portuguese: "Há algum festival esta semana?",
        level: 'médio',
        context: 'Eventos',
        situations: [
          'Turista curioso: "I\'m visiting for a few days. Are there any festivals this week that I shouldn\'t miss?"',
          'Experiência cultural: "Are there any festivals this week? I\'d love to experience local culture and traditions."'
        ]
      },
      {
        english: "Can you recommend a local restaurant?",
        portuguese: "Você pode recomendar um restaurante local?",
        level: 'básico',
        context: 'Recomendação',
        situations: [
          'Perguntando ao concierge: "Can you recommend a local restaurant with authentic cuisine? I want to try traditional dishes."',
          'Para morador local: "Can you recommend a local restaurant where locals eat? I prefer authentic places over tourist spots."'
        ]
      },
      {
        english: "Where is the best viewpoint?",
        portuguese: "Onde fica o melhor mirante?",
        level: 'básico',
        context: 'Vista',
        situations: [
          'Para fotos: "I want to take some great photos of the city skyline. Where is the best viewpoint around here?"',
          'Admirando paisagem: "Where is the best viewpoint to see the sunset? I heard there\'s an amazing spot nearby."'
        ]
      },
      {
        english: "Is it safe to walk here at night?",
        portuguese: "É seguro caminhar aqui à noite?",
        level: 'médio',
        context: 'Segurança',
        situations: [
          'Preocupação com segurança: "I\'m staying nearby and planning to walk back to my hotel. Is it safe to walk here at night?"',
          'Vida noturna: "Is it safe to walk here at night? I\'d like to explore the nightlife in this area."'
        ]
      },
      {
        english: "Can I get a map of the area?",
        portuguese: "Posso pegar um mapa da área?",
        level: 'básico',
        context: 'Orientação',
        situations: [
          'No centro de informações: "Can I get a map of the area? I want to explore on foot and see all the main attractions."',
          'Orientação: "Can I get a map of the area? I prefer having a physical map instead of using my phone all the time."'
        ]
      },
      {
        english: "What's the local specialty?",
        portuguese: "Qual é a especialidade local?",
        level: 'básico',
        context: 'Cultura',
        situations: [
          'Descobrindo culinária: "I want to try something authentic and traditional. What\'s the local specialty that I absolutely must taste?"',
          'No restaurante: "What\'s the local specialty here? I\'d like to order something representative of this region."'
        ]
      },
      {
        english: "Are there any free activities?",
        portuguese: "Há alguma atividade gratuita?",
        level: 'básico',
        context: 'Atividades',
        situations: [
          'Viajando com orçamento apertado: "I\'m traveling on a budget. Are there any free activities or attractions I can enjoy here?"',
          'Economizando: "Are there any free activities like walking tours, parks, or museums with free admission days?"'
        ]
      },
      {
        english: "How do I get to the old town?",
        portuguese: "Como chego à cidade velha?",
        level: 'básico',
        context: 'Direções',
        situations: [
          'Pedindo direções: "I want to visit the historic center. How do I get to the old town from here?"',
          'Opções de transporte: "How do I get to the old town? Should I take the bus, metro, or is it walking distance?"'
        ]
      },
      {
        english: "Is this area wheelchair accessible?",
        portuguese: "Esta área é acessível para cadeira de rodas?",
        level: 'avançado',
        context: 'Acessibilidade',
        situations: [
          'Verificando acessibilidade: "I\'m traveling with someone who uses a wheelchair. Is this area wheelchair accessible?"',
          'Planejando visita: "Is this area wheelchair accessible? We need to plan our route carefully for accessibility."'
        ]
      },
      {
        english: "What are the must-see attractions?",
        portuguese: "Quais são as atrações imperdíveis?",
        level: 'médio',
        context: 'Turismo',
        situations: [
          'Centro de informações: "Hi, I\'m visiting for just two days. What are the must-see attractions in this city?"',
          'Perguntando a local: "I\'m a tourist and want to make the most of my time. What are the must-see attractions here?"'
        ]
      },
      {
        english: "Are there guided tours available?",
        portuguese: "Há tours guiados disponíveis?",
        level: 'médio',
        context: 'Tours',
        situations: [
          'Querendo guia: "I\'d like to learn more about this place. Are there guided tours available today?"',
          'Planejando visita: "Are there guided tours available? I prefer having an expert explain the history and details."'
        ]
      },
      {
        english: "Can I bring my camera inside?",
        portuguese: "Posso levar minha câmera para dentro?",
        level: 'médio',
        context: 'Fotografia',
        situations: [
          'Check de segurança: "I have a professional camera with me. Can I bring my camera inside or are there restrictions?"',
          'Verificando regras: "Can I bring my camera inside? I want to take photos but I don\'t want to break any rules."'
        ]
      },
      {
        english: "What's the best time to visit?",
        portuguese: "Qual é a melhor hora para visitar?",
        level: 'médio',
        context: 'Planejamento',
        situations: [
          'Evitando multidões: "I want to avoid crowds and enjoy the experience. What\'s the best time to visit - early morning?"',
          'Melhor experiência: "What\'s the best time to visit for the most beautiful views and ideal weather conditions?"'
        ]
      },
      {
        english: "Do you offer group discounts?",
        portuguese: "Vocês oferecem desconto para grupo?",
        level: 'avançado',
        context: 'Desconto',
        situations: [
          'Viagem em grupo: "We\'re a group of 15 people visiting together. Do you offer group discounts for large parties?"',
          'Organizando excursão: "I\'m organizing a school trip with 20 students. Do you offer group discounts for educational visits?"'
        ]
      },
      {
        english: "Is there a dress code here?",
        portuguese: "Há código de vestimenta aqui?",
        level: 'avançado',
        context: 'Etiqueta',
        situations: [
          'Local religioso: "I\'m visiting this temple and want to be respectful. Is there a dress code here?"',
          'Verificando apropriado: "Is there a dress code here? I want to make sure my clothes are appropriate for this place."'
        ]
      },
      {
        english: "Can I get a refund if it rains?",
        portuguese: "Posso ter reembolso se chover?",
        level: 'avançado',
        context: 'Política',
        situations: [
          'Atividade ao ar livre: "This is an outdoor tour and the weather looks uncertain. Can I get a refund if it rains?"',
          'Política de cancelamento: "Can I get a refund if it rains and the experience is cancelled or significantly affected?"'
        ]
      },
      {
        english: "Where can I store my luggage?",
        portuguese: "Onde posso guardar minha bagagem?",
        level: 'médio',
        context: 'Bagagem',
        situations: [
          'Entre voos: "I have a long layover and want to explore the city. Where can I store my luggage?"',
          'Após checkout: "I checked out of my hotel but my flight is tonight. Where can I store my luggage for the day?"'
        ]
      }
    ],
    exercises: [
      {
        id: 'passeios-ex-1',
        correctSentence: 'How much is the ticket?',
        words: ['How', 'much', 'is', 'the', 'ticket?'],
        translation: 'Quanto custa o ingresso?',
        situations: [
          'Na bilheteria: "I\'d like to visit the museum today. How much is the ticket for one adult?"',
          'Comparando preços: "How much is the ticket? I want to see if it fits in my daily budget."'
        ]
      },
      {
        id: 'passeios-ex-2',
        correctSentence: 'What time does it open?',
        words: ['What', 'time', 'does', 'it', 'open?'],
        translation: 'Que horas abre?',
        situations: [
          'Planejando o dia: "I want to be one of the first visitors. What time does it open in the morning?"',
          'Chegando cedo: "What time does it open? I\'d like to start my sightseeing early to avoid crowds."'
        ]
      },
      {
        id: 'passeios-ex-3',
        correctSentence: 'Where is the entrance?',
        words: ['Where', 'is', 'the', 'entrance?'],
        translation: 'Onde fica a entrada?',
        situations: [
          'Procurando entrada: "I\'m here for the tour but I can\'t find the way in. Where is the entrance?"',
          'Lugar grande: "This building is huge and confusing. Where is the entrance for visitors?"'
        ]
      },
      {
        id: 'passeios-ex-4',
        correctSentence: 'Can I take photos here?',
        words: ['Can', 'I', 'take', 'photos', 'here?'],
        translation: 'Posso tirar fotos aqui?',
        situations: [
          'Respeitando regras: "This is beautiful and I\'d love to capture it. Can I take photos here?"',
          'Verificando permissão: "Can I take photos here or are there restrictions? I want to follow the rules."'
        ]
      },
      {
        id: 'passeios-ex-5',
        correctSentence: 'Is there a guided tour?',
        words: ['Is', 'there', 'a', 'guided', 'tour?'],
        translation: 'Há tour guiado?',
        situations: [
          'Querendo mais informações: "I want to learn about the history and details. Is there a guided tour available?"',
          'Primeira visita: "This is my first time here. Is there a guided tour that explains everything?"'
        ]
      }
    ]
  },
  amigos: {
    title: 'Inglês para Amigos',
    icon: '👥',
    description: 'Convites, conversas casuais e socialização',
    phrases: [
      // ========== FRASES FREE (10) ==========
      {
        english: "Would you like to hang out?",
        portuguese: "Você gostaria de sair?",
        level: 'básico',
        context: 'Convites'
      },
      {
        english: "Let's grab a coffee.",
        portuguese: "Vamos tomar um café.",
        level: 'básico',
        context: 'Convites'
      },
      {
        english: "What are you up to?",
        portuguese: "O que você está fazendo?",
        level: 'básico',
        context: 'Conversa'
      },
      {
        english: "How was your weekend?",
        portuguese: "Como foi seu fim de semana?",
        level: 'básico',
        context: 'Conversa'
      },
      {
        english: "Want to join us?",
        portuguese: "Quer se juntar a nós?",
        level: 'básico',
        context: 'Convites'
      },
      {
        english: "What's new with you?",
        portuguese: "O que há de novo com você?",
        level: 'básico',
        context: 'Conversa'
      },
      {
        english: "Are you free tonight?",
        portuguese: "Você está livre hoje à noite?",
        level: 'básico',
        context: 'Convites'
      },
      {
        english: "Let's catch up soon.",
        portuguese: "Vamos nos atualizar em breve.",
        level: 'médio',
        context: 'Planos'
      },
      {
        english: "I had a great time!",
        portuguese: "Me diverti muito!",
        level: 'básico',
        context: 'Agradecimento'
      },
      {
        english: "Thanks for inviting me.",
        portuguese: "Obrigado por me convidar.",
        level: 'básico',
        context: 'Agradecimento'
      },

      // ========== FRASES PREMIUM (100+ frases adicionais) ==========
      // BÁSICO (35 frases)
      {
        english: "How's it going?",
        portuguese: "Como vai?",
        level: 'básico',
        context: 'Cumprimento'
      },
      {
        english: "Long time no see!",
        portuguese: "Quanto tempo sem nos ver!",
        level: 'básico',
        context: 'Reencontro'
      },
      {
        english: "What's up?",
        portuguese: "E aí?",
        level: 'básico',
        context: 'Cumprimento'
      },
      {
        english: "Let's hang out later.",
        portuguese: "Vamos sair mais tarde.",
        level: 'básico',
        context: 'Convites'
      },
      {
        english: "See you around!",
        portuguese: "Te vejo por aí!",
        level: 'básico',
        context: 'Despedida'
      },
      {
        english: "Take care!",
        portuguese: "Se cuida!",
        level: 'básico',
        context: 'Despedida'
      },
      {
        english: "How's your family?",
        portuguese: "Como está sua família?",
        level: 'básico',
        context: 'Conversa'
      },
      {
        english: "Nice to see you again.",
        portuguese: "Legal te ver de novo.",
        level: 'básico',
        context: 'Reencontro'
      },
      {
        english: "You look great!",
        portuguese: "Você está ótimo!",
        level: 'básico',
        context: 'Elogio'
      },
      {
        english: "Let's get together sometime.",
        portuguese: "Vamos nos reunir alguma hora.",
        level: 'básico',
        context: 'Planos'
      },
      {
        english: "I missed you!",
        portuguese: "Senti sua falta!",
        level: 'básico',
        context: 'Sentimento'
      },
      {
        english: "What do you think?",
        portuguese: "O que você acha?",
        level: 'básico',
        context: 'Opinião'
      },
      {
        english: "That sounds fun!",
        portuguese: "Isso parece divertido!",
        level: 'básico',
        context: 'Entusiasmo'
      },
      {
        english: "Count me in!",
        portuguese: "Pode contar comigo!",
        level: 'básico',
        context: 'Aceitação'
      },
      {
        english: "I'm in!",
        portuguese: "Eu topo!",
        level: 'básico',
        context: 'Aceitação'
      },
      {
        english: "No way!",
        portuguese: "De jeito nenhum!",
        level: 'básico',
        context: 'Surpresa'
      },
      {
        english: "Are you serious?",
        portuguese: "Você está falando sério?",
        level: 'básico',
        context: 'Surpresa'
      },
      {
        english: "That's awesome!",
        portuguese: "Isso é incrível!",
        level: 'básico',
        context: 'Entusiasmo'
      },
      {
        english: "Cool!",
        portuguese: "Legal!",
        level: 'básico',
        context: 'Aprovação'
      },
      {
        english: "Sounds good to me.",
        portuguese: "Parece bom para mim.",
        level: 'básico',
        context: 'Concordância'
      },
      {
        english: "I'm down for that.",
        portuguese: "Eu topo isso.",
        level: 'básico',
        context: 'Aceitação'
      },
      {
        english: "Let me know!",
        portuguese: "Me avisa!",
        level: 'básico',
        context: 'Comunicação'
      },
      {
        english: "Text me later.",
        portuguese: "Me manda mensagem depois.",
        level: 'básico',
        context: 'Comunicação'
      },
      {
        english: "Call me!",
        portuguese: "Me liga!",
        level: 'básico',
        context: 'Comunicação'
      },
      {
        english: "What time works for you?",
        portuguese: "Que horas funciona para você?",
        level: 'básico',
        context: 'Planejamento'
      },
      {
        english: "I can't make it.",
        portuguese: "Não vou conseguir ir.",
        level: 'básico',
        context: 'Cancelamento'
      },
      {
        english: "Maybe next time.",
        portuguese: "Talvez na próxima.",
        level: 'básico',
        context: 'Adiamento'
      },
      {
        english: "Rain check?",
        portuguese: "Fica para outra?",
        level: 'básico',
        context: 'Adiamento'
      },
      {
        english: "You bet!",
        portuguese: "Com certeza!",
        level: 'básico',
        context: 'Confirmação'
      },
      {
        english: "Absolutely!",
        portuguese: "Absolutamente!",
        level: 'básico',
        context: 'Confirmação'
      },
      {
        english: "For sure!",
        portuguese: "Com certeza!",
        level: 'básico',
        context: 'Confirmação'
      },
      {
        english: "Good to see you!",
        portuguese: "Bom te ver!",
        level: 'básico',
        context: 'Cumprimento'
      },
      {
        english: "How have you been?",
        portuguese: "Como você tem estado?",
        level: 'básico',
        context: 'Conversa'
      },
      {
        english: "What's the plan?",
        portuguese: "Qual é o plano?",
        level: 'básico',
        context: 'Planejamento'
      },
      {
        english: "I'm excited!",
        portuguese: "Estou animado!",
        level: 'básico',
        context: 'Entusiasmo'
      },

      // MÉDIO (40 frases)
      {
        english: "What's been keeping you busy?",
        portuguese: "O que tem te deixado ocupado?",
        level: 'médio',
        context: 'Conversa'
      },
      {
        english: "We should do this more often.",
        portuguese: "Devíamos fazer isso mais vezes.",
        level: 'médio',
        context: 'Sugestão'
      },
      {
        english: "How do you know each other?",
        portuguese: "Como vocês se conhecem?",
        level: 'médio',
        context: 'Apresentação'
      },
      {
        english: "Have you tried that new restaurant?",
        portuguese: "Você experimentou aquele restaurante novo?",
        level: 'médio',
        context: 'Recomendação',
        situations: [
          'Conversa com amigo: "Have you tried that new restaurant downtown? I\'ve been curious about their Italian menu."',
          'Pedindo opinião: "Have you tried that new restaurant everyone\'s talking about? Is it worth the hype?"'
        ]
      },
      {
        english: "I'm so glad we met up.",
        portuguese: "Estou muito feliz que nos encontramos.",
        level: 'médio',
        context: 'Sentimento'
      },
      {
        english: "What are you in the mood for?",
        portuguese: "Do que você está com vontade?",
        level: 'médio',
        context: 'Preferência'
      },
      {
        english: "I can't believe it's been so long!",
        portuguese: "Não acredito que faz tanto tempo!",
        level: 'médio',
        context: 'Reencontro'
      },
      {
        english: "You haven't changed a bit!",
        portuguese: "Você não mudou nada!",
        level: 'médio',
        context: 'Elogio'
      },
      {
        english: "What's your plan for the holidays?",
        portuguese: "Qual seu plano para as férias?",
        level: 'médio',
        context: 'Planos'
      },
      {
        english: "I'm thinking of trying something new.",
        portuguese: "Estou pensando em tentar algo novo.",
        level: 'médio',
        context: 'Mudança'
      },
      {
        english: "I completely forgot about that!",
        portuguese: "Esqueci completamente disso!",
        level: 'médio',
        context: 'Memória'
      },
      {
        english: "I'll keep you posted.",
        portuguese: "Te manterei informado.",
        level: 'médio',
        context: 'Comunicação'
      },
      {
        english: "It's been forever!",
        portuguese: "Faz uma eternidade!",
        level: 'médio',
        context: 'Reencontro'
      },
      {
        english: "How's life treating you?",
        portuguese: "Como a vida está te tratando?",
        level: 'médio',
        context: 'Conversa'
      },
      {
        english: "I've been meaning to call you.",
        portuguese: "Tenho querido te ligar.",
        level: 'médio',
        context: 'Desculpa'
      },
      {
        english: "You should come by sometime.",
        portuguese: "Você deveria aparecer algum dia.",
        level: 'médio',
        context: 'Convite'
      },
      {
        english: "Let's not be strangers.",
        portuguese: "Não vamos ser estranhos.",
        level: 'médio',
        context: 'Compromisso'
      },
      {
        english: "I've been swamped with work.",
        portuguese: "Tenho estado atolado de trabalho.",
        level: 'médio',
        context: 'Desculpa'
      },
      {
        english: "Things have been crazy lately.",
        portuguese: "As coisas têm estado loucas ultimamente.",
        level: 'médio',
        context: 'Vida'
      },
      {
        english: "I could really use a break.",
        portuguese: "Eu realmente preciso de uma pausa.",
        level: 'médio',
        context: 'Cansaço'
      },
      {
        english: "What have you been up to lately?",
        portuguese: "O que você tem feito ultimamente?",
        level: 'médio',
        context: 'Conversa'
      },
      {
        english: "I heard through the grapevine that...",
        portuguese: "Ouvi dizer que...",
        level: 'médio',
        context: 'Fofoca'
      },
      {
        english: "Speaking of which...",
        portuguese: "Falando nisso...",
        level: 'médio',
        context: 'Transição'
      },
      {
        english: "That rings a bell.",
        portuguese: "Isso me soa familiar.",
        level: 'médio',
        context: 'Memória'
      },
      {
        english: "I'm all ears.",
        portuguese: "Sou todo ouvidos.",
        level: 'médio',
        context: 'Atenção'
      },
      {
        english: "You crack me up!",
        portuguese: "Você me faz rir!",
        level: 'médio',
        context: 'Humor'
      },
      {
        english: "I'm feeling a bit under the weather.",
        portuguese: "Estou me sentindo meio mal.",
        level: 'médio',
        context: 'Saúde'
      },
      {
        english: "I'm on cloud nine!",
        portuguese: "Estou nas nuvens!",
        level: 'médio',
        context: 'Felicidade'
      },
      {
        english: "Let's play it by ear.",
        portuguese: "Vamos ver como as coisas vão.",
        level: 'médio',
        context: 'Flexibilidade'
      },
      {
        english: "I'm keeping my fingers crossed.",
        portuguese: "Estou torcendo.",
        level: 'médio',
        context: 'Esperança'
      },
      {
        english: "It's a small world!",
        portuguese: "O mundo é pequeno!",
        level: 'médio',
        context: 'Coincidência'
      },
      {
        english: "Better late than never.",
        portuguese: "Antes tarde do que nunca.",
        level: 'médio',
        context: 'Atraso'
      },
      {
        english: "I'm running late.",
        portuguese: "Estou atrasado.",
        level: 'médio',
        context: 'Pontualidade'
      },
      {
        english: "My schedule is packed.",
        portuguese: "Minha agenda está lotada.",
        level: 'médio',
        context: 'Ocupação'
      },
      {
        english: "I need to bounce.",
        portuguese: "Preciso vazar.",
        level: 'médio',
        context: 'Partida'
      },
      {
        english: "Time flies when you're having fun.",
        portuguese: "O tempo voa quando você se diverte.",
        level: 'médio',
        context: 'Tempo'
      },
      {
        english: "I'm having second thoughts.",
        portuguese: "Estou repensando.",
        level: 'médio',
        context: 'Dúvida'
      },
      {
        english: "Let's call it a night.",
        portuguese: "Vamos encerrar a noite.",
        level: 'médio',
        context: 'Finalização'
      },
      {
        english: "I'm beat.",
        portuguese: "Estou exausto.",
        level: 'médio',
        context: 'Cansaço'
      },
      {
        english: "Let's touch base soon.",
        portuguese: "Vamos nos falar em breve.",
        level: 'médio',
        context: 'Comunicação'
      },

      // AVANÇADO (35 frases)
      {
        english: "This place brings back memories.",
        portuguese: "Este lugar traz memórias.",
        level: 'avançado',
        context: 'Nostalgia'
      },
      {
        english: "You should definitely give it a try.",
        portuguese: "Você definitivamente deveria tentar.",
        level: 'avançado',
        context: 'Encorajamento'
      },
      {
        english: "I'm really looking forward to it.",
        portuguese: "Estou realmente ansioso por isso.",
        level: 'avançado',
        context: 'Expectativa'
      },
      {
        english: "That reminds me of something funny.",
        portuguese: "Isso me lembra de algo engraçado.",
        level: 'avançado',
        context: 'História'
      },
      {
        english: "Let's make this a regular thing.",
        portuguese: "Vamos fazer disso algo regular.",
        level: 'avançado',
        context: 'Compromisso'
      },
      {
        english: "I hate to be the bearer of bad news, but...",
        portuguese: "Odeio ser o portador de más notícias, mas...",
        level: 'avançado',
        context: 'Má notícia'
      },
      {
        english: "I'm completely in awe of what you've accomplished.",
        portuguese: "Estou completamente impressionado com o que você conquistou.",
        level: 'avançado',
        context: 'Admiração'
      },
      {
        english: "You've really outdone yourself this time.",
        portuguese: "Você realmente se superou desta vez.",
        level: 'avançado',
        context: 'Elogio'
      },
      {
        english: "I couldn't agree with you more.",
        portuguese: "Não poderia concordar mais com você.",
        level: 'avançado',
        context: 'Concordância'
      },
      {
        english: "That's a tough pill to swallow.",
        portuguese: "Isso é difícil de engolir.",
        level: 'avançado',
        context: 'Dificuldade'
      },
      {
        english: "I'm torn between two options.",
        portuguese: "Estou dividido entre duas opções.",
        level: 'avançado',
        context: 'Indecisão'
      },
      {
        english: "It's worth keeping in mind that...",
        portuguese: "Vale a pena ter em mente que...",
        level: 'avançado',
        context: 'Consideração'
      },
      {
        english: "I'm inclined to think that...",
        portuguese: "Estou inclinado a pensar que...",
        level: 'avançado',
        context: 'Opinião'
      },
      {
        english: "That's food for thought.",
        portuguese: "Isso dá o que pensar.",
        level: 'avançado',
        context: 'Reflexão'
      },
      {
        english: "I'm at a crossroads in my life.",
        portuguese: "Estou numa encruzilhada da minha vida.",
        level: 'avançado',
        context: 'Decisão'
      },
      {
        english: "It's a blessing in disguise.",
        portuguese: "É uma bênção disfarçada.",
        level: 'avançado',
        context: 'Otimismo'
      },
      {
        english: "You hit the nail on the head.",
        portuguese: "Você acertou em cheio.",
        level: 'avançado',
        context: 'Precisão'
      },
      {
        english: "I'm walking on air!",
        portuguese: "Estou flutuando!",
        level: 'avançado',
        context: 'Euforia'
      },
      {
        english: "That's the tip of the iceberg.",
        portuguese: "Isso é só a ponta do iceberg.",
        level: 'avançado',
        context: 'Revelação'
      },
      {
        english: "I'm keeping my options open.",
        portuguese: "Estou mantendo minhas opções em aberto.",
        level: 'avançado',
        context: 'Flexibilidade'
      },
      {
        english: "It's been weighing on my mind.",
        portuguese: "Isso tem pesado na minha mente.",
        level: 'avançado',
        context: 'Preocupação'
      },
      {
        english: "I'm grappling with some difficult decisions.",
        portuguese: "Estou lutando com algumas decisões difíceis.",
        level: 'avançado',
        context: 'Dilema'
      },
      {
        english: "It's a matter of perspective.",
        portuguese: "É uma questão de perspectiva.",
        level: 'avançado',
        context: 'Análise'
      },
      {
        english: "I'm contemplating a major life change.",
        portuguese: "Estou contemplando uma grande mudança de vida.",
        level: 'avançado',
        context: 'Transformação'
      },
      {
        english: "That experience was truly eye-opening.",
        portuguese: "Essa experiência foi realmente reveladora.",
        level: 'avançado',
        context: 'Aprendizado'
      },
      {
        english: "I'm having an existential crisis.",
        portuguese: "Estou tendo uma crise existencial.",
        level: 'avançado',
        context: 'Introspecção'
      },
      {
        english: "It's a double-edged sword.",
        portuguese: "É uma faca de dois gumes.",
        level: 'avançado',
        context: 'Ambiguidade'
      },
      {
        english: "I'm cautiously optimistic about the outcome.",
        portuguese: "Estou cautelosamente otimista sobre o resultado.",
        level: 'avançado',
        context: 'Expectativa'
      },
      {
        english: "That's quite a paradigm shift.",
        portuguese: "Essa é uma grande mudança de paradigma.",
        level: 'avançado',
        context: 'Transformação'
      },
      {
        english: "I'm trying to read between the lines.",
        portuguese: "Estou tentando ler nas entrelinhas.",
        level: 'avançado',
        context: 'Interpretação'
      },
      {
        english: "It's all about finding the right balance.",
        portuguese: "É tudo sobre encontrar o equilíbrio certo.",
        level: 'avançado',
        context: 'Harmonia'
      },
      {
        english: "I'm swimming against the current.",
        portuguese: "Estou nadando contra a corrente.",
        level: 'avançado',
        context: 'Resistência'
      },
      {
        english: "That's a watershed moment.",
        portuguese: "Esse é um momento decisivo.",
        level: 'avançado',
        context: 'Marco'
      },
      {
        english: "I'm trying to bridge the gap between us.",
        portuguese: "Estou tentando diminuir a distância entre nós.",
        level: 'avançado',
        context: 'Reconciliação'
      },
      {
        english: "It's time to turn over a new leaf.",
        portuguese: "É hora de virar uma nova página.",
        level: 'avançado',
        context: 'Renovação'
      }
    ],
    exercises: [
      {
        id: 'amigos-ex-1',
        correctSentence: 'Would you like to hang out?',
        words: ['Would', 'you', 'like', 'to', 'hang', 'out?'],
        translation: 'Você gostaria de sair?'
      },
      {
        id: 'amigos-ex-2',
        correctSentence: 'Let us grab a coffee.',
        words: ['Let', 'us', 'grab', 'a', 'coffee.'],
        translation: 'Vamos tomar um café.'
      },
      {
        id: 'amigos-ex-3',
        correctSentence: 'What are you up to?',
        words: ['What', 'are', 'you', 'up', 'to?'],
        translation: 'O que você está fazendo?'
      },
      {
        id: 'amigos-ex-4',
        correctSentence: 'How was your weekend?',
        words: ['How', 'was', 'your', 'weekend?'],
        translation: 'Como foi seu fim de semana?'
      },
      {
        id: 'amigos-ex-5',
        correctSentence: 'Want to join us?',
        words: ['Want', 'to', 'join', 'us?'],
        translation: 'Quer se juntar a nós?'
      }
    ]
  },
  eventos: {
    title: 'Inglês para Eventos',
    icon: '🎉',
    description: 'Networking, palestras e eventos sociais',
    phrases: [
      // ========== FRASES FREE (10) ==========
      {
        english: "Nice to meet you!",
        portuguese: "Prazer em conhecê-lo!",
        level: 'básico',
        context: 'Networking'
      },
      {
        english: "What do you do for work?",
        portuguese: "O que você faz no trabalho?",
        level: 'básico',
        context: 'Networking'
      },
      {
        english: "Here's my business card.",
        portuguese: "Aqui está meu cartão de visita.",
        level: 'básico',
        context: 'Networking'
      },
      {
        english: "Let's keep in touch.",
        portuguese: "Vamos manter contato.",
        level: 'básico',
        context: 'Networking'
      },
      {
        english: "Great presentation!",
        portuguese: "Ótima apresentação!",
        level: 'básico',
        context: 'Elogios'
      },
      {
        english: "How did you hear about this event?",
        portuguese: "Como você soube deste evento?",
        level: 'médio',
        context: 'Conversa'
      },
      {
        english: "Are you enjoying the conference?",
        portuguese: "Você está gostando da conferência?",
        level: 'básico',
        context: 'Evento'
      },
      {
        english: "Which session did you find most interesting?",
        portuguese: "Qual sessão você achou mais interessante?",
        level: 'médio',
        context: 'Opinião'
      },
      {
        english: "I'd love to connect on LinkedIn.",
        portuguese: "Adoraria me conectar no LinkedIn.",
        level: 'médio',
        context: 'Rede social'
      },
      {
        english: "Thanks for the invitation.",
        portuguese: "Obrigado pelo convite.",
        level: 'básico',
        context: 'Agradecimento'
      },

      // ========== FRASES PREMIUM ==========
      {
        english: "What brings you to this event?",
        portuguese: "O que te trouxe a este evento?",
        level: 'médio',
        context: 'Conversa'
      },
      {
        english: "I found your talk very insightful.",
        portuguese: "Achei sua palestra muito perspicaz.",
        level: 'avançado',
        context: 'Feedback'
      },
      {
        english: "Can I get your contact information?",
        portuguese: "Posso ter suas informações de contato?",
        level: 'básico',
        context: 'Contato'
      },
      {
        english: "I'd like to follow up on our conversation.",
        portuguese: "Gostaria de dar seguimento à nossa conversa.",
        level: 'avançado',
        context: 'Follow-up',
        situations: [
          'E-mail pós-evento: "Thank you for the insightful discussion yesterday. I’d like to follow up on our conversation about the partnership opportunity."',
          'Ligação de negócios: "I’d like to follow up on our conversation from last week. Do you still have interest in exploring that collaboration?"'
        ]
      },
      {
        english: "Have you attended this conference before?",
        portuguese: "Você já participou desta conferência antes?",
        level: 'médio',
        context: 'Experiência'
      },
      {
        english: "What's your take on the keynote?",
        portuguese: "Qual sua opinião sobre a palestra principal?",
        level: 'avançado',
        context: 'Opinião'
      },
      {
        english: "I'm looking forward to the networking session.",
        portuguese: "Estou ansioso pela sessão de networking.",
        level: 'avançado',
        context: 'Expectativa'
      },
      {
        english: "Could you introduce me to your colleague?",
        portuguese: "Você poderia me apresentar ao seu colega?",
        level: 'médio',
        context: 'Apresentação',
        situations: [
          'Networking no evento: "I’d love to meet the head of marketing. Could you introduce me to your colleague when she’s free?"',
          'Oportunidade de colaboração: "I think our projects could align well. Could you introduce me to your colleague who handles partnerships?"'
        ]
      },
      {
        english: "What trends do you see in your industry?",
        portuguese: "Que tendências você vê na sua indústria?",
        level: 'avançado',
        context: 'Indústria'
      },
      {
        english: "I'm impressed by your company's growth.",
        portuguese: "Estou impressionado com o crescimento da sua empresa.",
        level: 'avançado',
        context: 'Negócios',
        situations: [
          'Networking elogioso: "I’ve been following your company in the news. I’m impressed by your company’s growth, especially in the Asian market."',
          'Conversa de negócios: "Your latest quarterly results were outstanding. I’m impressed by your company’s growth despite the challenging economy."'
        ]
      },
      {
        english: "Are you planning to attend next year?",
        portuguese: "Você planeja participar no próximo ano?",
        level: 'médio',
        context: 'Planos'
      },
      {
        english: "What was the highlight of the event for you?",
        portuguese: "Qual foi o ponto alto do evento para você?",
        level: 'avançado',
        context: 'Reflexão'
      },
      {
        english: "I'd be interested in a collaboration.",
        portuguese: "Eu estaria interessado em uma colaboração.",
        level: 'avançado',
        context: 'Parceria',
        situations: [
          'Proposta direta: "Your technology complements ours perfectly. I’d be interested in a collaboration to create a joint solution."',
          'Explorando oportunidades: "We serve similar markets but different use cases. I’d be interested in a collaboration to expand our offerings."'
        ]
      },
      {
        english: "Thank you for sharing your insights.",
        portuguese: "Obrigado por compartilhar suas percepções.",
        level: 'médio',
        context: 'Agradecimento'
      },
      {
        english: "Let's schedule a follow-up meeting.",
        portuguese: "Vamos agendar uma reunião de acompanhamento.",
        level: 'avançado',
        context: 'Próximos passos'
      },
      {
        english: "I found the panel discussion very engaging.",
        portuguese: "Achei a discussão do painel muito envolvente.",
        level: 'avançado',
        context: 'Feedback'
      },
      {
        english: "What's your biggest challenge right now?",
        portuguese: "Qual seu maior desafio agora?",
        level: 'avançado',
        context: 'Negócios',
        situations: [
          'Conversa aprofundada: "I’d love to understand your business better. What’s your biggest challenge right now in the market?"',
          'Identificando oportunidades: "As we explore potential partnerships, what’s your biggest challenge right now that we might help solve?"'
        ]
      },
      {
        english: "I appreciate you taking the time to chat.",
        portuguese: "Agradeço por tirar tempo para conversar.",
        level: 'médio',
        context: 'Cortesia'
      },
      {
        english: "Have a great rest of the conference!",
        portuguese: "Tenha um ótimo resto de conferência!",
        level: 'médio',
        context: 'Despedida',
        situations: [
          'Despedida temporária: "I need to run to my next session, but it was great chatting. Have a great rest of the conference!"',
          'Final de conversa: "Thanks for all the great insights about the industry. Have a great rest of the conference!"'
        ]
      },
      {
        english: "I hope our paths cross again soon.",
        portuguese: "Espero que nossos caminhos se cruzem novamente em breve.",
        level: 'avançado',
        context: 'Despedida',
        situations: [
          'Despedida esperançosa: "This was such a valuable conversation. I hope our paths cross again soon, maybe at next year’s conference."',
          'Networking futível: "You’re doing amazing work in this space. I hope our paths cross again soon - I’d love to collaborate."'
        ]
      },

      // ========== ADDITIONAL NETWORKING PHRASES ==========
      {
        english: "Mind if I join your conversation?",
        portuguese: "Se importam se eu participar da conversa?",
        level: 'médio',
        context: 'Networking'
      },
      {
        english: "I love what you said about innovation.",
        portuguese: "Adorei o que você disse sobre inovação.",
        level: 'médio',
        context: 'Elogios'
      },
      {
        english: "What's your background in this field?",
        portuguese: "Qual sua experiência nesta área?",
        level: 'médio',
        context: 'Networking'
      },
      {
        english: "I couldn't agree more with your point.",
        portuguese: "Não poderia concordar mais com seu ponto.",
        level: 'avançado',
        context: 'Opinião'
      },
      {
        english: "How long have you been in this industry?",
        portuguese: "Há quanto tempo você está nesta indústria?",
        level: 'médio',
        context: 'Carreira'
      },
      {
        english: "That's a fascinating perspective.",
        portuguese: "Essa é uma perspectiva fascinante.",
        level: 'avançado',
        context: 'Conversa'
      },
      {
        english: "Can you tell me more about your project?",
        portuguese: "Você pode me contar mais sobre seu projeto?",
        level: 'básico',
        context: 'Interesse'
      },
      {
        english: "I'm working on something similar.",
        portuguese: "Estou trabalhando em algo similar.",
        level: 'médio',
        context: 'Trabalho',
        situations: [
          'Encontrando commonalities: "I’m working on something similar in our marketing department. Maybe we can share best practices."',
          'Colaboração potencial: "That sounds interesting! I’m working on something similar. We should compare notes sometime."'
        ]
      },
      {
        english: "You should meet my colleague, Sarah.",
        portuguese: "Você deveria conhecer minha colega, Sarah.",
        level: 'básico',
        context: 'Apresentação',
        situations: [
          'Facilitando networking: "You should meet my colleague, Sarah. She’s working on a similar project and might have some great insights."',
          'Conectando pessoas: "You should meet my colleague, Sarah. You both work in data analytics and would have a lot to discuss."'
        ]
      },
      {
        english: "I've heard great things about your company.",
        portuguese: "Ouvi coisas ótimas sobre sua empresa.",
        level: 'médio',
        context: 'Elogios'
      },

      // ========== CONFERENCE & PRESENTATION PHRASES ==========
      {
        english: "The speaker really knew their stuff.",
        portuguese: "O palestrante realmente sabia do que estava falando.",
        level: 'médio',
        context: 'Feedback'
      },
      {
        english: "That was an eye-opening presentation.",
        portuguese: "Essa foi uma apresentação esclarecedora.",
        level: 'avançado',
        context: 'Feedback'
      },
      {
        english: "I have a question about your methodology.",
        portuguese: "Tenho uma pergunta sobre sua metodologia.",
        level: 'avançado',
        context: 'Q&A'
      },
      {
        english: "Could you elaborate on that point?",
        portuguese: "Você poderia elaborar esse ponto?",
        level: 'avançado',
        context: 'Q&A'
      },
      {
        english: "The data you presented was compelling.",
        portuguese: "Os dados que você apresentou foram convincentes.",
        level: 'avançado',
        context: 'Feedback'
      },
      {
        english: "I'd like to challenge that assumption.",
        portuguese: "Gostaria de questionar essa suposição.",
        level: 'avançado',
        context: 'Debate'
      },
      {
        english: "What's your source for that statistic?",
        portuguese: "Qual é sua fonte para essa estatística?",
        level: 'avançado',
        context: 'Q&A'
      },
      {
        english: "That's exactly what we're experiencing.",
        portuguese: "É exatamente isso que estamos vivenciando.",
        level: 'médio',
        context: 'Concordância'
      },
      {
        english: "Have you considered the ethical implications?",
        portuguese: "Você considerou as implicações éticas?",
        level: 'avançado',
        context: 'Debate'
      },
      {
        english: "The Q&A session was very informative.",
        portuguese: "A sessão de perguntas foi muito informativa.",
        level: 'médio',
        context: 'Feedback'
      },

      // ========== SOCIAL EVENT PHRASES ==========
      {
        english: "This venue is absolutely stunning!",
        portuguese: "Este local é absolutamente deslumbrante!",
        level: 'médio',
        context: 'Evento social'
      },
      {
        english: "Thank you for hosting such a lovely event.",
        portuguese: "Obrigado por sediar um evento tão adorável.",
        level: 'médio',
        context: 'Agradecimento'
      },
      {
        english: "I'm having a wonderful time.",
        portuguese: "Estou me divertindo muito.",
        level: 'básico',
        context: 'Evento social'
      },
      {
        english: "The food here is incredible.",
        portuguese: "A comida aqui é incrível.",
        level: 'básico',
        context: 'Evento social'
      },
      {
        english: "Could I get a photo with you?",
        portuguese: "Posso tirar uma foto com você?",
        level: 'básico',
        context: 'Evento social'
      },
      {
        english: "I love the ambiance of this place.",
        portuguese: "Adoro o ambiente deste lugar.",
        level: 'médio',
        context: 'Evento social'
      },
      {
        english: "The entertainment tonight was fantastic.",
        portuguese: "O entretenimento desta noite foi fantástico.",
        level: 'médio',
        context: 'Evento social'
      },
      {
        english: "I don't want this evening to end.",
        portuguese: "Não quero que esta noite termine.",
        level: 'básico',
        context: 'Evento social'
      },
      {
        english: "We should definitely do this again.",
        portuguese: "Definitivamente deveríamos fazer isso de novo.",
        level: 'médio',
        context: 'Planos'
      },
      {
        english: "Thanks for including me in this celebration.",
        portuguese: "Obrigado por me incluir nesta celebração.",
        level: 'médio',
        context: 'Agradecimento'
      },

      // ========== BUSINESS EVENT PHRASES ==========
      {
        english: "What's your elevator pitch?",
        portuguese: "Qual é seu elevator pitch?",
        level: 'avançado',
        context: 'Negócios',
        situations: [
          'Conhecendo negócio: "I’d love to learn more about what you do. What’s your elevator pitch for your startup?"',
          'Networking rápido: "We only have a few minutes before the next session. What’s your elevator pitch?"'
        ]
      },
      {
        english: "I see a lot of potential for synergy.",
        portuguese: "Vejo muito potencial para sinergia.",
        level: 'avançado',
        context: 'Parceria',
        situations: [
          'Identificando oportunidade: "You handle the software and we handle the hardware. I see a lot of potential for synergy between our companies."',
          'Proposta de parceria: "Our customer bases barely overlap but our expertise complements each other. I see a lot of potential for synergy."'
        ]
      },
      {
        english: "Our values seem very aligned.",
        portuguese: "Nossos valores parecem muito alinhados.",
        level: 'avançado',
        context: 'Negócios',
        situations: [
          'Explorando parceria: "After hearing your presentation, our values seem very aligned. We should explore ways to work together."',
          'Construindo rapport: "I love your focus on sustainability and social impact. Our values seem very aligned with that mission."'
        ]
      },
      {
        english: "I'd love to explore partnership opportunities.",
        portuguese: "Adoraria explorar oportunidades de parceria.",
        level: 'avançado',
        context: 'Parceria',
        situations: [
          'Interesse formal: "Your platform could integrate well with our services. I’d love to explore partnership opportunities with your team."',
          'Follow-up direto: "This conversation has been very insightful. I’d love to explore partnership opportunities between our companies."'
        ]
      },
      {
        english: "What's your market strategy?",
        portuguese: "Qual é sua estratégia de mercado?",
        level: 'avançado',
        context: 'Negócios',
        situations: [
          'Conversa estratégica: "Your growth numbers are impressive. What’s your market strategy for expanding internationally?"',
          'Aprendendo com competidor: "You’ve captured significant market share quickly. What’s your market strategy that’s working so well?"'
        ]
      },
      {
        english: "We're looking for strategic partners.",
        portuguese: "Estamos procurando parceiros estratégicos.",
        level: 'avançado',
        context: 'Parceria',
        situations: [
          'Oportunidade direta: "We’re expanding into new markets and we’re looking for strategic partners who understand the local landscape."',
          'Networking aberto: "I should mention that we’re looking for strategic partners in the fintech space. Do you know anyone who might be interested?"'
        ]
      },
      {
        english: "Your solution addresses a real pain point.",
        portuguese: "Sua solução aborda um ponto problemático real.",
        level: 'avançado',
        context: 'Negócios',
        situations: [
          'Reconhecendo valor: "This is exactly what our industry needs. Your solution addresses a real pain point that we’ve been struggling with."',
          'Validando produto: "I can see why you’re growing so fast. Your solution addresses a real pain point that many companies face."'
        ]
      },
      {
        english: "What's your competitive advantage?",
        portuguese: "Qual é sua vantagem competitiva?",
        level: 'avançado',
        context: 'Negócios'
      },
      {
        english: "I'm interested in learning about your process.",
        portuguese: "Estou interessado em conhecer seu processo.",
        level: 'médio',
        context: 'Interesse'
      },
      {
        english: "We might be able to help each other.",
        portuguese: "Poderíamos nos ajudar mutuamente.",
        level: 'médio',
        context: 'Colaboração',
        situations: [
          'Proposta win-win: "You need clients in Brazil and we need software expertise. We might be able to help each other."',
          'Identificando sinergia: "It sounds like we have complementary strengths. We might be able to help each other grow our businesses."'
        ]
      },

      // ========== EVENT LOGISTICS & PRACTICAL PHRASES ==========
      {
        english: "Where can I find the registration desk?",
        portuguese: "Onde posso encontrar a mesa de registro?",
        level: 'básico',
        context: 'Logística'
      },
      {
        english: "Do you know where the restrooms are?",
        portuguese: "Você sabe onde ficam os banheiros?",
        level: 'básico',
        context: 'Logística'
      },
      {
        english: "What time does the next session start?",
        portuguese: "Que horas começa a próxima sessão?",
        level: 'básico',
        context: 'Agenda'
      },
      {
        english: "Is there a break between sessions?",
        portuguese: "Há uma pausa entre as sessões?",
        level: 'básico',
        context: 'Agenda'
      },
      {
        english: "Where's the coffee station?",
        portuguese: "Onde fica a estação de café?",
        level: 'básico',
        context: 'Logística'
      },
      {
        english: "Do you have the WiFi password?",
        portuguese: "Você tem a senha do WiFi?",
        level: 'básico',
        context: 'Logística'
      },
      {
        english: "Is this seat taken?",
        portuguese: "Este assento está ocupado?",
        level: 'básico',
        context: 'Logística'
      },
      {
        english: "What floor is the presentation on?",
        portuguese: "Em que andar é a apresentação?",
        level: 'básico',
        context: 'Logística'
      },
      {
        english: "Do we need to sign in for this session?",
        portuguese: "Precisamos assinar presença para esta sessão?",
        level: 'médio',
        context: 'Registro'
      },
      {
        english: "Are the slides available for download?",
        portuguese: "Os slides estão disponíveis para download?",
        level: 'médio',
        context: 'Recursos',
        situations: [
          'Após presentação: "Great presentation! Are the slides available for download? I’d like to share them with my team."',
          'Para estudar depois: "There was a lot of valuable information in that talk. Are the slides available for download so I can review them later?"'
        ]
      },

      // ========== FOLLOW-UP & CLOSING PHRASES ==========
      {
        english: "Let's grab coffee sometime.",
        portuguese: "Vamos tomar um café em algum momento.",
        level: 'básico',
        context: 'Follow-up',
        situations: [
          'Networking informal: "This has been a great conversation. Let’s grab coffee sometime to continue discussing that project idea."',
          'Construindo relacionamento: "I’d love to learn more about your work. Let’s grab coffee sometime next week if you’re available."'
        ]
      },
      {
        english: "I'll send you that article I mentioned.",
        portuguese: "Vou te enviar aquele artigo que mencionei.",
        level: 'médio',
        context: 'Follow-up',
        situations: [
          'Prometendo recurso: "That study would be perfect for your research. I’ll send you that article I mentioned as soon as I get back to the office."',
          'Follow-up útil: "Thanks for the great discussion about market trends. I’ll send you that article I mentioned - it has some relevant data."'
        ]
      },
      {
        english: "Feel free to reach out anytime.",
        portuguese: "Sinta-se à vontade para entrar em contato a qualquer momento.",
        level: 'médio',
        context: 'Contato',
        situations: [
          'Oferecendo ajuda: "I have experience in that area and would be happy to help. Feel free to reach out anytime with questions."',
          'Mantendo porta aberta: "Even if this partnership doesn’t work out, I enjoyed our conversation. Feel free to reach out anytime."'
        ]
      },
      {
        english: "I look forward to hearing from you.",
        portuguese: "Aguardo ansiosamente seu contato.",
        level: 'médio',
        context: 'Follow-up',
        situations: [
          'Final de proposta: "I’ve sent you the detailed proposal we discussed. I look forward to hearing from you with your thoughts."',
          'Conclusão profissional: "Thank you for considering our partnership proposal. I look forward to hearing from you soon."'
        ]
      },
      {
        english: "It was a pleasure meeting you.",
        portuguese: "Foi um prazer conhecê-lo.",
        level: 'básico',
        context: 'Despedida',
        situations: [
          'Final de networking: "Thank you for the insightful conversation about industry trends. It was a pleasure meeting you."',
          'Despedida profissional: "I hope we can work together in the future. It was a pleasure meeting you at the conference."'
        ]
      },
      {
        english: "I'll be in touch soon.",
        portuguese: "Entrarei em contato em breve.",
        level: 'médio',
        context: 'Follow-up',
        situations: [
          'Promessa de contato: "I need to discuss this with my team first, but I’ll be in touch soon with our decision."',
          'Próximo passo: "Let me review the proposal details you shared. I’ll be in touch soon to schedule our next meeting."'
        ]
      },
      {
        english: "Don't hesitate to contact me.",
        portuguese: "Não hesite em me contactar.",
        level: 'médio',
        context: 'Contato'
      },
      {
        english: "I hope we can work together in the future.",
        portuguese: "Espero que possamos trabalhar juntos no futuro.",
        level: 'médio',
        context: 'Futuro'
      },
      {
        english: "This has been incredibly valuable.",
        portuguese: "Isso foi incrivelmente valioso.",
        level: 'avançado',
        context: 'Agradecimento'
      },
      {
        english: "I'll definitely recommend this event.",
        portuguese: "Definitivamente vou recomendar este evento.",
        level: 'médio',
        context: 'Recomendação',
        situations: [
          'Final de evento: "This conference was amazing. I\'ll definitely recommend this event to my colleagues."',
          'Experiência positiva: "I\'ll definitely recommend this event to anyone interested in technology and innovation."'
        ]
      },

      // ========== OPINION & DISCUSSION PHRASES ==========
      {
        english: "That's an interesting point of view.",
        portuguese: "Esse é um ponto de vista interessante.",
        level: 'médio',
        context: 'Opinião'
      },
      {
        english: "I hadn't thought of it that way.",
        portuguese: "Não havia pensado dessa forma.",
        level: 'médio',
        context: 'Reflexão'
      },
      {
        english: "You've given me a lot to think about.",
        portuguese: "Você me deu muito no que pensar.",
        level: 'médio',
        context: 'Reflexão'
      },
      {
        english: "I respectfully disagree with that approach.",
        portuguese: "Respeitosamente discordo dessa abordagem.",
        level: 'avançado',
        context: 'Debate'
      },
      {
        english: "What's your take on this trend?",
        portuguese: "Qual sua opinião sobre esta tendência?",
        level: 'médio',
        context: 'Opinião'
      },
      {
        english: "I'd love to pick your brain about this.",
        portuguese: "Adoraria explorar suas ideias sobre isso.",
        level: 'avançado',
        context: 'Conversa'
      },
      {
        english: "You make a compelling argument.",
        portuguese: "Você faz um argumento convincente.",
        level: 'avançado',
        context: 'Debate'
      },
      {
        english: "That's food for thought.",
        portuguese: "Isso é algo para pensar.",
        level: 'médio',
        context: 'Reflexão'
      },
      {
        english: "I'm curious about your methodology.",
        portuguese: "Estou curioso sobre sua metodologia.",
        level: 'avançado',
        context: 'Interesse'
      },
      {
        english: "What drives your passion for this field?",
        portuguese: "O que impulsiona sua paixão por esta área?",
        level: 'avançado',
        context: 'Motivação'
      },

      // ========== WORKSHOP & INTERACTIVE PHRASES ==========
      {
        english: "Let's brainstorm some solutions.",
        portuguese: "Vamos fazer um brainstorm de soluções.",
        level: 'médio',
        context: 'Workshop'
      },
      {
        english: "I'd like to volunteer for this exercise.",
        portuguese: "Gostaria de me voluntariar para este exercício.",
        level: 'médio',
        context: 'Workshop'
      },
      {
        english: "Can we break into smaller groups?",
        portuguese: "Podemos nos dividir em grupos menores?",
        level: 'médio',
        context: 'Workshop'
      },
      {
        english: "Who wants to share their findings?",
        portuguese: "Quem quer compartilhar suas descobertas?",
        level: 'médio',
        context: 'Workshop'
      },
      {
        english: "Let's move on to the next activity.",
        portuguese: "Vamos passar para a próxima atividade.",
        level: 'básico',
        context: 'Workshop'
      },
      {
        english: "This exercise was really enlightening.",
        portuguese: "Este exercício foi realmente esclarecedor.",
        level: 'avançado',
        context: 'Workshop'
      },
      {
        english: "I learned so much from this hands-on session.",
        portuguese: "Aprendi muito com esta sessão prática.",
        level: 'médio',
        context: 'Workshop'
      },
      {
        english: "The interactive format kept me engaged.",
        portuguese: "O formato interativo me manteve envolvido.",
        level: 'avançado',
        context: 'Workshop'
      },
      {
        english: "I wish we had more time for discussion.",
        portuguese: "Gostaria que tivéssemos mais tempo para discussão.",
        level: 'médio',
        context: 'Workshop'
      },
      {
        english: "The facilitator did an excellent job.",
        portuguese: "O facilitador fez um trabalho excelente.",
        level: 'avançado',
        context: 'Workshop'
      }
    ],
    exercises: [
      {
        id: 'eventos-ex-1',
        correctSentence: 'Nice to meet you!',
        words: ['to', 'Nice', 'meet', 'you!'],
        translation: 'Prazer em conhecê-lo!'
      },
      {
        id: 'eventos-ex-2',
        correctSentence: 'What do you do for work?',
        words: ['do', 'What', 'you', 'for', 'work?'],
        translation: 'O que você faz no trabalho?'
      },
      {
        id: 'eventos-ex-3',
        correctSentence: 'Here is my business card.',
        words: ['my', 'Here', 'business', 'is', 'card.'],
        translation: 'Aqui está meu cartão de visita.'
      },
      {
        id: 'eventos-ex-4',
        correctSentence: 'Let us keep in touch.',
        words: ['keep', 'Let', 'touch.', 'in', 'us'],
        translation: 'Vamos manter contato.'
      },
      {
        id: 'eventos-ex-5',
        correctSentence: 'Great presentation today!',
        words: ['presentation', 'Great', 'today!'],
        translation: 'Ótima apresentação hoje!'
      }
    ]
  }
}

interface TrailPageProps {
  params: Promise<{ slug: string }>
}

export default async function TrailPage({ params }: TrailPageProps) {
  const { slug } = await params

  const trailData = trailsData[slug as keyof typeof trailsData]
  
  if (!trailData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Trilha não encontrada</h1>
          <p className="text-gray-400">Esta trilha não existe ou ainda não foi criada.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <SimpleTrailContent 
        trail={trailData as any}
        userPlan="free" // Fallback - será substituído pelo plano real do usuário
        slug={slug}
      />
    </div>
  )
}