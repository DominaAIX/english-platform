-- Script para corrigir usuário premium teste@premium.com

-- 1. Verificar se o usuário existe na tabela auth.users
SELECT id, email FROM auth.users WHERE email = 'teste@premium.com';

-- 2. Se existir, atualizar ou inserir na tabela public.users como premium
INSERT INTO public.users (id, email, plan)
SELECT id, email, 'premium' 
FROM auth.users 
WHERE email = 'teste@premium.com'
ON CONFLICT (id) DO UPDATE SET plan = 'premium';

-- 3. Verificar se foi criado corretamente
SELECT email, plan FROM public.users WHERE email = 'teste@premium.com';

-- 4. Para garantir, também criar/atualizar user.premium@test.com
INSERT INTO public.users (id, email, plan)
SELECT id, email, 'premium' 
FROM auth.users 
WHERE email = 'user.premium@test.com'
ON CONFLICT (id) DO UPDATE SET plan = 'premium';

-- 5. Verificar todos os usuários premium
SELECT email, plan FROM public.users WHERE plan = 'premium';