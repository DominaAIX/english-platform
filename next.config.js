/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignorar erros de ESLint durante o build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignorar erros de TypeScript durante o build  
    ignoreBuildErrors: true,
  },
  env: {
    // Flag para indicar ambiente de desenvolvimento local
    NEXT_PUBLIC_IS_LOCAL_DEV: 'true'
  },
}

module.exports = nextConfig