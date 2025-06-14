import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removido 'output: export' para permitir API routes
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
