/**
 * Runs raster.ts jobs in a headless Chromium launched through Playwright.
 */

import { type RasterJob, type RasterResult, runRasterJobs } from './raster.ts';

export type RasterRunner = (
  jobs: readonly RasterJob[],
) => Promise<RasterResult[]>;

/** Jobs sent to the page per `evaluate` call (keeps payloads small). */
const BATCH = 24;

/**
 * Launches Chromium, hands `use` a runner for raster jobs, and closes the
 * browser afterwards. Fails with instructions when Chromium is missing.
 */
export async function withChromium<T>(
  use: (run: RasterRunner) => Promise<T>,
): Promise<T> {
  let browser: import('playwright').Browser;
  try {
    const { chromium } = await import('playwright');
    browser = await chromium.launch();
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(
      'Measuring icon artwork needs Chromium through Playwright, which could not be launched.\n' +
        'Install it with `pnpm exec playwright install chromium` (or point PLAYWRIGHT_BROWSERS_PATH at an installed copy).\n' +
        `Cause: ${reason.split('\n')[0]}`,
    );
  }
  try {
    const page = await browser.newPage();
    return await use(async jobs => {
      const results: RasterResult[] = [];
      for (let i = 0; i < jobs.length; i += BATCH) {
        results.push(
          ...(await page.evaluate(runRasterJobs, jobs.slice(i, i + BATCH))),
        );
      }
      return results;
    });
  } finally {
    await browser.close();
  }
}
