import React from 'react';
import ReactDOM from 'react-dom/client';

import { Thing } from '../.';

function App() {
  return (
    <div>
      <Thing />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
