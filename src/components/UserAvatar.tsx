'use client';

interface UserAvatarProps {
  user: any;
  size?: 'sm' | 'md' | 'lg';
}

export default function UserAvatar({ user, size = 'md' }: UserAvatarProps) {
  const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'Usuário';
  const userAvatar = user.user_metadata?.avatar_url || user.user_metadata?.picture;
  
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  // Gera uma cor baseada no email do usuário para consistência
  const generateColor = (email: string) => {
    const colors = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-pink-500 to-rose-500',
      'from-cyan-500 to-blue-500',
      'from-teal-500 to-green-500'
    ];
    
    const hash = email.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  if (userAvatar) {
    return (
      <img 
        src={userAvatar} 
        alt="Avatar do usuário"
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    );
  }

  const colorGradient = generateColor(user.email || '');
  
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${colorGradient} flex items-center justify-center text-white ${textSizes[size]} font-bold shadow-lg`}>
      {userName.charAt(0).toUpperCase()}
    </div>
  );
}