'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import { useAuth } from '@/contexts/AuthContext'
import PageTransition from '@/components/PageTransition'
import AnimatedContainer from '@/components/AnimatedContainer'

interface Trail {
  title: string
  icon: string
  description: string
  exercises?: any[]
  phrases?: any[]
}

interface PracticePageProps {
  params: Promise<{ slug: string }>
}

const trailsData: { [key: string]: Trail } = {
  trabalho: {
    title: 'Inglês para Trabalho',
    icon: '💼',
    description: 'Frases essenciais para reuniões, e-mails e apresentações profissionais',
    exercises: [
      {
        id: 'trabalho-ex-1',
        correctSentence: 'Good morning team!',
        words: ['Good', 'morning', 'team!'],
        translation: 'Bom dia, equipe!'
      }
    ]
  },
  viagens: {
    title: 'Inglês para Viagens',
    icon: '✈️',
    description: 'Frases essenciais para aeroporto, hotel, restaurante e turismo',
    exercises: [
      {
        id: 'viagens-ex-1',
        correctSentence: 'Where is the boarding gate?',
        words: ['Where', 'is', 'the', 'boarding', 'gate?'],
        translation: 'Onde fica o portão de embarque?'
      }
    ]
  },
  mercado: {
    title: 'Inglês para Mercado/Compras',
    icon: '🛒',
    description: 'Frases para compras, preços e formas de pagamento',
    exercises: [
      {
        id: 'mercado-ex-1',
        correctSentence: 'How much does this cost?',
        words: ['How', 'much', 'does', 'this', 'cost?'],
        translation: 'Quanto custa isso?'
      }
    ]
  },
  passeios: {
    title: 'Inglês para Passeios',
    icon: '🚶‍♂️',
    description: 'Frases para passeios, tickets e atrações turísticas',
    exercises: [
      {
        id: 'passeios-ex-1',
        correctSentence: 'How much is the ticket?',
        words: ['How', 'much', 'is', 'the', 'ticket?'],
        translation: 'Quanto custa o ingresso?'
      }
    ]
  },
  amigos: {
    title: 'Inglês para Amigos',
    icon: '👥',
    description: 'Convites, conversas casuais e socialização',
    exercises: [
      {
        id: 'amigos-ex-1',
        correctSentence: 'Would you like to hang out?',
        words: ['Would', 'you', 'like', 'to', 'hang', 'out?'],
        translation: 'Você gostaria de sair?'
      }
    ]
  },
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
      }
    ]
  }
}

export default async function PracticePage({ params }: PracticePageProps) {
  const { slug } = await params
  const trailData = trailsData[slug as keyof typeof trailsData]

  if (!trailData) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
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

  return <PracticePageClient trailData={trailData} slug={slug} />
}

