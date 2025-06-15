'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface UserStats {
  phrasesViewed: number
  exercisesCompleted: number
  aiMessagesCount: number
  premiumSinceDate: string | null
}

interface StatsContextType {
  stats: UserStats
  incrementPhrasesViewed: () => Promise<void>
  incrementExercisesCompleted: () => Promise<void>
  incrementAiMessages: () => Promise<void>
  getTotalPhrasesPracticed: () => number
  getPremiumTimeFormatted: () => string | null
}

const StatsContext = createContext<StatsContextType | undefined>(undefined)

export function StatsProvider({ children }: { children: ReactNode }) {
  const { user, userProfile } = useAuth()
  const [stats, setStats] = useState<UserStats>({
    phrasesViewed: 0,
    exercisesCompleted: 0,
    aiMessagesCount: 0,
    premiumSinceDate: null
  })
  const [isLoaded, setIsLoaded] = useState(false)

  console.log('🔄 StatsProvider renderizado - stats atuais:', stats)

  // Carregar estatísticas do banco
  const loadStats = async (userId: string) => {
    try {
      console.log('📊 CONTEXT: Carregando estatísticas do banco para:', userId)
      
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle()

      if (error) {
        console.error('❌ CONTEXT: Erro ao carregar:', error)
        return
      }

      if (data) {
        console.log('✅ CONTEXT: Dados carregados:', data)
        const loadedStats: UserStats = {
          phrasesViewed: data.phrases_viewed || 0,
          exercisesCompleted: data.exercises_completed || 0,
          aiMessagesCount: data.ai_messages_count || 0,
          premiumSinceDate: data.premium_since_date || null
        }
        console.log('📋 CONTEXT: Aplicando estado:', loadedStats)
        setStats(loadedStats)
        setIsLoaded(true)
      } else {
        console.log('🆕 CONTEXT: Primeira vez - criando registro')
        await createInitialStats(userId)
      }
    } catch (error) {
      console.error('❌ CONTEXT: Erro geral:', error)
    }
  }

  // Criar registro inicial
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
        setIsLoaded(true)
      }
    } catch (error) {
      console.error('❌ CONTEXT: Erro ao criar inicial:', error)
    }
  }

  // Reset quando usuário muda
  useEffect(() => {
    if (!user?.id) {
      console.log('🔄 CONTEXT: Reset por logout')
      setIsLoaded(false)
      setStats({
        phrasesViewed: 0,
        exercisesCompleted: 0,
        aiMessagesCount: 0,
        premiumSinceDate: null
      })
    }
  }, [user?.id])

  // Carregar dados apenas uma vez por usuário
  useEffect(() => {
    if (!user?.id || isLoaded) return
    console.log('🚀 CONTEXT: Iniciando carregamento para:', user.id)
    loadStats(user.id)
  }, [user?.id, isLoaded])

  const incrementPhrasesViewed = async () => {
    if (!user?.id) return
    
    try {
      console.log('🔥 CONTEXT: Incrementando frases - atual:', stats.phrasesViewed)
      
      // Atualizar estado local imediatamente
      const newStats = { ...stats, phrasesViewed: stats.phrasesViewed + 1 }
      setStats(newStats)
      console.log('📈 CONTEXT: Estado atualizado para:', newStats.phrasesViewed)
      
      // Salvar no banco
      const { error } = await supabase.rpc('increment_phrases_viewed', {
        p_user_id: user.id
      })
      
      if (error) {
        console.error('❌ CONTEXT: Erro ao salvar:', error)
        setStats(stats) // Reverter
      } else {
        console.log('✅ CONTEXT: Salvo no banco')
      }
    } catch (error) {
      console.error('❌ CONTEXT: Erro geral:', error)
      setStats(stats) // Reverter
    }
  }

  const incrementExercisesCompleted = async () => {
    if (!user?.id) return
    
    try {
      console.log('🎯 CONTEXT: Incrementando exercícios - atual:', stats.exercisesCompleted)
      
      const newStats = { ...stats, exercisesCompleted: stats.exercisesCompleted + 1 }
      setStats(newStats)
      console.log('📈 CONTEXT: Estado atualizado para:', newStats.exercisesCompleted)
      
      const { error } = await supabase.rpc('increment_exercises_completed', {
        p_user_id: user.id
      })
      
      if (error) {
        console.error('❌ CONTEXT: Erro ao salvar:', error)
        setStats(stats)
      } else {
        console.log('✅ CONTEXT: Salvo no banco')
      }
    } catch (error) {
      console.error('❌ CONTEXT: Erro geral:', error)
      setStats(stats)
    }
  }

  const incrementAiMessages = async () => {
    if (!user?.id) return
    
    try {
      console.log('🤖 CONTEXT: Incrementando IA - atual:', stats.aiMessagesCount)
      
      const newStats = { ...stats, aiMessagesCount: stats.aiMessagesCount + 1 }
      setStats(newStats)
      console.log('📈 CONTEXT: Estado atualizado para:', newStats.aiMessagesCount)
      
      const { error } = await supabase.rpc('increment_ai_messages', {
        p_user_id: user.id
      })
      
      if (error) {
        console.error('❌ CONTEXT: Erro ao salvar:', error)
        setStats(stats)
      } else {
        console.log('✅ CONTEXT: Salvo no banco')
      }
    } catch (error) {
      console.error('❌ CONTEXT: Erro geral:', error)
      setStats(stats)
    }
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
    const displayDays = diffDays + 1
    
    if (displayDays === 1) {
      return '1 dia'
    } else {
      return `${displayDays} dias`
    }
  }

  const value = {
    stats,
    incrementPhrasesViewed,
    incrementExercisesCompleted,
    incrementAiMessages,
    getTotalPhrasesPracticed,
    getPremiumTimeFormatted
  }

  return (
    <StatsContext.Provider value={value}>
      {children}
    </StatsContext.Provider>
  )
}

export function useStats() {
  const context = useContext(StatsContext)
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsProvider')
  }
  return context
}