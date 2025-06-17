'use client'

interface GlobalLimitMessageProps {
  type: 'phrases' | 'exercises'
  timeUntilReset: string | null
  onUpgradeClick: () => void
}

export default function GlobalLimitMessage({ type, timeUntilReset, onUpgradeClick }: GlobalLimitMessageProps) {
  const isPhrase = type === 'phrases'
  
  return (
    <div className="max-w-2xl mx-auto mb-6">
      <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/50 rounded-xl p-6 text-center">
        <div className="text-4xl mb-4">
          {isPhrase ? '📚' : '🎯'}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3">
          Limite {isPhrase ? 'de Frases' : 'de Exercícios'} Excedido!
        </h3>
        
        <p className="text-gray-300 mb-4">
          {isPhrase 
            ? 'Você já visualizou suas 10 frases gratuitas hoje. '
            : 'Você já completou seus 3 exercícios gratuitos hoje. '
          }
          {timeUntilReset 
            ? `Aguarde ${timeUntilReset} para ter acesso novamente ou faça upgrade!`
            : 'Faça upgrade para o plano Pro para acesso ilimitado!'
          }
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onUpgradeClick}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300"
          >
            ⚡ Upgrade para Pro
          </button>
          
          {timeUntilReset && (
            <div className="bg-gray-800/50 px-4 py-3 rounded-lg border border-gray-600">
              <span className="text-gray-300 text-sm">
                ⏰ Reset em: <span className="text-white font-semibold">{timeUntilReset}</span>
              </span>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-xs text-gray-400">
          💎 Plano Pro: Frases e exercícios ilimitados + Chat com IA + Áudios premium
        </div>
      </div>
    </div>
  )
}