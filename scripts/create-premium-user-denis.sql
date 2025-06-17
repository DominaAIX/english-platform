-- Script para criar usuário premium Denis Esteban
-- Execute este script no SQL Editor do Supabase

-- Primeiro, criar o usuário na tabela auth.users
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmed_at,
  raw_user_meta_data,
  raw_app_meta_data
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated', 
  'denis_esteban@icloud.com',
  crypt('senha123!@#', gen_salt('bf')), -- Senha: senha123!@#
  now(),
  now(),
  now(),
  now(),
  '{"name": "Denis Esteban", "picture": "https://avatar.vercel.sh/denis_esteban", "email": "denis_esteban@icloud.com"}',
  '{"provider": "email", "providers": ["email"]}'
) ON CONFLICT (email) DO NOTHING;

-- Pegar o ID do usuário criado
DO $$
DECLARE
    user_uuid uuid;
BEGIN
    SELECT id INTO user_uuid FROM auth.users WHERE email = 'denis_esteban@icloud.com';
    
    -- Criar perfil na tabela public.user_profiles com plano premium
    INSERT INTO public.user_profiles (
        id,
        email,
        name,
        image_url,
        plan,
        subscription_ends_at,
        created_at,
        updated_at
    ) VALUES (
        user_uuid,
        'denis_esteban@icloud.com',
        'Denis Esteban',
        'https://avatar.vercel.sh/denis_esteban',
        'premium',
        '2025-12-31 23:59:59+00', -- Premium válido até final de 2025
        now(),
        now()
    ) ON CONFLICT (email) DO UPDATE SET
        plan = 'premium',
        subscription_ends_at = '2025-12-31 23:59:59+00',
        updated_at = now();
    
    -- Criar estatísticas iniciais
    INSERT INTO public.user_stats (
        user_id,
        phrases_viewed,
        exercises_completed,
        ai_messages_count,
        premium_since_date,
        created_at,
        updated_at
    ) VALUES (
        user_uuid,
        0,
        0,
        0,
        now(), -- Premium desde agora
        now(),
        now()
    ) ON CONFLICT (user_id) DO UPDATE SET
        premium_since_date = now(),
        updated_at = now();
    
    -- Criar identidade na tabela auth.identities para login via email
    INSERT INTO auth.identities (
        provider_id,
        user_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at,
        email
    ) VALUES (
        user_uuid::text,
        user_uuid,
        jsonb_build_object(
            'sub', user_uuid::text,
            'email', 'denis_esteban@icloud.com',
            'name', 'Denis Esteban',
            'picture', 'https://avatar.vercel.sh/denis_esteban',
            'email_verified', true,
            'phone_verified', false
        ),
        'email',
        now(),
        now(),
        now(),
        'denis_esteban@icloud.com'
    ) ON CONFLICT (provider_id, provider) DO NOTHING;
    
    RAISE NOTICE 'Usuário premium Denis Esteban criado com sucesso!';
    RAISE NOTICE 'Email: denis_esteban@icloud.com';
    RAISE NOTICE 'Senha: senha123!@#';
    RAISE NOTICE 'Plano: premium (válido até 31/12/2025)';
    RAISE NOTICE 'User ID: %', user_uuid;
END $$;