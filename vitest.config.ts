import { configDefaults, defineConfig } from 'vitest/config';

/** Resolved under React's `react-server` export condition, as RSC bundlers do. */
const SERVER_CONDITIONS = ['react-server', 'node', 'import', 'default'];

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: ['test/setup.ts'],
          exclude: [
            ...configDefaults.exclude,
            '**/.claude/**',
            'test/visual/**',
            'test/rsc/**',
          ],
        },
      },
      {
        extends: true,
        // Renders the icons the way a React Server Components server does:
        // `react` resolves to its server build (which has no useState,
        // useEffect, …) and react-server-dom-parcel produces the Flight
        // payload.
        resolve: { conditions: SERVER_CONDITIONS },
        ssr: {
          resolve: {
            conditions: SERVER_CONDITIONS,
            externalConditions: ['react-server'],
          },
        },
        test: {
          name: 'rsc',
          environment: 'node',
          include: ['test/rsc/**/*.test.tsx'],
          // Externalized packages (react, react-server-dom-parcel) are loaded
          // by Node itself, so it needs the condition too.
          execArgv: ['--conditions=react-server'],
        },
      },
    ],
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
