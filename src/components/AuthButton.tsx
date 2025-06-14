'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import AuthModal from './AuthModal'

export default function AuthButton() {
  const { user, loading, signOut } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleOpenModal = () => {
    console.log('🔥 AuthButton handleOpenModal called!')
    setShowAuthModal(true)
  }

  if (loading) {
    return (
      <div className="bg-gray-800 hover:bg-gray-700 px-3 py-2 md:px-6 md:py-3 rounded-full text-white font-semibold border border-gray-600 animate-pulse text-sm md:text-base">
        Carregando...
      </div>
    )
  }

  if (user) {
    const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'Usuário'
    
    return (
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white text-xs md:text-sm font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="text-white text-xs md:text-sm hidden sm:inline">
            Olá, {userName.split(' ')[0]}!
          </span>
        </div>
        <button
          onClick={signOut}
          className="bg-gray-800 hover:bg-gray-700 px-3 py-2 md:px-6 md:py-3 rounded-full text-white font-semibold border border-gray-600 transition-all duration-300 text-sm md:text-base"
        >
          Sair
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={handleOpenModal}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-3 py-2 md:px-6 md:py-3 rounded-full text-white font-semibold transition-all duration-300 text-sm md:text-base shadow-lg hover:shadow-xl cursor-pointer z-[9999] relative"
          style={{ cursor: 'pointer', zIndex: 9999, position: 'relative' }}
        >
          <span className="hidden sm:inline">Entrar / Cadastrar</span>
          <span className="sm:hidden">Entrar</span>
        </button>
        
        {/* Botão Demo temporário */}
        <button
          onClick={() => {
            window.location.href = '/dashboard'
          }}
          className="bg-gray-700 hover:bg-gray-600 px-3 py-2 md:px-6 md:py-3 rounded-full text-white font-semibold transition-all duration-300 text-sm md:text-base border border-gray-600"
        >
          Demo
        </button>
      </div>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  )
}