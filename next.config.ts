import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  serverExternalPackages: ['mongoose'],
  cacheComponents: true,
};

export default nextConfig;
