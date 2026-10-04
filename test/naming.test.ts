// @vitest-environment node
import { describe, expect, it } from 'vitest';
import {
  CATEGORIES,
  loadCategory,
  type SourceUnit,
  unitAllExportNames,
} from '../scripts/build-icons/lib.ts';
import { deprecatedExports } from '../scripts/build-icons/meta.ts';
import { normalizeKey } from '../src/dynamic/normalize';
import { ICONS } from './helpers/units';

/**
 * The export naming rules of CONTRIBUTING.md ("Export Names", #815), checked
 * over every unit in `icons/`:
 *
 *  1. The name is the project's current official name in PascalCase, with
 *     acronyms written as words (`Okx`, `Ens`) and internal capitals kept
 *     only where the brand itself uses them (`MetaMask`).
 *  2. A category suffix (`Wallet`, `Chain`, …) is used only when it is part
 *     of the official name or avoids a clash in the root namespace.
 *  3. Coins use their ticker, except tickers shorter than two letters and
 *     the listed exceptions.
 *  4. Renamed exports stay as deprecated aliases (docs/icon-lifecycle.md),
 *     so the rules apply to current names only: deprecated exports keep
 *     the name they were published with.
 *
 * What the rules cannot derive mechanically (official spellings, brand
 * casing) is listed below with the reason; every entry must still match a
 * current export, so a list cannot go stale.
 */

const units = CATEGORIES.flatMap(category => loadCategory(ICONS, category));

/** Every export of the root namespace, deprecated ones included. */
const rootExports = new Set(units.flatMap(unitAllExportNames));

const deprecated = new Set(units.flatMap(deprecatedExports));

/** Units whose own name is a current (non-deprecated) export. */
const current = units.filter(unit => !deprecated.has(unit.meta.name));

const currentExports = units.flatMap(unit =>
  unitAllExportNames(unit).filter(name => !deprecated.has(name)),
);

const pascal = (ticker: string): string =>
  ticker.charAt(0) + ticker.slice(1).toLowerCase();

/** A coin named after one of its tickers (`Btc` for BTC). */
const isTickerNamed = (unit: SourceUnit): boolean =>
  unit.category === 'coin' &&
  (unit.meta.tickers ?? []).some(ticker => pascal(ticker) === unit.meta.name);

/** `MetaMask` → `['Meta', 'Mask']`. */
const words = (name: string): string[] => name.match(/[A-Z][a-z0-9]*/g) ?? [];

/**
 * Names the acronym rule does not cover, by unit. Their variants are
 * covered by the same entry. Empty since `ImmutableX` became `Immutable`.
 */
const ACRONYM_EXCEPTIONS = new Map<string, string>([]);

/**
 * One-word official names written with internal capitals. The capitals
 * follow the brand, not word boundaries, so the words of these names may be
 * shorter than two letters (rule 1).
 */
const BRAND_CASING = new Map<string, string>([
  ['CoinGecko', 'CoinGecko'],
  ['CoinLedger', 'CoinLedger'],
  ['CoinMarketCap', 'CoinMarketCap'],
  ['DeBank', 'DeBank'],
  ['DeBridge', 'deBridge'],
  ['DefiLlama', 'DefiLlama'],
  ['EigenLayer', 'EigenLayer'],
  ['ImToken', 'imToken'],
  ['KuCoin', 'KuCoin'],
  ['LayerZero', 'LayerZero'],
  ['LooksRare', 'LooksRare'],
  ['MetaMask', 'MetaMask'],
  ['OpBnb', 'opBNB'],
  ['OpenSea', 'OpenSea'],
  ['OpenZeppelin', 'OpenZeppelin'],
  ['PancakeSwap', 'PancakeSwap'],
  ['QuickNode', 'QuickNode'],
  ['RedStone', 'RedStone'],
  ['SubWallet', 'SubWallet'],
  ['SushiSwap', 'SushiSwap'],
  ['WalletConnect', 'WalletConnect'],
]);

/**
 * Names that are not a plain PascalCase of the official name, with the
 * official spelling. Their words may be shorter than two letters.
 */
const SPELLING_EXCEPTIONS = new Map<string, string>([
  // "ether.fi", ".js": the dot separates words.
  ['EtherFi', 'ether.fi'],
  ['EthersJs', 'ethers.js'],
  ['PolkadotJs', 'polkadot{.js}'],
  // An identifier cannot start with a digit, and "1inch" is one word, so
  // the digit is spelled out without a new word boundary (#815).
  ['Oneinch', '1inch'],
]);

/** Category words that may end an export name only as listed below. */
const CATEGORY_SUFFIX = /(?:Wallet|Chain|Protocol|Network|Exchange|Dao)$/;

type SuffixReason = { readonly official: string } | { readonly clash: string };
type CoinNameReason = 'short ticker' | 'project name';

/**
 * Names that end in a category word (rule 2): part of the official name, or
 * needed because the name without it is another export.
 */
