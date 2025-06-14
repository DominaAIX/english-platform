-- Verificar se as contas demo existem e seu status
SELECT 
  email,
  email_confirmed_at,
  raw_user_meta_data->>'name' as name,
  created_at,
  last_sign_in_at,
  banned_until
FROM auth.users 
WHERE email IN ('demo@free.com', 'demo@premium.com')
ORDER BY email;

-- Se não houver resultados, as contas não foram criadas corretamente