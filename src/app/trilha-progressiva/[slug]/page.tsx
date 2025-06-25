'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { useAuth } from '@/contexts/AuthContext'
import PageTransition from '@/components/PageTransition'
import AnimatedContainer from '@/components/AnimatedContainer'
import DragDropExercise from '@/components/DragDropExercise'
import CompleteSentenceExercise from '@/components/CompleteSentenceExercise'
import TranslationExercise from '@/components/TranslationExercise'
import MultipleChoiceExercise from '@/components/MultipleChoiceExercise'
import FinalCertificationTest from '@/components/FinalCertificationTest'
import { SpeakerIcon } from '@/components/ModernIcons'
import {
  PROGRESSIVE_TRAILS_DATA,
  ProgressiveStep,
  ProgressiveTrail,
  UserTrailProgress,
  getUserLevel,
  getUserTrailProgress,
  saveUserTrailProgress,
  generateProgressiveSteps
} from '@/data/progressiveTrails'
import { getFreeUsageStatus, incrementFreeUsage, canAccessContent, FreeLimitationStatus } from '@/utils/freeLimitations'

interface ProgressiveTrailPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProgressiveTrailPage({ params }: ProgressiveTrailPageProps) {
  const { slug } = await params
  const trailData = PROGRESSIVE_TRAILS_DATA[slug as keyof typeof PROGRESSIVE_TRAILS_DATA]

