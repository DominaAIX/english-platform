'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface UserProfile {
  id: string
  email: string
  plan: 'free' | 'premium'
  created_at: string
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  session: null,
  loading: true,
  signOut: async () => {}
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // Função para buscar perfil do usuário - versão simplificada
  const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
    try {
      console.log('Criando perfil local para userId:', userId)
      
      // Criar perfil local por enquanto
      const defaultProfile: UserProfile = {
        id: userId,
        email: 'user@example.com',
        plan: 'free' as const,
        created_at: new Date().toISOString()
      }
      console.log('Perfil local criado:', defaultProfile)
      return defaultProfile
    } catch (error) {
      console.error('Erro ao criar perfil:', error)
      
      // Perfil de emergência
      const fallbackProfile: UserProfile = {
        id: userId,
        email: 'fallback@example.com',
        plan: 'free' as const,
        created_at: new Date().toISOString()
      }
      console.log('Perfil fallback:', fallbackProfile)
      return fallbackProfile
    }
  }

  useEffect(() => {
    // Detectar se está em ambiente local
    const isLocalDev = process.env.NEXT_PUBLIC_IS_LOCAL_DEV === 'true'
    
    const initializeAuth = async () => {
      try {
        console.log('Inicializando auth context...', { isLocalDev })
        
        if (isLocalDev) {
          // Em desenvolvimento local, não conectar com Supabase
          console.log('Modo desenvolvimento local - auth desabilitado')
          setSession(null)
          setUser(null)
          setUserProfile(null)
          setLoading(false)
          return
        }
        
        // Em produção, usar Supabase normalmente
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id)
          setUserProfile(profile)
        } else {
          setUserProfile(null)
        }
        
        setLoading(false)
        
        // Listen for auth changes apenas em produção
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            
            if (session?.user) {
              const profile = await fetchUserProfile(session.user.id)
              setUserProfile(profile)
            } else {
              setUserProfile(null)
            }
            
            setLoading(false)
          }
        )

        return () => subscription.unsubscribe()
        
      } catch (error) {
        console.error('Erro ao inicializar auth:', error)
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const value = {
    user,
    userProfile,
    session,
    loading,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}