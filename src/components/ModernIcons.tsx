interface IconProps {
  className?: string
  size?: number
}

export const WorkIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M3 9L21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M8 5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V9H8V5Z" 
      fill="currentColor" 
      fillOpacity="0.3"
    />
    <path 
      d="M3 9L21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9ZM8 5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V9H8V5Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

export const InterviewIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M8 7V3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3V7M8 7H16M8 7H6C4.89543 7 4 7.89543 4 9V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V9C20 7.89543 19.1046 7 18 7H16" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 11H15M9 15H13" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <rect 
      x="4" 
      y="9" 
      width="16" 
      height="10" 
      fill="currentColor" 
      fillOpacity="0.1"
    />
  </svg>
)

export const TravelIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M21 16V14L13 9V3.5C13 2.67157 12.3284 2 11.5 2V2C10.6716 2 10 2.67157 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M21 16V14L13 9V3.5C13 2.67157 12.3284 2 11.5 2V2C10.6716 2 10 2.67157 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

export const BusinessIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M12 14C16.4183 14 20 17.5817 20 22H4C4 17.5817 7.58172 14 12 14Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM12 14C16.4183 14 20 17.5817 20 22H4C4 17.5817 7.58172 14 12 14Z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M19 8L22 11L19 14" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M5 8L2 11L5 14" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

export const CasualIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M3 18C3 15.7909 4.79086 14 7 14H17C19.2091 14 21 15.7909 21 18V21H3V18Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10ZM3 18C3 15.7909 4.79086 14 7 14H17C19.2091 14 21 15.7909 21 18V21H3V18Z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <circle 
      cx="18" 
      cy="6" 
      r="2" 
      fill="currentColor" 
      fillOpacity="0.3"
    />
    <circle 
      cx="6" 
      cy="6" 
      r="2" 
      fill="currentColor" 
      fillOpacity="0.3"
    />
  </svg>
)

export const RestaurantIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M5 7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V17C19 18.1046 18.1046 19 17 19H7C5.89543 19 5 18.1046 5 17V7Z" 
      fill="currentColor" 
      fillOpacity="0.1"
    />
    <path 
      d="M5 7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V17C19 18.1046 18.1046 19 17 19H7C5.89543 19 5 18.1046 5 17V7Z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M8 9V15M10 9V15M12 9V15" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M16 9V12C16 13.1046 15.1046 14 14 14V15" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <circle 
      cx="12" 
      cy="12" 
      r="6" 
      fill="currentColor" 
      fillOpacity="0.05"
    />
  </svg>
)

export const ShoppingIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M7 13H17L21 5H5.4L7 13Z" 
      fill="currentColor" 
      fillOpacity="0.1"
    />
  </svg>
)

export const PronunciationIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 2C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12V4C10 2.89543 10.8954 2 12 2Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M18 10V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V10M12 18V22M8 22H16" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 2C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12V4C10 2.89543 10.8954 2 12 2Z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
  </svg>
)

export const GrammarIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" 
      fill="currentColor" 
      fillOpacity="0.1"
    />
    <path 
      d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M8 8H16M8 12H14M8 16H12" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <circle 
      cx="16" 
      cy="16" 
      r="2" 
      fill="currentColor" 
      fillOpacity="0.3"
    />
  </svg>
)

export const ConversationIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M8 9H16M8 13H14M6 20L3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V15C21 16.1046 20.1046 17 19 17H9L6 20Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M3 7V17L6 20H19C20.1046 20 21 19.1046 21 18V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7Z" 
      fill="currentColor" 
      fillOpacity="0.1"
    />
    <circle 
      cx="18" 
      cy="9" 
      r="1" 
      fill="currentColor" 
      fillOpacity="0.5"
    />
  </svg>
)

export const SendIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M22 2L11 13L2 9L22 2Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
  </svg>
)

export const AIIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
  </svg>
)

export const TargetIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
)

export const AudioIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 1V23" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M8 6V18L12 23L16 18V6L12 1L8 6Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M8 6V18L12 23L16 18V6L12 1L8 6Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M18 8C19.5 9.5 19.5 14.5 18 16M20 6C22 8 22 16 20 18" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
)

export const SignUpIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M12 14C16.4183 14 20 17.5817 20 22H4C4 17.5817 7.58172 14 12 14Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM12 14C16.4183 14 20 17.5817 20 22H4C4 17.5817 7.58172 14 12 14Z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M20 8V14M17 11H23" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
)

