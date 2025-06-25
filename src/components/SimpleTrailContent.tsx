'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from './Logo'
import { useAuth } from '@/contexts/AuthContext'
import PageTransition from './PageTransition'
import AnimatedContainer from './AnimatedContainer'
import { WorkIcon, TravelIcon, ShoppingIcon, CasualIcon, BusinessIcon, RestaurantIcon, SpeakerIcon } from './ModernIcons'

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
  
  // Usar plano real do usuário
  const actualUserPlan = userProfile?.plan || userPlan || 'free'
  
  // Filtrar frases para usuários free (máximo 10)
  const availablePhrases = actualUserPlan === 'free' 
    ? trail.phrases.slice(0, 10) 
    : trail.phrases
  
  const currentPhrase = availablePhrases[currentPhraseIndex]
  const iconData = slug ? iconMapping[slug] : null

  const handleLogoClick = () => {
    router.push(user ? '/dashboard' : '/')
  }

  const handleNext = () => {
    if (currentPhraseIndex < availablePhrases.length - 1) {
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
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 rounded-xl p-8 mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                {currentPhrase.english}
              </h2>
              
              {showTranslation && (
                <p className="text-xl text-gray-300 mb-4">
                  {currentPhrase.portuguese}
                </p>
              )}
              
              <div className="flex justify-center gap-4 mb-6">
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

        {/* Aviso para usuários free */}
        {actualUserPlan === 'free' && (
          <PageTransition delay={600}>
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