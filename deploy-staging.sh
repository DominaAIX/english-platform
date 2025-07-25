#!/bin/bash

echo "🚀 Fazendo deploy para STAGING..."

# Mudar para staging
git checkout staging

# Fazer merge da main
git merge main

# Push para staging (deploy automático)
git push origin staging

echo "✅ Deploy para staging concluído!"
echo "🔗 Verifique o deploy no Vercel"