-- Funções alternativas usando UPDATE direto para garantir que funcionem

-- Remover funções atuais
DROP FUNCTION IF EXISTS increment_phrases_viewed(uuid);
DROP FUNCTION IF EXISTS increment_exercises_completed(uuid);
DROP FUNCTION IF EXISTS increment_ai_messages(uuid);

-- Função para incrementar frases (versão simplificada)
CREATE OR REPLACE FUNCTION increment_phrases_viewed(p_user_id UUID)
RETURNS TABLE(phrases_viewed INTEGER, exercises_completed INTEGER, ai_messages_count INTEGER) AS $$
BEGIN
  -- Primeiro garantir que existe um registro
  INSERT INTO user_stats (user_id, phrases_viewed, exercises_completed, ai_messages_count)
  VALUES (p_user_id, 0, 0, 0)
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Depois fazer o UPDATE
  UPDATE user_stats 
  SET phrases_viewed = user_stats.phrases_viewed + 1,
      updated_at = NOW()
  WHERE user_id = p_user_id;
  
  -- Retornar os valores atuais
  RETURN QUERY
  SELECT us.phrases_viewed, us.exercises_completed, us.ai_messages_count
  FROM user_stats us
  WHERE us.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para incrementar exercícios (versão simplificada)
CREATE OR REPLACE FUNCTION increment_exercises_completed(p_user_id UUID)
RETURNS TABLE(phrases_viewed INTEGER, exercises_completed INTEGER, ai_messages_count INTEGER) AS $$
BEGIN
  -- Primeiro garantir que existe um registro
  INSERT INTO user_stats (user_id, phrases_viewed, exercises_completed, ai_messages_count)
  VALUES (p_user_id, 0, 0, 0)
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Depois fazer o UPDATE
  UPDATE user_stats 
  SET exercises_completed = user_stats.exercises_completed + 1,
      updated_at = NOW()
  WHERE user_id = p_user_id;
  
  -- Retornar os valores atuais
  RETURN QUERY
  SELECT us.phrases_viewed, us.exercises_completed, us.ai_messages_count
  FROM user_stats us
  WHERE us.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para incrementar mensagens IA (versão simplificada)
CREATE OR REPLACE FUNCTION increment_ai_messages(p_user_id UUID)
RETURNS TABLE(phrases_viewed INTEGER, exercises_completed INTEGER, ai_messages_count INTEGER) AS $$
BEGIN
  -- Primeiro garantir que existe um registro
  INSERT INTO user_stats (user_id, phrases_viewed, exercises_completed, ai_messages_count)
  VALUES (p_user_id, 0, 0, 0)
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Depois fazer o UPDATE
  UPDATE user_stats 
  SET ai_messages_count = user_stats.ai_messages_count + 1,
      updated_at = NOW()
  WHERE user_id = p_user_id;
  
  -- Retornar os valores atuais
  RETURN QUERY
  SELECT us.phrases_viewed, us.exercises_completed, us.ai_messages_count
  FROM user_stats us
  WHERE us.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;