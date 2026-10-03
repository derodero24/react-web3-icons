import { describe, expect, it } from 'vitest';
import {
  resolveBridgeExportName,
  resolveChainExportName,
  resolveCoinExportName,
  resolveDefiExportName,
  resolveDexExportName,
  resolveExchangeExportName,
  resolveOracleExportName,
  resolveWalletExportName,
} from '../src/dynamic/resolve';
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

describe('resolveChainExportName', () => {
  it('resolves by chain ID', () => {
    expect(resolveChainExportName({ chainId: 1 })).toBe('Ethereum');
    expect(resolveChainExportName({ chainId: 42_161 })).toBe('Arbitrum');
    expect(resolveChainExportName({ chainId: 8453 })).toBe('Base');
  });

  it('resolves mono variant by chain ID', () => {
    expect(resolveChainExportName({ chainId: 1, variant: 'mono' })).toBe(
      'EthereumMono',
    );
  });

  it('resolves by slug', () => {
    expect(resolveChainExportName({ name: 'ethereum' })).toBe('Ethereum');
    expect(resolveChainExportName({ name: 'solana' })).toBe('Solana');
    expect(resolveChainExportName({ name: 'Arbitrum' })).toBe('Arbitrum');
  });

  it('chainId takes precedence over name', () => {
    expect(resolveChainExportName({ chainId: 1, name: 'solana' })).toBe(
      'Ethereum',
    );
  });

  it('returns null for unknown identifiers', () => {
    expect(resolveChainExportName({ chainId: 999_999 })).toBeNull();
    expect(resolveChainExportName({ name: 'notachain' })).toBeNull();
    expect(resolveChainExportName({})).toBeNull();
  });
});

describe('resolveCoinExportName', () => {
  it('resolves by uppercase ticker', () => {
    expect(resolveCoinExportName({ symbol: 'ETH' })).toBe('Eth');
    expect(resolveCoinExportName({ symbol: 'BTC' })).toBe('Btc');
  });

  it('is case-insensitive', () => {
    expect(resolveCoinExportName({ symbol: 'eth' })).toBe('Eth');
    expect(resolveCoinExportName({ symbol: 'Sol' })).toBe('Sol');
  });

  it('resolves mono variant', () => {
    expect(resolveCoinExportName({ symbol: 'ETH', variant: 'mono' })).toBe(
      'EthMono',
    );
  });

  it('returns null for unknown ticker', () => {
    expect(resolveCoinExportName({ symbol: 'NOTACOIN' })).toBeNull();
  });
});

describe('resolveWalletExportName', () => {
  it('resolves known wallets', () => {
    expect(resolveWalletExportName({ name: 'metamask' })).toBe('MetaMask');
    expect(resolveWalletExportName({ name: 'rabby' })).toBe('Rabby');
    expect(resolveWalletExportName({ name: 'ledger' })).toBe('Ledger');
  });

  it('is case-insensitive', () => {
    expect(resolveWalletExportName({ name: 'MetaMask' })).toBe('MetaMask');
    expect(resolveWalletExportName({ name: 'RABBY' })).toBe('Rabby');
  });

  it('resolves mono variant', () => {
    expect(resolveWalletExportName({ name: 'metamask', variant: 'mono' })).toBe(
      'MetaMaskMono',
    );
  });

  it('returns null for unknown wallet', () => {
    expect(resolveWalletExportName({ name: 'notawallet' })).toBeNull();
  });
});

describe('resolveExchangeExportName', () => {
  it('resolves known exchanges', () => {
    expect(resolveExchangeExportName({ name: 'binance' })).toBe('Binance');
    expect(resolveExchangeExportName({ name: 'coinbase' })).toBe('Coinbase');
    expect(resolveExchangeExportName({ name: 'kraken' })).toBe('Kraken');
  });

  it('is case-insensitive', () => {
    expect(resolveExchangeExportName({ name: 'Binance' })).toBe('Binance');
    expect(resolveExchangeExportName({ name: 'KRAKEN' })).toBe('Kraken');
  });

  it('resolves mono variant', () => {
    expect(
      resolveExchangeExportName({ name: 'binance', variant: 'mono' }),
    ).toBe('BinanceMono');
  });

  it('returns null for unknown exchange', () => {
    expect(resolveExchangeExportName({ name: 'notanexchange' })).toBeNull();
  });
});

describe('resolveDefiExportName', () => {
  it('resolves known protocols', () => {
    expect(resolveDefiExportName({ name: 'aave' })).toBe('Aave');
    expect(resolveDefiExportName({ name: 'lido' })).toBe('Lido');
    expect(resolveDefiExportName({ name: 'eigenlayer' })).toBe('EigenLayer');
  });

  it('is case-insensitive', () => {
    expect(resolveDefiExportName({ name: 'Aave' })).toBe('Aave');
    expect(resolveDefiExportName({ name: 'LIDO' })).toBe('Lido');
  });

  it('resolves mono variant', () => {
    expect(resolveDefiExportName({ name: 'aave', variant: 'mono' })).toBe(
      'AaveMono',
    );
  });

  it('returns null for unknown protocol', () => {
    expect(resolveDefiExportName({ name: 'notadefi' })).toBeNull();
  });

  it('normalizes dots and hyphens in protocol names', () => {
    expect(resolveDefiExportName({ name: 'ether.fi' })).toBe('EtherFi');
    expect(resolveDefiExportName({ name: 'ether-fi' })).toBe('EtherFi');
    expect(resolveDefiExportName({ name: 'etherfi' })).toBe('EtherFi');
  });
});

