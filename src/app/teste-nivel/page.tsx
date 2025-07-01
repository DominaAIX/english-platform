'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { useAuth } from '@/contexts/AuthContext'
import PageTransition from '@/components/PageTransition'
import AnimatedContainer from '@/components/AnimatedContainer'
import { 
  LEVEL_TEST_QUESTIONS, 
  LevelTestQuestion, 
  LevelTestResult,
  calculateLevel,
  getLevelDescription,
  getLevelColor,
  getLevelIcon
} from '@/data/levelTest'
import { checkLevelTestCooldown, formatDate, LevelTestCooldownStatus } from '@/utils/levelTestCooldown'

export default function LevelTestPage() {
  const { user, userProfile } = useAuth()
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [testResult, setTestResult] = useState<LevelTestResult | null>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState<number | null>(null)
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false)
  const [cooldownStatus, setCooldownStatus] = useState<LevelTestCooldownStatus | null>(null)
  const [showCooldownWarning, setShowCooldownWarning] = useState(false)

  // Verificar se usuário é premium
  const isPremium = userProfile?.plan === 'premium'

  // Verificar se já fez o teste e status do cooldown
  useEffect(() => {
    if (user) {
      // Verificar cooldown
      const cooldown = checkLevelTestCooldown(user.id)
      setCooldownStatus(cooldown)
      
      const savedTest = localStorage.getItem(`level_test_${user.id}`)
      if (savedTest) {
        // Se chegou aqui através de URL direta e já fez o teste, 
        // verificar se veio de um link específico para ver resultado
        const urlParams = new URLSearchParams(window.location.search)
        const showResults = urlParams.get('show') === 'result'
        
        if (showResults) {
          // Mostrar resultado se explicitamente solicitado
          const result: LevelTestResult = JSON.parse(savedTest)
          setTestResult(result)
          setShowResult(true)
        } else {
          // Caso contrário, redirecionar para dashboard
          router.push('/dashboard')
          return
        }
      }
    }
  }, [user, router])

  const currentQuestion = LEVEL_TEST_QUESTIONS[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / LEVEL_TEST_QUESTIONS.length) * 100

  const handleLogoClick = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }


  const selectAnswer = (answerIndex: number) => {
    if (showAnswerFeedback) return // Prevent selecting if feedback is already shown
    
    setCurrentSelectedAnswer(answerIndex)
    setShowAnswerFeedback(true)
    
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < LEVEL_TEST_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setCurrentSelectedAnswer(null)
      setShowAnswerFeedback(false)
    } else {
      finishTest()
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const finishTest = () => {
    // Calcular resultados
    let correctAnswers = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === LEVEL_TEST_QUESTIONS[index].correctAnswer) {
        correctAnswers++
      }
    })

    const level = calculateLevel(correctAnswers, LEVEL_TEST_QUESTIONS.length)
    const result: LevelTestResult = {
      level,
      score: Math.round((correctAnswers / LEVEL_TEST_QUESTIONS.length) * 100),
      correctAnswers,
      totalQuestions: LEVEL_TEST_QUESTIONS.length,
      completedAt: new Date().toISOString()
    }

    // Salvar resultado
    if (user) {
      console.log('💾 Salvando teste para user:', user.id)
      localStorage.setItem(`level_test_${user.id}`, JSON.stringify(result))
      // Salvar nível no perfil do usuário
      localStorage.setItem(`user_level_${user.id}`, level)
      
      // Verificar se foi salvo corretamente
      const savedTest = localStorage.getItem(`level_test_${user.id}`)
      const savedLevel = localStorage.getItem(`user_level_${user.id}`)
      console.log('✅ Teste salvo:', !!savedTest, 'Nível salvo:', !!savedLevel)
    } else {
      console.error('❌ User não encontrado ao salvar teste')
    }

    setTestResult(result)
    setShowResult(true)
  }

  const retakeTest = () => {
    if (!user) return
    
    // Verificar cooldown antes de permitir refazer
    const cooldown = checkLevelTestCooldown(user.id)
    if (!cooldown.canRetake) {
      // Não pode refazer ainda, mostrar na tela de resultado
      return
    }
    
    // Limpar dados antigos
    localStorage.removeItem(`level_test_${user.id}`)
    localStorage.removeItem(`user_level_${user.id}`)
    
    setTestResult(null)
    setShowResult(false)
    setHasStarted(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswers([])
    setCooldownStatus(null)
  }

  const startTest = () => {
    if (!user) return
    
    // Verificar se já fez o teste antes
    const savedTest = localStorage.getItem(`level_test_${user.id}`)
    if (savedTest) {
      // Já fez o teste, mostrar aviso sobre cooldown
      setShowCooldownWarning(true)
    } else {
      // Primeiro teste, pode começar
      setHasStarted(true)
      setCurrentQuestionIndex(0)
      setSelectedAnswers([])
      setShowResult(false)
    }
  }

  const confirmStartTest = () => {
    setShowCooldownWarning(false)
    setHasStarted(true)
    setCurrentQuestionIndex(0)
    setSelectedAnswers([])
    setShowResult(false)
  }

  // REMOVIDO: Agora tanto free quanto premium podem fazer o teste de nível

  if (showResult && testResult) {
    return (
      <AnimatedContainer className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20">
        {/* Header compacto */}
        <PageTransition delay={0}>
          <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-3">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <button 
                onClick={handleLogoClick}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Logo size="xs" />
                <span className="text-white font-bold text-sm">Inglês pra Já</span>
              </button>
              
              <Link 
                href="/dashboard"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium transition-all duration-300 border border-white/20"
              >
                ← Dashboard
              </Link>
            </div>
          </header>
        </PageTransition>

        <div className="max-w-2xl mx-auto p-4 pt-8">
          {/* Celebração com animação */}
          <PageTransition delay={200}>
            <div className="text-center mb-6">
              {/* Ícone grande com animação */}
              <div className="relative mb-6">
                <div className="absolute inset-0 animate-ping">
                  <div className="text-8xl opacity-20">{getLevelIcon(testResult.level)}</div>
                </div>
                <div className="relative text-8xl animate-bounce">
                  {getLevelIcon(testResult.level)}
                </div>
              </div>
              
              {/* Título celebrativo */}
              <div className="mb-4">
                <h1 className="text-4xl font-black text-white mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Parabéns! 🎉
                </h1>
                <h2 className="text-2xl font-bold text-white">
                  Seu nível é <span className={`capitalize ${getLevelColor(testResult.level)} font-extrabold`}>
                    {testResult.level === 'beginner' ? 'Iniciante' : testResult.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                  </span>
                </h2>
              </div>
            </div>
          </PageTransition>

          {/* Card principal com estatísticas */}
          <PageTransition delay={400}>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-6 mb-6 shadow-2xl">
              
              {/* Score destaque */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full p-6">
                    <div className="text-4xl font-black text-white">{testResult.score}%</div>
                    <div className="text-sm text-purple-100 font-medium">Pontuação</div>
                  </div>
                </div>
              </div>

              {/* Estatísticas em grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/10">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {testResult.correctAnswers}
                  </div>
                  <div className="text-xs text-gray-300">Acertos</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/10">
                  <div className="text-2xl font-bold text-red-400 mb-1">
                    {testResult.totalQuestions - testResult.correctAnswers}
                  </div>
                  <div className="text-xs text-gray-300">Erros</div>
                </div>
              </div>
              
              {/* Descrição motivacional */}
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl p-4 mb-6 border border-purple-500/20">
                <p className="text-white text-center text-sm leading-relaxed">
                  {getLevelDescription(testResult.level)}
                </p>
              </div>

              {/* Botões de ação */}
              <div className="space-y-3">
                <Link 
                  href="/dashboard"
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-4 rounded-2xl text-white font-bold text-center transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-purple-500/25 flex items-center justify-center gap-3"
                >
                  <span>🚀</span>
                  <span>Começar Trilhas Personalizadas</span>
                </Link>
                
                {cooldownStatus?.canRetake ? (
                  <button
                    onClick={retakeTest}
                    className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl text-white font-medium text-center transition-all duration-300 border border-white/20 flex items-center justify-center gap-2"
                  >
                    <span>🔄</span>
                    <span>Refazer Teste</span>
                  </button>
                ) : (
                  <div className="w-full bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-center">
                    <div className="text-red-400 font-medium mb-2 flex items-center justify-center gap-2">
                      <span>⏰</span>
                      <span>Refazer Teste</span>
                    </div>
                    <p className="text-red-300 text-sm mb-1">
                      Disponível em {cooldownStatus?.timeRemaining}
                    </p>
                    {cooldownStatus?.nextAvailableDate && (
                      <p className="text-red-400/70 text-xs">
                        {formatDate(cooldownStatus.nextAvailableDate)}
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Informação adicional */}
              <div className="text-center mt-4">
                <p className="text-gray-400 text-xs">
                  Teste realizado em {new Date(testResult.completedAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </PageTransition>
          
          {/* Decoração de fundo */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </AnimatedContainer>
    )
  }

  if (!hasStarted) {
    return (
      <AnimatedContainer className="h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <PageTransition delay={0}>
          <header className="bg-gray-900/50 border-b border-gray-700 p-4 flex-shrink-0">
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
        </PageTransition>

        <div className="flex-1 overflow-y-auto flex items-center justify-center">
          <div className="max-w-4xl mx-auto p-4 w-full">
          <PageTransition delay={200}>
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 text-center max-w-2xl mx-auto">
              <div className="text-4xl mb-4">📚</div>
              <h1 className="text-2xl font-bold text-white mb-3">
                Teste de Nível de Inglês
              </h1>
              <p className="text-gray-300 mb-4 text-base">
                Responda 20 perguntas rápidas para descobrirmos seu nível atual de inglês. 
                Com base no resultado, vamos personalizar suas trilhas de aprendizado!
              </p>
              
              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <h3 className="text-white font-semibold mb-3 text-sm">📋 Como funciona:</h3>
                <ul className="text-gray-300 space-y-1 text-left text-sm">
                  <li>• 20 perguntas de múltipla escolha</li>
                  <li>• Questões de gramática, vocabulário e compreensão</li>
                  <li>• Níveis: Iniciante, Intermediário e Avançado</li>
                  <li>• Tempo estimado: 5-10 minutos</li>
                  <li>• Resultado personaliza suas trilhas de aprendizado</li>
                </ul>
              </div>

              <button 
                onClick={startTest}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-full text-white font-bold transition-all duration-300 transform hover:scale-105"
              >
                Começar Teste
              </button>
            </div>
          </PageTransition>
          </div>
        </div>
      </AnimatedContainer>
    )
  }

  return (
    <AnimatedContainer className="h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <PageTransition delay={0}>
        <header className="bg-gray-900/50 border-b border-gray-700 p-4 flex-shrink-0">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Logo size="sm" />
              <span className="text-white font-bold">Inglês pra Já</span>
            </button>
            
            <div className="text-sm text-gray-400">
              Pergunta {currentQuestionIndex + 1} de {LEVEL_TEST_QUESTIONS.length}
            </div>
          </div>
        </header>
      </PageTransition>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 min-h-full flex flex-col">
        {/* Progress Bar */}
        <PageTransition delay={200}>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Progresso do Teste</span>
              <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </PageTransition>

        {/* Question */}
        <PageTransition delay={400}>
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 mb-6">
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  currentQuestion.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                  currentQuestion.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {currentQuestion.difficulty === 'beginner' ? 'Básico' :
                   currentQuestion.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                </span>
              </div>
              
              <h2 className="text-lg font-bold text-white mb-4">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  disabled={showAnswerFeedback}
                  className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                    showAnswerFeedback && currentSelectedAnswer === index
                      ? currentSelectedAnswer === currentQuestion.correctAnswer
                        ? 'bg-green-600/30 border-2 border-green-400 text-green-300'
                        : 'bg-red-600/30 border-2 border-red-400 text-red-300'
                      : selectedAnswers[currentQuestionIndex] === index
                      ? 'bg-purple-600/30 border-2 border-purple-400'
                      : 'bg-gray-800/50 border-2 border-gray-600 hover:border-gray-500'
                  } ${showAnswerFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      showAnswerFeedback && currentSelectedAnswer === index
                        ? currentSelectedAnswer === currentQuestion.correctAnswer
                          ? 'border-green-400 bg-green-600'
                          : 'border-red-400 bg-red-600'
                        : selectedAnswers[currentQuestionIndex] === index
                        ? 'border-purple-400 bg-purple-600'
                        : 'border-gray-500'
                    }`}>
                      {(selectedAnswers[currentQuestionIndex] === index || (showAnswerFeedback && currentSelectedAnswer === index)) && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-white font-medium text-sm">{option}</span>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </PageTransition>

        {/* Navigation */}
        <PageTransition delay={600}>
          <div className="flex gap-3 justify-between mt-4">
            <button
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
              className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-full text-white font-semibold text-sm transition-colors"
            >
              ← Anterior
            </button>
            
            <button
              onClick={nextQuestion}
              disabled={!showAnswerFeedback}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-full text-white font-semibold text-sm transition-all duration-300"
            >
              {currentQuestionIndex === LEVEL_TEST_QUESTIONS.length - 1 ? 'Finalizar Teste' : 'Próxima →'}
            </button>
          </div>
        </PageTransition>
        </div>
      </div>
      {/* Modal de Aviso sobre Cooldown */}
      {showCooldownWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl p-6 md:p-8 max-w-md w-full border border-yellow-500/50">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Atenção: Teste de Nível
              </h2>
              <div className="text-gray-300 mb-6 space-y-3">
                <p>
                  Você está prestes a refazer o teste de nível. 
                </p>
                <p className="text-yellow-400 font-semibold">
                  ⏰ Após finalizar este teste, você só poderá fazer um novo teste de nível após 14 dias.
                </p>
                <p className="text-sm text-gray-400">
                  Esta medida garante que o teste reflita seu progresso real e evita tentativas excessivas.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setShowCooldownWarning(false)}
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full text-white font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmStartTest}
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
                >
                  Entendi, Começar Teste
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatedContainer>
  )
}