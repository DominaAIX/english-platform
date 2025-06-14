'use client'

import { useEffect, useState } from 'react'

interface AnimatedContainerProps {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}

export default function AnimatedContainer({ 
  children, 
  staggerDelay = 100, 
  className = '' 
}: AnimatedContainerProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Pequeno delay para garantir que a página foi montada
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isLoaded
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2'
      } ${className}`}
    >
      {children}
    </div>
  )
}