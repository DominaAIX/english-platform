'use client'

export interface FreeLimitationStatus {
  isBlocked: boolean
  phrasesUsed: number
  maxPhrases: number
  timeRemaining: string
  canAccess: boolean
}

export interface DailyUsage {
  date: string
  phrasesUsed: number
  lastUsedAt: number
}

const MAX_FREE_PHRASES = 5
const COOLDOWN_HOURS = 24

export function getFreeUsageStatus(userId: string): FreeLimitationStatus {
  if (!userId) {
    return {
      isBlocked: false,
      phrasesUsed: 0,
      maxPhrases: MAX_FREE_PHRASES,
      timeRemaining: '',
      canAccess: false
    }
  }

  const storageKey = `free_usage_${userId}`
  const stored = localStorage.getItem(storageKey)
  
  const today = new Date().toDateString()
  const now = Date.now()
  
  let usage: DailyUsage = {
    date: today,
    phrasesUsed: 0,
    lastUsedAt: now
  }

  if (stored) {
    try {
      const parsedUsage = JSON.parse(stored)
      
      // Se é o mesmo dia, usar dados existentes
      if (parsedUsage.date === today) {
        usage = parsedUsage
      }
      // Se é um dia diferente, verificar se ainda está em cooldown
      else {
        const hoursSinceLastUse = (now - parsedUsage.lastUsedAt) / (1000 * 60 * 60)
        
        // Se passou do cooldown, resetar
        if (hoursSinceLastUse >= COOLDOWN_HOURS) {
          usage = {
            date: today,
            phrasesUsed: 0,
            lastUsedAt: now
          }
        } else {
          // Ainda em cooldown, manter dados antigos
          usage = parsedUsage
        }
      }
    } catch (error) {
      console.error('Error parsing free usage data:', error)
    }
  }

  const isBlocked = usage.phrasesUsed >= MAX_FREE_PHRASES
  let timeRemaining = ''

  if (isBlocked) {
    const hoursSinceLastUse = (now - usage.lastUsedAt) / (1000 * 60 * 60)
    const hoursRemaining = Math.max(0, COOLDOWN_HOURS - hoursSinceLastUse)
    
    if (hoursRemaining > 0) {
      const hours = Math.floor(hoursRemaining)
      const minutes = Math.floor((hoursRemaining - hours) * 60)
      
      if (hours > 0) {
        timeRemaining = `${hours}h ${minutes}m`
      } else {
        timeRemaining = `${minutes}m`
      }
    }
  }

  return {
    isBlocked: isBlocked && timeRemaining !== '',
    phrasesUsed: usage.phrasesUsed,
    maxPhrases: MAX_FREE_PHRASES,
    timeRemaining,
    canAccess: !isBlocked || timeRemaining === ''
  }
}

export function incrementFreeUsage(userId: string): FreeLimitationStatus {
  if (!userId) {
    return getFreeUsageStatus(userId)
  }

  const storageKey = `free_usage_${userId}`
  const current = getFreeUsageStatus(userId)
  
  // Se ainda não atingiu o limite, incrementar
  if (current.phrasesUsed < MAX_FREE_PHRASES) {
    const newUsage: DailyUsage = {
      date: new Date().toDateString(),
      phrasesUsed: current.phrasesUsed + 1,
      lastUsedAt: Date.now()
    }
    
    localStorage.setItem(storageKey, JSON.stringify(newUsage))
  }
  
  return getFreeUsageStatus(userId)
}

export function resetFreeUsage(userId: string): void {
  if (!userId) return
  
  const storageKey = `free_usage_${userId}`
  localStorage.removeItem(storageKey)
}

export function canAccessContent(userId: string, userPlan: string): boolean {
  if (userPlan === 'premium') return true
  
  const status = getFreeUsageStatus(userId)
  return status.canAccess
}

export function formatTimeRemaining(timeRemaining: string): string {
  if (!timeRemaining) return ''
  
  return `Próximo acesso em: ${timeRemaining}`
}