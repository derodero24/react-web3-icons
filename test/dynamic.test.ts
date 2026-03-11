import { describe, expect, it } from 'vitest';
import * as bridge from '../src/bridge';
import * as defi from '../src/defi';
import * as dex from '../src/dex';
import {
  resolveBridgeExportName,
  resolveChainExportName,
  resolveCoinExportName,
  resolveDefiExportName,
  resolveDexExportName,
  resolveExchangeExportName,
  resolveWalletExportName,
} from '../src/dynamic/resolve';
import * as exchange from '../src/exchange';
import * as wallet from '../src/wallet';

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

  it('every resolved name references an exported wallet icon', () => {
    const walletNames = new Set(Object.keys(wallet));
    const slugs = [
      'argent',
      'backpackwallet',
      'bitgetwallet',
      'coinbasewallet',
      'daedaluswallet',
      'enkrypt',
      'exodus',
      'imtoken',
      'keplr',
      'ledger',
      'metamask',
      'namiwallet',
      'okxwallet',
      'phantomwallet',
      'polkadotjs',
      'rabby',
      'rainbowwallet',
      'safe',
      'subwallet',
      'tangem',
      'trezor',
      'trustwallet',
      'walletconnect',
      'yoroiwallet',
      'zerion',
    ];
    for (const slug of slugs) {
      const name = resolveWalletExportName({ name: slug });
      expect(name).not.toBeNull();
      expect(
        walletNames.has(name as string),
        `wallet slug '${slug}' resolves to '${name}' which is not exported`,
      ).toBe(true);
    }
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

  it('every resolved name references an exported exchange icon', () => {
    const exchangeNames = new Set(Object.keys(exchange));
    const slugs = [
      'binance',
      'bitfinex',
      'bitget',
      'bithumb',
      'bitstamp',
      'bybit',
      'coinbase',
      'cryptocom',
      'deribit',
      'gateio',
      'gemini',
      'htx',
      'kraken',
      'kucoin',
      'mexc',
      'okx',
      'phemex',
      'upbit',
    ];
    for (const slug of slugs) {
      const name = resolveExchangeExportName({ name: slug });
      expect(name).not.toBeNull();
      expect(
        exchangeNames.has(name as string),
        `exchange slug '${slug}' resolves to '${name}' which is not exported`,
      ).toBe(true);
    }
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

  it('every resolved name references an exported defi icon', () => {
    const defiNames = new Set(Object.keys(defi));
    const slugs = [
      'aave',
      'balancer',
      'compound',
      'convex',
      'eigenlayer',
      'ethena',
      'frax',
      'gmx',
      'lido',
      'liquity',
      'makerdao',
      'morpho',
      'pendle',
      'rocketpool',
      'safeprotocol',
      'spark',
      'synthetix',
      'yearn',
    ];
    for (const slug of slugs) {
      const name = resolveDefiExportName({ name: slug });
      expect(name).not.toBeNull();
      expect(
        defiNames.has(name as string),
        `defi slug '${slug}' resolves to '${name}' which is not exported`,
      ).toBe(true);
    }
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

  it('every resolved name references an exported dex icon', () => {
    const dexNames = new Set(Object.keys(dex));
    const slugs = [
      'aerodrome',
      'camelot',
      'cowprotocol',
      'dydx',
      'ekubo',
      'hyperliquid',
      'jupiter',
      'oneinch',
      'osmosis',
      'pancakeswap',
      'raydium',
      'sushiswap',
      'uniswap',
      'velodrome',
    ];
    for (const slug of slugs) {
      const name = resolveDexExportName({ name: slug });
      expect(name).not.toBeNull();
      expect(
        dexNames.has(name as string),
        `dex slug '${slug}' resolves to '${name}' which is not exported`,
      ).toBe(true);
    }
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

  it('every resolved name references an exported bridge icon', () => {
    const bridgeNames = new Set(Object.keys(bridge));
    const slugs = [
      'across',
      'hopprotocol',
      'layerzero',
      'stargate',
      'wormhole',
    ];
    for (const slug of slugs) {
      const name = resolveBridgeExportName({ name: slug });
      expect(name).not.toBeNull();
      expect(
        bridgeNames.has(name as string),
        `bridge slug '${slug}' resolves to '${name}' which is not exported`,
      ).toBe(true);
    }
  });
});
