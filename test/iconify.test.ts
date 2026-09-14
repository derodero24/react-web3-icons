import { join } from 'node:path';
import { quicklyValidateIconSet } from '@iconify/utils';
import { describe, expect, it } from 'vitest';
// @ts-expect-error — plain .mjs pipeline module without type declarations
import * as iconify from '../scripts/build-icons/emit-iconify.mjs';
// @ts-expect-error — plain .mjs pipeline module without type declarations
import { CATEGORIES, loadCategory } from '../scripts/build-icons/lib.mjs';
import { ICON_MANIFEST } from '../src/manifest';

const ICONS = join(import.meta.dirname, '../icons');

const sets = iconify.buildIconifySets() as {
  colored: Record<string, unknown> & {
    icons: Record<string, { body: string }>;
    aliases: Record<string, { parent: string }>;
    info: { total: number };
  };
  mono: Record<string, unknown> & {
    icons: Record<string, { body: string }>;
    aliases: Record<string, { parent: string }>;
    info: { total: number };
  };
};

interface SourceUnit {
  meta: { name: string; kind: string };
  svgs: Record<string, string>;
}

const loadUnits = loadCategory as (
  iconsDir: string,
  category: string,
) => SourceUnit[];

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
  return (CATEGORIES as string[]).flatMap(category =>
    loadUnits(ICONS, category)
      .filter(unit => unit.meta.kind === 'icon' || unit.meta.kind === 'custom')
      .flatMap(unit =>
        Object.entries(unit.svgs).flatMap(([suffix, svgText]) => {
          const mono = suffix.endsWith('Mono');
          const rootFill =
            /<svg\b[^>]*\bfill="([^"]*)"/.exec(svgText)?.[1] ??
            (mono ? 'currentColor' : undefined);
          if (rootFill === undefined) {
            return [];
          }
          const iconName = `${category}-${(iconify.kebab as (n: string) => string)(unit.meta.name + suffix)}`;
          return [{ iconName, mono, rootFill }];
        }),
      ),
  );
}

describe('IconifyJSON collections', () => {
  it('both sets pass Iconify validation', () => {
    expect(quicklyValidateIconSet(sets.colored)).not.toBeNull();
    expect(quicklyValidateIconSet(sets.mono)).not.toBeNull();
  });

  it('covers every icon export as an icon or alias', () => {
    const covered =
      Object.keys(sets.colored.icons).length +
      Object.keys(sets.colored.aliases).length +
      Object.keys(sets.mono.icons).length +
      Object.keys(sets.mono.aliases).length;
    expect(covered).toBe(ICON_MANIFEST.length);
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
    // chain/ton.svg: <svg fill="#0098EA"> with fill-less paths.
    expect(sets.colored.icons['chain-ton']?.body).toMatch(
      /^<g fill="#0098EA"><path /,
    );
    // storage/nft-storage.mono.svg: stroke-only art under <svg fill="none">.
    expect(sets.mono.icons['storage-nft-storage-mono']?.body).toMatch(
      /^<g fill="none">/,
    );
  });

  it('internal ids are namespaced per icon', () => {
    const icon = sets.mono.icons['chain-ethereum-circle-mono'];
    expect(icon?.body).toContain('id="chain-ethereum-circle-mono-ethc-a"');
    expect(icon?.body).toContain('url(#chain-ethereum-circle-mono-ethc-a)');
  });
});
