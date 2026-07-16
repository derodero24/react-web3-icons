import { join } from 'node:path';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

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
          // vitest 4.1 passes testFileDirectory relative to root; the path
          // must be absolute or writes fail ("Couldn't write file to fs").
          resolveScreenshotPath: ({
            arg,
            ext,
            root,
            testFileDirectory,
            testFileName,
          }) =>
            join(
              root,
              testFileDirectory,
              '__screenshots__',
              testFileName,
              `${arg}${ext}`,
            ),
        },
      },
    },
  },
});
