import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
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

  it('exports IconContext', () => {
    expect(names.has('IconContext')).toBe(true);
  });

  it('IconName covers all icon component names', () => {
    // Compile-time: IconName must be exactly the set of exported icon names
    type ExportedIconNames = Exclude<keyof typeof icons, 'IconContext'>;
    expectTypeOf<IconName>().toEqualTypeOf<ExportedIconNames>();

    // Compile-time: arbitrary strings must NOT be assignable to IconName
    expectTypeOf<string>().not.toMatchTypeOf<IconName>();
    expectTypeOf<'NonExistentIcon'>().not.toMatchTypeOf<IconName>();

    // Runtime: confirm the set is non-empty
    const componentCount = entries.filter(([name, v]) => {
      const isComponent =
        typeof v === 'function' ||
        (typeof v === 'object' && v !== null && '$$typeof' in (v as object));
      return isComponent && name !== 'IconContext';
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
    expect(icons.DEPRECATED_ICON_NAMES.has('Matic')).toBe(true);
    expect(icons.DEPRECATED_ICON_NAMES.has('GnosisSafe')).toBe(true);
  });

  it('matches all @deprecated tagged exports in src/**', () => {
    // Collect all names tagged @deprecated in source files
    const srcDir = join(import.meta.dirname, '..', 'src');
    const deprecatedExportRe =
      /\/\*\*\s*@deprecated\b[^*]*\*+\/\s*export\s+(?:const|function|class)\s+(\w+)/g;

    const taggedNames = new Set<string>();
    const scanFile = (filePath: string) => {
      const source = readFileSync(filePath, 'utf-8');
      for (const match of source.matchAll(deprecatedExportRe)) {
        if (match[1]) {
          taggedNames.add(match[1]);
        }
      }
    };
    const scanDir = (dir: string) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          scanDir(fullPath);
        } else if (entry.isFile() && /\.[cm]?[jt]sx?$/.test(entry.name)) {
          scanFile(fullPath);
        }
      }
    };
    scanDir(srcDir);

    // Every @deprecated-tagged export should be in DEPRECATED_ICON_NAMES
    for (const name of taggedNames) {
      expect(
        icons.DEPRECATED_ICON_NAMES.has(name),
        `${name} is @deprecated in source but missing from DEPRECATED_ICON_NAMES`,
      ).toBe(true);
    }

    // Every name in DEPRECATED_ICON_NAMES should have a @deprecated tag in source
    for (const name of icons.DEPRECATED_ICON_NAMES) {
      expect(
        taggedNames.has(name),
        `${name} is in DEPRECATED_ICON_NAMES but has no @deprecated tag in src/**`,
      ).toBe(true);
    }
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
