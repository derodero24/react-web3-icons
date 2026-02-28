import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**'],
      thresholds: {
        statements: 100,
        functions: 100,
        lines: 100,
        branches: 100,
      },
    },
  },
});
