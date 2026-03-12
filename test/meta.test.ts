import { describe, expect, it } from 'vitest';
import * as bridge from '../src/bridge';
import * as chain from '../src/chain';
import * as coin from '../src/coin';
import * as defi from '../src/defi';
import * as dex from '../src/dex';
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

describe('CHAIN_ID_TO_NAME', () => {
  it('maps known EVM chain IDs', () => {
    expect(CHAIN_ID_TO_NAME[1]).toBe('Ethereum');
    expect(CHAIN_ID_TO_NAME[100]).toBe('GnosisChain');
    expect(CHAIN_ID_TO_NAME[169]).toBe('MantaPacific');
    expect(CHAIN_ID_TO_NAME[252]).toBe('Fraxtal');
    expect(CHAIN_ID_TO_NAME[1088]).toBe('Metis');
    expect(CHAIN_ID_TO_NAME[2222]).toBe('Kava');
    expect(CHAIN_ID_TO_NAME[8453]).toBe('Base');
    expect(CHAIN_ID_TO_NAME[34_443]).toBe('Mode');
    expect(CHAIN_ID_TO_NAME[42_161]).toBe('Arbitrum');
    expect(CHAIN_ID_TO_NAME[42_170]).toBe('ArbitrumNova');
    expect(CHAIN_ID_TO_NAME[42_220]).toBe('Celo');
    expect(CHAIN_ID_TO_NAME[81_457]).toBe('Blast');
    expect(CHAIN_ID_TO_NAME[7_777_777]).toBe('Zora');
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
    expect(CHAIN_SLUG_TO_NAME['arbitrum-nova']).toBe('ArbitrumNova');
    expect(CHAIN_SLUG_TO_NAME.blast).toBe('Blast');
    expect(CHAIN_SLUG_TO_NAME.celestia).toBe('Celestia');
    expect(CHAIN_SLUG_TO_NAME.celo).toBe('Celo');
    expect(CHAIN_SLUG_TO_NAME['cosmos-hub']).toBe('CosmosHub');
    expect(CHAIN_SLUG_TO_NAME.fraxtal).toBe('Fraxtal');
    expect(CHAIN_SLUG_TO_NAME.gnosis).toBe('GnosisChain');
    expect(CHAIN_SLUG_TO_NAME.hedera).toBe('Hedera');
    expect(CHAIN_SLUG_TO_NAME.injective).toBe('Injective');
    expect(CHAIN_SLUG_TO_NAME.kava).toBe('Kava');
    expect(CHAIN_SLUG_TO_NAME.manta).toBe('MantaPacific');
    expect(CHAIN_SLUG_TO_NAME.metis).toBe('Metis');
    expect(CHAIN_SLUG_TO_NAME.mode).toBe('Mode');
    expect(CHAIN_SLUG_TO_NAME.solana).toBe('Solana');
    expect(CHAIN_SLUG_TO_NAME.stacks).toBe('Stacks');
    expect(CHAIN_SLUG_TO_NAME.zora).toBe('Zora');
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

describe('WALLET_SLUG_TO_NAME', () => {
  it('maps known slugs', () => {
    expect(WALLET_SLUG_TO_NAME.metamask).toBe('MetaMask');
    expect(WALLET_SLUG_TO_NAME.trustwallet).toBe('TrustWallet');
    expect(WALLET_SLUG_TO_NAME.ledger).toBe('Ledger');
  });

  it('all keys are lowercase', () => {
    for (const slug of Object.keys(WALLET_SLUG_TO_NAME)) {
      expect(slug).toBe(slug.toLowerCase());
    }
  });

  it('every value references an exported wallet icon', () => {
    const walletNames = new Set(Object.keys(wallet));
    for (const [slug, name] of Object.entries(WALLET_SLUG_TO_NAME)) {
      expect(
        walletNames.has(name),
        `WALLET_SLUG_TO_NAME['${slug}'] = '${name}' is not exported from wallet`,
      ).toBe(true);
    }
  });
});

describe('EXCHANGE_SLUG_TO_NAME', () => {
  it('maps known slugs', () => {
    expect(EXCHANGE_SLUG_TO_NAME.binance).toBe('Binance');
    expect(EXCHANGE_SLUG_TO_NAME.kraken).toBe('Kraken');
    expect(EXCHANGE_SLUG_TO_NAME.coinbase).toBe('Coinbase');
  });

  it('all keys are lowercase', () => {
    for (const slug of Object.keys(EXCHANGE_SLUG_TO_NAME)) {
      expect(slug).toBe(slug.toLowerCase());
    }
  });

  it('every value references an exported exchange icon', () => {
    const exchangeNames = new Set(Object.keys(exchange));
    for (const [slug, name] of Object.entries(EXCHANGE_SLUG_TO_NAME)) {
      expect(
        exchangeNames.has(name),
        `EXCHANGE_SLUG_TO_NAME['${slug}'] = '${name}' is not exported from exchange`,
      ).toBe(true);
    }
  });
});

describe('DEFI_SLUG_TO_NAME', () => {
  it('maps known slugs', () => {
    expect(DEFI_SLUG_TO_NAME.aave).toBe('Aave');
    expect(DEFI_SLUG_TO_NAME.lido).toBe('Lido');
    expect(DEFI_SLUG_TO_NAME.eigenlayer).toBe('EigenLayer');
  });

  it('all keys are lowercase', () => {
    for (const slug of Object.keys(DEFI_SLUG_TO_NAME)) {
      expect(slug).toBe(slug.toLowerCase());
    }
  });

  it('every value references an exported defi icon', () => {
    const defiNames = new Set(Object.keys(defi));
    for (const [slug, name] of Object.entries(DEFI_SLUG_TO_NAME)) {
      expect(
        defiNames.has(name),
        `DEFI_SLUG_TO_NAME['${slug}'] = '${name}' is not exported from defi`,
      ).toBe(true);
    }
  });
});

describe('DEX_SLUG_TO_NAME', () => {
  it('maps known slugs', () => {
    expect(DEX_SLUG_TO_NAME.uniswap).toBe('Uniswap');
    expect(DEX_SLUG_TO_NAME.sushiswap).toBe('SushiSwap');
    expect(DEX_SLUG_TO_NAME.jupiter).toBe('Jupiter');
  });

  it('all keys are lowercase', () => {
    for (const slug of Object.keys(DEX_SLUG_TO_NAME)) {
      expect(slug).toBe(slug.toLowerCase());
    }
  });

  it('every value references an exported dex icon', () => {
    const dexNames = new Set(Object.keys(dex));
    for (const [slug, name] of Object.entries(DEX_SLUG_TO_NAME)) {
      expect(
        dexNames.has(name),
        `DEX_SLUG_TO_NAME['${slug}'] = '${name}' is not exported from dex`,
      ).toBe(true);
    }
  });
});

describe('BRIDGE_SLUG_TO_NAME', () => {
  it('maps known slugs', () => {
    expect(BRIDGE_SLUG_TO_NAME.layerzero).toBe('LayerZero');
    expect(BRIDGE_SLUG_TO_NAME.wormhole).toBe('Wormhole');
    expect(BRIDGE_SLUG_TO_NAME.across).toBe('Across');
  });

  it('all keys are lowercase', () => {
    for (const slug of Object.keys(BRIDGE_SLUG_TO_NAME)) {
      expect(slug).toBe(slug.toLowerCase());
    }
  });

  it('every value references an exported bridge icon', () => {
    const bridgeNames = new Set(Object.keys(bridge));
    for (const [slug, name] of Object.entries(BRIDGE_SLUG_TO_NAME)) {
      expect(
        bridgeNames.has(name),
        `BRIDGE_SLUG_TO_NAME['${slug}'] = '${name}' is not exported from bridge`,
      ).toBe(true);
    }
  });
});

describe('ORACLE_SLUG_TO_NAME', () => {
  it('maps known slugs', () => {
    expect(ORACLE_SLUG_TO_NAME.pyth).toBe('Pyth');
    expect(ORACLE_SLUG_TO_NAME.band).toBe('Band');
    expect(ORACLE_SLUG_TO_NAME.api3).toBe('Api3');
    expect(ORACLE_SLUG_TO_NAME.redstone).toBe('RedStone');
  });

  it('all keys are lowercase', () => {
    for (const slug of Object.keys(ORACLE_SLUG_TO_NAME)) {
      expect(slug).toBe(slug.toLowerCase());
    }
  });

  it('every value references an exported oracle icon', () => {
    const oracleNames = new Set(Object.keys(oracle));
    for (const [slug, name] of Object.entries(ORACLE_SLUG_TO_NAME)) {
      expect(
        oracleNames.has(name),
        `ORACLE_SLUG_TO_NAME['${slug}'] = '${name}' is not exported from oracle`,
      ).toBe(true);
    }
  });
});
