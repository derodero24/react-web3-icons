import { describe, expect, it } from 'vitest';
import * as bridge from '../src/bridge';
import * as chain from '../src/chain';
import * as coin from '../src/coin';
import * as defi from '../src/defi';
import * as dex from '../src/dex';
import { bridgeImports } from '../src/dynamic/imports/bridge';
import { chainImports } from '../src/dynamic/imports/chain';
import { coinImports } from '../src/dynamic/imports/coin';
import { defiImports } from '../src/dynamic/imports/defi';
import { dexImports } from '../src/dynamic/imports/dex';
import { exchangeImports } from '../src/dynamic/imports/exchange';
import { oracleImports } from '../src/dynamic/imports/oracle';
import { walletImports } from '../src/dynamic/imports/wallet';
import * as exchange from '../src/exchange';
import * as oracle from '../src/oracle';
import * as wallet from '../src/wallet';

const FORWARD_REF = Symbol.for('react.forward_ref');

const CASES = [
  ['chain', chain, chainImports],
  ['coin', coin, coinImports],
  ['wallet', wallet, walletImports],
  ['exchange', exchange, exchangeImports],
  ['defi', defi, defiImports],
  ['dex', dex, dexImports],
  ['bridge', bridge, bridgeImports],
  ['oracle', oracle, oracleImports],
] as const;

describe('Per-icon dynamic import maps', () => {
  // Guards against icons added without regenerating the maps
  // (pnpm run generate-icons) — a missing entry would make the dynamic
  // component silently render its fallback.
  it.each(
    CASES,
  )('%s map covers every exported icon component', (_name, mod, imports) => {
    const componentNames = Object.entries(mod)
      .filter(
        ([, v]) =>
          (v as { $$typeof?: symbol } | null)?.$$typeof === FORWARD_REF,
      )
      .map(([n]) => n)
      .sort();
    const mapped = Object.keys(imports).sort();
    expect(mapped).toEqual(componentNames);
  });

  it('map entries load the module that exports the icon', async () => {
    // biome-ignore lint/complexity/useLiteralKeys: map has an index signature, TS requires bracket access
    const mod = await chainImports['EthereumCircleMono']?.();
    expect(Object.keys(mod ?? {})).toContain('EthereumCircleMono');
    // biome-ignore lint/complexity/useLiteralKeys: map has an index signature, TS requires bracket access
    const alias = await coinImports['BtcMono']?.();
    expect(Object.keys(alias ?? {})).toContain('BtcMono');
  });
});
