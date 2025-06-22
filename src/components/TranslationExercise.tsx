'use client'

import { useState, useEffect } from 'react'
import { TranslationExerciseData } from '@/data/progressiveTrails'

interface TranslationExerciseProps {
  exerciseData: TranslationExerciseData
  onComplete: (isCorrect: boolean) => void
  disabled?: boolean
}

export default function TranslationExercise({ 
  exerciseData, 
  onComplete, 
  disabled = false 
}: TranslationExerciseProps) {
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled || hasSubmitted) return
    setUserAnswer(e.target.value)
  }

  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[.,!?;:]/g, '') // Remove pontuação
      .replace(/\s+/g, ' ') // Normaliza espaços
  }

  const checkAnswer = (answer: string): boolean => {
    const normalizedAnswer = normalizeText(answer)
    const normalizedCorrect = normalizeText(exerciseData.correctEnglish)
    
    // Verificar resposta principal
    if (normalizedAnswer === normalizedCorrect) {
      return true
    }
    
    // Verificar alternativas aceitas
    if (exerciseData.alternatives) {
      return exerciseData.alternatives.some(alt => 
        normalizeText(alt) === normalizedAnswer
      )
    }
    
    return false
  }

  const handleSubmit = () => {
    if (!userAnswer.trim() || hasSubmitted || disabled) return

    const correct = checkAnswer(userAnswer)
    setIsCorrect(correct)
    setShowResult(true)
    setHasSubmitted(true)

    // Chamar callback após um pequeno delay para mostrar o resultado
    setTimeout(() => {
      onComplete(correct)
    }, 2000)
  }

  const handleTryAgain = () => {
    setUserAnswer('')
    setShowResult(false)
    setIsCorrect(false)
    setHasSubmitted(false)
    setShowHint(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
          🔄 Tradução
        </h3>
        <p className="text-gray-400 text-sm">
          Traduza a frase em português para o inglês.
        </p>
      </div>

      {/* Texto em português */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3 text-sm sm:text-base">Traduza para o inglês:</h4>
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 sm:p-4">
          <div className="text-lg sm:text-xl text-white font-medium flex items-center gap-2 break-words leading-tight">
            🇧🇷 {exerciseData.portugueseText}
          </div>
        </div>
      </div>

      {/* Campo de resposta */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-3 text-sm sm:text-base">Sua tradução em inglês:</h4>
        <textarea
          value={userAnswer}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua tradução aqui..."
          disabled={disabled || hasSubmitted}
          className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500 transition-colors ${
            hasSubmitted 
              ? isCorrect 
                ? 'border-green-500 bg-green-900/20' 
                : 'border-red-500 bg-red-900/20'
              : ''
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          rows={3}
        />
      </div>

      {/* Dica */}
      {exerciseData.hint && (
        <div className="mb-6">
          <button
            onClick={() => setShowHint(!showHint)}
            disabled={disabled}
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors flex items-center gap-2"
          >
            💡 {showHint ? 'Ocultar' : 'Mostrar'} Dica
          </button>
          
          {showHint && (
            <div className="mt-2 bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3">
              <p className="text-cyan-300 text-sm">
                💡 {exerciseData.hint}
              </p>
            </div>
          )}
        </div>
      )}

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
              {isCorrect ? 'Tradução Correta!' : 'Tradução Incorreta!'}
            </span>
          </div>
          
          {!isCorrect && (
            <div className="space-y-2">
              <div className="text-gray-300 text-sm">
                <p><strong>Sua resposta:</strong> {userAnswer}</p>
              </div>
              <div className="text-green-300 text-sm">
                <p><strong>Resposta correta:</strong> {exerciseData.correctEnglish}</p>
              </div>
              {exerciseData.alternatives && exerciseData.alternatives.length > 0 && (
                <div className="text-gray-300 text-sm">
                  <p><strong>Outras respostas aceitas:</strong></p>
                  <ul className="list-disc list-inside ml-2">
                    {exerciseData.alternatives.map((alt, index) => (
                      <li key={index}>{alt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {isCorrect && (
            <div className="text-green-300 text-sm">
              Perfeito! Sua tradução está correta.
            </div>
          )}
        </div>
      )}

      {/* Botões de ação */}
      <div className="flex gap-3 justify-center">
        {!hasSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!userAnswer.trim() || disabled}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
          >
            Verificar Tradução
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