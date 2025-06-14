-- Script para criar usuários demo no Supabase
-- Execute no SQL Editor do Supabase

-- Inserir usuários demo na tabela auth.users
INSERT INTO auth.users (
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token
) VALUES 
-- Usuário Free Demo
(
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'demo@free.com',
  crypt('123456', gen_salt('bf')),
  NOW(),
  '{"name": "Demo Free"}',
  NOW(),
  NOW(),
  '',
  ''
),
-- Usuário Premium Demo  
(
  gen_random_uuid(),
  'authenticated', 
  'authenticated',
  'demo@premium.com',
  crypt('123456', gen_salt('bf')),
  NOW(),
  '{"name": "Demo Premium"}',
  NOW(),
  NOW(),
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Atualizar perfil do usuário premium para ter plano premium
UPDATE user_profiles 
SET plan = 'premium', 
    subscription_ends_at = NOW() + INTERVAL '1 year'
WHERE email = 'demo@premium.com';

-- Verificar se os usuários foram criados
SELECT email, raw_user_meta_data->>'name' as name FROM auth.users 
WHERE email IN ('demo@free.com', 'demo@premium.com');

-- Verificar perfis criados
SELECT email, name, plan FROM user_profiles 
WHERE email IN ('demo@free.com', 'demo@premium.com');