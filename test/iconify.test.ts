import { join } from 'node:path';
import {
  analyseSVGStructure,
  checkBadTags,
  cleanupSVG,
  detectIconSetPalette,
  IconSet,
  validateColors,
} from '@iconify/tools';
import {
  convertIconSetInfo,
  quicklyValidateIconSet,
  validateIconSet,
} from '@iconify/utils';
import { describe, expect, it, vi } from 'vitest';
import { buildIconifySets } from '../scripts/build-icons/emit-iconify.ts';
import { CATEGORIES, kebab, loadCategory } from '../scripts/build-icons/lib.ts';
import { ICON_MANIFEST } from '../src/manifest';

const ICONS = join(import.meta.dirname, '../icons');

const sets = buildIconifySets();

/**
 * Every artwork variant whose colour is declared on the source root element,
 * with the fill the Iconify body must re-establish (mono defaults to
 * currentColor).
 */
function sourceRootFills(): {
  iconName: string;
  mono: boolean;
  rootFill: string;
}[] {
  return CATEGORIES.flatMap(category =>
    loadCategory(ICONS, category).flatMap(unit =>
      unit.variants.flatMap(({ suffix, exportName, svg }) => {
        const mono = suffix.endsWith('Mono');
        const rootFill =
          /<svg\b[^>]*\bfill="([^"]*)"/.exec(svg)?.[1] ??
          (mono ? 'currentColor' : undefined);
        if (rootFill === undefined) {
          return [];
        }
        const iconName = `${category}-${kebab(exportName)}`;
        return [{ iconName, mono, rootFill }];
      }),
    ),
  );
}

/**
 * Icons whose body Iconify's cleanupSVG() may change. Iconify supports no
 * `mix-blend-mode`, so its tooling drops the blends from these official
 * artworks (see docs/iconify.md); nothing else may change.
 */
const BLEND_MODE_ICONS: ReadonlySet<string> = new Set([
  'chain-astar',
  'domain-ens',
]);
const BLEND_MODE_STYLE = / style="mix-blend-mode:[a-z-]+"/g;

const COLLECTIONS = [
  ['web3', sets.colored],
  ['web3-mono', sets.mono],
] as const;

describe.each(COLLECTIONS)('%s: Iconify tooling', (prefix, set) => {
  // Parsed back from JSON, as Iconify reads dist/iconify*.json.
  const json = validateIconSet(JSON.parse(JSON.stringify(set)));
  const iconSet = new IconSet(json);
  const iconNames = Object.keys(set.icons);

  it('passes @iconify/utils validation', () => {
    expect(json.prefix).toBe(prefix);
    expect(quicklyValidateIconSet(set)).not.toBeNull();
    // Without `fix`, validateIconSet throws on anything it would repair.
    expect(json).toEqual(set);
  });

  it('declares info that Iconify parses without loss', () => {
    expect(convertIconSetInfo(set.info)).toEqual(set.info);
    expect(set.info).toMatchObject({
      // IconSet.count(): what Iconify's export writes as info.total.
      total: iconSet.count(),
      category: 'Logos',
      license: { spdx: 'MIT' },
    });
  });

  it('sets info.height exactly when every icon shares a height', () => {
    const heights = new Set(Object.values(set.icons).map(i => i.height));
    if (heights.size === 1) {
      expect(set.info.height).toBe([...heights][0]);
    } else {
      expect(set.info).not.toHaveProperty('height');
    }
  });

  it('samples visible icons, not aliases', () => {
    expect(set.info.samples.length).toBeGreaterThan(0);
    for (const sample of set.info.samples) {
      expect(set.icons[sample], sample).toBeDefined();
      expect(set.icons[sample]?.hidden, sample).toBeUndefined();
    }
  });

  it('declares the palette that Iconify detects', () => {
    expect(detectIconSetPalette(iconSet)).toBe(set.info.palette);
  });

  it('every body survives @iconify/tools cleanup and validation', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    try {
      for (const name of iconNames) {
        const svg = iconSet.toSVG(name);
        if (svg === null) {
          expect.fail(`${name}: IconSet.toSVG() returned null`);
        }
        const body = svg.getBody();
        // Throws on unknown or unsafe elements (script, foreignObject, …).
        expect(() => checkBadTags(svg), name).not.toThrow();
        cleanupSVG(svg);
        expect(svg.getBody(), name).toBe(
          BLEND_MODE_ICONS.has(name)
            ? body.replaceAll(BLEND_MODE_STYLE, '')
            : body,
        );
        // Throws on broken references (url(#…), href) and id clashes.
        expect(() => analyseSVGStructure(svg), name).not.toThrow();
        // Mono: currentColor only; colored: no currentColor; both: no
        // colour Iconify cannot parse.
        const { hasUnsetColor } = validateColors(svg, !set.info.palette);
        expect(hasUnsetColor, name).toBe(false);
      }
      for (const [message] of warn.mock.calls) {
        expect(message).toMatch(/: mix-blend-mode$/);
      }
    } finally {
      warn.mockRestore();
    }
  });
});

describe('IconifyJSON collections', () => {
  it('covers every icon export as an icon or alias', () => {
    const covered =
      Object.keys(sets.colored.icons).length +
      Object.keys(sets.colored.aliases).length +
      Object.keys(sets.mono.icons).length +
      Object.keys(sets.mono.aliases).length;
    // A case-only rename (OKXWallet → OkxWallet) shares its target's
    // kebab-case icon name, so it needs no alias of its own.
    const names = new Set(
      ICON_MANIFEST.map(entry => `${entry.category}-${kebab(entry.name)}`),
    );
    expect(covered).toBe(names.size);
  });

  it('every alias points at an existing icon in its set', () => {
    for (const set of [sets.colored, sets.mono]) {
      for (const [name, alias] of Object.entries(set.aliases)) {
        expect(
          set.icons[alias.parent],
          `${name} → ${alias.parent}`,
        ).toBeDefined();
      }
    }
  });

  it('bodies inherit the fill declared on the source <svg> root', () => {
    for (const { iconName, mono, rootFill } of sourceRootFills()) {
      const icon = (mono ? sets.mono : sets.colored).icons[iconName];
      expect(icon?.body.startsWith(`<g fill="${rootFill}">`), iconName).toBe(
        true,
      );
    }
  });

  it('keeps brand colours that live on the root element', () => {
    // oracle/pyth.svg: <svg fill="#110F23"> with fill-less paths.
    expect(sets.colored.icons['oracle-pyth']?.body).toMatch(
      /^<g fill="#110F23"><path /,
    );
    // dex/pancake-swap.mono.svg: <svg fill="none"> with the ink on its paths.
    expect(sets.mono.icons['dex-pancake-swap-mono']?.body).toMatch(
      /^<g fill="none">/,
    );
  });

  it('internal ids are namespaced per icon', () => {
    const icon = sets.mono.icons['chain-algorand-circle-mono'];
    expect(icon?.body).toContain('id="chain-algorand-circle-mono_algo-cm-a"');
    expect(icon?.body).toContain('url(#chain-algorand-circle-mono_algo-cm-a)');
  });
});
