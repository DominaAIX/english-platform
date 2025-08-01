'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import AuthButton from '@/components/AuthButton'
import { useAuth } from '@/contexts/AuthContext'
import { useGlobalLimits } from '@/hooks/useGlobalLimits'
import PageTransition from '@/components/PageTransition'
import AnimatedContainer from '@/components/AnimatedContainer'
import { GrammarIcon, SendIcon } from '@/components/ModernIcons'

interface VerbConjugation {
  verb: string
  conjugations: {
    presentSimple: string[]
    presentContinuous: string[]
    presentPerfect: string[]
    presentPerfectContinuous: string[]
    pastSimple: string[]
    pastContinuous: string[]
    pastPerfect: string[]
    pastPerfectContinuous: string[]
    futureSimple: string[]
    futureContinuous: string[]
    futurePerfect: string[]
    futurePerfectContinuous: string[]
  }
}

export default function ConjugadorPage() {
  const { user, userProfile } = useAuth()
  const router = useRouter()
  const {
    totalVerbConjugations,
    isVerbConjugationsBlocked,
    getRealTimeCountdown,
    isPremium,
    incrementVerbConjugations,
    getRemainingVerbConjugations
  } = useGlobalLimits()
  
  const [verb, setVerb] = useState('')
  const [conjugation, setConjugation] = useState<VerbConjugation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Verificar se usuário excedeu limite
  const isBlocked = isVerbConjugationsBlocked && !isPremium
  const remainingConjugations = getRemainingVerbConjugations()
  const timeUntilReset = getRealTimeCountdown()

  const handleLogoClick = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  const handleConjugate = async () => {
    if (!verb.trim()) {
      setError('Por favor, digite um verbo')
      return
    }

    // Verificar limitações para usuários gratuitos
    if (isBlocked) {
      setError('Limite de conjugações excedido. Aguarde 24 horas ou faça upgrade para o plano Premium.')
      return
    }

    // Verificar se pode conjugar (incrementa contador)
    const canConjugate = incrementVerbConjugations()
    if (!canConjugate) {
      setError('Limite de conjugações excedido para conta gratuita. Aguarde 24 horas ou faça upgrade para o plano Premium.')
      return
    }

    setIsLoading(true)
    setError('')
    setConjugation(null)

    try {
      const response = await fetch('/api/conjugate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verb: verb.trim().toLowerCase() })
      })

      if (!response.ok) {
        throw new Error('Erro ao conjugar verbo')
      }

      const data = await response.json()
      setConjugation(data)
    } catch (err) {
      console.error('Erro:', err)
      setError('Erro ao conjugar verbo. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading && !isBlocked) {
      handleConjugate()
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

      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <PageTransition delay={200}>
          <div className="text-center mb-12">
            <div className="mb-4 flex justify-center">
              <GrammarIcon size={72} className="text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Conjugador de Verbos
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Digite qualquer verbo em inglês e veja todas as conjugações organizadas 
              por tempo e aspecto. Ferramenta essencial para dominar a gramática inglesa.
            </p>
          </div>
        </PageTransition>

        {/* Input Section */}
        <PageTransition delay={400}>
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-6">
                Qual verbo você quer conjugar?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input
                  type="text"
                  value={verb}
                  onChange={(e) => setVerb(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isBlocked ? "Limite excedido. Aguarde 24h ou faça upgrade..." : "Digite o verbo (ex: go, be, have, work...)"}
                  className={`flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors ${isBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isLoading || isBlocked}
                />
                <button
                  onClick={handleConjugate}
                  disabled={isLoading || !verb.trim() || isBlocked}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 sm:w-auto w-full"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Conjugando...
                    </>
                  ) : (
                    <>
                      <SendIcon size={18} className="text-white" />
                      Conjugar
                    </>
                  )}
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              
              {/* Indicador de conjugações restantes para usuários gratuitos */}
              {!isBlocked && remainingConjugations > 0 && remainingConjugations < 2 && !isPremium && (
                <div className="mb-3">
                  <div className="inline-flex items-center gap-2 bg-yellow-900/30 border border-yellow-500/50 rounded-lg px-3 py-2">
                    <span className="text-yellow-400 text-sm">
                      ⚡ {remainingConjugations} conjugação{remainingConjugations !== 1 ? 'ões' : ''} restante{remainingConjugations !== 1 ? 's' : ''} no plano gratuito
                    </span>
                    <button
                      onClick={handleUpgrade}
                      className="text-xs bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded text-white transition-colors"
                    >
                      Upgrade
                    </button>
                  </div>
                </div>
              )}
              
              <p className="text-gray-500 text-sm">
                Exemplos: go, be, have, work, study, play, write, read, speak
              </p>
            </div>
          </div>
        </PageTransition>

        {/* Mensagem de limite excedido */}
        {isBlocked && (
          <PageTransition delay={400}>
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-red-500/50 rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-6xl mb-4">🚫</div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Limite de Conjugações Excedido
                </h2>
                <p className="text-gray-300 mb-6">
                  Usuários gratuitos podem conjugar apenas 2 verbos por dia. 
                  Seu limite foi atingido.
                </p>
                <div className="bg-gray-900/50 rounded-xl p-4 mb-6">
                  <div className="text-white mb-2">⏰ Próximo reset em:</div>
                  <div className="text-2xl font-bold text-orange-400">
                    {timeUntilReset || '23h 59m'}
                  </div>
                </div>
                <div className="space-y-4">
                  <button
                    onClick={handleUpgrade}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    🌟 Upgrade para Premium - Conjugações Ilimitadas
                  </button>
                  <p className="text-gray-400 text-sm">
                    Com o plano Premium você terá conjugações ilimitadas e acesso completo a todas as funcionalidades
                  </p>
                </div>
              </div>
            </div>
          </PageTransition>
        )}

        {/* Conjugation Results */}
        {conjugation && (
          <PageTransition delay={600}>
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Conjugação do verbo: <span className="text-green-400">"{conjugation.verb}"</span>
              </h2>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-gray-600 p-4 bg-gray-800 text-white font-bold"></th>
                      <th className="border border-gray-600 p-4 bg-green-900/30 text-green-300 font-bold">SIMPLE</th>
                      <th className="border border-gray-600 p-4 bg-cyan-900/30 text-cyan-300 font-bold">CONTINUOUS</th>
                      <th className="border border-gray-600 p-4 bg-purple-900/30 text-purple-300 font-bold">PERFECT</th>
                      <th className="border border-gray-600 p-4 bg-orange-900/30 text-orange-300 font-bold">PERFECT CONTINUOUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-600 p-4 bg-gray-800 text-white font-bold">PRESENT</td>
                      <td className="border border-gray-600 p-4 bg-green-900/10">
                        <div className="text-green-300 font-semibold mb-2">Present Simple</div>
                        {conjugation.conjugations.presentSimple.map((form, i) => (
                          <div key={i} className="text-white text-sm mb-1">{form}</div>
                        ))}
                      </td>
                      <td className="border border-gray-600 p-4 bg-cyan-900/10">
                        <div className="text-cyan-300 font-semibold mb-2">Present Continuous</div>
                        {conjugation.conjugations.presentContinuous.map((form, i) => (
                          <div key={i} className="text-white text-sm mb-1">{form}</div>
                        ))}
                      </td>
                      <td className="border border-gray-600 p-4 bg-purple-900/10">
                        <div className="text-purple-300 font-semibold mb-2">Present Perfect</div>
                        {conjugation.conjugations.presentPerfect.map((form, i) => (
                          <div key={i} className="text-white text-sm mb-1">{form}</div>
                        ))}
                      </td>
                      <td className="border border-gray-600 p-4 bg-orange-900/10">
                        <div className="text-orange-300 font-semibold mb-2">Present Perfect Continuous</div>
                        {conjugation.conjugations.presentPerfectContinuous.map((form, i) => (
                          <div key={i} className="text-white text-sm mb-1">{form}</div>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-4 bg-gray-800 text-white font-bold">PAST</td>
                      <td className="border border-gray-600 p-4 bg-green-900/10">
                        <div className="text-green-300 font-semibold mb-2">Past Simple</div>
                        {conjugation.conjugations.pastSimple.map((form, i) => (
                          <div key={i} className="text-white text-sm mb-1">{form}</div>
                        ))}
                      </td>
                      <td className="border border-gray-600 p-4 bg-cyan-900/10">
                        <div className="text-cyan-300 font-semibold mb-2">Past Continuous</div>
                        {conjugation.conjugations.pastContinuous.map((form, i) => (
                          <div key={i} className="text-white text-sm mb-1">{form}</div>
                        ))}
                      </td>
                      <td className="border border-gray-600 p-4 bg-purple-900/10">
                        <div className="text-purple-300 font-semibold mb-2">Past Perfect</div>
                        {conjugation.conjugations.pastPerfect.map((form, i) => (
                          <div key={i} className="text-white text-sm mb-1">{form}</div>
                        ))}
                      </td>
                      <td className="border border-gray-600 p-4 bg-orange-900/10">
                        <div className="text-orange-300 font-semibold mb-2">Past Perfect Continuous</div>
                        {conjugation.conjugations.pastPerfectContinuous.map((form, i) => (
                          <div key={i} className="text-white text-sm mb-1">{form}</div>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-4 bg-gray-800 text-white font-bold">FUTURE</td>
                      <td className="border border-gray-600 p-4 bg-green-900/10">
                        <div className="text-green-300 font-semibold mb-2">Future Simple</div>
                        {conjugation.conjugations.futureSimple.map((form, i) => (
                          <div key={i} className="text-white text-sm mb-1">{form}</div>
                        ))}
                      </td>
                      <td className="border border-gray-600 p-4 bg-cyan-900/10">
                        <div className="text-cyan-300 font-semibold mb-2">Future Continuous</div>
                        {conjugation.conjugations.futureContinuous.map((form, i) => (
                          <div key={i} className="text-white text-sm mb-1">{form}</div>
                        ))}
                      </td>
                      <td className="border border-gray-600 p-4 bg-purple-900/10">
                        <div className="text-purple-300 font-semibold mb-2">Future Perfect</div>
                        {conjugation.conjugations.futurePerfect.map((form, i) => (
                          <div key={i} className="text-white text-sm mb-1">{form}</div>
                        ))}
                      </td>
                      <td className="border border-gray-600 p-4 bg-orange-900/10">
                        <div className="text-orange-300 font-semibold mb-2">Future Perfect Continuous</div>
                        {conjugation.conjugations.futurePerfectContinuous.map((form, i) => (
                          <div key={i} className="text-white text-sm mb-1">{form}</div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-6">
                {/* Present Tenses */}
                <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-300 mb-4 text-center">PRESENT TENSES</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="text-green-300 font-semibold mb-2">Simple</div>
                      {conjugation.conjugations.presentSimple.map((form, i) => (
                        <div key={i} className="text-white text-sm mb-1">{form}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-green-300 font-semibold mb-2">Continuous</div>
                      {conjugation.conjugations.presentContinuous.map((form, i) => (
                        <div key={i} className="text-white text-sm mb-1">{form}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-green-300 font-semibold mb-2">Perfect</div>
                      {conjugation.conjugations.presentPerfect.map((form, i) => (
                        <div key={i} className="text-white text-sm mb-1">{form}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-green-300 font-semibold mb-2">Perfect Continuous</div>
                      {conjugation.conjugations.presentPerfectContinuous.map((form, i) => (
                        <div key={i} className="text-white text-sm mb-1">{form}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Past Tenses */}
                <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-cyan-300 mb-4 text-center">PAST TENSES</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="text-cyan-300 font-semibold mb-2">Simple</div>
                      {conjugation.conjugations.pastSimple.map((form, i) => (
                        <div key={i} className="text-white text-sm mb-1">{form}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-cyan-300 font-semibold mb-2">Continuous</div>
                      {conjugation.conjugations.pastContinuous.map((form, i) => (
                        <div key={i} className="text-white text-sm mb-1">{form}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-cyan-300 font-semibold mb-2">Perfect</div>
                      {conjugation.conjugations.pastPerfect.map((form, i) => (
                        <div key={i} className="text-white text-sm mb-1">{form}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-cyan-300 font-semibold mb-2">Perfect Continuous</div>
                      {conjugation.conjugations.pastPerfectContinuous.map((form, i) => (
                        <div key={i} className="text-white text-sm mb-1">{form}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Future Tenses */}
                <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-300 mb-4 text-center">FUTURE TENSES</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="text-purple-300 font-semibold mb-2">Simple</div>
                      {conjugation.conjugations.futureSimple.map((form, i) => (
                        <div key={i} className="text-white text-sm mb-1">{form}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-purple-300 font-semibold mb-2">Continuous</div>
                      {conjugation.conjugations.futureContinuous.map((form, i) => (
                        <div key={i} className="text-white text-sm mb-1">{form}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-purple-300 font-semibold mb-2">Perfect</div>
                      {conjugation.conjugations.futurePerfect.map((form, i) => (
                        <div key={i} className="text-white text-sm mb-1">{form}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-purple-300 font-semibold mb-2">Perfect Continuous</div>
                      {conjugation.conjugations.futurePerfectContinuous.map((form, i) => (
                        <div key={i} className="text-white text-sm mb-1">{form}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PageTransition>
        )}
      </div>
    </AnimatedContainer>
  )
}