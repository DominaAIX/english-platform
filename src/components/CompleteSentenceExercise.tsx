'use client'

import { useState, useEffect } from 'react'
import { CompleteSentenceData } from '@/data/progressiveTrails'

interface CompleteSentenceExerciseProps {
  exerciseData: CompleteSentenceData
  onComplete: (isCorrect: boolean, answer?: string) => void
  disabled?: boolean
  hideRetryButton?: boolean
}

export default function CompleteSentenceExercise({ 
  exerciseData, 
  onComplete, 
  disabled = false,
  hideRetryButton = false
}: CompleteSentenceExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleOptionSelect = (optionIndex: number) => {
    if (disabled || hasSubmitted) return
    setSelectedAnswer(optionIndex)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null || hasSubmitted || disabled) return

    const correct = selectedAnswer === exerciseData.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    setHasSubmitted(true)

    // Chamar callback após um pequeno delay para mostrar o resultado
    setTimeout(() => {
      onComplete(correct, exerciseData.options[selectedAnswer])
    }, 1500)
  }

  const handleTryAgain = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(false)
    setHasSubmitted(false)
  }

  // Construir a frase com a opção selecionada
  const getCompletedSentence = () => {
    if (selectedAnswer === null) return exerciseData.sentence
    return exerciseData.sentence.replace('_____', exerciseData.options[selectedAnswer])
  }

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
          ✏️ Complete a Frase
        </h3>
        <p className="text-gray-400 text-sm">
          Escolha a palavra que melhor completa a frase em inglês.
        </p>
      </div>

      {/* Frase com espaço em branco */}
      <div className="mb-6">
        <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 mb-3">
          <div className="text-lg sm:text-xl text-white font-medium mb-2 break-words leading-tight">
            {getCompletedSentence()}
          </div>
          <div className="text-gray-400 text-sm break-words">
            📝 {exerciseData.translation}
          </div>
        </div>
      </div>

      {/* Opções */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3 text-sm sm:text-base">Escolha a palavra correta:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {exerciseData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={disabled || hasSubmitted}
              className={`p-3 rounded-lg text-left font-medium transition-all duration-200 ${
                hasSubmitted
                  ? index === exerciseData.correctAnswer
                    ? 'bg-green-600/30 border-2 border-green-400 text-green-300'
                    : selectedAnswer === index
                    ? 'bg-red-600/30 border-2 border-red-400 text-red-300'
                    : 'bg-gray-700/50 border border-gray-600 text-gray-400'
                  : selectedAnswer === index
                  ? 'bg-purple-600/30 border-2 border-purple-400 text-white'
                  : 'bg-gray-800/50 border border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
              } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            >
              <span className="text-lg">{option}</span>
            </button>
          ))}
        </div>
      </div>


      {/* Botões de ação */}
      <div className="flex gap-3 justify-center">
        {!hasSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null || disabled}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
          >
            Verificar Resposta
          </button>
        ) : !isCorrect && !hideRetryButton ? (
          <button
            onClick={handleTryAgain}
            disabled={disabled}
            className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full text-white font-semibold transition-colors"
          >
            Tentar Novamente
          </button>
        ) : null}
      </div>
    </div>
  )
}