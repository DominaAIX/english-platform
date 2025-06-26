'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from './Logo'
import { useAuth } from '@/contexts/AuthContext'
import PageTransition from './PageTransition'
import AnimatedContainer from './AnimatedContainer'
import { getFreeUsageStatus, incrementFreeUsage, FreeLimitationStatus } from '@/utils/freeLimitations'
import { getUserFavorites, addToFavorites, removeFromFavorites } from '@/lib/favorites'
import { WorkIcon, TravelIcon, ShoppingIcon, CasualIcon, BusinessIcon, RestaurantIcon, SpeakerIcon, StarIcon } from './ModernIcons'

interface Phrase {
  english: string
  portuguese: string
  level: 'básico' | 'médio' | 'avançado'
  context: string
}

interface Trail {
  title: string
  icon: string
  description: string
  phrases: Phrase[]
}

interface SimpleTrailContentProps {
  trail: Trail
  userPlan: 'free' | 'premium'
  slug?: string
}

// Mapeamento simples de ícones
const iconMapping: { [key: string]: { component: React.ComponentType<{ size?: number; className?: string }>, color: string } } = {
  trabalho: { component: WorkIcon, color: 'text-cyan-400' },
  viagens: { component: TravelIcon, color: 'text-emerald-400' },
  mercado: { component: ShoppingIcon, color: 'text-orange-400' },
  passeios: { component: CasualIcon, color: 'text-pink-400' },
  amigos: { component: BusinessIcon, color: 'text-purple-400' },
  eventos: { component: RestaurantIcon, color: 'text-rose-400' }
}

