import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicit settings for Vercel compatibility
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  
  // TypeScript and ESLint settings
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Experimental features that might help
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
};

export default nextConfig;
