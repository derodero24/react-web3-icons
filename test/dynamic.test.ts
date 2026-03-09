import { describe, expect, it } from 'vitest';
import {
  resolveChainExportName,
  resolveCoinExportName,
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