export default function SimpleTrailContent({ trail, userPlan, slug }: SimpleTrailContentProps) {
  const { user, userProfile } = useAuth()
  const router = useRouter()
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [favoritePhrases, setFavoritePhrases] = useState<number[]>([])
  const [favoritesLoading, setFavoritesLoading] = useState(false)
  const [favoriteMessage, setFavoriteMessage] = useState<string>('')
  const [freeLimitations, setFreeLimitations] = useState<FreeLimitationStatus>({
    isBlocked: false,
    phrasesUsed: 0,
    maxPhrases: 5,
    timeRemaining: '',
    canAccess: true
  })
  
  // Usar plano real do usuário
  const actualUserPlan = userProfile?.plan || userPlan || 'free'
  
  // Verificar limitações para usuários free
  useEffect(() => {
    if (user?.id && actualUserPlan === 'free') {
      const limitations = getFreeUsageStatus(user.id)
      setFreeLimitations(limitations)
    }
  }, [user?.id, actualUserPlan])

  // Carregar favoritos (apenas para premium)
  useEffect(() => {
    const loadFavorites = async () => {
      if (user && slug && actualUserPlan === 'premium') {
        try {
          setFavoritesLoading(true)
          const favorites = await getUserFavorites(user.id, slug)
          setFavoritePhrases(favorites)
        } catch (error) {
          console.error('Erro ao carregar favoritos:', error)
        } finally {
          setFavoritesLoading(false)
        }
      }
    }

    loadFavorites()
  }, [user, slug, actualUserPlan])
  
  // Filtrar frases baseado no plano do usuário
  const availablePhrases = actualUserPlan === 'free' 
    ? trail.phrases.slice(0, Math.min(10, freeLimitations.maxPhrases)) 
    : trail.phrases
  
  const currentPhrase = availablePhrases[currentPhraseIndex]
  const iconData = slug ? iconMapping[slug] : null

  const handleLogoClick = () => {
    router.push(user ? '/dashboard' : '/')
  }

  const handlePlayAudio = () => {
    if (currentPhrase) {
      setIsPlayingAudio(true)
      
      // Usar a API de síntese de voz do navegador
      const utterance = new SpeechSynthesisUtterance(currentPhrase.english)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      utterance.pitch = 1
      
      utterance.onend = () => {
        setIsPlayingAudio(false)
      }
      
      utterance.onerror = () => {
        setIsPlayingAudio(false)
      }
      
      speechSynthesis.speak(utterance)
    }
  }

  const handleNext = () => {
    if (currentPhraseIndex < availablePhrases.length - 1) {
      // Para usuários free, verificar e incrementar limite
      if (actualUserPlan === 'free' && user?.id) {
        const newUsage = incrementFreeUsage(user.id)
        setFreeLimitations(newUsage)
        
        if (newUsage.isBlocked) {
          // Se atingiu o limite, mostrar mensagem
          return
        }
      }
      
      setCurrentPhraseIndex(currentPhraseIndex + 1)
      setShowTranslation(false)
    }
  }

  const handlePrevious = () => {
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex(currentPhraseIndex - 1)
      setShowTranslation(false)
    }
  }

  const handleToggleFavorite = async () => {
    if (!user || !slug || actualUserPlan !== 'premium' || !currentPhrase) {
      console.log('Favoritos: Verificação falhou', { user: !!user, slug, actualUserPlan, currentPhrase: !!currentPhrase })
      return
    }

    console.log('Tentando alterar favorito:', { phraseIndex: currentPhraseIndex, userId: user.id, slug })

    const phraseIndex = currentPhraseIndex
    const isCurrentlyFavorite = favoritePhrases.includes(phraseIndex)

    console.log('Estado atual:', { isCurrentlyFavorite, favoritePhrases })

    setFavoritesLoading(true)
    setFavoriteMessage('')

    // Atualizar estado local imediatamente para feedback visual
    setFavoritePhrases(prev => {
      const newState = isCurrentlyFavorite 
        ? prev.filter(index => index !== phraseIndex)
        : [...prev, phraseIndex]
      console.log('Novo estado local:', newState)
      return newState
    })

    // Salvar no banco de dados
    try {
      let result
      if (isCurrentlyFavorite) {
        result = await removeFromFavorites(user.id, slug, phraseIndex)
        console.log('Resultado remoção:', result)
        if (result) {
          setFavoriteMessage('⭐ Removido dos favoritos')
        }
      } else {
        result = await addToFavorites(user.id, {
          trail_slug: slug,
          phrase_index: phraseIndex,
          phrase_english: currentPhrase.english,
          phrase_portuguese: currentPhrase.portuguese
        })
        console.log('Resultado adição:', result)
        if (result) {
          setFavoriteMessage('⭐ Adicionado aos favoritos!')
        }
      }
      
      if (!result) {
        throw new Error('Operação falhou')
      }
    } catch (error) {
      console.error('Erro ao salvar favorito:', error)
      setFavoriteMessage('❌ Erro ao salvar favorito')
      
      // Reverter estado local se houver erro
      setFavoritePhrases(prev => {
        return isCurrentlyFavorite 
          ? [...prev, phraseIndex]
          : prev.filter(index => index !== phraseIndex)
      })
    } finally {
      setFavoritesLoading(false)
      
      // Limpar mensagem após 3 segundos
      setTimeout(() => {
        setFavoriteMessage('')
      }, 3000)
    }
  }

  // Mostrar bloqueio se usuário free atingiu limite
  if (actualUserPlan === 'free' && freeLimitations.isBlocked) {
    return (
      <AnimatedContainer className="min-h-screen">
        <header className="bg-gray-900/50 border-b border-gray-700 p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Logo size="sm" />
              <span className="text-white font-bold">Inglês pra Já</span>
            </button>
            <Link 
              href="/dashboard"
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full text-white font-semibold transition-colors text-sm"
            >
              ← Dashboard
            </Link>
          </div>
        </header>
        
        <div className="max-w-4xl mx-auto p-6 flex items-center justify-center min-h-[80vh]">
          <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-2 border-red-500/50 rounded-xl p-8 text-center max-w-2xl">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Limite Diário Atingido!
            </h1>
            <p className="text-gray-300 mb-6 text-lg">
              Você já praticou suas {freeLimitations.maxPhrases} frases diárias gratuitas.
            </p>
            
            <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
              <div className="flex justify-center items-center gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{freeLimitations.phrasesUsed}</div>
                  <div className="text-gray-400 text-sm">Frases Usadas</div>
                </div>
                <div className="text-gray-500 text-xl">/</div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-400">{freeLimitations.maxPhrases}</div>
                  <div className="text-gray-400 text-sm">Limite Diário</div>
                </div>
              </div>
              {freeLimitations.timeRemaining && (
                <p className="text-orange-400 font-medium">
                  ⏰ Próximo acesso em: {freeLimitations.timeRemaining}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-full text-white font-bold transition-all duration-300 transform hover:scale-105"
                onClick={() => alert('Funcionalidade de assinatura será implementada em breve! 🚀')}
              >
                🌟 Upgrade para Premium
              </button>
              <Link 
                href="/dashboard"
                className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full text-white font-semibold transition-colors text-center"
              >
                ← Voltar ao Dashboard
              </Link>
            </div>
          </div>
        </div>
      </AnimatedContainer>
    )
  }

  if (!currentPhrase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Nenhuma frase disponível</h1>
          <Link href="/dashboard" className="text-cyan-400 hover:text-cyan-300">
            ← Voltar ao Dashboard
          </Link>
        </div>
      </div>
    )
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
              {/* Contador para usuários free */}
              {actualUserPlan === 'free' && !freeLimitations.isBlocked && (
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg px-3 py-2">
                  <div className="text-blue-400 text-xs font-medium">🆓 Plano Gratuito</div>
                  <div className="text-white text-sm font-bold">
                    {freeLimitations.phrasesUsed}/{freeLimitations.maxPhrases} frases hoje
                  </div>
                </div>
              )}
              
              <Link 
                href="/dashboard"
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full text-white font-semibold transition-colors text-sm"
              >
                ← Dashboard
              </Link>
              
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </header>
      </PageTransition>

      <div className="max-w-4xl mx-auto p-6">
        {/* Header da Trilha */}
        <PageTransition delay={200}>
          <div className="text-center mb-8">
            <div className="mb-4 flex justify-center">
              {iconData ? (
                <iconData.component size={64} className={iconData.color} />
              ) : (
                <span className="text-6xl">{trail.icon}</span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{trail.title}</h1>
            <p className="text-gray-400">{trail.description}</p>
          </div>
        </PageTransition>

        {/* Contador de Frases */}
        <PageTransition delay={300}>
          <div className="text-center mb-6">
            <span className="text-gray-400">
              Frase {currentPhraseIndex + 1} de {availablePhrases.length}
            </span>
          </div>
        </PageTransition>

        {/* Frase Principal */}
        <PageTransition delay={400}>
          <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 rounded-xl p-8 mb-8">
            {/* Estrela de favorito no canto superior direito - apenas para premium */}
            {actualUserPlan === 'premium' && (
              <button
                onClick={handleToggleFavorite}
                disabled={favoritesLoading}
                className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg ${
                  favoritePhrases.includes(currentPhraseIndex)
                    ? 'bg-yellow-500/30 text-yellow-400 hover:bg-yellow-500/40 shadow-yellow-500/20'
                    : 'bg-gray-700/70 text-gray-400 hover:bg-gray-600/70 hover:text-yellow-400 shadow-black/20'
                } ${favoritesLoading ? 'animate-pulse opacity-70' : ''}`}
                title={favoritePhrases.includes(currentPhraseIndex) ? 'Remover dos favoritos' : 'Favoritar essa mensagem'}
              >
                {favoritesLoading ? (
                  <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <StarIcon 
                    size={24} 
                    className={`transition-all duration-300 ${
                      favoritePhrases.includes(currentPhraseIndex) 
                        ? 'fill-current text-yellow-400 drop-shadow-sm' 
                        : 'text-gray-400'
                    }`} 
                  />
                )}
              </button>
            )}

            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4 pr-12">
                {currentPhrase.english}
              </h2>
              
              {showTranslation && (
                <p className="text-xl text-gray-300 mb-4">
                  {currentPhrase.portuguese}
                </p>
              )}
              
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={handlePlayAudio}
                  disabled={isPlayingAudio}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-full text-white font-semibold transition-colors flex items-center gap-2"
                >
                  <SpeakerIcon size={20} />
                  {isPlayingAudio ? 'Tocando...' : 'Ouvir'}
                </button>
                
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-white font-semibold transition-colors"
                >
                  {showTranslation ? 'Ocultar' : 'Ver Tradução'}
                </button>
              </div>
              
              <div className="text-sm text-gray-400">
                Contexto: {currentPhrase.context} • Nível: {currentPhrase.level}
              </div>
              
              {/* Mensagem de feedback para favoritos */}
              {favoriteMessage && (
                <div className="mt-4 px-4 py-2 rounded-lg bg-blue-900/20 border border-blue-500/30 text-blue-300 text-center text-sm font-medium animate-fade-in">
                  {favoriteMessage}
                </div>
              )}
            </div>
          </div>
        </PageTransition>

        {/* Navegação */}
        <PageTransition delay={500}>
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentPhraseIndex === 0}
              className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full text-white font-semibold transition-colors"
            >
              ← Anterior
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentPhraseIndex === availablePhrases.length - 1}
              className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full text-white font-semibold transition-colors"
            >
              Próxima →
            </button>
          </div>
        </PageTransition>

        {/* Lista de Frases Favoritadas - apenas para premium */}
        {actualUserPlan === 'premium' && favoritePhrases.length > 0 && (
          <PageTransition delay={600}>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <StarIcon size={24} className="text-yellow-400" />
                Suas Frases Favoritas ({favoritePhrases.length})
              </h3>
              <div className="grid gap-3">
                {favoritePhrases.map((phraseIndex) => {
                  const phrase = availablePhrases[phraseIndex]
                  if (!phrase) return null
                  return (
                    <div 
                      key={phraseIndex}
                      onClick={() => setCurrentPhraseIndex(phraseIndex)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                        phraseIndex === currentPhraseIndex 
                          ? 'border-yellow-500 bg-yellow-900/20 shadow-lg shadow-yellow-500/10' 
                          : 'border-gray-700 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-white font-medium mb-1">{phrase.english}</p>
                          <p className="text-gray-400 text-sm mb-2">{phrase.portuguese}</p>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              phrase.level === 'básico' ? 'bg-green-500/20 text-green-400' :
                              phrase.level === 'médio' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {phrase.level}
                            </span>
                            <span className="text-gray-400 text-sm">{phrase.context}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {phraseIndex === currentPhraseIndex && (
                            <span className="text-blue-400 text-sm font-medium">← Atual</span>
                          )}
                          <StarIcon size={18} className="text-yellow-400" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </PageTransition>
        )}

        {/* Aviso para usuários free */}
        {actualUserPlan === 'free' && (
          <PageTransition delay={700}>
            <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold text-white mb-2">🌟 Upgrade para Premium</h3>
              <p className="text-gray-300 mb-4">
                Você está vendo {availablePhrases.length} de {trail.phrases.length} frases. 
                Upgrade para acessar todas as frases e recursos premium!
              </p>
              <button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-full text-white font-bold transition-all duration-300">
                Fazer Upgrade
              </button>
            </div>
          </PageTransition>
        )}
      </div>
    </AnimatedContainer>
  )
}