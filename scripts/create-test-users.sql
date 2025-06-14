-- Script para criar usuários de teste com planos diferentes

-- IMPORTANTE: Execute primeiro o script setup-user-plans.sql

-- 1. Criar usuário FREE de teste
-- Email: user.free@test.com
-- Senha: 123456

-- 2. Criar usuário PREMIUM de teste  
-- Email: user.premium@test.com
-- Senha: 123456

-- Para criar os usuários, você precisa:
-- 1. Ir ao Supabase Dashboard > Authentication > Users
-- 2. Clicar em "Add user"
-- 3. Criar manualmente os usuários com os emails acima
-- 4. Depois executar os comandos abaixo para definir os planos:

-- Definir usuário free:
UPDATE public.users 
SET plan = 'free' 
WHERE email = 'user.free@test.com';

-- Definir usuário premium:
UPDATE public.users 
SET plan = 'premium' 
WHERE email = 'user.premium@test.com';

-- Verificar os usuários criados:
SELECT email, plan, created_at 
FROM public.users 
WHERE email IN ('user.free@test.com', 'user.premium@test.com');