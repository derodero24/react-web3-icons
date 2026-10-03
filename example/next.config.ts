import type { NextConfig } from 'next';

/**
 * Library subpaths the example imports. Each resolves to `../src/<subpath>/index.ts`.
 * The icon registry (`src/utils/icons.ts`) imports every category subpath and
 * type-checks that list against the manifest's `IconCategory`, so a new
 * category fails the type-check until it is added there and here.
 */
const LIBRARY_SUBPATHS = [
  'bridge',
  'chain',
  'coin',
  'defi',
  'devtool',
  'dex',
  'domain',
  'exchange',
  'explorer',
  'manifest',
  'marketplace',
  'meta',
  'node',
  'oracle',
  'portfolio',
  'storage',
  'tracker',
  'wallet',
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export',
  turbopack: {
    resolveAlias: {
      // Resolve the workspace package to its TypeScript source so Next.js
      // can transpile it directly without requiring a pre-built dist/.
      // tsconfig.json maps the same specifiers ("react-web3-icons" and the
      // "react-web3-icons/*" wildcard). Every subpath imported by the example
      // needs an entry here — Vercel builds without dist, so a missing alias
      // fails the deploy (CI reproduces this: the example job builds without
      // the library dist).
      'react-web3-icons': '../src/index.ts',
      ...Object.fromEntries(
        LIBRARY_SUBPATHS.map(subpath => [
          `react-web3-icons/${subpath}`,
          `../src/${subpath}/index.ts`,
        ]),
      ),
    },
  },
};

export default nextConfig;
