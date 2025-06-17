'use client';

import { useEffect, useState } from 'react';

export default function EnvironmentBanner() {
  const [isStaging, setIsStaging] = useState(false);

  useEffect(() => {
    // Verifica se é ambiente de staging baseado na URL ou variáveis
    const isPreview = window.location.hostname.includes('vercel.app') && 
                     !window.location.hostname.includes('your-prod-domain.com');
    const envVar = process.env.NEXT_PUBLIC_IS_STAGING === 'true';
    const urlStaging = window.location.hostname.includes('staging') ||
                      window.location.hostname.includes('preview') ||
                      window.location.hostname.includes('4e3n90jcj');
    
    setIsStaging(envVar || urlStaging || isPreview);
  }, []);

  if (!isStaging) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-orange-600 text-white text-center py-1 text-sm font-semibold z-50">
        🔧 AMBIENTE DE HOMOLOGAÇÃO - Para validação antes da produção
      </div>
      <div style={{ paddingTop: '2rem' }} />
    </>
  );
}