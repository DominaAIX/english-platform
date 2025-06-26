'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { useAuth } from '@/contexts/AuthContext'
import PageTransition from '@/components/PageTransition'
import AnimatedContainer from '@/components/AnimatedContainer'
import FinalCertificationTest from '@/components/FinalCertificationTest'
import { PROGRESSIVE_TRAILS_DATA } from '@/data/progressiveTrails'

export default function CertificacaoA1A2Page() {
  const { user, userProfile } = useAuth()
  const router = useRouter()
  const [showTest, setShowTest] = useState(false)
  const [testResult, setTestResult] = useState<{ passed: boolean, score: number } | null>(null)
  const [showExitWarning, setShowExitWarning] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const [timeUntilNextTest, setTimeUntilNextTest] = useState<string>('')

  // Verificar se usuário é premium
  const isPremium = userProfile?.plan === 'premium'

  // Funções para gerenciar cooldown de 48h
  const getCooldownKey = () => `certification_cooldown_${user?.id}`
  
  const setCooldown = () => {
    const cooldownEnd = new Date().getTime() + (48 * 60 * 60 * 1000) // 48 horas
    localStorage.setItem(getCooldownKey(), cooldownEnd.toString())
    setIsBlocked(true)
    updateTimeRemaining()
  }
  
  const checkCooldown = () => {
    if (!user) return false
    
    const cooldownEnd = localStorage.getItem(getCooldownKey())
    if (!cooldownEnd) return false
    
    const now = new Date().getTime()
    const endTime = parseInt(cooldownEnd)
    
    if (now < endTime) {
      setIsBlocked(true)
      updateTimeRemaining()
      return true
    } else {
      localStorage.removeItem(getCooldownKey())
      setIsBlocked(false)
      return false
    }
  }
  
  const updateTimeRemaining = () => {
    if (!user) return
    
    const cooldownEnd = localStorage.getItem(getCooldownKey())
    if (!cooldownEnd) return
    
    const now = new Date().getTime()
    const endTime = parseInt(cooldownEnd)
    const timeLeft = endTime - now
    
    if (timeLeft <= 0) {
      setIsBlocked(false)
      setTimeUntilNextTest('')
      localStorage.removeItem(getCooldownKey())
      return
    }
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60))
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    setTimeUntilNextTest(`${hours}h ${minutes}min`)
  }

  useEffect(() => {
    if (!user) {
      router.push('/dashboard')
      return
    }

    if (!isPremium) {
      router.push('/dashboard')
      return
    }
    
    // Verificar cooldown ao carregar
    checkCooldown()
    
    // Atualizar contador a cada minuto
    const interval = setInterval(updateTimeRemaining, 60000)
    return () => clearInterval(interval)
  }, [user, isPremium, router])

  const handleLogoClick = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  const handleStartTest = () => {
    if (isBlocked) return
    setShowTest(true)
  }

  const handleTestComplete = (passed: boolean, score: number) => {
    setTestResult({ passed, score })
    // Se falhou ou saiu forçadamente, ativar cooldown
    if (!passed || score === 0) {
      setCooldown()
    }
    console.log(`Teste de certificação: ${passed ? 'Aprovado' : 'Reprovado'} com ${score}%`)
  }

  const handleTestClose = () => {
    setShowTest(false)
    // Se fechou durante o teste, ativar cooldown
    if (!testResult) {
      setCooldown()
    }
  }

  const handleRetryTest = () => {
    if (isBlocked) return
    setTestResult(null)
    setShowTest(true)
  }

  const handleDashboardClick = () => {
    if (showTest && !testResult) {
      // Está no meio do teste, mostrar aviso
      setShowExitWarning(true)
    } else {
      // Pode navegar normalmente
      router.push('/dashboard')
    }
  }

  const handleConfirmExit = () => {
    setCooldown()
    router.push('/dashboard')
  }

  const handleCancelExit = () => {
    setShowExitWarning(false)
  }

  const trailData = PROGRESSIVE_TRAILS_DATA.trabalho

  if (!isPremium) {
    return (
      <AnimatedContainer className="h-screen overflow-hidden flex flex-col">
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
              
              <button
                onClick={handleDashboardClick}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full text-white font-semibold transition-colors text-sm"
              >
                ← Dashboard
              </button>
            </div>
          </header>
        </PageTransition>

        <div className="max-w-4xl mx-auto p-6 flex items-center justify-center min-h-[80vh]">
          <PageTransition delay={200}>
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500/30 rounded-xl p-8 text-center max-w-2xl">
              <div className="text-6xl mb-6">🚀</div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Certificação A1/A2 Premium
              </h1>
              <p className="text-gray-300 mb-6 text-lg">
                O teste de certificação A1/A2 é um recurso exclusivo para usuários Premium! 
                Faça upgrade para ter acesso ao certificado oficial.
              </p>
              
              <button 
                onClick={() => alert('Funcionalidade de upgrade será implementada em breve! 🚀')}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105"
              >
                🌟 Fazer Upgrade para Premium
              </button>
            </div>
          </PageTransition>
        </div>
      </AnimatedContainer>
    )
  }

  return (
    <AnimatedContainer className="h-screen overflow-hidden flex flex-col">
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
            
            <button
              onClick={handleDashboardClick}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full text-white font-semibold transition-colors text-sm"
            >
              ← Dashboard
            </button>
          </div>
        </header>
      </PageTransition>

      <div className="max-w-4xl mx-auto p-6">
        {isBlocked ? (
          // Tela de bloqueio por 48h
          <PageTransition delay={200}>
            <div className="text-center py-12">
              <div className="text-8xl mb-6">🔒</div>
              <h1 className="text-4xl font-bold text-red-400 mb-4">
                Teste Bloqueado
              </h1>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                Você precisa aguardar 48 horas para fazer o próximo teste de certificação.
              </p>
              
              <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6 mb-8 max-w-md mx-auto">
                <h3 className="text-red-400 font-semibold text-lg mb-2">
                  ⏰ Tempo Restante
                </h3>
                <div className="text-white text-2xl font-bold">
                  {timeUntilNextTest || 'Calculando...'}
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  para o próximo teste
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/trilha-progressiva/trabalho"
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full text-white font-semibold transition-colors"
                >
                  📚 Revisar Frases A1/A2
                </Link>
                
                <button
                  onClick={() => router.push('/dashboard')}
                  className="bg-gray-600 hover:bg-gray-700 px-8 py-3 rounded-full text-white font-semibold transition-colors"
                >
                  ← Voltar ao Dashboard
                </button>
              </div>
            </div>
          </PageTransition>
        ) : !showTest && !testResult ? (
          // Tela inicial do teste
          <PageTransition delay={200}>
            <div className="text-center py-12">
              <div className="text-8xl mb-6">🏆</div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Certificação A1/A2 - Inglês para o Trabalho
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Teste seu domínio das 145 frases essenciais A1/A2 e ganhe seu certificado oficial. 
                O teste avalia seu conhecimento de todas as frases que você estudou.
              </p>
              
              {/* Informações do teste */}
              <div className="bg-gray-800/50 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
                <h3 className="text-white font-semibold text-xl mb-4">
                  📋 Sobre o Teste
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-blue-400 font-bold text-2xl">35</div>
                    <div className="text-gray-400 text-sm">Questões</div>
                  </div>
                  <div>
                    <div className="text-green-400 font-bold text-2xl">70%</div>
                    <div className="text-gray-400 text-sm">Nota Mínima</div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-bold text-2xl">~20min</div>
                    <div className="text-gray-400 text-sm">Duração</div>
                  </div>
                  <div>
                    <div className="text-yellow-400 font-bold text-2xl">145</div>
                    <div className="text-gray-400 text-sm">Frases A1/A2</div>
                  </div>
                </div>
              </div>

              {/* Tipos de questões */}
              <div className="bg-gray-800/30 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
                <h3 className="text-white font-semibold text-lg mb-4">
                  🎯 Tipos de Questões
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-blue-300">🎯 Múltipla Escolha</div>
                  <div className="text-green-300">🌍 Tradução</div>
                  <div className="text-purple-300">✍️ Completar Frases</div>
                  <div className="text-orange-300">🧩 Arrastar e Soltar</div>
                </div>
              </div>

              {/* Aviso importante sobre as regras */}
              <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
                <h3 className="text-red-400 font-semibold text-lg mb-3 flex items-center gap-2">
                  ⚠️ Regras Importantes
                </h3>
                <ul className="text-gray-300 text-sm space-y-2 text-left">
                  <li>• <strong>Sem pausas:</strong> O teste deve ser feito do início ao fim</li>
                  <li>• <strong>Sem dicas:</strong> Este é um teste de avaliação real</li>
                  <li>• <strong>Limite de tentativas:</strong> Apenas 1 teste a cada 48 horas</li>
                  <li>• <strong>Se sair:</strong> Próximo teste só em 48 horas</li>
                  <li>• <strong>Tempo recomendado:</strong> Reserve 25-30 minutos</li>
                </ul>
              </div>

              <button
                onClick={handleStartTest}
                disabled={isBlocked}
                className={`px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 shadow-lg ${
                  isBlocked 
                    ? 'bg-gray-600 cursor-not-allowed opacity-50 text-gray-300' 
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white transform hover:scale-105'
                }`}
              >
                {isBlocked ? '🔒 Teste Bloqueado' : '🚀 Iniciar Teste de Certificação'}
              </button>
              
              <p className="text-gray-500 text-sm mt-6">
                ⚠️ Ao clicar em "Iniciar", você concorda com as regras acima.
              </p>
            </div>
          </PageTransition>
        ) : testResult ? (
          // Tela de resultado
          <PageTransition delay={200}>
            <div className="text-center py-12">
              <div className="text-8xl mb-6">
                {testResult.passed ? '🎉' : '📚'}
              </div>
              
              <h2 className={`text-4xl font-bold mb-6 ${testResult.passed ? 'text-green-400' : 'text-orange-400'}`}>
                {testResult.passed ? 'Parabéns! Você foi certificado!' : 'Continue estudando!'}
              </h2>
              
              <div className="bg-gray-800/50 rounded-xl p-8 mb-8 max-w-2xl mx-auto">
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div>
                    <div className={`text-4xl font-bold ${testResult.passed ? 'text-green-400' : 'text-orange-400'}`}>
                      {testResult.score}%
                    </div>
                    <div className="text-gray-400">Sua Nota</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-blue-400">
                      70%
                    </div>
                    <div className="text-gray-400">Nota Mínima</div>
                  </div>
                </div>
              </div>

              {testResult.passed ? (
                <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-8 mb-8 max-w-2xl mx-auto">
                  <h3 className="text-green-400 font-semibold text-2xl mb-4">
                    🏆 Certificado A1/A2 Conquistado!
                  </h3>
                  <p className="text-gray-300 text-lg">
                    Você demonstrou domínio das frases essenciais A1/A2 para o ambiente de trabalho.
                    Seu certificado comprova sua competência no inglês básico profissional.
                  </p>
                </div>
              ) : (
                <div className="bg-orange-900/30 border border-orange-500/30 rounded-xl p-8 mb-8 max-w-2xl mx-auto">
                  <h3 className="text-orange-400 font-semibold text-2xl mb-4">
                    📖 Continue Praticando
                  </h3>
                  <p className="text-gray-300 text-lg">
                    Você precisa de pelo menos 70% para ser certificado. 
                    Revise as frases e tente novamente!
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/trilha-progressiva/trabalho"
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full text-white font-semibold transition-colors"
                >
                  📚 Revisar Frases
                </Link>
                
                {!testResult.passed && (
                  <button
                    onClick={handleRetryTest}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300"
                  >
                    🔄 Tentar Novamente
                  </button>
                )}
                
                {testResult.passed && (
                  <button
                    onClick={() => alert('Download do certificado será implementado em breve!')}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300"
                  >
                    📄 Baixar Certificado
                  </button>
                )}
              </div>
            </div>
          </PageTransition>
        ) : null}
      </div>

      {/* Modal do Teste */}
      {showTest && trailData.finalTest && (
        <FinalCertificationTest
          test={trailData.finalTest}
          onComplete={handleTestComplete}
          onClose={handleTestClose}
        />
      )}

      {/* Modal de Aviso de Saída */}
      {showExitWarning && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[70]">
          <div className="bg-red-900/50 border-2 border-red-500 rounded-2xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-red-400 mb-4">
                Sair do Teste?
              </h3>
              <p className="text-white mb-6 leading-relaxed">
                Você está no meio do teste de certificação. 
                <strong className="text-red-300"> Se sair agora, será bloqueado por 48 horas.</strong>
              </p>
              <p className="text-gray-300 mb-8 text-sm">
                Próximo teste só será liberado em: <strong>48 horas</strong>
              </p>
              
              <div className="flex gap-4">
                <button
                  onClick={handleCancelExit}
                  className="flex-1 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
                >
                  Continuar Teste
                </button>
                <button
                  onClick={handleConfirmExit}
                  className="flex-1 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
                >
                  Sair (Bloquear 48h)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatedContainer>
  )
}