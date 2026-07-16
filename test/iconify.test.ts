import { quicklyValidateIconSet } from '@iconify/utils';
import { describe, expect, it } from 'vitest';
// @ts-expect-error — plain .mjs pipeline module without type declarations
import { buildIconifySets } from '../scripts/build-icons/emit-iconify.mjs';
import { ICON_MANIFEST } from '../src/manifest';

const sets = buildIconifySets() as {
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

  it('mono bodies inherit currentColor', () => {
    for (const [name, icon] of Object.entries(sets.mono.icons)) {
      expect(icon.body.startsWith('<g fill="currentColor">'), name).toBe(true);
    }
  });

  it('internal ids are namespaced per icon', () => {
    const icon = sets.mono.icons['chain-ethereum-circle-mono'];
    expect(icon?.body).toContain('id="chain-ethereum-circle-mono-ethc-a"');
    expect(icon?.body).toContain('url(#chain-ethereum-circle-mono-ethc-a)');
  });
});
