import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/chain/index.ts',
    'src/coin/index.ts',
    'src/devtool/index.ts',
    'src/dex/index.ts',
    'src/domain/index.ts',
    'src/exchange/index.ts',
    'src/explorer/index.ts',
    'src/marketplace/index.ts',
    'src/node/index.ts',
    'src/portfolio/index.ts',
    'src/storage/index.ts',
    'src/tracker/index.ts',
    'src/wallet/index.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  deps: {
    neverBundle: ['react', 'react-dom', 'react/jsx-runtime'],
  },
});
