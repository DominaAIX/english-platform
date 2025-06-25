'use client'

import { useState, useEffect } from 'react'
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
import { useRequiredLevelTest } from '@/hooks/useRequiredLevelTest'
import { checkCertificationCooldown } from '@/utils/certificationCooldown'
import { getFreeUsageStatus, FreeLimitationStatus, cleanupOldSystems } from '@/utils/freeLimitations'
import { getUserLevel } from '@/data/progressiveTrails'

export default function DashboardContent() {
  const { user, userProfile } = useAuth()
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const { stats, getTotalPhrasesPracticed, getPremiumTimeFormatted } = useStats()
  const { needsLevelTest, hasCompletedTest, isLoading } = useRequiredLevelTest()
  const [certificationBlocked, setCertificationBlocked] = useState({ isBlocked: false, timeRemaining: '' })
  const [hasCompletedBasicTrail, setHasCompletedBasicTrail] = useState(false)
  const [freeLimitations, setFreeLimitations] = useState<FreeLimitationStatus>({
    isBlocked: false,
    phrasesUsed: 0,
    maxPhrases: 5,
    timeRemaining: '',
    canAccess: true
  })
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')
  
  // Usar o plano real do usuário autenticado do userProfile
  const userPlan = userProfile?.plan || 'free'

  // Carregar nível do usuário
  useEffect(() => {
    if (user?.id) {
      const level = getUserLevel(user.id)
      setUserLevel(level)
    }
  }, [user?.id])

  // Verificar se completou trilha básica (trabalho)
  useEffect(() => {
    if (user?.id) {
      const basicTrailProgress = localStorage.getItem(`progressiveTrail_trabalho_${user.id}`)
      if (basicTrailProgress) {
        const progress = JSON.parse(basicTrailProgress)
        // Verificar se completou 100% da trilha básica
        setHasCompletedBasicTrail(progress.progressPercentage >= 100)
      }
    }
  }, [user?.id])

  // Verificar bloqueio de certificação
  useEffect(() => {
    if (user?.id) {
      const cooldownStatus = checkCertificationCooldown(user.id)
      setCertificationBlocked(cooldownStatus)
    }
  }, [user?.id])

  // Atualizar contador a cada minuto
  useEffect(() => {
    if (certificationBlocked.isBlocked) {
      const interval = setInterval(() => {
        if (user?.id) {
          const cooldownStatus = checkCertificationCooldown(user.id)
          setCertificationBlocked(cooldownStatus)
        }
      }, 60000)
      return () => clearInterval(interval)
    }
  }, [certificationBlocked.isBlocked, user?.id])

  // Verificar limitações para usuários free
  useEffect(() => {
    if (user?.id && userPlan === 'free') {
      // Limpar sistemas antigos que podem estar interferindo
      cleanupOldSystems(user.id)
      const limitations = getFreeUsageStatus(user.id)
      setFreeLimitations(limitations)
    }
  }, [user?.id, userPlan])

  // Atualizar limitações free a cada minuto
  useEffect(() => {
    if (user?.id && userPlan === 'free' && freeLimitations.isBlocked) {
      const interval = setInterval(() => {
        const limitations = getFreeUsageStatus(user.id!)
        setFreeLimitations(limitations)
      }, 60000)
      return () => clearInterval(interval)
    }
  }, [user?.id, userPlan, freeLimitations.isBlocked])

  // Atualizar contador quando usuário voltar ao dashboard (focus/visibility)
  useEffect(() => {
    const handleFocus = () => {
      if (user?.id && userPlan === 'free') {
        const limitations = getFreeUsageStatus(user.id)
        setFreeLimitations(limitations)
      }
    }

    const handleVisibilityChange = () => {
      if (!document.hidden && user?.id && userPlan === 'free') {
        const limitations = getFreeUsageStatus(user.id)
        setFreeLimitations(limitations)
      }
    }

    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [user?.id, userPlan])

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
      iconColor: 'text-cyan-400',
      level: 'beginner'
    },
    { 
      icon: TravelIcon, 
      title: 'Viagens', 
      desc: 'Aeroporto, hotel, restaurante', 
      slug: 'viagens', 
      color: 'from-green-500 to-emerald-500',
      iconColor: 'text-emerald-400',
      level: 'beginner'
    },
    { 
      icon: ShoppingIcon, 
      title: 'Mercado', 
      desc: 'Preços, formas de pagamento', 
      slug: 'mercado', 
      color: 'from-yellow-500 to-orange-500',
      iconColor: 'text-orange-400',
      level: 'intermediate'
    },
    { 
      icon: CasualIcon, 
      title: 'Passeios', 
      desc: 'Tickets, atrações, direções', 
      slug: 'passeios', 
      color: 'from-purple-500 to-pink-500',
      iconColor: 'text-pink-400',
      level: 'intermediate'
    },
    { 
      icon: BusinessIcon, 
      title: 'Amigos', 
      desc: 'Convites, conversas casuais', 
      slug: 'amigos', 
      color: 'from-indigo-500 to-purple-500',
      iconColor: 'text-purple-400',
      level: 'advanced'
    },
    { 
      icon: RestaurantIcon, 
      title: 'Eventos', 
      desc: 'Networking, palestras + Exercícios', 
      slug: 'eventos', 
      color: 'from-pink-500 to-rose-500',
      iconColor: 'text-rose-400',
      level: 'advanced'
    }
  ]

  // Função para verificar se a trilha é recomendada para o nível do usuário
  const isRecommendedTrail = (trailLevel: string) => {
    return trailLevel === userLevel
  }

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
              {needsLevelTest ? 'Primeiro, vamos descobrir seu nível de inglês!' : 'Como você gostaria de praticar inglês hoje?'}
            </p>
            
            {/* Contador de uso para usuários Free */}
            {userPlan === 'free' && hasCompletedTest && !freeLimitations.isBlocked && (
              <div className="mt-6 bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-blue-400 text-sm font-medium mb-2">🆓 Plano Gratuito</div>
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-white">{freeLimitations.phrasesUsed}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-lg font-bold text-gray-400">{freeLimitations.maxPhrases}</span>
                    <span className="text-gray-400 text-sm">frases hoje</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(freeLimitations.phrasesUsed / freeLimitations.maxPhrases) * 100}%` }}
                    />
                  </div>
                  <p className="text-gray-400 text-xs">
                    {freeLimitations.maxPhrases - freeLimitations.phrasesUsed} frases restantes hoje
                  </p>
                </div>
              </div>
            )}
          </div>
        </PageTransition>

        {/* Tela obrigatória de teste de nível para usuários Premium */}
        {needsLevelTest && (
        <PageTransition>
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-2 border-yellow-500/50 rounded-xl p-8 text-center">
              <div className="text-6xl mb-6">🎯</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Vamos começar?
              </h2>
              <p className="text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
                Para personalizar sua experiência de aprendizado, precisamos conhecer seu nível atual de inglês. 
                Este teste rápido vai determinar quais conteúdos e exercícios são adequados para você.
              </p>
              
              <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
                <h3 className="text-white font-semibold mb-4">📋 O que esperar:</h3>
                <ul className="text-gray-300 space-y-2 text-left max-w-md mx-auto">
                  <li>• 20 perguntas de múltipla escolha</li>
                  <li>• Tempo estimado: 8-12 minutos</li>
                  <li>• Resultado determina seu conteúdo personalizado</li>
                  <li>• Necessário para acessar trilhas progressivas</li>
                </ul>
              </div>

              <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4 mb-6">
                <p className="text-yellow-300 text-sm">
                  ⚠️ Você precisa completar este teste para acessar todas as funcionalidades da plataforma.
                </p>
              </div>

              <Link 
                href="/teste-nivel"
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-8 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 inline-block"
              >
                🚀 Fazer Teste de Nível Agora
              </Link>
            </div>
          </div>
        </PageTransition>
        )}

        {/* SE PRECISA DO TESTE, PARAR AQUI - NÃO MOSTRAR MAIS NADA */}
        {needsLevelTest && (
          <div />
        )}

        {/* Só renderizar o resto se NÃO precisar do teste */}
        {!needsLevelTest && (
          <>

        {/* Tela de limitações para usuários Free após atingir o limite */}
        {userPlan === 'free' && hasCompletedTest && freeLimitations.isBlocked && (
        <PageTransition>
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-2 border-red-500/50 rounded-xl p-8 text-center">
              <div className="text-6xl mb-6">🔒</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Limite Diário Atingido!
              </h2>
              <p className="text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
                Você já praticou suas {freeLimitations.maxPhrases} frases diárias gratuitas. 
                Para continuar aprendendo, faça upgrade para Premium ou aguarde a liberação.
              </p>
              
              <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
                <h3 className="text-white font-semibold mb-4">📊 Seu uso hoje:</h3>
                <div className="flex justify-center items-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400">{freeLimitations.phrasesUsed}</div>
                    <div className="text-gray-400 text-sm">Frases Usadas</div>
                  </div>
                  <div className="text-gray-500 text-2xl">/</div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-400">{freeLimitations.maxPhrases}</div>
                    <div className="text-gray-400 text-sm">Limite Diário</div>
                  </div>
                </div>
                {freeLimitations.timeRemaining && (
                  <p className="text-orange-400 font-medium">
                    ⏰ Próximo acesso em: {freeLimitations.timeRemaining}
                  </p>
                )}
              </div>

              <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-300 text-sm">
                  🚫 Acesso bloqueado por 24 horas após usar todas as frases gratuitas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105"
                  onClick={() => alert('Funcionalidade de assinatura será implementada em breve! 🚀')}
                >
                  🌟 Upgrade para Premium
                </button>
                <div className="bg-gray-800 px-6 py-4 rounded-full text-gray-300 font-medium text-center">
                  ⏳ Aguardar Liberação
                </div>
              </div>
              
              <p className="text-gray-500 text-sm mt-4">
                Premium: Acesso ilimitado • Sem bloqueios • R$ 29,90/mês
              </p>
            </div>
          </div>
        </PageTransition>
        )}

        {/* Features - Teste de Nível e Trilhas Progressivas para todos os usuários */}
        {hasCompletedTest && (
        <PageTransition>
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                🎓 Aprendizado Progressivo
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                Descubra seu nível e siga trilhas estruturadas. Exercícios práticos, favoritos, filtros avançados e acesso ilimitado. {userPlan === 'free' ? '5 frases/dia no plano gratuito - faça upgrade para acesso completo!' : 'Acesso premium ativo!'}
              </p>
            </div>
            
            <div className={`grid gap-6 mb-8 ${hasCompletedBasicTrail ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
              {/* Teste de Nível */}
              <Link href="/teste-nivel">
                <div className="group bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/30 rounded-3xl p-8 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer transform hover:scale-105 h-full flex flex-col">
                  <div className="text-center flex-1 flex flex-col justify-between">
                    <div>
                      <div className="mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                        <span className="text-7xl">🎯</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        Teste de Nível
                      </h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        Descubra seu nível atual de inglês com 15 perguntas rápidas. 
                        Resultado personaliza suas trilhas de aprendizado.
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center mb-6">
                        <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                          15 Questões
                        </span>
                        <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm">
                          5-10 Min
                        </span>
                        <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                          Personalizado
                        </span>
                      </div>
                    </div>
                    <div className="text-yellow-400 group-hover:text-yellow-300 transition-colors font-semibold">
                      Fazer Teste →
                    </div>
                  </div>
                </div>
              </Link>

              {/* Trilhas Progressivas */}
              <div className="group bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/30 rounded-3xl p-8 hover:border-green-400/50 transition-all duration-300 cursor-pointer transform hover:scale-105 h-full flex flex-col">
                <div className="text-center flex-1 flex flex-col justify-between">
                  <div>
                    <div className="mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                      <span className="text-7xl">🚀</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Trilhas Progressivas
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Trilhas estruturadas baseadas no seu nível. Frases + exercícios obrigatórios 
                      para garantir o aprendizado efetivo.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                        Progressivo
                      </span>
                      <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm">
                        Exercícios
                      </span>
                      <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                        Bloqueado
                      </span>
                    </div>
                  </div>
                  <div className="text-green-400 group-hover:text-green-300 transition-colors font-semibold">
                    Ver Trilhas →
                  </div>
                </div>
              </div>

              {/* Teste de Certificação A1/A2 - SÓ APARECE APÓS COMPLETAR BÁSICO */}
              {hasCompletedBasicTrail && (
                <Link href="/certificacao-a1-a2" className={certificationBlocked.isBlocked ? 'pointer-events-none' : ''}>
                  <div className={`group bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-2 border-blue-500/30 rounded-3xl p-8 transition-all duration-300 h-full flex flex-col relative ${
                    certificationBlocked.isBlocked 
                      ? 'opacity-60 cursor-not-allowed' 
                      : 'hover:border-blue-400/50 cursor-pointer transform hover:scale-105'
                  }`}>
                    {/* Overlay de bloqueio por cooldown */}
                    {certificationBlocked.isBlocked && (
                      <div className="absolute inset-0 bg-black/50 rounded-3xl flex items-center justify-center z-10">
                        <div className="text-center">
                          <div className="text-6xl mb-2">🔒</div>
                          <div className="text-red-400 font-bold text-lg">BLOQUEADO</div>
                          <div className="text-gray-300 text-sm">{certificationBlocked.timeRemaining}</div>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center flex-1 flex flex-col justify-between">
                      <div>
                        <div className="mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                          <span className="text-7xl">
                            {certificationBlocked.isBlocked ? '🔒' : '🏆'}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                          Certificação A1/A2
                        </h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {certificationBlocked.isBlocked 
                            ? `Teste bloqueado por mais ${certificationBlocked.timeRemaining}. Aguarde para fazer o próximo teste.`
                            : 'Teste seu domínio das 145 frases essenciais A1/A2 e ganhe seu certificado oficial.'
                          }
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center mb-6">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            certificationBlocked.isBlocked 
                              ? 'bg-red-500/20 text-red-300' 
                              : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {certificationBlocked.isBlocked ? 'Bloqueado' : '35 Questões'}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            certificationBlocked.isBlocked 
                              ? 'bg-red-500/20 text-red-300' 
                              : 'bg-cyan-500/20 text-cyan-300'
                          }`}>
                            {certificationBlocked.isBlocked ? '48h Cooldown' : '20 Min'}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            certificationBlocked.isBlocked 
                              ? 'bg-red-500/20 text-red-300' 
                              : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {certificationBlocked.isBlocked ? 'Indisponível' : 'Certificado'}
                          </span>
                        </div>
                      </div>
                      <div className={`font-semibold transition-colors ${
                        certificationBlocked.isBlocked 
                          ? 'text-red-400' 
                          : 'text-blue-400 group-hover:text-blue-300'
                      }`}>
                        {certificationBlocked.isBlocked ? 'Aguarde liberação' : 'Fazer Teste →'}
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* Trilhas Progressivas Disponíveis */}
            <div className="flex justify-center px-4">
              <div className="grid grid-cols-2 gap-6 max-w-lg">
              <Link href="/trilha-progressiva/trabalho">
                <div className="relative group overflow-hidden">
                  {/* Efeito de partículas flutuantes */}
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                    <div className="absolute top-2 left-3 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                    <div className="absolute top-6 right-4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-8 left-2 w-1 h-1 bg-cyan-300 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-4 right-2 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  </div>
                  
                  {/* Background com gradiente e movimento */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 opacity-25 rounded-2xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-105"></div>
                  
                  {/* Border com gradiente animado */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500 opacity-50 rounded-2xl p-[2px] transition-all duration-500 group-hover:opacity-80 group-hover:from-cyan-400 group-hover:to-blue-400">
                    <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl h-full w-full"></div>
                  </div>
                  
                  {/* Badge "NEW" ou "HOT" */}
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg transform rotate-12 z-10">
                    🔥 HOT
                  </div>
                  
                  {/* Conteúdo */}
                  <div className="relative p-5 text-center backdrop-blur-sm rounded-2xl transition-all duration-500 group-hover:transform group-hover:scale-110 h-48 flex flex-col justify-between">
                    <div className="flex-1">
                      {/* Ícone com efeito pulsante */}
                      <div className="mb-3 relative">
                        <div className="absolute inset-0 bg-cyan-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-pulse"></div>
                        <div className="relative group-hover:scale-125 transition-transform duration-300 filter drop-shadow-2xl flex justify-center">
                          <WorkIcon size={40} className="text-cyan-300 group-hover:text-cyan-100" />
                        </div>
                      </div>
                      
                      <h3 className="text-white font-bold text-sm sm:text-base mb-2 drop-shadow-lg group-hover:text-cyan-100 transition-colors">
                        💼 Trabalho Progressivo
                      </h3>
                      
                      <p className="text-white/80 text-xs mb-2 leading-relaxed group-hover:text-white/90 transition-colors">
                        {userPlan === 'premium' ? '✨ Corporativo estruturado' : '🎆 5 frases/dia'}
                      </p>
                      
                      {/* Barra de progresso decorativa */}
                      <div className="w-full bg-gray-700/50 rounded-full h-1.5 mb-2">
                        <div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-1.5 rounded-full w-3/4 group-hover:w-full transition-all duration-1000"></div>
                      </div>
                      
                      {/* Tags decorativas */}
                      <div className="flex flex-wrap gap-1 justify-center">
                        {/* Indicador de nível baseado no teste */}
                        <span className={`px-2 py-0.5 rounded-full text-xs border font-semibold ${
                          userLevel === 'beginner' 
                            ? 'bg-green-500/20 text-green-300 border-green-400/40' 
                            : userLevel === 'intermediate'
                            ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40'
                            : 'bg-red-500/20 text-red-300 border-red-400/40'
                        }`}>
                          {userLevel === 'beginner' ? '🟢 BÁSICO' : userLevel === 'intermediate' ? '🟡 INTER' : '🔴 AVANÇ'}
                        </span>
                        <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full text-xs border border-cyan-400/30">
                          🎯 Estruturado
                        </span>
                        <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full text-xs border border-blue-400/30">
                          🚀 Eficaz
                        </span>
                      </div>
                    </div>
                    
                    {/* Botão de ação */}
                    <div className="mt-3 text-cyan-400 group-hover:text-cyan-300 transition-colors font-semibold text-sm group-hover:animate-pulse">
                      Começar Jornada →
                    </div>
                  </div>
                  
                  {/* Efeito de brilho expandido */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-400 to-cyan-500 opacity-20 rounded-2xl blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div>
                  </div>
                </div>
              </Link>
              
              <Link href="/trilha-progressiva/viagens">
                <div className="relative group overflow-hidden">
                  {/* Efeito de partículas flutuantes */}
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                    <div className="absolute top-3 left-2 w-1 h-1 bg-emerald-400 rounded-full animate-ping"></div>
                    <div className="absolute top-5 right-3 w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-6 left-4 w-1 h-1 bg-emerald-300 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
                    <div className="absolute bottom-3 right-1 w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
                  </div>
                  
                  {/* Background com gradiente e movimento */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 opacity-25 rounded-2xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-105"></div>
                  
                  {/* Border com gradiente animado */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-400 to-green-500 opacity-50 rounded-2xl p-[2px] transition-all duration-500 group-hover:opacity-80 group-hover:from-emerald-400 group-hover:to-green-400">
                    <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl h-full w-full"></div>
                  </div>
                  
                  {/* Badge "POPULAR" */}
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg transform rotate-12 z-10">
                    ⭐ POPULAR
                  </div>
                  
                  {/* Conteúdo */}
                  <div className="relative p-5 text-center backdrop-blur-sm rounded-2xl transition-all duration-500 group-hover:transform group-hover:scale-110 h-48 flex flex-col justify-between">
                    <div className="flex-1">
                      {/* Ícone com efeito pulsante */}
                      <div className="mb-3 relative">
                        <div className="absolute inset-0 bg-emerald-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-pulse"></div>
                        <div className="relative group-hover:scale-125 transition-transform duration-300 filter drop-shadow-2xl flex justify-center">
                          <TravelIcon size={40} className="text-emerald-300 group-hover:text-emerald-100" />
                        </div>
                      </div>
                      
                      <h3 className="text-white font-bold text-sm sm:text-base mb-2 drop-shadow-lg group-hover:text-emerald-100 transition-colors">
                        ✈️ Viagens Progressiva
                      </h3>
                      
                      <p className="text-white/80 text-xs mb-2 leading-relaxed group-hover:text-white/90 transition-colors">
                        {userPlan === 'premium' ? '✨ Turismo estruturado' : '🌍 5 frases/dia'}
                      </p>
                      
                      {/* Barra de progresso decorativa */}
                      <div className="w-full bg-gray-700/50 rounded-full h-1.5 mb-2">
                        <div className="bg-gradient-to-r from-emerald-400 to-green-400 h-1.5 rounded-full w-2/3 group-hover:w-full transition-all duration-1000"></div>
                      </div>
                      
                      {/* Tags decorativas */}
                      <div className="flex flex-wrap gap-1 justify-center">
                        {/* Indicador de nível baseado no teste */}
                        <span className={`px-2 py-0.5 rounded-full text-xs border font-semibold ${
                          userLevel === 'beginner' 
                            ? 'bg-green-500/20 text-green-300 border-green-400/40' 
                            : userLevel === 'intermediate'
                            ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40'
                            : 'bg-red-500/20 text-red-300 border-red-400/40'
                        }`}>
                          {userLevel === 'beginner' ? '🟢 BÁSICO' : userLevel === 'intermediate' ? '🟡 INTER' : '🔴 AVANÇ'}
                        </span>
                        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-xs border border-emerald-400/30">
                          🌎 Global
                        </span>
                        <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full text-xs border border-green-400/30">
                          📝 Prático
                        </span>
                      </div>
                    </div>
                    
                    {/* Botão de ação */}
                    <div className="mt-3 text-emerald-400 group-hover:text-emerald-300 transition-colors font-semibold text-sm group-hover:animate-pulse">
                      Explorar Mundo →
                    </div>
                  </div>
                  
                  {/* Efeito de brilho expandido */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-green-400 to-emerald-500 opacity-20 rounded-2xl blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div>
                  </div>
                </div>
              </Link>
              </div>
            </div>
          </div>
        </PageTransition>
        )}

        {/* Main Options - Mostra para todos após completar teste */}
        {!needsLevelTest && (
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
              {trails.map((trail, index) => {
                const isRecommended = isRecommendedTrail(trail.level)
                return (
                  <Link key={index} href={`/trilha/${trail.slug}/praticar`}>
                    <div className="relative group">
                      {/* Badge de recomendação */}
                      {isRecommended && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-lg">
                          ⭐ Recomendado
                        </div>
                      )}
                      
                      {/* Background com gradiente translúcido */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${trail.color} ${isRecommended ? 'opacity-30' : 'opacity-20'} rounded-2xl transition-all duration-300 group-hover:opacity-30`}></div>
                      
                      {/* Border com gradiente */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${trail.color} ${isRecommended ? 'opacity-60' : 'opacity-40'} rounded-2xl p-[1px] transition-all duration-300 group-hover:opacity-60 ${isRecommended ? 'ring-2 ring-yellow-400/50' : ''}`}>
                        <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl h-full w-full"></div>
                      </div>
                      
                      {/* Conteúdo */}
                      <div className={`relative p-5 text-center backdrop-blur-sm rounded-2xl transition-all duration-300 group-hover:transform group-hover:scale-105 ${isRecommended ? 'transform scale-105' : ''}`}>
                        <div className="mb-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg flex justify-center">
                          <trail.icon size={32} className={trail.iconColor} />
                        </div>
                        <h3 className="text-white font-semibold text-sm mb-2 drop-shadow-sm">
                          {trail.title}
                        </h3>
                        <p className="text-white/70 text-xs leading-relaxed">
                          {trail.desc.split(',')[0]}
                        </p>
                        {isRecommended && (
                          <div className="mt-2">
                            <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs font-medium">
                              Seu nível: {userLevel === 'beginner' ? 'Básico' : userLevel === 'intermediate' ? 'Intermediário' : 'Avançado'}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Efeito de brilho no hover */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className={`absolute inset-0 bg-gradient-to-br ${trail.color} opacity-10 rounded-2xl blur-xl`}></div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
        </PageTransition>
        )}

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
              {PROFESSIONS.map((profession) => {
                // Mapeamento de cores para cada profissão
                const getGradientClasses = (professionId: string) => {
                  switch(professionId) {
                    case 'doctor':
                      return {
                        bg: 'from-red-600 to-pink-600',
                        hover: 'from-red-500 to-pink-500'
                      }
                    case 'real-estate':
                      return {
                        bg: 'from-blue-600 to-cyan-600',
                        hover: 'from-blue-500 to-cyan-500'
                      }
                    case 'it-professional':
                      return {
                        bg: 'from-green-600 to-emerald-600',
                        hover: 'from-green-500 to-emerald-500'
                      }
                    case 'nurse':
                      return {
                        bg: 'from-purple-600 to-indigo-600',
                        hover: 'from-purple-500 to-indigo-500'
                      }
                    case 'psychologist':
                      return {
                        bg: 'from-orange-600 to-red-600',
                        hover: 'from-orange-500 to-red-500'
                      }
                    case 'personal-trainer':
                      return {
                        bg: 'from-yellow-600 to-orange-600',
                        hover: 'from-yellow-500 to-orange-500'
                      }
                    case 'teacher':
                      return {
                        bg: 'from-indigo-600 to-purple-600',
                        hover: 'from-indigo-500 to-purple-500'
                      }
                    case 'chef':
                      return {
                        bg: 'from-rose-600 to-pink-600',
                        hover: 'from-rose-500 to-pink-500'
                      }
                    case 'lawyer':
                      return {
                        bg: 'from-gray-600 to-slate-600',
                        hover: 'from-gray-500 to-slate-500'
                      }
                    case 'sales-representative':
                      return {
                        bg: 'from-teal-600 to-cyan-600',
                        hover: 'from-teal-500 to-cyan-500'
                      }
                    default:
                      return {
                        bg: 'from-gray-600 to-slate-600',
                        hover: 'from-gray-500 to-slate-500'
                      }
                  }
                }
                
                const colors = getGradientClasses(profession.id)
                
                return (
                  <Link key={profession.id} href={`/profissao/${profession.id}`}>
                    <div className="relative group">
                      {/* Background com gradiente translúcido */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-20 rounded-2xl transition-all duration-300 group-hover:opacity-30`}></div>
                      
                      {/* Border com gradiente */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-40 rounded-2xl p-[1px] transition-all duration-300 group-hover:opacity-60`}>
                        <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl h-full w-full"></div>
                      </div>
                      
                      {/* Conteúdo */}
                      <div className="relative p-4 text-center backdrop-blur-sm rounded-2xl transition-all duration-300 group-hover:transform group-hover:scale-105 h-40 flex flex-col justify-between">
                        <div className="flex-1">
                          <div className="mb-2 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg flex justify-center">
                            <span className="text-2xl sm:text-3xl">{profession.icon}</span>
                          </div>
                          <h3 className="text-white font-bold text-xs sm:text-sm mb-1 drop-shadow-sm line-clamp-2">
                            {profession.title}
                          </h3>
                          <p className="text-white/70 text-xs leading-tight mb-2 line-clamp-2">
                            {profession.description}
                          </p>
                        </div>
                        <div className="text-white/80 group-hover:text-white transition-colors font-semibold text-xs">
                          Começar →
                        </div>
                      </div>
                      
                      {/* Efeito de brilho no hover */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className={`absolute inset-0 bg-gradient-to-br ${colors.hover} opacity-10 rounded-2xl blur-xl`}></div>
                      </div>
                    </div>
                  </Link>
                )
              })}
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

        {/* Premium User Benefits - Aparece para todos */}
        {(
        <PageTransition>
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50 rounded-2xl p-6 mt-8">
          <div className="text-center">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {userPlan === 'premium' ? 'Você é Premium! 🎉' : 'Veja o que o Premium oferece! ⭐'}
            </h3>
            <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
              {userPlan === 'premium' 
                ? 'Você tem acesso completo a todas as funcionalidades premium da plataforma! Aproveite ao máximo sua experiência de aprendizado sem limitações.'
                : 'Conheça todos os recursos premium que você pode desbloquear para turbinar seu aprendizado de inglês!'
              }
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
        </>
        )}
      </div>
    </AnimatedContainer>
  )
}