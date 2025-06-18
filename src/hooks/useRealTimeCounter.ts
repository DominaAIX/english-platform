'use client'

import { useState, useEffect } from 'react'

export function useRealTimeCounter(resetTime: string | null): string | null {
  const [timeLeft, setTimeLeft] = useState<string | null>(null)

  useEffect(() => {
    if (!resetTime) {
      setTimeLeft(null)
      return
    }

    const calculateTimeLeft = () => {
      const resetTimeDate = new Date(resetTime)
      const nextReset = new Date(resetTimeDate.getTime() + 24 * 60 * 60 * 1000)
      const now = new Date()
      
      if (now >= nextReset) {
        setTimeLeft(null)
        return
      }
      
      const diff = nextReset.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      // Formatar com zero à esquerda
      const formatTime = (num: number) => num.toString().padStart(2, '0')
      
      setTimeLeft(`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`)
    }

    // Calcular imediatamente
    calculateTimeLeft()

    // Atualizar a cada segundo
    const interval = setInterval(calculateTimeLeft, 1000)

    // Cleanup
    return () => clearInterval(interval)
  }, [resetTime])

  return timeLeft
}