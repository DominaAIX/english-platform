-- Script para confirmar automaticamente os emails das contas demo
-- Execute este script no SQL Editor do Supabase

-- Confirmar email da conta demo free
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'demo@free.com' AND email_confirmed_at IS NULL;

-- Confirmar email da conta demo premium
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'demo@premium.com' AND email_confirmed_at IS NULL;

-- Verificar se os emails foram confirmados
SELECT 
  email, 
  email_confirmed_at,
  raw_user_meta_data->>'name' as name
FROM auth.users 
WHERE email IN ('demo@free.com', 'demo@premium.com');