'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export function useRequiredLevelTest() {
  const { user, userProfile } = useAuth()
  const router = useRouter()
  const [hasCompletedTest, setHasCompletedTest] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setIsLoading(false)
      return
    }

    // AGORA TODOS OS USUÁRIOS (FREE E PREMIUM) PRECISAM FAZER O TESTE
    // Verificar se já fez o teste de nível
    const testResult = localStorage.getItem(`level_test_${user.id}`)
    const userLevel = localStorage.getItem(`user_level_${user.id}`)
    
    console.log('🔍 Verificando teste para user:', user.id)
    console.log('📋 Test result:', !!testResult, 'User level:', !!userLevel)
    
    if (testResult && userLevel) {
      console.log('✅ Usuário já fez o teste')
      setHasCompletedTest(true)
    } else {
      console.log('❌ Usuário precisa fazer o teste')
      setHasCompletedTest(false)
    }
    
    setIsLoading(false)
  }, [user, userProfile])

  const redirectToLevelTest = () => {
    router.push('/teste-nivel')
  }

  const shouldBlockAccess = (currentPath: string): boolean => {
    // Não bloquear se não está logado ou se está carregando
    if (!user || isLoading) return false
    
    // Não bloquear se já completou o teste
    if (hasCompletedTest) return false

    // Permitir acesso ao teste de nível e páginas básicas
    const allowedPaths = [
      '/teste-nivel',
      '/dashboard', // Permitir dashboard mas com conteúdo limitado
      '/',
      '/api'
    ]
    
    // Verificar se o path atual é permitido
    const isPathAllowed = allowedPaths.some(path => currentPath.startsWith(path))
    
    return !isPathAllowed
  }

  return {
    hasCompletedTest,
    isLoading,
    shouldBlockAccess,
    redirectToLevelTest,
    needsLevelTest: user && !hasCompletedTest // Agora todos os usuários precisam do teste
  }
}