describe('resolveDexExportName', () => {
  it('resolves known DEXes', () => {
    expect(resolveDexExportName({ name: 'uniswap' })).toBe('Uniswap');
    expect(resolveDexExportName({ name: 'sushiswap' })).toBe('SushiSwap');
    expect(resolveDexExportName({ name: 'jupiter' })).toBe('Jupiter');
  });

  it('is case-insensitive', () => {
    expect(resolveDexExportName({ name: 'Uniswap' })).toBe('Uniswap');
    expect(resolveDexExportName({ name: 'JUPITER' })).toBe('Jupiter');
  });

  it('resolves mono variant', () => {
    expect(resolveDexExportName({ name: 'uniswap', variant: 'mono' })).toBe(
      'UniswapMono',
    );
  });

  it('returns null for unknown DEX', () => {
    expect(resolveDexExportName({ name: 'notadex' })).toBeNull();
  });
});

describe('resolveBridgeExportName', () => {
  it('resolves known bridges', () => {
    expect(resolveBridgeExportName({ name: 'layerzero' })).toBe('LayerZero');
    expect(resolveBridgeExportName({ name: 'wormhole' })).toBe('Wormhole');
    expect(resolveBridgeExportName({ name: 'across' })).toBe('Across');
  });

  it('is case-insensitive', () => {
    expect(resolveBridgeExportName({ name: 'LayerZero' })).toBe('LayerZero');
    expect(resolveBridgeExportName({ name: 'WORMHOLE' })).toBe('Wormhole');
  });

  it('resolves mono variant', () => {
    expect(
      resolveBridgeExportName({ name: 'layerzero', variant: 'mono' }),
    ).toBe('LayerZeroMono');
  });

  it('returns null for unknown bridge', () => {
    expect(resolveBridgeExportName({ name: 'notabridge' })).toBeNull();
  });
});

describe('resolveOracleExportName', () => {
  it('resolves known oracles', () => {
    expect(resolveOracleExportName({ name: 'pyth' })).toBe('Pyth');
    expect(resolveOracleExportName({ name: 'band' })).toBe('Band');
    expect(resolveOracleExportName({ name: 'api3' })).toBe('Api3');
    expect(resolveOracleExportName({ name: 'redstone' })).toBe('RedStone');
  });

  it('is case-insensitive', () => {
    expect(resolveOracleExportName({ name: 'Pyth' })).toBe('Pyth');
    expect(resolveOracleExportName({ name: 'BAND' })).toBe('Band');
  });

  it('resolves mono variant', () => {
    expect(resolveOracleExportName({ name: 'pyth', variant: 'mono' })).toBe(
      'PythMono',
    );
  });

  it('returns null for unknown oracle', () => {
    expect(resolveOracleExportName({ name: 'notanoracle' })).toBeNull();
  });
});

// Every identifier in the meta maps must resolve to its mapped export, in any
// letter case. meta.test.ts checks that each mapped name is exported, and
// dynamic-imports.test.ts that each export is loadable.
const RESOLVERS = [
  ['chain slug', CHAIN_SLUG_TO_NAME, name => resolveChainExportName({ name })],
  ['coin ticker', TICKER_TO_COIN, symbol => resolveCoinExportName({ symbol })],
  ['wallet', WALLET_SLUG_TO_NAME, name => resolveWalletExportName({ name })],
  [
    'exchange',
    EXCHANGE_SLUG_TO_NAME,
    name => resolveExchangeExportName({ name }),
  ],
  ['defi', DEFI_SLUG_TO_NAME, name => resolveDefiExportName({ name })],
  ['dex', DEX_SLUG_TO_NAME, name => resolveDexExportName({ name })],
  ['bridge', BRIDGE_SLUG_TO_NAME, name => resolveBridgeExportName({ name })],
  ['oracle', ORACLE_SLUG_TO_NAME, name => resolveOracleExportName({ name })],
] as const satisfies readonly (readonly [
  string,
  Readonly<Record<string, string>>,
  (id: string) => string | null,
])[];

describe.each(RESOLVERS)(
  'every %s in the meta map resolves',
  (_k, map, resolve) => {
    it.each(Object.entries(map))('%s → %s', (id, name) => {
      expect(resolve(id)).toBe(name);
      expect(resolve(id.toUpperCase())).toBe(name);
      expect(resolve(id.toLowerCase())).toBe(name);
    });
  },
);

describe('every chain ID in the meta map resolves', () => {
  it.each(Object.entries(CHAIN_ID_TO_NAME))('%s → %s', (id, name) => {
    expect(resolveChainExportName({ chainId: Number(id) })).toBe(name);
  });
});
