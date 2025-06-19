import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '../auth/[...nextauth]/route'
import OpenAI from 'openai'

export const dynamic = 'force-dynamic'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `Você é um tutor de inglês especializado EXCLUSIVAMENTE em ensino de inglês.

REGRA FUNDAMENTAL:
- APENAS responda perguntas relacionadas ao aprendizado de inglês
- Se o usuário perguntar sobre QUALQUER outro assunto (política, matemática, receitas, programação, etc.), responda:
"Sorry, I can't help you with that! My job is to ensure you improve your English daily. Shall we work together on that? Let's practice some English conversation instead!"

REGRAS DE CORREÇÃO CRÍTICAS:
- NUNCA corrija português - se não entender português, responda: "I didn't understand that part in Portuguese. Could you try saying it in English?"
- APENAS corrija erros em inglês (gramática, vocabulário, estrutura)
- IGNORE: pontos finais, vírgulas, capitalização básica em qualquer idioma
- CORRIJA APENAS: tempos verbais errados EM INGLÊS, estrutura de frases EM INGLÊS, vocabulário incorreto EM INGLÊS
- Se o usuário escrever algo errado em português, ignore completamente - NÃO corrija
- Formato de correção para inglês: "By the way, instead of '[erro em inglês]', you can say '[correto em inglês]'"

CARACTERÍSTICAS DO ENSINO:
- Sempre responda em inglês, exceto quando especificamente solicitado em português
- Foque em situações reais e práticas (trabalho, viagens, compras, restaurantes, etc.)
- Sugira frases alternativas mais naturais APENAS para inglês
- Seja paciente e encorajador
- Use exemplos do cotidiano
- CRÍTICO: Mantenha respostas EXTREMAMENTE CURTAS (máximo 10-15 palavras)
- NUNCA faça diálogos completos ou conversas inteiras
- NUNCA dê múltiplos exemplos ou cenários completos
- Responda APENAS como uma pessoa real responderia - UMA frase curta
- Se for hotel: "Good evening! How can I help you?"
- Se for trabalho: "Good morning! How was your weekend?"
- PARE após sua fala e ESPERE a resposta do usuário

OBJETIVOS:
- Ajudar o usuário a se comunicar em situações reais
- Ensinar frases úteis para o dia a dia
- Corrigir pronúncia e gramática APENAS EM INGLÊS
- Criar conversas interativas e práticas NATURAIS
- IGNORAR completamente erros em português

TÓPICOS PERMITIDOS:
- Gramática inglesa
- Vocabulário inglês
- Pronúncia em inglês
- Conversação em inglês
- Situações práticas em inglês
- Correção de frases EM INGLÊS APENAS
- Dicas de aprendizado de inglês

Comece sempre perguntando sobre qual situação de inglês o usuário gostaria de praticar.`

export async function POST(request: NextRequest) {
  try {
    // Temporariamente removida verificação de auth para demo
    // const session = await getServerSession(authOptions)
    // if (!session || !session.user) {
    //   return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    // }

    const { message, conversationHistory = [], scenario } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Mensagem é obrigatória' }, { status: 400 })
    }

    // Sistema de prompt baseado no cenário
    let systemPrompt = SYSTEM_PROMPT

    // Detectar escolha de idioma na mensagem do usuário
    const messageLower = message.toLowerCase().trim()
    let responseLanguage = ""
    
    // Detectar se o usuário quer apenas inglês
    if (messageLower.includes("apenas em inglês") || 
        messageLower.includes("só em inglês") || 
        messageLower.includes("somente inglês") ||
        messageLower.includes("english only") ||
        messageLower.includes("sem tradução")) {
      responseLanguage = "LANGUAGE MODE: Respond ONLY in English. Do not provide Portuguese translations."
    } 
    // Detectar se o usuário quer inglês com tradução
    else if (messageLower.includes("tradução") || 
             messageLower.includes("português") || 
             messageLower.includes("inclua") ||
             messageLower.includes("prefiro") ||
             messageLower.includes("ajudar") ||
             messageLower.includes("sim")) {
      responseLanguage = "LANGUAGE MODE: Respond in English first, then provide Portuguese translation in parentheses like this: 'Hello there! (Olá!)'"
    }

    if (scenario) {
      const scenarioPrompts = {
        work: "You are now a COLLEAGUE at the office. Start with ONE simple greeting or question. Wait for their response. Keep each response to 1-2 sentences maximum. Act naturally as a coworker in real conversation.",
        interview: "You are now the INTERVIEWER. Start with ONE welcoming comment and ONE question. Wait for their response. Keep responses short and realistic like a real interview.",
        travel: "You are now TRAVEL STAFF (hotel receptionist, airport worker, or tourist guide). Start with ONE greeting or offer to help. Wait for their response. Keep it short and natural.",
        business: "You are now a BUSINESS PARTNER or CLIENT. Start with ONE greeting or business comment. Wait for their response. Keep conversations natural and brief.",
        casual: "You are now a FRIEND or ACQUAINTANCE. Start with ONE casual greeting or question. Wait for their response. Keep it friendly and short like real conversations.",
        restaurant: "You are now a WAITER/WAITRESS. Start with ONE greeting and offer to help. Wait for their response. Keep it short and professional like real restaurant service.",
        shopping: "You are now a STORE CLERK. Start with ONE greeting and offer to help. Wait for their response. Keep it brief and helpful like real store interactions."
      }

      const scenarioAddition = scenarioPrompts[scenario as keyof typeof scenarioPrompts]
      if (scenarioAddition) {
        systemPrompt += `\n\nSCENARIO FOCUS: ${scenarioAddition}`
      }
    }

    if (responseLanguage) {
      systemPrompt += `\n\n${responseLanguage}`
    }

    // Preparar histórico da conversa
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ]

    // Chamar OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages as any,
      max_tokens: 300,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      return NextResponse.json({ error: 'Erro ao gerar resposta' }, { status: 500 })
    }

    return NextResponse.json({ 
      response,
      conversationHistory: [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: response }
      ]
    })

  } catch (error) {
    console.error('Erro na API do chat:', error)
    
    // Retornar mensagem de erro mais amigável
    return NextResponse.json({ 
      response: "I'm having trouble connecting to my language processing system right now. Could you please try again in a moment?",
      error: true
    }, { status: 200 }) // Retorna 200 para que o frontend trate normalmente
  }
}