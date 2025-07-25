'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import { useAuth } from '@/contexts/AuthContext'
import { useGlobalLimits } from '@/hooks/useGlobalLimits'
import PageTransition from '@/components/PageTransition'
import AnimatedContainer from '@/components/AnimatedContainer'
import DragDropExercise from '@/components/DragDropExercise'
import GlobalLimitMessage from '@/components/GlobalLimitMessage'

interface Exercise {
  id: string
  correctSentence: string
  words: string[]
  translation: string
}

interface Phrase {
  english: string
  portuguese: string
  level: 'básico' | 'médio' | 'avançado'
  context: string
}

interface Trail {
  title: string
  icon: string
  description: string
  exercises?: Exercise[]
  phrases?: Phrase[]
}

interface ExercisePageProps {
  params: Promise<{ slug: string }>
}

const trailsData: { [key: string]: Trail } = {
  eventos: {
    title: 'Inglês para Eventos',
    icon: '🎉',
    description: 'Domine frases essenciais para networking, palestras e eventos profissionais',
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
        correctSentence: 'Could I have your business card?',
        words: ['Could', 'I', 'have', 'your', 'business', 'card?'],
        translation: 'Posso pegar seu cartão de visita?'
      },
      {
        id: 'eventos-ex-4',
        correctSentence: 'Thank you for the presentation.',
        words: ['Thank', 'you', 'for', 'the', 'presentation.'],
        translation: 'Obrigado pela apresentação.'
      },
      {
        id: 'eventos-ex-5',
        correctSentence: 'I look forward to hearing from you.',
        words: ['I', 'look', 'forward', 'to', 'hearing', 'from', 'you.'],
        translation: 'Espero ter notícias suas.'
      }
    ]
  },
  trabalho: {
    title: 'Inglês para Trabalho',
    icon: '💼',
    description: 'Frases profissionais para reuniões, e-mails e conversas corporativas',
    exercises: [
      {
        id: 'trabalho-ex-1',
        correctSentence: 'I need to schedule a meeting.',
        words: ['I', 'need', 'to', 'schedule', 'a', 'meeting.'],
        translation: 'Preciso agendar uma reunião.'
      },
      {
        id: 'trabalho-ex-2',
        correctSentence: 'Could you send me the report?',
        words: ['Could', 'you', 'send', 'me', 'the', 'report?'],
        translation: 'Você poderia me enviar o relatório?'
      },
      {
        id: 'trabalho-ex-3',
        correctSentence: 'Let me get back to you on that.',
        words: ['Let', 'me', 'get', 'back', 'to', 'you', 'on', 'that.'],
        translation: 'Deixe-me retornar sobre isso.'
      },
      {
        id: 'trabalho-ex-4',
        correctSentence: 'The deadline is next Friday.',
        words: ['The', 'deadline', 'is', 'next', 'Friday.'],
        translation: 'O prazo é na próxima sexta-feira.'
      }
    ],
    phrases: [
      // FREE phrases (first 10)
      { english: "Could you please send me the report by Friday?", portuguese: "Você poderia me enviar o relatório até sexta-feira?", level: 'básico', context: 'Solicitação de entrega' },
      { english: "I'd like to schedule a meeting for next week.", portuguese: "Gostaria de agendar uma reunião para a próxima semana.", level: 'básico', context: 'Agendamento' },
      { english: "The deadline has been moved to next month.", portuguese: "O prazo foi movido para o próximo mês.", level: 'médio', context: 'Alteração de prazo' },
      { english: "I appreciate your feedback on this proposal.", portuguese: "Agradeço seu feedback sobre esta proposta.", level: 'básico', context: 'Agradecimento' },
      { english: "Let's circle back on this issue tomorrow.", portuguese: "Vamos retomar esta questão amanhã.", level: 'médio', context: 'Adiamento' },
      { english: "Can we touch base about the project status?", portuguese: "Podemos conversar sobre o status do projeto?", level: 'médio', context: 'Check-in' },
      { english: "I'll keep you in the loop on any updates.", portuguese: "Vou te manter informado sobre qualquer atualização.", level: 'médio', context: 'Comunicação' },
      { english: "We need to think outside the box for this solution.", portuguese: "Precisamos pensar fora da caixa para esta solução.", level: 'avançado', context: 'Criatividade' },
      { english: "Let's table this discussion for now.", portuguese: "Vamos deixar esta discussão para depois.", level: 'avançado', context: 'Pausa na discussão' },
      { english: "Can you walk me through the process?", portuguese: "Você pode me explicar o processo passo a passo?", level: 'básico', context: 'Explicação' },
      
      // PREMIUM phrases (remaining ones)
      { english: "Let's kick off this meeting.", portuguese: "Vamos começar esta reunião.", level: 'básico', context: 'Reuniões' },
      { english: "Can everyone see my screen?", portuguese: "Todos conseguem ver minha tela?", level: 'básico', context: 'Reuniões' },
      { english: "You're on mute.", portuguese: "Você está no mudo.", level: 'básico', context: 'Reuniões' },
      { english: "Can you speak up? You're breaking up.", portuguese: "Você pode falar mais alto? Está cortando.", level: 'básico', context: 'Reuniões' },
      { english: "Let's go around the room for introductions.", portuguese: "Vamos fazer uma rodada de apresentações.", level: 'médio', context: 'Reuniões' },
      { english: "I'd like to add something to the agenda.", portuguese: "Gostaria de acrescentar algo à agenda.", level: 'médio', context: 'Reuniões' },
      { english: "Can we park that discussion for later?", portuguese: "Podemos deixar essa discussão para depois?", level: 'avançado', context: 'Reuniões' },
      { english: "Let's dive deeper into this topic.", portuguese: "Vamos nos aprofundar neste tópico.", level: 'médio', context: 'Reuniões' },
      { english: "I have a hard stop at 3 PM.", portuguese: "Tenho que sair às 15h em ponto.", level: 'avançado', context: 'Reuniões' },
      { english: "Can we take this offline?", portuguese: "Podemos discutir isso separadamente?", level: 'avançado', context: 'Reuniões' },
      { english: "Let's circle back to this next week.", portuguese: "Vamos retomar isso na próxima semana.", level: 'médio', context: 'Reuniões' },
      { english: "I'd like to piggyback on what Sarah said.", portuguese: "Gostaria de complementar o que a Sarah disse.", level: 'avançado', context: 'Reuniões' },
      { english: "Can we get a consensus on this?", portuguese: "Podemos chegar a um consenso sobre isso?", level: 'médio', context: 'Reuniões' },
      { english: "Let's put this to a vote.", portuguese: "Vamos votar sobre isso.", level: 'básico', context: 'Reuniões' },
      { english: "I need to step out for a moment.", portuguese: "Preciso me ausentar por um momento.", level: 'básico', context: 'Reuniões' },
      { english: "Can we stick to the agenda?", portuguese: "Podemos seguir a agenda?", level: 'médio', context: 'Reuniões' },
      { english: "Let's recap the action items.", portuguese: "Vamos recapitular os itens de ação.", level: 'médio', context: 'Reuniões' },
      { english: "Who's taking the minutes?", portuguese: "Quem está fazendo a ata?", level: 'médio', context: 'Reuniões' },
      { english: "Can we schedule a follow-up?", portuguese: "Podemos agendar um acompanhamento?", level: 'básico', context: 'Reuniões' },
      { english: "I'm going to play devil's advocate here.", portuguese: "Vou fazer o papel do advogado do diabo aqui.", level: 'avançado', context: 'Reuniões' },
      { english: "Let's move on to the next item.", portuguese: "Vamos para o próximo item.", level: 'básico', context: 'Reuniões' },
      { english: "Can we get some buy-in from the team?", portuguese: "Podemos conseguir o apoio da equipe?", level: 'avançado', context: 'Reuniões' },
      { english: "I'd like to push back on that idea.", portuguese: "Gostaria de questionar essa ideia.", level: 'avançado', context: 'Reuniões' },
      { english: "Let's table this for now.", portuguese: "Vamos deixar isso de lado por enquanto.", level: 'médio', context: 'Reuniões' },
      { english: "Can we get alignment on the timeline?", portuguese: "Podemos nos alinhar sobre o cronograma?", level: 'avançado', context: 'Reuniões' },
      { english: "I want to level-set expectations.", portuguese: "Quero alinhar as expectativas.", level: 'avançado', context: 'Reuniões' },
      { english: "Let's brainstorm some solutions.", portuguese: "Vamos fazer um brainstorm de soluções.", level: 'médio', context: 'Reuniões' },
      { english: "Can we do a quick temperature check?", portuguese: "Podemos fazer uma verificação rápida?", level: 'avançado', context: 'Reuniões' },
      { english: "I need to jump on another call.", portuguese: "Preciso entrar em outra chamada.", level: 'médio', context: 'Reuniões' },
      { english: "Let's wrap this up.", portuguese: "Vamos finalizar isso.", level: 'básico', context: 'Reuniões' },
      { english: "Can we get some concrete next steps?", portuguese: "Podemos definir próximos passos concretos?", level: 'médio', context: 'Reuniões' },
      { english: "I'd like to challenge that assumption.", portuguese: "Gostaria de questionar essa suposição.", level: 'avançado', context: 'Reuniões' },
      { english: "Let's sync up offline about this.", portuguese: "Vamos nos alinhar sobre isso separadamente.", level: 'avançado', context: 'Reuniões' },
      { english: "Can we establish some ground rules?", portuguese: "Podemos estabelecer algumas regras básicas?", level: 'médio', context: 'Reuniões' },
      { english: "I want to bring everyone up to speed.", portuguese: "Quero colocar todos a par da situação.", level: 'médio', context: 'Reuniões' },
      { english: "Let's do a post-mortem on this project.", portuguese: "Vamos fazer uma análise pós-projeto.", level: 'avançado', context: 'Reuniões' },
      { english: "Can we get some visibility into the process?", portuguese: "Podemos ter mais visibilidade do processo?", level: 'avançado', context: 'Reuniões' },
      { english: "I'd like to propose an alternative approach.", portuguese: "Gostaria de propor uma abordagem alternativa.", level: 'médio', context: 'Reuniões' },
      { english: "Let's put a pin in this and come back to it.", portuguese: "Vamos marcar isso e voltar depois.", level: 'avançado', context: 'Reuniões' },
      { english: "Can we get ownership assigned for each task?", portuguese: "Podemos definir responsáveis para cada tarefa?", level: 'avançado', context: 'Reuniões' },
      
      // E-mails
      { english: "I hope this email finds you well.", portuguese: "Espero que este email o encontre bem.", level: 'básico', context: 'E-mails' },
      { english: "I'm writing to follow up on our conversation.", portuguese: "Estou escrevendo para dar seguimento à nossa conversa.", level: 'médio', context: 'E-mails' },
      { english: "Please find the attached document.", portuguese: "Segue em anexo o documento.", level: 'básico', context: 'E-mails' },
      { english: "I'm cc'ing John on this email.", portuguese: "Estou colocando o John em cópia neste email.", level: 'médio', context: 'E-mails' },
      { english: "Thanks for looping me in.", portuguese: "Obrigado por me incluir.", level: 'médio', context: 'E-mails' },
      { english: "I'll circle back with more details.", portuguese: "Retornarei com mais detalhes.", level: 'médio', context: 'E-mails' },
      { english: "Please let me know if you have any questions.", portuguese: "Por favor, me avise se tiver alguma dúvida.", level: 'básico', context: 'E-mails' },
      { english: "I wanted to reach out regarding...", portuguese: "Queria entrar em contato sobre...", level: 'médio', context: 'E-mails' },
      { english: "Moving you to BCC to reduce inbox clutter.", portuguese: "Movendo você para CCO para reduzir spam na caixa.", level: 'avançado', context: 'E-mails' },
      { english: "Per our conversation, here are the next steps.", portuguese: "Conforme nossa conversa, seguem os próximos passos.", level: 'médio', context: 'E-mails' },
      { english: "I'm bumping this to the top of your inbox.", portuguese: "Estou priorizando isso na sua caixa de entrada.", level: 'avançado', context: 'E-mails' },
      { english: "Thanks for your quick turnaround on this.", portuguese: "Obrigado pela resposta rápida sobre isso.", level: 'médio', context: 'E-mails' },
      { english: "I'm following up on the action items from yesterday.", portuguese: "Estou acompanhando os itens de ação de ontem.", level: 'médio', context: 'E-mails' },
      { english: "Could you please confirm receipt?", portuguese: "Você poderia confirmar o recebimento?", level: 'básico', context: 'E-mails' },
      { english: "I'm forwarding this for your awareness.", portuguese: "Estou encaminhando isso para seu conhecimento.", level: 'médio', context: 'E-mails' },
      { english: "Please reply all so everyone stays in the loop.", portuguese: "Por favor, responda a todos para manter todos informados.", level: 'médio', context: 'E-mails' },
      { english: "I'll send a separate email with the details.", portuguese: "Enviarei um email separado com os detalhes.", level: 'básico', context: 'E-mails' },
      { english: "Thanks for bringing this to my attention.", portuguese: "Obrigado por trazer isso à minha atenção.", level: 'médio', context: 'E-mails' },
      { english: "I'm tagging the relevant team members.", portuguese: "Estou marcando os membros relevantes da equipe.", level: 'médio', context: 'E-mails' },
      { english: "This is time-sensitive, so please prioritize.", portuguese: "Isso é urgente, então por favor priorize.", level: 'médio', context: 'E-mails' },
      { english: "I'm setting up a separate thread for this discussion.", portuguese: "Estou criando uma conversa separada para esta discussão.", level: 'avançado', context: 'E-mails' },
      { english: "Could you please provide an ETA?", portuguese: "Você poderia fornecer um prazo estimado?", level: 'médio', context: 'E-mails' },
      { english: "I'm updating the distribution list.", portuguese: "Estou atualizando a lista de distribuição.", level: 'avançado', context: 'E-mails' },
      { english: "Please see my comments inline.", portuguese: "Por favor, veja meus comentários no texto.", level: 'médio', context: 'E-mails' },
      { english: "I'm archiving this thread as it's resolved.", portuguese: "Estou arquivando esta conversa pois foi resolvida.", level: 'avançado', context: 'E-mails' },
      { english: "Thanks for the heads up.", portuguese: "Obrigado pelo aviso.", level: 'médio', context: 'E-mails' },
      { english: "I'll keep you posted on the progress.", portuguese: "Te manterei informado sobre o progresso.", level: 'básico', context: 'E-mails' },
      { english: "Could you please double-check this?", portuguese: "Você poderia verificar isso novamente?", level: 'básico', context: 'E-mails' },
      { english: "I'm escalating this to management.", portuguese: "Estou escalando isso para a gerência.", level: 'avançado', context: 'E-mails' },
      { english: "Please disregard my previous email.", portuguese: "Por favor, desconsidere meu email anterior.", level: 'médio', context: 'E-mails' },
      { english: "I'm scheduling a follow-up meeting.", portuguese: "Estou agendando uma reunião de acompanhamento.", level: 'médio', context: 'E-mails' },
      { english: "Could you please review and approve?", portuguese: "Você poderia revisar e aprovar?", level: 'básico', context: 'E-mails' },
      { english: "I'm flagging this as high priority.", portuguese: "Estou marcando isso como alta prioridade.", level: 'médio', context: 'E-mails' },
      { english: "Thanks for your patience on this matter.", portuguese: "Obrigado pela sua paciência neste assunto.", level: 'médio', context: 'E-mails' },
      { english: "I'll get back to you with a timeline.", portuguese: "Retornarei com um cronograma.", level: 'básico', context: 'E-mails' },
      
      // Apresentações
      { english: "Good morning everyone, thank you for joining us today.", portuguese: "Bom dia pessoal, obrigado por se juntarem a nós hoje.", level: 'básico', context: 'Apresentações' },
      { english: "Let me walk you through the agenda.", portuguese: "Deixem-me apresentar a agenda.", level: 'médio', context: 'Apresentações' },
      { english: "As you can see on this slide...", portuguese: "Como vocês podem ver neste slide...", level: 'básico', context: 'Apresentações' },
      { english: "Let's dive into the key findings.", portuguese: "Vamos nos aprofundar nas principais descobertas.", level: 'médio', context: 'Apresentações' },
      { english: "I'd like to highlight three main points.", portuguese: "Gostaria de destacar três pontos principais.", level: 'médio', context: 'Apresentações' },
      { english: "Moving on to the next section...", portuguese: "Passando para a próxima seção...", level: 'básico', context: 'Apresentações' },
      { english: "This brings us to our recommendation.", portuguese: "Isso nos leva à nossa recomendação.", level: 'médio', context: 'Apresentações' },
      { english: "Let me break this down for you.", portuguese: "Deixem-me detalhar isso para vocês.", level: 'médio', context: 'Apresentações' },
      { english: "The data clearly shows...", portuguese: "Os dados mostram claramente...", level: 'básico', context: 'Apresentações' },
      { english: "I'll pause here for questions.", portuguese: "Vou pausar aqui para perguntas.", level: 'básico', context: 'Apresentações' },
      { english: "Let's take a step back and look at the big picture.", portuguese: "Vamos dar um passo atrás e ver o panorama geral.", level: 'médio', context: 'Apresentações' },
      { english: "This is a game-changer for our industry.", portuguese: "Isso é revolucionário para nossa indústria.", level: 'avançado', context: 'Apresentações' },
      { english: "The ROI speaks for itself.", portuguese: "O ROI fala por si só.", level: 'avançado', context: 'Apresentações' },
      { english: "Let me put this in perspective.", portuguese: "Deixem-me colocar isso em perspectiva.", level: 'médio', context: 'Apresentações' },
      { english: "We're seeing a significant uptick in...", portuguese: "Estamos vendo um aumento significativo em...", level: 'avançado', context: 'Apresentações' },
      { english: "This aligns perfectly with our strategy.", portuguese: "Isso se alinha perfeitamente com nossa estratégia.", level: 'médio', context: 'Apresentações' },
      { english: "Let me drill down into the specifics.", portuguese: "Deixem-me entrar nos detalhes específicos.", level: 'avançado', context: 'Apresentações' },
      { english: "The bottom line is...", portuguese: "A linha de fundo é...", level: 'médio', context: 'Apresentações' },
      { english: "This represents a paradigm shift.", portuguese: "Isso representa uma mudança de paradigma.", level: 'avançado', context: 'Apresentações' },
      { english: "Let's talk about the implementation roadmap.", portuguese: "Vamos falar sobre o roteiro de implementação.", level: 'avançado', context: 'Apresentações' },
      { english: "I want to address the elephant in the room.", portuguese: "Quero abordar o elefante na sala.", level: 'avançado', context: 'Apresentações' },
      { english: "This is low-hanging fruit we can tackle immediately.", portuguese: "Essa é uma oportunidade fácil que podemos abordar imediatamente.", level: 'avançado', context: 'Apresentações' },
      { english: "We need to think outside the box here.", portuguese: "Precisamos pensar fora da caixa aqui.", level: 'médio', context: 'Apresentações' },
      { english: "This is mission-critical for our success.", portuguese: "Isso é fundamental para nosso sucesso.", level: 'avançado', context: 'Apresentações' },
      { english: "Let me give you some context.", portuguese: "Deixem-me dar algum contexto.", level: 'básico', context: 'Apresentações' },
      { english: "We're at an inflection point.", portuguese: "Estamos em um ponto de inflexão.", level: 'avançado', context: 'Apresentações' },
      { english: "This will move the needle significantly.", portuguese: "Isso fará uma diferença significativa.", level: 'avançado', context: 'Apresentações' },
      { english: "Let's recap the key takeaways.", portuguese: "Vamos recapitular os pontos principais.", level: 'médio', context: 'Apresentações' },
      { english: "I'll open the floor for questions now.", portuguese: "Vou abrir para perguntas agora.", level: 'médio', context: 'Apresentações' },
      { english: "Thank you for your time and attention.", portuguese: "Obrigado pelo seu tempo e atenção.", level: 'básico', context: 'Apresentações' },
      
      // Feedback
      { english: "I'd like to give you some constructive feedback.", portuguese: "Gostaria de dar um feedback construtivo.", level: 'médio', context: 'Feedback' },
      { english: "You did an excellent job on this project.", portuguese: "Você fez um excelente trabalho neste projeto.", level: 'básico', context: 'Feedback' },
      { english: "There's room for improvement in this area.", portuguese: "Há espaço for melhoria nesta área.", level: 'médio', context: 'Feedback' },
      { english: "I appreciate your attention to detail.", portuguese: "Agradeço sua atenção aos detalhes.", level: 'médio', context: 'Feedback' },
      { english: "You exceeded expectations on this deliverable.", portuguese: "Você superou as expectativas nesta entrega.", level: 'médio', context: 'Feedback' },
      { english: "I'd like to see more initiative from you.", portuguese: "Gostaria de ver mais iniciativa de você.", level: 'médio', context: 'Feedback' },
      { english: "Your communication skills have really improved.", portuguese: "Suas habilidades de comunicação realmente melhoraram.", level: 'médio', context: 'Feedback' },
      { english: "Let's work on making your presentations more engaging.", portuguese: "Vamos trabalhar para tornar suas apresentações mais envolventes.", level: 'avançado', context: 'Feedback' },
      { english: "You have great potential for leadership.", portuguese: "Você tem grande potencial para liderança.", level: 'médio', context: 'Feedback' },
      { english: "I'd like you to take ownership of this process.", portuguese: "Gostaria que você assumisse a responsabilidade por este processo.", level: 'avançado', context: 'Feedback' },
      { english: "Your proactive approach is commendable.", portuguese: "Sua abordagem proativa é louvável.", level: 'avançado', context: 'Feedback' },
      { english: "Let's discuss areas for professional development.", portuguese: "Vamos discutir áreas para desenvolvimento profissional.", level: 'avançado', context: 'Feedback' },
      { english: "You're really hitting your stride now.", portuguese: "Você está realmente no seu melhor agora.", level: 'avançado', context: 'Feedback' },
      { english: "I'd like to see more collaboration with the team.", portuguese: "Gostaria de ver mais colaboração com a equipe.", level: 'médio', context: 'Feedback' },
      { english: "Your work quality is consistently high.", portuguese: "A qualidade do seu trabalho é consistentemente alta.", level: 'médio', context: 'Feedback' },
      { english: "You need to work on your time management.", portuguese: "Você precisa trabalhar na gestão do seu tempo.", level: 'médio', context: 'Feedback' },
      { english: "I'm impressed with your problem-solving skills.", portuguese: "Estou impressionado com suas habilidades de resolução de problemas.", level: 'médio', context: 'Feedback' },
      { english: "Let's set some SMART goals for next quarter.", portuguese: "Vamos definir algumas metas SMART para o próximo trimestre.", level: 'avançado', context: 'Feedback' },
      { english: "You're a valuable asset to the team.", portuguese: "Você é um recurso valioso para a equipe.", level: 'médio', context: 'Feedback' },
      { english: "I'd like to see you stretch yourself more.", portuguese: "Gostaria de ver você se desafiar mais.", level: 'avançado', context: 'Feedback' },
      { english: "Your growth mindset is really showing.", portuguese: "Sua mentalidade de crescimento está realmente aparecendo.", level: 'avançado', context: 'Feedback' },
      { english: "Let's work on building your confidence.", portuguese: "Vamos trabalhar para construir sua confiança.", level: 'médio', context: 'Feedback' },
      { english: "You're demonstrating real leadership potential.", portuguese: "Você está demonstrando real potencial de liderança.", level: 'avançado', context: 'Feedback' }
    ]
  },
  viagens: {
    title: 'Inglês para Viagens',
    icon: '✈️',
    description: 'Frases essenciais para aeroporto, hotel e situações de viagem',
    exercises: [
      {
        id: 'viagens-ex-1',
        correctSentence: 'Where is the boarding gate?',
        words: ['Where', 'is', 'the', 'boarding', 'gate?'],
        translation: 'Onde fica o portão de embarque?'
      },
      {
        id: 'viagens-ex-2',
        correctSentence: 'I have a reservation.',
        words: ['I', 'have', 'a', 'reservation.'],
        translation: 'Eu tenho uma reserva.'
      },
      {
        id: 'viagens-ex-3',
        correctSentence: 'How much is a taxi to downtown?',
        words: ['How', 'much', 'is', 'a', 'taxi', 'to', 'downtown?'],
        translation: 'Quanto custa um táxi para o centro?'
      },
      {
        id: 'viagens-ex-4',
        correctSentence: 'Can I have the check please?',
        words: ['Can', 'I', 'have', 'the', 'check', 'please?'],
        translation: 'Posso pegar a conta, por favor?'
      }
    ]
  },
  mercado: {
    title: 'Inglês para Mercado',
    icon: '🛒',
    description: 'Frases para compras, preços e situações de mercado',
    exercises: [
      {
        id: 'mercado-ex-1',
        correctSentence: 'How much does this cost?',
        words: ['How', 'much', 'does', 'this', 'cost?'],
        translation: 'Quanto custa isso?'
      },
      {
        id: 'mercado-ex-2',
        correctSentence: 'I would like to pay by card.',
        words: ['I', 'would', 'like', 'to', 'pay', 'by', 'card.'],
        translation: 'Gostaria de pagar no cartão.'
      },
      {
        id: 'mercado-ex-3',
        correctSentence: 'Where can I find the milk?',
        words: ['Where', 'can', 'I', 'find', 'the', 'milk?'],
        translation: 'Onde posso encontrar o leite?'
      },
      {
        id: 'mercado-ex-4',
        correctSentence: 'Do you have this in a different size?',
        words: ['Do', 'you', 'have', 'this', 'in', 'a', 'different', 'size?'],
        translation: 'Você tem isso em um tamanho diferente?'
      }
    ]
  },
  passeios: {
    title: 'Inglês para Passeios',
    icon: '🚶‍♂️',
    description: 'Frases para tickets, atrações e direções',
    exercises: [
      {
        id: 'passeios-ex-1',
        correctSentence: 'Two tickets for adults please.',
        words: ['Two', 'tickets', 'for', 'adults', 'please.'],
        translation: 'Dois ingressos para adultos, por favor.'
      },
      {
        id: 'passeios-ex-2',
        correctSentence: 'How do I get to the museum?',
        words: ['How', 'do', 'I', 'get', 'to', 'the', 'museum?'],
        translation: 'Como chego ao museu?'
      },
      {
        id: 'passeios-ex-3',
        correctSentence: 'What time does it close?',
        words: ['What', 'time', 'does', 'it', 'close?'],
        translation: 'Que horas fecha?'
      },
      {
        id: 'passeios-ex-4',
        correctSentence: 'Is there a discount for students?',
        words: ['Is', 'there', 'a', 'discount', 'for', 'students?'],
        translation: 'Há desconto para estudantes?'
      }
    ]
  },
  amigos: {
    title: 'Inglês para Amigos',
    icon: '👥',
    description: 'Frases para convites e conversas casuais',
    exercises: [
      {
        id: 'amigos-ex-1',
        correctSentence: 'Do you want to hang out?',
        words: ['Do', 'you', 'want', 'to', 'hang', 'out?'],
        translation: 'Você quer sair?'
      },
      {
        id: 'amigos-ex-2',
        correctSentence: 'What are you up to today?',
        words: ['What', 'are', 'you', 'up', 'to', 'today?'],
        translation: 'O que você vai fazer hoje?'
      },
      {
        id: 'amigos-ex-3',
        correctSentence: 'Let me know when you are free.',
        words: ['Let', 'me', 'know', 'when', 'you', 'are', 'free.'],
        translation: 'Me avise quando estiver livre.'
      },
      {
        id: 'amigos-ex-4',
        correctSentence: 'That sounds like fun!',
        words: ['That', 'sounds', 'like', 'fun!'],
        translation: 'Isso parece divertido!'
      }
    ]
  }
}

