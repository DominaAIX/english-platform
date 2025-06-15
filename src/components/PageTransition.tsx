interface PageTransitionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}