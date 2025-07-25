'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface FreePlanData {
  messageCount: number
  lastMessageTime: string | null
  cooldownUntil: string | null
}

export function useFreePlanLimits() {
  const { user, userProfile } = useAuth()
  const [messageCount, setMessageCount] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [timeUntilReset, setTimeUntilReset] = useState<number | null>(null)

  const FREE_MESSAGE_LIMIT = 3
  const COOLDOWN_HOURS = 24

  // Verificar se usuário é premium - VERIFICAÇÃO DUPLA
  const isKnownPremiumEmail = userProfile?.email === 'user.premium@test.com' || userProfile?.email === 'denis_esteban@icloud.com'
  const isPremium = userProfile?.plan === 'premium' || isKnownPremiumEmail
  
  console.log('🔍 useFreePlanLimits - Email:', userProfile?.email)
  console.log('🔍 useFreePlanLimits - Plan:', userProfile?.plan)
  console.log('🔍 useFreePlanLimits - É known premium?', isKnownPremiumEmail)
  console.log('🔍 useFreePlanLimits - É premium final?', isPremium)

  // Chave única para cada usuário no localStorage
  const getStorageKey = () => user?.id ? `free_plan_limits_${user.id}` : null

  useEffect(() => {
    if (!user) return

    // Usuários premium não têm limitações
    if (isPremium) {
      setMessageCount(0)
      setIsBlocked(false)
      setTimeUntilReset(null)
      return
    }

    const storageKey = getStorageKey()
    if (!storageKey) return

    // Carregar dados do localStorage
    const savedData = localStorage.getItem(storageKey)
    if (savedData) {
      try {
        const data: FreePlanData = JSON.parse(savedData)
        
        // Verificar se o cooldown expirou
        if (data.cooldownUntil) {
          const cooldownTime = new Date(data.cooldownUntil).getTime()
          const now = Date.now()
          
          if (now >= cooldownTime) {
            // Cooldown expirou, resetar contador
            resetMessageCount()
          } else {
            // Ainda em cooldown
            setMessageCount(data.messageCount)
            setIsBlocked(true)
            setTimeUntilReset(cooldownTime - now)
          }
        } else {
          setMessageCount(data.messageCount)
          setIsBlocked(data.messageCount >= FREE_MESSAGE_LIMIT)
        }
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error)
      }
    }
  }, [user, isPremium])

  // Timer para atualizar o tempo restante
  useEffect(() => {
    if (!timeUntilReset || timeUntilReset <= 0) return

    const interval = setInterval(() => {
      setTimeUntilReset(prev => {
        if (!prev || prev <= 1000) {
          // Cooldown terminou
          resetMessageCount()
          return null
        }
        return prev - 1000
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeUntilReset])

  const saveToStorage = (data: FreePlanData) => {
    const storageKey = getStorageKey()
    if (!storageKey) return

    localStorage.setItem(storageKey, JSON.stringify(data))
  }

  const incrementMessageCount = () => {
    if (!user) return false

    // Usuários premium não têm limitações
    if (isPremium) return true

    const newCount = messageCount + 1
    setMessageCount(newCount)

    if (newCount >= FREE_MESSAGE_LIMIT) {
      // Atingiu o limite, iniciar cooldown
      const cooldownUntil = new Date(Date.now() + COOLDOWN_HOURS * 60 * 60 * 1000)
      
      setIsBlocked(true)
      setTimeUntilReset(COOLDOWN_HOURS * 60 * 60 * 1000)

      saveToStorage({
        messageCount: newCount,
        lastMessageTime: new Date().toISOString(),
        cooldownUntil: cooldownUntil.toISOString()
      })

      return false // Bloquear envio
    } else {
      saveToStorage({
        messageCount: newCount,
        lastMessageTime: new Date().toISOString(),
        cooldownUntil: null
      })

      return true // Permitir envio
    }
  }

  const resetMessageCount = () => {
    setMessageCount(0)
    setIsBlocked(false)
    setTimeUntilReset(null)

    const storageKey = getStorageKey()
    if (storageKey) {
      localStorage.removeItem(storageKey)
    }
  }

  const getRemainingMessages = () => {
    return Math.max(0, FREE_MESSAGE_LIMIT - messageCount)
  }

  const getTimeUntilResetFormatted = () => {
    if (!timeUntilReset) return null

    const hours = Math.floor(timeUntilReset / (1000 * 60 * 60))
    const minutes = Math.floor((timeUntilReset % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${hours}h ${minutes}m`
  }

  return {
    messageCount,
    isBlocked,
    remainingMessages: getRemainingMessages(),
    timeUntilReset: getTimeUntilResetFormatted(),
    incrementMessageCount,
    resetMessageCount,
    FREE_MESSAGE_LIMIT
  }
}