// Utilitário para gerenciar cooldown de certificação

export const getCertificationCooldownKey = (userId: string) => `certification_cooldown_${userId}`

export const setCertificationCooldown = (userId: string) => {
  const cooldownEnd = new Date().getTime() + (48 * 60 * 60 * 1000) // 48 horas
  localStorage.setItem(getCertificationCooldownKey(userId), cooldownEnd.toString())
}

export const checkCertificationCooldown = (userId: string): { isBlocked: boolean, timeRemaining?: string } => {
  const cooldownEnd = localStorage.getItem(getCertificationCooldownKey(userId))
  if (!cooldownEnd) return { isBlocked: false }
  
  const now = new Date().getTime()
  const endTime = parseInt(cooldownEnd)
  
  if (now < endTime) {
    const timeLeft = endTime - now
    const hours = Math.floor(timeLeft / (1000 * 60 * 60))
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    return { 
      isBlocked: true, 
      timeRemaining: `${hours}h ${minutes}min` 
    }
  } else {
    localStorage.removeItem(getCertificationCooldownKey(userId))
    return { isBlocked: false }
  }
}

export const clearCertificationCooldown = (userId: string) => {
  localStorage.removeItem(getCertificationCooldownKey(userId))
}