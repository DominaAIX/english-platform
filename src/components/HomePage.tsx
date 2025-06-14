'use client'

import TypingEffect from '@/components/TypingEffect'
import AuthButton from '@/components/AuthButton'
import AuthModal from '@/components/AuthModal'
import Logo from '@/components/Logo'
import PageTransition from '@/components/PageTransition'
import AnimatedContainer from '@/components/AnimatedContainer'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function HomePage() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isClosingMenu, setIsClosingMenu] = useState(false)
  const router = useRouter()
  const { user } = useAuth()

  const handleButtonClick = (route: string) => {
    if (user) {
      router.push(route)
    } else {
      setShowAuthModal(true)
    }
  }

  const handleCloseMenu = () => {
    setIsClosingMenu(true)
    setTimeout(() => {
      setShowMobileMenu(false)
      setIsClosingMenu(false)
    }, 300) // Duração da animação de saída
  }
  
  const typingPhrases = [
    "Let's grab a coffee?",
    "Can you send that file?",
    "Where's the nearest ATM?",
    "Double cheeseburger, please!",
    "How much is the ticket?",
    "See you at 7 p.m.!",
    "I'm swamped with work right now.",
    "Let's circle back on this tomorrow.",
    "Could you walk me through the process?"
  ]

  return (
    <>
      <style jsx>{`
        @keyframes slideDownFade {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUpFade {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
      `}</style>
      <AnimatedContainer className="min-h-screen">
      {/* Header */}
      <PageTransition delay={0}>
        <header className="relative z-[9999] p-3 md:p-6" style={{ pointerEvents: 'auto' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          {/* Logo - always on the left */}
          <div className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
            <Logo size="sm" className="md:w-8 md:h-8" />
            <span>Inglês pra Já</span>
          </div>

          {/* Desktop auth button */}
          <div className="hidden md:block">
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300"
            >
              Entrar / Cadastrar
            </button>
          </div>

          {/* Mobile hamburger menu - visible only on mobile, on the right */}
          <button 
            onClick={() => {
              if (showMobileMenu) {
                handleCloseMenu()
              } else {
                setShowMobileMenu(true)
              }
            }}
            className="md:hidden p-2 text-white hover:text-gray-300 transition-colors"
            aria-label="Menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${showMobileMenu ? 'rotate-45 translate-y-1.5' : 'mb-1'}`}></div>
              <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${showMobileMenu ? 'opacity-0' : 'mb-1'}`}></div>
              <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${showMobileMenu ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>

      </header>
      </PageTransition>

      {/* Slogan Principal - Desktop only */}
      <PageTransition delay={100}>
        <section className="py-2 px-4 hidden md:block">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white text-lg md:text-2xl font-medium leading-relaxed">
              Nada de <span className="text-red-400 line-through italic font-bold" style={{textShadow: '0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444'}}>"The book is on the table"</span>
              <br />
              Fale como nativo <span className="gradient-text font-bold">MAIS RÁPIDO</span> que você imagina
            </p>
          </div>
        </section>
      </PageTransition>

      {/* Hero Section */}
      <PageTransition delay={200}>
        <section className="relative min-h-screen flex items-start md:items-center justify-center px-4 pt-40 pb-16 md:py-2">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-3 lg:space-y-4">
            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-tight">
                Speak{' '}
                <span className="gradient-text">English</span>
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white">
                Like a Pro
              </h2>
            </div>

            {/* Typing Effect */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 backdrop-blur-sm" role="region" aria-label="Exemplo de frases que você aprenderá">
              <div className="text-gray-400 text-sm mb-2">Em poucos dias você vai falar coisas como:</div>
              <div className="text-xl lg:text-2xl font-medium text-white drop-shadow-lg" style={{color: '#ffffff', textShadow: '0 0 10px rgba(255,255,255,0.3)'}} aria-live="polite">
                <TypingEffect 
                  phrases={typingPhrases}
                  speed={80}
                  pauseDuration={1500}
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-8">
              <button 
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-lg font-medium transition-all duration-300 backdrop-blur-sm border bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border-purple-400/50 text-white shadow-lg shadow-purple-500/20 hover:scale-102 hover:shadow-xl hover:shadow-purple-500/30 group w-auto"
                aria-label="Iniciar o curso de inglês"
                onClick={() => handleButtonClick('/dashboard')}
              >
                <span className="group-hover:scale-110 inline-block transition-transform duration-200" aria-hidden="true">🚀</span> Quero Aprender
              </button>
              <button 
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-lg font-medium transition-all duration-300 backdrop-blur-sm border bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white hover:scale-102 w-auto"
                aria-label="Testar o tutor de inglês com inteligência artificial"
                onClick={() => handleButtonClick('/chat')}
              >
                Testar o Tutor AI
              </button>
            </div>

            {/* Slogan Mobile - Aparece após os botões */}
            <div className="block md:hidden pt-20 pb-8">
              <div className="max-w-md mx-auto text-center">
                <p className="text-white text-lg font-medium leading-relaxed">
                  Nada de <span className="text-red-400 line-through italic font-bold" style={{textShadow: '0 0 8px #ef4444, 0 0 16px #ef4444'}}>"The book is on the table"</span>
                  <br />
                  Fale como nativo <span className="gradient-text font-bold">MAIS RÁPIDO</span> que você imagina
                </p>
              </div>
            </div>

          </div>

          {/* Right Content - Chat Mockup - Hidden on mobile */}
          <div className="relative hidden lg:block">
            <div className="bg-gray-900/70 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-700">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">AI</span>
                </div>
                <div>
                  <div className="text-white font-semibold" style={{color: '#ffffff'}}>English Tutor</div>
                  <div className="text-gray-400 text-xs">GPT-4o em ação!</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-white/90 text-sm">
                    Hi! I want to practice ordering food at a restaurant.
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-lg p-3 border border-purple-500/30">
                  <div className="text-white text-sm" style={{color: '#ffffff'}}>
                    Perfect! Let&apos;s roleplay. I&apos;m the waiter. You just sat down at your table. 
                    <br /><br />
                    &quot;Good evening! Welcome to our restaurant. Can I start you with something to drink?&quot;
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-white/90 text-sm">
                    Good evening! I&apos;d like a glass of water and could I see the menu, please?
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Tutor is typing...
                </div>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute top-6 right-4 lg:right-48 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold float pulse-glow">
              ✨ Correção em tempo real
            </div>
            <div className="absolute bottom-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold float pulse-glow" style={{animationDelay: '1s'}}>
              🎯 Situações reais
            </div>
          </div>
        </div>
        </section>
      </PageTransition>

      {/* Platform Benefits - Hidden on mobile */}
      <PageTransition delay={400}>
        <section className="py-20 px-4 hidden lg:block">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">
              Tudo que a plataforma{' '}
              <span className="gradient-text">oferece</span>
            </h3>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Desperte sua vontade de dominar o inglês com as melhores ferramentas e conteúdo do mercado
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: '🤖', 
                title: 'Tutor IA Avançado', 
                desc: 'Conversas em tempo real com o melhor tutor de inglês IA do mercado, powered by GPT-4',
                highlight: 'Correção instantânea'
              },
              { 
                icon: '💬', 
                title: 'Mais de 2.000 Frases', 
                desc: 'Frases e expressões autênticas usadas no dia a dia por falantes nativos em situações reais',
                highlight: '100% autêntico'
              },
              { 
                icon: '🎯', 
                title: 'Trilhas Especializadas', 
                desc: 'Trabalho, viagens, mercado, eventos e muito mais - organize seu aprendizado por contexto',
                highlight: '6 trilhas completas'
              },
              { 
                icon: '🎧', 
                title: 'Áudios Profissionais', 
                desc: 'Pronúncia nativa com síntese de voz avançada para treinar seu listening e speaking',
                highlight: 'Voz nativa'
              },
              { 
                icon: '⭐', 
                title: 'Sistema de Favoritos', 
                desc: 'Salve suas frases preferidas e crie sua lista personalizada de estudos para revisão',
                highlight: 'Estudo personalizado'
              },
              { 
                icon: '🎮', 
                title: 'Exercícios Interativos', 
                desc: 'Drag & drop, múltipla escolha e muito mais para fixar o conteúdo de forma divertida',
                highlight: 'Aprendizado ativo'
              },
              { 
                icon: '📊', 
                title: 'Filtros por Níveis', 
                desc: 'Conteúdo organizado em básico, médio e avançado para respeitar seu ritmo de aprendizado',
                highlight: 'Do zero ao fluente'
              },
              { 
                icon: '📈', 
                title: 'Progresso Detalhado', 
                desc: 'Acompanhe suas estatísticas, frases praticadas e evolução com relatórios completos',
                highlight: 'Evolução visível'
              },
              { 
                icon: '🚀', 
                title: 'Experiência Premium', 
                desc: 'Interface moderna, sem anúncios e recursos avançados para acelerar seu aprendizado',
                highlight: 'Experiência completa'
              }
            ].map((item, index) => (
              <div key={index}>
                <div 
                  className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 card-hover glow-on-hover group transition-all duration-300 h-full flex flex-col" 
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h4 className="text-xl font-semibold text-white mb-3" style={{color: '#ffffff'}}>{item.title}</h4>
                  <p className="text-gray-300 mb-4 flex-1 leading-relaxed">{item.desc}</p>
                  
                  <div className="mt-auto">
                    <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30 rounded-lg p-3 mb-3">
                      <span className="text-purple-300 text-sm font-semibold">✨ {item.highlight}</span>
                    </div>
                    
                    <div className="text-center">
                      <span className="text-purple-400 text-sm group-hover:text-purple-300 transition-colors font-medium">
                        Disponível na plataforma
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-2 border-purple-500/50 rounded-2xl p-8 max-w-4xl mx-auto">
              <h4 className="text-3xl font-bold text-white mb-4">
                Comece sua jornada <span className="gradient-text">HOJE</span>
              </h4>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                Comece gratuitamente e experimente nossa metodologia única. 
                Veja como é possível falar inglês de verdade, com frases que você usaria no seu dia a dia
              </p>
              <div className="flex flex-col gap-4 justify-center items-center">
                <button 
                  className="px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl hover:scale-105 group"
                  onClick={() => handleButtonClick('/dashboard')}
                >
                  🚀 Começar Gratuitamente
                </button>
                <div className="text-gray-400 text-sm text-center">
                  Sem cartão de crédito • Acesso imediato • Cancele quando quiser
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      </PageTransition>

      {/* CTA Footer - Hidden on mobile */}
      <PageTransition delay={600}>
        <section className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 py-16 px-4 hidden lg:block">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl lg:text-4xl font-bold mb-6">
            Bora destravar seu{' '}
            <span className="gradient-text">English</span> do dia a dia?
          </h3>
          <p className="text-white text-lg mb-8">
            Teste o tutor grátis por 7 dias!
          </p>
          <button 
            className="btn-gradient px-10 py-5 rounded-full text-white font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 group pulse-glow"
            aria-label="Começar o curso gratuito de 7 dias"
            onClick={() => handleButtonClick('/dashboard')}
          >
            Começar Agora <span className="group-hover:scale-125 inline-block transition-transform duration-200" aria-hidden="true">💥</span>
          </button>
        </div>
        </section>
      </PageTransition>

      {/* Mobile Menu Buttons - Fixed Position */}
      {showMobileMenu && (
        <div 
          className="md:hidden fixed top-16 left-0 right-0 z-[9999] bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 shadow-xl"
          style={{
            animation: isClosingMenu 
              ? 'slideUpFade 0.3s ease-out forwards' 
              : 'slideDownFade 0.3s ease-out forwards',
            transform: 'translateY(-20px)',
            opacity: 0
          }}
        >
          <div className="p-4 space-y-3 flex flex-col items-center">
            <button 
              className="px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border-purple-400/50 text-white shadow-lg shadow-purple-500/20 hover:scale-102 hover:shadow-xl hover:shadow-purple-500/30 w-full max-w-xs"
              style={{ 
                animation: isClosingMenu 
                  ? 'slideUpFade 0.3s ease-out forwards'
                  : 'slideDownFade 0.3s ease-out forwards',
                animationDelay: isClosingMenu ? '0ms' : '100ms',
                transform: 'translateY(-10px)',
                opacity: 0
              }}
              onClick={() => {
                setShowMobileMenu(false)
                setShowAuthModal(true)
              }}
            >
              🚀 Entrar / Sign In
            </button>
            <button 
              className="px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white hover:scale-102 w-full max-w-xs"
              style={{ 
                animation: isClosingMenu 
                  ? 'slideUpFade 0.3s ease-out forwards'
                  : 'slideDownFade 0.3s ease-out forwards',
                animationDelay: isClosingMenu ? '0ms' : '200ms',
                transform: 'translateY(-10px)',
                opacity: 0
              }}
              onClick={() => {
                setShowMobileMenu(false)
                setShowAuthModal(true)
              }}
            >
              📝 Cadastrar / Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
    </AnimatedContainer>
    </>
  )
}