export default async function ExercisePage({ params }: ExercisePageProps) {
  const { slug } = await params
  const trailData = trailsData[slug as keyof typeof trailsData]

  if (!trailData || !trailData.exercises || trailData.exercises.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Exercícios não encontrados</h1>
          <p className="text-gray-400 mb-6">Esta trilha não possui exercícios disponíveis ainda.</p>
          <Link 
            href={`/trilha/${slug}`}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
          >
            ← Voltar para Trilha
          </Link>
        </div>
      </div>
    )
  }

  return <ExercisePageClient trailData={trailData} slug={slug} />
}

// Translation Exercise Component
function TranslationExercise({ phrase, onComplete }: { phrase: Phrase, onComplete: (isCorrect: boolean) => void }) {
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)

  const checkAnswer = () => {
    const normalizedUser = userAnswer.toLowerCase().trim()
    const normalizedCorrect = phrase.english.toLowerCase().trim()
    const isCorrect = normalizedUser === normalizedCorrect
    
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    setShowCorrectAnswer(!isCorrect)
    onComplete(isCorrect)
  }

  const reset = () => {
    setUserAnswer('')
    setFeedback(null)
    setShowCorrectAnswer(false)
  }

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
          phrase.level === 'básico' ? 'bg-green-500/20 text-green-400' :
          phrase.level === 'médio' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          {phrase.level.charAt(0).toUpperCase() + phrase.level.slice(1)} • {phrase.context}
        </span>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-300 text-lg mb-2">Traduza para o inglês:</p>
        <p className="text-white text-xl font-medium">{phrase.portuguese}</p>
      </div>

      <div className="mb-6">
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Digite sua tradução em inglês..."
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
          rows={3}
          disabled={feedback === 'correct'}
        />
      </div>

      <div className="flex gap-3 mb-4">
        <button
          onClick={checkAnswer}
          disabled={!userAnswer.trim() || feedback !== null}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-full text-white font-semibold transition-all duration-300"
        >
          Corrigir
        </button>
        
        {feedback && (
          <button
            onClick={reset}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-full text-white font-semibold transition-colors"
          >
            Tentar Novamente
          </button>
        )}
      </div>

      {feedback && (
        <div className={`p-4 rounded-lg ${
          feedback === 'correct' 
            ? 'bg-green-500/20 border border-green-500/30' 
            : 'bg-red-500/20 border border-red-500/30'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-lg ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
              {feedback === 'correct' ? '✅' : '❌'}
            </span>
            <span className={`font-semibold ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
              {feedback === 'correct' ? 'Correto!' : 'Incorreto'}
            </span>
          </div>
          
          {showCorrectAnswer && (
            <div>
              <p className="text-gray-300 text-sm mb-1">Resposta correta:</p>
              <p className="text-white font-medium">{phrase.english}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ExercisePageClient({ trailData, slug }: { trailData: Trail, slug: string }) {
  const { user, userProfile } = useAuth()
  const { 
    isExercisesBlocked, 
    incrementExercises, 
    getRemainingExercises, 
    getRealTimeCountdown,
    isPremium 
  } = useGlobalLimits()
  const router = useRouter()
  
  // Tab system state
  const [activeTab, setActiveTab] = useState<'construcao' | 'traducao'>('construcao')
  
  // Construction exercises state
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<string[]>([])
  
  // Translation exercises state
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [completedPhrases, setCompletedPhrases] = useState<string[]>([])

  const exercises = trailData.exercises || []
  const phrases = trailData.phrases || []
  
  // Get available phrases based on user type
  const availablePhrases = isPremium ? phrases : phrases.slice(0, 10)
  
  const currentExercise = exercises[currentExerciseIndex]
  const currentPhrase = availablePhrases[currentPhraseIndex]
  
  const exerciseProgress = exercises.length > 0 ? (completedExercises.length / exercises.length) * 100 : 0
  const translationProgress = availablePhrases.length > 0 ? (completedPhrases.length / availablePhrases.length) * 100 : 0

  const handleExerciseComplete = (isCorrect: boolean) => {
    if (isCorrect && !completedExercises.includes(currentExercise.id)) {
      // Verificar limite global antes de permitir completar exercício
      if (!isPremium) {
        const canComplete = incrementExercises()
        if (!canComplete) {
          // Limite atingido, não permitir completar mais exercícios
          return
        }
      }
      
      setCompletedExercises([...completedExercises, currentExercise.id])
    }
  }

  const handleTranslationComplete = (isCorrect: boolean) => {
    if (isCorrect && !completedPhrases.includes(currentPhrase.english)) {
      // Verificar limite global antes de permitir completar exercício
      if (!isPremium) {
        const canComplete = incrementExercises()
        if (!canComplete) {
          // Limite atingido, não permitir completar mais exercícios
          return
        }
      }
      
      setCompletedPhrases([...completedPhrases, currentPhrase.english])
    }
  }

  const handleNext = () => {
    if (activeTab === 'construcao') {
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1)
      }
    } else {
      if (currentPhraseIndex < availablePhrases.length - 1) {
        setCurrentPhraseIndex(currentPhraseIndex + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (activeTab === 'construcao') {
      if (currentExerciseIndex > 0) {
        setCurrentExerciseIndex(currentExerciseIndex - 1)
      }
    } else {
      if (currentPhraseIndex > 0) {
        setCurrentPhraseIndex(currentPhraseIndex - 1)
      }
    }
  }

  const getCurrentProgress = () => {
    return activeTab === 'construcao' ? exerciseProgress : translationProgress
  }

  const getCurrentIndex = () => {
    return activeTab === 'construcao' ? currentExerciseIndex : currentPhraseIndex
  }

  const getTotalCount = () => {
    return activeTab === 'construcao' ? exercises.length : availablePhrases.length
  }

  const getCompletedCount = () => {
    return activeTab === 'construcao' ? completedExercises.length : completedPhrases.length
  }

  const isCurrentCompleted = () => {
    if (activeTab === 'construcao') {
      return currentExercise && completedExercises.includes(currentExercise.id)
    } else {
      return currentPhrase && completedPhrases.includes(currentPhrase.english)
    }
  }

  const canGoNext = () => {
    return getCurrentIndex() < getTotalCount() - 1
  }

  const canGoPrevious = () => {
    return getCurrentIndex() > 0
  }

  const handleLogoClick = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  const handleUpgrade = () => {
    alert('Funcionalidade de upgrade será implementada em breve! 🚀')
  }

  return (
    <AnimatedContainer className="min-h-screen">
      {/* Header */}
      <PageTransition delay={0}>
        <header className="bg-gray-900/50 border-b border-gray-700 p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Logo size="sm" />
              <span className="text-white font-bold">Inglês pra Já</span>
            </button>
          
            <div className="flex items-center gap-4">
              <Link 
                href={`/trilha/${slug}`}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full text-white font-semibold transition-colors text-sm"
              >
                ← Voltar para Trilha
              </Link>
              
              <div className="text-sm text-gray-400">
                {getCompletedCount()}/{getTotalCount()} {activeTab === 'construcao' ? 'exercícios' : 'traduções'}
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </header>
      </PageTransition>

      <div className="max-w-4xl mx-auto p-6">
        {/* Mensagem de limite global para usuários free */}
        {isExercisesBlocked && !isPremium && (
          <GlobalLimitMessage 
            type="exercises"
            timeUntilReset={getRealTimeCountdown()}
            onUpgradeClick={handleUpgrade}
          />
        )}

        {/* Conteúdo principal só aparece se não estiver bloqueado */}
        {!isExercisesBlocked && (
        <>
        {/* Trail Header */}
        <PageTransition delay={200}>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{trailData.icon}</div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Exercícios - {trailData.title}
            </h1>
            <p className="text-gray-400 mb-6">
              {activeTab === 'construcao' 
                ? 'Pratique montando frases com arrastar e soltar' 
                : 'Pratique traduzindo frases do português para o inglês'}
            </p>
            
            {/* Tab System */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-800 rounded-lg p-1 flex">
                <button
                  onClick={() => setActiveTab('construcao')}
                  className={`px-6 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'construcao'
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🔧 Construção
                </button>
                <button
                  onClick={() => setActiveTab('traducao')}
                  className={`px-6 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'traducao'
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  disabled={slug !== 'trabalho' || availablePhrases.length === 0}
                >
                  📝 Tradução
                  {!isPremium && slug === 'trabalho' && (
                    <span className="ml-1 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
                      10 FREE
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getCurrentProgress()}%` }}
              />
            </div>
            <div className="text-sm text-gray-400">
              Progresso: {Math.round(getCurrentProgress())}%
            </div>
          </div>
        </PageTransition>

        {/* Content based on active tab */}
        {activeTab === 'construcao' ? (
          <>
            {/* Construction Exercise */}
            <PageTransition delay={400}>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">
                    Exercício {currentExerciseIndex + 1} de {exercises.length}
                  </h2>
                  {isCurrentCompleted() && (
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Concluído
                    </span>
                  )}
                </div>
                
                {currentExercise && (
                  <DragDropExercise
                    exercise={currentExercise}
                    onComplete={handleExerciseComplete}
                  />
                )}
              </div>
            </PageTransition>
          </>
        ) : (
          <>
            {/* Translation Exercise */}
            <PageTransition delay={400}>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">
                    Tradução {currentPhraseIndex + 1} de {availablePhrases.length}
                    {!isPremium && (
                      <span className="ml-2 text-sm text-yellow-400">
                        (Versão FREE: primeiras 10 frases)
                      </span>
                    )}
                  </h2>
                  {isCurrentCompleted() && (
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Concluído
                    </span>
                  )}
                </div>
                
                {currentPhrase && (
                  <TranslationExercise
                    phrase={currentPhrase}
                    onComplete={handleTranslationComplete}
                  />
                )}
              </div>
            </PageTransition>
          </>
        )}

        {/* Navigation */}
        <PageTransition delay={600}>
          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={handlePrevious}
              disabled={!canGoPrevious()}
              className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full text-white font-semibold transition-colors"
            >
              ← Anterior
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
            >
              {!canGoNext() ? 'Finalizado' : 'Próximo →'}
            </button>
          </div>
        </PageTransition>

        {/* Progress Summary */}
        <PageTransition delay={800}>
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              📊 Progresso {activeTab === 'construcao' ? 'dos Exercícios' : 'das Traduções'}
            </h3>
            <div className="flex justify-center items-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {getCompletedCount()}
                </div>
                <div className="text-gray-400 text-sm">Completados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {getTotalCount()}
                </div>
                <div className="text-gray-400 text-sm">Total</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {Math.round(getCurrentProgress())}%
                </div>
                <div className="text-gray-400 text-sm">Progresso</div>
              </div>
            </div>
            
            {/* Barra de progresso visual */}
            <div className="w-full bg-gray-700 rounded-full h-3 mt-6">
              <div 
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-3 rounded-full transition-all duration-300"
                style={{ width: `${getCurrentProgress()}%` }}
              />
            </div>
          </div>
        </PageTransition>

        {/* Completion Messages */}
        {activeTab === 'construcao' && completedExercises.length === exercises.length && exercises.length > 0 && (
          <PageTransition delay={1000}>
            <div className="mt-8 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/30 rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                🎉 Parabéns! Você completou todos os exercícios de construção!
              </h3>
              <p className="text-gray-300 mb-6">
                Excelente trabalho! Que tal agora tentar os exercícios de tradução?
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setActiveTab('traducao')}
                  disabled={slug !== 'trabalho' || availablePhrases.length === 0}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-full text-white font-bold transition-all duration-300"
                >
                  🚀 Tentar Traduções
                </button>
                <Link 
                  href={`/trilha/${slug}`}
                  className="bg-gray-700 hover:bg-gray-600 px-8 py-3 rounded-full text-white font-bold transition-colors"
                >
                  ← Voltar para Trilha
                </Link>
              </div>
            </div>
          </PageTransition>
        )}

        {activeTab === 'traducao' && completedPhrases.length === availablePhrases.length && availablePhrases.length > 0 && (
          <PageTransition delay={1000}>
            <div className="mt-8 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/30 rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                🎉 Parabéns! Você completou todas as traduções{!isPremium ? ' gratuitas' : ''}!
              </h3>
              <p className="text-gray-300 mb-6">
                {!isPremium 
                  ? 'Incrível progresso! Faça upgrade para acessar todas as frases da trilha trabalho.'
                  : 'Excelente trabalho! Você dominou todas as traduções desta trilha.'}
              </p>
              <div className="flex gap-4 justify-center">
                {!isPremium && (
                  <button
                    onClick={handleUpgrade}
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-8 py-3 rounded-full text-white font-bold transition-all duration-300"
                  >
                    ⭐ Fazer Upgrade
                  </button>
                )}
                <Link 
                  href={`/trilha/${slug}`}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-3 rounded-full text-white font-bold transition-all duration-300"
                >
                  ← Voltar para Trilha
                </Link>
              </div>
            </div>
          </PageTransition>
        )}

        {/* Premium upsell for non-trabalho trails */}
        {activeTab === 'traducao' && slug !== 'trabalho' && (
          <PageTransition delay={1000}>
            <div className="mt-8 bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-500/30 rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                🔒 Exercícios de Tradução Disponíveis em Breve
              </h3>
              <p className="text-gray-300 mb-6">
                Os exercícios de tradução estão disponíveis atualmente apenas para a trilha "Trabalho". 
                Mais trilhas em breve!
              </p>
              <Link 
                href="/trilha/trabalho/exercicios"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-3 rounded-full text-white font-bold transition-all duration-300"
              >
                🚀 Experimentar Trilha Trabalho
              </Link>
            </div>
          </PageTransition>
        )}
        </>
        )}
      </div>
    </AnimatedContainer>
  )
}