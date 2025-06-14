-- Confirmar automaticamente os emails das contas demo
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email IN ('demo@free.com', 'demo@premium.com') 
AND email_confirmed_at IS NULL;

-- Verificar se foram confirmados
SELECT 
  email, 
  email_confirmed_at,
  created_at,
  raw_user_meta_data->>'name' as name
FROM auth.users 
WHERE email IN ('demo@free.com', 'demo@premium.com');