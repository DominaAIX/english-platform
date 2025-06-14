-- Script para configurar sistema de planos de usuário

-- 1. Adicionar coluna 'plan' na tabela auth.users se não existir
ALTER TABLE auth.users 
ADD COLUMN IF NOT EXISTS plan text DEFAULT 'free' CHECK (plan IN ('free', 'premium'));

-- 2. Criar uma tabela users personalizada se não existir (para armazenar dados adicionais)
CREATE TABLE IF NOT EXISTS public.users (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  email text NOT NULL,
  plan text DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 3. Habilitar RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 4. Criar política para que usuários só vejam seus próprios dados
CREATE POLICY IF NOT EXISTS "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- 5. Função para sincronizar users com auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, plan)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'plan', 'free'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Trigger para criar perfil automaticamente quando user se registra
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Inserir usuários existentes na tabela users se não existirem
INSERT INTO public.users (id, email, plan)
SELECT id, email, COALESCE(raw_user_meta_data->>'plan', 'free')
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users);

-- 8. Comentário para próximos passos
-- Para criar usuários de teste, execute os seguintes comandos no Supabase SQL Editor:
-- 
-- USUÁRIO FREE:
-- INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, phone_confirmed_at, confirmation_token, recovery_token, email_change_token_new, email_change, confirmation_sent_at, recovery_sent_at, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
-- VALUES ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'user.free@test.com', crypt('123456', gen_salt('bf')), now(), null, '', '', '', '', now(), null, null, null, '{"provider": "email", "providers": ["email"]}', '{"plan": "free"}', false, now(), now(), null, '', '', null, '', 0, null, '', null);
--
-- USUÁRIO PREMIUM:
-- INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, phone_confirmed_at, confirmation_token, recovery_token, email_change_token_new, email_change, confirmation_sent_at, recovery_sent_at, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
-- VALUES ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'user.premium@test.com', crypt('123456', gen_salt('bf')), now(), null, '', '', '', '', now(), null, null, null, '{"provider": "email", "providers": ["email"]}', '{"plan": "premium"}', false, now(), now(), null, '', '', null, '', 0, null, '', null);