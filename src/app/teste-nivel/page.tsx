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
      localStorage.setItem(`level_test_${user.id}`, JSON.stringify(result))
      // Salvar nível no perfil do usuário
      localStorage.setItem(`user_level_${user.id}`, level)
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

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 min-h-full flex flex-col justify-center">
          <PageTransition delay={200}>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{getLevelIcon(testResult.level)}</div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Resultado do Teste de Nível
              </h1>
              <p className="text-gray-400">
                Teste realizado em {new Date(testResult.completedAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </PageTransition>

          <PageTransition delay={400}>
            <div className={`bg-gradient-to-r ${getLevelColor(testResult.level)}/20 border border-current/30 rounded-xl p-8 mb-8`}>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Seu nível: <span className="capitalize">{testResult.level}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      {testResult.score}%
                    </div>
                    <div className="text-gray-300">Pontuação</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      {testResult.correctAnswers}/{testResult.totalQuestions}
                    </div>
                    <div className="text-gray-300">Acertos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2 capitalize">
                      {testResult.level}
                    </div>
                    <div className="text-gray-300">Nível</div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg mb-6">
                  {getLevelDescription(testResult.level)}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
                  <Link 
                    href="/dashboard"
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 sm:px-8 py-3 rounded-full text-white font-semibold text-sm sm:text-base transition-all duration-300 text-center"
                  >
                    Começar Trilhas
                  </Link>
                  
                  {cooldownStatus?.canRetake ? (
                    <button
                      onClick={retakeTest}
                      className="bg-gray-700 hover:bg-gray-600 px-6 sm:px-8 py-3 rounded-full text-white font-semibold text-sm sm:text-base transition-colors"
                    >
                      Refazer Teste
                    </button>
                  ) : (
                    <div className="text-center">
                      <button
                        disabled
                        className="bg-gray-800 cursor-not-allowed px-6 sm:px-8 py-3 rounded-full text-gray-500 font-semibold text-sm sm:text-base"
                      >
                        Refazer Teste
                      </button>
                      <p className="text-gray-400 text-xs mt-2">
                        Disponível em {cooldownStatus?.timeRemaining}
                      </p>
                      {cooldownStatus?.nextAvailableDate && (
                        <p className="text-gray-500 text-xs">
                          {formatDate(cooldownStatus.nextAvailableDate)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </PageTransition>
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
          <div className="max-w-4xl mx-auto p-6 w-full">
          <PageTransition delay={200}>
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-8 text-center max-w-2xl">
              <div className="text-6xl mb-6"></div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Teste de Nível de Inglês
              </h1>
              <p className="text-gray-300 mb-6 text-lg">
                Responda 15 perguntas rápidas para descobrirmos seu nível atual de inglês. 
                Com base no resultado, vamos personalizar suas trilhas de aprendizado!
              </p>
              
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <h3 className="text-white font-semibold mb-4">📋 Como funciona:</h3>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li>• 15 perguntas de múltipla escolha</li>
                  <li>• Questões de gramática, vocabulário e compreensão</li>
                  <li>• Níveis: Iniciante, Intermediário e Avançado</li>
                  <li>• Tempo estimado: 5-10 minutos</li>
                  <li>• Resultado personaliza suas trilhas de aprendizado</li>
                </ul>
              </div>

              <button 
                onClick={startTest}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105"
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
          <div className="mb-8">
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
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-8 mb-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  currentQuestion.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                  currentQuestion.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {currentQuestion.difficulty === 'beginner' ? 'Básico' :
                   currentQuestion.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                </span>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-6">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  disabled={showAnswerFeedback}
                  className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
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
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      showAnswerFeedback && currentSelectedAnswer === index
                        ? currentSelectedAnswer === currentQuestion.correctAnswer
                          ? 'border-green-400 bg-green-600'
                          : 'border-red-400 bg-red-600'
                        : selectedAnswers[currentQuestionIndex] === index
                        ? 'border-purple-400 bg-purple-600'
                        : 'border-gray-500'
                    }`}>
                      {(selectedAnswers[currentQuestionIndex] === index || (showAnswerFeedback && currentSelectedAnswer === index)) && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-white font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </PageTransition>

        {/* Navigation */}
        <PageTransition delay={600}>
          <div className="flex gap-4 justify-between">
            <button
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
              className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full text-white font-semibold transition-colors"
            >
              ← Anterior
            </button>
            
            <button
              onClick={nextQuestion}
              disabled={!showAnswerFeedback}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
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