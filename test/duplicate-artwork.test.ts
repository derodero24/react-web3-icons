// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { CATEGORIES, loadCategory } from '../scripts/build-icons/lib.ts';
import { parseSvg, type XmlNode } from '../scripts/build-icons/xml.ts';
import { ICONS } from './helpers/units';

/**
 * Every artwork file draws something no other file draws. Two variant files
 * with the same artwork are one icon under two names, and the copies drift
 * apart the next time one of them is edited. The second name belongs in the
 * unit's `localAliases` (`UsdcCircle` → `Usdc`, `StarknetCircle` →
 * `Starknet`) or, across units, in a `reexport` unit (`Strk` → `Starknet`),
 * so one file and one component back both names (CONTRIBUTING.md, "Aliases
 * and re-exports").
 */

/**
 * Units that ship the same artwork on purpose, keyed by the two units
 * (`category/Name`, sorted, joined by ` + `), with the reason.
 */
const ALLOWED_DUPLICATES: Readonly<Record<string, string>> = {};

/** Whitespace-collapsed attribute value with its `url(#…)` targets renamed. */
function canonicalValue(
  name: string,
  value: string,
  ids: ReadonlyMap<string, string>,
): string {
  const rename = (id: string): string => ids.get(id) ?? `?${id}`;
  const renamed =
    (name === 'href' || name === 'xlink:href') && value.startsWith('#')
      ? `#${rename(value.slice(1))}`
      : value.replace(
          /url\(#([^)]+)\)/g,
          (_, id: string) => `url(#${rename(id)})`,
        );
  return renamed.replace(/\s+/g, ' ').trim();
}

/** Every `id` in document order. */
function collectIds(node: XmlNode, out: string[] = []): string[] {
  for (const [name, value] of node.attrs) {
    if (name === 'id') {
      out.push(value);
    }
  }
  for (const child of node.children) {
    collectIds(child, out);
  }
  return out;
}

function canonicalNode(
  node: XmlNode,
  ids: ReadonlyMap<string, string>,
): string {
  const attrs = node.attrs
    .filter(([name]) => name !== 'id')
    .map(([name, value]) => `${name}="${canonicalValue(name, value, ids)}"`)
    .sort();
  // Where a `<defs>` sits does not change what renders.
  const children = [
    ...node.children.filter(child => child.tag !== 'defs'),
    ...node.children.filter(child => child.tag === 'defs'),
  ].map(child => canonicalNode(child, ids));
  return `<${[node.tag, ...attrs].join(' ')}>${children.join('')}</${node.tag}>`;
}

/**
 * What an SVG draws, independent of its id names, attribute order,
 * whitespace and the position of its `<defs>`.
 */
function canonicalArtwork(svg: string): string {
  const root = parseSvg(svg);
  const ids = new Map(collectIds(root).map((id, i) => [id, `id${i}`]));
  return canonicalNode(root, ids);
}

interface ArtworkFile {
  readonly unit: string;
  readonly path: string;
  readonly exportName: string;
}

/** Groups of two or more variant files under icons/ with the same artwork. */
function duplicateGroups(): ArtworkFile[][] {
  const byArtwork = new Map<string, ArtworkFile[]>();
  for (const category of CATEGORIES) {
    for (const unit of loadCategory(ICONS, category)) {
      for (const variant of unit.variants) {
        const key = canonicalArtwork(variant.svg);
        const files = byArtwork.get(key) ?? [];
        files.push({
          unit: `${category}/${unit.meta.name}`,
          path: variant.path,
          exportName: variant.exportName,
        });
        byArtwork.set(key, files);
      }
    }
  }
  return [...byArtwork.values()].filter(files => files.length > 1);
}

const unitPair = (files: readonly ArtworkFile[]): string =>
  [...new Set(files.map(f => f.unit))].sort().join(' + ');

describe('canonicalArtwork', () => {
  const Xmlns = 'xmlns="http://www.w3.org/2000/svg"';

  it('ignores id names, attribute order and where <defs> sit', () => {
    const a = `<svg ${Xmlns} viewBox="0 0 8 8"><defs><mask id="a"><rect width="8" height="8" fill="#fff"/></mask></defs><path mask="url(#a)" d="M0 0h8v8H0z"/></svg>`;
    const b = `<svg viewBox="0 0 8 8" ${Xmlns}><path d="M0 0h8v8H0z" mask="url(#b-x)"/><defs><mask id="b-x"><rect width="8" height="8" fill="#fff"/></mask></defs></svg>`;
    expect(canonicalArtwork(a)).toBe(canonicalArtwork(b));
  });

  it('tells apart paint, geometry and which definition is referenced', () => {
    const svg = (body: string): string =>
      canonicalArtwork(
        `<svg ${Xmlns} viewBox="0 0 8 8"><defs><linearGradient id="a"/><linearGradient id="b"><stop offset="1"/></linearGradient></defs>${body}</svg>`,
      );
    const base = svg('<path fill="url(#a)" d="M0 0h8v8H0z"/>');
    expect(svg('<path fill="url(#b)" d="M0 0h8v8H0z"/>')).not.toBe(base);
    expect(svg('<path fill="#000" d="M0 0h8v8H0z"/>')).not.toBe(base);
    expect(svg('<path fill="url(#a)" d="M0 0h8v7H0z"/>')).not.toBe(base);
  });
});

describe('no artwork ships twice', () => {
  const groups = duplicateGroups();

  it('every duplicate file is declared as an alias or re-export instead', () => {
    const undeclared = groups
      .filter(files => !Object.hasOwn(ALLOWED_DUPLICATES, unitPair(files)))
      .map(
        files =>
          `${files.map(f => `${f.path} (${f.exportName})`).join(' = ')}: keep one file and declare the other export${files.length > 2 ? 's' : ''} in "localAliases" (same unit) or as a "reexport" (another unit)`,
      );
    expect(undeclared).toEqual([]);
  });

  it.each(Object.entries(ALLOWED_DUPLICATES))(
    '%s still ships duplicate artwork (or the entry is stale)',
    (pair, reason) => {
      expect(reason).toMatch(/\S/);
      expect(groups.map(unitPair)).toContain(pair);
    },
  );
});
