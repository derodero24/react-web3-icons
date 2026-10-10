import { describe, expect, it } from 'vitest';
import { normalizeKey } from '../src/dynamic/normalize';
import {
  type Lookup,
  lookupBy,
  resolveBridgeSlug,
  resolveChain,
  resolveChainId,
  resolveChainSlug,
  resolveDefiSlug,
  resolveDexSlug,
  resolveExchangeSlug,
  resolveOracleSlug,
  resolveTicker,
  resolveWalletSlug,
} from '../src/dynamic/resolve';
import { ICON_MANIFEST, type IconCategory } from '../src/manifest';
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

describe('normalizeKey', () => {
  it.each([
    ['ethereum', 'ethereum'],
    ['Ethereum', 'ethereum'],
    ['ETH', 'eth'],
    ['arbitrum-nova', 'arbitrumnova'],
    ['Arbitrum Nova', 'arbitrumnova'],
    ['arbitrum_nova', 'arbitrumnova'],
    ['  Arbitrum \t Nova\n', 'arbitrumnova'],
    ['Ether.fi', 'etherfi'],
    ['Crypto.com', 'cryptocom'],
    ['metaMaskSDK', 'metamasksdk'],
    ['--_. .', ''],
    ['1inch', '1inch'],
  ])('%j → %j', (input, expected) => {
    expect(normalizeKey(input)).toBe(expected);
  });

  it('is idempotent', () => {
    for (const key of ['Arbitrum Nova', 'Ether.fi', 'polkadot_js']) {
      expect(normalizeKey(normalizeKey(key))).toBe(normalizeKey(key));
    }
  });
});

describe('lookupBy', () => {
  const lookup = lookupBy(
    Object.fromEntries([
      ['arbitrum-nova', 'ArbitrumNova'],
      ['ETH', 'Eth'],
    ]),
  );

  it('normalizes both the keys and the identifier', () => {
    expect(lookup('arbitrum-nova')).toBe('ArbitrumNova');
    expect(lookup('Arbitrum Nova')).toBe('ArbitrumNova');
    expect(lookup('ARBITRUM_NOVA')).toBe('ArbitrumNova');
    expect(lookup('arbitrumnova')).toBe('ArbitrumNova');
    expect(lookup('eth')).toBe('Eth');
    expect(lookup(' E.T.H ')).toBe('Eth');
  });

  it('resolves nothing for unknown keys and non-strings', () => {
    expect(lookup('arbitrum')).toBeUndefined();
    expect(lookup('')).toBeUndefined();
    for (const value of [undefined, null, 1, {}, ['eth']]) {
      expect(lookup(value)).toBeUndefined();
    }
  });

  it('does not resolve inherited object keys', () => {
    expect(lookup('constructor')).toBeUndefined();
    expect(lookup('__proto__')).toBeUndefined();
  });
});

describe('resolveChain', () => {
  it('resolves by chain ID', () => {
    expect(resolveChain({ chainId: 1 })).toBe('Ethereum');
    expect(resolveChain({ chainId: 42_161 })).toBe('Arbitrum');
    expect(resolveChain({ chainId: 42_170 })).toBe('ArbitrumNova');
    expect(resolveChain({ chainId: 1514 })).toBe('DataNetwork');
  });

  it('resolves by slug', () => {
    expect(resolveChain({ name: 'ethereum' })).toBe('Ethereum');
    expect(resolveChain({ name: 'Arbitrum Nova' })).toBe('ArbitrumNova');
    expect(resolveChain({ name: 'arbitrum-one' })).toBe('ArbitrumOne');
  });

  it('lets a known chain ID take precedence over name', () => {
    expect(resolveChain({ chainId: 1, name: 'solana' })).toBe('Ethereum');
  });

  it('falls back to name when the chain ID is unknown', () => {
    expect(resolveChain({ chainId: 999_999, name: 'solana' })).toBe('Solana');
    expect(resolveChain({ chainId: Number.NaN, name: 'base' })).toBe('Base');
  });

  it('resolves nothing when neither identifier is known', () => {
    expect(resolveChain({ chainId: 999_999 })).toBeUndefined();
    expect(resolveChain({ chainId: 999_999, name: 'nope' })).toBeUndefined();
    expect(resolveChain({ name: 'notachain' })).toBeUndefined();
    expect(resolveChain({})).toBeUndefined();
  });

  it('accepts a decimal chain ID string from untyped data', () => {
    expect(resolveChainId('8453')).toBe('Base');
    expect(resolveChainId('0x2105')).toBeUndefined();
    expect(resolveChainId(null)).toBeUndefined();
    expect(resolveChainId({})).toBeUndefined();
  });
});

