# 🚀 Fluxo de Deploy - English Platform

## Ambientes

### 🌍 **Produção** 
- **Branch:** `main`
- **URL:** https://your-prod-domain.com
- **Deploy:** Automático quando há push para `main`

### 🔧 **Homologação/Staging**
- **Branch:** `staging` 
- **URL:** https://your-staging-url.vercel.app
- **Deploy:** Automático quando há push para `staging`
- **Objetivo:** Validar alterações antes de enviar para produção

## Fluxo de Trabalho

### 1. Desenvolvimento Local
```bash
# Trabalhar na branch staging
git checkout staging

# Fazer alterações
# ... editar código ...

# Commit e push
git add .
git commit -m "feat: sua alteração"
git push origin staging
```

### 2. Validação em Staging
1. **Deploy automático** acontece no Vercel quando você faz push para `staging`
2. **Testar** todas as funcionalidades no ambiente de staging
3. **Validar** que tudo está funcionando como esperado

### 3. Deploy para Produção
```bash
# Quando tudo estiver OK no staging, fazer merge para main
git checkout main
git merge staging
git push origin main
```

## Configuração no Vercel

### Variáveis de Ambiente

#### Staging
- `NEXT_PUBLIC_IS_STAGING=true`
- Mesmas variáveis de produção para Supabase
- URL de staging para NEXTAUTH_URL

#### Produção  
- `NEXT_PUBLIC_IS_STAGING=false` (ou não definir)
- Variáveis de produção normais

### Branch Settings
- **Production Branch:** `main`
- **Preview Branches:** `staging` (e outras se necessário)

## Comandos Úteis

```bash
# Ver status das branches
git branch -a

# Alternar para staging
git checkout staging

# Alternar para main
git checkout main

# Ver diferenças entre staging e main
git diff main..staging
erro
# Fazer merge de staging para main
git checkout main
git merge staging
```

## Indicadores Visuais

### Staging
- Banner laranja no topo: "🔧 AMBIENTE DE HOMOLOGAÇÃO"
- Permite identificar facilmente que está em staging

### Produção
- Sem banner
- Interface limpa para usuários finais

## Rollback

Se algo der errado em produção:

```bash
# Reverter último commit
git revert HEAD
git push origin main

# Ou voltar para commit específico
git reset --hard <commit-hash>
git push --force origin main
```

## Checklist de Deploy

### ✅ Antes de Fazer Merge para Main
- [ ] Todas as funcionalidades testadas em staging
- [ ] Sem erros no console do navegador
- [ ] Responsividade funcionando
- [ ] Performance adequada
- [ ] Supabase funcionando corretamente
- [ ] Autenticação funcionando
- [ ] APIs respondendo

### ✅ Após Deploy em Produção
- [ ] Site carregando normalmente
- [ ] Funcionalidades principais funcionando
- [ ] Monitorar por alguns minutos
- [ ] Verificar logs do Vercel se necessário