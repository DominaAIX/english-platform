# Database Setup - User Stats

## Problema Identificado
O progresso dos usuários estava sendo perdido porque as estatísticas eram salvas apenas no `localStorage` do navegador. Isso causava perda de dados quando:
- Usuário fazia logout/login
- Acessava de outro dispositivo
- Limpava cache do navegador

## Solução Implementada
Migração do `localStorage` para banco de dados Supabase para persistência real dos dados.

## Tabela Necessária
Execute o SQL abaixo no painel do Supabase:

```sql
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

-- Configurar RLS (Row Level Security)
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Users can view their own stats" ON user_stats
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" ON user_stats
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats" ON user_stats
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stats" ON user_stats
    FOR DELETE USING (auth.uid() = user_id);
```

## Como Executar
1. Acesse o painel do Supabase
2. Vá em "SQL Editor"
3. Cole o código SQL acima
4. Execute

## Funcionalidades
- ✅ Persistência real no banco de dados
- ✅ Segurança com RLS (Row Level Security)
- ✅ Estatísticas preservadas entre sessões
- ✅ Acesso multi-dispositivo
- ✅ Backup automático