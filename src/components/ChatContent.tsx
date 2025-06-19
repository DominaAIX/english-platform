'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from './Logo'
import { useAuth } from '@/contexts/AuthContext'
import { useGlobalLimits } from '@/hooks/useGlobalLimits'
import { useStats } from '@/contexts/StatsContext'
import FreePlanLimitMessage from './FreePlanLimitMessage'
import PageTransition from './PageTransition'
import { PronunciationIcon, GrammarIcon, ConversationIcon, SendIcon } from './ModernIcons'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatContent() {
  const { user } = useAuth()
  const router = useRouter()
  const {
    totalAiMessages,
    isAiMessagesBlocked, 
    getRealTimeCountdown,
    isPremium,
    incrementAiMessages: incrementAiLimit,
    getRemainingAiMessages
  } = useGlobalLimits()
  
  // Limites específicos para AI Chat (independente das frases das trilhas)
  const messageCount = totalAiMessages
  const isBlocked = isAiMessagesBlocked && !isPremium
  const remainingMessages = getRemainingAiMessages()
  const timeUntilReset = getRealTimeCountdown()
  const incrementMessageCount = incrementAiLimit
  const { incrementAiMessages } = useStats()
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '🇬🇧🇺🇸 Hello! I\'m your English tutor AI. I\'m here to help you practice conversation, correct your grammar, and improve your fluency. What would you like to practice today?\n\n\nOlá! Sou sua IA tutora de inglês. Estou aqui para ajudá-lo a praticar conversação, corrigir sua gramática e melhorar sua fluência. O que você gostaria de praticar hoje?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)


  const scenarios = [
    { id: 'work', title: 'Trabalho', icon: '🏢', description: 'Conversas do dia a dia no escritório' },
    { id: 'interview', title: 'Entrevista de Emprego', icon: '💼', description: 'Pratique entrevistas em inglês' },
    { id: 'travel', title: 'Viagens', icon: '✈️', description: 'Situações de viagem e turismo' },
    { id: 'business', title: 'Reunião de Negócios', icon: '🤝', description: 'Conversas profissionais' },
    { id: 'casual', title: 'Conversa Casual', icon: '☕', description: 'Conversas do dia a dia' },
    { id: 'restaurant', title: 'Restaurante', icon: '🍽️', description: 'Pedidos e conversas em restaurantes' },
    { id: 'shopping', title: 'Compras', icon: '🛒', description: 'Situações de compras e negociação' }
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleUpgrade = () => {
    // Por enquanto, apenas mostrar um alerta
    // Futuramente será redirecionado para página de upgrade
    alert('Funcionalidade de upgrade será implementada em breve! 🚀')
  }

  const handleLogoClick = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    // Verificar limitações para usuários gratuitos
    if (isBlocked) {
      return // Não permitir envio se estiver bloqueado
    }

    // Verificar se pode enviar mensagem (incrementa contador)
    const canSend = incrementMessageCount()
    if (!canSend) {
      // Limite atingido, adicionar mensagem do sistema
      const limitMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Limite de conversas excedido para conta gratuita. Tente novamente em 24 horas ou faça upgrade para o plano Pro para conversas ilimitadas! 🚀',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, limitMessage])
      setInputMessage('')
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    
    // Incrementar contador de mensagens para IA
    await incrementAiMessages()

    try {
      // Preparar histórico da conversa para a API
      const conversationHistory = messages.slice(1).map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversationHistory,
          scenario: selectedScenario
        })
      })

      if (!response.ok) {
        throw new Error('Falha na requisição')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || data.message || "Desculpe, não consegui gerar uma resposta. Tente novamente.",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('❌ Erro ao enviar mensagem:', error)
      
      // Fallback em caso de erro
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Could you please try again?",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const startScenario = (scenario: any) => {
    setSelectedScenario(scenario.id)
    
    let contextMessage = ""
    
    switch(scenario.id) {
      case 'work':
        contextMessage = "Perfeito! Vamos praticar inglês do escritório. Eu serei seu colega de trabalho e vamos simular conversas reais do dia a dia no escritório.\n\nVocê gostaria que eu responda apenas em inglês ou prefere que eu inclua a tradução em português para te ajudar?"
        break
      case 'interview':
        contextMessage = "Excelente! Eu serei o entrevistador e você será o candidato. Vamos praticar uma entrevista de emprego real em inglês.\n\nVocê gostaria que eu responda apenas em inglês ou prefere que eu inclua a tradução em português para te ajudar?"
        break
      case 'travel':
        contextMessage = "Ótima escolha! Eu posso ser um recepcionista de hotel, funcionário do aeroporto ou guia turístico. Vamos praticar situações reais de viagem.\n\nVocê gostaria que eu responda apenas em inglês ou prefere que eu inclua a tradução em português para te ajudar?"
        break
      case 'business':
        contextMessage = "Perfeito! Vamos praticar reuniões de negócios. Eu serei seu parceiro de negócios ou cliente e simularemos situações corporativas.\n\nVocê gostaria que eu responda apenas em inglês ou prefere que eu inclua a tradução em português para te ajudar?"
        break
      case 'casual':
        contextMessage = "Legal! Vamos ter uma conversa casual. Eu serei seu amigo ou conhecido e praticaremos conversas informais do dia a dia.\n\nVocê gostaria que eu responda apenas em inglês ou prefere que eu inclua a tradução em português para te ajudar?"
        break
      case 'restaurant':
        contextMessage = "Ótimo! Eu serei o garçom/garçonete e você será o cliente. Vamos praticar situações reais de restaurante.\n\nVocê gostaria que eu responda apenas em inglês ou prefere que eu inclua a tradução em português para te ajudar?"
        break
      case 'shopping':
        contextMessage = "Perfeito! Eu serei o vendedor e você será o cliente. Vamos praticar situações de compras e negociação.\n\nVocê gostaria que eu responda apenas em inglês ou prefere que eu inclua a tradução em português para te ajudar?"
        break
      default:
        contextMessage = `Ótima escolha! Vamos praticar "${scenario.title}".\n\nVocê gostaria que eu responda apenas em inglês ou prefere que eu inclua a tradução em português para te ajudar?`
    }
    
    const scenarioMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: contextMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, scenarioMessage])
  }

  const speakMessage = async (text: string, messageId: string) => {
    // Verificar se usuário excedeu limite para áudio
    if (isBlocked) {
      // Mostrar mensagem de limite excedido
      const limitAudioMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: '🔊 Limite de áudio excedido para conta gratuita. Para ouvir as mensagens, você precisa aguardar 24 horas ou fazer upgrade para o plano Pro! ⏰',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, limitAudioMessage])
      return
    }

    try {
      setPlayingAudio(messageId)

      // Chamar API TTS da OpenAI
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
      })

      if (!response.ok) {
        throw new Error('Falha ao gerar áudio')
      }

      // Converter resposta para blob de áudio
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      
      // Criar e reproduzir áudio
      const audio = new Audio(audioUrl)
      
      audio.onended = () => {
        setPlayingAudio(null)
        URL.revokeObjectURL(audioUrl)
      }
      
      audio.onerror = () => {
        setPlayingAudio(null)
        URL.revokeObjectURL(audioUrl)
      }

      await audio.play()

    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error)
      setPlayingAudio(null)
      
      // Fallback para Web Speech API
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'en-US'
        utterance.rate = 0.9
        speechSynthesis.speak(utterance)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <PageTransition delay={0}>
        <header className="bg-gray-900/50 border-b border-gray-700 p-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Logo size="sm" />
            <span className="text-white font-bold">Inglês pra Já</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400">
              🤖 Tutor AI
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </div>
      </header>
      </PageTransition>

      <div className="flex-1 flex max-w-4xl mx-auto w-full">
        {/* Sidebar com cenários */}
        <PageTransition delay={200}>
          <div className="w-80 bg-gray-900/30 border-r border-gray-700 p-4 hidden lg:block">
          <h3 className="text-lg font-bold text-white mb-4">Cenários de Prática</h3>
          <div className="space-y-2">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => startScenario(scenario)}
                className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                  selectedScenario === scenario.id
                    ? 'bg-purple-600/30 border border-purple-400/50'
                    : 'bg-gray-800/30 hover:bg-gray-700/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{scenario.icon}</span>
                  <div>
                    <div className="text-white font-medium text-sm">{scenario.title}</div>
                    <div className="text-gray-400 text-xs">{scenario.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-xl">
            <h4 className="text-white font-semibold mb-2">💡 Dicas</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Seja natural e relaxado</li>
              <li>• Não tenha medo de errar</li>
              <li>• Peça correções quando precisar</li>
              <li>• Use frases completas</li>
            </ul>
          </div>
          </div>
        </PageTransition>

        {/* Chat Area */}
        <PageTransition delay={400}>
          <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                    : 'bg-gray-800/50 text-gray-100 border border-gray-700'
                }`}>
                  <div className="flex items-start gap-3">
                    {message.role === 'assistant' && (
                      <div className="text-2xl">🤖</div>
                    )}
                    <div className="flex-1">
                      <p className="leading-relaxed whitespace-pre-line">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className={`text-xs ${
                          message.role === 'user' ? 'text-purple-100' : 'text-gray-400'
                        }`}>
                          {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {message.role === 'assistant' && (
                          <button
                            onClick={() => speakMessage(message.content, message.id)}
                            disabled={playingAudio === message.id || isBlocked}
                            className={`p-2 rounded-full transition-colors text-sm ${
                              playingAudio === message.id 
                                ? 'bg-green-600 animate-pulse cursor-not-allowed' 
                                : isBlocked
                                ? 'bg-gray-600 opacity-50 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                            title={
                              playingAudio === message.id 
                                ? "Reproduzindo..." 
                                : isBlocked 
                                ? "Limite de áudio excedido - Aguarde 24h ou faça upgrade" 
                                : "Ouvir com voz IA"
                            }
                          >
                            {playingAudio === message.id ? '🎵' : isBlocked ? '🔇' : '🔊'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🤖</div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Mensagem de limite excedido */}
          {isBlocked && (
            <FreePlanLimitMessage 
              timeUntilReset={timeUntilReset} 
              onUpgradeClick={handleUpgrade}
            />
          )}

          {/* Input Area */}
          <div className="border-t border-gray-700 p-4 bg-gray-900/30">
            {/* Indicador de mensagens restantes para usuários gratuitos */}
            {!isBlocked && remainingMessages > 0 && remainingMessages < 3 && (
              <div className="mb-3 text-center">
                <div className="inline-flex items-center gap-2 bg-yellow-900/30 border border-yellow-500/50 rounded-lg px-3 py-2">
                  <span className="text-yellow-400 text-sm">
                    ⚡ {remainingMessages} mensagem{remainingMessages !== 1 ? 's' : ''} restante{remainingMessages !== 1 ? 's' : ''} no plano gratuito
                  </span>
                  <button
                    onClick={handleUpgrade}
                    className="text-xs bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded text-white transition-colors"
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex gap-3">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isBlocked ? "Limite de mensagens excedido. Faça upgrade ou aguarde 24h..." : "Digite sua mensagem em inglês ou português..."}
                className={`flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500 transition-colors ${isBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                rows={3}
                style={{ minHeight: '80px', maxHeight: '200px' }}
                disabled={isBlocked}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading || isBlocked}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <span>Enviar</span>
                <SendIcon size={18} className="text-white" />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => setInputMessage("Can you help me practice pronunciation?")}
                className="bg-gray-700/50 hover:bg-gray-600/60 backdrop-blur-sm border border-gray-600/30 px-3 py-1 rounded-full text-sm text-gray-300 transition-all duration-300 flex items-center gap-2"
              >
                <PronunciationIcon size={16} className="text-purple-400" />
                Pronúncia
              </button>
              <button
                onClick={() => setInputMessage("I need help with grammar")}
                className="bg-gray-700/50 hover:bg-gray-600/60 backdrop-blur-sm border border-gray-600/30 px-3 py-1 rounded-full text-sm text-gray-300 transition-all duration-300 flex items-center gap-2"
              >
                <GrammarIcon size={16} className="text-cyan-400" />
                Gramática
              </button>
              <button
                onClick={() => setInputMessage("Can we practice a conversation?")}
                className="bg-gray-700/50 hover:bg-gray-600/60 backdrop-blur-sm border border-gray-600/30 px-3 py-1 rounded-full text-sm text-gray-300 transition-all duration-300 flex items-center gap-2"
              >
                <ConversationIcon size={16} className="text-green-400" />
                Conversação
              </button>
            </div>
            </div>
        </div>
        </PageTransition>
      </div>
    </div>
  )
}