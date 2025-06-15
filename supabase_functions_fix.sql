-- Corrigir funções SQL para resolver ambiguidade de user_id

-- Função para incrementar frases visualizadas (corrigida)
CREATE OR REPLACE FUNCTION increment_phrases_viewed(p_user_id UUID)
RETURNS void AS $$
BEGIN
  INSERT INTO user_stats (user_id, phrases_viewed, exercises_completed, ai_messages_count)
  VALUES (p_user_id, 1, 0, 0)
  ON CONFLICT (user_id)
  DO UPDATE SET 
    phrases_viewed = user_stats.phrases_viewed + 1,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para incrementar exercícios completados (corrigida)
CREATE OR REPLACE FUNCTION increment_exercises_completed(p_user_id UUID)
RETURNS void AS $$
BEGIN
  INSERT INTO user_stats (user_id, phrases_viewed, exercises_completed, ai_messages_count)
  VALUES (p_user_id, 0, 1, 0)
  ON CONFLICT (user_id)
  DO UPDATE SET 
    exercises_completed = user_stats.exercises_completed + 1,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para incrementar mensagens IA (corrigida)
CREATE OR REPLACE FUNCTION increment_ai_messages(p_user_id UUID)
RETURNS void AS $$
BEGIN
  INSERT INTO user_stats (user_id, phrases_viewed, exercises_completed, ai_messages_count)
  VALUES (p_user_id, 0, 0, 1)
  ON CONFLICT (user_id)
  DO UPDATE SET 
    ai_messages_count = user_stats.ai_messages_count + 1,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;