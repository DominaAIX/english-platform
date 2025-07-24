'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LevelTestRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para o dashboard já que teste de nível foi removido
    router.replace('/dashboard')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecionando...</p>
      </div>
    </div>
  )
}