const SUFFIXED = new Map<string, SuffixReason>([
  ['BitgetWallet', { clash: 'Bitget' }],
  ['BnbSmartChain', { official: 'BNB Smart Chain' }],
  ['CoinbaseWallet', { clash: 'Coinbase' }],
  ['CowProtocol', { official: 'CoW Protocol' }],
  ['GnosisChain', { official: 'Gnosis Chain' }],
  ['OkxWallet', { clash: 'Okx' }],
  ['SafeProtocol', { clash: 'Safe' }],
  ['SubWallet', { official: 'SubWallet' }],
  ['TrustWallet', { official: 'Trust Wallet' }],
  ['UniswapWallet', { clash: 'Uniswap' }],
  ['WorldChain', { official: 'World Chain' }],
]);

/**
 * Coins not named after a ticker (rule 3), with the reason: the ticker is
 * shorter than two letters, or the coin is named after its project.
 */
const COIN_NAME_EXCEPTIONS = new Map<string, CoinNameReason>([
  // FLR: the Flare network's token; `Flr` is its ticker alias.
  ['Flare', 'project name'],
  // MON: re-export of the chain `Monad`.
  ['Monad', 'project name'],
  // RON: re-export of the chain `Ronin`.
  ['Ronin', 'project name'],
  // S: re-export of the chain `Sonic`.
  ['Sonic', 'short ticker'],
]);

const currentNames = new Set(current.map(unit => unit.meta.name));

describe('export naming rules (#815)', () => {
  it.each([
    ['ACRONYM_EXCEPTIONS', ACRONYM_EXCEPTIONS],
    ['BRAND_CASING', BRAND_CASING],
    ['SPELLING_EXCEPTIONS', SPELLING_EXCEPTIONS],
    ['SUFFIXED', SUFFIXED],
    ['COIN_NAME_EXCEPTIONS', COIN_NAME_EXCEPTIONS],
  ] as const)('%s lists current names only', (_, list) => {
    expect([...list.keys()].filter(name => !currentNames.has(name))).toEqual(
      [],
    );
  });

  it('every current export is PascalCase with acronyms as words', () => {
    const exempt = (name: string): boolean =>
      [...ACRONYM_EXCEPTIONS.keys()].some(unit => name.startsWith(unit));
    expect(
      currentExports.filter(
        name =>
          !/^(?:[A-Z][a-z0-9]*)+$/.test(name) ||
          (/[A-Z]{2}/.test(name) && !exempt(name)),
      ),
    ).toEqual([]);
  });

  it('a word shorter than two letters is brand casing or a listed spelling', () => {
    const offenders = current
      .filter(unit => !isTickerNamed(unit))
      .map(unit => unit.meta.name)
      .filter(
        name =>
          words(name).some(word => word.replace(/\d/g, '').length <= 2) &&
          !BRAND_CASING.has(name) &&
          !SPELLING_EXCEPTIONS.has(name),
      );
    expect(offenders).toEqual([]);
  });

  it('BRAND_CASING lists names with internal capitals', () => {
    for (const name of BRAND_CASING.keys()) {
      expect(words(name).length, name).toBeGreaterThan(1);
    }
  });

  it('a category suffix is part of the official name or avoids a clash', () => {
    const suffixed = [...currentNames].filter(name =>
      CATEGORY_SUFFIX.test(name),
    );
    expect(suffixed.sort()).toEqual([...SUFFIXED.keys()].sort());
    for (const [name, reason] of SUFFIXED) {
      if ('clash' in reason) {
        expect(name.replace(CATEGORY_SUFFIX, ''), name).toBe(reason.clash);
        expect(rootExports.has(reason.clash), reason.clash).toBe(true);
      } else {
        // The official name ends in the category word.
        expect(reason.official.replace(/\W/g, ''), name).toMatch(
          new RegExp(`${name.match(CATEGORY_SUFFIX)?.[0]}$`, 'i'),
        );
      }
    }
  });

  it('a coin is named after a ticker, or listed with the reason', () => {
    const coins = current.filter(unit => unit.category === 'coin');
    expect(coins.length).toBeGreaterThan(0);
    const offenders = coins
      .filter(unit => !isTickerNamed(unit))
      .map(unit => unit.meta.name);
    expect(offenders.sort()).toEqual([...COIN_NAME_EXCEPTIONS.keys()].sort());
    for (const [name, reason] of COIN_NAME_EXCEPTIONS) {
      const unit = coins.find(coin => coin.meta.name === name);
      const tickers = unit?.meta.tickers ?? [];
      if (reason === 'short ticker') {
        // The primary ticker; legacy ones may follow (`FTM` on Sonic).
        expect(tickers[0]?.length, name).toBe(1);
      }
    }
  });

  // The name of an icon in a lookup category is one of its own keys, so
  // `<WalletIcon name="Phantom" />` finds `Phantom`.
  it('a current name with slugs resolves as one of them', () => {
    const offenders = current
      .filter(unit => (unit.meta.slugs ?? []).length > 0)
      .filter(
        unit =>
          !(unit.meta.slugs ?? []).some(
            slug => normalizeKey(slug) === normalizeKey(unit.meta.name),
          ),
      )
      .map(unit => `${unit.category}/${unit.meta.name}`);
    expect(offenders).toEqual([]);
  });

  it('deprecated exports are exempt, current ones are not', () => {
    expect(deprecated.has('OKXWallet')).toBe(true);
    expect(currentExports).not.toContain('OKXWallet');
    expect(currentExports).toContain('OkxWallet');
  });
});
