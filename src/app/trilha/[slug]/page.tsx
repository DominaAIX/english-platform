import Link from 'next/link'
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
        context: 'Solicitação de entrega'
      },
      {
        english: "I'd like to schedule a meeting for next week.",
        portuguese: "Gostaria de agendar uma reunião para a próxima semana.",
        level: 'básico',
        context: 'Agendamento'
      },
      {
        english: "The deadline has been moved to next month.",
        portuguese: "O prazo foi movido para o próximo mês.",
        level: 'médio',
        context: 'Alteração de prazo'
      },
      {
        english: "I appreciate your feedback on this proposal.",
        portuguese: "Agradeço seu feedback sobre esta proposta.",
        level: 'básico',
        context: 'Agradecimento'
      },
      {
        english: "Let's circle back on this issue tomorrow.",
        portuguese: "Vamos retomar esta questão amanhã.",
        level: 'médio',
        context: 'Adiamento'
      },
      {
        english: "Can we touch base about the project status?",
        portuguese: "Podemos conversar sobre o status do projeto?",
        level: 'médio',
        context: 'Check-in'
      },
      {
        english: "I'll keep you in the loop on any updates.",
        portuguese: "Vou te manter informado sobre qualquer atualização.",
        level: 'médio',
        context: 'Comunicação'
      },
      {
        english: "We need to think outside the box for this solution.",
        portuguese: "Precisamos pensar fora da caixa para esta solução.",
        level: 'avançado',
        context: 'Criatividade'
      },
      {
        english: "Let's table this discussion for now.",
        portuguese: "Vamos deixar esta discussão para depois.",
        level: 'avançado',
        context: 'Pausa na discussão'
      },
      {
        english: "Can you walk me through the process?",
        portuguese: "Você pode me explicar o processo passo a passo?",
        level: 'básico',
        context: 'Explicação'
      },

      // ========== CATEGORIA: REUNIÕES (40 frases) ==========
      {
        english: "Let's kick off this meeting.",
        portuguese: "Vamos começar esta reunião.",
        level: 'básico',
        context: 'Reuniões'
      },
      {
        english: "Can everyone see my screen?",
        portuguese: "Todos conseguem ver minha tela?",
        level: 'básico',
        context: 'Reuniões'
      },
      {
        english: "You're on mute.",
        portuguese: "Você está no mudo.",
        level: 'básico',
        context: 'Reuniões'
      },
      {
        english: "Can you speak up? You're breaking up.",
        portuguese: "Você pode falar mais alto? Está cortando.",
        level: 'básico',
        context: 'Reuniões'
      },
      {
        english: "Let's go around the room for introductions.",
        portuguese: "Vamos fazer uma rodada de apresentações.",
        level: 'médio',
        context: 'Reuniões'
      },
      {
        english: "I'd like to add something to the agenda.",
        portuguese: "Gostaria de acrescentar algo à agenda.",
        level: 'médio',
        context: 'Reuniões'
      },
      {
        english: "Can we park that discussion for later?",
        portuguese: "Podemos deixar essa discussão para depois?",
        level: 'avançado',
        context: 'Reuniões'
      },
      {
        english: "Let's dive deeper into this topic.",
        portuguese: "Vamos nos aprofundar neste tópico.",
        level: 'médio',
        context: 'Reuniões'
      },
      {
        english: "I have a hard stop at 3 PM.",
        portuguese: "Tenho que sair às 15h em ponto.",
        level: 'avançado',
        context: 'Reuniões'
      },
      {
        english: "Can we take this offline?",
        portuguese: "Podemos discutir isso separadamente?",
        level: 'avançado',
        context: 'Reuniões'
      },
      {
        english: "Let's circle back to this next week.",
        portuguese: "Vamos retomar isso na próxima semana.",
        level: 'médio',
        context: 'Reuniões'
      },
      {
        english: "I'd like to piggyback on what Sarah said.",
        portuguese: "Gostaria de complementar o que a Sarah disse.",
        level: 'avançado',
        context: 'Reuniões'
      },
      {
        english: "Can we get a consensus on this?",
        portuguese: "Podemos chegar a um consenso sobre isso?",
        level: 'médio',
        context: 'Reuniões'
      },
      {
        english: "Let's put this to a vote.",
        portuguese: "Vamos votar sobre isso.",
        level: 'básico',
        context: 'Reuniões'
      },
      {
        english: "I need to step out for a moment.",
        portuguese: "Preciso me ausentar por um momento.",
        level: 'básico',
        context: 'Reuniões'
      },
      {
        english: "Can we stick to the agenda?",
        portuguese: "Podemos seguir a agenda?",
        level: 'médio',
        context: 'Reuniões'
      },
      {
        english: "Let's recap the action items.",
        portuguese: "Vamos recapitular os itens de ação.",
        level: 'médio',
        context: 'Reuniões'
      },
      {
        english: "Who's taking the minutes?",
        portuguese: "Quem está fazendo a ata?",
        level: 'médio',
        context: 'Reuniões'
      },
      {
        english: "Can we schedule a follow-up?",
        portuguese: "Podemos agendar um acompanhamento?",
        level: 'básico',
        context: 'Reuniões'
      },
      {
        english: "I'm going to play devil's advocate here.",
        portuguese: "Vou fazer o papel do advogado do diabo aqui.",
        level: 'avançado',
        context: 'Reuniões'
      },
      {
        english: "Let's move on to the next item.",
        portuguese: "Vamos para o próximo item.",
        level: 'básico',
        context: 'Reuniões'
      },
      {
        english: "Can we get some buy-in from the team?",
        portuguese: "Podemos conseguir o apoio da equipe?",
        level: 'avançado',
        context: 'Reuniões'
      },
      {
        english: "I'd like to push back on that idea.",
        portuguese: "Gostaria de questionar essa ideia.",
        level: 'avançado',
        context: 'Reuniões'
      },
      {
        english: "Let's table this for now.",
        portuguese: "Vamos deixar isso de lado por enquanto.",
        level: 'médio',
        context: 'Reuniões'
      },
      {
        english: "Can we get alignment on the timeline?",
        portuguese: "Podemos nos alinhar sobre o cronograma?",
        level: 'avançado',
        context: 'Reuniões'
      },
      {
        english: "I want to level-set expectations.",
        portuguese: "Quero alinhar as expectativas.",
        level: 'avançado',
        context: 'Reuniões'
      },
      {
        english: "Let's brainstorm some solutions.",
        portuguese: "Vamos fazer um brainstorm de soluções.",
        level: 'médio',
        context: 'Reuniões'
      },
      {
        english: "Can we do a quick temperature check?",
        portuguese: "Podemos fazer uma verificação rápida?",
        level: 'avançado',
        context: 'Reuniões'
      },
      {
        english: "I need to jump on another call.",
        portuguese: "Preciso entrar em outra chamada.",
        level: 'médio',
        context: 'Reuniões'
      },
      {
        english: "Let's wrap this up.",
        portuguese: "Vamos finalizar isso.",
        level: 'básico',
        context: 'Reuniões'
      },
      {
        english: "Can we get some concrete next steps?",
        portuguese: "Podemos definir próximos passos concretos?",
        level: 'médio',
        context: 'Reuniões'
      },
      {
        english: "I'd like to challenge that assumption.",
        portuguese: "Gostaria de questionar essa suposição.",
        level: 'avançado',
        context: 'Reuniões'
      },
      {
        english: "Let's sync up offline about this.",
        portuguese: "Vamos nos alinhar sobre isso separadamente.",
        level: 'avançado',
        context: 'Reuniões'
      },
      {
        english: "Can we establish some ground rules?",
        portuguese: "Podemos estabelecer algumas regras básicas?",
        level: 'médio',
        context: 'Reuniões'
      },
      {
        english: "I want to bring everyone up to speed.",
        portuguese: "Quero colocar todos a par da situação.",
        level: 'médio',
        context: 'Reuniões'
      },
      {
        english: "Let's do a post-mortem on this project.",
        portuguese: "Vamos fazer uma análise pós-projeto.",
        level: 'avançado',
        context: 'Reuniões'
      },
      {
        english: "Can we get some visibility into the process?",
        portuguese: "Podemos ter mais visibilidade do processo?",
        level: 'avançado',
        context: 'Reuniões'
      },
      {
        english: "I'd like to propose an alternative approach.",
        portuguese: "Gostaria de propor uma abordagem alternativa.",
        level: 'médio',
        context: 'Reuniões'
      },
      {
        english: "Let's put a pin in this and come back to it.",
        portuguese: "Vamos marcar isso e voltar depois.",
        level: 'avançado',
        context: 'Reuniões'
      },
      {
        english: "Can we get ownership assigned for each task?",
        portuguese: "Podemos definir responsáveis para cada tarefa?",
        level: 'avançado',
        context: 'Reuniões'
      },

      // ========== CATEGORIA: E-MAILS (35 frases) ==========
      {
        english: "I hope this email finds you well.",
        portuguese: "Espero que este email o encontre bem.",
        level: 'básico',
        context: 'E-mails'
      },
      {
        english: "I'm writing to follow up on our conversation.",
        portuguese: "Estou escrevendo para dar seguimento à nossa conversa.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "Please find the attached document.",
        portuguese: "Segue em anexo o documento.",
        level: 'básico',
        context: 'E-mails'
      },
      {
        english: "I'm cc'ing John on this email.",
        portuguese: "Estou colocando o John em cópia neste email.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "Thanks for looping me in.",
        portuguese: "Obrigado por me incluir.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "I'll circle back with more details.",
        portuguese: "Retornarei com mais detalhes.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "Please let me know if you have any questions.",
        portuguese: "Por favor, me avise se tiver alguma dúvida.",
        level: 'básico',
        context: 'E-mails'
      },
      {
        english: "I wanted to reach out regarding...",
        portuguese: "Queria entrar em contato sobre...",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "Moving you to BCC to reduce inbox clutter.",
        portuguese: "Movendo você para CCO para reduzir spam na caixa.",
        level: 'avançado',
        context: 'E-mails'
      },
      {
        english: "Per our conversation, here are the next steps.",
        portuguese: "Conforme nossa conversa, seguem os próximos passos.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "I'm bumping this to the top of your inbox.",
        portuguese: "Estou priorizando isso na sua caixa de entrada.",
        level: 'avançado',
        context: 'E-mails'
      },
      {
        english: "Thanks for your quick turnaround on this.",
        portuguese: "Obrigado pela resposta rápida sobre isso.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "I'm following up on the action items from yesterday.",
        portuguese: "Estou acompanhando os itens de ação de ontem.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "Could you please confirm receipt?",
        portuguese: "Você poderia confirmar o recebimento?",
        level: 'básico',
        context: 'E-mails'
      },
      {
        english: "I'm forwarding this for your awareness.",
        portuguese: "Estou encaminhando isso para seu conhecimento.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "Please reply all so everyone stays in the loop.",
        portuguese: "Por favor, responda a todos para manter todos informados.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "I'll send a separate email with the details.",
        portuguese: "Enviarei um email separado com os detalhes.",
        level: 'básico',
        context: 'E-mails'
      },
      {
        english: "Thanks for bringing this to my attention.",
        portuguese: "Obrigado por trazer isso à minha atenção.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "I'm tagging the relevant team members.",
        portuguese: "Estou marcando os membros relevantes da equipe.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "This is time-sensitive, so please prioritize.",
        portuguese: "Isso é urgente, então por favor priorize.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "I'm setting up a separate thread for this discussion.",
        portuguese: "Estou criando uma conversa separada para esta discussão.",
        level: 'avançado',
        context: 'E-mails'
      },
      {
        english: "Could you please provide an ETA?",
        portuguese: "Você poderia fornecer um prazo estimado?",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "I'm updating the distribution list.",
        portuguese: "Estou atualizando a lista de distribuição.",
        level: 'avançado',
        context: 'E-mails'
      },
      {
        english: "Please see my comments inline.",
        portuguese: "Por favor, veja meus comentários no texto.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "I'm archiving this thread as it's resolved.",
        portuguese: "Estou arquivando esta conversa pois foi resolvida.",
        level: 'avançado',
        context: 'E-mails'
      },
      {
        english: "Thanks for the heads up.",
        portuguese: "Obrigado pelo aviso.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "I'll keep you posted on the progress.",
        portuguese: "Te manterei informado sobre o progresso.",
        level: 'básico',
        context: 'E-mails'
      },
      {
        english: "Could you please double-check this?",
        portuguese: "Você poderia verificar isso novamente?",
        level: 'básico',
        context: 'E-mails'
      },
      {
        english: "I'm escalating this to management.",
        portuguese: "Estou escalando isso para a gerência.",
        level: 'avançado',
        context: 'E-mails'
      },
      {
        english: "Please disregard my previous email.",
        portuguese: "Por favor, desconsidere meu email anterior.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "I'm scheduling a follow-up meeting.",
        portuguese: "Estou agendando uma reunião de acompanhamento.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "Could you please review and approve?",
        portuguese: "Você poderia revisar e aprovar?",
        level: 'básico',
        context: 'E-mails'
      },
      {
        english: "I'm flagging this as high priority.",
        portuguese: "Estou marcando isso como alta prioridade.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "Thanks for your patience on this matter.",
        portuguese: "Obrigado pela sua paciência neste assunto.",
        level: 'médio',
        context: 'E-mails'
      },
      {
        english: "I'll get back to you with a timeline.",
        portuguese: "Retornarei com um cronograma.",
        level: 'básico',
        context: 'E-mails'
      },

      // ========== CATEGORIA: APRESENTAÇÕES (30 frases) ==========
      {
        english: "Good morning everyone, thank you for joining us today.",
        portuguese: "Bom dia pessoal, obrigado por se juntarem a nós hoje.",
        level: 'básico',
        context: 'Apresentações'
      },
      {
        english: "Let me walk you through the agenda.",
        portuguese: "Deixem-me apresentar a agenda.",
        level: 'médio',
        context: 'Apresentações'
      },
      {
        english: "As you can see on this slide...",
        portuguese: "Como vocês podem ver neste slide...",
        level: 'básico',
        context: 'Apresentações'
      },
      {
        english: "Let's dive into the key findings.",
        portuguese: "Vamos nos aprofundar nas principais descobertas.",
        level: 'médio',
        context: 'Apresentações'
      },
      {
        english: "I'd like to highlight three main points.",
        portuguese: "Gostaria de destacar três pontos principais.",
        level: 'médio',
        context: 'Apresentações'
      },
      {
        english: "Moving on to the next section...",
        portuguese: "Passando para a próxima seção...",
        level: 'básico',
        context: 'Apresentações'
      },
      {
        english: "This brings us to our recommendation.",
        portuguese: "Isso nos leva à nossa recomendação.",
        level: 'médio',
        context: 'Apresentações'
      },
      {
        english: "Let me break this down for you.",
        portuguese: "Deixem-me detalhar isso para vocês.",
        level: 'médio',
        context: 'Apresentações'
      },
      {
        english: "The data clearly shows...",
        portuguese: "Os dados mostram claramente...",
        level: 'básico',
        context: 'Apresentações'
      },
      {
        english: "I'll pause here for questions.",
        portuguese: "Vou pausar aqui para perguntas.",
        level: 'básico',
        context: 'Apresentações'
      },
      {
        english: "Let's take a step back and look at the big picture.",
        portuguese: "Vamos dar um passo atrás e ver o panorama geral.",
        level: 'médio',
        context: 'Apresentações'
      },
      {
        english: "This is a game-changer for our industry.",
        portuguese: "Isso é revolucionário para nossa indústria.",
        level: 'avançado',
        context: 'Apresentações'
      },
      {
        english: "The ROI speaks for itself.",
        portuguese: "O ROI fala por si só.",
        level: 'avançado',
        context: 'Apresentações'
      },
      {
        english: "Let me put this in perspective.",
        portuguese: "Deixem-me colocar isso em perspectiva.",
        level: 'médio',
        context: 'Apresentações'
      },
      {
        english: "We're seeing a significant uptick in...",
        portuguese: "Estamos vendo um aumento significativo em...",
        level: 'avançado',
        context: 'Apresentações'
      },
      {
        english: "This aligns perfectly with our strategy.",
        portuguese: "Isso se alinha perfeitamente com nossa estratégia.",
        level: 'médio',
        context: 'Apresentações'
      },
      {
        english: "Let me drill down into the specifics.",
        portuguese: "Deixem-me entrar nos detalhes específicos.",
        level: 'avançado',
        context: 'Apresentações'
      },
      {
        english: "The bottom line is...",
        portuguese: "A linha de fundo é...",
        level: 'médio',
        context: 'Apresentações'
      },
      {
        english: "This represents a paradigm shift.",
        portuguese: "Isso representa uma mudança de paradigma.",
        level: 'avançado',
        context: 'Apresentações'
      },
      {
        english: "Let's talk about the implementation roadmap.",
        portuguese: "Vamos falar sobre o roteiro de implementação.",
        level: 'avançado',
        context: 'Apresentações'
      },
      {
        english: "I want to address the elephant in the room.",
        portuguese: "Quero abordar o elefante na sala.",
        level: 'avançado',
        context: 'Apresentações'
      },
      {
        english: "This is low-hanging fruit we can tackle immediately.",
        portuguese: "Essa é uma oportunidade fácil que podemos abordar imediatamente.",
        level: 'avançado',
        context: 'Apresentações'
      },
      {
        english: "We need to think outside the box here.",
        portuguese: "Precisamos pensar fora da caixa aqui.",
        level: 'médio',
        context: 'Apresentações'
      },
      {
        english: "This is mission-critical for our success.",
        portuguese: "Isso é fundamental para nosso sucesso.",
        level: 'avançado',
        context: 'Apresentações'
      },
      {
        english: "Let me give you some context.",
        portuguese: "Deixem-me dar algum contexto.",
        level: 'básico',
        context: 'Apresentações'
      },
      {
        english: "We're at an inflection point.",
        portuguese: "Estamos em um ponto de inflexão.",
        level: 'avançado',
        context: 'Apresentações'
      },
      {
        english: "This will move the needle significantly.",
        portuguese: "Isso fará uma diferença significativa.",
        level: 'avançado',
        context: 'Apresentações'
      },
      {
        english: "Let's recap the key takeaways.",
        portuguese: "Vamos recapitular os pontos principais.",
        level: 'médio',
        context: 'Apresentações'
      },
      {
        english: "I'll open the floor for questions now.",
        portuguese: "Vou abrir para perguntas agora.",
        level: 'médio',
        context: 'Apresentações'
      },
      {
        english: "Thank you for your time and attention.",
        portuguese: "Obrigado pelo seu tempo e atenção.",
        level: 'básico',
        context: 'Apresentações'
      },

      // ========== CATEGORIA: FEEDBACK (25 frases) ==========
      {
        english: "I'd like to give you some constructive feedback.",
        portuguese: "Gostaria de dar um feedback construtivo.",
        level: 'médio',
        context: 'Feedback'
      },
      {
        english: "You did an excellent job on this project.",
        portuguese: "Você fez um excelente trabalho neste projeto.",
        level: 'básico',
        context: 'Feedback'
      },
      {
        english: "There's room for improvement in this area.",
        portuguese: "Há espaço para melhoria nesta área.",
        level: 'médio',
        context: 'Feedback'
      },
      {
        english: "I appreciate your attention to detail.",
        portuguese: "Agradeço sua atenção aos detalhes.",
        level: 'médio',
        context: 'Feedback'
      },
      {
        english: "You exceeded expectations on this deliverable.",
        portuguese: "Você superou as expectativas nesta entrega.",
        level: 'médio',
        context: 'Feedback'
      },
      {
        english: "I'd like to see more initiative from you.",
        portuguese: "Gostaria de ver mais iniciativa de você.",
        level: 'médio',
        context: 'Feedback'
      },
      {
        english: "Your communication skills have really improved.",
        portuguese: "Suas habilidades de comunicação realmente melhoraram.",
        level: 'médio',
        context: 'Feedback'
      },
      {
        english: "Let's work on making your presentations more engaging.",
        portuguese: "Vamos trabalhar para tornar suas apresentações mais envolventes.",
        level: 'avançado',
        context: 'Feedback'
      },
      {
        english: "You have great potential for leadership.",
        portuguese: "Você tem grande potencial para liderança.",
        level: 'médio',
        context: 'Feedback'
      },
      {
        english: "I'd like you to take ownership of this process.",
        portuguese: "Gostaria que você assumisse a responsabilidade por este processo.",
        level: 'avançado',
        context: 'Feedback'
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
        context: 'Networking'
      },
      {
        english: "I've heard great things about your work.",
        portuguese: "Ouvi coisas ótimas sobre seu trabalho.",
        level: 'médio',
        context: 'Networking'
      },
      {
        english: "What brings you to this event?",
        portuguese: "O que te trouxe a este evento?",
        level: 'básico',
        context: 'Networking'
      },
      {
        english: "I'd love to learn more about your company.",
        portuguese: "Adoraria saber mais sobre sua empresa.",
        level: 'básico',
        context: 'Networking'
      },
      {
        english: "We should definitely stay in touch.",
        portuguese: "Definitivamente devemos manter contato.",
        level: 'básico',
        context: 'Networking'
      },
      {
        english: "Do you have a business card?",
        portuguese: "Você tem cartão de visita?",
        level: 'básico',
        context: 'Networking'
      },
      {
        english: "I think there might be some synergies between our companies.",
        portuguese: "Acho que pode haver algumas sinergias entre nossas empresas.",
        level: 'avançado',
        context: 'Networking'
      },
      {
        english: "I'd like to introduce you to someone.",
        portuguese: "Gostaria de apresentá-lo a alguém.",
        level: 'básico',
        context: 'Networking'
      },
      {
        english: "What's your take on the industry trends?",
        portuguese: "Qual sua opinião sobre as tendências da indústria?",
        level: 'médio',
        context: 'Networking'
      },
      {
        english: "I'm always looking to expand my professional network.",
        portuguese: "Estou sempre procurando expandir minha rede profissional.",
        level: 'médio',
        context: 'Networking'
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
        context: 'Negociação'
      },
      {
        english: "I think we can work something out.",
        portuguese: "Acho que podemos chegar a um acordo.",
        level: 'médio',
        context: 'Negociação'
      },
      {
        english: "What's your bottom line on this?",
        portuguese: "Qual seu limite mínimo nisto?",
        level: 'avançado',
        context: 'Negociação'
      },
      {
        english: "I'd like to propose a different approach.",
        portuguese: "Gostaria de propor uma abordagem diferente.",
        level: 'médio',
        context: 'Negociação'
      },
      {
        english: "Can we meet somewhere in the middle?",
        portuguese: "Podemos nos encontrar no meio do caminho?",
        level: 'médio',
        context: 'Negociação'
      },
      {
        english: "I need to run this by my team first.",
        portuguese: "Preciso passar isso pela minha equipe primeiro.",
        level: 'médio',
        context: 'Negociação'
      },
      {
        english: "Let's explore some alternative options.",
        portuguese: "Vamos explorar algumas opções alternativas.",
        level: 'médio',
        context: 'Negociação'
      },
      {
        english: "I'm willing to be flexible on the terms.",
        portuguese: "Estou disposto a ser flexível nos termos.",
        level: 'médio',
        context: 'Negociação'
      },
      {
        english: "That's outside our budget range.",
        portuguese: "Isso está fora da nossa faixa orçamentária.",
        level: 'básico',
        context: 'Negociação'
      },
      {
        english: "Can we structure this as a phased approach?",
        portuguese: "Podemos estruturar isso como uma abordagem em fases?",
        level: 'avançado',
        context: 'Negociação'
      },
      {
        english: "I need to understand the value proposition better.",
        portuguese: "Preciso entender melhor a proposta de valor.",
        level: 'avançado',
        context: 'Negociação'
      },
      {
        english: "Let's put our cards on the table.",
        portuguese: "Vamos colocar as cartas na mesa.",
        level: 'avançado',
        context: 'Negociação'
      },
      {
        english: "I'm not comfortable with those terms.",
        portuguese: "Não me sinto confortável com esses termos.",
        level: 'médio',
        context: 'Negociação'
      },
      {
        english: "Can we revisit the pricing structure?",
        portuguese: "Podemos revisar a estrutura de preços?",
        level: 'médio',
        context: 'Negociação'
      },
      {
        english: "I think we're close to a deal.",
        portuguese: "Acho que estamos perto de um acordo.",
        level: 'médio',
        context: 'Negociação'
      },
      {
        english: "Let's iron out the details.",
        portuguese: "Vamos resolver os detalhes.",
        level: 'avançado',
        context: 'Negociação'
      },
      {
        english: "I'd like to sweeten the deal.",
        portuguese: "Gostaria de melhorar a oferta.",
        level: 'avançado',
        context: 'Negociação'
      },
      {
        english: "That's a deal-breaker for us.",
        portuguese: "Isso é um impedimento para nós.",
        level: 'avançado',
        context: 'Negociação'
      },
      {
        english: "Can we include some performance incentives?",
        portuguese: "Podemos incluir alguns incentivos de performance?",
        level: 'avançado',
        context: 'Negociação'
      },
      {
        english: "I need some time to think this over.",
        portuguese: "Preciso de um tempo para pensar sobre isso.",
        level: 'básico',
        context: 'Negociação'
      },
      {
        english: "Let's draft a preliminary agreement.",
        portuguese: "Vamos rascunhar um acordo preliminar.",
        level: 'avançado',
        context: 'Negociação'
      },
      {
        english: "I think we can make this work.",
        portuguese: "Acho que podemos fazer isso funcionar.",
        level: 'básico',
        context: 'Negociação'
      },
      {
        english: "What are your non-negotiables?",
        portuguese: "Quais são seus pontos inegociáveis?",
        level: 'avançado',
        context: 'Negociação'
      },
      {
        english: "Let's shake on it.",
        portuguese: "Vamos apertar as mãos.",
        level: 'básico',
        context: 'Negociação'
      },
      {
        english: "I'm confident we can reach an agreement.",
        portuguese: "Estou confiante de que podemos chegar a um acordo.",
        level: 'médio',
        context: 'Negociação'
      },

      // ========== CATEGORIA: GESTÃO DE TEMPO (20 frases) ==========
      {
        english: "I'm running behind schedule today.",
        portuguese: "Estou atrasado na programação hoje.",
        level: 'básico',
        context: 'Gestão de tempo'
      },
      {
        english: "Can we push this meeting back 30 minutes?",
        portuguese: "Podemos adiar esta reunião por 30 minutos?",
        level: 'básico',
        context: 'Gestão de tempo'
      },
      {
        english: "I need to prioritize my tasks for today.",
        portuguese: "Preciso priorizar minhas tarefas para hoje.",
        level: 'básico',
        context: 'Gestão de tempo'
      },
      {
        english: "Let's do a quick time check.",
        portuguese: "Vamos fazer uma verificação rápida do tempo.",
        level: 'básico',
        context: 'Gestão de tempo'
      },
      {
        english: "I'm blocked until I get approval on this.",
        portuguese: "Estou bloqueado até conseguir aprovação nisto.",
        level: 'médio',
        context: 'Gestão de tempo'
      },
      {
        english: "Can we timebox this discussion to 15 minutes?",
        portuguese: "Podemos limitar esta discussão a 15 minutos?",
        level: 'avançado',
        context: 'Gestão de tempo'
      },
      {
        english: "I'm trying to batch similar tasks together.",
        portuguese: "Estou tentando agrupar tarefas similares.",
        level: 'avançado',
        context: 'Gestão de tempo'
      },
      {
        english: "This is eating up too much of my bandwidth.",
        portuguese: "Isso está consumindo muito do meu tempo.",
        level: 'avançado',
        context: 'Gestão de tempo'
      },
      {
        english: "Let's set a realistic timeline for this project.",
        portuguese: "Vamos definir um cronograma realista para este projeto.",
        level: 'médio',
        context: 'Gestão de tempo'
      },
      {
        english: "I need to block off some focus time.",
        portuguese: "Preciso reservar um tempo para concentração.",
        level: 'médio',
        context: 'Gestão de tempo'
      },
      {
        english: "Can we fast-track this process?",
        portuguese: "Podemos acelerar este processo?",
        level: 'médio',
        context: 'Gestão de tempo'
      },
      {
        english: "I'm trying to optimize my workflow.",
        portuguese: "Estou tentando otimizar meu fluxo de trabalho.",
        level: 'avançado',
        context: 'Gestão de tempo'
      },
      {
        english: "Let's identify the critical path.",
        portuguese: "Vamos identificar o caminho crítico.",
        level: 'avançado',
        context: 'Gestão de tempo'
      },
      {
        english: "I need to delegate some of these tasks.",
        portuguese: "Preciso delegar algumas dessas tarefas.",
        level: 'médio',
        context: 'Gestão de tempo'
      },
      {
        english: "Can we run these processes in parallel?",
        portuguese: "Podemos executar esses processos em paralelo?",
        level: 'avançado',
        context: 'Gestão de tempo'
      },
      {
        english: "I'm trying to minimize context switching.",
        portuguese: "Estou tentando minimizar a troca de contexto.",
        level: 'avançado',
        context: 'Gestão de tempo'
      },
      {
        english: "Let's establish some buffer time.",
        portuguese: "Vamos estabelecer um tempo de folga.",
        level: 'médio',
        context: 'Gestão de tempo'
      },
      {
        english: "I need to reschedule our one-on-one.",
        portuguese: "Preciso reagendar nossa reunião individual.",
        level: 'básico',
        context: 'Gestão de tempo'
      },
      {
        english: "Can we compress the timeline?",
        portuguese: "Podemos comprimir o cronograma?",
        level: 'médio',
        context: 'Gestão de tempo'
      },
      {
        english: "I'm working to eliminate time wasters.",
        portuguese: "Estou trabalhando para eliminar desperdiçadores de tempo.",
        level: 'avançado',
        context: 'Gestão de tempo'
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
        context: 'Aeroporto'
      },
      {
        english: "I'd like to check in, please.",
        portuguese: "Gostaria de fazer o check-in, por favor.",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "Is breakfast included in the room rate?",
        portuguese: "O café da manhã está incluso na diária?",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "Could you recommend a good restaurant nearby?",
        portuguese: "Você poderia recomendar um bom restaurante aqui perto?",
        level: 'básico',
        context: 'Recomendação'
      },
      {
        english: "How much does a taxi to downtown cost?",
        portuguese: "Quanto custa um táxi para o centro?",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "I need to exchange some money.",
        portuguese: "Preciso trocar um pouco de dinheiro.",
        level: 'básico',
        context: 'Câmbio'
      },
      {
        english: "What time does the museum close?",
        portuguese: "Que horas o museu fecha?",
        level: 'básico',
        context: 'Turismo'
      },
      {
        english: "Is there a pharmacy around here?",
        portuguese: "Há uma farmácia aqui por perto?",
        level: 'básico',
        context: 'Emergência'
      },
      {
        english: "Can I get a receipt, please?",
        portuguese: "Posso pegar um recibo, por favor?",
        level: 'básico',
        context: 'Compras'
      },
      {
        english: "I'm looking for the tourist information center.",
        portuguese: "Estou procurando o centro de informações turísticas.",
        level: 'médio',
        context: 'Orientação'
      },

      // ========== CATEGORIA: AEROPORTO (35 frases) ==========
      {
        english: "I'd like to check in for my flight.",
        portuguese: "Gostaria de fazer o check-in para meu voo.",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "Can I have an aisle seat, please?",
        portuguese: "Posso ter um assento no corredor, por favor?",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "How many bags can I check in?",
        portuguese: "Quantas bagagens posso despachar?",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "Is this carry-on allowed?",
        portuguese: "Esta bagagem de mão é permitida?",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "Where is the security checkpoint?",
        portuguese: "Onde fica o controle de segurança?",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "I need to declare these items.",
        portuguese: "Preciso declarar esses itens.",
        level: 'médio',
        context: 'Aeroporto'
      },
      {
        english: "My flight has been delayed.",
        portuguese: "Meu voo foi atrasado.",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "Where can I find the departure lounge?",
        portuguese: "Onde posso encontrar a sala de embarque?",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "Is there free WiFi at the airport?",
        portuguese: "Há WiFi gratuito no aeroporto?",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "I missed my connecting flight.",
        portuguese: "Perdi meu voo de conexão.",
        level: 'médio',
        context: 'Aeroporto'
      },
      {
        english: "Can you help me with rebooking?",
        portuguese: "Você pode me ajudar com a remarcação?",
        level: 'médio',
        context: 'Aeroporto'
      },
      {
        english: "Where is the baggage claim area?",
        portuguese: "Onde fica a área de retirada de bagagem?",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "My luggage didn't arrive.",
        portuguese: "Minha bagagem não chegou.",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "I need to file a lost luggage report.",
        portuguese: "Preciso registrar um relatório de bagagem perdida.",
        level: 'médio',
        context: 'Aeroporto'
      },
      {
        english: "What's the boarding time?",
        portuguese: "Qual é o horário de embarque?",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "Is the flight on time?",
        portuguese: "O voo está no horário?",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "I'd like to upgrade to business class.",
        portuguese: "Gostaria de fazer upgrade para classe executiva.",
        level: 'médio',
        context: 'Aeroporto'
      },
      {
        english: "Where can I get a trolley?",
        portuguese: "Onde posso pegar um carrinho?",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "Is there a duty-free shop here?",
        portuguese: "Há uma loja duty-free aqui?",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "I need assistance with my wheelchair.",
        portuguese: "Preciso de assistência com minha cadeira de rodas.",
        level: 'médio',
        context: 'Aeroporto'
      },
      {
        english: "Can I change my seat assignment?",
        portuguese: "Posso mudar minha designação de assento?",
        level: 'médio',
        context: 'Aeroporto'
      },
      {
        english: "Where is the nearest restroom?",
        portuguese: "Onde fica o banheiro mais próximo?",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "I need to page someone.",
        portuguese: "Preciso chamar alguém pelo alto-falante.",
        level: 'avançado',
        context: 'Aeroporto'
      },
      {
        english: "What's the weight limit for checked bags?",
        portuguese: "Qual é o limite de peso para bagagens despachadas?",
        level: 'médio',
        context: 'Aeroporto'
      },
      {
        english: "I have a layover here.",
        portuguese: "Tenho uma escala aqui.",
        level: 'médio',
        context: 'Aeroporto'
      },
      {
        english: "Where can I store my luggage?",
        portuguese: "Onde posso guardar minha bagagem?",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "I need a boarding pass reprint.",
        portuguese: "Preciso reimprimir meu cartão de embarque.",
        level: 'médio',
        context: 'Aeroporto'
      },
      {
        english: "Is there a pharmacy in the airport?",
        portuguese: "Há uma farmácia no aeroporto?",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "I'm traveling with an infant.",
        portuguese: "Estou viajando com um bebê.",
        level: 'médio',
        context: 'Aeroporto'
      },
      {
        english: "Where can I get travel insurance?",
        portuguese: "Onde posso conseguir seguro viagem?",
        level: 'médio',
        context: 'Aeroporto'
      },
      {
        english: "I need to cancel my flight.",
        portuguese: "Preciso cancelar meu voo.",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "What terminal is my departure from?",
        portuguese: "De qual terminal é minha partida?",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "I need special meal assistance.",
        portuguese: "Preciso de assistência para refeição especial.",
        level: 'médio',
        context: 'Aeroporto'
      },
      {
        english: "Where is the airport information desk?",
        portuguese: "Onde fica o balcão de informações do aeroporto?",
        level: 'básico',
        context: 'Aeroporto'
      },
      {
        english: "I'm here for an international transfer.",
        portuguese: "Estou aqui para uma transferência internacional.",
        level: 'avançado',
        context: 'Aeroporto'
      },

      // ========== CATEGORIA: HOTEL (30 frases) ==========
      {
        english: "I have a reservation under the name Smith.",
        portuguese: "Tenho uma reserva no nome Smith.",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "What time is check-out?",
        portuguese: "Que horas é o check-out?",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "Can I have a wake-up call at 7 AM?",
        portuguese: "Posso ter uma chamada de despertar às 7h?",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "I'd like to extend my stay.",
        portuguese: "Gostaria de estender minha estadia.",
        level: 'médio',
        context: 'Hotel'
      },
      {
        english: "Is there a safe in the room?",
        portuguese: "Há um cofre no quarto?",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "The air conditioning isn't working.",
        portuguese: "O ar condicionado não está funcionando.",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "Can I get extra towels?",
        portuguese: "Posso ter toalhas extras?",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "Where is the fitness center?",
        portuguese: "Onde fica a academia?",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "What's the WiFi password?",
        portuguese: "Qual é a senha do WiFi?",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "I need to charge my phone.",
        portuguese: "Preciso carregar meu telefone.",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "Can you call a taxi for me?",
        portuguese: "Você pode chamar um táxi para mim?",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "I'd like to make a dinner reservation.",
        portuguese: "Gostaria de fazer uma reserva para jantar.",
        level: 'médio',
        context: 'Hotel'
      },
      {
        english: "Is room service available?",
        portuguese: "O serviço de quarto está disponível?",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "Can I store my luggage after checkout?",
        portuguese: "Posso guardar minha bagagem depois do checkout?",
        level: 'médio',
        context: 'Hotel'
      },
      {
        english: "I need an iron and ironing board.",
        portuguese: "Preciso de um ferro e tábua de passar.",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "Where can I do laundry?",
        portuguese: "Onde posso lavar roupa?",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "I locked myself out of my room.",
        portuguese: "Me tranquei para fora do meu quarto.",
        level: 'médio',
        context: 'Hotel'
      },
      {
        english: "Can I have a different room?",
        portuguese: "Posso ter um quarto diferente?",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "The room is too noisy.",
        portuguese: "O quarto está muito barulhento.",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "I need a crib for my baby.",
        portuguese: "Preciso de um berço para meu bebê.",
        level: 'médio',
        context: 'Hotel'
      },
      {
        english: "What time does the pool close?",
        portuguese: "Que horas a piscina fecha?",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "Can I get a late checkout?",
        portuguese: "Posso ter um checkout tardio?",
        level: 'médio',
        context: 'Hotel'
      },
      {
        english: "I need help with my bill.",
        portuguese: "Preciso de ajuda com minha conta.",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "Is there a business center?",
        portuguese: "Há um centro de negócios?",
        level: 'médio',
        context: 'Hotel'
      },
      {
        english: "Where can I park my car?",
        portuguese: "Onde posso estacionar meu carro?",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "I need directions to downtown.",
        portuguese: "Preciso de direções para o centro.",
        level: 'básico',
        context: 'Hotel'
      },
      {
        english: "Can you recommend local attractions?",
        portuguese: "Você pode recomendar atrações locais?",
        level: 'médio',
        context: 'Hotel'
      },
      {
        english: "I'd like to book a spa treatment.",
        portuguese: "Gostaria de agendar um tratamento de spa.",
        level: 'médio',
        context: 'Hotel'
      },
      {
        english: "The elevator is out of order.",
        portuguese: "O elevador está fora de ordem.",
        level: 'médio',
        context: 'Hotel'
      },
      {
        english: "Can I get a receipt for my stay?",
        portuguese: "Posso ter um recibo da minha estadia?",
        level: 'básico',
        context: 'Hotel'
      },

      // ========== CATEGORIA: RESTAURANTE (30 frases) ==========
      {
        english: "Do you have a table for two?",
        portuguese: "Vocês têm uma mesa para dois?",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "Can I see the menu, please?",
        portuguese: "Posso ver o cardápio, por favor?",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "What do you recommend?",
        portuguese: "O que você recomenda?",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "I'm allergic to nuts.",
        portuguese: "Sou alérgico a nozes.",
        level: 'médio',
        context: 'Restaurante'
      },
      {
        english: "Can I have the check, please?",
        portuguese: "Posso ter a conta, por favor?",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "I'll have the salmon.",
        portuguese: "Vou querer o salmão.",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "Is this dish spicy?",
        portuguese: "Este prato é picante?",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "Can we split the bill?",
        portuguese: "Podemos dividir a conta?",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "I'd like my steak medium-rare.",
        portuguese: "Gostaria do meu bife mal passado.",
        level: 'médio',
        context: 'Restaurante'
      },
      {
        english: "Do you have vegetarian options?",
        portuguese: "Vocês têm opções vegetarianas?",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "Can I substitute the fries?",
        portuguese: "Posso substituir as batatas fritas?",
        level: 'médio',
        context: 'Restaurante'
      },
      {
        english: "This isn't what I ordered.",
        portuguese: "Isso não é o que pedi.",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "Could I get a to-go box?",
        portuguese: "Poderia pegar uma caixa para viagem?",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "What's the soup of the day?",
        portuguese: "Qual é a sopa do dia?",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "I'd like to make a reservation.",
        portuguese: "Gostaria de fazer uma reserva.",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "Can we sit by the window?",
        portuguese: "Podemos sentar perto da janela?",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "I'll start with an appetizer.",
        portuguese: "Vou começar com uma entrada.",
        level: 'médio',
        context: 'Restaurante'
      },
      {
        english: "What wines do you have by the glass?",
        portuguese: "Que vinhos vocês têm por taça?",
        level: 'médio',
        context: 'Restaurante'
      },
      {
        english: "Is service charge included?",
        portuguese: "A taxa de serviço está inclusa?",
        level: 'médio',
        context: 'Restaurante'
      },
      {
        english: "Could I get extra sauce on the side?",
        portuguese: "Poderia ter molho extra à parte?",
        level: 'médio',
        context: 'Restaurante'
      },
      {
        english: "This food is cold.",
        portuguese: "Esta comida está fria.",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "Do you accept credit cards?",
        portuguese: "Vocês aceitam cartão de crédito?",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "Can I see the dessert menu?",
        portuguese: "Posso ver o cardápio de sobremesas?",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "I'm on a diet.",
        portuguese: "Estou de dieta.",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "Could you make it less salty?",
        portuguese: "Vocês poderiam fazer com menos sal?",
        level: 'médio',
        context: 'Restaurante'
      },
      {
        english: "We're ready to order.",
        portuguese: "Estamos prontos para pedir.",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "Can I get a refill?",
        portuguese: "Posso ter um refil?",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "I'd like to speak to the manager.",
        portuguese: "Gostaria de falar com o gerente.",
        level: 'médio',
        context: 'Restaurante'
      },
      {
        english: "Do you have a kids menu?",
        portuguese: "Vocês têm cardápio infantil?",
        level: 'básico',
        context: 'Restaurante'
      },
      {
        english: "Could we get some bread while we wait?",
        portuguese: "Poderíamos ter um pouco de pão enquanto esperamos?",
        level: 'médio',
        context: 'Restaurante'
      },

      // ========== CATEGORIA: TRANSPORTE (25 frases) ==========
      {
        english: "How do I get to the city center?",
        portuguese: "Como chego ao centro da cidade?",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "Where is the nearest subway station?",
        portuguese: "Onde fica a estação de metrô mais próxima?",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "How much is a one-way ticket?",
        portuguese: "Quanto custa uma passagem só de ida?",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "Does this bus go to the airport?",
        portuguese: "Este ônibus vai para o aeroporto?",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "I'd like to rent a car.",
        portuguese: "Gostaria de alugar um carro.",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "Can you call me a taxi?",
        portuguese: "Você pode chamar um táxi para mim?",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "What time does the last train leave?",
        portuguese: "Que horas sai o último trem?",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "I need to buy a metro card.",
        portuguese: "Preciso comprar um cartão do metrô.",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "Which platform for the train to Boston?",
        portuguese: "Qual plataforma para o trem para Boston?",
        level: 'médio',
        context: 'Transporte'
      },
      {
        english: "Is this seat taken?",
        portuguese: "Este assento está ocupado?",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "I missed my stop.",
        portuguese: "Perdi minha parada.",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "How long does the journey take?",
        portuguese: "Quanto tempo demora a viagem?",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "Can I get a transfer?",
        portuguese: "Posso pegar uma transferência?",
        level: 'médio',
        context: 'Transporte'
      },
      {
        english: "Where do I validate my ticket?",
        portuguese: "Onde valido minha passagem?",
        level: 'médio',
        context: 'Transporte'
      },
      {
        english: "Is there a direct route?",
        portuguese: "Há uma rota direta?",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "I need to get off at the next stop.",
        portuguese: "Preciso descer na próxima parada.",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "How often do buses run?",
        portuguese: "Com que frequência os ônibus passam?",
        level: 'médio',
        context: 'Transporte'
      },
      {
        english: "Can I pay with exact change?",
        portuguese: "Posso pagar com troco exato?",
        level: 'médio',
        context: 'Transporte'
      },
      {
        english: "I'd like a window seat.",
        portuguese: "Gostaria de um assento na janela.",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "Where can I catch a bus to downtown?",
        portuguese: "Onde posso pegar um ônibus para o centro?",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "Is this the right train?",
        portuguese: "Este é o trem certo?",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "I need a receipt for my fare.",
        portuguese: "Preciso de um recibo da minha passagem.",
        level: 'médio',
        context: 'Transporte'
      },
      {
        english: "Can I bring my luggage on board?",
        portuguese: "Posso levar minha bagagem a bordo?",
        level: 'médio',
        context: 'Transporte'
      },
      {
        english: "Is there WiFi on this bus?",
        portuguese: "Há WiFi neste ônibus?",
        level: 'básico',
        context: 'Transporte'
      },
      {
        english: "What's the fare to the museum?",
        portuguese: "Qual é a tarifa para o museu?",
        level: 'básico',
        context: 'Transporte'
      },

      // ========== CATEGORIA: COMPRAS (25 frases) ==========
      {
        english: "How much does this cost?",
        portuguese: "Quanto custa isso?",
        level: 'básico',
        context: 'Compras'
      },
      {
        english: "Do you accept credit cards?",
        portuguese: "Vocês aceitam cartão de crédito?",
        level: 'básico',
        context: 'Compras'
      },
      {
        english: "Can I try this on?",
        portuguese: "Posso experimentar isso?",
        level: 'básico',
        context: 'Compras'
      },
      {
        english: "Do you have this in a different size?",
        portuguese: "Vocês têm isso em um tamanho diferente?",
        level: 'básico',
        context: 'Compras'
      },
      {
        english: "I'm just browsing, thanks.",
        portuguese: "Estou só olhando, obrigado.",
        level: 'básico',
        context: 'Compras'
      },
      {
        english: "Can I get a discount?",
        portuguese: "Posso ter um desconto?",
        level: 'básico',
        context: 'Compras'
      },
      {
        english: "What's your return policy?",
        portuguese: "Qual é sua política de devolução?",
        level: 'médio',
        context: 'Compras'
      },
      {
        english: "I'd like to return this item.",
        portuguese: "Gostaria de devolver este item.",
        level: 'básico',
        context: 'Compras'
      },
      {
        english: "Do you have this in stock?",
        portuguese: "Vocês têm isso em estoque?",
        level: 'básico',
        context: 'Compras'
      },
      {
        english: "Where is the fitting room?",
        portuguese: "Onde fica o provador?",
        level: 'básico',
        context: 'Compras'
      },
      {
        english: "Can I pay in cash?",
        portuguese: "Posso pagar em dinheiro?",
        level: 'básico',
        context: 'Compras'
      },
      {
        english: "Is this on sale?",
        portuguese: "Isso está em promoção?",
        level: 'básico',
        context: 'Compras'
      },
      {
        english: "Can you hold this for me?",
        portuguese: "Você pode guardar isso para mim?",
        level: 'médio',
        context: 'Compras'
      },
      {
        english: "Do you offer gift wrapping?",
        portuguese: "Vocês oferecem embrulho para presente?",
        level: 'médio',
        context: 'Compras'
      },
      {
        english: "I need a bag for this.",
        portuguese: "Preciso de uma sacola para isso.",
        level: 'básico',
        context: 'Compras'
      },
      {
        english: "Can I see that item in the window?",
        portuguese: "Posso ver aquele item na vitrine?",
        level: 'médio',
        context: 'Compras'
      },
      {
        english: "What time do you close?",
        portuguese: "Que horas vocês fecham?",
        level: 'básico',
        context: 'Compras'
      },
      {
        english: "Do you ship internationally?",
        portuguese: "Vocês fazem envio internacional?",
        level: 'médio',
        context: 'Compras'
      },
      {
        english: "I'm looking for a gift.",
        portuguese: "Estou procurando um presente.",
        level: 'básico',
        context: 'Compras'
      },
      {
        english: "Can I exchange this for something else?",
        portuguese: "Posso trocar isso por outra coisa?",
        level: 'médio',
        context: 'Compras'
      },
      {
        english: "Do you have a loyalty program?",
        portuguese: "Vocês têm programa de fidelidade?",
        level: 'médio',
        context: 'Compras'
      },
      {
        english: "I need to speak to a manager.",
        portuguese: "Preciso falar com um gerente.",
        level: 'médio',
        context: 'Compras'
      },
      {
        english: "Can you check if you have this in the back?",
        portuguese: "Você pode verificar se têm isso no estoque?",
        level: 'médio',
        context: 'Compras'
      },
      {
        english: "I'd like to open a store account.",
        portuguese: "Gostaria de abrir uma conta na loja.",
        level: 'avançado',
        context: 'Compras'
      },
      {
        english: "When will you restock this item?",
        portuguese: "Quando vocês vão repor este item?",
        level: 'médio',
        context: 'Compras'
      },

      // ========== CATEGORIA: EMERGÊNCIA (20 frases) ==========
      {
        english: "I need help!",
        portuguese: "Preciso de ajuda!",
        level: 'básico',
        context: 'Emergência'
      },
      {
        english: "Call the police!",
        portuguese: "Chame a polícia!",
        level: 'básico',
        context: 'Emergência'
      },
      {
        english: "I need to go to the hospital.",
        portuguese: "Preciso ir ao hospital.",
        level: 'básico',
        context: 'Emergência'
      },
      {
        english: "Where is the nearest pharmacy?",
        portuguese: "Onde fica a farmácia mais próxima?",
        level: 'básico',
        context: 'Emergência'
      },
      {
        english: "I lost my passport.",
        portuguese: "Perdi meu passaporte.",
        level: 'básico',
        context: 'Emergência'
      },
      {
        english: "Someone stole my wallet.",
        portuguese: "Alguém roubou minha carteira.",
        level: 'básico',
        context: 'Emergência'
      },
      {
        english: "I need to contact my embassy.",
        portuguese: "Preciso contatar minha embaixada.",
        level: 'médio',
        context: 'Emergência'
      },
      {
        english: "Can you call an ambulance?",
        portuguese: "Você pode chamar uma ambulância?",
        level: 'básico',
        context: 'Emergência'
      },
      {
        english: "I'm having chest pain.",
        portuguese: "Estou com dor no peito.",
        level: 'médio',
        context: 'Emergência'
      },
      {
        english: "I'm allergic to this medication.",
        portuguese: "Sou alérgico a este medicamento.",
        level: 'médio',
        context: 'Emergência'
      },
      {
        english: "I need to file a police report.",
        portuguese: "Preciso registrar um boletim de ocorrência.",
        level: 'avançado',
        context: 'Emergência'
      },
      {
        english: "My car broke down.",
        portuguese: "Meu carro quebrou.",
        level: 'básico',
        context: 'Emergência'
      },
      {
        english: "I locked my keys in the car.",
        portuguese: "Tranquei as chaves no carro.",
        level: 'médio',
        context: 'Emergência'
      },
      {
        english: "I need roadside assistance.",
        portuguese: "Preciso de assistência na estrada.",
        level: 'avançado',
        context: 'Emergência'
      },
      {
        english: "There's been an accident.",
        portuguese: "Houve um acidente.",
        level: 'básico',
        context: 'Emergência'
      },
      {
        english: "I feel dizzy.",
        portuguese: "Estou me sentindo tonto.",
        level: 'básico',
        context: 'Emergência'
      },
      {
        english: "I need a doctor who speaks English.",
        portuguese: "Preciso de um médico que fale inglês.",
        level: 'médio',
        context: 'Emergência'
      },
      {
        english: "Where is the nearest hospital?",
        portuguese: "Onde fica o hospital mais próximo?",
        level: 'básico',
        context: 'Emergência'
      },
      {
        english: "I need travel insurance assistance.",
        portuguese: "Preciso de assistência do seguro viagem.",
        level: 'avançado',
        context: 'Emergência'
      },
      {
        english: "My flight was cancelled due to weather.",
        portuguese: "Meu voo foi cancelado devido ao tempo.",
        level: 'médio',
        context: 'Emergência'
      },

      // ========== CATEGORIA: TURISMO (20 frases) ==========
      {
        english: "What are the must-see attractions?",
        portuguese: "Quais são as atrações imperdíveis?",
        level: 'médio',
        context: 'Turismo'
      },
      {
        english: "How much is the entrance fee?",
        portuguese: "Quanto custa a entrada?",
        level: 'básico',
        context: 'Turismo'
      },
      {
        english: "Are there guided tours available?",
        portuguese: "Há tours guiados disponíveis?",
        level: 'médio',
        context: 'Turismo'
      },
      {
        english: "Can I take pictures here?",
        portuguese: "Posso tirar fotos aqui?",
        level: 'básico',
        context: 'Turismo'
      },
      {
        english: "What time do you open?",
        portuguese: "Que horas vocês abrem?",
        level: 'básico',
        context: 'Turismo'
      },
      {
        english: "Is there a student discount?",
        portuguese: "Há desconto para estudante?",
        level: 'básico',
        context: 'Turismo'
      },
      {
        english: "How long does the tour last?",
        portuguese: "Quanto tempo dura o tour?",
        level: 'básico',
        context: 'Turismo'
      },
      {
        english: "Can I book tickets online?",
        portuguese: "Posso comprar ingressos online?",
        level: 'básico',
        context: 'Turismo'
      },
      {
        english: "Where can I buy souvenirs?",
        portuguese: "Onde posso comprar lembrancinhas?",
        level: 'básico',
        context: 'Turismo'
      },
      {
        english: "Is there an audio guide?",
        portuguese: "Há um guia de áudio?",
        level: 'médio',
        context: 'Turismo'
      },
      {
        english: "What's the history of this place?",
        portuguese: "Qual é a história deste lugar?",
        level: 'médio',
        context: 'Turismo'
      },
      {
        english: "Are there any festivals this week?",
        portuguese: "Há algum festival esta semana?",
        level: 'médio',
        context: 'Turismo'
      },
      {
        english: "Can you recommend a local restaurant?",
        portuguese: "Você pode recomendar um restaurante local?",
        level: 'básico',
        context: 'Turismo'
      },
      {
        english: "Where is the best viewpoint?",
        portuguese: "Onde fica o melhor mirante?",
        level: 'básico',
        context: 'Turismo'
      },
      {
        english: "Is it safe to walk here at night?",
        portuguese: "É seguro caminhar aqui à noite?",
        level: 'médio',
        context: 'Turismo'
      },
      {
        english: "Can I get a map of the area?",
        portuguese: "Posso pegar um mapa da área?",
        level: 'básico',
        context: 'Turismo'
      },
      {
        english: "What's the local specialty?",
        portuguese: "Qual é a especialidade local?",
        level: 'básico',
        context: 'Turismo'
      },
      {
        english: "Are there any free activities?",
        portuguese: "Há alguma atividade gratuita?",
        level: 'básico',
        context: 'Turismo'
      },
      {
        english: "How do I get to the old town?",
        portuguese: "Como chego à cidade velha?",
        level: 'básico',
        context: 'Turismo'
      },
      {
        english: "Is this area wheelchair accessible?",
        portuguese: "Esta área é acessível para cadeira de rodas?",
        level: 'avançado',
        context: 'Turismo'
      }
    ],
    exercises: [
      {
        id: 'viagens-ex-1',
        correctSentence: 'Where is the boarding gate?',
        words: ['Where', 'is', 'the', 'boarding', 'gate?'],
        translation: 'Onde fica o portão de embarque?'
      },
      {
        id: 'viagens-ex-2',
        correctSentence: 'I need a taxi please.',
        words: ['I', 'need', 'a', 'taxi', 'please.'],
        translation: 'Preciso de um táxi, por favor.'
      },
      {
        id: 'viagens-ex-3',
        correctSentence: 'How much is this room?',
        words: ['How', 'much', 'is', 'this', 'room?'],
        translation: 'Quanto custa este quarto?'
      },
      {
        id: 'viagens-ex-4',
        correctSentence: 'Can I see the menu?',
        words: ['Can', 'I', 'see', 'the', 'menu?'],
        translation: 'Posso ver o cardápio?'
      },
      {
        id: 'viagens-ex-5',
        correctSentence: 'What time is checkout?',
        words: ['What', 'time', 'is', 'checkout?'],
        translation: 'Que horas é o checkout?'
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
        context: 'Preços'
      },
      {
        english: "Do you accept credit cards?",
        portuguese: "Vocês aceitam cartão de crédito?",
        level: 'básico',
        context: 'Pagamento'
      },
      {
        english: "Can I get a receipt?",
        portuguese: "Posso pegar um recibo?",
        level: 'básico',
        context: 'Comprovante'
      },
      {
        english: "Where is the checkout?",
        portuguese: "Onde fica o caixa?",
        level: 'básico',
        context: 'Orientação'
      },
      {
        english: "Is this on sale?",
        portuguese: "Isso está em promoção?",
        level: 'básico',
        context: 'Promoção'
      },
      {
        english: "Can I try this on?",
        portuguese: "Posso experimentar isso?",
        level: 'básico',
        context: 'Experimentar'
      },
      {
        english: "Do you have this in a different size?",
        portuguese: "Vocês têm isso em um tamanho diferente?",
        level: 'básico',
        context: 'Tamanhos'
      },
      {
        english: "I'm just looking, thanks.",
        portuguese: "Estou só olhando, obrigado.",
        level: 'básico',
        context: 'Navegação'
      },
      {
        english: "Can I get a discount?",
        portuguese: "Posso ter um desconto?",
        level: 'médio',
        context: 'Negociação'
      },
      {
        english: "What's your return policy?",
        portuguese: "Qual é sua política de devolução?",
        level: 'médio',
        context: 'Devolução'
      },

      // ========== FRASES PREMIUM ==========
      {
        english: "I'd like to return this item.",
        portuguese: "Gostaria de devolver este item.",
        level: 'básico',
        context: 'Devolução'
      },
      {
        english: "Do you have this in stock?",
        portuguese: "Vocês têm isso em estoque?",
        level: 'básico',
        context: 'Estoque'
      },
      {
        english: "Where is the fitting room?",
        portuguese: "Onde fica o provador?",
        level: 'básico',
        context: 'Localização'
      },
      {
        english: "Can I pay in cash?",
        portuguese: "Posso pagar em dinheiro?",
        level: 'básico',
        context: 'Pagamento'
      },
      {
        english: "Can you hold this for me?",
        portuguese: "Você pode guardar isso para mim?",
        level: 'médio',
        context: 'Reserva'
      },
      {
        english: "Do you offer gift wrapping?",
        portuguese: "Vocês fazem embrulho para presente?",
        level: 'médio',
        context: 'Serviços'
      },
      
      // SUPERMERCADO - BÁSICO
      {
        english: "Where are the milk products?",
        portuguese: "Onde ficam os laticínios?",
        level: 'básico',
        context: 'Supermercado'
      },
      {
        english: "Paper or plastic?",
        portuguese: "Papel ou plástico?",
        level: 'básico',
        context: 'Supermercado'
      },
      {
        english: "I need a shopping cart.",
        portuguese: "Preciso de um carrinho de compras.",
        level: 'básico',
        context: 'Supermercado'
      },
      {
        english: "Where's the bread section?",
        portuguese: "Onde fica a seção de pães?",
        level: 'básico',
        context: 'Supermercado'
      },
      {
        english: "Do you have fresh fish?",
        portuguese: "Vocês têm peixe fresco?",
        level: 'básico',
        context: 'Supermercado'
      },
      {
        english: "I'm looking for organic vegetables.",
        portuguese: "Estou procurando vegetais orgânicos.",
        level: 'médio',
        context: 'Supermercado'
      },
      {
        english: "Can I get this sliced?",
        portuguese: "Posso pedir para fatiar isso?",
        level: 'básico',
        context: 'Supermercado'
      },
      {
        english: "What time do you close?",
        portuguese: "Que horas vocês fecham?",
        level: 'básico',
        context: 'Informação'
      },
      {
        english: "Do you have a loyalty card?",
        portuguese: "Vocês têm cartão fidelidade?",
        level: 'médio',
        context: 'Supermercado'
      },
      {
        english: "I forgot my shopping list.",
        portuguese: "Esqueci minha lista de compras.",
        level: 'básico',
        context: 'Supermercado'
      },
      
      // ROUPAS E MODA - BÁSICO
      {
        english: "What size is this?",
        portuguese: "Que tamanho é este?",
        level: 'básico',
        context: 'Roupas'
      },
      {
        english: "Do you have this in blue?",
        portuguese: "Vocês têm isso em azul?",
        level: 'básico',
        context: 'Roupas'
      },
      {
        english: "This doesn't fit.",
        portuguese: "Isso não serve.",
        level: 'básico',
        context: 'Roupas'
      },
      {
        english: "Can I exchange this?",
        portuguese: "Posso trocar isso?",
        level: 'básico',
        context: 'Troca'
      },
      {
        english: "It's too tight.",
        portuguese: "Está muito apertado.",
        level: 'básico',
        context: 'Roupas'
      },
      {
        english: "Do you have a larger size?",
        portuguese: "Vocês têm um tamanho maior?",
        level: 'básico',
        context: 'Roupas'
      },
      {
        english: "I need size medium.",
        portuguese: "Preciso do tamanho médio.",
        level: 'básico',
        context: 'Roupas'
      },
      {
        english: "This is perfect!",
        portuguese: "Isso está perfeito!",
        level: 'básico',
        context: 'Aprovação'
      },
      
      // PAGAMENTO - MÉDIO
      {
        english: "Do you accept contactless payment?",
        portuguese: "Vocês aceitam pagamento sem contato?",
        level: 'médio',
        context: 'Pagamento'
      },
      {
        english: "Can I pay with my phone?",
        portuguese: "Posso pagar com meu celular?",
        level: 'médio',
        context: 'Pagamento'
      },
      {
        english: "My card was declined.",
        portuguese: "Meu cartão foi recusado.",
        level: 'médio',
        context: 'Pagamento'
      },
      {
        english: "Can I split the payment?",
        portuguese: "Posso dividir o pagamento?",
        level: 'médio',
        context: 'Pagamento'
      },
      {
        english: "I need to insert my PIN.",
        portuguese: "Preciso digitar minha senha.",
        level: 'médio',
        context: 'Pagamento'
      },
      {
        english: "Do you take installments?",
        portuguese: "Vocês parcelam?",
        level: 'médio',
        context: 'Pagamento'
      },
      {
        english: "Can I pay in three payments?",
        portuguese: "Posso pagar em três vezes?",
        level: 'médio',
        context: 'Pagamento'
      },
      {
        english: "Is there a transaction fee?",
        portuguese: "Há taxa de transação?",
        level: 'avançado',
        context: 'Pagamento'
      },
      
      // COMPRAS ONLINE - MÉDIO/AVANÇADO
      {
        english: "What's the shipping cost?",
        portuguese: "Qual é o custo do frete?",
        level: 'médio',
        context: 'Online'
      },
      {
        english: "How long is delivery?",
        portuguese: "Quanto tempo demora a entrega?",
        level: 'médio',
        context: 'Online'
      },
      {
        english: "Can I track my order?",
        portuguese: "Posso rastrear meu pedido?",
        level: 'médio',
        context: 'Online'
      },
      {
        english: "I need to update my address.",
        portuguese: "Preciso atualizar meu endereço.",
        level: 'médio',
        context: 'Online'
      },
      {
        english: "Is expedited shipping available?",
        portuguese: "Há entrega expressa disponível?",
        level: 'avançado',
        context: 'Online'
      },
      {
        english: "My package was damaged.",
        portuguese: "Meu pacote foi danificado.",
        level: 'médio',
        context: 'Online'
      },
      {
        english: "I didn't receive my order.",
        portuguese: "Não recebi meu pedido.",
        level: 'médio',
        context: 'Online'
      },
      
      // MERCADO/FEIRA - BÁSICO
      {
        english: "How much per pound?",
        portuguese: "Quanto por libra?",
        level: 'básico',
        context: 'Feira'
      },
      {
        english: "Are these apples fresh?",
        portuguese: "Essas maçãs estão frescas?",
        level: 'básico',
        context: 'Feira'
      },
      {
        english: "Can I taste this?",
        portuguese: "Posso provar isso?",
        level: 'básico',
        context: 'Feira'
      },
      {
        english: "I'll take two pounds.",
        portuguese: "Vou levar duas libras.",
        level: 'básico',
        context: 'Feira'
      },
      {
        english: "What's the best price?",
        portuguese: "Qual é o melhor preço?",
        level: 'médio',
        context: 'Negociação'
      },
      {
        english: "These look good.",
        portuguese: "Esses parecem bons.",
        level: 'básico',
        context: 'Aprovação'
      },
      {
        english: "Do you have ripe bananas?",
        portuguese: "Vocês têm bananas maduras?",
        level: 'básico',
        context: 'Feira'
      },
      
      // FARMÁCIA - MÉDIO
      {
        english: "I need something for a headache.",
        portuguese: "Preciso de algo para dor de cabeça.",
        level: 'médio',
        context: 'Farmácia'
      },
      {
        english: "Do I need a prescription?",
        portuguese: "Preciso de receita médica?",
        level: 'médio',
        context: 'Farmácia'
      },
      {
        english: "What are the side effects?",
        portuguese: "Quais são os efeitos colaterais?",
        level: 'avançado',
        context: 'Farmácia'
      },
      {
        english: "Do you have the generic version?",
        portuguese: "Vocês têm a versão genérica?",
        level: 'avançado',
        context: 'Farmácia'
      },
      {
        english: "How often should I take this?",
        portuguese: "Com que frequência devo tomar isso?",
        level: 'médio',
        context: 'Farmácia'
      },
      {
        english: "Is this covered by insurance?",
        portuguese: "Isso é coberto pelo seguro?",
        level: 'avançado',
        context: 'Farmácia'
      },
      
      // ELETRÔNICOS - MÉDIO/AVANÇADO
      {
        english: "Does this come with a warranty?",
        portuguese: "Isso vem com garantia?",
        level: 'médio',
        context: 'Eletrônicos'
      },
      {
        english: "Can you show me how it works?",
        portuguese: "Pode me mostrar como funciona?",
        level: 'médio',
        context: 'Demonstração'
      },
      {
        english: "What's the battery life?",
        portuguese: "Qual é a duração da bateria?",
        level: 'médio',
        context: 'Eletrônicos'
      },
      {
        english: "Is this model newer?",
        portuguese: "Este modelo é mais novo?",
        level: 'médio',
        context: 'Comparação'
      },
      {
        english: "Do you offer tech support?",
        portuguese: "Vocês oferecem suporte técnico?",
        level: 'avançado',
        context: 'Eletrônicos'
      },
      {
        english: "Can I trade in my old device?",
        portuguese: "Posso dar meu aparelho antigo como parte do pagamento?",
        level: 'avançado',
        context: 'Eletrônicos'
      },
      {
        english: "What's the return window?",
        portuguese: "Qual é o prazo para devolução?",
        level: 'avançado',
        context: 'Política'
      },
      
      // COMPRAS GERAIS - BÁSICO/MÉDIO
      {
        english: "Excuse me, where can I find...?",
        portuguese: "Com licença, onde posso encontrar...?",
        level: 'básico',
        context: 'Orientação'
      },
      {
        english: "Is there an elevator?",
        portuguese: "Há elevador?",
        level: 'básico',
        context: 'Orientação'
      },
      {
        english: "Where's the restroom?",
        portuguese: "Onde fica o banheiro?",
        level: 'básico',
        context: 'Orientação'
      },
      {
        english: "What floor is electronics on?",
        portuguese: "Em que andar fica eletrônicos?",
        level: 'básico',
        context: 'Orientação'
      },
      {
        english: "Do you have a store map?",
        portuguese: "Vocês têm um mapa da loja?",
        level: 'básico',
        context: 'Orientação'
      },
      {
        english: "I'm looking for customer service.",
        portuguese: "Estou procurando atendimento ao cliente.",
        level: 'médio',
        context: 'Serviços'
      },
      {
        english: "Can I speak to a manager?",
        portuguese: "Posso falar com um gerente?",
        level: 'médio',
        context: 'Reclamação'
      },
      {
        english: "I have a complaint.",
        portuguese: "Tenho uma reclamação.",
        level: 'médio',
        context: 'Reclamação'
      },
      
      // PREÇOS E OFERTAS - BÁSICO/MÉDIO
      {
        english: "Is there a student discount?",
        portuguese: "Há desconto para estudante?",
        level: 'médio',
        context: 'Desconto'
      },
      {
        english: "Do you price match?",
        portuguese: "Vocês igualam preços?",
        level: 'avançado',
        context: 'Preços'
      },
      {
        english: "When does the sale end?",
        portuguese: "Quando acaba a promoção?",
        level: 'básico',
        context: 'Promoção'
      },
      {
        english: "Can I get a rain check?",
        portuguese: "Posso pegar um vale para quando houver estoque?",
        level: 'avançado',
        context: 'Estoque'
      },
      {
        english: "Is this the final price?",
        portuguese: "Este é o preço final?",
        level: 'básico',
        context: 'Preços'
      },
      {
        english: "Are there any hidden fees?",
        portuguese: "Há taxas escondidas?",
        level: 'avançado',
        context: 'Preços'
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
        context: 'Ingressos'
      },
      {
        english: "Where can I buy tickets?",
        portuguese: "Onde posso comprar ingressos?",
        level: 'básico',
        context: 'Ingressos'
      },
      {
        english: "What time does it close?",
        portuguese: "Que horas fecha?",
        level: 'básico',
        context: 'Horários'
      },
      {
        english: "How do I get there?",
        portuguese: "Como chego lá?",
        level: 'básico',
        context: 'Direções'
      },
      {
        english: "Is there a guided tour?",
        portuguese: "Há tour guiado?",
        level: 'básico',
        context: 'Tours'
      },
      {
        english: "Can I take pictures here?",
        portuguese: "Posso tirar fotos aqui?",
        level: 'básico',
        context: 'Fotografia'
      },
      {
        english: "What time do you open?",
        portuguese: "Que horas vocês abrem?",
        level: 'básico',
        context: 'Horários'
      },
      {
        english: "Is there a student discount?",
        portuguese: "Há desconto para estudante?",
        level: 'básico',
        context: 'Desconto'
      },
      {
        english: "How long does the tour last?",
        portuguese: "Quanto tempo dura o tour?",
        level: 'médio',
        context: 'Tours'
      },
      {
        english: "Can I book tickets online?",
        portuguese: "Posso comprar ingressos online?",
        level: 'médio',
        context: 'Reserva'
      },

      // ========== FRASES PREMIUM ==========
      {
        english: "Where can I buy souvenirs?",
        portuguese: "Onde posso comprar lembrancinhas?",
        level: 'básico',
        context: 'Compras'
      },
      {
        english: "Is there an audio guide?",
        portuguese: "Há um guia de áudio?",
        level: 'médio',
        context: 'Guia'
      },
      {
        english: "What's the history of this place?",
        portuguese: "Qual é a história deste lugar?",
        level: 'médio',
        context: 'História'
      },
      {
        english: "Are there any festivals this week?",
        portuguese: "Há algum festival esta semana?",
        level: 'médio',
        context: 'Eventos'
      },
      {
        english: "Can you recommend a local restaurant?",
        portuguese: "Você pode recomendar um restaurante local?",
        level: 'básico',
        context: 'Recomendação'
      },
      {
        english: "Where is the best viewpoint?",
        portuguese: "Onde fica o melhor mirante?",
        level: 'básico',
        context: 'Vista'
      },
      {
        english: "Is it safe to walk here at night?",
        portuguese: "É seguro caminhar aqui à noite?",
        level: 'médio',
        context: 'Segurança'
      },
      {
        english: "Can I get a map of the area?",
        portuguese: "Posso pegar um mapa da área?",
        level: 'básico',
        context: 'Orientação'
      },
      {
        english: "What's the local specialty?",
        portuguese: "Qual é a especialidade local?",
        level: 'básico',
        context: 'Cultura'
      },
      {
        english: "Are there any free activities?",
        portuguese: "Há alguma atividade gratuita?",
        level: 'básico',
        context: 'Atividades'
      },
      {
        english: "How do I get to the old town?",
        portuguese: "Como chego à cidade velha?",
        level: 'básico',
        context: 'Direções'
      },
      {
        english: "Is this area wheelchair accessible?",
        portuguese: "Esta área é acessível para cadeira de rodas?",
        level: 'avançado',
        context: 'Acessibilidade'
      },
      {
        english: "What are the must-see attractions?",
        portuguese: "Quais são as atrações imperdíveis?",
        level: 'médio',
        context: 'Turismo'
      },
      {
        english: "Are there guided tours available?",
        portuguese: "Há tours guiados disponíveis?",
        level: 'médio',
        context: 'Tours'
      },
      {
        english: "Can I bring my camera inside?",
        portuguese: "Posso levar minha câmera para dentro?",
        level: 'médio',
        context: 'Fotografia'
      },
      {
        english: "What's the best time to visit?",
        portuguese: "Qual é a melhor hora para visitar?",
        level: 'médio',
        context: 'Planejamento'
      },
      {
        english: "Do you offer group discounts?",
        portuguese: "Vocês oferecem desconto para grupo?",
        level: 'avançado',
        context: 'Desconto'
      },
      {
        english: "Is there a dress code here?",
        portuguese: "Há código de vestimenta aqui?",
        level: 'avançado',
        context: 'Etiqueta'
      },
      {
        english: "Can I get a refund if it rains?",
        portuguese: "Posso ter reembolso se chover?",
        level: 'avançado',
        context: 'Política'
      },
      {
        english: "Where can I store my luggage?",
        portuguese: "Onde posso guardar minha bagagem?",
        level: 'médio',
        context: 'Bagagem'
      }
    ],
    exercises: [
      {
        id: 'passeios-ex-1',
        correctSentence: 'How much is the ticket?',
        words: ['How', 'much', 'is', 'the', 'ticket?'],
        translation: 'Quanto custa o ingresso?'
      },
      {
        id: 'passeios-ex-2',
        correctSentence: 'What time does it open?',
        words: ['What', 'time', 'does', 'it', 'open?'],
        translation: 'Que horas abre?'
      },
      {
        id: 'passeios-ex-3',
        correctSentence: 'Where is the entrance?',
        words: ['Where', 'is', 'the', 'entrance?'],
        translation: 'Onde fica a entrada?'
      },
      {
        id: 'passeios-ex-4',
        correctSentence: 'Can I take photos here?',
        words: ['Can', 'I', 'take', 'photos', 'here?'],
        translation: 'Posso tirar fotos aqui?'
      },
      {
        id: 'passeios-ex-5',
        correctSentence: 'Is there a guided tour?',
        words: ['Is', 'there', 'a', 'guided', 'tour?'],
        translation: 'Há tour guiado?'
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
        context: 'Recomendação'
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
        context: 'Follow-up'
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
        context: 'Apresentação'
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
        context: 'Negócios'
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
        context: 'Parceria'
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
        context: 'Negócios'
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
        context: 'Despedida'
      },
      {
        english: "I hope our paths cross again soon.",
        portuguese: "Espero que nossos caminhos se cruzem novamente em breve.",
        level: 'avançado',
        context: 'Despedida'
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
        context: 'Trabalho'
      },
      {
        english: "You should meet my colleague, Sarah.",
        portuguese: "Você deveria conhecer minha colega, Sarah.",
        level: 'básico',
        context: 'Apresentação'
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
        context: 'Negócios'
      },
      {
        english: "I see a lot of potential for synergy.",
        portuguese: "Vejo muito potencial para sinergia.",
        level: 'avançado',
        context: 'Parceria'
      },
      {
        english: "Our values seem very aligned.",
        portuguese: "Nossos valores parecem muito alinhados.",
        level: 'avançado',
        context: 'Negócios'
      },
      {
        english: "I'd love to explore partnership opportunities.",
        portuguese: "Adoraria explorar oportunidades de parceria.",
        level: 'avançado',
        context: 'Parceria'
      },
      {
        english: "What's your market strategy?",
        portuguese: "Qual é sua estratégia de mercado?",
        level: 'avançado',
        context: 'Negócios'
      },
      {
        english: "We're looking for strategic partners.",
        portuguese: "Estamos procurando parceiros estratégicos.",
        level: 'avançado',
        context: 'Parceria'
      },
      {
        english: "Your solution addresses a real pain point.",
        portuguese: "Sua solução aborda um ponto problemático real.",
        level: 'avançado',
        context: 'Negócios'
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
        context: 'Colaboração'
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
        context: 'Recursos'
      },

      // ========== FOLLOW-UP & CLOSING PHRASES ==========
      {
        english: "Let's grab coffee sometime.",
        portuguese: "Vamos tomar um café em algum momento.",
        level: 'básico',
        context: 'Follow-up'
      },
      {
        english: "I'll send you that article I mentioned.",
        portuguese: "Vou te enviar aquele artigo que mencionei.",
        level: 'médio',
        context: 'Follow-up'
      },
      {
        english: "Feel free to reach out anytime.",
        portuguese: "Sinta-se à vontade para entrar em contato a qualquer momento.",
        level: 'médio',
        context: 'Contato'
      },
      {
        english: "I look forward to hearing from you.",
        portuguese: "Aguardo ansiosamente seu contato.",
        level: 'médio',
        context: 'Follow-up'
      },
      {
        english: "It was a pleasure meeting you.",
        portuguese: "Foi um prazer conhecê-lo.",
        level: 'básico',
        context: 'Despedida'
      },
      {
        english: "I'll be in touch soon.",
        portuguese: "Entrarei em contato em breve.",
        level: 'médio',
        context: 'Follow-up'
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
        context: 'Recomendação'
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
          <p className="text-gray-400 mb-6">Esta trilha não existe ou ainda não foi criada.</p>
          <Link 
            href="/dashboard"
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
          >
            ← Voltar ao Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <SimpleTrailContent 
        trail={trailData}
        userPlan="free" // Fallback - será substituído pelo plano real do usuário
        slug={slug}
      />
    </div>
  )
}