'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface UserStats {
  phrasesViewed: number
  exercisesCompleted: number
  aiMessagesCount: number
  premiumSinceDate: string | null
}

export function useUserStats() {
  const { user, userProfile } = useAuth()
  const [stats, setStats] = useState<UserStats>({
    phrasesViewed: 0,
    exercisesCompleted: 0,
    aiMessagesCount: 0,
    premiumSinceDate: null
  })

  // Chave única para cada usuário no localStorage
  const getStorageKey = () => user?.id ? `user_stats_${user.id}` : null

  useEffect(() => {
    if (!user?.id) return

    const storageKey = getStorageKey()
    if (!storageKey) return

    // Carregar stats do localStorage sempre preservando dados existentes
    const savedStats = localStorage.getItem(storageKey)
    let currentStats: UserStats = {
      phrasesViewed: 0,
      exercisesCompleted: 0,
      aiMessagesCount: 0,
      premiumSinceDate: null
    }

    if (savedStats) {
      try {
        const parsedStats: UserStats = JSON.parse(savedStats)
        // Sempre preservar os dados existentes, nunca resetar
        currentStats = {
          phrasesViewed: parsedStats.phrasesViewed || 0,
          exercisesCompleted: parsedStats.exercisesCompleted || 0,
          aiMessagesCount: parsedStats.aiMessagesCount || 0,
          premiumSinceDate: parsedStats.premiumSinceDate || null
        }
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error)
      }
    }

    // Se usuário é premium e não tem data de início, definir agora
    if (userProfile?.plan === 'premium' && !currentStats.premiumSinceDate) {
      currentStats.premiumSinceDate = new Date().toISOString()
    }

    // Atualizar estado e salvar
    setStats(currentStats)
    saveStats(currentStats)
  }, [user?.id]) // Apenas depender do user.id, não do userProfile completo

  // Efeito separado para atualizar data premium sem interferir nos dados
  useEffect(() => {
    if (!user?.id || !userProfile?.plan) return
    
    if (userProfile.plan === 'premium') {
      const storageKey = getStorageKey()
      if (!storageKey) return
      
      const savedStats = localStorage.getItem(storageKey)
      if (savedStats) {
        try {
          const parsedStats = JSON.parse(savedStats)
          if (!parsedStats.premiumSinceDate) {
            const updatedStats = { ...parsedStats, premiumSinceDate: new Date().toISOString() }
            setStats(updatedStats)
            saveStats(updatedStats)
          }
        } catch (error) {
          console.error('Erro ao atualizar data premium:', error)
        }
      }
    }
  }, [userProfile?.plan])

  const saveStats = (newStats: UserStats) => {
    const storageKey = getStorageKey()
    if (!storageKey) return

    localStorage.setItem(storageKey, JSON.stringify(newStats))
  }

  const incrementPhrasesViewed = () => {
    const newStats = { ...stats, phrasesViewed: stats.phrasesViewed + 1 }
    setStats(newStats)
    saveStats(newStats)
  }

  const incrementExercisesCompleted = () => {
    const newStats = { ...stats, exercisesCompleted: stats.exercisesCompleted + 1 }
    setStats(newStats)
    saveStats(newStats)
  }

  const incrementAiMessages = () => {
    const newStats = { ...stats, aiMessagesCount: stats.aiMessagesCount + 1 }
    setStats(newStats)
    saveStats(newStats)
  }

  const getTotalPhrasesPracticed = () => {
    return stats.phrasesViewed + stats.exercisesCompleted
  }

  const getPremiumTimeFormatted = () => {
    if (!stats.premiumSinceDate || userProfile?.plan !== 'premium') return null

    const premiumSince = new Date(stats.premiumSinceDate)
    const now = new Date()
    const diffMs = now.getTime() - premiumSince.getTime()
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    // Sempre começar com 1 dia, mesmo no primeiro dia
    const displayDays = diffDays + 1
    
    if (displayDays === 1) {
      return '1 dia'
    } else {
      return `${displayDays} dias`
    }
  }

  return {
    stats,
    incrementPhrasesViewed,
    incrementExercisesCompleted,
    incrementAiMessages,
    getTotalPhrasesPracticed,
    getPremiumTimeFormatted
  }
}