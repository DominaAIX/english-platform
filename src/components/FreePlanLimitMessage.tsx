'use client'

interface FreePlanLimitMessageProps {
  timeUntilReset: string | null
  onUpgradeClick: () => void
}

export default function FreePlanLimitMessage({ timeUntilReset, onUpgradeClick }: FreePlanLimitMessageProps) {
  return (
    <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-2 border-orange-500/50 rounded-2xl p-6 mx-4 mb-4">
      <div className="text-center">
        <div className="text-4xl mb-4">⏱️</div>
        <h3 className="text-xl font-bold text-white mb-3">
          Limite de conversas excedido para conta gratuita
        </h3>
        <p className="text-gray-300 mb-4">
          Você utilizou suas 3 mensagens gratuitas diárias. 
          {timeUntilReset && (
            <> Tente novamente em <span className="font-semibold text-orange-400">{timeUntilReset}</span>.</>
          )}
        </p>
        
        <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
          <h4 className="text-white font-semibold mb-2">🚀 Quer continuar praticando?</h4>
          <p className="text-gray-400 text-sm mb-3">
            Com o plano Pro você tem acesso ilimitado ao tutor AI, todas as trilhas desbloqueadas e muito mais!
          </p>
          <div className="flex flex-wrap gap-2 justify-center text-xs">
            <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded">✨ Conversas Ilimitadas</span>
            <span className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">🎯 Todas as Trilhas</span>
            <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded">📊 Relatórios Detalhados</span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onUpgradeClick}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-3 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            🚀 Fazer Upgrade para Pro
          </button>
        </div>
        
        <p className="text-gray-500 text-xs mt-3">
          Ou aguarde {timeUntilReset || '24h'} para usar novamente
        </p>
      </div>
    </div>
  )
}