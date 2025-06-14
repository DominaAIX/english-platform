interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = "", size = 'md' }: LogoProps) {
  const sizes = {
    sm: { container: 'w-12 h-12', image: 'w-11 h-11' },
    md: { container: 'w-14 h-14', image: 'w-13 h-13' },
    lg: { container: 'w-18 h-18', image: 'w-17 h-17' }
  }

  return (
    <div className={`${sizes[size].container} flex items-center justify-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="Inglês pra Já"
        className={`${sizes[size].image} object-contain`}
      />
    </div>
  )
}