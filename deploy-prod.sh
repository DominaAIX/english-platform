#!/bin/bash

echo "🚀 Fazendo deploy para PRODUÇÃO..."

# Mudar para main
git checkout main

# Fazer merge da staging (se necessário)
git merge staging

# Push para produção (deploy automático)
git push origin main

echo "✅ Deploy para produção concluído!"
echo "🔗 Site em produção atualizado"