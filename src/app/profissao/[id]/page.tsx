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
import FreePlanLimitMessage from '@/components/FreePlanLimitMessage'
import { PROFESSIONS, Profession, ProfessionPhrase } from '@/data/professions'

export default function ProfessionPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const router = useRouter()
  const {
    totalPhrasesViewed,
    isPhrasesBlocked, 
    getRealTimeCountdown,
    isPremium,
    incrementPhrases,
    getRemainingPhrases
  } = useGlobalLimits()
  
  const [profession, setProfession] = useState<Profession | null>(null)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)
  const [playingAudio, setPlayingAudio] = useState(false)
  const [completedPhrases, setCompletedPhrases] = useState<Set<string>>(new Set())
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')
  
  const isBlocked = isPhrasesBlocked && !isPremium
  const remainingPhrases = getRemainingPhrases()
  const timeUntilReset = getRealTimeCountdown()
  const { incrementPhrasesPracticed } = useStats()

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
        setCompletedPhrases(new Set(JSON.parse(savedCompleted)))
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

  const getFilteredPhrases = (): ProfessionPhrase[] => {
    if (!profession) return []
    if (selectedDifficulty === 'all') return profession.phrases
    return profession.phrases.filter(phrase => phrase.difficulty === selectedDifficulty)
  }

  const filteredPhrases = getFilteredPhrases()
  const currentPhrase = filteredPhrases[currentPhraseIndex]

  const handleNextPhrase = () => {
    if (!currentPhrase) return

    // Verificar limitações para usuários gratuitos
    if (isBlocked) {
      return
    }

    // Verificar se pode visualizar mais frases (incrementa contador)
    const canView = incrementPhrases()
    if (!canView) {
      return
    }

    // Marcar como completada
    const newCompleted = new Set(completedPhrases)
    newCompleted.add(currentPhrase.id)
    setCompletedPhrases(newCompleted)
    
    // Salvar no localStorage
    if (profession) {
      localStorage.setItem(`completed_profession_${profession.id}`, JSON.stringify([...newCompleted]))
    }
    
    // Incrementar contador de frases praticadas
    incrementPhrasesPracticed()

    setShowTranslation(false)
    
    if (currentPhraseIndex < filteredPhrases.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1)
    } else {
      // Fim das frases
      alert('🎉 Parabéns! Você completou todas as frases desta profissão!')
      router.push('/dashboard')
    }
  }

  const handlePreviousPhrase = () => {
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex(currentPhraseIndex - 1)
      setShowTranslation(false)
    }
  }

  const speakPhrase = async (text: string) => {
    if (playingAudio) return

    try {
      setPlayingAudio(true)

      // Chamar API TTS da OpenAI
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
      })

      if (!response.ok) {
        throw new Error('Falha ao gerar áudio')
      }

      // Converter resposta para blob de áudio
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      
      // Criar e reproduzir áudio
      const audio = new Audio(audioUrl)
      
      audio.onended = () => {
        setPlayingAudio(false)
        URL.revokeObjectURL(audioUrl)
      }
      
      audio.onerror = () => {
        setPlayingAudio(false)
        URL.revokeObjectURL(audioUrl)
      }

      await audio.play()

    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error)
      setPlayingAudio(false)
      
      // Fallback para Web Speech API
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'en-US'
        utterance.rate = 0.9
        speechSynthesis.speak(utterance)
      }
    }
  }

  if (!profession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    )
  }

  const progress = Math.round(((currentPhraseIndex + 1) / filteredPhrases.length) * 100)

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
              <AuthButton />
            </div>
          </div>
        </header>
      </PageTransition>

      <div className="max-w-4xl mx-auto p-6">
        {/* Header da Profissão */}
        <PageTransition delay={200}>
          <div className="text-center mb-8">
            <div className="mb-4 flex justify-center">
              <span className="text-6xl">{profession.icon}</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {profession.title}
            </h1>
            <p className="text-gray-400 text-lg mb-4">
              {profession.description}
            </p>
            
            {/* Filtros de Dificuldade */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => {
                    setSelectedDifficulty(difficulty)
                    setCurrentPhraseIndex(0)
                    setShowTranslation(false)
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    selectedDifficulty === difficulty
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {difficulty === 'all' ? 'Todas' : 
                   difficulty === 'beginner' ? 'Iniciante' :
                   difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                </button>
              ))}
            </div>

            {/* Progresso */}
            <div className="bg-gray-800 rounded-full h-3 mb-4 max-w-md mx-auto">
              <div 
                className="bg-gradient-to-r from-purple-600 to-cyan-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm">
              Frase {currentPhraseIndex + 1} de {filteredPhrases.length} • {progress}% concluído
            </p>
          </div>
        </PageTransition>

        {/* Mensagem de limite excedido */}
        {isBlocked && (
          <FreePlanLimitMessage 
            timeUntilReset={timeUntilReset} 
            onUpgradeClick={handleUpgrade}
          />
        )}

        {/* Card da Frase */}
        {currentPhrase && !isBlocked && (
          <PageTransition delay={400}>
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 mb-8">
              <div className="text-center">
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    currentPhrase.difficulty === 'beginner' ? 'bg-green-500/20 text-green-300' :
                    currentPhrase.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {currentPhrase.difficulty === 'beginner' ? 'Iniciante' :
                     currentPhrase.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                  </span>
                  <span className="ml-2 px-3 py-1 rounded-full text-sm font-semibold bg-purple-500/20 text-purple-300">
                    {currentPhrase.situation}
                  </span>
                </div>
                
                <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-xl p-6 mb-6">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {currentPhrase.english}
                  </h2>
                  <button
                    onClick={() => speakPhrase(currentPhrase.english)}
                    disabled={playingAudio}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      playingAudio 
                        ? 'bg-green-600 animate-pulse cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {playingAudio ? '🎵 Reproduzindo...' : '🔊 Ouvir'}
                  </button>
                </div>

                {showTranslation && (
                  <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-4 mb-6">
                    <p className="text-gray-300 text-lg">
                      {currentPhrase.portuguese}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => setShowTranslation(!showTranslation)}
                    className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl text-white font-semibold transition-colors"
                  >
                    {showTranslation ? '👁️ Ocultar Tradução' : '👁️ Ver Tradução'}
                  </button>
                  
                  <button
                    onClick={handlePreviousPhrase}
                    disabled={currentPhraseIndex === 0}
                    className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-white font-semibold transition-colors"
                  >
                    ← Anterior
                  </button>

                  <button
                    onClick={handleNextPhrase}
                    disabled={isBlocked}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-white font-semibold transition-colors"
                  >
                    {currentPhraseIndex === filteredPhrases.length - 1 ? 'Finalizar 🎉' : 'Próxima →'}
                  </button>
                </div>
              </div>
            </div>
          </PageTransition>
        )}

        {/* Indicador de frases restantes para usuários gratuitos */}
        {!isBlocked && remainingPhrases > 0 && remainingPhrases < 3 && !isPremium && (
          <PageTransition delay={600}>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-yellow-900/30 border border-yellow-500/50 rounded-lg px-4 py-3">
                <span className="text-yellow-400">
                  ⚡ {remainingPhrases} frase{remainingPhrases !== 1 ? 's' : ''} restante{remainingPhrases !== 1 ? 's' : ''} no plano gratuito
                </span>
                <button
                  onClick={handleUpgrade}
                  className="ml-2 bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-white text-sm transition-colors"
                >
                  Upgrade
                </button>
              </div>
            </div>
          </PageTransition>
        )}

        {/* Lista de Frases Completadas */}
        {completedPhrases.size > 0 && (
          <PageTransition delay={800}>
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                ✅ Frases Praticadas ({completedPhrases.size})
              </h3>
              <div className="grid gap-3">
                {profession.phrases
                  .filter(phrase => completedPhrases.has(phrase.id))
                  .map((phrase) => (
                    <div key={phrase.id} className="bg-gray-800/50 rounded-lg p-3">
                      <div className="text-white font-semibold text-sm mb-1">
                        {phrase.english}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {phrase.portuguese}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </PageTransition>
        )}
      </div>
    </AnimatedContainer>
  )
}