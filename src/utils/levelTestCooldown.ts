export interface LevelTestCooldownStatus {
  canRetake: boolean
  isBlocked: boolean
  timeRemaining: string
  lastTestDate: string | null
  nextAvailableDate: string | null
}

const COOLDOWN_DAYS = 14
const COOLDOWN_MS = COOLDOWN_DAYS * 24 * 60 * 60 * 1000

export function checkLevelTestCooldown(userId: string): LevelTestCooldownStatus {
  const testResult = localStorage.getItem(`level_test_${userId}`)
  
  if (!testResult) {
    // Usuário nunca fez o teste
    return {
      canRetake: true,
      isBlocked: false,
      timeRemaining: '',
      lastTestDate: null,
      nextAvailableDate: null
    }
  }

  try {
    const result = JSON.parse(testResult)
    const lastTestDate = new Date(result.completedAt)
    const now = new Date()
    const timeDiff = now.getTime() - lastTestDate.getTime()
    
    if (timeDiff >= COOLDOWN_MS) {
      // Cooldown expirou, pode refazer
      return {
        canRetake: true,
        isBlocked: false,
        timeRemaining: '',
        lastTestDate: lastTestDate.toISOString(),
        nextAvailableDate: null
      }
    } else {
      // Ainda no período de cooldown
      const remainingMs = COOLDOWN_MS - timeDiff
      const nextAvailableDate = new Date(lastTestDate.getTime() + COOLDOWN_MS)
      
      return {
        canRetake: false,
        isBlocked: true,
        timeRemaining: formatTimeRemaining(remainingMs),
        lastTestDate: lastTestDate.toISOString(),
        nextAvailableDate: nextAvailableDate.toISOString()
      }
    }
  } catch (error) {
    console.error('Erro ao verificar cooldown do teste:', error)
    // Em caso de erro, permitir o teste
    return {
      canRetake: true,
      isBlocked: false,
      timeRemaining: '',
      lastTestDate: null,
      nextAvailableDate: null
    }
  }
}

function formatTimeRemaining(remainingMs: number): string {
  const days = Math.floor(remainingMs / (24 * 60 * 60 * 1000))
  const hours = Math.floor((remainingMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  
  if (days > 0) {
    if (days === 1) {
      return `1 dia${hours > 0 ? ` e ${hours}h` : ''}`
    }
    return `${days} dias${hours > 0 ? ` e ${hours}h` : ''}`
  } else if (hours > 0) {
    return `${hours} hora${hours > 1 ? 's' : ''}`
  } else {
    const minutes = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000))
    return `${minutes} minuto${minutes > 1 ? 's' : ''}`
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}