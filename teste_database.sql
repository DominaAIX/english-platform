-- Verificar se os dados estão sendo salvos corretamente
-- Execute este comando no painel SQL do Supabase

-- Ver todos os registros de estatísticas
SELECT 
  user_id,
  phrases_viewed,
  exercises_completed, 
  ai_messages_count,
  created_at,
  updated_at
FROM user_stats
ORDER BY updated_at DESC;

-- Verificar se as funções estão funcionando
-- (Substitua 'SEU_USER_ID_AQUI' pelo seu ID real do usuário)
-- SELECT increment_phrases_viewed('SEU_USER_ID_AQUI');