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

  // Função para buscar perfil do usuário - versão corrigida
  const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
    try {
      console.log('Buscando perfil para userId:', userId)
      
      const user = await supabase.auth.getUser()
      const userEmail = user.data.user?.email
      
      // Usuários premium conhecidos - forçar premium
      if (userEmail === 'denis_esteban@icloud.com' || userEmail === 'teste@premium.com') {
        const premiumProfile: UserProfile = {
          id: userId,
          email: userEmail,
          plan: 'premium' as const,
          created_at: new Date().toISOString()
        }
        console.log('✅ Perfil PREMIUM forçado para:', userEmail, premiumProfile)
        return premiumProfile
      }
      
      // Tentar buscar do banco para outros usuários
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', userId)
          .single()
        
        if (!error && data) {
          console.log('✅ Perfil encontrado no banco:', data)
          return {
            id: data.id,
            email: data.email,
            plan: data.plan as 'free' | 'premium',
            created_at: data.created_at
          }
        }
      } catch (dbError) {
        console.log('⚠️ Erro ao buscar no banco, usando padrão:', dbError)
      }
      
      // Perfil padrão se não encontrar
      const defaultProfile: UserProfile = {
        id: userId,
        email: userEmail || 'user@example.com',
        plan: 'free' as const,
        created_at: new Date().toISOString()
      }
      console.log('📝 Perfil padrão criado:', defaultProfile)
      return defaultProfile
    } catch (error) {
      console.error('❌ Erro geral ao buscar perfil:', error)
      
      // Perfil de emergência
      const fallbackProfile: UserProfile = {
        id: userId,
        email: 'fallback@example.com',
        plan: 'free' as const,
        created_at: new Date().toISOString()
      }
      console.log('🆘 Perfil fallback:', fallbackProfile)
      return fallbackProfile
    }
  }

  useEffect(() => {
    // Detectar se está em ambiente local (localhost) vs staging/produção
    const isLocalhost = typeof window !== 'undefined' && 
                       (window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1')
    const isLocalDev = process.env.NEXT_PUBLIC_IS_LOCAL_DEV === 'true' && isLocalhost
    
    const initializeAuth = async () => {
      try {
        console.log('Inicializando auth context...', { isLocalDev, hostname: typeof window !== 'undefined' ? window.location.hostname : 'server' })
        
        if (isLocalDev) {
          // Apenas em desenvolvimento local (localhost), não conectar com Supabase
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