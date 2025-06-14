'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from './Logo'
import { useAuth } from '@/contexts/AuthContext'
import { useUserStats } from '@/hooks/useUserStats'
import PageTransition from './PageTransition'
import AnimatedContainer from './AnimatedContainer'
import DragDropExercise from './DragDropExercise'
import { getUserFavorites, addToFavorites, removeFromFavorites } from '@/lib/favorites'

interface Phrase {
  english: string
  portuguese: string
  level: 'básico' | 'médio' | 'avançado'
  context: string
}

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
  phrases: Phrase[]
  exercises?: Exercise[]
}

interface TrailContentProps {
  trail: Trail
  userPlan: 'free' | 'premium'
  slug?: string
}

export default function TrailContent({ trail, userPlan, slug }: TrailContentProps) {
  const { user, userProfile } = useAuth()
  const { incrementPhrasesViewed } = useUserStats()
  
  // Usar plano real do usuário ou fallback para o prop
  const actualUserPlan = userProfile?.plan || userPlan || 'free'
  const router = useRouter()
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)
  const [completedPhrases, setCompletedPhrases] = useState<number[]>([])
  const [showPronunciation, setShowPronunciation] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<'todas' | 'básico' | 'médio' | 'avançado'>('todas')
  const [favoritePhrases, setFavoritePhrases] = useState<number[]>([]) // Índices das frases favoritadas
  const [favoritesLoading, setFavoritesLoading] = useState(false)

  // Carregar favoritos do usuário ao montar o componente
  useEffect(() => {
    const loadFavorites = async () => {
      if (user && slug && actualUserPlan === 'premium') {
        setFavoritesLoading(true)
        const favorites = await getUserFavorites(user.id, slug)
        setFavoritePhrases(favorites)
        setFavoritesLoading(false)
      }
    }

    loadFavorites()
  }, [user, slug, actualUserPlan])

  // Filtrar frases por nível (apenas para premium ou demo)
  const getFilteredPhrases = () => {
    let filtered = trail.phrases
    
    // Aplicar filtro de nível apenas para usuários premium
    if (actualUserPlan === 'premium' && selectedLevel !== 'todas') {
      filtered = trail.phrases.filter(phrase => phrase.level === selectedLevel)
    }
    
    // Aplicar limite para usuários free
    if (actualUserPlan === 'free') {
      filtered = filtered.slice(0, 10)
    }
    
    return filtered
  }

  const availablePhrases = getFilteredPhrases()
  const currentPhrase = availablePhrases[currentPhraseIndex]
  
  // Verificar se há frases disponíveis
  if (!currentPhrase && availablePhrases.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Nenhuma frase encontrada para o nível "{selectedLevel}"
          </h2>
          <p className="text-gray-400 mb-6">
            Tente selecionar outro nível ou volte para "Todas" as frases.
          </p>
          <button
            onClick={() => setSelectedLevel('todas')}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
          >
            Ver Todas as Frases
          </button>
        </div>
      </div>
    )
  }
  
  const progress = ((completedPhrases.length) / availablePhrases.length) * 100

  const handleNext = () => {
    if (!completedPhrases.includes(currentPhraseIndex)) {
      setCompletedPhrases([...completedPhrases, currentPhraseIndex])
      // Incrementar contador de frases visualizadas
      incrementPhrasesViewed()
    }
    
    if (currentPhraseIndex < availablePhrases.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1)
      setShowTranslation(false)
      setShowPronunciation(false)
    }
  }

  const handlePrevious = () => {
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex(currentPhraseIndex - 1)
      setShowTranslation(false)
      setShowPronunciation(false)
    }
  }

  const speakPhrase = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      speechSynthesis.speak(utterance)
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'básico': return 'bg-green-500/20 text-green-400'
      case 'médio': return 'bg-yellow-500/20 text-yellow-400'
      case 'avançado': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const handleLogoClick = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  const handleLevelChange = (level: 'todas' | 'básico' | 'médio' | 'avançado') => {
    setSelectedLevel(level)
    setCurrentPhraseIndex(0)
    setShowTranslation(false)
    setShowPronunciation(false)
    setCompletedPhrases([])
  }

  const toggleFavorite = async (phraseIndex: number) => {
    if (!user || !slug) return

    const phrase = availablePhrases[phraseIndex]
    if (!phrase) return

    const isCurrentlyFavorite = favoritePhrases.includes(phraseIndex)

    // Atualizar estado local imediatamente para feedback visual
    setFavoritePhrases(prev => {
      if (isCurrentlyFavorite) {
        return prev.filter(index => index !== phraseIndex)
      } else {
        return [...prev, phraseIndex]
      }
    })

    // Salvar no banco de dados
    try {
      if (isCurrentlyFavorite) {
        await removeFromFavorites(user.id, slug, phraseIndex)
      } else {
        await addToFavorites(user.id, {
          trail_slug: slug,
          phrase_index: phraseIndex,
          phrase_english: phrase.english,
          phrase_portuguese: phrase.portuguese
        })
      }
    } catch (error) {
      console.error('Erro ao salvar favorito:', error)
      // Reverter estado local se houver erro
      setFavoritePhrases(prev => {
        if (isCurrentlyFavorite) {
          return [...prev, phraseIndex]
        } else {
          return prev.filter(index => index !== phraseIndex)
        }
      })
    }
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
            
            
            <div className="text-sm text-gray-400">
              {completedPhrases.length}/{availablePhrases.length} frases
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </div>
      </header>
      </PageTransition>

      <div className="max-w-4xl mx-auto p-6">
        {/* Trail Header */}
        <PageTransition delay={200}>
          <div className="text-center mb-8">
          <div className="text-6xl mb-4">{trail.icon}</div>
          <h1 className="text-3xl font-bold text-white mb-2">{trail.title}</h1>
          <p className="text-gray-400 mb-6">{trail.description}</p>
          
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
          
          {/* Filtro e Estatísticas por Nível - Apenas Premium */}
          {actualUserPlan === 'premium' && (
            <div className="mt-4 space-y-3">
              {/* Botões de Filtro */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => handleLevelChange('todas')}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                    selectedLevel === 'todas' 
                      ? 'bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border-purple-400/50 text-white shadow-lg shadow-purple-500/20 scale-105' 
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white hover:scale-102'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    📚 <span>Todas</span>
                  </span>
                </button>
                <button
                  onClick={() => handleLevelChange('básico')}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                    selectedLevel === 'básico' 
                      ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-400/50 text-white shadow-lg shadow-green-500/20 scale-105' 
                      : 'bg-green-500/10 border-green-500/20 text-green-300 hover:bg-green-500/20 hover:border-green-400/40 hover:text-green-200 hover:scale-102'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    🟢 <span>Básico</span>
                  </span>
                </button>
                <button
                  onClick={() => handleLevelChange('médio')}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                    selectedLevel === 'médio' 
                      ? 'bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-yellow-400/50 text-white shadow-lg shadow-yellow-500/20 scale-105' 
                      : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300 hover:bg-yellow-500/20 hover:border-yellow-400/40 hover:text-yellow-200 hover:scale-102'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    🟡 <span>Intermediário</span>
                  </span>
                </button>
                <button
                  onClick={() => handleLevelChange('avançado')}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                    selectedLevel === 'avançado' 
                      ? 'bg-gradient-to-r from-red-500/30 to-pink-500/30 border-red-400/50 text-white shadow-lg shadow-red-500/20 scale-105' 
                      : 'bg-red-500/10 border-red-500/20 text-red-300 hover:bg-red-500/20 hover:border-red-400/40 hover:text-red-200 hover:scale-102'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    🔴 <span>Avançado</span>
                  </span>
                </button>
              </div>
              
              {/* Indicador do filtro ativo */}
              {selectedLevel !== 'todas' && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-300 px-5 py-3 rounded-xl text-sm font-medium shadow-lg shadow-purple-500/10">
                    <span className="flex items-center gap-2">
                      🎯 <span>Filtrando:</span> 
                      <span className="text-white font-semibold">
                        {selectedLevel === 'médio' ? 'Intermediário' : selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}
                      </span>
                    </span>
                    <button
                      onClick={() => handleLevelChange('todas')}
                      className="ml-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white transition-all duration-200 hover:scale-110"
                      title="Limpar filtro"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        </PageTransition>

        {/* Main Card */}
        <PageTransition delay={400}>
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 mb-6">
          {/* Context & Level */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-purple-400 text-sm font-medium">
              📍 {currentPhrase.context}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(currentPhrase.level)}`}>
              {currentPhrase.level}
            </span>
          </div>

          {/* Botão de Favorito - para todas as trilhas (premium) */}
          {actualUserPlan === 'premium' && (
            <div className="flex justify-end mb-4">
              <button
                onClick={() => toggleFavorite(currentPhraseIndex)}
                className={`flex items-center gap-2 px-3 py-2 transition-all duration-300 hover:scale-105 ${
                  favoritePhrases.includes(currentPhraseIndex)
                    ? 'text-yellow-400'
                    : 'text-gray-400 hover:text-yellow-400'
                }`}
                title={favoritePhrases.includes(currentPhraseIndex) ? 'Remover dos favoritos' : 'Guardar esta frase'}
              >
                <span className="text-lg">
                  {favoritePhrases.includes(currentPhraseIndex) ? '⭐' : '☆'}
                </span>
                {favoritePhrases.includes(currentPhraseIndex) ? (
                  <span className="text-green-400 text-lg">✓</span>
                ) : (
                  <span className="text-sm font-medium">Guardar essa frase</span>
                )}
              </button>
            </div>
          )}

          {/* English Phrase */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-2xl font-bold text-white">🇺🇸 English</h2>
              <button
                onClick={() => speakPhrase(currentPhrase.english)}
                className="bg-purple-600 hover:bg-purple-700 p-2 rounded-full transition-colors"
                title="Ouvir pronúncia"
              >
                🔊
              </button>
            </div>
            <p className="text-xl text-white leading-relaxed bg-gray-800/50 p-4 rounded-lg">
              {currentPhrase.english}
            </p>
          </div>

          {/* Translation */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-semibold text-white">🇧🇷 Português</h3>
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-full text-sm transition-colors"
              >
                {showTranslation ? 'Ocultar' : 'Mostrar'} Tradução
              </button>
            </div>
            {showTranslation && (
              <p className="text-base md:text-lg text-gray-300 bg-gray-800/50 p-4 rounded-lg">
                {currentPhrase.portuguese}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={handlePrevious}
              disabled={currentPhraseIndex === 0}
              className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full text-white font-semibold transition-colors"
            >
              ← Anterior
            </button>
            
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
            >
              {currentPhraseIndex === availablePhrases.length - 1 ? 'Finalizar' : 'Próxima →'}
            </button>
          </div>
          </div>
        </PageTransition>

        {/* Free Plan Limit Notice */}
        {actualUserPlan === 'free' && currentPhraseIndex >= 9 && (
          <PageTransition delay={600}>
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500/30 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              🎉 Você completou o limite gratuito!
            </h3>
            <p className="text-gray-300 mb-4">
              Desbloqueie {trail.phrases.length - 10} frases adicionais e acesso ilimitado
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-3 rounded-full text-white font-bold transition-all duration-300">
              Upgrade para Premium 🚀
            </button>
            </div>
          </PageTransition>
        )}


        {/* Lista de Frases Favoritadas - Para todas as trilhas (premium) */}
        {actualUserPlan === 'premium' && favoritePhrases.length > 0 && (
          <PageTransition delay={800}>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                ⭐ Frases Favoritadas ({favoritePhrases.length})
              </h3>
              <div className="grid gap-3">
                {favoritePhrases.map((phraseIndex) => {
                  const phrase = availablePhrases[phraseIndex]
                  if (!phrase) return null
                  return (
                    <div 
                      key={phraseIndex}
                      onClick={() => setCurrentPhraseIndex(phraseIndex)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        phraseIndex === currentPhraseIndex 
                          ? 'border-yellow-500 bg-yellow-900/20' 
                          : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                      } ${completedPhrases.includes(phraseIndex) ? 'opacity-75' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-white font-medium mb-1">{phrase.english}</p>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs ${getLevelColor(phrase.level)}`}>
                              {phrase.level}
                            </span>
                            <span className="text-gray-400 text-sm">{phrase.context}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {completedPhrases.includes(phraseIndex) && (
                            <span className="text-green-400 text-xl">✓</span>
                          )}
                          <span className="text-yellow-400 text-lg">⭐</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </PageTransition>
        )}

        {/* Lista de Frases Favoritadas - Mensagem quando vazia (todas as trilhas) */}
        {actualUserPlan === 'premium' && favoritePhrases.length === 0 && !favoritesLoading && (
          <PageTransition delay={800}>
            <div className="mt-8">
              <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-3">
                  ⭐ Suas Frases Favoritas
                </h3>
                <p className="text-gray-300 mb-4">
                  <strong>Guarde frases</strong> enquanto estuda para criar sua lista personalizada de estudos!
                </p>
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                  <p className="text-yellow-300 text-sm font-medium mb-2">
                    💡 Como guardar uma frase:
                  </p>
                  <p className="text-gray-400 text-sm">
                    Clique em "Guardar essa frase" <span className="text-yellow-400">☆</span> e ela será salva.
                    Aparecerá assim: <span className="text-yellow-400">⭐</span> <span className="text-green-400">✓</span>
                  </p>
                </div>
                <p className="text-gray-500 text-xs">
                  Suas frases guardadas aparecerão aqui para revisão rápida!
                </p>
              </div>
            </div>
          </PageTransition>
        )}

        {/* Lista Completa - Para usuários premium sem favoritos ou com favoritos desabilitados */}
        {actualUserPlan === 'premium' && favoritePhrases.length === 0 && (
          <PageTransition delay={800}>
            <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Todas as Frases ({availablePhrases.length})</h3>
            <div className="grid gap-3">
              {availablePhrases.map((phrase, index) => (
                <div 
                  key={index}
                  onClick={() => setCurrentPhraseIndex(index)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    index === currentPhraseIndex 
                      ? 'border-purple-500 bg-purple-900/20' 
                      : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                  } ${completedPhrases.includes(index) ? 'opacity-75' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">{phrase.english}</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${getLevelColor(phrase.level)}`}>
                          {phrase.level}
                        </span>
                        <span className="text-gray-400 text-sm">{phrase.context}</span>
                      </div>
                    </div>
                    {completedPhrases.includes(index) && (
                      <span className="text-green-400 text-xl">✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            </div>
          </PageTransition>
        )}

        {/* Botão para Praticar - Para todas as trilhas com exercícios (premium) */}
        {trail.exercises && trail.exercises.length > 0 && actualUserPlan === 'premium' && (
          <PageTransition delay={1000}>
            <div className="mt-8">
              <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500/30 rounded-xl p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-3">
                  🎯 Pronto para Praticar?
                </h3>
                <p className="text-gray-300 mb-4">
                  Escolha como você quer praticar: exercícios interativos ou frases do dia a dia
                </p>
                <button 
                  onClick={() => router.push(`/trilha/${slug || 'eventos'}/praticar`)}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  🚀 Começar a Praticar
                </button>
              </div>
            </div>
          </PageTransition>
        )}

        {/* Mensagem para usuários Free */}
        {actualUserPlan === 'free' && (
          <PageTransition delay={800}>
            <div className="mt-8 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500/30 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              🔒 Área Premium
            </h3>
            <p className="text-gray-300 mb-4">
              Acesse a lista completa de frases, navegação avançada e muito mais conteúdo exclusivo!
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-3 rounded-full text-white font-bold transition-all duration-300">
              Upgrade para Premium 🚀
            </button>
            </div>
          </PageTransition>
        )}
      </div>
    </AnimatedContainer>
  )
}