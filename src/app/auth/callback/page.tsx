'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function AuthCallbackPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const checkUserLevelTest = (userId: string): boolean => {
    const testResult = localStorage.getItem(`level_test_${userId}`)
    const userLevel = localStorage.getItem(`user_level_${userId}`)
    return !!(testResult && userLevel)
  }

  useEffect(() => {
    if (loading) return

    if (user) {
      // Verificar se o usuário já fez o teste de nível
      const hasCompletedTest = checkUserLevelTest(user.id)
      
      if (hasCompletedTest) {
        router.push('/dashboard')
      } else {
        router.push('/teste-nivel')
      }
    } else {
      // Se não tem usuário após o callback, redirecionar para home
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Finalizando login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecionando...</p>
      </div>
    </div>
  )
}