  if (!trailData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Trilha não encontrada</h1>
          <p className="text-gray-400 mb-6">Esta trilha progressiva não existe.</p>
          <Link 
            href="/dashboard"
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
          >
            ← Voltar ao Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return <ProgressiveTrailClient trailData={trailData} slug={slug} />
}

function ProgressiveTrailClient({ trailData, slug }: { trailData: any, slug: string }) {
  const { user, userProfile } = useAuth()
  const router = useRouter()
  const [progressiveSteps, setProgressiveSteps] = useState<ProgressiveStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [userProgress, setUserProgress] = useState<UserTrailProgress | null>(null)
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')
  const [isLoading, setIsLoading] = useState(true)
  const [showTranslation, setShowTranslation] = useState(false)
  const [showNextButton, setShowNextButton] = useState(false)
  const [exerciseResult, setExerciseResult] = useState<{ completed: boolean, correct: boolean } | null>(null)
  const [showFinalTest, setShowFinalTest] = useState(false)
  const [freeLimitations, setFreeLimitations] = useState<FreeLimitationStatus>({
    isBlocked: false,
    phrasesUsed: 0,
    maxPhrases: 5,
    timeRemaining: '',
    canAccess: true
  })

  // Verificar se usuário é premium
  const isPremium = userProfile?.plan === 'premium'
  const userPlan = userProfile?.plan || 'free'

  // Verificar limitações para usuários free
  useEffect(() => {
    if (user?.id && userPlan === 'free') {
      const limitations = getFreeUsageStatus(user.id)
      setFreeLimitations(limitations)
    }
  }, [user?.id, userPlan])

  useEffect(() => {
    if (!user) {
      router.push('/dashboard')
      return
    }

    // Carregar nível do usuário
    const level = getUserLevel(user.id)
    setUserLevel(level)

    // Carregar progresso da trilha
    const progress = getUserTrailProgress(user.id, slug)
    setUserProgress(progress)

    // Gerar passos progressivos baseados no nível (com nova pedagogia para trabalho)
    const steps = generateProgressiveSteps(trailData, level, slug)
    
    // Atualizar status dos passos baseado no progresso salvo
    const updatedSteps = steps.map((step, index) => ({
      ...step,
      isCompleted: progress.completedSteps.includes(step.id),
      isUnlocked: index <= progress.currentStepIndex
    }))

    setProgressiveSteps(updatedSteps)
    setCurrentStepIndex(progress.currentStepIndex)
    setIsLoading(false)
  }, [user, slug, isPremium, router])

  // Removido: contagem duplicada ao visualizar frase
  // Agora só conta quando clicar em "Próximo" (handleStepComplete)

  const handleLogoClick = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  const speakPhrase = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      speechSynthesis.speak(utterance)
    }
  }

  const handleExerciseComplete = (isCorrect: boolean) => {
    // Nova lógica de navegação apenas para trilha de trabalho
    if (slug === 'trabalho') {
      setExerciseResult({ completed: true, correct: isCorrect })
    } else {
      // Lógica original para outras trilhas
      handleStepComplete(progressiveSteps[currentStepIndex]?.id || '', isCorrect)
    }
  }

  const handleExerciseAdvance = () => {
    if (!user || !userProgress || !exerciseResult?.correct) return

    const currentStep = progressiveSteps[currentStepIndex]
    if (!currentStep) return

    // Marcar exercício como completado
    const updatedProgress = {
      ...userProgress,
      completedSteps: [...userProgress.completedSteps.filter(id => id !== currentStep.id), currentStep.id],
      currentStepIndex: Math.min(currentStepIndex + 1, progressiveSteps.length - 1),
      progressPercentage: Math.min(((userProgress.completedSteps.length + 1) / progressiveSteps.length) * 100, 100),
      lastAccessedAt: new Date().toISOString()
    }

    // Atualizar steps locais
    const updatedSteps = progressiveSteps.map((step, index) => ({
      ...step,
      isCompleted: step.id === currentStep.id ? true : step.isCompleted,
      isUnlocked: index <= updatedProgress.currentStepIndex
    }))

    setUserProgress(updatedProgress)
    setProgressiveSteps(updatedSteps)
    saveUserTrailProgress(user.id, updatedProgress)

    // Avançar para próximo passo
    if (currentStepIndex < progressiveSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
      setShowTranslation(false)
      setShowNextButton(false)
      setExerciseResult(null)
    }
  }

  const handleExerciseRetry = () => {
    setExerciseResult(null)
  }

  const handleFinalTestStart = () => {
    setShowFinalTest(true)
  }

  const handleFinalTestComplete = (passed: boolean, score: number) => {
    // Aqui você pode salvar o resultado do teste
    console.log(`Teste final: ${passed ? 'Aprovado' : 'Reprovado'} com ${score}%`)
    
    if (passed) {
      // Marcar trilha como 100% completa
      if (user && userProgress) {
        const completedProgress = {
          ...userProgress,
          progressPercentage: 100,
          isCertified: true,
          certificateScore: score,
          certificateDate: new Date().toISOString()
        }
        setUserProgress(completedProgress)
        saveUserTrailProgress(user.id, completedProgress)
      }
    }
  }

  const handleFinalTestClose = () => {
    setShowFinalTest(false)
  }

  const handleStudyAgain = () => {
    setCurrentStepIndex(0)
    setShowTranslation(false)
    setShowNextButton(false)
    setExerciseResult(null)
  }



  const handleStepComplete = (stepId: string, isCorrect: boolean) => {
    if (!user || !userProgress) return

    // Esta função agora é apenas para frases
    const currentStep = progressiveSteps[currentStepIndex]
    if (currentStep?.type === 'phrase') {
      
      // Para usuários free, verificar limitação antes de completar
      if (!isPremium && userPlan === 'free') {
        // Verificar se já viu essa frase específica antes
        const phraseKey = `progressive_phrase_viewed_${user.id}_${slug}_${stepId}`
        const alreadyViewed = localStorage.getItem(phraseKey)
        
        if (!alreadyViewed) {
          // Marcar como vista
          localStorage.setItem(phraseKey, 'true')
          
          // Incrementar contador de uso
          const newUsage = incrementFreeUsage(user.id)
          setFreeLimitations(newUsage)
          
          if (newUsage.isBlocked) {
            // Redirecionar para dashboard se atingiu o limite
            router.push('/dashboard')
            return
          }
        }
      }

      const updatedProgress = {
        ...userProgress,
        completedSteps: [...userProgress.completedSteps.filter(id => id !== stepId), stepId],
        currentStepIndex: Math.min(currentStepIndex + 1, progressiveSteps.length - 1),
        progressPercentage: Math.min(((userProgress.completedSteps.length + 1) / progressiveSteps.length) * 100, 100),
        lastAccessedAt: new Date().toISOString()
      }

      // Atualizar steps locais
      const updatedSteps = progressiveSteps.map((step, index) => ({
        ...step,
        isCompleted: step.id === stepId ? true : step.isCompleted,
        isUnlocked: index <= updatedProgress.currentStepIndex
      }))

      setUserProgress(updatedProgress)
      setProgressiveSteps(updatedSteps)
      saveUserTrailProgress(user.id, updatedProgress)

      // Mostrar botões de navegação
      setShowNextButton(true)
    }
  }

  const handleNext = () => {
    if (currentStepIndex < progressiveSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
      setShowTranslation(false)
      setShowNextButton(false)
      setExerciseResult(null)
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      const newIndex = currentStepIndex - 1
      const previousStep = progressiveSteps[newIndex]
      
      setCurrentStepIndex(newIndex)
      setShowTranslation(false)
      setExerciseResult(null)
      
      // Se o passo anterior já foi completado, mostrar botões de navegação
      if (previousStep && previousStep.isCompleted) {
        setShowNextButton(true)
      } else {
        setShowNextButton(false)
      }
    }
  }

  const handleStepNavigation = (stepIndex: number) => {
    const step = progressiveSteps[stepIndex]
    if (step && step.isUnlocked) {
      setCurrentStepIndex(stepIndex)
      setShowTranslation(false)
      setShowNextButton(false)
    }
  }


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Carregando trilha progressiva...</div>
      </div>
    )
  }

  const currentStep = progressiveSteps[currentStepIndex]
  const progress = userProgress ? userProgress.progressPercentage : 0

  return (
    <AnimatedContainer className="min-h-screen">
      {/* Header */}
      <PageTransition delay={0}>
        <header className="bg-gray-900/50 border-b border-gray-700 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Logo size="sm" />
              <span className="text-white font-bold">Inglês pra Já</span>
            </button>
            
            <div className="flex items-center gap-4">
              {/* Contador para usuários free */}
              {userPlan === 'free' && !freeLimitations.isBlocked && (
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
              
              <div className="text-sm text-gray-400">
                Passo {currentStepIndex + 1} de {progressiveSteps.length}
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </header>
      </PageTransition>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Trail Header */}
        <PageTransition delay={200}>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{trailData.icon}</div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {trailData.title} - Trilha Progressiva
            </h1>
            <p className="text-gray-400 mb-4">
              {trailData.description}
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                userLevel === 'beginner' ? 'bg-green-500/20 text-green-400' :
                userLevel === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                Nível: {userLevel === 'beginner' ? 'Iniciante' : userLevel === 'intermediate' ? 'Intermediário' : 'Avançado'}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-sm text-gray-400">
              Progresso: {Math.round(progress)}%
            </div>
          </div>
        </PageTransition>

        {/* Mensagem de limitação para usuários free */}
        {userPlan === 'free' && freeLimitations.isBlocked && (
          <PageTransition delay={300}>
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-2 border-red-500/50 rounded-xl p-6 text-center">
                <div className="text-6xl mb-4">🔒</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Limite Diário Atingido!
                </h3>
                <p className="text-gray-300 mb-4 text-lg">
                  Você já praticou suas {freeLimitations.maxPhrases} frases diárias gratuitas nas trilhas progressivas.
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
                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full text-white font-semibold transition-colors"
                  >
                    ← Voltar ao Dashboard
                  </button>
                </div>
              </div>
            </div>
          </PageTransition>
        )}

        {/* Layout para trilha de trabalho - sem sidebar */}
        {slug === 'trabalho' ? (
          <PageTransition delay={400}>
            <div className="max-w-4xl mx-auto">
              {userProgress && userProgress.progressPercentage < 100 && currentStep && (!freeLimitations.isBlocked || userPlan === 'premium') ? (
                <div>
                  {/* Informação do passo atual */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">
                        {currentStep.type === 'phrase' ? '💬' : 
                         currentStep.type === 'exercise' ? '🧩' :
                         currentStep.type === 'module' ? '📚' :
                         currentStep.type === 'lesson' ? '🎯' : '📝'}
                      </span>
                      <h2 className="text-xl font-bold text-white">
                        {currentStep.type === 'phrase' ? 'Aprender Frase' : 
                         currentStep.type === 'exercise' ? 'Exercício' :
                         currentStep.type === 'module' ? 'Módulo' :
                         currentStep.type === 'lesson' ? 'Aula' : 'Conteúdo'}
                      </h2>
                      {currentStep.isCompleted && (
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                          ✓ Concluído
                        </span>
                      )}
                    </div>
                  </div>


                  {/* Conteúdo do passo */}
                  {currentStep.type === 'phrase' && currentStep.phrase && (
                    <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 mb-6">
                      {/* Context & Level */}
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-purple-400 text-sm font-medium flex items-center gap-2">
                          <span className="text-purple-400">📍</span>
                          {currentStep.phrase.context}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          currentStep.phrase.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                          currentStep.phrase.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {currentStep.phrase.difficulty === 'beginner' ? 'básico' :
                           currentStep.phrase.difficulty === 'intermediate' ? 'médio' : 'avançado'}
                        </span>
                      </div>

                      {/* English Phrase */}
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            🇺🇸 English
                          </h2>
                          <button
                            onClick={() => speakPhrase(currentStep.phrase.english)}
                            className="bg-purple-600 hover:bg-purple-700 p-2 rounded-full transition-colors flex items-center justify-center"
                            title="Ouvir pronúncia"
                          >
                            <SpeakerIcon size={16} className="text-white" />
                          </button>
                        </div>
                        <p className="text-xl text-white leading-relaxed bg-gray-800/50 p-4 rounded-lg">
                          {currentStep.phrase.english}
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
                          <div>
                            <p className="text-base md:text-lg text-gray-300 bg-gray-800/50 p-4 rounded-lg mb-4">
                              {currentStep.phrase.portuguese}
                            </p>
                            
                            {/* Situações práticas */}
                            {currentStep.phrase.situations && currentStep.phrase.situations.length > 0 && (
                              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                                <h4 className="text-blue-400 font-medium text-sm mb-2 flex items-center gap-2">
                                  💡 Quando usar:
                                </h4>
                                <div className="space-y-2">
                                  {currentStep.phrase.situations.map((situation, index) => (
                                    <p key={index} className="text-gray-300 text-sm">
                                      {situation}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 justify-center">
                        {!currentStep.isCompleted && !showNextButton && (
                          <button
                            onClick={() => handleStepComplete(currentStep.id, true)}
                            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105"
                          >
                            Marcar como Aprendida
                          </button>
                        )}
                        
                        {showNextButton && (
                          <>
                            {currentStepIndex > 0 && (
                              <button
                                onClick={handlePrevious}
                                className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
                              >
                                ← Voltar
                              </button>
                            )}
                            <button
                              onClick={handleNext}
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105"
                            >
                              Próximo →
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Exercícios */}
                  {currentStep.type === 'exercise' && currentStep.exercise && (
                    <div className="mb-6">
                      {currentStep.exercise.type === 'drag-drop' && (
                        <DragDropExercise
                          exercise={{
                            id: currentStep.exercise.id,
                            correctSentence: currentStep.exercise.data.correctSentence,
                            words: currentStep.exercise.data.words,
                            translation: currentStep.exercise.data.translation
                          }}
                          onComplete={handleExerciseComplete}
                        />
                      )}
                      
                      {currentStep.exercise.type === 'complete-sentence' && (
                        <CompleteSentenceExercise
                          exerciseData={currentStep.exercise.data}
                          onComplete={handleExerciseComplete}
                        />
                      )}
                      
                      {currentStep.exercise.type === 'translation' && (
                        <TranslationExercise
                          exerciseData={currentStep.exercise.data}
                          onComplete={handleExerciseComplete}
                        />
                      )}
                      
                      {currentStep.exercise.type === 'multiple-choice' && (
                        <MultipleChoiceExercise
                          exerciseData={currentStep.exercise.data}
                          onComplete={handleExerciseComplete}
                        />
                      )}

                      {/* Botões de navegação para exercícios - apenas trilha trabalho */}
                      {slug === 'trabalho' && exerciseResult?.completed && (
                        <div className="flex gap-4 justify-center mt-6">
                          {exerciseResult.correct ? (
                            <>
                              {currentStepIndex > 0 && (
                                <button
                                  onClick={handlePrevious}
                                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
                                >
                                  ← Voltar
                                </button>
                              )}
                              <button
                                onClick={handleExerciseAdvance}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105"
                              >
                                Próximo →
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={handleExerciseRetry}
                              className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-full text-white font-semibold transition-colors"
                            >
                              Tentar Novamente
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Parabéns! Você completou todas as 145 frases A1/A2!
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Escolha como deseja continuar seus estudos:
                  </p>

                  {/* Botões de ação principal */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <button
                      onClick={handleStudyAgain}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105"
                    >
                      📚 Estudar Novamente
                    </button>
                    
                    {trailData.finalTest && (
                      <button
                        onClick={handleFinalTestStart}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105"
                      >
                        🎯 Fazer Exame A1/A2
                      </button>
                    )}
                  </div>
                  
                  {/* Informações sobre o teste */}
                  {trailData.finalTest && (
                    <div className="bg-gray-800/30 border border-gray-600 rounded-xl p-4 mb-6">
                      <h3 className="text-white font-semibold text-lg mb-3 text-center">
                        📋 Sobre o Exame de Certificação A1/A2
                      </h3>
                      <div className="grid grid-cols-3 gap-4 text-center text-sm">
                        <div>
                          <div className="text-blue-400 font-bold text-xl">35</div>
                          <div className="text-gray-400">Questões</div>
                        </div>
                        <div>
                          <div className="text-green-400 font-bold text-xl">70%</div>
                          <div className="text-gray-400">Nota Mínima</div>
                        </div>
                        <div>
                          <div className="text-purple-400 font-bold text-xl">~20min</div>
                          <div className="text-gray-400">Duração</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Se já foi certificado */}
                  {userProgress?.isCertified && (
                    <div className="bg-gradient-to-r from-gold-900/50 to-yellow-900/50 border border-yellow-500/30 rounded-xl p-6 mb-6">
                      <h3 className="text-yellow-400 font-semibold text-xl mb-2">
                        🏆 Você já foi certificado!
                      </h3>
                      <p className="text-gray-300 mb-2">
                        Nota do teste: <strong className="text-white">{userProgress.certificateScore}%</strong>
                      </p>
                      <p className="text-gray-400 text-sm">
                        Certificado obtido em: {new Date(userProgress.certificateDate!).toLocaleDateString('pt-BR')}
                      </p>
                      
                      <button
                        onClick={handleFinalTestStart}
                        className="mt-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
                      >
                        🔄 Refazer Teste (Melhorar Nota)
                      </button>
                    </div>
                  )}
                  
                  <Link 
                    href="/dashboard"
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-3 rounded-full text-white font-bold transition-all duration-300"
                  >
                    Explorar Outras Trilhas
                  </Link>
                </div>
              )}
            </div>
          </PageTransition>
        ) : (
          /* Layout original com sidebar para outras trilhas */
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sidebar com lista de passos */}
            <PageTransition delay={400}>
              <div className="w-full lg:w-80 lg:flex-shrink-0 order-2 lg:order-1">
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 sticky top-4">
                  <h3 className="text-white font-semibold mb-4">📋 Passos da Trilha</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {progressiveSteps.map((step, index) => (
                      <button
                        key={step.id}
                        onClick={() => handleStepNavigation(index)}
                        disabled={!step.isUnlocked}
                        className={`w-full p-3 rounded-lg text-left text-sm transition-all duration-200 ${
                          index === currentStepIndex
                            ? 'bg-purple-600/30 border border-purple-400/50 text-white'
                            : step.isCompleted
                            ? 'bg-green-600/20 border border-green-500/30 text-green-400'
                            : step.isUnlocked
                            ? 'bg-gray-800/50 border border-gray-600 text-gray-300 hover:bg-gray-700/50'
                            : 'bg-gray-800/30 border border-gray-700 text-gray-500 cursor-not-allowed opacity-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {step.isCompleted ? '✅' : step.isUnlocked ? (step.type === 'phrase' ? '💬' : '🧩') : '🔒'}
                          </span>
                          <div>
                            <div className="font-medium">
                              {step.type === 'phrase' ? 'Frase' : 'Exercício'} {index + 1}
                            </div>
                            {step.phrase && (
                              <div className="text-xs opacity-80 line-clamp-1">
                                {step.phrase.english}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </PageTransition>

            {/* Conteúdo principal para outras trilhas */}
            <PageTransition delay={600}>
              <div className="flex-1 order-1 lg:order-2">
                {currentStep ? (
                  <div>
                    {/* Informação do passo atual */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">
                          {currentStep.type === 'phrase' ? '💬' : '🧩'}
                        </span>
                        <h2 className="text-xl font-bold text-white">
                          {currentStep.type === 'phrase' ? 'Aprender Frase' : 'Exercício'}
                        </h2>
                        {currentStep.isCompleted && (
                          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                            ✓ Concluído
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Conteúdo do passo - mesmo conteúdo da trilha de trabalho */}
                    {currentStep.type === 'phrase' && currentStep.phrase && (
                      <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 mb-6">
                        {/* Context & Level */}
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-purple-400 text-sm font-medium flex items-center gap-2">
                            <span className="text-purple-400">📍</span>
                            {currentStep.phrase.context}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            currentStep.phrase.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                            currentStep.phrase.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {currentStep.phrase.difficulty === 'beginner' ? 'básico' :
                             currentStep.phrase.difficulty === 'intermediate' ? 'médio' : 'avançado'}
                          </span>
                        </div>

                        {/* English Phrase */}
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-3">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                              🇺🇸 English
                            </h2>
                            <button
                              onClick={() => speakPhrase(currentStep.phrase.english)}
                              className="bg-purple-600 hover:bg-purple-700 p-2 rounded-full transition-colors flex items-center justify-center"
                              title="Ouvir pronúncia"
                            >
                              <SpeakerIcon size={16} className="text-white" />
                            </button>
                          </div>
                          <p className="text-xl text-white leading-relaxed bg-gray-800/50 p-4 rounded-lg">
                            {currentStep.phrase.english}
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
                              {currentStep.phrase.portuguese}
                            </p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 justify-center">
                          {!currentStep.isCompleted && !showNextButton && (
                            <button
                              onClick={() => handleStepComplete(currentStep.id, true)}
                              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105"
                            >
                              Marcar como Aprendida
                            </button>
                          )}
                          
                          {showNextButton && (
                            <>
                              {currentStepIndex > 0 && (
                                <button
                                  onClick={handlePrevious}
                                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
                                >
                                  ← Voltar
                                </button>
                              )}
                              <button
                                onClick={handleNext}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105"
                              >
                                Próximo →
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Exercícios */}
                    {currentStep.type === 'exercise' && currentStep.exercise && (
                      <div className="mb-6">
                        {currentStep.exercise.type === 'drag-drop' && (
                          <DragDropExercise
                            exercise={{
                              id: currentStep.exercise.id,
                              correctSentence: currentStep.exercise.data.correctSentence,
                              words: currentStep.exercise.data.words,
                              translation: currentStep.exercise.data.translation
                            }}
                            onComplete={(isCorrect) => handleStepComplete(currentStep.id, isCorrect)}
                          />
                        )}
                        
                        {currentStep.exercise.type === 'complete-sentence' && (
                          <CompleteSentenceExercise
                            exerciseData={currentStep.exercise.data}
                            onComplete={(isCorrect) => handleStepComplete(currentStep.id, isCorrect)}
                          />
                        )}
                        
                        {currentStep.exercise.type === 'translation' && (
                          <TranslationExercise
                            exerciseData={currentStep.exercise.data}
                            onComplete={(isCorrect) => handleStepComplete(currentStep.id, isCorrect)}
                          />
                        )}
                        
                        {currentStep.exercise.type === 'multiple-choice' && (
                          <MultipleChoiceExercise
                            exerciseData={currentStep.exercise.data}
                            onComplete={(isCorrect) => handleStepComplete(currentStep.id, isCorrect)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                      Parabéns! Trilha Concluída!
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Você completou todos os passos desta trilha progressiva.
                    </p>
                    <Link 
                      href="/dashboard"
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-3 rounded-full text-white font-bold transition-all duration-300"
                    >
                      Explorar Outras Trilhas
                    </Link>
                  </div>
                )}
              </div>
            </PageTransition>
          </div>
        )}
      </div>

      {/* Modal do Teste Final */}
      {showFinalTest && trailData.finalTest && (
        <FinalCertificationTest
          test={trailData.finalTest}
          onComplete={handleFinalTestComplete}
          onClose={handleFinalTestClose}
        />
      )}
    </AnimatedContainer>
  )
}