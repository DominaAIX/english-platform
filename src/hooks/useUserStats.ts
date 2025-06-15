'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

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

  // Carregar estatísticas do Supabase
  const loadStats = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Erro ao carregar estatísticas:', error)
        return
      }

      if (data) {
        const loadedStats: UserStats = {
          phrasesViewed: data.phrases_viewed || 0,
          exercisesCompleted: data.exercises_completed || 0,
          aiMessagesCount: data.ai_messages_count || 0,
          premiumSinceDate: data.premium_since_date || null
        }
        setStats(loadedStats)
      } else {
        // Primeira vez do usuário - criar registro inicial
        await createInitialStats(userId)
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    }
  }

  // Criar registro inicial de estatísticas
  const createInitialStats = async (userId: string) => {
    try {
      const initialStats = {
        user_id: userId,
        phrases_viewed: 0,
        exercises_completed: 0,
        ai_messages_count: 0,
        premium_since_date: userProfile?.plan === 'premium' ? new Date().toISOString() : null
      }

      const { error } = await supabase
        .from('user_stats')
        .insert(initialStats)

      if (!error) {
        setStats({
          phrasesViewed: 0,
          exercisesCompleted: 0,
          aiMessagesCount: 0,
          premiumSinceDate: initialStats.premium_since_date
        })
      }
    } catch (error) {
      console.error('Erro ao criar estatísticas iniciais:', error)
    }
  }

  // Salvar estatísticas no Supabase
  const saveStats = async (newStats: UserStats) => {
    if (!user?.id) return

    try {
      const { error } = await supabase
        .from('user_stats')
        .upsert({
          user_id: user.id,
          phrases_viewed: newStats.phrasesViewed,
          exercises_completed: newStats.exercisesCompleted,
          ai_messages_count: newStats.aiMessagesCount,
          premium_since_date: newStats.premiumSinceDate
        })

      if (error) {
        console.error('Erro ao salvar estatísticas:', error)
      }
    } catch (error) {
      console.error('Erro ao salvar estatísticas:', error)
    }
  }

  useEffect(() => {
    if (!user?.id) return
    loadStats(user.id)
  }, [user?.id])

  // Efeito para atualizar data premium quando necessário
  useEffect(() => {
    if (!user?.id || !userProfile?.plan) return
    
    if (userProfile.plan === 'premium' && !stats.premiumSinceDate) {
      const updatedStats = { ...stats, premiumSinceDate: new Date().toISOString() }
      setStats(updatedStats)
      saveStats(updatedStats)
    }
  }, [userProfile?.plan, stats.premiumSinceDate])

  const incrementPhrasesViewed = async () => {
    const newStats = { ...stats, phrasesViewed: stats.phrasesViewed + 1 }
    setStats(newStats)
    await saveStats(newStats)
  }

  const incrementExercisesCompleted = async () => {
    const newStats = { ...stats, exercisesCompleted: stats.exercisesCompleted + 1 }
    setStats(newStats)
    await saveStats(newStats)
  }

  const incrementAiMessages = async () => {
    const newStats = { ...stats, aiMessagesCount: stats.aiMessagesCount + 1 }
    setStats(newStats)
    await saveStats(newStats)
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