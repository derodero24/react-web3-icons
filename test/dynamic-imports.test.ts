import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import * as bridge from '../src/bridge';
import * as chain from '../src/chain';
import * as coin from '../src/coin';
import * as defi from '../src/defi';
import { DEPRECATED_ICON_NAMES } from '../src/deprecated';
import * as dex from '../src/dex';
import { variantSuffix } from '../src/dynamic/DynamicIcon';
import { bridgeImports, bridgeVariants } from '../src/dynamic/imports/bridge';
import { chainImports, chainVariants } from '../src/dynamic/imports/chain';
import { coinImports, coinVariants } from '../src/dynamic/imports/coin';
import { defiImports, defiVariants } from '../src/dynamic/imports/defi';
import { dexImports, dexVariants } from '../src/dynamic/imports/dex';
import {
  exchangeImports,
  exchangeVariants,
} from '../src/dynamic/imports/exchange';
import { oracleImports, oracleVariants } from '../src/dynamic/imports/oracle';
import { walletImports, walletVariants } from '../src/dynamic/imports/wallet';
import * as exchange from '../src/exchange';
import {
  BRIDGE_SLUG_TO_NAME,
  CHAIN_ID_TO_NAME,
  CHAIN_SLUG_TO_NAME,
  DEFI_SLUG_TO_NAME,
  DEX_SLUG_TO_NAME,
  EXCHANGE_SLUG_TO_NAME,
  ORACLE_SLUG_TO_NAME,
  TICKER_TO_COIN,
  WALLET_SLUG_TO_NAME,
} from '../src/meta';
import * as oracle from '../src/oracle';
import * as wallet from '../src/wallet';

const FORWARD_REF = Symbol.for('react.forward_ref');

const isComponent = (value: unknown): boolean =>
  (value as { $$typeof?: symbol } | null)?.$$typeof === FORWARD_REF;

/**
 * Per category: its module, import map, `variant` suffixes, and the export
 * names its lookup keys resolve to (the values of its meta maps).
 */
const CASES = [
  [
    'chain',
    chain,
    chainImports,
    chainVariants,
    [...Object.values(CHAIN_ID_TO_NAME), ...Object.values(CHAIN_SLUG_TO_NAME)],
  ],
  ['coin', coin, coinImports, coinVariants, Object.values(TICKER_TO_COIN)],
  [
    'wallet',
    wallet,
    walletImports,
    walletVariants,
    Object.values(WALLET_SLUG_TO_NAME),
  ],
  [
    'exchange',
    exchange,
    exchangeImports,
    exchangeVariants,
    Object.values(EXCHANGE_SLUG_TO_NAME),
  ],
  ['defi', defi, defiImports, defiVariants, Object.values(DEFI_SLUG_TO_NAME)],
  ['dex', dex, dexImports, dexVariants, Object.values(DEX_SLUG_TO_NAME)],
  [
    'bridge',
    bridge,
    bridgeImports,
    bridgeVariants,
    Object.values(BRIDGE_SLUG_TO_NAME),
  ],
  [
    'oracle',
    oracle,
    oracleImports,
    oracleVariants,
    Object.values(ORACLE_SLUG_TO_NAME),
  ],
] as const;

describe.each(CASES)(
  'the %s import map',
  (_name, mod, imports, variants, targets) => {
    const exported = new Map<string, unknown>(Object.entries(mod));
    const mapped = Object.keys(imports);

    it('lists only exported icon components', () => {
      expect(mapped.filter(name => !isComponent(exported.get(name)))).toEqual(
        [],
      );
    });

    // No dead entries: the generator lists exactly the exports some lookup
    // key plus some `variant` reaches, and this proves it by resolving every
    // key with every variant the component accepts.
    it('lists only exports the dynamic component can reach', () => {
      const reached = new Set<string>();
      for (const target of targets) {
        for (const variant of ['colored', 'mono', ...variants]) {
          const name = target + (variantSuffix(variant, variants) ?? '?');
          if (Object.hasOwn(imports, name)) {
            reached.add(name);
          }
        }
      }
      expect(mapped.filter(name => !reached.has(name))).toEqual([]);
    });

    // Guards against icons added without lookup keys or without
    // regenerating the maps (pnpm run generate-icons): every
    // non-deprecated component is reachable, itself or under another name
    // of the same component (coin `Flare` as `Flr`). Deprecated exports
    // are left out of the maps; no lookup key may target them.
    it('covers every non-deprecated exported icon component', () => {
      const reachable = new Set(mapped.map(name => exported.get(name)));
      const missing = [...exported]
        .filter(([, value]) => isComponent(value) && !reachable.has(value))
        .map(([name]) => name);
      expect(missing.filter(name => !DEPRECATED_ICON_NAMES.has(name))).toEqual(
        [],
      );
    });

    it('lists no deprecated export', () => {
      expect(mapped.filter(name => DEPRECATED_ICON_NAMES.has(name))).toEqual(
        [],
      );
    });
  },
);

describe.each(CASES)('%s import map loaders', (_name, mod, imports) => {
  const exported = new Map<string, unknown>(Object.entries(mod));

  // Invokes every loader, so a stale import path (or a module that no
  // longer exports the key) fails here instead of rendering the fallback.
  it.each(Object.entries(imports))(
    '%s loads the module that exports it',
    async (exportName, load) => {
      const loaded = await load();
      expect(Object.keys(loaded)).toContain(exportName);
      expect(loaded[exportName]).toBe(exported.get(exportName));
    },
  );
});

describe('README variant table', () => {
  const readme = readFileSync(
    join(import.meta.dirname, '..', 'README.md'),
    'utf-8',
  );

  // The table in "Dynamic Icon Components" is written by hand; keep it in
  // sync with the generated variant lists.
  it.each(CASES)('lists the %s variants', (name, _mod, _imports, variants) => {
    const component = `${name.charAt(0).toUpperCase()}${name.slice(1)}Icon`;
    const row = readme
      .split('\n')
      .find(line => line.startsWith('| ') && line.includes(`\`${component}\``));
    const listed = row?.split(' | ').at(-1)?.replace(/ \|$/, '');
    expect(listed).toBe(
      variants.length > 0
        ? variants.map(variant => `\`'${variant}'\``).join(', ')
        : '—',
    );
  });
});
