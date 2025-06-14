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

  // Função para buscar perfil do usuário
  const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
    try {
      console.log('Buscando perfil para userId:', userId)
      
      // Adicionar timeout para evitar travamento
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout na busca do perfil')), 5000)
      })
      
      const searchPromise = supabase
        .from('users')
        .select('id, email, plan, created_at')
        .eq('id', userId)
        .single()
      
      const { data, error } = await Promise.race([searchPromise, timeoutPromise]) as any
      
      console.log('Resultado da busca:', { data, error })
      
      if (error) {
        console.error('Erro ao buscar perfil do usuário:', error)
        console.log('Criando perfil padrão...')
        
        // Buscar email do auth
        const { data: authUser } = await supabase.auth.getUser()
        const email = authUser.user?.email || ''
        
        // Determinar plano baseado no email
        const plan = email === 'estebdenis@gmail.com' ? 'premium' : 'free'
        
        const defaultProfile: UserProfile = {
          id: userId,
          email: email,
          plan: plan as 'free' | 'premium',
          created_at: new Date().toISOString()
        }
        console.log('Perfil padrão criado:', defaultProfile)
        return defaultProfile
      }
      
      console.log('Perfil encontrado:', data)
      return data as UserProfile
    } catch (error) {
      console.error('Erro ao buscar perfil:', error)
      
      // Perfil de emergência
      const fallbackProfile: UserProfile = {
        id: userId,
        email: '',
        plan: 'free' as const,
        created_at: new Date().toISOString()
      }
      console.log('Perfil fallback:', fallbackProfile)
      return fallbackProfile
    }
  }

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
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
    }

    getSession()

    // Listen for auth changes
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