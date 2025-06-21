'use client'

import { useState, useEffect } from 'react'
import { MultipleChoiceData } from '@/data/progressiveTrails'

interface MultipleChoiceExerciseProps {
  exerciseData: MultipleChoiceData
  onComplete: (isCorrect: boolean) => void
  disabled?: boolean
}

export default function MultipleChoiceExercise({ 
  exerciseData, 
  onComplete, 
  disabled = false 
}: MultipleChoiceExerciseProps) {
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
      onComplete(correct)
    }, 2000)
  }

  const handleTryAgain = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(false)
    setHasSubmitted(false)
  }

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 sm:p-8 lg:p-10 w-full max-w-none">
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
          🎯 Múltipla Escolha
        </h3>
        <p className="text-gray-400 text-sm">
          Escolha a alternativa correta.
        </p>
      </div>

      {/* Pergunta */}
      <div className="mb-6">
        <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
          <h4 className="text-base sm:text-lg text-white font-medium break-words leading-tight">
            {exerciseData.question}
          </h4>
        </div>
      </div>

      {/* Opções */}
      <div className="mb-6">
        <div className="space-y-3">
          {exerciseData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={disabled || hasSubmitted}
              className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
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
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  hasSubmitted
                    ? index === exerciseData.correctAnswer
                      ? 'border-green-400 bg-green-600'
                      : selectedAnswer === index
                      ? 'border-red-400 bg-red-600'
                      : 'border-gray-500'
                    : selectedAnswer === index
                    ? 'border-purple-400 bg-purple-600'
                    : 'border-gray-500'
                }`}>
                  {hasSubmitted && index === exerciseData.correctAnswer && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                  {hasSubmitted && selectedAnswer === index && index !== exerciseData.correctAnswer && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                  {!hasSubmitted && selectedAnswer === index && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-medium">
                  {String.fromCharCode(65 + index)}. {option}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Resultado */}
      {showResult && (
        <div className={`mb-6 p-4 rounded-lg ${
          isCorrect 
            ? 'bg-green-900/30 border border-green-500/30' 
            : 'bg-red-900/30 border border-red-500/30'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">
              {isCorrect ? '✅' : '❌'}
            </span>
            <span className={`font-semibold ${
              isCorrect ? 'text-green-400' : 'text-red-400'
            }`}>
              {isCorrect ? 'Resposta Correta!' : 'Resposta Incorreta!'}
            </span>
          </div>
          
          {!isCorrect && (
            <div className="text-gray-300 text-sm mb-2">
              <p>A resposta correta é: <strong>{String.fromCharCode(65 + exerciseData.correctAnswer)}. {exerciseData.options[exerciseData.correctAnswer]}</strong></p>
            </div>
          )}
          
          {exerciseData.explanation && (
            <div className="bg-gray-800/50 rounded-lg p-3 mt-3">
              <div className="text-cyan-400 text-sm font-medium mb-1">💡 Explicação:</div>
              <div className="text-gray-300 text-sm">
                {exerciseData.explanation}
              </div>
            </div>
          )}
          
          {isCorrect && (
            <div className="text-green-300 text-sm">
              Excelente! Você escolheu a alternativa correta.
            </div>
          )}
        </div>
      )}

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
        ) : !isCorrect ? (
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