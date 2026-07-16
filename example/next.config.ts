import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export',
  turbopack: {
    resolveAlias: {
      // Resolve the workspace package to its TypeScript source so Next.js
      // can transpile it directly without requiring a pre-built dist/.
      // Every subpath imported by the example needs BOTH an entry here and
      // one in tsconfig.json "paths" — Vercel builds without dist, so a
      // missing alias fails the deploy (CI reproduces this: the example job
      // builds without the library dist).
      'react-web3-icons': '../src/index.ts',
      'react-web3-icons/meta': '../src/meta/index.ts',
      'react-web3-icons/manifest': '../src/manifest/index.ts',
    },
  },
};

export default nextConfig;
