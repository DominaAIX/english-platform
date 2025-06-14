'use client'

import { useState, useEffect } from 'react'
import { useUserStats } from '@/hooks/useUserStats'

interface DragDropExerciseProps {
  exercise: {
    id: string
    correctSentence: string
    words: string[]
    translation: string
  }
  onComplete: (isCorrect: boolean) => void
}

// Função para embaralhar array
const shuffleArray = (array: string[]) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function DragDropExercise({ exercise, onComplete }: DragDropExerciseProps) {
  const { incrementExercisesCompleted } = useUserStats()
  const [draggedWord, setDraggedWord] = useState<string | null>(null)
  const [droppedWords, setDroppedWords] = useState<string[]>([])
  const [availableWords, setAvailableWords] = useState<string[]>(() => shuffleArray(exercise.words))
  const [isCompleted, setIsCompleted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Reset exercise when exercise prop changes (when user advances to next exercise)
  useEffect(() => {
    setDraggedWord(null)
    setDroppedWords([])
    setAvailableWords(shuffleArray(exercise.words))
    setIsCompleted(false)
    setIsCorrect(false)
  }, [exercise.id, exercise.words]) // Trigger reset when exercise ID or words change

  const handleDragStart = (e: React.DragEvent, word: string) => {
    setDraggedWord(word)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault()
    
    if (!draggedWord) return

    if (targetIndex !== undefined) {
      // Drop em posição específica na frase
      const newDroppedWords = [...droppedWords]
      newDroppedWords[targetIndex] = draggedWord
      setDroppedWords(newDroppedWords)
    } else {
      // Drop no final da frase
      setDroppedWords([...droppedWords, draggedWord])
    }

    // Remove palavra das disponíveis
    setAvailableWords(availableWords.filter(word => word !== draggedWord))
    setDraggedWord(null)
  }

  const handleWordClick = (word: string, fromDropped: boolean, index?: number) => {
    if (fromDropped && index !== undefined) {
      // Remove palavra da frase e volta para disponíveis
      const newDroppedWords = [...droppedWords]
      newDroppedWords.splice(index, 1)
      setDroppedWords(newDroppedWords)
      setAvailableWords([...availableWords, word])
    }
  }

  const checkAnswer = () => {
    const userSentence = droppedWords.join(' ').trim()
    const correct = userSentence.toLowerCase() === exercise.correctSentence.toLowerCase()
    setIsCorrect(correct)
    setIsCompleted(true)
    
    // Se o exercício estiver correto, incrementar contador
    if (correct) {
      incrementExercisesCompleted()
    }
    
    onComplete(correct)
  }

  const resetExercise = () => {
    setDroppedWords([])
    setAvailableWords(shuffleArray(exercise.words))
    setIsCompleted(false)
    setIsCorrect(false)
  }

  // Verifica se tem palavras suficientes para verificar
  const canCheck = droppedWords.length > 0 && availableWords.length === 0

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          📝 Monte a frase correta:
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {exercise.translation}
        </p>
      </div>

      {/* Área de construção da frase */}
      <div className="mb-6">
        <div className="text-sm text-gray-400 mb-2">Sua frase:</div>
        <div 
          className="min-h-[60px] border-2 border-dashed border-gray-600 rounded-lg p-4 flex flex-wrap gap-2 items-center bg-gray-800/30"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e)}
        >
          {droppedWords.length === 0 ? (
            <span className="text-gray-500 italic">Arraste as palavras aqui...</span>
          ) : (
            droppedWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                onClick={() => handleWordClick(word, true, index)}
                className="bg-purple-600 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors"
              >
                {word}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Palavras disponíveis */}
      <div className="mb-6">
        <div className="text-sm text-gray-400 mb-2">Palavras disponíveis:</div>
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word, index) => (
            <span
              key={`${word}-${index}`}
              draggable
              onDragStart={(e) => handleDragStart(e, word)}
              onClick={() => {
                setDroppedWords([...droppedWords, word])
                setAvailableWords(availableWords.filter(w => w !== word))
              }}
              className="bg-gray-700 text-white px-3 py-2 rounded-lg cursor-move hover:bg-gray-600 transition-colors select-none"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex gap-3">
        {canCheck && !isCompleted && (
          <button
            onClick={checkAnswer}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-white font-medium transition-colors"
          >
            ✓ Verificar
          </button>
        )}
        
        <button
          onClick={resetExercise}
          className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg text-white font-medium transition-colors"
        >
          🔄 Resetar
        </button>
      </div>

      {/* Feedback */}
      {isCompleted && (
        <div className={`mt-4 p-4 rounded-lg ${
          isCorrect 
            ? 'bg-green-900/30 border border-green-500/50 text-green-300' 
            : 'bg-red-900/30 border border-red-500/50 text-red-300'
        }`}>
          {isCorrect ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎉</span>
                <span className="font-semibold">Parabéns! Resposta correta!</span>
              </div>
              <div className="text-sm text-gray-300">
                "{exercise.correctSentence}"
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">❌</span>
                <span className="font-semibold">Tente novamente!</span>
              </div>
              <div className="text-sm text-gray-300">
                Resposta correta: "{exercise.correctSentence}"
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}