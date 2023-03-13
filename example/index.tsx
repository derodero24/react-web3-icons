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
            <icn.Btc />
            <icn.Btc2 />
            <icn.BtcMono />
            <icn.BtcMono2 />
          </div>
        </li>
        <li>
          <p>Ethereum</p>
          <div>
            <icn.Eth />
            <icn.EthMono />
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
            <icn.LooksRareToken />
            <icn.LooksRareToken2 />
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