function PracticePageClient({ trailData, slug }: { trailData: Trail, slug: string }) {
  const { user, userProfile } = useAuth()
  const router = useRouter()
  
  // Usar plano real do usuário ou fallback para free
  const userPlan = userProfile?.plan || 'free'
  

  const handleLogoClick = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  return (
    <AnimatedContainer className="min-h-screen bg-gray-950">
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
              
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </header>
      </PageTransition>

      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <PageTransition delay={200}>
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{trailData.icon}</div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Como você quer praticar?
            </h1>
            <p className="text-gray-400 text-lg">
              Escolha o tipo de prática que mais combina com você
            </p>
          </div>
        </PageTransition>

        {/* Practice Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* Exercícios de Construção */}
          <PageTransition delay={400}>
            <div className={`bg-gradient-to-br ${userPlan === 'free' ? 'from-gray-900/50 to-gray-800/50' : 'from-purple-900/50 to-indigo-900/50'} border ${userPlan === 'free' ? 'border-gray-600/50' : 'border-purple-500/30'} rounded-xl p-8 ${userPlan === 'premium' ? 'hover:border-purple-400/50' : ''} transition-all duration-300 group h-full flex flex-col`}
            >
              <div className="text-center flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-6">
                    🧩
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Exercícios de Construção
                  </h3>
                </div>
                
                {userPlan === 'free' && (
                  <div className="space-y-6 flex-1 flex flex-col justify-center">
                    <div className="text-4xl mb-4">🔒</div>
                    <h4 className="text-xl font-bold text-white mb-3">
                      Disponível apenas para Premium
                    </h4>
                    <p className="text-gray-300 text-sm mb-6">
                      Desbloqueie exercícios interativos e muito mais!
                    </p>
                    <button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-6 py-3 rounded-xl text-white font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-500/20">
                      ⭐ Fazer Upgrade para Premium
                    </button>
                  </div>
                )}

                {userPlan === 'premium' && (
                  <>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Pratique montando frases corretas arrastando e soltando palavras. 
                      Ideal para treinar a estrutura das frases em inglês.
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm text-purple-300">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        <span>Arrastar e soltar palavras</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-purple-300">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        <span>Feedback imediato</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-purple-300">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        <span>{trailData.exercises?.length || 5} exercícios disponíveis</span>
                      </div>
                    </div>

                    <div 
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-6 py-3 rounded-xl text-white font-bold transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20 cursor-pointer"
                      onClick={() => router.push(`/trilha/${slug}/exercicios`)}
                    >
                      🚀 Começar Exercícios
                    </div>
                  </>
                )}
              </div>
            </div>
          </PageTransition>

          {/* Frases do Dia a Dia */}
          <PageTransition delay={600}>
            <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border border-cyan-500/30 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer h-full flex flex-col"
              onClick={() => router.push(`/trilha/${slug}`)}
            >
              <div className="text-center flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    💬
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Frases Mais Usadas
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Aprenda e pratique frases que você realmente vai usar no seu dia a dia. 
                    Com áudio, tradução e contexto de uso.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-cyan-300">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                      <span>Frases práticas e úteis</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-cyan-300">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                      <span>Áudio e pronúncia</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-cyan-300">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                      <span>Contexto de uso real</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-6 py-3 rounded-xl text-white font-bold transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
                  📚 Ver Frases
                </div>
              </div>
            </div>
          </PageTransition>
        </div>

        {/* Premium Benefits para usuários free */}
        {userPlan === 'free' && (
          <PageTransition delay={800}>
            <div className="mt-12">
              <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/50 rounded-xl p-8 max-w-3xl mx-auto">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-white mb-3">
                    ⭐ Desbloqueie Todo o Potencial do Inglês pra Já
                  </h4>
                  <p className="text-gray-300">
                    Veja o que você ganha com o plano Premium:
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <span className="text-white font-medium">Exercícios interativos de construção</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <span className="text-white font-medium">Acesso ilimitado a todas as frases</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <span className="text-white font-medium">Filtros por nível de dificuldade</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <span className="text-white font-medium">Progresso detalhado e estatísticas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <span className="text-white font-medium">Novas trilhas e exercícios mensais</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <span className="text-white font-medium">Suporte prioritário</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-500/20">
                    🚀 Assinar Premium Agora
                  </button>
                  <p className="text-gray-400 text-sm mt-3">
                    Planos a partir de R$ 29,90/mês
                  </p>
                </div>
              </div>
            </div>
          </PageTransition>
        )}


        {/* Additional Info para usuários premium */}
        {userPlan === 'premium' && (
          <PageTransition delay={800}>
            <div className="mt-12 text-center">
              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 max-w-2xl mx-auto">
                <h4 className="text-lg font-semibold text-white mb-3">
                  💡 Dica de Estudo
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Para um aprendizado mais efetivo, recomendamos alternar entre os dois tipos de prática. 
                  Use os <span className="text-purple-400 font-semibold">exercícios</span> para treinar a estrutura 
                  e as <span className="text-cyan-400 font-semibold">frases do dia a dia</span> para ganhar fluência natural.
                </p>
              </div>
            </div>
          </PageTransition>
        )}
      </div>
    </AnimatedContainer>
  )
}