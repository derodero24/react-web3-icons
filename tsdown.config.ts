import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  deps: {
    neverBundle: ['react', 'react-dom', 'react/jsx-runtime'],
  },
});
