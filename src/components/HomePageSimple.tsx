'use client'

export default function HomePageSimple() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-8">
            Inglês pra Já
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Teste simples - Se você está vendo isso, o servidor está funcionando!
          </p>
          <button 
            className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full text-white font-bold text-lg"
            onClick={() => alert('Botão funcionando!')}
          >
            Teste
          </button>
        </div>
      </div>
    </div>
  )
}