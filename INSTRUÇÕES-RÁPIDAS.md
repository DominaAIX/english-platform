# 🚀 Instruções Rápidas - Criar Usuários de Teste

## Problema: "invalid login credentials"
Os usuários de teste não existem ainda. Vamos criá-los:

## ✅ Solução Rápida:

### 1. Ir ao Supabase Dashboard
1. Abra [supabase.com](https://supabase.com)
2. Faça login na sua conta
3. Selecione seu projeto

### 2. Criar Usuários Manualmente
1. Vá em **Authentication** > **Users**
2. Clique em **"Add User"**
3. Crie o primeiro usuário:
   - **Email:** `user.free@test.com`
   - **Password:** `123456`
   - **Auto Confirm User:** ✅ (marque)
   - Clique **Add User**

4. Crie o segundo usuário:
   - **Email:** `user.premium@test.com`  
   - **Password:** `123456`
   - **Auto Confirm User:** ✅ (marque)
   - Clique **Add User**

### 3. Configurar Tabela Users
1. Vá em **SQL Editor**
2. Cole e execute este comando:
```sql
-- Criar tabela users
CREATE TABLE IF NOT EXISTS public.users (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  email text NOT NULL,
  plan text DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  created_at timestamp with time zone DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Política para usuários verem próprios dados
CREATE POLICY IF NOT EXISTS "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);
```

### 4. Adicionar Usuários na Tabela
```sql
-- Inserir usuários criados na tabela
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
```

### 5. Verificar Criação
```sql
SELECT email, plan FROM public.users;
```

## 🎮 Agora Teste:

1. **Login como FREE:** `user.free@test.com` / `123456`
   - Verá só 10 frases
   - Exercícios bloqueados
   - Sem filtros de nível

2. **Login como PREMIUM:** `user.premium@test.com` / `123456`  
   - Todas as frases
   - Exercícios liberados
   - Filtros funcionando

**Depois de criar, teste fazer login! 🎉**