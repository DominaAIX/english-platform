-- Criar tabela para favoritos persistentes

CREATE TABLE IF NOT EXISTS public.favorites (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  trail_slug text NOT NULL,
  phrase_index integer NOT NULL,
  phrase_english text NOT NULL,
  phrase_portuguese text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  
  -- Evitar duplicatas
  UNIQUE(user_id, trail_slug, phrase_index)
);

-- Habilitar RLS
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Política: usuários só veem seus próprios favoritos
CREATE POLICY "Users can view own favorites" ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);

-- Política: usuários só podem inserir seus próprios favoritos  
CREATE POLICY "Users can insert own favorites" ON public.favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política: usuários só podem deletar seus próprios favoritos
CREATE POLICY "Users can delete own favorites" ON public.favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_favorites_user_trail ON public.favorites(user_id, trail_slug);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);