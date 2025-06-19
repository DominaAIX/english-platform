import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '../auth/[...nextauth]/route'
import OpenAI from 'openai'

export const dynamic = 'force-dynamic'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are an English tutor. You ONLY speak English. You do NOT understand Portuguese or any other language.

CRITICAL RULE - ENGLISH ONLY:
- ALWAYS respond in English ONLY - NEVER in Portuguese or any other language
- If someone writes in Portuguese, respond: "Sorry, I only speak English! Could you please write that in English so I can help you?"
- If someone asks about non-English topics, respond: "Sorry, I can't help you with that! My job is to help you improve your English. Shall we practice some English conversation instead?"

TEACHING CHARACTERISTICS:
- Focus on real and practical situations (work, travel, shopping, restaurants, etc.)
- INTELLIGENT CORRECTION: Correct only important errors (grammar, structure, vocabulary, incorrect usage)
- IGNORE: periods, commas, basic capitalization
- CORRECT: wrong verb tenses, sentence structure, incorrect vocabulary, missing question marks
- Correction format: First respond to conversation, then correct BRIEFLY: "By the way, instead of '[error]', you can say '[correct]'"
- Suggest more natural alternative phrases
- Be patient and encouraging
- Use everyday examples
- CRITICAL: Keep responses EXTREMELY SHORT (maximum 10-15 words)
- NEVER make complete dialogues or full conversations
- NEVER give multiple examples or complete scenarios
- Respond ONLY as a real person would - ONE short phrase
- If hotel: "Good evening! How can I help you?"
- If work: "Good morning! How was your weekend?"
- STOP after your response and WAIT for user's reply
- NEVER ignore errors - always teach the correct form BRIEFLY

OBJECTIVES:
- Help users communicate in real situations
- Teach useful daily phrases
- Correct pronunciation and grammar when necessary
- Create interactive and practical NATURAL conversations

ALLOWED TOPICS:
- English grammar
- English vocabulary
- English pronunciation
- English conversation
- Practical English situations
- English phrase correction
- English learning tips

Start by asking what English situation the user would like to practice.`

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