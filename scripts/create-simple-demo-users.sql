-- Criar contas demo simples que funcionam sem confirmação de email
-- Execute no SQL Editor do Supabase

-- Deletar contas existentes se houver
DELETE FROM auth.users WHERE email IN ('demo@free.com', 'demo@premium.com');

-- Criar conta demo free
INSERT INTO auth.users (
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token
) VALUES (
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'demo@free.com',
  crypt('123456', gen_salt('bf')),
  NOW(), -- Confirma email imediatamente
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Demo Free"}',
  NOW(),
  NOW(),
  '',
  ''
);

-- Criar conta demo premium
INSERT INTO auth.users (
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token
) VALUES (
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'demo@premium.com',
  crypt('123456', gen_salt('bf')),
  NOW(), -- Confirma email imediatamente
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Demo Premium"}',
  NOW(),
  NOW(),
  '',
  ''
);

-- Verificar se foram criadas
SELECT email, email_confirmed_at FROM auth.users 
WHERE email IN ('demo@free.com', 'demo@premium.com');