describe('category lookups', () => {
  it.each([
    [resolveTicker, 'eth', 'Eth'],
    [resolveTicker, 'Sol', 'Sol'],
    // v5 renames (#815): the old keys resolve to the new icons.
    [resolveTicker, 'MKR', 'Sky'],
    [resolveTicker, 'GRAM', 'Gram'],
    [resolveTicker, 'ton', 'Gram'],
    // DATA Network (formerly Story, #706) and FDUSD (#708).
    [resolveTicker, 'DATA', 'Data'],
    [resolveTicker, 'IP', 'Data'],
    [resolveTicker, 'FDUSD', 'Fdusd'],
    [resolveChainSlug, 'data-network', 'DataNetwork'],
    [resolveChainSlug, 'data', 'DataNetwork'],
    [resolveChainSlug, 'story', 'DataNetwork'],
    [resolveDefiSlug, 'makerdao', 'Sky'],
    [resolveDexSlug, 'paraswap', 'Velora'],
    [resolveChainSlug, 'bsc', 'BnbSmartChain'],
    [resolveChainSlug, 'StarkNet', 'Starknet'],
    [resolveWalletSlug, 'MetaMask', 'MetaMask'],
    [resolveWalletSlug, 'Trust Wallet', 'TrustWallet'],
    [resolveExchangeSlug, 'Crypto.com', 'CryptoCom'],
    [resolveExchangeSlug, 'Gate.io', 'Gate'],
    [resolveExchangeSlug, 'gateio', 'Gate'],
    [resolveDefiSlug, 'ether.fi', 'EtherFi'],
    [resolveDefiSlug, 'ether-fi', 'EtherFi'],
    [resolveDefiSlug, 'Rocket Pool', 'RocketPool'],
    [resolveDexSlug, 'cow_protocol', 'CowProtocol'],
    // Before #813 only the DeFi lookup stripped "." and "-".
    [resolveBridgeSlug, 'layer-zero', 'LayerZero'],
    [resolveOracleSlug, 'RedStone', 'RedStone'],
    [resolveChainSlug, 'Cosmos Hub', 'CosmosHub'],
  ] as const)('%o(%j) → %j', (lookup: Lookup, input, expected) => {
    expect(lookup(input)).toBe(expected);
  });
});

/**
 * Connector ids as wallet libraries report them (wagmi `connector.id`,
 * RainbowKit wallet ids, CIP-30 keys) resolve to the wallet's icon.
 */
describe('wallet connector ids', () => {
  it.each([
    ['metaMask', 'MetaMask'],
    ['metaMaskSDK', 'MetaMask'],
    ['io.metamask', undefined],
    ['coinbaseWallet', 'CoinbaseWallet'],
    ['coinbaseWalletSDK', 'CoinbaseWallet'],
    ['coinbase', 'CoinbaseWallet'],
    ['walletConnect', 'WalletConnect'],
    ['wc', 'WalletConnect'],
    ['safe', 'Safe'],
    ['phantom', 'Phantom'],
    ['rainbow', 'Rainbow'],
    ['okx', 'OkxWallet'],
    ['okxWallet', 'OkxWallet'],
    ['backpack', 'Backpack'],
    ['trust', 'TrustWallet'],
    ['bitget', 'BitgetWallet'],
    ['bitKeep', 'BitgetWallet'],
    ['uniswap', 'UniswapWallet'],
    ['rabby', 'Rabby'],
    ['zerion', 'Zerion'],
    ['ledger', 'Ledger'],
    ['imToken', 'ImToken'],
    ['subWallet', 'SubWallet'],
    ['argentX', 'Ready'],
    ['polkadot-js', 'PolkadotJs'],
    // Nami was folded into Lace (Nami mode); its keys moved to Lace.
    ['nami', 'Lace'],
    ['namiwallet', 'Lace'],
    ['lace', 'Lace'],
    ['yoroi', 'Yoroi'],
    ['daedalus', 'Daedalus'],
  ])('%j → %j', (id, expected) => {
    expect(resolveWalletSlug(id)).toBe(expected);
  });
});

