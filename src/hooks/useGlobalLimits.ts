'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRealTimeCounter } from './useRealTimeCounter'

interface GlobalLimits {
  totalPhrasesViewed: number
  totalExercisesCompleted: number
  totalAiMessages: number
  totalVerbConjugations: number
  phrasesLimit: number
  exercisesLimit: number
  aiMessagesLimit: number
  verbConjugationsLimit: number
  isPhrasesBlocked: boolean
  isExercisesBlocked: boolean
  isAiMessagesBlocked: boolean
  isVerbConjugationsBlocked: boolean
  resetTime: string | null
}

export function useGlobalLimits() {
  const { user, userProfile } = useAuth()
  const [limits, setLimits] = useState<GlobalLimits>({
    totalPhrasesViewed: 0,
    totalExercisesCompleted: 0,
    totalAiMessages: 0,
    totalVerbConjugations: 0,
    phrasesLimit: 10,
    exercisesLimit: 3,
    aiMessagesLimit: 3,
    verbConjugationsLimit: 2,
    isPhrasesBlocked: false,
    isExercisesBlocked: false,
    isAiMessagesBlocked: false,
    isVerbConjugationsBlocked: false,
    resetTime: null
  })

  // Verificar se é usuário premium
  const isPremium = userProfile?.plan === 'premium'

  useEffect(() => {
    if (!user || isPremium) {
      // Usuários premium não têm limites
      setLimits(prev => ({
        ...prev,
        isPhrasesBlocked: false,
        isExercisesBlocked: false,
        isAiMessagesBlocked: false,
        isVerbConjugationsBlocked: false
      }))
      return
    }

    loadLimitsFromStorage()
  }, [user, isPremium])

  const loadLimitsFromStorage = () => {
    if (!user) return

    const storageKey = `user_limits_${user.id}`
    const stored = localStorage.getItem(storageKey)
    
    if (stored) {
      const data = JSON.parse(stored)
      
      // Verificar se passou 24 horas desde o último reset
      const now = new Date()
      const lastReset = new Date(data.lastReset || 0)
      const hoursDiff = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60)
      
      if (hoursDiff >= 24) {
        // Reset dos limites após 24 horas
        resetLimits()
      } else {
        // Carregar limites existentes
        setLimits({
          totalPhrasesViewed: data.totalPhrasesViewed || 0,
          totalExercisesCompleted: data.totalExercisesCompleted || 0,
          totalAiMessages: data.totalAiMessages || 0,
          totalVerbConjugations: data.totalVerbConjugations || 0,
          phrasesLimit: 10,
          exercisesLimit: 3,
          aiMessagesLimit: 3,
          verbConjugationsLimit: 2,
          isPhrasesBlocked: (data.totalPhrasesViewed || 0) >= 10,
          isExercisesBlocked: (data.totalExercisesCompleted || 0) >= 3,
          isAiMessagesBlocked: (data.totalAiMessages || 0) >= 3,
          isVerbConjugationsBlocked: (data.totalVerbConjugations || 0) >= 2,
          resetTime: data.lastReset
        })
      }
    } else {
      // Primeira vez - inicializar limites
      resetLimits()
    }
  }

  const resetLimits = () => {
    const now = new Date()
    const newLimits = {
      totalPhrasesViewed: 0,
      totalExercisesCompleted: 0,
      totalAiMessages: 0,
      totalVerbConjugations: 0,
      phrasesLimit: 10,
      exercisesLimit: 3,
      aiMessagesLimit: 3,
      verbConjugationsLimit: 2,
      isPhrasesBlocked: false,
      isExercisesBlocked: false,
      isAiMessagesBlocked: false,
      isVerbConjugationsBlocked: false,
      resetTime: now.toISOString()
    }
    
    setLimits(newLimits)
    
    if (user) {
      const storageKey = `user_limits_${user.id}`
      localStorage.setItem(storageKey, JSON.stringify({
        ...newLimits,
        lastReset: now.toISOString()
      }))
    }
  }

  const incrementPhrases = (): boolean => {
    if (isPremium) return true
    if (limits.isPhrasesBlocked) return false
    
    const newTotal = limits.totalPhrasesViewed + 1
    const isBlocked = newTotal >= limits.phrasesLimit
    
    const newLimits = {
      ...limits,
      totalPhrasesViewed: newTotal,
      isPhrasesBlocked: isBlocked
    }
    
    setLimits(newLimits)
    
    // Salvar no localStorage
    if (user) {
      const storageKey = `user_limits_${user.id}`
      const stored = JSON.parse(localStorage.getItem(storageKey) || '{}')
      localStorage.setItem(storageKey, JSON.stringify({
        ...stored,
        totalPhrasesViewed: newTotal
      }))
    }
    
    return !isBlocked
  }

  const incrementExercises = (): boolean => {
    if (isPremium) return true
    if (limits.isExercisesBlocked) return false
    
    const newTotal = limits.totalExercisesCompleted + 1
    const isBlocked = newTotal >= limits.exercisesLimit
    
    const newLimits = {
      ...limits,
      totalExercisesCompleted: newTotal,
      isExercisesBlocked: isBlocked
    }
    
    setLimits(newLimits)
    
    // Salvar no localStorage
    if (user) {
      const storageKey = `user_limits_${user.id}`
      const stored = JSON.parse(localStorage.getItem(storageKey) || '{}')
      localStorage.setItem(storageKey, JSON.stringify({
        ...stored,
        totalExercisesCompleted: newTotal
      }))
    }
    
    return !isBlocked
  }

  const getRemainingPhrases = (): number => {
    if (isPremium) return Infinity
    return Math.max(0, limits.phrasesLimit - limits.totalPhrasesViewed)
  }

  const getRemainingExercises = (): number => {
    if (isPremium) return Infinity
    return Math.max(0, limits.exercisesLimit - limits.totalExercisesCompleted)
  }

  const incrementAiMessages = (): boolean => {
    if (isPremium) return true
    if (limits.isAiMessagesBlocked) return false
    
    const newTotal = limits.totalAiMessages + 1
    const isBlocked = newTotal >= limits.aiMessagesLimit
    
    const newLimits = {
      ...limits,
      totalAiMessages: newTotal,
      isAiMessagesBlocked: isBlocked
    }
    
    setLimits(newLimits)
    
    // Salvar no localStorage
    if (user) {
      const storageKey = `user_limits_${user.id}`
      const stored = JSON.parse(localStorage.getItem(storageKey) || '{}')
      localStorage.setItem(storageKey, JSON.stringify({
        ...stored,
        totalAiMessages: newTotal
      }))
    }
    
    return !isBlocked
  }

  const getRemainingAiMessages = (): number => {
    if (isPremium) return Infinity
    return Math.max(0, limits.aiMessagesLimit - limits.totalAiMessages)
  }

  const incrementVerbConjugations = (): boolean => {
    if (isPremium) return true
    if (limits.isVerbConjugationsBlocked) return false
    
    const newTotal = limits.totalVerbConjugations + 1
    const isBlocked = newTotal >= limits.verbConjugationsLimit
    
    const newLimits = {
      ...limits,
      totalVerbConjugations: newTotal,
      isVerbConjugationsBlocked: isBlocked
    }
    
    setLimits(newLimits)
    
    // Salvar no localStorage
    if (user) {
      const storageKey = `user_limits_${user.id}`
      const stored = JSON.parse(localStorage.getItem(storageKey) || '{}')
      localStorage.setItem(storageKey, JSON.stringify({
        ...stored,
        totalVerbConjugations: newTotal
      }))
    }
    
    return !isBlocked
  }

  const getRemainingVerbConjugations = (): number => {
    if (isPremium) return Infinity
    return Math.max(0, limits.verbConjugationsLimit - limits.totalVerbConjugations)
  }

  const getTimeUntilReset = (): string | null => {
    if (!limits.resetTime) return null
    
    const resetTime = new Date(limits.resetTime)
    const nextReset = new Date(resetTime.getTime() + 24 * 60 * 60 * 1000)
    const now = new Date()
    
    if (now >= nextReset) return null
    
    const diff = nextReset.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${hours}h ${minutes}m`
  }

  // Contador em tempo real
  const realTimeCountdown = useRealTimeCounter(limits.resetTime)

  return {
    ...limits,
    isPremium,
    incrementPhrases,
    incrementExercises,
    incrementAiMessages,
    incrementVerbConjugations,
    getRemainingPhrases,
    getRemainingExercises,
    getRemainingAiMessages,
    getRemainingVerbConjugations,
    getTimeUntilReset,
    getRealTimeCountdown: () => realTimeCountdown,
    resetLimits
  }
}