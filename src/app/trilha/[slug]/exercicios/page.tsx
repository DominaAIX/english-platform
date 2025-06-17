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

interface Trail {
  title: string
  icon: string
  description: string
  exercises?: Exercise[]
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

function ExercisePageClient({ trailData, slug }: { trailData: Trail, slug: string }) {
  const { user, userProfile } = useAuth()
  const { 
    isExercisesBlocked, 
    incrementExercises, 
    getRemainingExercises, 
    getTimeUntilReset,
    isPremium 
  } = useGlobalLimits()
  const router = useRouter()
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<string[]>([])

  const exercises = trailData.exercises || []
  const currentExercise = exercises[currentExerciseIndex]
  const progress = (completedExercises.length / exercises.length) * 100

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

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1)
    }
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
                {completedExercises.length}/{exercises.length} exercícios
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
            timeUntilReset={getTimeUntilReset()}
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
              Pratique montando frases com arrastar e soltar
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-sm text-gray-400">
              Progresso: {Math.round(progress)}%
            </div>
          </div>
        </PageTransition>

        {/* Current Exercise */}
        <PageTransition delay={400}>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">
                Exercício {currentExerciseIndex + 1} de {exercises.length}
              </h2>
              {completedExercises.includes(currentExercise.id) && (
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                  ✓ Concluído
                </span>
              )}
            </div>
            
            <DragDropExercise
              exercise={currentExercise}
              onComplete={handleExerciseComplete}
            />
          </div>
        </PageTransition>

        {/* Navigation */}
        <PageTransition delay={600}>
          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={handlePrevious}
              disabled={currentExerciseIndex === 0}
              className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full text-white font-semibold transition-colors"
            >
              ← Anterior
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentExerciseIndex === exercises.length - 1}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
            >
              {currentExerciseIndex === exercises.length - 1 ? 'Finalizado' : 'Próximo →'}
            </button>
          </div>
        </PageTransition>

        {/* Exercise List */}
        <PageTransition delay={800}>
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Lista de Exercícios
            </h3>
            <div className="grid gap-3">
              {exercises.map((exercise, index) => (
                <div 
                  key={exercise.id}
                  onClick={() => setCurrentExerciseIndex(index)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    index === currentExerciseIndex 
                      ? 'border-purple-500 bg-purple-900/20' 
                      : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">
                        {exercise.correctSentence}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {exercise.translation}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 text-sm">
                        Exercício {index + 1}
                      </span>
                      {completedExercises.includes(exercise.id) && (
                        <span className="text-green-400 text-xl">✓</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageTransition>

        {/* Completion Message */}
        {completedExercises.length === exercises.length && (
          <PageTransition delay={1000}>
            <div className="mt-8 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/30 rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                🎉 Parabéns! Você completou todos os exercícios!
              </h3>
              <p className="text-gray-300 mb-6">
                Excelente trabalho! Você dominou todas as frases desta trilha.
              </p>
              <div className="flex gap-4 justify-center">
                <Link 
                  href={`/trilha/${slug}`}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-3 rounded-full text-white font-bold transition-all duration-300"
                >
                  ← Voltar para Trilha
                </Link>
                <Link 
                  href="/dashboard"
                  className="bg-gray-700 hover:bg-gray-600 px-8 py-3 rounded-full text-white font-bold transition-colors"
                >
                  Ver Outras Trilhas
                </Link>
              </div>
            </div>
          </PageTransition>
        )}
        </>
        )}
      </div>
    </AnimatedContainer>
  )
}