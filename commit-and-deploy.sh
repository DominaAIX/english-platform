#!/bin/bash

# Script completo para commit + deploy staging + produção

if [ -z "$1" ]; then
    echo "❌ Erro: Forneça uma mensagem de commit"
    echo "Uso: ./commit-and-deploy.sh \"sua mensagem de commit\""
    exit 1
fi

COMMIT_MSG="$1"

echo "📝 Fazendo commit das mudanças..."
git add .
git commit -m "$COMMIT_MSG

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo "🚀 Deploy para STAGING..."
git checkout staging
git merge main
git push origin staging

echo "🚀 Deploy para PRODUÇÃO..."
git checkout main
git push origin main

echo "✅ Deploy completo realizado!"
echo "📍 Staging e Produção atualizados"