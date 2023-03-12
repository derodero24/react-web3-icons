import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  Bitcoin,
  BitcoinMono,
  OpenSea,
  OpenSeaMono,
  OpenSea2,
  OpenSeaMono2,
  LooksRare,
  LooksRare2,
  LooksRareMono,
  LooksRareToken,
  LooksRareToken2,
  Bitcoin2,
  BitcoinMono2,
} from '../.';

function App() {
  return (
    <div style={{ color: '#666', fontSize: '1.5rem' }}>
      <ul>
        <li>
          <p>Bitcoin</p>
          <div>
            <Bitcoin />
            <Bitcoin2 />
            <BitcoinMono />
            <BitcoinMono2 />
          </div>
        </li>
        <li>
          <p>OpenSea</p>
          <div>
            <OpenSea />
            <OpenSea2 />
            <OpenSeaMono />
            <OpenSeaMono2 />
          </div>
        </li>
        <li>
          <p>LooksRare</p>
          <div>
            <LooksRare />
            <LooksRare2 />
            <LooksRareMono />
            <LooksRareToken />
            <LooksRareToken2 />
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
