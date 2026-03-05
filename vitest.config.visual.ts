import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  test: {
    include: ['test/visual/**/*.test.tsx'],
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      screenshotFailures: true,
      instances: [{ browser: 'chromium' }],
      expect: {
        toMatchScreenshot: {
          comparatorName: 'pixelmatch',
          comparatorOptions: {
            threshold: 0.1,
            allowedMismatchedPixelRatio: 0.005,
          },
          resolveScreenshotPath: ({
            arg,
            ext,
            testFileDirectory,
            testFileName,
          }) =>
            `${testFileDirectory}/__screenshots__/${testFileName}/${arg}${ext}`,
        },
      },
    },
  },
});
