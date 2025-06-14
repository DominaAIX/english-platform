import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  onClick
}: ButtonProps) {
  const baseClasses = "font-semibold rounded-full transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "btn-gradient text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 glow-on-hover",
    outline: "border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
        loading || disabled ? 'pointer-events-none' : 'hover:scale-105'
      }`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  )
}