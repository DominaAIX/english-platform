interface LoadingSkeletonProps {
  className?: string
  lines?: number
  variant?: 'text' | 'circular' | 'rectangular'
}

export default function LoadingSkeleton({ 
  className = "", 
  lines = 1, 
  variant = 'text' 
}: LoadingSkeletonProps) {
  const baseClass = "animate-pulse bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%]"
  
  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg"
  }

  if (lines === 1) {
    return (
      <div className={`${baseClass} ${variantClasses[variant]} ${className}`} />
    )
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index}
          className={`${baseClass} ${variantClasses[variant]} ${className}`}
          style={{
            width: index === lines - 1 ? '75%' : '100%'
          }}
        />
      ))}
    </div>
  )
}