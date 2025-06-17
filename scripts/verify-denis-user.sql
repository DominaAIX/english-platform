-- Script para verificar se o usuário Denis foi criado corretamente
-- Execute este script no SQL Editor do Supabase para verificar

SELECT 
    'AUTH USERS' as table_name,
    u.id,
    u.email,
    u.email_confirmed_at,
    u.created_at,
    u.raw_user_meta_data->>'name' as name,
    u.raw_user_meta_data->>'picture' as picture
FROM auth.users u 
WHERE u.email = 'denis_esteban@icloud.com'

UNION ALL

SELECT 
    'USER PROFILES' as table_name,
    up.id,
    up.email,
    up.plan::text as email_confirmed_at,
    up.subscription_ends_at as created_at,
    up.name,
    up.image_url as picture
FROM public.user_profiles up 
WHERE up.email = 'denis_esteban@icloud.com'

UNION ALL

SELECT 
    'USER STATS' as table_name,
    us.user_id as id,
    us.phrases_viewed::text as email,
    us.exercises_completed::text as email_confirmed_at,
    us.premium_since_date as created_at,
    us.ai_messages_count::text as name,
    us.updated_at::text as picture
FROM public.user_stats us 
JOIN auth.users u ON u.id = us.user_id
WHERE u.email = 'denis_esteban@icloud.com'

UNION ALL

SELECT 
    'IDENTITIES' as table_name,
    i.user_id as id,
    i.email,
    i.provider as email_confirmed_at,
    i.created_at,
    i.identity_data->>'name' as name,
    i.identity_data->>'picture' as picture
FROM auth.identities i 
WHERE i.email = 'denis_esteban@icloud.com';

-- Contar total de registros
SELECT 
    'RESUMO' as info,
    COUNT(CASE WHEN table_name = 'auth.users' THEN 1 END) as auth_users,
    COUNT(CASE WHEN table_name = 'public.user_profiles' THEN 1 END) as user_profiles,
    COUNT(CASE WHEN table_name = 'public.user_stats' THEN 1 END) as user_stats,
    COUNT(CASE WHEN table_name = 'auth.identities' THEN 1 END) as identities
FROM (
    SELECT 'auth.users' as table_name FROM auth.users WHERE email = 'denis_esteban@icloud.com'
    UNION ALL
    SELECT 'public.user_profiles' FROM public.user_profiles WHERE email = 'denis_esteban@icloud.com'
    UNION ALL
    SELECT 'public.user_stats' FROM public.user_stats us JOIN auth.users u ON u.id = us.user_id WHERE u.email = 'denis_esteban@icloud.com'
    UNION ALL
    SELECT 'auth.identities' FROM auth.identities WHERE email = 'denis_esteban@icloud.com'
) as counts;