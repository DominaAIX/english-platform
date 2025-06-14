-- Resetar senhas das contas demo com criptografia correta
-- Execute no SQL Editor do Supabase

-- Atualizar senha da conta demo free
UPDATE auth.users 
SET 
  encrypted_password = crypt('123456', gen_salt('bf')),
  updated_at = NOW()
WHERE email = 'demo@free.com';

-- Atualizar senha da conta demo premium  
UPDATE auth.users 
SET 
  encrypted_password = crypt('123456', gen_salt('bf')),
  updated_at = NOW()
WHERE email = 'demo@premium.com';

-- Verificar se foram atualizadas
SELECT 
  email, 
  email_confirmed_at,
  updated_at,
  raw_user_meta_data->>'name' as name
FROM auth.users 
WHERE email IN ('demo@free.com', 'demo@premium.com');