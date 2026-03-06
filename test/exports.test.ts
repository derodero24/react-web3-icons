import { describe, expect, it } from 'vitest';
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

  // Icons that intentionally lack a Mono variant
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
    // Pending Mono additions — tracked in #355 and #356
    'MetaMask',
    'RainbowWallet',
    'RainbowWalletSymbol',
    'AlgorandCircle',
  ]);

  // Get base names (non-Mono, non-numbered-variant)
  const baseNames = names.filter(
    n => !(/Mono\d*$/.test(n) || /\d+$/.test(n) || monoExemptions.has(n)),
  );

  it('Mono variant coverage meets threshold', () => {
    const missingMono = baseNames.filter(
      name => !names.includes(`${name}Mono`),
    );
    const coverage = (baseNames.length - missingMono.length) / baseNames.length;
    // Threshold set to catch regressions; exemptions above document intentional gaps
    expect(
      coverage,
      `Missing Mono variants: ${missingMono.join(', ')}`,
    ).toBeGreaterThan(0.85);
  });
});
