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
import { WorkIcon, InterviewIcon, TravelIcon, BusinessIcon, CasualIcon, RestaurantIcon, ShoppingIcon, RobotIcon, LearningTrailIcon, ConversationIcon, TargetIcon, AudioIcon, GrammarIcon } from './ModernIcons'
import { PROFESSIONS } from '@/data/professions'

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

  // Função para obter imagem do usuário
  const getUserImage = () => {
    // Verificar se tem foto do Google (user metadata ou avatar_url)
    const googlePhoto = (user as any)?.user_metadata?.avatar_url || 
                       (user as any)?.user_metadata?.picture ||
                       (user as any)?.avatar_url

    if (googlePhoto) {
      return googlePhoto
    }

    // Se não tem foto do Google, verificar se é login com Google
    const isGoogleLogin = (user as any)?.app_metadata?.provider === 'google' ||
                         (user as any)?.user_metadata?.iss?.includes('accounts.google.com')

    if (isGoogleLogin && !googlePhoto) {
      // Para logins do Google sem foto, usar avatar abstrato baseado no email
      const email = userProfile?.email || (user as any)?.email || 'user@example.com'
      const hash = email.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0)
        return a & a
      }, 0)
      const colors = [
        'FF6B6B', 'FFD93D', '6BCF7F', '4ECDC4', 
        'A8E6CF', 'FFB6C1', 'DDA0DD', 'F0E68C',
        '98D8E8', 'F7DC6F', 'BB8FCE', 'F8C471'
      ]
      const color = colors[Math.abs(hash) % colors.length]
      const initial = getUserDisplayName().charAt(0).toUpperCase()
      return `https://ui-avatars.com/api/?name=${initial}&background=${color}&color=fff&size=150&font-size=0.6&bold=true`
    }

    // Para logins com email (não Google), usar avatar abstrato
    const email = userProfile?.email || (user as any)?.email || 'user@example.com'
    const hash = email.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    const colors = [
      '667eea', 'f093fb', '4facfe', '43e97b',
      'fa709a', 'fee140', 'a8edea', 'fed6e3',
      'ffecd2', 'fcb69f', 'c1dfc4', 'deaaff'
    ]
    const color = colors[Math.abs(hash) % colors.length]
    const initial = getUserDisplayName().charAt(0).toUpperCase()
    return `https://ui-avatars.com/api/?name=${initial}&background=${color}&color=fff&size=150&font-size=0.6&bold=true`
  }

  const trails = [
    { 
      icon: WorkIcon, 
      title: 'Trabalho', 
      desc: 'Reuniões, e-mails, feedbacks', 
      slug: 'trabalho', 
      color: 'from-blue-500 to-cyan-500',
      iconColor: 'text-cyan-400'
    },
    { 
      icon: TravelIcon, 
      title: 'Viagens', 
      desc: 'Aeroporto, hotel, restaurante', 
      slug: 'viagens', 
      color: 'from-green-500 to-emerald-500',
      iconColor: 'text-emerald-400'
    },
    { 
      icon: ShoppingIcon, 
      title: 'Mercado', 
      desc: 'Preços, formas de pagamento', 
      slug: 'mercado', 
      color: 'from-yellow-500 to-orange-500',
      iconColor: 'text-orange-400'
    },
    { 
      icon: CasualIcon, 
      title: 'Passeios', 
      desc: 'Tickets, atrações, direções', 
      slug: 'passeios', 
      color: 'from-purple-500 to-pink-500',
      iconColor: 'text-pink-400'
    },
    { 
      icon: BusinessIcon, 
      title: 'Amigos', 
      desc: 'Convites, conversas casuais', 
      slug: 'amigos', 
      color: 'from-indigo-500 to-purple-500',
      iconColor: 'text-purple-400'
    },
    { 
      icon: RestaurantIcon, 
      title: 'Eventos', 
      desc: 'Networking, palestras + Exercícios', 
      slug: 'eventos', 
      color: 'from-pink-500 to-rose-500',
      iconColor: 'text-rose-400'
    }
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
                src={getUserImage()}
                alt={getUserDisplayName()}
                className="w-20 h-20 rounded-full border-4 border-purple-500/30"
                onError={(e) => {
                  // Fallback se a imagem não carregar
                  const target = e.target as HTMLImageElement
                  const email = userProfile?.email || (user as any)?.email || 'user@example.com'
                  const initial = getUserDisplayName().charAt(0).toUpperCase()
                  target.src = `https://ui-avatars.com/api/?name=${initial}&background=667eea&color=fff&size=150&font-size=0.6&bold=true`
                }}
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
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    <RobotIcon size={72} className="text-purple-400" />
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
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    <LearningTrailIcon size={72} className="text-green-400" />
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
                      <div className="mb-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg flex justify-center">
                        <trail.icon size={32} className={trail.iconColor} />
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

        {/* Conjugador de Verbos */}
        <PageTransition>
          <div className="mb-12">
            <Link href="/conjugador">
              <div 
                className="group bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/30 rounded-3xl p-8 hover:border-green-400/50 transition-all duration-300 cursor-pointer transform hover:scale-105"
                onMouseEnter={() => setHoveredCard('conjugador')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="text-center">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    <GrammarIcon size={72} className="text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Conjugador de Verbos
                  </h2>
                  <p className="text-gray-300 mb-6 leading-relaxed max-w-2xl mx-auto">
                    Conjugue qualquer verbo em inglês em todos os tempos verbais. 
                    Ferramenta prática para dominar a gramática inglesa.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                      Todos os tempos
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm">
                      Tabela organizada
                    </span>
                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                      Consulta rápida
                    </span>
                  </div>
                  <div className="text-green-400 group-hover:text-green-300 transition-colors font-semibold">
                    Conjugar Verbos →
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </PageTransition>

        {/* Trilhas de Profissões */}
        <PageTransition>
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                🎯 Trilhas de Profissões
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                Aprenda inglês específico para sua área profissional. 
                Frases práticas e vocabulário técnico para usar no trabalho.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {PROFESSIONS.map((profession) => (
                <Link key={profession.id} href={`/profissao/${profession.id}`}>
                  <div className="relative group">
                    {/* Background com gradiente translúcido */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${profession.color} opacity-20 rounded-2xl transition-all duration-300 group-hover:opacity-30`}></div>
                    
                    {/* Border com gradiente */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${profession.color} opacity-40 rounded-2xl p-[1px] transition-all duration-300 group-hover:opacity-60`}>
                      <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl h-full w-full"></div>
                    </div>
                    
                    {/* Conteúdo */}
                    <div className="relative p-4 text-center backdrop-blur-sm rounded-2xl transition-all duration-300 group-hover:transform group-hover:scale-105 h-full flex flex-col justify-between">
                      <div>
                        <div className="mb-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg flex justify-center">
                          <span className="text-3xl">{profession.icon}</span>
                        </div>
                        <h3 className="text-white font-bold text-sm mb-2 drop-shadow-sm">
                          {profession.title}
                        </h3>
                        <p className="text-white/70 text-xs leading-relaxed mb-3">
                          {profession.description}
                        </p>
                        <div className="flex flex-wrap gap-1 justify-center mb-3">
                          <span className="bg-white/10 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                            {profession.phrases.length} frases
                          </span>
                        </div>
                      </div>
                      <div className="text-white/80 group-hover:text-white transition-colors font-semibold text-xs">
                        Começar →
                      </div>
                    </div>
                    
                    {/* Efeito de brilho no hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className={`absolute inset-0 bg-gradient-to-br ${profession.color} opacity-10 rounded-2xl blur-xl`}></div>
                    </div>
                  </div>
                </Link>
              ))}
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
              <div className="bg-gray-900/50 rounded-lg p-3 flex flex-col items-center">
                <div className="flex items-center text-purple-400 text-sm font-semibold mb-1">
                  <ConversationIcon size={16} className="mr-2 text-purple-400" />
                  Conversas
                </div>
                <div className="text-white font-bold">Ilimitadas</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 flex flex-col items-center">
                <div className="flex items-center text-cyan-400 text-sm font-semibold mb-1">
                  <LearningTrailIcon size={16} className="mr-2 text-cyan-400" />
                  Trilhas
                </div>
                <div className="text-white font-bold">Todas</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 flex flex-col items-center">
                <div className="flex items-center text-green-400 text-sm font-semibold mb-1">
                  <TargetIcon size={16} className="mr-2 text-green-400" />
                  Relatórios
                </div>
                <div className="text-white font-bold">Detalhados</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 flex flex-col items-center">
                <div className="flex items-center text-orange-400 text-sm font-semibold mb-1">
                  <AudioIcon size={16} className="mr-2 text-orange-400" />
                  Áudio
                </div>
                <div className="text-white font-bold">Premium</div>
              </div>
            </div>

            <button 
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-4 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => alert('Funcionalidade de assinatura será implementada em breve! 🚀')}
            >
              <span className="hidden sm:inline whitespace-nowrap">🌟 Assinar Premium - R$ 29,90/mês</span>
              <span className="sm:hidden flex flex-col items-center leading-tight">
                <span>🌟 Assinar Premium</span>
                <span>R$ 29,90/mês</span>
              </span>
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