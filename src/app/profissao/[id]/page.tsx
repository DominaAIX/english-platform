'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import AuthButton from '@/components/AuthButton'
import { useAuth } from '@/contexts/AuthContext'
import { useGlobalLimits } from '@/hooks/useGlobalLimits'
import { useStats } from '@/contexts/StatsContext'
import PageTransition from '@/components/PageTransition'
import AnimatedContainer from '@/components/AnimatedContainer'
import GlobalLimitMessage from '@/components/GlobalLimitMessage'
import { PROFESSIONS, Profession, ProfessionPhrase } from '@/data/professions'
import { SpeakerIcon, SendIcon } from '@/components/ModernIcons'

export default function ProfessionPage() {
  const { id } = useParams()
  const { user, userProfile } = useAuth()
  const router = useRouter()
  const { incrementPhrasesViewed } = useStats()
  const { 
    isPhrasesBlocked, 
    incrementPhrases, 
    getRemainingPhrases, 
    getRealTimeCountdown,
    isPremium,
    totalPhrasesViewed
  } = useGlobalLimits()
  
  // Usar o plano real do usuário autenticado do userProfile
  const actualUserPlan = userProfile?.plan || 'free'
  
  const [profession, setProfession] = useState<Profession | null>(null)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)
  const [completedPhrases, setCompletedPhrases] = useState<number[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')
  const [hasReachedLimit, setHasReachedLimit] = useState(false)
  
  // Verificar limite global ao montar componente
  useEffect(() => {
    if (!isPremium && actualUserPlan === 'free') {
      setHasReachedLimit(isPhrasesBlocked || totalPhrasesViewed >= 10)
    } else {
      setHasReachedLimit(false)
    }
  }, [isPremium, actualUserPlan, totalPhrasesViewed, isPhrasesBlocked])

  useEffect(() => {
    const foundProfession = PROFESSIONS.find(p => p.id === id)
    if (foundProfession) {
      setProfession(foundProfession)
    } else {
      router.push('/dashboard')
    }
  }, [id, router])

  useEffect(() => {
    if (profession) {
      const savedCompleted = localStorage.getItem(`completed_profession_${profession.id}`)
      if (savedCompleted) {
        setCompletedPhrases(JSON.parse(savedCompleted))
      }
    }
  }, [profession])

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

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  const getFilteredPhrases = (): ProfessionPhrase[] => {
    if (!profession) return []
    if (selectedDifficulty === 'all') return profession.phrases
    return profession.phrases.filter(phrase => phrase.difficulty === selectedDifficulty)
  }

  const handleLevelChange = (level: 'all' | 'beginner' | 'intermediate' | 'advanced') => {
    setSelectedDifficulty(level)
    setCurrentPhraseIndex(0)
    setShowTranslation(false)
  }

  const filteredPhrases = getFilteredPhrases()
  const currentPhrase = filteredPhrases[currentPhraseIndex]
  const progress = filteredPhrases.length > 0 ? ((completedPhrases.length / filteredPhrases.length) * 100) : 0

  const handleNext = () => {
    if (!currentPhrase) return

    // Verificar limitações para usuários gratuitos
    if (hasReachedLimit && !isPremium && actualUserPlan === 'free') {
      return
    }

    // Verificar se pode visualizar mais frases (incrementa contador)
    const canView = incrementPhrases()
    if (!canView) {
      setHasReachedLimit(true)
      return
    }

    // Marcar como completada
    if (!completedPhrases.includes(currentPhraseIndex)) {
      const newCompleted = [...completedPhrases, currentPhraseIndex]
      setCompletedPhrases(newCompleted)
      
      // Salvar no localStorage
      if (profession) {
        localStorage.setItem(`completed_profession_${profession.id}`, JSON.stringify(newCompleted))
      }
      
      // Incrementar contador de frases praticadas
      incrementPhrasesViewed()
    }

    setShowTranslation(false)
    
    if (currentPhraseIndex < filteredPhrases.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1)
    } else {
      // Fim das frases
      alert('🎉 Parabéns! Você completou todas as frases desta profissão!')
      router.push('/dashboard')
    }
  }

  const handlePrevious = () => {
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex(currentPhraseIndex - 1)
      setShowTranslation(false)
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
      case 'beginner':
        return 'bg-green-500/20 text-green-300'
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-300'
      case 'advanced':
        return 'bg-red-500/20 text-red-300'
      default:
        return 'bg-gray-500/20 text-gray-300'
    }
  }

  if (!profession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    )
  }

  return (
    <AnimatedContainer className="min-h-screen">
      {/* Header */}
      <PageTransition delay={0}>
        <header className="bg-gray-900/50 border-b border-gray-700 p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Logo size="sm" />
              <span className="text-white font-bold">Inglês pra Já</span>
            </button>
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard"
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full text-white font-semibold transition-colors text-sm"
              >
                ← Voltar ao Dashboard
              </Link>
              <div className="text-sm text-gray-400">
                {completedPhrases.length}/{filteredPhrases.length} frases
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
        {actualUserPlan === 'free' && !isPremium && hasReachedLimit && (
          <GlobalLimitMessage 
            type="phrases"
            timeUntilReset={getRealTimeCountdown()}
            onUpgradeClick={handleUpgrade}
          />
        )}

        {/* Trail Header */}
        <PageTransition delay={200}>
          <div className="text-center mb-8">
            <div className="mb-4 flex justify-center">
              <span className="text-6xl">{profession.icon}</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{profession.title}</h1>
            <p className="text-gray-400 mb-6">{profession.description}</p>
            
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
            
            {/* Filtro de Dificuldade - Para todos os usuários */}
            <div className="mt-4 space-y-3">
              {/* Botões de Filtro */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => handleLevelChange('all')}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                    selectedDifficulty === 'all' 
                      ? 'bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border-purple-400/50 text-white shadow-lg shadow-purple-500/20 scale-105' 
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white hover:scale-102'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    📚 <span>Todas</span>
                  </span>
                </button>
                <button
                  onClick={() => handleLevelChange('beginner')}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                    selectedDifficulty === 'beginner' 
                      ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-400/50 text-white shadow-lg shadow-green-500/20 scale-105' 
                      : 'bg-green-500/10 border-green-500/20 text-green-300 hover:bg-green-500/20 hover:border-green-400/40 hover:text-green-200 hover:scale-102'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    🟢 <span>Iniciante</span>
                  </span>
                </button>
                <button
                  onClick={() => handleLevelChange('intermediate')}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                    selectedDifficulty === 'intermediate' 
                      ? 'bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-yellow-400/50 text-white shadow-lg shadow-yellow-500/20 scale-105' 
                      : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300 hover:bg-yellow-500/20 hover:border-yellow-400/40 hover:text-yellow-200 hover:scale-102'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    🟡 <span>Intermediário</span>
                  </span>
                </button>
                <button
                  onClick={() => handleLevelChange('advanced')}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                    selectedDifficulty === 'advanced' 
                      ? 'bg-gradient-to-r from-red-500/30 to-pink-500/30 border-red-400/50 text-white shadow-lg shadow-red-500/20 scale-105' 
                      : 'bg-red-500/10 border-red-500/20 text-red-300 hover:bg-red-500/20 hover:border-red-400/40 hover:text-red-200 hover:scale-102'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    🔴 <span>Avançado</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </PageTransition>

        {/* Phrase Card */}
        {currentPhrase && !hasReachedLimit && (
          <PageTransition delay={400}>
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 mb-8">
              <div className="text-center mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(currentPhrase.difficulty)}`}>
                  {currentPhrase.difficulty === 'beginner' ? 'Iniciante' :
                   currentPhrase.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                </span>
                <span className="ml-2 px-3 py-1 rounded-full text-sm font-semibold bg-purple-500/20 text-purple-300">
                  {currentPhrase.situation}
                </span>
              </div>

              {/* English Phrase */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    🇺🇸 English
                  </h2>
                  <button
                    onClick={() => speakPhrase(currentPhrase.english)}
                    className="bg-purple-600 hover:bg-purple-700 p-2 rounded-full transition-colors flex items-center justify-center"
                    title="Ouvir pronúncia"
                  >
                    <SpeakerIcon size={16} className="text-white" />
                  </button>
                </div>
                <p className="text-xl text-white leading-relaxed bg-gray-800/50 p-4 rounded-lg">
                  {currentPhrase.english}
                </p>
              </div>

              {/* Translation */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-white">
                    Português
                  </h3>
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
                  onClick={
                    hasReachedLimit && !isPremium && actualUserPlan === 'free' 
                      ? handleBackToDashboard 
                      : handleNext
                  }
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
                >
                  {hasReachedLimit && !isPremium && actualUserPlan === 'free' 
                    ? 'Voltar ao Dashboard'
                    : currentPhraseIndex === filteredPhrases.length - 1
                    ? 'Finalizar'
                    : 'Próxima →'
                  }
                </button>
              </div>
            </div>
          </PageTransition>
        )}

        {/* Free Plan Limit Notice */}
        {actualUserPlan === 'free' && hasReachedLimit && (
          <PageTransition delay={600}>
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500/30 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                🎉 Você completou o limite gratuito!
              </h3>
              <p className="text-gray-300 mb-4">
                Desbloqueie acesso ilimitado a todas as trilhas profissionais e mais de 1.100 frases
              </p>
              <div className="flex flex-col gap-3 justify-center items-center">
                <div className="flex justify-center">
                  <button 
                    onClick={handleUpgrade}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-3 rounded-full text-white font-bold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <SendIcon size={18} className="text-white" />
                    Upgrade para Premium
                  </button>
                </div>
                
                {getRealTimeCountdown() && (
                  <div className="bg-gray-800/50 px-4 py-3 rounded-lg border border-gray-600">
                    <span className="text-gray-300 text-sm">
                      ⏰ Reset em: <span className="text-white font-semibold">{getRealTimeCountdown()}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </PageTransition>
        )}

        {/* Lista de Frases Completadas */}
        {completedPhrases.length > 0 && (
          <PageTransition delay={800}>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                ✅ Frases Praticadas ({completedPhrases.length})
              </h3>
              <div className="grid gap-3">
                {completedPhrases.map((phraseIndex) => {
                  const phrase = filteredPhrases[phraseIndex]
                  if (!phrase) return null
                  return (
                    <div 
                      key={phraseIndex}
                      onClick={() => setCurrentPhraseIndex(phraseIndex)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        phraseIndex === currentPhraseIndex 
                          ? 'border-purple-500 bg-purple-900/20' 
                          : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-white font-medium mb-1">{phrase.english}</p>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs ${getLevelColor(phrase.difficulty)}`}>
                              {phrase.difficulty === 'beginner' ? 'Iniciante' :
                               phrase.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                            </span>
                            <span className="text-gray-400 text-sm">{phrase.situation}</span>
                          </div>
                        </div>
                        <div className="text-green-400 text-xl">✓</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </PageTransition>
        )}
      </div>
    </AnimatedContainer>
  )
}