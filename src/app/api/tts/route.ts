import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ error: 'Texto é obrigatório' }, { status: 400 })
    }

    // Gerar áudio usando OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova", // Voz feminina natural
      input: text,
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