import { describe, expect, expectTypeOf, it } from 'vitest';
import type { IconName } from '../src';
import * as icons from '../src';
import { DEPRECATED_ICON_NAMES } from '../src/deprecated';

describe('Export integrity', () => {
  const entries = Object.entries(icons);
  const names = new Set(entries.map(([name]) => name));

  it('all exports are defined', () => {
    for (const [name, value] of entries) {
      expect(value, `${name} should not be undefined`).toBeDefined();
    }
  });

  it('exports at least 100 icons', () => {
    expect(entries.length).toBeGreaterThanOrEqual(100);
  });

  it('IconName covers all icon component names', () => {
    // Compile-time: IconName must be exactly the set of exported icon names
    type ExportedIconNames = Exclude<
      keyof typeof icons,
      'DEPRECATED_ICON_NAMES'
    >;
    expectTypeOf<IconName>().toEqualTypeOf<ExportedIconNames>();

    // Compile-time: arbitrary strings must NOT be assignable to IconName
    expectTypeOf<string>().not.toMatchTypeOf<IconName>();
    expectTypeOf<'NonExistentIcon'>().not.toMatchTypeOf<IconName>();

    // Runtime: confirm the set is non-empty
    const componentCount = entries.filter(([, v]) => {
      const isComponent =
        typeof v === 'function' ||
        (typeof v === 'object' && v !== null && '$$typeof' in (v as object));
      return isComponent;
    }).length;
    expect(componentCount).toBeGreaterThan(0);
  });

  it('exports TON chain variants', () => {
    expect(names.has('Ton')).toBe(true);
    expect(names.has('TonMono')).toBe(true);
  });
});

describe('Coin aliases re-export correctly', () => {
  const expectedAliases = [
    'Btc',
    'BtcCircle',
    'BtcCircleMono',
    'BtcMono',
    'Eth',
    'EthCircle',
    'EthCircleMono',
    'EthMono',
    'Xlm',
    'XlmMono',
    'Ada',
    'Arb',
    'Avax',
    'Bnb',
    'BnbCircle',
    'BnbCircleMono',
    'BnbMono',
    'Pol',
    'Sol',
    'SolCircle',
    'SolCircleMono',
    'SolMono',
    'Mkr',
    'MkrMono',
    'Sky',
    'SkyMono',
    'Gram',
    'GramMono',
    'OpCircle',
    'OpCircleMono',
  ];

  const names = new Set(Object.keys(icons));

  it.each(expectedAliases)('%s is exported', alias => {
    expect(names.has(alias), `${alias} should be exported`).toBe(true);
  });
});

describe('DEPRECATED_ICON_NAMES', () => {
  it('is exported from the root entry', () => {
    expect(icons).toHaveProperty('DEPRECATED_ICON_NAMES');
  });

  it('root re-export is the same reference as the direct import', () => {
    // Verifies the barrel export wires to the same value, not a copy or different set
    expect(icons.DEPRECATED_ICON_NAMES).toBe(DEPRECATED_ICON_NAMES);
  });

  it('contains only names that are actually exported', () => {
    const allNames = new Set(Object.keys(icons));
    for (const name of icons.DEPRECATED_ICON_NAMES) {
      expect(
        allNames.has(name),
        `${name} in DEPRECATED_ICON_NAMES but not exported`,
      ).toBe(true);
    }
  });

  it('includes known deprecated aliases', () => {
    expect(icons.DEPRECATED_ICON_NAMES.has('Fantom')).toBe(true);
    expect(icons.DEPRECATED_ICON_NAMES.has('PhantomWallet')).toBe(true);
    expect(icons.DEPRECATED_ICON_NAMES.has('OKXWallet')).toBe(true);
    expect(icons.DEPRECATED_ICON_NAMES.has('OkxWallet')).toBe(false);
  });
});

describe('Every colored icon has a Mono variant', () => {
  // Filter to forwardRef icon components only — avoids listing excluded names manually
  const forwardRefType = Symbol.for('react.forward_ref');
  const names = Object.entries(icons)
    .filter(([, v]) => {
      if (typeof v !== 'object' || v === null) {
        return false;
      }
      return (
        (v as unknown as { $$typeof?: unknown }).$$typeof === forwardRefType
      );
    })
    .map(([name]) => name);

  // Icons that are exempt from the Mono requirement.
  // To skip a missing-Mono failure, either add the variant or add an entry here with a comment.
  const monoExemptions = new Set([
    // Standalone coin icons with no monochrome mark
    'Doge',
    'Shib',
    // BlastscanLight is Blastscan's official black mark for light backgrounds
    // (the default is pale): BlastscanMono in black, so it needs no Mono of its own
    'BlastscanLight',
    // Alt/Flat variants where a Mono adds no practical value
    'CoinbaseCircleAlt',
    'LooksAlt',
    'LooksRareFlat',
    'MagicEdenFlat',
    'MagicEdenWordmarkFlat',
    'MetaMaskAlt',
    'OpenSeaAlt',
  ]);

  // Get base names (non-Mono, non-numbered-variant)
  const baseNames = names.filter(
    n =>
      !(
        /Mono\d*$/.test(n) ||
        /\d+$/.test(n) ||
        /Inverted$/.test(n) ||
        monoExemptions.has(n)
      ),
  );

  it('every non-exempt colored icon has a Mono variant', () => {
    const missingMono = baseNames.filter(
      name => !names.includes(`${name}Mono`),
    );
    // If this fails, either add the Mono variant or add an exemption above with a comment
    expect(missingMono, 'Icons missing Mono variants').toHaveLength(0);
  });
});
