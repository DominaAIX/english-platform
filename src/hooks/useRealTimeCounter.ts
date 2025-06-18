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
      
      setTimeLeft(`${hours}h ${minutes}m`)
    }

    // Calcular imediatamente
    calculateTimeLeft()

    // Atualizar a cada minuto (60 segundos)
    const interval = setInterval(calculateTimeLeft, 60000)

    // Cleanup
    return () => clearInterval(interval)
  }, [resetTime])

  return timeLeft
}