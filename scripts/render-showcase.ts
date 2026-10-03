#!/usr/bin/env node
/**
 * Renders image/icons.png, the icon overview at the top of the README, from
 * the icons/ source tree: the default variant of every icon that is not
 * deprecated, in category order, so the picture always shows the shipped
 * artwork. Re-run it whenever icons are added, replaced or retired:
 *
 *   node scripts/render-showcase.ts
 *
 * Needs Chromium through Playwright.
 */
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';
import { CATEGORIES, loadCategory } from './build-icons/lib.ts';

const ROOT = resolve(import.meta.dirname, '..');
const OUT = join(ROOT, 'image', 'icons.png');

/** Icons per row, cell size and icon size in CSS pixels. */
const COLUMNS = 24;
const CELL = 56;
const ICON = 36;
const PADDING = 24;

/** Each icon is its own `<img>` document, so ids in masks and gradients never collide. */
const sources: readonly string[] = CATEGORIES.flatMap(category =>
  loadCategory(join(ROOT, 'icons'), category).flatMap(({ meta, variants }) => {
    const main = variants.find(variant => variant.suffix === '');
    const deprecated =
      'deprecated' in meta &&
      meta.deprecated !== undefined &&
      Object.hasOwn(meta.deprecated, meta.name);
    return main === undefined || deprecated ? [] : [main.svg];
  }),
);

const rows = Math.ceil(sources.length / COLUMNS);
const width = COLUMNS * CELL + 2 * PADDING;
const height = rows * CELL + 2 * PADDING;
const cells = sources
  .map(
    svg =>
      `<div class="cell"><img src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}" alt=""></div>`,
  )
  .join('');

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 2,
  });
  await page.setContent(`<!doctype html>
<style>
  body { margin: 0; background: #fff; }
  .grid {
    display: grid;
    grid-template-columns: repeat(${COLUMNS}, ${CELL}px);
    grid-auto-rows: ${CELL}px;
    padding: ${PADDING}px;
  }
  .cell { display: flex; align-items: center; justify-content: center; }
  img { width: ${ICON}px; height: ${ICON}px; }
</style>
<div class="grid">${cells}</div>`);
  await page.waitForFunction(() =>
    Array.from(document.images).every(image => image.complete),
  );
  await page.screenshot({ path: OUT, fullPage: true });
} finally {
  await browser.close();
}

console.log(`Rendered ${sources.length} icons to image/icons.png.`);
