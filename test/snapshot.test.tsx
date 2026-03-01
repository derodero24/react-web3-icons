import type { ComponentType } from 'react';
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { describe, expect, it } from 'vitest';
import {
  Alchemy,
  Arbitrum,
  Bitcoin,
  Coinbase,
  CoinGecko,
  DeBank,
  Ens,
  Ethereum,
  Etherscan,
  Ipfs,
  MetaMask,
  OpenSea,
  PancakeSwap,
  Uniswap,
} from '../src';

const representatives: [string, ComponentType][] = [
  // chain
  ['Ethereum', Ethereum],
  ['Bitcoin', Bitcoin],
  ['Arbitrum', Arbitrum],
  // coin (alias) — omitted: covered by chain originals
  // devtool — no separate import needed, coverage via chain/exchange
  // dex
  ['Uniswap', Uniswap],
  ['PancakeSwap', PancakeSwap],
  // domain
  ['Ens', Ens],
  // exchange
  ['Coinbase', Coinbase],
  // explorer
  ['Etherscan', Etherscan],
  // marketplace
  ['OpenSea', OpenSea],
  // node
  ['Alchemy', Alchemy],
  // portfolio
  ['DeBank', DeBank],
  // storage
  ['Ipfs', Ipfs],
  // tracker
  ['CoinGecko', CoinGecko],
  // wallet
  ['MetaMask', MetaMask],
];

describe('Snapshot tests', () => {
  it.each(representatives)('%s matches snapshot', (_name, Component) => {
    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);
    flushSync(() => {
      root.render(<Component />);
    });
    expect(container.innerHTML).toMatchSnapshot();
    root.unmount();
  });
});
