-- Script corrigido para Supabase (sem IF NOT EXISTS em policies)

-- 1. Criar tabela users
CREATE TABLE IF NOT EXISTS public.users (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  email text NOT NULL,
  plan text DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  created_at timestamp with time zone DEFAULT now()
);

-- 2. Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 3. Remover política existente se houver (ignora erro se não existir)
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;

-- 4. Criar política nova
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- 5. Inserir usuários na tabela (após criar os usuários no dashboard)
INSERT INTO public.users (id, email, plan)
SELECT id, email, 'free' 
FROM auth.users 
WHERE email = 'user.free@test.com'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, plan)
SELECT id, email, 'premium' 
FROM auth.users 
WHERE email = 'user.premium@test.com'
ON CONFLICT (id) DO NOTHING;

-- 6. Verificar resultado
SELECT email, plan, created_at FROM public.users;