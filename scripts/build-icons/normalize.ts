/**
 * Turns an arbitrary SVG into icon-source form (what `new-icon` writes to
 * icons/), and checks that committed sources still are in that form.
 *
 *   1. SVGO with the repository's svgo.config.js
 *   2. Root normalization: the pipeline only accepts `xmlns`, `viewBox` and
 *      `fill` on the root <svg>. Sizing and metadata attributes are dropped;
 *      every other root attribute (stroke, stroke-width, fill-rule, style, …)
 *      is inherited by the artwork, so it moves onto a wrapping <g> instead
 *      of being lost (a stroke-only icon would otherwise render invisible).
 */

import { join } from 'node:path';
import { loadConfig, optimize } from 'svgo';
import { ROOT_ATTRS } from './jsx.ts';
import { compareStrings } from './lib.ts';
import { parseSvg, serializeSvg, type XmlAttr, type XmlNode } from './xml.ts';

/** Root attributes without effect on an icon's rendering. */
function isDroppedRootAttr(name: string): boolean {
  return (
    [
      'width',
      'height',
      'x',
      'y',
      'version',
      'baseProfile',
      'id',
      'class',
    ].includes(name) ||
    name.startsWith('xmlns:') ||
    name.startsWith('xml:') ||
    name.startsWith('data-')
  );
}

/**
 * Normalizes the root element of a parsed SVG (see the module comment).
 * Mono artwork without a root fill gets `fill="currentColor"`.
 */
export function normalizeRoot(root: XmlNode, mono: boolean): XmlNode {
  const keep: XmlAttr[] = [];
  const inherited: XmlAttr[] = [];
  for (const attr of root.attrs) {
    if (ROOT_ATTRS.includes(attr[0])) {
      keep.push(attr);
    } else if (!isDroppedRootAttr(attr[0])) {
      inherited.push(attr);
    }
  }
  if (!keep.some(([name]) => name === 'viewBox')) {
    throw new Error('the SVG needs a viewBox');
  }
  if (!keep.some(([name]) => name === 'xmlns')) {
    keep.unshift(['xmlns', 'http://www.w3.org/2000/svg']);
  }
  if (mono && !keep.some(([name]) => name === 'fill')) {
    keep.push(['fill', 'currentColor']);
  }
  const children =
    inherited.length === 0
      ? root.children
      : [{ tag: 'g', attrs: inherited, children: root.children }];
  return { tag: 'svg', attrs: keep, children };
}

/** Runs SVGO on `text`; `path` names the input in SVGO's errors. */
export type Optimizer = (text: string, path: string) => string;

/** SVGO bound to the repository's svgo.config.js under `root`. */
export async function createOptimizer(root: string): Promise<Optimizer> {
  const config = await loadConfig(join(root, 'svgo.config.js'));
  return (text, path) => optimize(text, { ...config, path }).data;
}

/** Canonical form for comparison: attribute order is not significant. */
function canonical(node: XmlNode): string {
  const sort = (n: XmlNode): XmlNode => ({
    tag: n.tag,
    attrs: [...n.attrs].sort((a, b) => compareStrings(a[0], b[0])),
    children: n.children.map(sort),
  });
  return serializeSvg(sort(node));
}

/**
 * Whether a committed icon source is a fixed point of SVGO, i.e. SVGO would
 * not change it beyond attribute order and whitespace.
 */
export function isSvgoNormalized(
  optimize: Optimizer,
  text: string,
  path: string,
): boolean {
  return (
    canonical(parseSvg(optimize(text, path), path)) ===
    canonical(parseSvg(text, path))
  );
}

/**
 * Runs SVGO until its output is normalized (see isSvgoNormalized); SVGO's
 * own multipass stops at the first pass that saves no bytes, which is not
 * always a fixed point.
 */
export function optimizeToFixedPoint(
  optimize: Optimizer,
  text: string,
  path: string,
): string {
  let current = optimize(text, path);
  for (let pass = 0; pass < 8; pass++) {
    if (isSvgoNormalized(optimize, current, path)) {
      return current;
    }
    current = optimize(current, path);
  }
  throw new Error(`${path}: SVGO does not reach a fixed point`);
}
