-- Script simplificado para criar usuários de teste

-- 1. Primeiro, execute este comando para criar a tabela users se não existir:
CREATE TABLE IF NOT EXISTS public.users (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  email text NOT NULL,
  plan text DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 2. Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 3. Criar políticas
CREATE POLICY IF NOT EXISTS "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- 4. Verificar se existem usuários
SELECT email FROM auth.users WHERE email IN ('user.free@test.com', 'user.premium@test.com');