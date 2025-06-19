import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Função para extrair apenas texto em inglês
function extractEnglishText(text: string): string {
  // Remover emojis e símbolos comuns
  let cleanText = text.replace(/[🇬🇧🇺🇸👋💼✈️🤝☕🍽️🛒🤖⚡🌟🚀🎯📊🔊🎵🔇]/g, '')
  
  // Dividir o texto por quebras de linha ou patterns comuns
  const lines = cleanText.split(/\n+/)
  
  // Filtrar linhas que contêm texto em inglês
  const englishLines = lines.filter(line => {
    const trimmed = line.trim()
    if (!trimmed) return false
    
    // Remover linhas que são claramente português
    const portuguesePatterns = [
      /^(olá|oi|bom dia|boa tarde|boa noite)/i,
      /^(eu sou|estou aqui|vamos praticar)/i,
      /(português|aqui para|ajudá-lo|melhorar sua)/i,
      /(gostaria de|você quer|que tal)/i,
      /(tradução em português|resposta em português)/i,
      /^(perfeito|excelente|ótima escolha|legal)/i
    ]
    
    // Se contém patterns em português, pular
    if (portuguesePatterns.some(pattern => pattern.test(trimmed))) {
      return false
    }
    
    // Manter linhas que parecem ser inglês
    const englishPatterns = [
      /^(hello|hi|good morning|good afternoon|good evening)/i,
      /^(i am|i'm|let's practice|what would you like)/i,
      /(english|practice|conversation|grammar)/i,
      /^(perfect|excellent|great choice|nice)/i,
      /^(can you|could you|would you|do you)/i,
      /^(the|a|an|this|that|these|those)/i
    ]
    
    // Se contém patterns em inglês, manter
    if (englishPatterns.some(pattern => pattern.test(trimmed))) {
      return true
    }
    
    // Para outras linhas, verificar se tem mais caracteres típicos do inglês
    const hasEnglishWords = /\b(the|and|or|is|are|was|were|have|has|had|will|would|can|could|should|my|your|his|her|our|their)\b/i.test(trimmed)
    
    return hasEnglishWords
  })
  
  return englishLines.join(' ').trim()
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ error: 'Texto é obrigatório' }, { status: 400 })
    }

    // Extrair apenas o texto em inglês (remover português)
    const englishOnly = extractEnglishText(text)
    
    if (!englishOnly.trim()) {
      return NextResponse.json({ error: 'Nenhum texto em inglês encontrado' }, { status: 400 })
    }

    // Gerar áudio usando OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: "tts-1-hd", // HD para melhor qualidade
      voice: "alloy", // Voz feminina fluida e natural
      input: englishOnly,
      speed: 0.9 // Velocidade um pouco mais lenta para aprendizado
    })

    // Converter para buffer
    const buffer = Buffer.from(await mp3.arrayBuffer())

    // Retornar o áudio como resposta
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
      },
    })

  } catch (error) {
    console.error('Erro na API TTS:', error)
    return NextResponse.json({ 
      error: 'Erro ao gerar áudio' 
    }, { status: 500 })
  }
}