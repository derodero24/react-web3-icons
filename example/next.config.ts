import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export',
  turbopack: {
    resolveAlias: {
      // Resolve the workspace package to its TypeScript source so Next.js
      // can transpile it directly without requiring a pre-built dist/.
      'react-web3-icons': '../src/index.ts',
      'react-web3-icons/meta': '../src/meta/index.ts',
    },
  },
};

export default nextConfig;
