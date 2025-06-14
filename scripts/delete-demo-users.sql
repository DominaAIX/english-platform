-- Deletar contas demo problemáticas
DELETE FROM auth.users WHERE email IN ('demo@free.com', 'demo@premium.com');

-- Verificar se foram deletadas
SELECT email FROM auth.users WHERE email IN ('demo@free.com', 'demo@premium.com');