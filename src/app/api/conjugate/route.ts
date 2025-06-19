import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { verb } = await request.json()

    if (!verb || typeof verb !== 'string') {
      return NextResponse.json(
        { error: 'Verbo é obrigatório' },
        { status: 400 }
      )
    }

    const prompt = `Conjugue o verbo "${verb}" em inglês em todos os tempos verbais principais. 
    
    Retorne APENAS um JSON válido com esta estrutura exata:
    {
      "verb": "${verb}",
      "conjugations": {
        "presentSimple": ["I ${verb}", "You ${verb}", "He/She/It ${verb}s", "We ${verb}", "You ${verb}", "They ${verb}"],
        "presentContinuous": ["I am ${verb}ing", "You are ${verb}ing", "He/She/It is ${verb}ing", "We are ${verb}ing", "You are ${verb}ing", "They are ${verb}ing"],
        "presentPerfect": ["I have ${verb}ed", "You have ${verb}ed", "He/She/It has ${verb}ed", "We have ${verb}ed", "You have ${verb}ed", "They have ${verb}ed"],
        "presentPerfectContinuous": ["I have been ${verb}ing", "You have been ${verb}ing", "He/She/It has been ${verb}ing", "We have been ${verb}ing", "You have been ${verb}ing", "They have been ${verb}ing"],
        "pastSimple": ["I ${verb}ed", "You ${verb}ed", "He/She/It ${verb}ed", "We ${verb}ed", "You ${verb}ed", "They ${verb}ed"],
        "pastContinuous": ["I was ${verb}ing", "You were ${verb}ing", "He/She/It was ${verb}ing", "We were ${verb}ing", "You were ${verb}ing", "They were ${verb}ing"],
        "pastPerfect": ["I had ${verb}ed", "You had ${verb}ed", "He/She/It had ${verb}ed", "We had ${verb}ed", "You had ${verb}ed", "They had ${verb}ed"],
        "pastPerfectContinuous": ["I had been ${verb}ing", "You had been ${verb}ing", "He/She/It had been ${verb}ing", "We had been ${verb}ing", "You had been ${verb}ing", "They had been ${verb}ing"],
        "futureSimple": ["I will ${verb}", "You will ${verb}", "He/She/It will ${verb}", "We will ${verb}", "You will ${verb}", "They will ${verb}"],
        "futureContinuous": ["I will be ${verb}ing", "You will be ${verb}ing", "He/She/It will be ${verb}ing", "We will be ${verb}ing", "You will be ${verb}ing", "They will be ${verb}ing"],
        "futurePerfect": ["I will have ${verb}ed", "You will have ${verb}ed", "He/She/It will have ${verb}ed", "We will have ${verb}ed", "You will have ${verb}ed", "They will have ${verb}ed"],
        "futurePerfectContinuous": ["I will have been ${verb}ing", "You will have been ${verb}ing", "He/She/It will have been ${verb}ing", "We will have been ${verb}ing", "You will have been ${verb}ing", "They will have been ${verb}ing"]
      }
    }

    IMPORTANTE: 
    - Use as conjugações CORRETAS para verbos irregulares (be -> am/is/are, was/were, been)
    - Para verbos regulares, siga as regras padrão (-ed, -ing, etc.)
    - Para verbos que terminam em 'e', remova o 'e' antes de adicionar -ing
    - Para verbos que dobram a consoante final, aplique a regra corretamente
    - Retorne APENAS o JSON, sem texto adicional`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em gramática inglesa. Retorne apenas JSON válido com conjugações precisas."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 2000,
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      throw new Error('Resposta vazia da OpenAI')
    }

    try {
      const conjugationData = JSON.parse(response)
      return NextResponse.json(conjugationData)
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON:', parseError)
      console.error('Resposta da OpenAI:', response)
      throw new Error('Resposta inválida da IA')
    }

  } catch (error) {
    console.error('Erro ao conjugar verbo:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}