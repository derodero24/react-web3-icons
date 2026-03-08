import { describe, expect, it } from 'vitest';
import * as chain from '../src/chain';
import * as coin from '../src/coin';
import {
  CHAIN_ID_TO_NAME,
  CHAIN_SLUG_TO_NAME,
  TICKER_TO_COIN,
} from '../src/meta';

describe('CHAIN_ID_TO_NAME', () => {
  it('maps known EVM chain IDs', () => {
    expect(CHAIN_ID_TO_NAME[1]).toBe('Ethereum');
    expect(CHAIN_ID_TO_NAME[42_161]).toBe('Arbitrum');
    expect(CHAIN_ID_TO_NAME[8453]).toBe('Base');
  });

  it('every value references an exported chain icon', () => {
    const chainNames = new Set(Object.keys(chain));
    for (const [id, name] of Object.entries(CHAIN_ID_TO_NAME)) {
      expect(
        chainNames.has(name),
        `CHAIN_ID_TO_NAME[${id}] = '${name}' is not exported from chain`,
      ).toBe(true);
    }
  });
});

describe('CHAIN_SLUG_TO_NAME', () => {
  it('maps known slugs', () => {
    expect(CHAIN_SLUG_TO_NAME.ethereum).toBe('Ethereum');
    expect(CHAIN_SLUG_TO_NAME.arbitrum).toBe('Arbitrum');
    expect(CHAIN_SLUG_TO_NAME.solana).toBe('Solana');
  });

  it('all keys are lowercase', () => {
    for (const slug of Object.keys(CHAIN_SLUG_TO_NAME)) {
      expect(slug).toBe(slug.toLowerCase());
    }
  });

  it('every value references an exported chain icon', () => {
    const chainNames = new Set(Object.keys(chain));
    for (const [slug, name] of Object.entries(CHAIN_SLUG_TO_NAME)) {
      expect(
        chainNames.has(name),
        `CHAIN_SLUG_TO_NAME['${slug}'] = '${name}' is not exported from chain`,
      ).toBe(true);
    }
  });
});

describe('TICKER_TO_COIN', () => {
  it('maps known tickers', () => {
    expect(TICKER_TO_COIN.ETH).toBe('Eth');
    expect(TICKER_TO_COIN.BTC).toBe('Btc');
    expect(TICKER_TO_COIN.SOL).toBe('Sol');
  });

  it('all keys are uppercase', () => {
    for (const ticker of Object.keys(TICKER_TO_COIN)) {
      expect(ticker).toBe(ticker.toUpperCase());
    }
  });

  it('every value references an exported coin icon', () => {
    const coinNames = new Set(Object.keys(coin));
    for (const [ticker, name] of Object.entries(TICKER_TO_COIN)) {
      expect(
        coinNames.has(name),
        `TICKER_TO_COIN['${ticker}'] = '${name}' is not exported from coin`,
      ).toBe(true);
    }
  });
});
