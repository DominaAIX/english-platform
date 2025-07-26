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
      },
      {
        id: 'trabalho-ex-5',
        correctSentence: 'I appreciate your feedback on this proposal.',
        words: ['I', 'appreciate', 'your', 'feedback', 'on', 'this', 'proposal.'],
        translation: 'Agradeço seu feedback sobre esta proposta.'
      },
      {
        id: 'trabalho-ex-6',
        correctSentence: 'Let\'s circle back on this issue tomorrow.',
        words: ['Let\'s', 'circle', 'back', 'on', 'this', 'issue', 'tomorrow.'],
        translation: 'Vamos retomar esta questão amanhã.'
      },
      {
        id: 'trabalho-ex-7',
        correctSentence: 'Can we touch base about the project status?',
        words: ['Can', 'we', 'touch', 'base', 'about', 'the', 'project', 'status?'],
        translation: 'Podemos conversar sobre o status do projeto?'
      },
      {
        id: 'trabalho-ex-8',
        correctSentence: 'I\'ll keep you in the loop on any updates.',
        words: ['I\'ll', 'keep', 'you', 'in', 'the', 'loop', 'on', 'any', 'updates.'],
        translation: 'Vou te manter informado sobre qualquer atualização.'
      },
      {
        id: 'trabalho-ex-9',
        correctSentence: 'We need to think outside the box.',
        words: ['We', 'need', 'to', 'think', 'outside', 'the', 'box.'],
        translation: 'Precisamos pensar fora da caixa.'
      },
      {
        id: 'trabalho-ex-10',
        correctSentence: 'Can you walk me through the process?',
        words: ['Can', 'you', 'walk', 'me', 'through', 'the', 'process?'],
        translation: 'Você pode me explicar o processo passo a passo?'
      },
      {
        id: 'trabalho-ex-11',
        correctSentence: 'Let\'s kick off this meeting.',
        words: ['Let\'s', 'kick', 'off', 'this', 'meeting.'],
        translation: 'Vamos começar esta reunião.'
      },
      {
        id: 'trabalho-ex-12',
        correctSentence: 'Can everyone see my screen?',
        words: ['Can', 'everyone', 'see', 'my', 'screen?'],
        translation: 'Todos conseguem ver minha tela?'
      },
      {
        id: 'trabalho-ex-13',
        correctSentence: 'You\'re on mute.',
        words: ['You\'re', 'on', 'mute.'],
        translation: 'Você está no mudo.'
      },
      {
        id: 'trabalho-ex-14',
        correctSentence: 'Can you speak up? You\'re breaking up.',
        words: ['Can', 'you', 'speak', 'up?', 'You\'re', 'breaking', 'up.'],
        translation: 'Você pode falar mais alto? Está cortando.'
      },
      {
        id: 'trabalho-ex-15',
        correctSentence: 'Let\'s go around the room for introductions.',
        words: ['Let\'s', 'go', 'around', 'the', 'room', 'for', 'introductions.'],
        translation: 'Vamos fazer uma rodada de apresentações.'
      },
      {
        id: 'trabalho-ex-16',
        correctSentence: 'I\'d like to add something to the agenda.',
        words: ['I\'d', 'like', 'to', 'add', 'something', 'to', 'the', 'agenda.'],
        translation: 'Gostaria de acrescentar algo à agenda.'
      },
      {
        id: 'trabalho-ex-17',
        correctSentence: 'Can we park that discussion for later?',
        words: ['Can', 'we', 'park', 'that', 'discussion', 'for', 'later?'],
        translation: 'Podemos deixar essa discussão para depois?'
      },
      {
        id: 'trabalho-ex-18',
        correctSentence: 'Let\'s dive deeper into this topic.',
        words: ['Let\'s', 'dive', 'deeper', 'into', 'this', 'topic.'],
        translation: 'Vamos nos aprofundar neste tópico.'
      },
      {
        id: 'trabalho-ex-19',
        correctSentence: 'I have a hard stop at 3 PM.',
        words: ['I', 'have', 'a', 'hard', 'stop', 'at', '3', 'PM.'],
        translation: 'Tenho que sair às 15h em ponto.'
      },
      {
        id: 'trabalho-ex-20',
        correctSentence: 'Can we take this offline?',
        words: ['Can', 'we', 'take', 'this', 'offline?'],
        translation: 'Podemos discutir isso separadamente?'
      },
      {
        id: 'trabalho-ex-21',
        correctSentence: 'I hope this email finds you well.',
        words: ['I', 'hope', 'this', 'email', 'finds', 'you', 'well.'],
        translation: 'Espero que este email o encontre bem.'
      },
      {
        id: 'trabalho-ex-22',
        correctSentence: 'Please find the attached document.',
        words: ['Please', 'find', 'the', 'attached', 'document.'],
        translation: 'Segue em anexo o documento.'
      },
      {
        id: 'trabalho-ex-23',
        correctSentence: 'Thanks for looping me in.',
        words: ['Thanks', 'for', 'looping', 'me', 'in.'],
        translation: 'Obrigado por me incluir.'
      },
      {
        id: 'trabalho-ex-24',
        correctSentence: 'I\'ll circle back with more details.',
        words: ['I\'ll', 'circle', 'back', 'with', 'more', 'details.'],
        translation: 'Retornarei com mais detalhes.'
      },
      {
        id: 'trabalho-ex-25',
        correctSentence: 'Please let me know if you have any questions.',
        words: ['Please', 'let', 'me', 'know', 'if', 'you', 'have', 'any', 'questions.'],
        translation: 'Por favor, me avise se tiver alguma dúvida.'
      },
      {
        id: 'trabalho-ex-26',
        correctSentence: 'I\'d like to give you some constructive feedback.',
        words: ['I\'d', 'like', 'to', 'give', 'you', 'some', 'constructive', 'feedback.'],
        translation: 'Gostaria de dar um feedback construtivo.'
      },
      {
        id: 'trabalho-ex-27',
        correctSentence: 'You did an excellent job on this project.',
        words: ['You', 'did', 'an', 'excellent', 'job', 'on', 'this', 'project.'],
        translation: 'Você fez um excelente trabalho neste projeto.'
      },
      {
        id: 'trabalho-ex-28',
        correctSentence: 'There\'s room for improvement in this area.',
        words: ['There\'s', 'room', 'for', 'improvement', 'in', 'this', 'area.'],
        translation: 'Há espaço para melhoria nesta área.'
      },
      {
        id: 'trabalho-ex-29',
        correctSentence: 'I appreciate your attention to detail.',
        words: ['I', 'appreciate', 'your', 'attention', 'to', 'detail.'],
        translation: 'Agradeço sua atenção aos detalhes.'
      },
      {
        id: 'trabalho-ex-30',
        correctSentence: 'You exceeded expectations on this deliverable.',
        words: ['You', 'exceeded', 'expectations', 'on', 'this', 'deliverable.'],
        translation: 'Você superou as expectativas nesta entrega.'
      },
      {
        id: 'trabalho-ex-31',
        correctSentence: 'What\'s your budget for this project?',
        words: ['What\'s', 'your', 'budget', 'for', 'this', 'project?'],
        translation: 'Qual é seu orçamento para este projeto?'
      },
      {
        id: 'trabalho-ex-32',
        correctSentence: 'I think we can work something out.',
        words: ['I', 'think', 'we', 'can', 'work', 'something', 'out.'],
        translation: 'Acho que podemos chegar a um acordo.'
      },
      {
        id: 'trabalho-ex-33',
        correctSentence: 'Let\'s find a win-win solution.',
        words: ['Let\'s', 'find', 'a', 'win-win', 'solution.'],
        translation: 'Vamos encontrar uma solução que beneficie ambos.'
      },
      {
        id: 'trabalho-ex-34',
        correctSentence: 'That\'s our best and final offer.',
        words: ['That\'s', 'our', 'best', 'and', 'final', 'offer.'],
        translation: 'Essa é nossa melhor e última oferta.'
      },
      {
        id: 'trabalho-ex-35',
        correctSentence: 'Can we split the difference?',
        words: ['Can', 'we', 'split', 'the', 'difference?'],
        translation: 'Podemos dividir a diferença?'
      },
      {
        id: 'trabalho-ex-36',
        correctSentence: 'How can I help you today?',
        words: ['How', 'can', 'I', 'help', 'you', 'today?'],
        translation: 'Como posso ajudá-lo hoje?'
      },
      {
        id: 'trabalho-ex-37',
        correctSentence: 'I apologize for the inconvenience.',
        words: ['I', 'apologize', 'for', 'the', 'inconvenience.'],
        translation: 'Peço desculpas pelo inconveniente.'
      },
      {
        id: 'trabalho-ex-38',
        correctSentence: 'Let me look into that for you.',
        words: ['Let', 'me', 'look', 'into', 'that', 'for', 'you.'],
        translation: 'Deixe-me verificar isso para você.'
      },
      {
        id: 'trabalho-ex-39',
        correctSentence: 'I understand your frustration.',
        words: ['I', 'understand', 'your', 'frustration.'],
        translation: 'Entendo sua frustração.'
      },
      {
        id: 'trabalho-ex-40',
        correctSentence: 'We\'ll make this right.',
        words: ['We\'ll', 'make', 'this', 'right.'],
        translation: 'Vamos resolver isso.'
      },
      {
        id: 'trabalho-ex-41',
        correctSentence: 'Good morning everyone, thank you for joining us.',
        words: ['Good', 'morning', 'everyone,', 'thank', 'you', 'for', 'joining', 'us.'],
        translation: 'Bom dia pessoal, obrigado por se juntarem a nós.'
      },
      {
        id: 'trabalho-ex-42',
        correctSentence: 'Let me walk you through the agenda.',
        words: ['Let', 'me', 'walk', 'you', 'through', 'the', 'agenda.'],
        translation: 'Deixem-me apresentar a agenda.'
      },
      {
        id: 'trabalho-ex-43',
        correctSentence: 'As you can see on this slide...',
        words: ['As', 'you', 'can', 'see', 'on', 'this', 'slide...'],
        translation: 'Como vocês podem ver neste slide...'
      },
      {
        id: 'trabalho-ex-44',
        correctSentence: 'Let\'s dive into the key findings.',
        words: ['Let\'s', 'dive', 'into', 'the', 'key', 'findings.'],
        translation: 'Vamos nos aprofundar nas principais descobertas.'
      },
      {
        id: 'trabalho-ex-45',
        correctSentence: 'I\'d like to highlight three main points.',
        words: ['I\'d', 'like', 'to', 'highlight', 'three', 'main', 'points.'],
        translation: 'Gostaria de destacar três pontos principais.'
      },
      {
        id: 'trabalho-ex-46',
        correctSentence: 'Moving on to the next section...',
        words: ['Moving', 'on', 'to', 'the', 'next', 'section...'],
        translation: 'Passando para a próxima seção...'
      },
      {
        id: 'trabalho-ex-47',
        correctSentence: 'This brings us to our recommendation.',
        words: ['This', 'brings', 'us', 'to', 'our', 'recommendation.'],
        translation: 'Isso nos leva à nossa recomendação.'
      },
      {
        id: 'trabalho-ex-48',
        correctSentence: 'Let me break this down for you.',
        words: ['Let', 'me', 'break', 'this', 'down', 'for', 'you.'],
        translation: 'Deixem-me detalhar isso para vocês.'
      },
      {
        id: 'trabalho-ex-49',
        correctSentence: 'The data clearly shows...',
        words: ['The', 'data', 'clearly', 'shows...'],
        translation: 'Os dados mostram claramente...'
      },
      {
        id: 'trabalho-ex-50',
        correctSentence: 'I\'ll pause here for questions.',
        words: ['I\'ll', 'pause', 'here', 'for', 'questions.'],
        translation: 'Vou pausar aqui para perguntas.'
      },
      {
        id: 'trabalho-ex-51',
        correctSentence: 'Let\'s take a step back and look at the big picture.',
        words: ['Let\'s', 'take', 'a', 'step', 'back', 'and', 'look', 'at', 'the', 'big', 'picture.'],
        translation: 'Vamos dar um passo atrás e ver o panorama geral.'
      },
      {
        id: 'trabalho-ex-52',
        correctSentence: 'This is a game-changer for our industry.',
        words: ['This', 'is', 'a', 'game-changer', 'for', 'our', 'industry.'],
        translation: 'Isso é revolucionário para nossa indústria.'
      },
      {
        id: 'trabalho-ex-53',
        correctSentence: 'The ROI speaks for itself.',
        words: ['The', 'ROI', 'speaks', 'for', 'itself.'],
        translation: 'O ROI fala por si só.'
      },
      {
        id: 'trabalho-ex-54',
        correctSentence: 'Let me put this in perspective.',
        words: ['Let', 'me', 'put', 'this', 'in', 'perspective.'],
        translation: 'Deixem-me colocar isso em perspectiva.'
      },
      {
        id: 'trabalho-ex-55',
        correctSentence: 'We\'re seeing a significant uptick in sales.',
        words: ['We\'re', 'seeing', 'a', 'significant', 'uptick', 'in', 'sales.'],
        translation: 'Estamos vendo um aumento significativo em vendas.'
      },
      {
        id: 'trabalho-ex-56',
        correctSentence: 'This aligns perfectly with our strategy.',
        words: ['This', 'aligns', 'perfectly', 'with', 'our', 'strategy.'],
        translation: 'Isso se alinha perfeitamente com nossa estratégia.'
      },
      {
        id: 'trabalho-ex-57',
        correctSentence: 'Let me drill down into the specifics.',
        words: ['Let', 'me', 'drill', 'down', 'into', 'the', 'specifics.'],
        translation: 'Deixem-me entrar nos detalhes específicos.'
      },
      {
        id: 'trabalho-ex-58',
        correctSentence: 'The bottom line is we need to cut costs.',
        words: ['The', 'bottom', 'line', 'is', 'we', 'need', 'to', 'cut', 'costs.'],
        translation: 'A linha de fundo é que precisamos cortar custos.'
      },
      {
        id: 'trabalho-ex-59',
        correctSentence: 'This represents a paradigm shift.',
        words: ['This', 'represents', 'a', 'paradigm', 'shift.'],
        translation: 'Isso representa uma mudança de paradigma.'
      },
      {
        id: 'trabalho-ex-60',
        correctSentence: 'Let\'s talk about the implementation roadmap.',
        words: ['Let\'s', 'talk', 'about', 'the', 'implementation', 'roadmap.'],
        translation: 'Vamos falar sobre o roteiro de implementação.'
      },
      {
        id: 'trabalho-ex-61',
        correctSentence: 'I want to address the elephant in the room.',
        words: ['I', 'want', 'to', 'address', 'the', 'elephant', 'in', 'the', 'room.'],
        translation: 'Quero abordar o elefante na sala.'
      },
      {
        id: 'trabalho-ex-62',
        correctSentence: 'This is low-hanging fruit we can tackle immediately.',
        words: ['This', 'is', 'low-hanging', 'fruit', 'we', 'can', 'tackle', 'immediately.'],
        translation: 'Essa é uma oportunidade fácil que podemos abordar imediatamente.'
      },
      {
        id: 'trabalho-ex-63',
        correctSentence: 'This is mission-critical for our success.',
        words: ['This', 'is', 'mission-critical', 'for', 'our', 'success.'],
        translation: 'Isso é fundamental para nosso sucesso.'
      },
      {
        id: 'trabalho-ex-64',
        correctSentence: 'Let me give you some context.',
        words: ['Let', 'me', 'give', 'you', 'some', 'context.'],
        translation: 'Deixem-me dar algum contexto.'
      },
      {
        id: 'trabalho-ex-65',
        correctSentence: 'We\'re at an inflection point.',
        words: ['We\'re', 'at', 'an', 'inflection', 'point.'],
        translation: 'Estamos em um ponto de inflexão.'
      },
      {
        id: 'trabalho-ex-66',
        correctSentence: 'This will move the needle significantly.',
        words: ['This', 'will', 'move', 'the', 'needle', 'significantly.'],
        translation: 'Isso fará uma diferença significativa.'
      },
      {
        id: 'trabalho-ex-67',
        correctSentence: 'Let\'s recap the key takeaways.',
        words: ['Let\'s', 'recap', 'the', 'key', 'takeaways.'],
        translation: 'Vamos recapitular os pontos principais.'
      },
      {
        id: 'trabalho-ex-68',
        correctSentence: 'I\'ll open the floor for questions now.',
        words: ['I\'ll', 'open', 'the', 'floor', 'for', 'questions', 'now.'],
        translation: 'Vou abrir para perguntas agora.'
      },
      {
        id: 'trabalho-ex-69',
        correctSentence: 'Thank you for your time and attention.',
        words: ['Thank', 'you', 'for', 'your', 'time', 'and', 'attention.'],
        translation: 'Obrigado pelo seu tempo e atenção.'
      },
      {
        id: 'trabalho-ex-70',
        correctSentence: 'I need to escalate this issue.',
        words: ['I', 'need', 'to', 'escalate', 'this', 'issue.'],
        translation: 'Preciso escalar esta questão.'
      },
      {
        id: 'trabalho-ex-71',
        correctSentence: 'Let\'s do a stakeholder analysis.',
        words: ['Let\'s', 'do', 'a', 'stakeholder', 'analysis.'],
        translation: 'Vamos fazer uma análise de stakeholders.'
      },
      {
        id: 'trabalho-ex-72',
        correctSentence: 'We need better visibility into this process.',
        words: ['We', 'need', 'better', 'visibility', 'into', 'this', 'process.'],
        translation: 'Precisamos de melhor visibilidade deste processo.'
      },
      {
        id: 'trabalho-ex-73',
        correctSentence: 'Can we streamline this workflow?',
        words: ['Can', 'we', 'streamline', 'this', 'workflow?'],
        translation: 'Podemos simplificar este fluxo de trabalho?'
      },
      {
        id: 'trabalho-ex-74',
        correctSentence: 'Let\'s establish a baseline.',
        words: ['Let\'s', 'establish', 'a', 'baseline.'],
        translation: 'Vamos estabelecer uma linha de base.'
      },
      {
        id: 'trabalho-ex-75',
        correctSentence: 'I need you to take ownership of this.',
        words: ['I', 'need', 'you', 'to', 'take', 'ownership', 'of', 'this.'],
        translation: 'Preciso que você assuma a responsabilidade disso.'
      },
      {
        id: 'trabalho-ex-76',
        correctSentence: 'Let\'s conduct a risk assessment.',
        words: ['Let\'s', 'conduct', 'a', 'risk', 'assessment.'],
        translation: 'Vamos conduzir uma avaliação de risco.'
      },
      {
        id: 'trabalho-ex-77',
        correctSentence: 'We need to implement quality controls.',
        words: ['We', 'need', 'to', 'implement', 'quality', 'controls.'],
        translation: 'Precisamos implementar controles de qualidade.'
      },
      {
        id: 'trabalho-ex-78',
        correctSentence: 'Can we automate this process?',
        words: ['Can', 'we', 'automate', 'this', 'process?'],
        translation: 'Podemos automatizar este processo?'
      },
      {
        id: 'trabalho-ex-79',
        correctSentence: 'Let\'s do a cost-benefit analysis.',
        words: ['Let\'s', 'do', 'a', 'cost-benefit', 'analysis.'],
        translation: 'Vamos fazer uma análise de custo-benefício.'
      },
      {
        id: 'trabalho-ex-80',
        correctSentence: 'I need to delegate this task.',
        words: ['I', 'need', 'to', 'delegate', 'this', 'task.'],
        translation: 'Preciso delegar esta tarefa.'
      },
      {
        id: 'trabalho-ex-81',
        correctSentence: 'Let\'s create a project roadmap.',
        words: ['Let\'s', 'create', 'a', 'project', 'roadmap.'],
        translation: 'Vamos criar um roteiro do projeto.'
      },
      {
        id: 'trabalho-ex-82',
        correctSentence: 'We need to align on objectives.',
        words: ['We', 'need', 'to', 'align', 'on', 'objectives.'],
        translation: 'Precisamos nos alinhar sobre os objetivos.'
      },
      {
        id: 'trabalho-ex-83',
        correctSentence: 'Can we get a status update?',
        words: ['Can', 'we', 'get', 'a', 'status', 'update?'],
        translation: 'Podemos ter uma atualização de status?'
      },
      {
        id: 'trabalho-ex-84',
        correctSentence: 'Let\'s schedule regular check-ins.',
        words: ['Let\'s', 'schedule', 'regular', 'check-ins.'],
        translation: 'Vamos agendar verificações regulares.'
      },
      {
        id: 'trabalho-ex-85',
        correctSentence: 'I want to congratulate the team.',
        words: ['I', 'want', 'to', 'congratulate', 'the', 'team.'],
        translation: 'Quero parabenizar a equipe.'
      },
      {
        id: 'trabalho-ex-86',
        correctSentence: 'I\'d like to introduce you to my colleague.',
        words: ['I\'d', 'like', 'to', 'introduce', 'you', 'to', 'my', 'colleague.'],
        translation: 'Gostaria de apresentá-lo ao meu colega.'
      },
      {
        id: 'trabalho-ex-87',
        correctSentence: 'What line of work are you in?',
        words: ['What', 'line', 'of', 'work', 'are', 'you', 'in?'],
        translation: 'Em que área você trabalha?'
      },
      {
        id: 'trabalho-ex-88',
        correctSentence: 'Let me give you my business card.',
        words: ['Let', 'me', 'give', 'you', 'my', 'business', 'card.'],
        translation: 'Deixe-me dar meu cartão de visita.'
      },
      {
        id: 'trabalho-ex-89',
        correctSentence: 'I\'d love to connect on LinkedIn.',
        words: ['I\'d', 'love', 'to', 'connect', 'on', 'LinkedIn.'],
        translation: 'Adoraria me conectar no LinkedIn.'
      },
      {
        id: 'trabalho-ex-90',
        correctSentence: 'We should grab coffee sometime.',
        words: ['We', 'should', 'grab', 'coffee', 'sometime.'],
        translation: 'Deveríamos tomar um café algum dia.'
      },
      {
        id: 'trabalho-ex-91',
        correctSentence: 'I\'d like to pick your brain about something.',
        words: ['I\'d', 'like', 'to', 'pick', 'your', 'brain', 'about', 'something.'],
        translation: 'Gostaria de pedir sua opinião sobre algo.'
      },
      {
        id: 'trabalho-ex-92',
        correctSentence: 'Do you know anyone in marketing?',
        words: ['Do', 'you', 'know', 'anyone', 'in', 'marketing?'],
        translation: 'Você conhece alguém no marketing?'
      },
      {
        id: 'trabalho-ex-93',
        correctSentence: 'I\'m looking to expand my network.',
        words: ['I\'m', 'looking', 'to', 'expand', 'my', 'network.'],
        translation: 'Estou procurando expandir minha rede.'
      },
      {
        id: 'trabalho-ex-94',
        correctSentence: 'Can you make an introduction?',
        words: ['Can', 'you', 'make', 'an', 'introduction?'],
        translation: 'Você pode fazer uma apresentação?'
      },
      {
        id: 'trabalho-ex-95',
        correctSentence: 'I\'d appreciate any referrals.',
        words: ['I\'d', 'appreciate', 'any', 'referrals.'],
        translation: 'Apreciaria qualquer indicação.'
      },
      {
        id: 'trabalho-ex-96',
        correctSentence: 'I need to run this by my manager.',
        words: ['I', 'need', 'to', 'run', 'this', 'by', 'my', 'manager.'],
        translation: 'Preciso consultar meu gerente.'
      },
      {
        id: 'trabalho-ex-97',
        correctSentence: 'What would it take to close this deal today?',
        words: ['What', 'would', 'it', 'take', 'to', 'close', 'this', 'deal', 'today?'],
        translation: 'O que seria necessário para fechar este negócio hoje?'
      },
      {
        id: 'trabalho-ex-98',
        correctSentence: 'I appreciate your position, but we need to negotiate.',
        words: ['I', 'appreciate', 'your', 'position,', 'but', 'we', 'need', 'to', 'negotiate.'],
        translation: 'Entendo sua posição, mas precisamos negociar.'
      },
      {
        id: 'trabalho-ex-99',
        correctSentence: 'Is there anything else I can do for you?',
        words: ['Is', 'there', 'anything', 'else', 'I', 'can', 'do', 'for', 'you?'],
        translation: 'Há mais alguma coisa que posso fazer por você?'
      },
      {
        id: 'trabalho-ex-100',
        correctSentence: 'I\'ll escalate this to my supervisor.',
        words: ['I\'ll', 'escalate', 'this', 'to', 'my', 'supervisor.'],
        translation: 'Vou escalar isso para meu supervisor.'
      },
      {
        id: 'trabalho-ex-101',
        correctSentence: 'We value your business.',
        words: ['We', 'value', 'your', 'business.'],
        translation: 'Valorizamos seu negócio.'
      },
      {
        id: 'trabalho-ex-102',
        correctSentence: 'Thank you for bringing this to our attention.',
        words: ['Thank', 'you', 'for', 'bringing', 'this', 'to', 'our', 'attention.'],
        translation: 'Obrigado por trazer isso à nossa atenção.'
      },
      {
        id: 'trabalho-ex-103',
        correctSentence: 'I\'ll follow up with you by email.',
        words: ['I\'ll', 'follow', 'up', 'with', 'you', 'by', 'email.'],
        translation: 'Vou acompanhar com você por email.'
      },
      {
        id: 'trabalho-ex-104',
        correctSentence: 'Let\'s circle back to this next week.',
        words: ['Let\'s', 'circle', 'back', 'to', 'this', 'next', 'week.'],
        translation: 'Vamos retomar isso na próxima semana.'
      },
      {
        id: 'trabalho-ex-105',
        correctSentence: 'I\'d like to piggyback on what Sarah said.',
        words: ['I\'d', 'like', 'to', 'piggyback', 'on', 'what', 'Sarah', 'said.'],
        translation: 'Gostaria de complementar o que a Sarah disse.'
      },
      {
        id: 'trabalho-ex-106',
        correctSentence: 'Can we get a consensus on this?',
        words: ['Can', 'we', 'get', 'a', 'consensus', 'on', 'this?'],
        translation: 'Podemos chegar a um consenso sobre isso?'
      },
      {
        id: 'trabalho-ex-107',
        correctSentence: 'Let\'s put this to a vote.',
        words: ['Let\'s', 'put', 'this', 'to', 'a', 'vote.'],
        translation: 'Vamos votar sobre isso.'
      },
      {
        id: 'trabalho-ex-108',
        correctSentence: 'I need to step out for a moment.',
        words: ['I', 'need', 'to', 'step', 'out', 'for', 'a', 'moment.'],
        translation: 'Preciso me ausentar por um momento.'
      },
      {
        id: 'trabalho-ex-109',
        correctSentence: 'Can we stick to the agenda?',
        words: ['Can', 'we', 'stick', 'to', 'the', 'agenda?'],
        translation: 'Podemos seguir a agenda?'
      },
      {
        id: 'trabalho-ex-110',
        correctSentence: 'Let\'s recap the action items.',
        words: ['Let\'s', 'recap', 'the', 'action', 'items.'],
        translation: 'Vamos recapitular os itens de ação.'
      },
      {
        id: 'trabalho-ex-111',
        correctSentence: 'Who\'s taking the minutes?',
        words: ['Who\'s', 'taking', 'the', 'minutes?'],
        translation: 'Quem está fazendo a ata?'
      },
      {
        id: 'trabalho-ex-112',
        correctSentence: 'Can we schedule a follow-up?',
        words: ['Can', 'we', 'schedule', 'a', 'follow-up?'],
        translation: 'Podemos agendar um acompanhamento?'
      },
      {
        id: 'trabalho-ex-113',
        correctSentence: 'I\'m going to play devil\'s advocate here.',
        words: ['I\'m', 'going', 'to', 'play', 'devil\'s', 'advocate', 'here.'],
        translation: 'Vou fazer o papel do advogado do diabo aqui.'
      },
      {
        id: 'trabalho-ex-114',
        correctSentence: 'Let\'s move on to the next item.',
        words: ['Let\'s', 'move', 'on', 'to', 'the', 'next', 'item.'],
        translation: 'Vamos para o próximo item.'
      },
      {
        id: 'trabalho-ex-115',
        correctSentence: 'Can we get some buy-in from the team?',
        words: ['Can', 'we', 'get', 'some', 'buy-in', 'from', 'the', 'team?'],
        translation: 'Podemos conseguir o apoio da equipe?'
      },
      {
        id: 'trabalho-ex-116',
        correctSentence: 'I\'d like to push back on that idea.',
        words: ['I\'d', 'like', 'to', 'push', 'back', 'on', 'that', 'idea.'],
        translation: 'Gostaria de questionar essa ideia.'
      },
      {
        id: 'trabalho-ex-117',
        correctSentence: 'Let\'s table this for now.',
        words: ['Let\'s', 'table', 'this', 'for', 'now.'],
        translation: 'Vamos deixar isso de lado por enquanto.'
      },
      {
        id: 'trabalho-ex-118',
        correctSentence: 'Can we get alignment on the timeline?',
        words: ['Can', 'we', 'get', 'alignment', 'on', 'the', 'timeline?'],
        translation: 'Podemos nos alinhar sobre o cronograma?'
      },
      {
        id: 'trabalho-ex-119',
        correctSentence: 'I want to level-set expectations.',
        words: ['I', 'want', 'to', 'level-set', 'expectations.'],
        translation: 'Quero alinhar as expectativas.'
      },
      {
        id: 'trabalho-ex-120',
        correctSentence: 'Let\'s brainstorm some solutions.',
        words: ['Let\'s', 'brainstorm', 'some', 'solutions.'],
        translation: 'Vamos fazer um brainstorm de soluções.'
      },
      {
        id: 'trabalho-ex-121',
        correctSentence: 'Can we do a quick temperature check?',
        words: ['Can', 'we', 'do', 'a', 'quick', 'temperature', 'check?'],
        translation: 'Podemos fazer uma verificação rápida?'
      },
      {
        id: 'trabalho-ex-122',
        correctSentence: 'I need to jump on another call.',
        words: ['I', 'need', 'to', 'jump', 'on', 'another', 'call.'],
        translation: 'Preciso entrar em outra chamada.'
      },
      {
        id: 'trabalho-ex-123',
        correctSentence: 'Let\'s wrap this up.',
        words: ['Let\'s', 'wrap', 'this', 'up.'],
        translation: 'Vamos finalizar isso.'
      },
      {
        id: 'trabalho-ex-124',
        correctSentence: 'Can we get some concrete next steps?',
        words: ['Can', 'we', 'get', 'some', 'concrete', 'next', 'steps?'],
        translation: 'Podemos definir próximos passos concretos?'
      },
      {
        id: 'trabalho-ex-125',
        correctSentence: 'I\'d like to challenge that assumption.',
        words: ['I\'d', 'like', 'to', 'challenge', 'that', 'assumption.'],
        translation: 'Gostaria de questionar essa suposição.'
      },
      {
        id: 'trabalho-ex-126',
        correctSentence: 'Let\'s sync up offline about this.',
        words: ['Let\'s', 'sync', 'up', 'offline', 'about', 'this.'],
        translation: 'Vamos nos alinhar sobre isso separadamente.'
      },
      {
        id: 'trabalho-ex-127',
        correctSentence: 'Can we establish some ground rules?',
        words: ['Can', 'we', 'establish', 'some', 'ground', 'rules?'],
        translation: 'Podemos estabelecer algumas regras básicas?'
      },
      {
        id: 'trabalho-ex-128',
        correctSentence: 'I want to bring everyone up to speed.',
        words: ['I', 'want', 'to', 'bring', 'everyone', 'up', 'to', 'speed.'],
        translation: 'Quero colocar todos a par da situação.'
      },
      {
        id: 'trabalho-ex-129',
        correctSentence: 'Let\'s do a post-mortem on this project.',
        words: ['Let\'s', 'do', 'a', 'post-mortem', 'on', 'this', 'project.'],
        translation: 'Vamos fazer uma análise pós-projeto.'
      },
      {
        id: 'trabalho-ex-130',
        correctSentence: 'Can we get some visibility into the process?',
        words: ['Can', 'we', 'get', 'some', 'visibility', 'into', 'the', 'process?'],
        translation: 'Podemos ter mais visibilidade do processo?'
      },
      {
        id: 'trabalho-ex-131',
        correctSentence: 'I\'d like to propose an alternative approach.',
        words: ['I\'d', 'like', 'to', 'propose', 'an', 'alternative', 'approach.'],
        translation: 'Gostaria de propor uma abordagem alternativa.'
      },
      {
        id: 'trabalho-ex-132',
        correctSentence: 'Let\'s put a pin in this and come back to it.',
        words: ['Let\'s', 'put', 'a', 'pin', 'in', 'this', 'and', 'come', 'back', 'to', 'it.'],
        translation: 'Vamos marcar isso e voltar depois.'
      },
      {
        id: 'trabalho-ex-133',
        correctSentence: 'Can we get ownership assigned for each task?',
        words: ['Can', 'we', 'get', 'ownership', 'assigned', 'for', 'each', 'task?'],
        translation: 'Podemos definir responsáveis para cada tarefa?'
      },
      {
        id: 'trabalho-ex-134',
        correctSentence: 'I\'m writing to follow up on our conversation.',
        words: ['I\'m', 'writing', 'to', 'follow', 'up', 'on', 'our', 'conversation.'],
        translation: 'Estou escrevendo para dar seguimento à nossa conversa.'
      },
      {
        id: 'trabalho-ex-135',
        correctSentence: 'I\'m cc\'ing John on this email.',
        words: ['I\'m', 'cc\'ing', 'John', 'on', 'this', 'email.'],
        translation: 'Estou colocando o John em cópia neste email.'
      },
      {
        id: 'trabalho-ex-136',
        correctSentence: 'I wanted to reach out regarding the project.',
        words: ['I', 'wanted', 'to', 'reach', 'out', 'regarding', 'the', 'project.'],
        translation: 'Queria entrar em contato sobre o projeto.'
      },
      {
        id: 'trabalho-ex-137',
        correctSentence: 'Moving you to BCC to reduce inbox clutter.',
        words: ['Moving', 'you', 'to', 'BCC', 'to', 'reduce', 'inbox', 'clutter.'],
        translation: 'Movendo você para CCO para reduzir spam na caixa.'
      },
      {
        id: 'trabalho-ex-138',
        correctSentence: 'Per our conversation, here are the next steps.',
        words: ['Per', 'our', 'conversation,', 'here', 'are', 'the', 'next', 'steps.'],
        translation: 'Conforme nossa conversa, seguem os próximos passos.'
      },
      {
        id: 'trabalho-ex-139',
        correctSentence: 'I\'m bumping this to the top of your inbox.',
        words: ['I\'m', 'bumping', 'this', 'to', 'the', 'top', 'of', 'your', 'inbox.'],
        translation: 'Estou priorizando isso na sua caixa de entrada.'
      },
      {
        id: 'trabalho-ex-140',
        correctSentence: 'Thanks for your quick turnaround on this.',
        words: ['Thanks', 'for', 'your', 'quick', 'turnaround', 'on', 'this.'],
        translation: 'Obrigado pela resposta rápida sobre isso.'
      },
      {
        id: 'trabalho-ex-141',
        correctSentence: 'I\'m following up on the action items from yesterday.',
        words: ['I\'m', 'following', 'up', 'on', 'the', 'action', 'items', 'from', 'yesterday.'],
        translation: 'Estou acompanhando os itens de ação de ontem.'
      },
      {
        id: 'trabalho-ex-142',
        correctSentence: 'Could you please confirm receipt?',
        words: ['Could', 'you', 'please', 'confirm', 'receipt?'],
        translation: 'Você poderia confirmar o recebimento?'
      },
      {
        id: 'trabalho-ex-143',
        correctSentence: 'I\'m forwarding this for your awareness.',
        words: ['I\'m', 'forwarding', 'this', 'for', 'your', 'awareness.'],
        translation: 'Estou encaminhando isso para seu conhecimento.'
      },
      {
        id: 'trabalho-ex-144',
        correctSentence: 'Please reply all so everyone stays in the loop.',
        words: ['Please', 'reply', 'all', 'so', 'everyone', 'stays', 'in', 'the', 'loop.'],
        translation: 'Por favor, responda a todos para manter todos informados.'
      },
      {
        id: 'trabalho-ex-145',
        correctSentence: 'I\'d like to see more initiative from you.',
        words: ['I\'d', 'like', 'to', 'see', 'more', 'initiative', 'from', 'you.'],
        translation: 'Gostaria de ver mais iniciativa de você.'
      },
      {
        id: 'trabalho-ex-146',
        correctSentence: 'Your communication skills have really improved.',
        words: ['Your', 'communication', 'skills', 'have', 'really', 'improved.'],
        translation: 'Suas habilidades de comunicação realmente melhoraram.'
      },
      {
        id: 'trabalho-ex-147',
        correctSentence: 'Let\'s work on making your presentations more engaging.',
        words: ['Let\'s', 'work', 'on', 'making', 'your', 'presentations', 'more', 'engaging.'],
        translation: 'Vamos trabalhar para tornar suas apresentações mais envolventes.'
      },
      {
        id: 'trabalho-ex-148',
        correctSentence: 'You have great potential for leadership.',
        words: ['You', 'have', 'great', 'potential', 'for', 'leadership.'],
        translation: 'Você tem grande potencial para liderança.'
      },
      {
        id: 'trabalho-ex-149',
        correctSentence: 'I\'d like you to take ownership of this process.',
        words: ['I\'d', 'like', 'you', 'to', 'take', 'ownership', 'of', 'this', 'process.'],
        translation: 'Gostaria que você assumisse a responsabilidade por este processo.'
      },
      {
        id: 'trabalho-ex-150',
        correctSentence: 'Your proactive approach is commendable.',
        words: ['Your', 'proactive', 'approach', 'is', 'commendable.'],
        translation: 'Sua abordagem proativa é louvável.'
      },
      {
        id: 'trabalho-ex-151',
        correctSentence: 'Let\'s discuss areas for professional development.',
        words: ['Let\'s', 'discuss', 'areas', 'for', 'professional', 'development.'],
        translation: 'Vamos discutir áreas para desenvolvimento profissional.'
      },
      {
        id: 'trabalho-ex-152',
        correctSentence: 'You\'re really hitting your stride now.',
        words: ['You\'re', 'really', 'hitting', 'your', 'stride', 'now.'],
        translation: 'Você está realmente no seu melhor agora.'
      },
      {
        id: 'trabalho-ex-153',
        correctSentence: 'I\'d like to see more collaboration with the team.',
        words: ['I\'d', 'like', 'to', 'see', 'more', 'collaboration', 'with', 'the', 'team.'],
        translation: 'Gostaria de ver mais colaboração com a equipe.'
      },
      {
        id: 'trabalho-ex-154',
        correctSentence: 'Your work quality is consistently high.',
        words: ['Your', 'work', 'quality', 'is', 'consistently', 'high.'],
        translation: 'A qualidade do seu trabalho é consistentemente alta.'
      },
      {
        id: 'trabalho-ex-155',
        correctSentence: 'You need to work on your time management.',
        words: ['You', 'need', 'to', 'work', 'on', 'your', 'time', 'management.'],
        translation: 'Você precisa trabalhar na gestão do seu tempo.'
      },
      {
        id: 'trabalho-ex-156',
        correctSentence: 'I\'m impressed with your problem-solving skills.',
        words: ['I\'m', 'impressed', 'with', 'your', 'problem-solving', 'skills.'],
        translation: 'Estou impressionado com suas habilidades de resolução de problemas.'
      },
      {
        id: 'trabalho-ex-157',
        correctSentence: 'Let\'s set some SMART goals for next quarter.',
        words: ['Let\'s', 'set', 'some', 'SMART', 'goals', 'for', 'next', 'quarter.'],
        translation: 'Vamos definir algumas metas SMART para o próximo trimestre.'
      },
      {
        id: 'trabalho-ex-158',
        correctSentence: 'You\'re a valuable asset to the team.',
        words: ['You\'re', 'a', 'valuable', 'asset', 'to', 'the', 'team.'],
        translation: 'Você é um recurso valioso para a equipe.'
      },
      {
        id: 'trabalho-ex-159',
        correctSentence: 'I\'d like to see you stretch yourself more.',
        words: ['I\'d', 'like', 'to', 'see', 'you', 'stretch', 'yourself', 'more.'],
        translation: 'Gostaria de ver você se desafiar mais.'
      },
      {
        id: 'trabalho-ex-160',
        correctSentence: 'Your growth mindset is really showing.',
        words: ['Your', 'growth', 'mindset', 'is', 'really', 'showing.'],
        translation: 'Sua mentalidade de crescimento está realmente aparecendo.'
      },
      {
        id: 'trabalho-ex-161',
        correctSentence: 'Let\'s work on building your confidence.',
        words: ['Let\'s', 'work', 'on', 'building', 'your', 'confidence.'],
        translation: 'Vamos trabalhar para construir sua confiança.'
      },
      {
        id: 'trabalho-ex-162',
        correctSentence: 'You\'re demonstrating real leadership potential.',
        words: ['You\'re', 'demonstrating', 'real', 'leadership', 'potential.'],
        translation: 'Você está demonstrando real potencial de liderança.'
      },
      {
        id: 'trabalho-ex-163',
        correctSentence: 'I need to see the ROI on this.',
        words: ['I', 'need', 'to', 'see', 'the', 'ROI', 'on', 'this.'],
        translation: 'Preciso ver o ROI disso.'
      },
      {
        id: 'trabalho-ex-164',
        correctSentence: 'What\'s our burn rate?',
        words: ['What\'s', 'our', 'burn', 'rate?'],
        translation: 'Qual é nossa taxa de queima?'
      },
      {
        id: 'trabalho-ex-165',
        correctSentence: 'We need to scale this operation.',
        words: ['We', 'need', 'to', 'scale', 'this', 'operation.'],
        translation: 'Precisamos escalar esta operação.'
      },
      {
        id: 'trabalho-ex-166',
        correctSentence: 'Let\'s optimize our workflow.',
        words: ['Let\'s', 'optimize', 'our', 'workflow.'],
        translation: 'Vamos otimizar nosso fluxo de trabalho.'
      },
      {
        id: 'trabalho-ex-167',
        correctSentence: 'We\'re pivoting our strategy.',
        words: ['We\'re', 'pivoting', 'our', 'strategy.'],
        translation: 'Estamos mudando nossa estratégia.'
      },
      {
        id: 'trabalho-ex-168',
        correctSentence: 'I\'m authorized to offer you a discount.',
        words: ['I\'m', 'authorized', 'to', 'offer', 'you', 'a', 'discount.'],
        translation: 'Estou autorizado a oferecer um desconto.'
      },
      {
        id: 'trabalho-ex-169',
        correctSentence: 'Let\'s table that for now.',
        words: ['Let\'s', 'table', 'that', 'for', 'now.'],
        translation: 'Vamos deixar isso para depois.'
      },
      {
        id: 'trabalho-ex-170',
        correctSentence: 'We need to implement a quality control system.',
        words: ['We', 'need', 'to', 'implement', 'a', 'quality', 'control', 'system.'],
        translation: 'Precisamos implementar um sistema de controle de qualidade.'
      },
      {
        id: 'trabalho-ex-171',
        correctSentence: 'Can we get a ballpark estimate?',
        words: ['Can', 'we', 'get', 'a', 'ballpark', 'estimate?'],
        translation: 'Podemos ter uma estimativa aproximada?'
      },
      {
        id: 'trabalho-ex-172',
        correctSentence: 'Let\'s circle the wagons on this issue.',
        words: ['Let\'s', 'circle', 'the', 'wagons', 'on', 'this', 'issue.'],
        translation: 'Vamos nos unir sobre esta questão.'
      },
      {
        id: 'trabalho-ex-173',
        correctSentence: 'We need to be more data-driven.',
        words: ['We', 'need', 'to', 'be', 'more', 'data-driven.'],
        translation: 'Precisamos ser mais orientados por dados.'
      },
      {
        id: 'trabalho-ex-174',
        correctSentence: 'This is a time-sensitive matter.',
        words: ['This', 'is', 'a', 'time-sensitive', 'matter.'],
        translation: 'Esta é uma questão sensível ao tempo.'
      },
      {
        id: 'trabalho-ex-175',
        correctSentence: 'We need to leverage our competitive advantage.',
        words: ['We', 'need', 'to', 'leverage', 'our', 'competitive', 'advantage.'],
        translation: 'Precisamos aproveitar nossa vantagem competitiva.'
      },
      {
        id: 'trabalho-ex-176',
        correctSentence: 'Let\'s touch base tomorrow.',
        words: ['Let\'s', 'touch', 'base', 'tomorrow.'],
        translation: 'Vamos conversar amanhã.'
      },
      {
        id: 'trabalho-ex-177',
        correctSentence: 'I\'ll keep you posted on developments.',
        words: ['I\'ll', 'keep', 'you', 'posted', 'on', 'developments.'],
        translation: 'Vou mantê-lo informado sobre os desenvolvimentos.'
      },
      {
        id: 'trabalho-ex-178',
        correctSentence: 'We need to think strategically about this.',
        words: ['We', 'need', 'to', 'think', 'strategically', 'about', 'this.'],
        translation: 'Precisamos pensar estrategicamente sobre isso.'
      },
      {
        id: 'trabalho-ex-179',
        correctSentence: 'Can we fast-track this project?',
        words: ['Can', 'we', 'fast-track', 'this', 'project?'],
        translation: 'Podemos acelerar este projeto?'
      },
      {
        id: 'trabalho-ex-180',
        correctSentence: 'Let\'s get everyone on the same page.',
        words: ['Let\'s', 'get', 'everyone', 'on', 'the', 'same', 'page.'],
        translation: 'Vamos colocar todos na mesma página.'
      },
      {
        id: 'trabalho-ex-181',
        correctSentence: 'We need to manage stakeholder expectations.',
        words: ['We', 'need', 'to', 'manage', 'stakeholder', 'expectations.'],
        translation: 'Precisamos gerenciar as expectativas dos stakeholders.'
      },
      {
        id: 'trabalho-ex-182',
        correctSentence: 'This is a win-win for everyone.',
        words: ['This', 'is', 'a', 'win-win', 'for', 'everyone.'],
        translation: 'Isso é vantajoso para todos.'
      },
      {
        id: 'trabalho-ex-183',
        correctSentence: 'Let\'s hit the ground running.',
        words: ['Let\'s', 'hit', 'the', 'ground', 'running.'],
        translation: 'Vamos começar com tudo.'
      },
      {
        id: 'trabalho-ex-184',
        correctSentence: 'We need to stay ahead of the curve.',
        words: ['We', 'need', 'to', 'stay', 'ahead', 'of', 'the', 'curve.'],
        translation: 'Precisamos nos manter à frente da curva.'
      },
      {
        id: 'trabalho-ex-185',
        correctSentence: 'Can we run this idea by the team?',
        words: ['Can', 'we', 'run', 'this', 'idea', 'by', 'the', 'team?'],
        translation: 'Podemos apresentar esta ideia para a equipe?'
      },
      {
        id: 'trabalho-ex-186',
        correctSentence: 'Let\'s keep our options open.',
        words: ['Let\'s', 'keep', 'our', 'options', 'open.'],
        translation: 'Vamos manter nossas opções em aberto.'
      },
      {
        id: 'trabalho-ex-187',
        correctSentence: 'We need to be more customer-centric.',
        words: ['We', 'need', 'to', 'be', 'more', 'customer-centric.'],
        translation: 'Precisamos ser mais centrados no cliente.'
      },
      {
        id: 'trabalho-ex-188',
        correctSentence: 'This will streamline our operations.',
        words: ['This', 'will', 'streamline', 'our', 'operations.'],
        translation: 'Isso vai simplificar nossas operações.'
      },
      {
        id: 'trabalho-ex-189',
        correctSentence: 'Let\'s schedule a deep dive session.',
        words: ['Let\'s', 'schedule', 'a', 'deep', 'dive', 'session.'],
        translation: 'Vamos agendar uma sessão de aprofundamento.'
      },
      {
        id: 'trabalho-ex-190',
        correctSentence: 'We need to eliminate redundancies.',
        words: ['We', 'need', 'to', 'eliminate', 'redundancies.'],
        translation: 'Precisamos eliminar redundâncias.'
      },
      {
        id: 'trabalho-ex-191',
        correctSentence: 'Can we get more granular with the data?',
        words: ['Can', 'we', 'get', 'more', 'granular', 'with', 'the', 'data?'],
        translation: 'Podemos ser mais detalhados com os dados?'
      },
      {
        id: 'trabalho-ex-192',
        correctSentence: 'Let\'s take a holistic approach.',
        words: ['Let\'s', 'take', 'a', 'holistic', 'approach.'],
        translation: 'Vamos adotar uma abordagem holística.'
      },
      {
        id: 'trabalho-ex-193',
        correctSentence: 'We need to future-proof this solution.',
        words: ['We', 'need', 'to', 'future-proof', 'this', 'solution.'],
        translation: 'Precisamos deixar esta solução à prova do futuro.'
      },
      {
        id: 'trabalho-ex-194',
        correctSentence: 'This is a critical path item.',
        words: ['This', 'is', 'a', 'critical', 'path', 'item.'],
        translation: 'Este é um item de caminho crítico.'
      },
      {
        id: 'trabalho-ex-195',
        correctSentence: 'Let\'s work backwards from the deadline.',
        words: ['Let\'s', 'work', 'backwards', 'from', 'the', 'deadline.'],
        translation: 'Vamos trabalhar de trás para frente a partir do prazo.'
      },
      {
        id: 'trabalho-ex-196',
        correctSentence: 'We need to maximize our ROI.',
        words: ['We', 'need', 'to', 'maximize', 'our', 'ROI.'],
        translation: 'Precisamos maximizar nosso ROI.'
      },
      {
        id: 'trabalho-ex-197',
        correctSentence: 'Can we identify potential bottlenecks?',
        words: ['Can', 'we', 'identify', 'potential', 'bottlenecks?'],
        translation: 'Podemos identificar possíveis gargalos?'
      },
      {
        id: 'trabalho-ex-198',
        correctSentence: 'Let\'s maintain our competitive edge.',
        words: ['Let\'s', 'maintain', 'our', 'competitive', 'edge.'],
        translation: 'Vamos manter nossa vantagem competitiva.'
      },
      {
        id: 'trabalho-ex-199',
        correctSentence: 'We need to work on eliminating time wasters.',
        words: ['We', 'need', 'to', 'work', 'on', 'eliminating', 'time', 'wasters.'],
        translation: 'Precisamos trabalhar na eliminação de desperdiçadores de tempo.'
      },
      {
        id: 'trabalho-ex-200',
        correctSentence: 'Let\'s ensure we have proper documentation.',
        words: ['Let\'s', 'ensure', 'we', 'have', 'proper', 'documentation.'],
        translation: 'Vamos garantir que tenhamos documentação adequada.'
      },
      {
        id: 'trabalho-ex-201',
        correctSentence: 'We need to stay within budget.',
        words: ['We', 'need', 'to', 'stay', 'within', 'budget.'],
        translation: 'Precisamos nos manter dentro do orçamento.'
      },
      {
        id: 'trabalho-ex-202',
        correctSentence: 'Can we get executive buy-in on this?',
        words: ['Can', 'we', 'get', 'executive', 'buy-in', 'on', 'this?'],
        translation: 'Podemos conseguir a aprovação da diretoria sobre isso?'
      },
      {
        id: 'trabalho-ex-203',
        correctSentence: 'Let\'s establish clear KPIs.',
        words: ['Let\'s', 'establish', 'clear', 'KPIs.'],
        translation: 'Vamos estabelecer KPIs claros.'
      },
      {
        id: 'trabalho-ex-204',
        correctSentence: 'We need to standardize our processes.',
        words: ['We', 'need', 'to', 'standardize', 'our', 'processes.'],
        translation: 'Precisamos padronizar nossos processos.'
      },
      {
        id: 'trabalho-ex-205',
        correctSentence: 'This will enhance our productivity.',
        words: ['This', 'will', 'enhance', 'our', 'productivity.'],
        translation: 'Isso vai melhorar nossa produtividade.'
      },
      {
        id: 'trabalho-ex-206',
        correctSentence: 'Let\'s maintain quality standards.',
        words: ['Let\'s', 'maintain', 'quality', 'standards.'],
        translation: 'Vamos manter os padrões de qualidade.'
      },
      {
        id: 'trabalho-ex-207',
        correctSentence: 'We need to focus on core competencies.',
        words: ['We', 'need', 'to', 'focus', 'on', 'core', 'competencies.'],
        translation: 'Precisamos focar nas competências centrais.'
      },
      {
        id: 'trabalho-ex-208',
        correctSentence: 'Can we drive innovation in this area?',
        words: ['Can', 'we', 'drive', 'innovation', 'in', 'this', 'area?'],
        translation: 'Podemos impulsionar a inovação nesta área?'
      },
      {
        id: 'trabalho-ex-209',
        correctSentence: 'Let\'s ensure regulatory compliance.',
        words: ['Let\'s', 'ensure', 'regulatory', 'compliance.'],
        translation: 'Vamos garantir conformidade regulatória.'
      },
      {
        id: 'trabalho-ex-210',
        correctSentence: 'This aligns with our company values.',
        words: ['This', 'aligns', 'with', 'our', 'company', 'values.'],
        translation: 'Isso se alinha com os valores da nossa empresa.'
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
      { english: "You're demonstrating real leadership potential.", portuguese: "Você está demonstrando real potencial de liderança.", level: 'avançado', context: 'Feedback' },
      
      // Mais frases da trilha trabalho
      { english: "Let's dive deeper into this topic.", portuguese: "Vamos nos aprofundar neste tópico.", level: 'médio', context: 'Reuniões' },
      { english: "Can we park that discussion for later?", portuguese: "Podemos deixar essa discussão para depois?", level: 'avançado', context: 'Reuniões' },
      { english: "I have a hard stop at 3 PM.", portuguese: "Tenho que sair às 15h em ponto.", level: 'avançado', context: 'Reuniões' },
      { english: "Let's go around the room for introductions.", portuguese: "Vamos fazer uma rodada de apresentações.", level: 'médio', context: 'Reuniões' },
      { english: "I'd like to add something to the agenda.", portuguese: "Gostaria de acrescentar algo à agenda.", level: 'médio', context: 'Reuniões' },
      { english: "Can we establish ground rules?", portuguese: "Podemos estabelecer regras básicas?", level: 'médio', context: 'Reuniões' },
      { english: "Let's set up a working group.", portuguese: "Vamos formar um grupo de trabalho.", level: 'médio', context: 'Reuniões' },
      { english: "I'd like to nominate Sarah for this role.", portuguese: "Gostaria de indicar a Sarah para este papel.", level: 'médio', context: 'Reuniões' },
      { english: "Can we vote on this proposal?", portuguese: "Podemos votar sobre esta proposta?", level: 'básico', context: 'Reuniões' },
      { english: "Let's adjourn the meeting.", portuguese: "Vamos encerrar a reunião.", level: 'médio', context: 'Reuniões' },
      { english: "I need to see the ROI on this.", portuguese: "Preciso ver o ROI disso.", level: 'avançado', context: 'Negócios' },
      { english: "What's our burn rate?", portuguese: "Qual é nossa taxa de queima?", level: 'avançado', context: 'Negócios' },
      { english: "We need to scale this operation.", portuguese: "Precisamos escalar esta operação.", level: 'médio', context: 'Negócios' },
      { english: "Let's optimize our workflow.", portuguese: "Vamos otimizar nosso fluxo de trabalho.", level: 'médio', context: 'Negócios' },
      { english: "We're pivoting our strategy.", portuguese: "Estamos mudando nossa estratégia.", level: 'avançado', context: 'Negócios' },
      { english: "I need to escalate this issue.", portuguese: "Preciso escalar esta questão.", level: 'médio', context: 'Gestão' },
      { english: "Let's do a stakeholder analysis.", portuguese: "Vamos fazer uma análise de stakeholders.", level: 'avançado', context: 'Gestão' },
      { english: "We need better visibility into this process.", portuguese: "Precisamos de melhor visibilidade deste processo.", level: 'avançado', context: 'Gestão' },
      { english: "Can we streamline this workflow?", portuguese: "Podemos simplificar este fluxo de trabalho?", level: 'médio', context: 'Gestão' },
      { english: "Let's establish a baseline.", portuguese: "Vamos estabelecer uma linha de base.", level: 'avançado', context: 'Gestão' },
      { english: "I need you to take ownership of this.", portuguese: "Preciso que você assuma a responsabilidade disso.", level: 'médio', context: 'Gestão' },
      { english: "Let's conduct a risk assessment.", portuguese: "Vamos conduzir uma avaliação de risco.", level: 'avançado', context: 'Gestão' },
      { english: "We need to implement quality controls.", portuguese: "Precisamos implementar controles de qualidade.", level: 'avançado', context: 'Gestão' },
      { english: "Can we automate this process?", portuguese: "Podemos automatizar este processo?", level: 'médio', context: 'Gestão' },
      { english: "Let's do a cost-benefit analysis.", portuguese: "Vamos fazer uma análise de custo-benefício.", level: 'avançado', context: 'Gestão' },
      { english: "I need to delegate this task.", portuguese: "Preciso delegar esta tarefa.", level: 'básico', context: 'Gestão' },
      { english: "Let's create a project roadmap.", portuguese: "Vamos criar um roteiro do projeto.", level: 'médio', context: 'Gestão' },
      { english: "We need to align on objectives.", portuguese: "Precisamos nos alinhar sobre os objetivos.", level: 'médio', context: 'Gestão' },
      { english: "Can we get a status update?", portuguese: "Podemos ter uma atualização de status?", level: 'básico', context: 'Gestão' },
      { english: "Let's schedule regular check-ins.", portuguese: "Vamos agendar verificações regulares.", level: 'médio', context: 'Gestão' },
      { english: "I want to congratulate the team.", portuguese: "Quero parabenizar a equipe.", level: 'básico', context: 'Reconhecimento' },
      
      // Networking e relacionamentos
      { english: "I'd like to introduce you to my colleague.", portuguese: "Gostaria de apresentá-lo ao meu colega.", level: 'básico', context: 'Networking' },
      { english: "What line of work are you in?", portuguese: "Em que área você trabalha?", level: 'básico', context: 'Networking' },
      { english: "Let me give you my business card.", portuguese: "Deixe-me dar meu cartão de visita.", level: 'básico', context: 'Networking' },
      { english: "I'd love to connect on LinkedIn.", portuguese: "Adoraria me conectar no LinkedIn.", level: 'básico', context: 'Networking' },
      { english: "We should grab coffee sometime.", portuguese: "Deveríamos tomar um café algum dia.", level: 'médio', context: 'Networking' },
      { english: "I'd like to pick your brain about something.", portuguese: "Gostaria de pedir sua opinião sobre algo.", level: 'avançado', context: 'Networking' },
      { english: "Do you know anyone in marketing?", portuguese: "Você conhece alguém no marketing?", level: 'básico', context: 'Networking' },
      { english: "I'm looking to expand my network.", portuguese: "Estou procurando expandir minha rede.", level: 'médio', context: 'Networking' },
      { english: "Can you make an introduction?", portuguese: "Você pode fazer uma apresentação?", level: 'médio', context: 'Networking' },
      { english: "I'd appreciate any referrals.", portuguese: "Apreciaria qualquer indicação.", level: 'médio', context: 'Networking' },
      
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
      
      // Negociação e vendas
      { english: "What's your budget for this project?", portuguese: "Qual é seu orçamento para este projeto?", level: 'médio', context: 'Negociação' },
      { english: "I think we can work something out.", portuguese: "Acho que podemos chegar a um acordo.", level: 'médio', context: 'Negociação' },
      { english: "Let's find a win-win solution.", portuguese: "Vamos encontrar uma solução que beneficie ambos.", level: 'médio', context: 'Negociação' },
      { english: "I'm authorized to offer you a discount.", portuguese: "Estou autorizado a oferecer um desconto.", level: 'médio', context: 'Negociação' },
      { english: "That's our best and final offer.", portuguese: "Essa é nossa melhor e última oferta.", level: 'médio', context: 'Negociação' },
      { english: "Can we split the difference?", portuguese: "Podemos dividir a diferença?", level: 'médio', context: 'Negociação' },
      { english: "I need to run this by my manager.", portuguese: "Preciso consultar meu gerente.", level: 'básico', context: 'Negociação' },
      { english: "What would it take to close this deal today?", portuguese: "O que seria necessário para fechar este negócio hoje?", level: 'avançado', context: 'Negociação' },
      { english: "I appreciate your position, but...", portuguese: "Entendo sua posição, mas...", level: 'médio', context: 'Negociação' },
      { english: "Let's table that for now.", portuguese: "Vamos deixar isso para depois.", level: 'médio', context: 'Negociação' },
      
      // Atendimento ao cliente
      { english: "How can I help you today?", portuguese: "Como posso ajudá-lo hoje?", level: 'básico', context: 'Atendimento' },
      { english: "I apologize for the inconvenience.", portuguese: "Peço desculpas pelo inconveniente.", level: 'básico', context: 'Atendimento' },
      { english: "Let me look into that for you.", portuguese: "Deixe-me verificar isso para você.", level: 'básico', context: 'Atendimento' },
      { english: "I understand your frustration.", portuguese: "Entendo sua frustração.", level: 'básico', context: 'Atendimento' },
      { english: "We'll make this right.", portuguese: "Vamos resolver isso.", level: 'básico', context: 'Atendimento' },
      { english: "Is there anything else I can do for you?", portuguese: "Há mais alguma coisa que posso fazer por você?", level: 'básico', context: 'Atendimento' },
      { english: "I'll escalate this to my supervisor.", portuguese: "Vou escalar isso para meu supervisor.", level: 'médio', context: 'Atendimento' },
      { english: "We value your business.", portuguese: "Valorizamos seu negócio.", level: 'básico', context: 'Atendimento' },
      { english: "Thank you for bringing this to our attention.", portuguese: "Obrigado por trazer isso à nossa atenção.", level: 'médio', context: 'Atendimento' },
      { english: "I'll follow up with you by email.", portuguese: "Vou acompanhar com você por email.", level: 'médio', context: 'Atendimento' }
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