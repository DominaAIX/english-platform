'use client'

import { useState, useEffect } from 'react'
import { FinalCertificationTest as FinalTestType, FinalTestQuestion } from '@/data/progressiveTrails'
import DragDropExercise from './DragDropExercise'
import MultipleChoiceExercise from './MultipleChoiceExercise'
import TranslationExercise from './TranslationExercise'
import CompleteSentenceExercise from './CompleteSentenceExercise'

interface FinalCertificationTestProps {
  test: FinalTestType
  onComplete: (passed: boolean, score: number) => void
  onClose: () => void
}

export default function FinalCertificationTest({ test, onComplete, onClose }: FinalCertificationTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: any }>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [timeStarted, setTimeStarted] = useState<Date>(new Date())
  const [shuffledQuestions, setShuffledQuestions] = useState<FinalTestQuestion[]>([])
  const [showExitWarning, setShowExitWarning] = useState(false)

  // Função para embaralhar opções de múltipla escolha
  const shuffleMultipleChoiceOptions = (question: FinalTestQuestion) => {
    if (question.type !== 'multiple-choice' || !question.options) {
      return question
    }

    const correctOption = question.options[question.correctAnswer!]
    const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5)
    const newCorrectAnswer = shuffledOptions.indexOf(correctOption)

    return {
      ...question,
      options: shuffledOptions,
      correctAnswer: newCorrectAnswer
    }
  }

  useEffect(() => {
    // Embaralhar questões de múltipla escolha ao iniciar o teste
    console.log('Setting up test questions', { totalQuestions: test.questions.length })
    const shuffled = test.questions.map(question => shuffleMultipleChoiceOptions(question))
    console.log('Questions shuffled', { shuffledLength: shuffled.length })
    setShuffledQuestions(shuffled)
    setTimeStarted(new Date())

    // Prevenir fechamento da aba/navegador durante o teste
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!showResults) {
        e.preventDefault()
        e.returnValue = 'Você está saindo do teste de certificação. O próximo teste só será liberado em 48 horas. Tem certeza?'
        return e.returnValue
      }
    }

    // Prevenir tecla ESC
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !showResults) {
        e.preventDefault()
        setShowExitWarning(true)
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showResults])

  const currentQuestion = shuffledQuestions.length > 0 && currentQuestionIndex < shuffledQuestions.length ? shuffledQuestions[currentQuestionIndex] : null
  const progress = shuffledQuestions.length > 0 ? ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100 : 0

  // Log quando currentQuestion muda
  useEffect(() => {
    if (currentQuestion) {
      console.log('Current question changed', { 
        index: currentQuestionIndex, 
        questionId: currentQuestion.id,
        questionType: currentQuestion.type 
      })
    } else {
      console.log('No current question', { 
        index: currentQuestionIndex, 
        totalQuestions: shuffledQuestions.length 
      })
    }
  }, [currentQuestionIndex, currentQuestion])

  if (!currentQuestion) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8">
          <div className="text-white text-center">Carregando teste...</div>
        </div>
      </div>
    )
  }

  const handleAnswerSubmit = (answer: any) => {
    console.log('handleAnswerSubmit called', { 
      answer, 
      currentQuestionIndex, 
      shuffledQuestionsLength: shuffledQuestions.length,
      currentQuestion: currentQuestion?.id 
    })
    
    if (!currentQuestion) {
      console.error('No current question found in handleAnswerSubmit')
      return
    }
    
    const questionId = currentQuestion.id
    setAnswers(prev => {
      const newAnswers = { ...prev, [questionId]: answer }
      console.log('Updated answers:', newAnswers)
      return newAnswers
    })

    // Avançar automaticamente após resposta
    setTimeout(() => {
      console.log('setTimeout executing', { 
        currentQuestionIndex, 
        totalQuestions: shuffledQuestions.length 
      })
      
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        console.log('Moving to next question:', currentQuestionIndex + 1)
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        console.log('Calculating final score')
        calculateFinalScore()
      }
    }, 1500)
  }

  const calculateFinalScore = () => {
    let correctAnswers = 0

    shuffledQuestions.forEach(question => {
      const userAnswer = answers[question.id]
      let isCorrect = false

      switch (question.type) {
        case 'multiple-choice':
          isCorrect = userAnswer === question.correctAnswer
          break
        case 'translation':
          if (userAnswer && question.correctAnswer) {
            const normalizedUser = userAnswer.toLowerCase().replace(/[^a-z\s]/g, '').trim()
            const normalizedCorrect = question.correctAnswer.toLowerCase().replace(/[^a-z\s]/g, '').trim()
            isCorrect = normalizedUser === normalizedCorrect
            
            // Verificar variações aceitas
            if (!isCorrect && question.acceptedVariations) {
              isCorrect = question.acceptedVariations.some(variation => 
                normalizedUser === variation.toLowerCase().replace(/[^a-z\s]/g, '').trim()
              )
            }
          }
          break
        case 'complete-sentence':
          if (userAnswer && question.correctAnswer) {
            const normalizedUser = userAnswer.toLowerCase().trim()
            const normalizedCorrect = question.correctAnswer.toLowerCase().trim()
            isCorrect = normalizedUser === normalizedCorrect
            
            // Verificar variações aceitas
            if (!isCorrect && question.acceptedVariations) {
              isCorrect = question.acceptedVariations.some(variation => 
                normalizedUser === variation.toLowerCase().trim()
              )
            }
          }
          break
        case 'drag-drop':
          if (userAnswer && question.correctSentence) {
            const normalizedUser = userAnswer.toLowerCase().replace(/[^a-z\s]/g, '').trim()
            const normalizedCorrect = question.correctSentence.toLowerCase().replace(/[^a-z\s]/g, '').trim()
            isCorrect = normalizedUser === normalizedCorrect
          }
          break
      }

      if (isCorrect) correctAnswers++
    })

    const finalScore = Math.round((correctAnswers / shuffledQuestions.length) * 100)
    setScore(finalScore)
    setShowResults(true)

    const passed = finalScore >= test.passingScore
    onComplete(passed, finalScore)
  }

  const handleRetry = () => {
    // Reembaralhar questões ao tentar novamente
    const reshuffled = test.questions.map(question => shuffleMultipleChoiceOptions(question))
    setShuffledQuestions(reshuffled)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowResults(false)
    setScore(0)
    setTimeStarted(new Date())
  }

  const handleForceExit = () => {
    // Marcar como falha e bloquear por 48h
    onComplete(false, 0)
    onClose()
  }

  const handleCancelExit = () => {
    setShowExitWarning(false)
  }

  const getQuestionComponent = () => {
    console.log('Rendering question component', { 
      type: currentQuestion.type, 
      question: currentQuestion.question,
      hasOptions: !!currentQuestion.options,
      hasWords: !!currentQuestion.words,
      hasAcceptedVariations: !!currentQuestion.acceptedVariations
    })
    
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <MultipleChoiceExercise
            exerciseData={{
              question: currentQuestion.question,
              options: currentQuestion.options || [],
              correctAnswer: currentQuestion.correctAnswer || 0,
              explanation: currentQuestion.explanation
            }}
            onComplete={(isCorrect) => handleAnswerSubmit(isCorrect ? currentQuestion.correctAnswer : -1)}
            hideHints={true}
            hideRetryButton={true}
            showMinimalFeedback={true}
          />
        )
      
      case 'translation':
        return (
          <TranslationExercise
            exerciseData={{
              portugueseText: currentQuestion.question,
              correctEnglish: currentQuestion.correctAnswer || '',
              alternatives: currentQuestion.acceptedVariations || [],
              hint: `Resposta esperada: ${currentQuestion.correctAnswer || ''}`
            }}
            onComplete={(isCorrect, answer) => handleAnswerSubmit(answer)}
            hideHints={true}
            hideRetryButton={true}
            showMinimalFeedback={true}
          />
        )
      
      case 'complete-sentence':
        // Para complete-sentence, precisamos gerar opções se não existirem
        const generateCompleteSentenceOptions = () => {
          if (currentQuestion.options && currentQuestion.options.length > 0) {
            return {
              options: currentQuestion.options,
              correctAnswer: currentQuestion.correctAnswer || 0
            }
          }
          
          // Se não tem opções, criar opções baseadas na resposta correta
          const correctWord = currentQuestion.correctAnswer || 'good'
          const wrongOptions = ['bad', 'terrible', 'awful', 'horrible']
          const allOptions = [correctWord, ...wrongOptions.slice(0, 3)]
          const shuffledOptions = allOptions.sort(() => Math.random() - 0.5)
          
          return {
            options: shuffledOptions,
            correctAnswer: shuffledOptions.indexOf(correctWord)
          }
        }
        
        const { options, correctAnswer } = generateCompleteSentenceOptions()
        
        return (
          <CompleteSentenceExercise
            exerciseData={{
              sentence: currentQuestion.question,
              options: options,
              correctAnswer: correctAnswer,
              translation: currentQuestion.translation || ''
            }}
            onComplete={(isCorrect, answer) => handleAnswerSubmit(answer)}
            hideRetryButton={true}
          />
        )
      
      case 'drag-drop':
        return (
          <DragDropExercise
            exercise={{
              id: currentQuestion.id,
              correctSentence: currentQuestion.correctSentence || '',
              words: currentQuestion.words || [],
              translation: currentQuestion.translation || ''
            }}
            onComplete={(isCorrect) => handleAnswerSubmit(currentQuestion.correctSentence)}
            hideRetryButton={true}
          />
        )
      
      default:
        return null
    }
  }

  if (showResults) {
    const passed = score >= test.passingScore
    const timeTaken = Math.round((new Date().getTime() - timeStarted.getTime()) / 1000 / 60)

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="text-center">
            <div className="text-6xl mb-6">
              {passed ? '🎉' : '📚'}
            </div>
            
            <h2 className={`text-3xl font-bold mb-4 ${passed ? 'text-green-400' : 'text-orange-400'}`}>
              {passed ? 'Parabéns! Você foi aprovado!' : 'Continue estudando!'}
            </h2>
            
            <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className={`text-2xl font-bold ${passed ? 'text-green-400' : 'text-orange-400'}`}>
                    {score}%
                  </div>
                  <div className="text-gray-400 text-sm">Sua Nota</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">
                    {test.passingScore}%
                  </div>
                  <div className="text-gray-400 text-sm">Nota Mínima</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">
                    {timeTaken}min
                  </div>
                  <div className="text-gray-400 text-sm">Tempo</div>
                </div>
              </div>
            </div>

            {passed ? (
              <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-6 mb-6">
                <h3 className="text-green-400 font-semibold text-lg mb-2">
                  🏆 Certificado Conquistado!
                </h3>
                <p className="text-gray-300">
                  Você demonstrou domínio das 135 frases essenciais A1/A2 para o trabalho.
                  Seu certificado: <strong className="text-white">{test.certificateName}</strong>
                </p>
              </div>
            ) : (
              <div className="bg-orange-900/30 border border-orange-500/30 rounded-xl p-6 mb-6">
                <h3 className="text-orange-400 font-semibold text-lg mb-2">
                  📖 Continue Praticando
                </h3>
                <p className="text-gray-300">
                  Você precisa de pelo menos {test.passingScore}% para ser aprovado. 
                  Revise as frases e tente novamente!
                </p>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={onClose}
                className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full text-white font-semibold transition-colors"
              >
                Voltar às Frases
              </button>
              
              {!passed && (
                <button
                  onClick={handleRetry}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
                >
                  Tentar Novamente
                </button>
              )}
              
              {passed && (
                <button
                  onClick={() => {/* Função para download do certificado */}}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
                >
                  📄 Baixar Certificado
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col z-50">
      {/* Header com Logo */}
      <div className="bg-gray-900/50 border-b border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => setShowExitWarning(true)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IP</span>
            </div>
            <span className="text-white font-bold">Inglês pra Já</span>
          </button>
          
          <div className="text-red-400 text-sm font-medium">
            ⚠️ Teste de Certificação em Andamento
          </div>
        </div>
      </div>

      {/* Conteúdo do Teste */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
          {/* Header do Teste */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">{test.title}</h2>
            <p className="text-gray-400">{test.description}</p>
          </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Questão {currentQuestionIndex + 1} de {shuffledQuestions.length}
            </span>
            <span className="text-sm text-gray-400">
              {Math.round(progress)}% completo
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-purple-600/30 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
              {currentQuestion.type === 'multiple-choice' ? '🎯 Múltipla Escolha' :
               currentQuestion.type === 'translation' ? '🌍 Tradução' :
               currentQuestion.type === 'complete-sentence' ? '✍️ Complete' :
               '🧩 Arrastar e Soltar'}
            </span>
          </div>
          
          {getQuestionComponent()}
        </div>

          {/* Navigation hint */}
          <div className="text-center text-sm text-gray-500">
            Responda e aguarde para avançar automaticamente
          </div>
        </div>
      </div>

      {/* Modal de Aviso de Saída */}
      {showExitWarning && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div className="bg-red-900/50 border-2 border-red-500 rounded-2xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-red-400 mb-4">
                Atenção!
              </h3>
              <p className="text-white mb-6 leading-relaxed">
                Você está tentando sair do teste de certificação. 
                <strong className="text-red-300"> Se sair agora, será bloqueado por 48 horas.</strong>
              </p>
              <p className="text-gray-300 mb-8 text-sm">
                O próximo teste só será liberado em: <strong className="text-red-300">48 horas</strong>
              </p>
              
              <div className="flex gap-4">
                <button
                  onClick={handleCancelExit}
                  className="flex-1 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
                >
                  Continuar Teste
                </button>
                <button
                  onClick={handleForceExit}
                  className="flex-1 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
                >
                  Sair (48h bloqueio)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}