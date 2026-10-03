import { useState } from 'react';
// Named imports tree-shake: only these icons end up in the bundle, whether
// they come from the package root or from a category subpath.
import { Bitcoin, BitcoinCircle, Ethereum, EthereumMono } from 'react-web3-icons';
import { Arbitrum, Base } from 'react-web3-icons/chain';
// Dynamic components load one icon at a time by ticker, slug or chain ID.
import { ChainIcon, CoinIcon, WalletIcon } from 'react-web3-icons/dynamic';

const row = { display: 'flex', alignItems: 'center', gap: 16 } as const;

export function App() {
  const [symbol, setSymbol] = useState('ETH');

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>react-web3-icons</h1>

      <h2>Static icons</h2>
      {/* Icons are 1em by default, so font-size scales them. */}
      <div style={{ ...row, fontSize: 48 }}>
        <Ethereum title="Ethereum" />
        <Bitcoin title="Bitcoin" />
        <BitcoinCircle title="Bitcoin" />
        <Arbitrum title="Arbitrum" />
        <Base title="Base" />
      </div>

      <h2>Mono variants follow CSS color</h2>
      <div style={{ ...row, fontSize: 48 }}>
        <EthereumMono style={{ color: '#6366f1' }} />
        <EthereumMono style={{ color: '#16a34a' }} />
        <EthereumMono size={24} />
      </div>

      <h2>Dynamic lookup</h2>
      <label style={row}>
        Ticker
        <input
          value={symbol}
          onChange={event => setSymbol(event.target.value)}
          style={{ fontSize: 16, width: 120 }}
        />
        <CoinIcon
          symbol={symbol}
          size={40}
          title={symbol}
          fallback={<span>no icon for “{symbol}”</span>}
        />
      </label>
      <div style={{ ...row, fontSize: 40, marginTop: 16 }}>
        <ChainIcon chainId={1} title="Chain 1" />
        <ChainIcon chainId={42161} title="Chain 42161" />
        <ChainIcon name="base" variant="mono" title="Base" />
        <WalletIcon name="metamask" title="MetaMask" />
      </div>
    </main>
  );
}