export const RobotIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <defs>
      {/* Gradientes futuristas */}
      <linearGradient id="robotBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
      </linearGradient>
      
      <linearGradient id="robotHead" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
      </linearGradient>
      
      <linearGradient id="robotEyes" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00f5ff" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </linearGradient>
      
      <radialGradient id="eyeGlow">
        <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8" />
        <stop offset="70%" stopColor="#0ea5e9" stopOpacity="0.4" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      
      <filter id="glow">
        <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Sombra de fundo */}
    <circle cx="12" cy="13" r="9" fill="url(#robotBody)" fillOpacity="0.1" />
    
    {/* Antena */}
    <line x1="12" y1="5" x2="12" y2="3" stroke="url(#robotHead)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="2.5" r="1" fill="url(#robotEyes)" filter="url(#glow)" />
    
    {/* Cabeça principal */}
    <rect 
      x="7" 
      y="5" 
      width="10" 
      height="8" 
      rx="4" 
      fill="url(#robotHead)" 
      stroke="currentColor" 
      strokeWidth="0.5"
      strokeOpacity="0.3"
    />
    
    {/* Brilho na cabeça */}
    <ellipse cx="10" cy="7" rx="2" ry="1" fill="white" fillOpacity="0.3" />
    
    {/* Olhos brilhantes */}
    <circle cx="9.5" cy="9" r="1.2" fill="url(#eyeGlow)" />
    <circle cx="14.5" cy="9" r="1.2" fill="url(#eyeGlow)" />
    <circle cx="9.5" cy="9" r="0.8" fill="url(#robotEyes)" filter="url(#glow)" />
    <circle cx="14.5" cy="9" r="0.8" fill="url(#robotEyes)" filter="url(#glow)" />
    
    {/* Pupila brilhante */}
    <circle cx="9.5" cy="9" r="0.3" fill="white" />
    <circle cx="14.5" cy="9" r="0.3" fill="white" />
    
    {/* Sorriso feliz */}
    <path 
      d="M10 11.5Q12 13 14 11.5" 
      stroke="url(#robotEyes)" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
      filter="url(#glow)"
    />
    
    {/* Corpo futurista */}
    <rect 
      x="6" 
      y="13" 
      width="12" 
      height="9" 
      rx="3" 
      fill="url(#robotBody)"
      stroke="currentColor" 
      strokeWidth="0.5"
      strokeOpacity="0.3"
    />
    
    {/* Painel central brilhante */}
    <rect 
      x="10" 
      y="15" 
      width="4" 
      height="5" 
      rx="1" 
      fill="url(#robotEyes)" 
      fillOpacity="0.6"
      filter="url(#glow)"
    />
    
    {/* Detalhes do painel */}
    <rect x="10.5" y="15.5" width="3" height="0.5" rx="0.25" fill="white" fillOpacity="0.8" />
    <rect x="10.5" y="16.5" width="2" height="0.5" rx="0.25" fill="white" fillOpacity="0.6" />
    <rect x="10.5" y="17.5" width="2.5" height="0.5" rx="0.25" fill="white" fillOpacity="0.7" />
    
    {/* Braços/conectores */}
    <rect x="4" y="16" width="2" height="1" rx="0.5" fill="url(#robotHead)" />
    <rect x="18" y="16" width="2" height="1" rx="0.5" fill="url(#robotHead)" />
    <circle cx="4" cy="16.5" r="0.8" fill="url(#robotEyes)" fillOpacity="0.6" />
    <circle cx="20" cy="16.5" r="0.8" fill="url(#robotEyes)" fillOpacity="0.6" />
    
    {/* Luzes indicadoras */}
    <circle cx="8" cy="18.5" r="0.4" fill="url(#robotEyes)" filter="url(#glow)" />
    <circle cx="16" cy="18.5" r="0.4" fill="url(#robotEyes)" filter="url(#glow)" />
  </svg>
)

export const LearningTrailIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <path 
      d="M12 2L13.5 6.5L18 8L13.5 9.5L12 14L10.5 9.5L6 8L10.5 6.5L12 2Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M12 2L13.5 6.5L18 8L13.5 9.5L12 14L10.5 9.5L6 8L10.5 6.5L12 2Z" 
      stroke="currentColor" 
      strokeWidth="1" 
      strokeLinejoin="round"
    />
  </svg>
)

export const PuzzleIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M3 8V7C3 5.89543 3.89543 5 5 5H8V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V5H19C20.1046 5 21 5.89543 21 7V10H20C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14H21V17C21 18.1046 20.1046 19 19 19H16V20C16 21.1046 15.1046 22 14 22H10C8.89543 22 8 21.1046 8 20V19H5C3.89543 19 3 18.1046 3 17V14H4C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10H3V8Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M3 8V7C3 5.89543 3.89543 5 5 5H8V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V5H19C20.1046 5 21 5.89543 21 7V10H20C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14H21V17C21 18.1046 20.1046 19 19 19H16V20C16 21.1046 15.1046 22 14 22H10C8.89543 22 8 21.1046 8 20V19H5C3.89543 19 3 18.1046 3 17V14H4C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10H3V8Z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
  </svg>
)

export const SpeakerIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M11 5L6 9H2V15H6L11 19V5Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M11 5L6 9H2V15H6L11 19V5Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M15.54 8.46C16.4772 9.39764 17.0039 10.6692 17.0039 12C17.0039 13.3308 16.4772 14.6024 15.54 15.54M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

export const StarIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" 
      fill="currentColor" 
      fillOpacity="0.3"
    />
    <path 
      d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

export const FlagIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M4 15S7 9 12 9S20 15 20 15V3S17 0 12 0S4 3 4 3V15Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M4 15S7 9 12 9S20 15 20 15V3S17 0 12 0S4 3 4 3V15Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M4 22V15" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
)

export const LocationIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      fill="currentColor" 
      fillOpacity="0.1"
    />
    <circle 
      cx="12" 
      cy="12" 
      r="4" 
      fill="currentColor" 
      fillOpacity="0.3"
    />
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <circle 
      cx="12" 
      cy="12" 
      r="4" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <circle 
      cx="12" 
      cy="12" 
      r="1" 
      fill="currentColor"
    />
  </svg>
)

export const LockIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <rect 
      x="5" 
      y="11" 
      width="14" 
      height="10" 
      rx="2" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <rect 
      x="5" 
      y="11" 
      width="14" 
      height="10" 
      rx="2" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
  </svg>
)

export const LightBulbIcon = ({ className = "", size = 20 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M9 21H15" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M10 19H14" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
)