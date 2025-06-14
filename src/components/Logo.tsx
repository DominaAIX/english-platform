interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = "", size = 'md' }: LogoProps) {
  const sizes = {
    sm: { container: 'w-6 h-6', svg: 'w-5 h-5' },
    md: { container: 'w-8 h-8', svg: 'w-7 h-7' },
    lg: { container: 'w-12 h-12', svg: 'w-10 h-10' }
  }

  return (
    <div className={`${sizes[size].container} rounded-lg shadow-lg overflow-hidden ${className}`}>
      <svg className={sizes[size].svg} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Clippath para dividir ao meio */}
          <clipPath id="leftHalf">
            <rect x="0" y="0" width="16" height="32"/>
          </clipPath>
          <clipPath id="rightHalf">
            <rect x="16" y="0" width="16" height="32"/>
          </clipPath>
        </defs>
        
        {/* Lado esquerdo - Bandeira Britânica */}
        <g clipPath="url(#leftHalf)">
          {/* Fundo azul */}
          <rect width="32" height="32" fill="#012169"/>
          
          {/* Cruz branca diagonal */}
          <path d="M0,0 L16,16 M16,0 L0,16" stroke="white" strokeWidth="2"/>
          
          {/* Cruz vermelha diagonal */}
          <path d="M0,0 L16,16 M16,0 L0,16" stroke="#C8102E" strokeWidth="1"/>
          
          {/* Cruz branca vertical/horizontal */}
          <rect x="6" y="0" width="4" height="32" fill="white"/>
          <rect x="0" y="14" width="16" height="4" fill="white"/>
          
          {/* Cruz vermelha vertical/horizontal */}
          <rect x="7" y="0" width="2" height="32" fill="#C8102E"/>
          <rect x="0" y="15" width="16" height="2" fill="#C8102E"/>
        </g>
        
        {/* Lado direito - Bandeira Americana */}
        <g clipPath="url(#rightHalf)">
          {/* Listras vermelhas e brancas */}
          <rect x="16" y="0" width="16" height="32" fill="#B22234"/>
          <rect x="16" y="2.5" width="16" height="2.3" fill="white"/>
          <rect x="16" y="7.1" width="16" height="2.3" fill="white"/>
          <rect x="16" y="11.7" width="16" height="2.3" fill="white"/>
          <rect x="16" y="16.3" width="16" height="2.3" fill="white"/>
          <rect x="16" y="20.9" width="16" height="2.3" fill="white"/>
          <rect x="16" y="25.5" width="16" height="2.3" fill="white"/>
          <rect x="16" y="30.1" width="16" height="1.9" fill="white"/>
          
          {/* Cantão azul */}
          <rect x="16" y="0" width="7" height="13" fill="#3C3B6E"/>
          
          {/* Estrelas */}
          <circle cx="18" cy="2" r="0.4" fill="white"/>
          <circle cx="20" cy="2" r="0.4" fill="white"/>
          <circle cx="22" cy="2" r="0.4" fill="white"/>
          <circle cx="19" cy="4" r="0.4" fill="white"/>
          <circle cx="21" cy="4" r="0.4" fill="white"/>
          <circle cx="18" cy="6" r="0.4" fill="white"/>
          <circle cx="20" cy="6" r="0.4" fill="white"/>
          <circle cx="22" cy="6" r="0.4" fill="white"/>
          <circle cx="19" cy="8" r="0.4" fill="white"/>
          <circle cx="21" cy="8" r="0.4" fill="white"/>
          <circle cx="18" cy="10" r="0.4" fill="white"/>
          <circle cx="20" cy="10" r="0.4" fill="white"/>
          <circle cx="22" cy="10" r="0.4" fill="white"/>
        </g>
        
        {/* Linha divisória sutil */}
        <line x1="16" y1="0" x2="16" y2="32" stroke="#000000" strokeWidth="0.5" opacity="0.2"/>
      </svg>
    </div>
  )
}