const DYNAMIC_LOOKUPS = {
  bridge: [BRIDGE_SLUG_TO_NAME, resolveBridgeSlug],
  chain: [CHAIN_SLUG_TO_NAME, resolveChainSlug],
  coin: [TICKER_TO_COIN, resolveTicker],
  defi: [DEFI_SLUG_TO_NAME, resolveDefiSlug],
  dex: [DEX_SLUG_TO_NAME, resolveDexSlug],
  exchange: [EXCHANGE_SLUG_TO_NAME, resolveExchangeSlug],
  oracle: [ORACLE_SLUG_TO_NAME, resolveOracleSlug],
  wallet: [WALLET_SLUG_TO_NAME, resolveWalletSlug],
} as const satisfies Partial<
  Record<IconCategory, readonly [Readonly<Record<string, string>>, Lookup]>
>;

type DynamicCategory = keyof typeof DYNAMIC_LOOKUPS;

function isDynamicCategory(
  category: IconCategory,
): category is DynamicCategory {
  return Object.hasOwn(DYNAMIC_LOOKUPS, category);
}

/** Spellings of a key that normalize to it. */
function spellings(key: string): string[] {
  const spaced = key.replace(/-/g, ' ');
  return [
    key,
    key.toUpperCase(),
    key.toLowerCase(),
    ` ${spaced} `,
    key.replace(/-/g, '_'),
    key.replace(/-/g, ''),
  ];
}

// Every key of the meta maps resolves to its mapped export in any spelling
// that normalizes to it. meta.test.ts checks that each mapped name is
// exported, and dynamic-imports.test.ts that each export is loadable.
describe.each(Object.entries(DYNAMIC_LOOKUPS))(
  'every %s key in the meta map resolves',
  (_category, [map, lookup]) => {
    it.each(Object.entries(map))('%s → %s', (key, name) => {
      for (const spelling of spellings(key)) {
        expect(lookup(spelling), spelling).toBe(name);
      }
    });
  },
);

describe('every chain ID in the meta map resolves', () => {
  it.each(Object.entries(CHAIN_ID_TO_NAME))('%s → %s', (id, name) => {
    expect(resolveChain({ chainId: Number(id) })).toBe(name);
  });
});

/**
 * Manifest aliases are search terms; the generator requires each one of a
 * dynamic category to be a lookup key of its own icon too, so it resolves
 * to it. Like the keys, the aliases of a deprecated icon belong on its
 * replacement, so no deprecated entry carries any.
 */
describe('every manifest alias of a dynamic category resolves', () => {
  const entries = ICON_MANIFEST.flatMap(entry => {
    const { category } = entry;
    return isDynamicCategory(category)
      ? (entry.aliases ?? []).map(alias => ({ entry, alias, category }))
      : [];
  });

  it('covers the aliases', () => {
    expect(entries.length).toBeGreaterThan(30);
  });

  it.each(entries)(
    '$category alias $alias → $entry.name',
    ({ entry, alias, category }) => {
      const [, lookup] = DYNAMIC_LOOKUPS[category];
      expect(entry.deprecated).toBeUndefined();
      expect(lookup(alias)).toBe(entry.name);
    },
  );
});
