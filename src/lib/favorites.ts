import { supabase } from './supabase'

interface Favorite {
  id: string
  user_id: string
  trail_slug: string
  phrase_index: number
  phrase_english: string
  phrase_portuguese: string
  created_at: string
}

interface FavoriteInput {
  trail_slug: string
  phrase_index: number
  phrase_english: string
  phrase_portuguese: string
}

// Buscar favoritos do usuário para uma trilha específica
export async function getUserFavorites(userId: string, trailSlug: string): Promise<number[]> {
  try {
    console.log('🔍 FAVORITOS: Buscando favoritos', { userId: userId.substring(0, 8), trailSlug })
    
    // Verificar se o usuário está autenticado no Supabase
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    console.log('🔐 FAVORITOS: Sessão atual:', { 
      sessionExists: !!session, 
      userId: session?.user?.id?.substring(0, 8),
      sessionError 
    })
    
    const { data, error } = await supabase
      .from('favorites')
      .select('phrase_index')
      .eq('user_id', userId)
      .eq('trail_slug', trailSlug)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('❌ FAVORITOS: Erro ao buscar favoritos:', error)
      console.error('❌ FAVORITOS: Detalhes do erro:', { 
        message: error.message, 
        details: error.details, 
        hint: error.hint,
        code: error.code 
      })
      return []
    }

    console.log('✅ FAVORITOS: Dados encontrados:', data)
    return data?.map(fav => fav.phrase_index) || []
  } catch (error) {
    console.error('❌ FAVORITOS: Erro geral ao buscar favoritos:', error)
    return []
  }
}

// Adicionar frase aos favoritos
export async function addToFavorites(userId: string, favorite: FavoriteInput): Promise<boolean> {
  try {
    console.log('➕ FAVORITOS: Adicionando favorito', { 
      userId: userId.substring(0, 8), 
      trailSlug: favorite.trail_slug, 
      phraseIndex: favorite.phrase_index 
    })
    
    // Verificar sessão antes de inserir
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    console.log('🔐 FAVORITOS: Sessão ao adicionar:', { 
      sessionExists: !!session, 
      userId: session?.user?.id?.substring(0, 8),
      sessionError 
    })
    
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        user_id: userId,
        trail_slug: favorite.trail_slug,
        phrase_index: favorite.phrase_index,
        phrase_english: favorite.phrase_english,
        phrase_portuguese: favorite.phrase_portuguese
      })
      .select()

    if (error) {
      console.error('❌ FAVORITOS: Erro ao adicionar favorito:', error)
      console.error('❌ FAVORITOS: Detalhes do erro:', { 
        message: error.message, 
        details: error.details, 
        hint: error.hint,
        code: error.code 
      })
      return false
    }

    console.log('✅ FAVORITOS: Favorito adicionado com sucesso:', data)
    return true
  } catch (error) {
    console.error('❌ FAVORITOS: Erro geral ao adicionar favorito:', error)
    return false
  }
}

// Remover frase dos favoritos
export async function removeFromFavorites(userId: string, trailSlug: string, phraseIndex: number): Promise<boolean> {
  try {
    console.log('➖ FAVORITOS: Removendo favorito', { 
      userId: userId.substring(0, 8), 
      trailSlug, 
      phraseIndex 
    })
    
    const { data, error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('trail_slug', trailSlug)
      .eq('phrase_index', phraseIndex)
      .select()

    if (error) {
      console.error('❌ FAVORITOS: Erro ao remover favorito:', error)
      return false
    }

    console.log('✅ FAVORITOS: Favorito removido com sucesso:', data)
    return true
  } catch (error) {
    console.error('❌ FAVORITOS: Erro geral ao remover favorito:', error)
    return false
  }
}

// Buscar todos os favoritos do usuário com detalhes completos
export async function getAllUserFavorites(userId: string, trailSlug?: string): Promise<Favorite[]> {
  try {
    let query = supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (trailSlug) {
      query = query.eq('trail_slug', trailSlug)
    }

    const { data, error } = await query

    if (error) {
      console.error('Erro ao buscar favoritos detalhados:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Erro ao buscar favoritos detalhados:', error)
    return []
  }
}