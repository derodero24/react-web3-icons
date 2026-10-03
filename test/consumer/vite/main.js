// Imports exactly one icon from the package root. check-tree-shaking.mjs
// asserts that the production bundle contains no other icon.
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Ethereum } from 'react-web3-icons';

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(createElement(Ethereum, { size: 32 }));
}
