import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/deprecated.ts',
    'src/bridge/index.ts',
    'src/chain/index.ts',
    'src/coin/index.ts',
    'src/defi/index.ts',
    'src/devtool/index.ts',
    'src/dex/index.ts',
    'src/domain/index.ts',
    'src/exchange/index.ts',
    'src/explorer/index.ts',
    'src/marketplace/index.ts',
    'src/node/index.ts',
    'src/oracle/index.ts',
    'src/portfolio/index.ts',
    'src/storage/index.ts',
    'src/tracker/index.ts',
    'src/wallet/index.ts',
    'src/meta/index.ts',
    'src/dynamic/index.ts',
    'src/manifest/index.ts',
  ],
  format: ['esm'],
  // Explicit because tsdown would otherwise infer a Node target from
  // `engines`, which this browser library does not publish. Matches the
  // language level declared in tsconfig.json.
  target: 'es2022',
  unbundle: true,
  // rolldown warns that the 'use client' directive of src/dynamic/index.ts
  // and src/dynamic/DynamicIcon.tsx "may not be preserved when bundling".
  // With `unbundle` every module is emitted on its own, so the directive stays
  // at the top of dist/dynamic/index.mjs and dist/dynamic/DynamicIcon.mjs.
  // This turns the check off for every module: test/consumer/node/check.mjs
  // asserts on the packed tarball that each 'use client' module of src/ keeps
  // the directive in dist/.
  checks: { moduleLevelDirective: false },
  // Sourcemaps are not published: the `.d.mts.map` files would point at
  // `src/`, which is not in the tarball, and the JS is already unminified.
  dts: { sourcemap: false },
  sourcemap: false,
  clean: true,
  deps: {
    neverBundle: ['react', 'react-dom', 'react/jsx-runtime'],
  },
});
