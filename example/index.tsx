import React from 'react';
import ReactDOM from 'react-dom/client';

import * as icn from '../.';

function App() {
  return (
    <div style={{ color: '#666', fontSize: '1.5rem' }}>
      <ul>
        <li>
          <p>Bitcoin</p>
          <div>
            <icn.Bitcoin />
            <icn.Bitcoin2 />
            <icn.BitcoinMono />
            <icn.BitcoinMono2 />
          </div>
        </li>
        <li>
          <p>Ethereum</p>
          <div>
            <icn.Ethereum />
            <icn.EthereumMono />
          </div>
        </li>
        <li>
          <p>Binance Smart Chain</p>
          <div>
            <icn.BinanceSmartChain />
            <icn.BinanceSmartChainMono />
          </div>
        </li>
        <li>
          <p>Avalanche</p>
          <div>
            <icn.Avalanche />
            <icn.Avalanche2 />
          </div>
        </li>
        <li>
          <p>Algorand</p>
          <div>
            <icn.Algorand />
            <icn.Algorand2 />
            <icn.AlgorandMono />
          </div>
        </li>
        <li>
          <p>Solana</p>
          <div>
            <icn.Solana />
            <icn.SolanaMono />
          </div>
        </li>
        <li>
          <p>Polygon</p>
          <div>
            <icn.Polygon />
            <icn.PolygonMono />
          </div>
        </li>
        <li>
          <p>BTC</p>
          <div>
            <icn.Btc />
            <icn.Btc2 />
            <icn.BtcMono />
            <icn.BtcMono2 />
          </div>
        </li>
        <li>
          <p>ETH</p>
          <div>
            <icn.Eth />
            <icn.EthMono />
          </div>
        </li>
        <li>
          <p>BNB</p>
          <div>
            <icn.Bnb />
          </div>
        </li>
        <li>
          <p>LOOKS</p>
          <div>
            <icn.Looks />
            <icn.Looks2 />
          </div>
        </li>
        <li>
          <p>Binance</p>
          <div>
            <icn.Binance />
            <icn.BinanceMono />
          </div>
        </li>
        <li>
          <p>Uniswap</p>
          <div>
            <icn.Uniswap />
            <icn.UniswapMono />
          </div>
        </li>
        <li>
          <p>OpenSea</p>
          <div>
            <icn.OpenSea />
            <icn.OpenSea2 />
            <icn.OpenSeaMono />
            <icn.OpenSeaMono2 />
          </div>
        </li>
        <li>
          <p>LooksRare</p>
          <div>
            <icn.LooksRare />
            <icn.LooksRare2 />
            <icn.LooksRareMono />
          </div>
        </li>
        <li>
          <p>MetaMask</p>
          <div>
            <icn.MetaMask />
            <icn.MetaMask2 />
          </div>
        </li>
        <li>
          <p>WalletConnect</p>
          <div>
            <icn.WalletConnect />
            <icn.WalletConnectMono />
          </div>
        </li>
        <li>
          <p>Alchemy</p>
          <div>
            <icn.Alchemy />
            <icn.AlchemyMono />
          </div>
        </li>
        <li>
          <p>Pinata</p>
          <div>
            <icn.Pinata />
          </div>
        </li>
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
