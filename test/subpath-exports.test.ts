import { describe, expect, it } from 'vitest';

import * as bridge from '../src/bridge';
import * as chain from '../src/chain';
import * as coin from '../src/coin';
import * as defi from '../src/defi';
import * as devtool from '../src/devtool';
import * as dex from '../src/dex';
import * as domain from '../src/domain';
import * as exchange from '../src/exchange';
import * as explorer from '../src/explorer';
import * as marketplace from '../src/marketplace';
import * as node from '../src/node';
import * as portfolio from '../src/portfolio';
import * as storage from '../src/storage';
import * as tracker from '../src/tracker';
import * as wallet from '../src/wallet';

describe('Category module exports', () => {
  it('exports bridge category icons', () => {
    expect(Object.keys(bridge)).toContain('Wormhole');
    expect(Object.keys(bridge)).toContain('WormholeMono');
    expect(Object.keys(bridge)).toContain('Stargate');
    expect(Object.keys(bridge)).toContain('StargateMono');
    expect(Object.keys(bridge)).toContain('LayerZero');
    expect(Object.keys(bridge)).toContain('LayerZeroMono');
    expect(Object.keys(bridge)).toContain('Across');
    expect(Object.keys(bridge)).toContain('AcrossMono');
  });

  it('exports chain category icons', () => {
    expect(Object.keys(chain)).toContain('Ethereum');
    expect(Object.keys(chain)).toContain('EthereumMono');
    expect(Object.keys(chain)).toContain('Arbitrum');
    expect(Object.keys(chain)).toContain('ArbitrumMono');
  });

  it('exports coin category icons', () => {
    expect(Object.keys(coin)).toContain('Eth');
    expect(Object.keys(coin)).toContain('EthMono');
    expect(Object.keys(coin)).toContain('Btc');
    expect(Object.keys(coin)).toContain('BtcMono');
  });

  it('exports defi category icons', () => {
    expect(Object.keys(defi)).toContain('Aave');
    expect(Object.keys(defi)).toContain('AaveMono');
    expect(Object.keys(defi)).toContain('Lido');
    expect(Object.keys(defi)).toContain('LidoMono');
  });

  it('exports devtool category icons', () => {
    expect(Object.keys(devtool)).toContain('Hardhat');
    expect(Object.keys(devtool)).toContain('HardhatMono');
  });

  it('exports dex category icons', () => {
    expect(Object.keys(dex)).toContain('Uniswap');
    expect(Object.keys(dex)).toContain('UniswapMono');
    expect(Object.keys(dex)).toContain('PancakeSwap');
    expect(Object.keys(dex)).toContain('PancakeSwapMono');
  });

  it('exports domain category icons', () => {
    expect(Object.keys(domain)).toContain('Ens');
    expect(Object.keys(domain)).toContain('EnsMono');
  });

  it('exports exchange category icons', () => {
    expect(Object.keys(exchange)).toContain('Binance');
    expect(Object.keys(exchange)).toContain('BinanceMono');
    expect(Object.keys(exchange)).toContain('Coinbase');
    expect(Object.keys(exchange)).toContain('CoinbaseMono');
  });

  it('exports explorer category icons', () => {
    expect(Object.keys(explorer)).toContain('Etherscan');
    expect(Object.keys(explorer)).toContain('EtherscanMono');
  });

  it('exports marketplace category icons', () => {
    expect(Object.keys(marketplace)).toContain('OpenSea');
    expect(Object.keys(marketplace)).toContain('OpenSeaMono');
  });

  it('exports node category icons', () => {
    expect(Object.keys(node)).toContain('Alchemy');
    expect(Object.keys(node)).toContain('AlchemyMono');
    expect(Object.keys(node)).toContain('Infura');
    expect(Object.keys(node)).toContain('InfuraMono');
  });

  it('exports portfolio category icons', () => {
    expect(Object.keys(portfolio)).toContain('DeBank');
    expect(Object.keys(portfolio)).toContain('DeBankMono');
  });

  it('exports storage category icons', () => {
    expect(Object.keys(storage)).toContain('Ipfs');
    expect(Object.keys(storage)).toContain('IpfsMono');
    expect(Object.keys(storage)).toContain('Arweave');
    expect(Object.keys(storage)).toContain('ArweaveMono');
  });

  it('exports tracker category icons', () => {
    expect(Object.keys(tracker)).toContain('CoinGecko');
    expect(Object.keys(tracker)).toContain('CoinGeckoMono');
    expect(Object.keys(tracker)).toContain('CoinMarketCap');
    expect(Object.keys(tracker)).toContain('CoinMarketCapMono');
  });

  it('exports wallet category icons', () => {
    expect(Object.keys(wallet)).toContain('Argent');
    expect(Object.keys(wallet)).toContain('ArgentMono');
    expect(Object.keys(wallet)).toContain('MetaMask');
    expect(Object.keys(wallet)).toContain('CoinbaseWallet');
  });
});
