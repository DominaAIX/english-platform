-- Criar tabela user_stats para persistir estatísticas dos usuários
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  phrases_viewed INTEGER DEFAULT 0 NOT NULL,
  exercises_completed INTEGER DEFAULT 0 NOT NULL,
  ai_messages_count INTEGER DEFAULT 0 NOT NULL,
  premium_since_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Garantir que cada usuário tenha apenas um registro
  UNIQUE(user_id)
);

-- Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);

-- Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar trigger para atualizar updated_at
CREATE TRIGGER update_user_stats_updated_at 
    BEFORE UPDATE ON user_stats 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Configurar RLS (Row Level Security)
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Política para usuários autenticados lerem apenas seus próprios dados
CREATE POLICY "Users can view their own stats" ON user_stats
    FOR SELECT USING (auth.uid() = user_id);

-- Política para usuários autenticados atualizarem apenas seus próprios dados
CREATE POLICY "Users can update their own stats" ON user_stats
    FOR UPDATE USING (auth.uid() = user_id);

-- Política para usuários autenticados inserirem seus próprios dados
CREATE POLICY "Users can insert their own stats" ON user_stats
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política para usuários autenticados deletarem apenas seus próprios dados
CREATE POLICY "Users can delete their own stats" ON user_stats
    FOR DELETE USING (auth.uid() = user_id);