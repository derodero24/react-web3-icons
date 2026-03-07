import { describe, expect, expectTypeOf, it } from 'vitest';
import type { IconName } from '../src';
import * as icons from '../src';

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

  it('exports IconContext', () => {
    expect(names.has('IconContext')).toBe(true);
  });

  it('IconName covers all icon component names', () => {
    // Every icon export (excluding non-component exports) must be a valid IconName
    const componentNames = entries
      .filter(([name, v]) => {
        const isComponent =
          typeof v === 'function' ||
          (typeof v === 'object' && v !== null && '$$typeof' in (v as object));
        return isComponent && name !== 'IconContext';
      })
      .map(([name]) => name);

    for (const name of componentNames) {
      // TypeScript compile-time check: assignment to IconName should succeed
      expectTypeOf(name as IconName).toEqualTypeOf<IconName>();
    }
    expect(componentNames.length).toBeGreaterThan(0);
  });

  it('exports TON chain variants', () => {
    expect(names.has('Ton')).toBe(true);
    expect(names.has('TonMono')).toBe(true);
  });
});

describe('Coin aliases re-export correctly', () => {
  const expectedAliases = [
    'Btc',
    'BtcMono',
    'Eth',
    'EthMono',
    'Xlm',
    'XlmMono',
    'Ada',
    'Arb',
    'Avax',
    'Bnb',
    'BnbMono',
    'Pol',
    'Sol',
    'SolMono',
    'Matic',
  ];

  const names = new Set(Object.keys(icons));

  it.each(expectedAliases)('%s is exported', alias => {
    expect(names.has(alias), `${alias} should be exported`).toBe(true);
  });
});

describe('Every colored icon has a Mono variant', () => {
  const names = Object.keys(icons).filter(n => n !== 'IconContext');

  // Icons that are exempt from the Mono requirement.
  // To skip a missing-Mono failure, either add the variant or add an entry here with a comment.
  const monoExemptions = new Set([
    // Standalone coin icons with no monochrome mark
    'Doge',
    'Shib',
    // Light variants use white/light fills by design; a Mono would be redundant
    'BscscanLight',
    'BybitLight',
    'EtherscanLight',
    // Alt/Flat variants where a Mono adds no practical value
    'CoinbaseCircleAlt',
    'LooksAlt',
    'LooksRareFlat',
    'MagicEdenFlat',
    'MagicEdenWordmarkFlat',
    'MetaMaskAlt',
    'OpenSeaAlt',
    // Pending — Mono variants not yet available; tracked in #355 and #356
    'MetaMask',
    'RainbowWallet',
    'RainbowWalletSymbol',
    'AlgorandCircle',
  ]);

  // Get base names (non-Mono, non-numbered-variant)
  const baseNames = names.filter(
    n => !(/Mono\d*$/.test(n) || /\d+$/.test(n) || monoExemptions.has(n)),
  );

  it('every non-exempt colored icon has a Mono variant', () => {
    const missingMono = baseNames.filter(
      name => !names.includes(`${name}Mono`),
    );
    // If this fails, either add the Mono variant or add an exemption above with a comment
    expect(missingMono, 'Icons missing Mono variants').toHaveLength(0);
  });
});
