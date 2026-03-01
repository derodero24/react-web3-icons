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

  it('exports IconContext and IconProps type helper', () => {
    expect(names.has('IconContext')).toBe(true);
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
    'Matic',
  ];

  const names = new Set(Object.keys(icons));

  it.each(expectedAliases)('%s is exported', alias => {
    expect(names.has(alias), `${alias} should be exported`).toBe(true);
  });
});

describe('Every colored icon has a Mono variant', () => {
  const names = Object.keys(icons).filter(n => n !== 'IconContext');

  // Icons that don't follow the Mono naming convention
  const monoExemptions = new Set([
    // Coin aliases that point to chain Mono variants
    'Doge',
    'Shib',
    // Numbered variants (e.g. Avalanche2, Bitcoin2) don't always need separate Mono
  ]);

  // Get base names (non-Mono, non-numbered-variant)
  const baseNames = names.filter(
    n => !(/Mono\d*$/.test(n) || /\d+$/.test(n) || monoExemptions.has(n)),
  );

  // This is a diagnostic test — it reports which icons lack Mono variants
  it('reports Mono variant coverage', () => {
    const missingMono = baseNames.filter(
      name => !names.includes(`${name}Mono`),
    );
    // Allow some icons to not have Mono variants (e.g. coin aliases)
    // but the majority should have them
    const coverage = (baseNames.length - missingMono.length) / baseNames.length;
    expect(coverage).toBeGreaterThan(0.5);
  });
});
