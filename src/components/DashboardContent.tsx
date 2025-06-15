'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from './Logo'
import AuthButton from './AuthButton'
import { useAuth } from '@/contexts/AuthContext'
import { useStats } from '@/contexts/StatsContext'
import PageTransition from './PageTransition'
import AnimatedContainer from './AnimatedContainer'

export default function DashboardContent() {
  const { user, userProfile } = useAuth()
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const { stats, getTotalPhrasesPracticed, getPremiumTimeFormatted } = useStats()
  
  // Usar o plano real do usuário autenticado do userProfile
  const userPlan = userProfile?.plan || 'free'

  // Função para obter saudação baseada no horário
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) {
      return 'Bom dia'
    } else if (hour < 18) {
      return 'Boa tarde'
    } else {
      return 'Boa noite'
    }
  }

  // Função para obter nome do usuário
  const getUserDisplayName = () => {
    // Tentar pegar o nome do user metadata primeiro
    const name = (user as any)?.user_metadata?.name || (user as any)?.name
    if (name) {
      return name.split(' ')[0] // Apenas o primeiro nome
    }
    
    // Se não tiver nome, usar o email sem o domínio
    const email = userProfile?.email || (user as any)?.email
    if (email) {
      return email.split('@')[0]
    }
    
    return 'Usuário'
  }

  const handleLogoClick = () => {
    // No dashboard, o logo pode só recarregar ou não fazer nada
    // Mas vou manter a consistência
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  const demoUser = {
    name: 'Usuário',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
  }

  const trails = [
    { icon: '💼', title: 'Trabalho', desc: 'Reuniões, e-mails, feedbacks', slug: 'trabalho', color: 'from-blue-500 to-cyan-500' },
    { icon: '✈️', title: 'Viagens', desc: 'Aeroporto, hotel, restaurante', slug: 'viagens', color: 'from-green-500 to-emerald-500' },
    { icon: '🛒', title: 'Mercado', desc: 'Preços, formas de pagamento', slug: 'mercado', color: 'from-yellow-500 to-orange-500' },
    { icon: '🚶‍♂️', title: 'Passeios', desc: 'Tickets, atrações, direções', slug: 'passeios', color: 'from-purple-500 to-pink-500' },
    { icon: '👥', title: 'Amigos', desc: 'Convites, conversas casuais', slug: 'amigos', color: 'from-indigo-500 to-purple-500' },
    { icon: '🎉', title: 'Eventos', desc: 'Networking, palestras + Exercícios', slug: 'eventos', color: 'from-pink-500 to-rose-500' }
  ]

  return (
    <AnimatedContainer className="min-h-screen">
      {/* Header */}
      <PageTransition>
        <header className="bg-gray-900/50 border-b border-gray-700 p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
<Logo size="md" />
              <span className="text-white font-bold">Inglês pra Já</span>
            </button>
            <AuthButton />
          </div>
        </header>
      </PageTransition>

      <div className="max-w-6xl mx-auto p-6">
        {/* Welcome Section */}
        <PageTransition>
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img 
                src={(user as any)?.image || demoUser.image}
                alt={(user as any)?.name || demoUser.name}
                className="w-20 h-20 rounded-full border-4 border-purple-500/30"
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {getGreeting()}, {getUserDisplayName()}! 👋
            </h1>
            <p className="text-gray-400 text-lg">
              Como você gostaria de praticar inglês hoje?
            </p>
          </div>
        </PageTransition>

        {/* Main Options */}
        <PageTransition>
          <div className="grid md:grid-cols-2 gap-8 mb-12 items-stretch">
            {/* Chat com Tutor AI */}
            <Link href="/chat" className="h-full">
              <div 
                className="group bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border-2 border-purple-500/30 rounded-3xl p-8 hover:border-purple-400/50 transition-all duration-300 cursor-pointer transform hover:scale-105 h-full flex flex-col"
                onMouseEnter={() => setHoveredCard('chat')}
                onMouseLeave={() => setHoveredCard(null)}
              >
              <div className="text-center flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    🤖
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Conversar com Tutor AI
                  </h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Pratique conversação em tempo real com nossa IA especializada. 
                    Personalize situações, receba feedback e melhore sua fluência.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                      Conversação
                    </span>
                    <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
                      Feedback IA
                    </span>
                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                      Personalizado
                    </span>
                  </div>
                </div>
                <div className="text-purple-400 group-hover:text-purple-300 transition-colors font-semibold">
                  Começar Conversa →
                </div>
              </div>
            </div>
          </Link>

          {/* Trilhas de Aprendizado */}
          <div className="h-full flex flex-col space-y-4">
            <div 
              className="group bg-gradient-to-br from-green-900/30 to-blue-900/30 border-2 border-green-500/30 rounded-3xl p-8 hover:border-green-400/50 transition-all duration-300 cursor-pointer flex-1 flex flex-col"
              onMouseEnter={() => setHoveredCard('trails')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="text-center flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    🎯
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Trilhas de Aprendizado
                  </h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Frases práticas organizadas por situações do dia a dia. 
                    Aprenda inglês que você realmente vai usar.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                      Prático
                    </span>
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                      Estruturado
                    </span>
                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                      Progressivo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de Trilhas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {trails.map((trail, index) => (
                <Link key={index} href={`/trilha/${trail.slug}/praticar`}>
                  <div className="relative group">
                    {/* Background com gradiente translúcido */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${trail.color} opacity-20 rounded-2xl transition-all duration-300 group-hover:opacity-30`}></div>
                    
                    {/* Border com gradiente */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${trail.color} opacity-40 rounded-2xl p-[1px] transition-all duration-300 group-hover:opacity-60`}>
                      <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl h-full w-full"></div>
                    </div>
                    
                    {/* Conteúdo */}
                    <div className="relative p-5 text-center backdrop-blur-sm rounded-2xl transition-all duration-300 group-hover:transform group-hover:scale-105">
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                        {trail.icon}
                      </div>
                      <h3 className="text-white font-semibold text-sm mb-2 drop-shadow-sm">
                        {trail.title}
                      </h3>
                      <p className="text-white/70 text-xs leading-relaxed">
                        {trail.desc.split(',')[0]}
                      </p>
                    </div>
                    
                    {/* Efeito de brilho no hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className={`absolute inset-0 bg-gradient-to-br ${trail.color} opacity-10 rounded-2xl blur-xl`}></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        </PageTransition>

        {/* Stats Section */}
        <PageTransition>
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Seu Progresso Total
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{getTotalPhrasesPracticed()}</div>
              <div className="text-gray-400 text-sm">Frases Praticadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{stats.aiMessagesCount}</div>
              <div className="text-gray-400 text-sm">Mensagens ao Tutor IA</div>
            </div>
            <div className="text-center">
              {userPlan === 'premium' ? (
                <div>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{getPremiumTimeFormatted() || '1 dia'}</div>
                  <div className="text-gray-400 text-sm">Tempo Premium</div>
                </div>
              ) : (
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">Free</div>
                  <div className="text-gray-400 text-sm">Plano Atual</div>
                </div>
              )}
            </div>
          </div>
        </div>
        </PageTransition>

        {/* Upgrade to Premium - Só aparece para usuários Free */}
        {userPlan === 'free' && (
        <PageTransition>
          <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-2 border-purple-500/50 rounded-2xl p-6 mt-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Desbloqueie Todo o Potencial do Inglês pra Já
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Acesse conversas ilimitadas com IA, todas as trilhas desbloqueadas, 
              relatórios detalhados e muito mais com o plano Premium!
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-purple-400 text-sm font-semibold">💬 Conversas</div>
                <div className="text-white font-bold">Ilimitadas</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-cyan-400 text-sm font-semibold">🎯 Trilhas</div>
                <div className="text-white font-bold">Todas</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-green-400 text-sm font-semibold">📊 Relatórios</div>
                <div className="text-white font-bold">Detalhados</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-orange-400 text-sm font-semibold">🎧 Áudio</div>
                <div className="text-white font-bold">Premium</div>
              </div>
            </div>

            <button 
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => alert('Funcionalidade de assinatura será implementada em breve! 🚀')}
            >
              🌟 Assinar Premium - R$ 29,90/mês
            </button>
            
            <p className="text-gray-500 text-sm mt-3">
              Cancele quando quiser • Primeiro mês com 50% de desconto
            </p>
          </div>
          </div>
        </PageTransition>
        )}

        {/* Premium User Benefits - Só aparece para usuários Premium */}
        {userPlan === 'premium' && (
        <PageTransition>
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50 rounded-2xl p-6 mt-8">
          <div className="text-center">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Você é Premium! 
            </h3>
            <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
              Você tem acesso completo a todas as funcionalidades premium da plataforma! 
              Aproveite ao máximo sua experiência de aprendizado sem limitações.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-yellow-400 text-sm font-semibold">💬 Conversas IA</div>
                <div className="text-white font-bold">Ilimitadas</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-yellow-400 text-sm font-semibold">🎯 Trilhas</div>
                <div className="text-white font-bold">Todas</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-yellow-400 text-sm font-semibold">🔍 Filtros</div>
                <div className="text-white font-bold">Todos os Níveis</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-yellow-400 text-sm font-semibold">🎮 Exercícios</div>
                <div className="text-white font-bold">Todos</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-yellow-400 text-sm font-semibold">⭐ Favoritos</div>
                <div className="text-white font-bold">Ilimitados</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-yellow-400 text-sm font-semibold">🎧 Áudio</div>
                <div className="text-white font-bold">Pronúncia IA</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-yellow-400 text-sm font-semibold">📊 Progresso</div>
                <div className="text-white font-bold">Estatísticas</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-yellow-400 text-sm font-semibold">🚀 Experiência</div>
                <div className="text-white font-bold">Sem Anúncios</div>
              </div>
            </div>

            <p className="text-gray-500 text-sm">
              Obrigado por ser um usuário Premium! 🚀
            </p>
          </div>
          </div>
        </PageTransition>
        )}

        {/* Quick Actions */}
        <PageTransition>
          <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">Ações Rápidas</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/trilha/trabalho"
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-20 rounded-full transition-all duration-300 group-hover:opacity-30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-40 rounded-full p-[1px] transition-all duration-300 group-hover:opacity-60">
                <div className="bg-gray-900/40 backdrop-blur-sm rounded-full h-full w-full"></div>
              </div>
              <span className="relative px-6 py-3 text-white font-semibold transition-all duration-300 group-hover:scale-105 inline-block backdrop-blur-sm rounded-full">
                💼 Inglês para Trabalho
              </span>
            </Link>
            <Link 
              href="/trilha/viagens"
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-20 rounded-full transition-all duration-300 group-hover:opacity-30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-40 rounded-full p-[1px] transition-all duration-300 group-hover:opacity-60">
                <div className="bg-gray-900/40 backdrop-blur-sm rounded-full h-full w-full"></div>
              </div>
              <span className="relative px-6 py-3 text-white font-semibold transition-all duration-300 group-hover:scale-105 inline-block backdrop-blur-sm rounded-full">
                ✈️ Inglês para Viagens
              </span>
            </Link>
            <Link 
              href="/chat"
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-20 rounded-full transition-all duration-300 group-hover:opacity-30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-40 rounded-full p-[1px] transition-all duration-300 group-hover:opacity-60">
                <div className="bg-gray-900/40 backdrop-blur-sm rounded-full h-full w-full"></div>
              </div>
              <span className="relative px-6 py-3 text-white font-semibold transition-all duration-300 group-hover:scale-105 inline-block backdrop-blur-sm rounded-full">
                🤖 Conversar com IA
              </span>
            </Link>
          </div>
        </div>
        </PageTransition>

        {/* Footer - Gerenciar Assinatura */}
        <PageTransition>
          <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">
              Precisa de ajuda com sua assinatura?
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-gray-300 text-sm transition-colors"
                onClick={() => alert('Funcionalidade de gerenciar assinatura será implementada em breve!')}
              >
                🔧 Gerenciar Assinatura
              </button>
              <button 
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-gray-300 text-sm transition-colors"
                onClick={() => alert('Suporte será implementado em breve!')}
              >
                💬 Suporte
              </button>
              <button 
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-gray-300 text-sm transition-colors"
                onClick={() => alert('FAQ será implementada em breve!')}
              >
                ❓ FAQ
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              Inglês pra Já © 2024 • Cancele quando quiser • Suporte 24/7
            </p>
          </div>
        </div>
        </PageTransition>
      </div>
    </AnimatedContainer>
  )
}