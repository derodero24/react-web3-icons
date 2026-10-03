// Imports exactly two icons from the package root. check-tree-shaking.mjs
// asserts that the production bundle contains no other icon. AvalancheMono
// shares its module with AvalancheCircle(Mono), whose `withBackground`
// artwork is a separate module-level function that must be dropped too.
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { AvalancheMono, Ethereum } from 'react-web3-icons';

const container = document.getElementById('root');
if (container) {
  createRoot(container).render([
    createElement(Ethereum, { key: 'eth', size: 32 }),
    createElement(AvalancheMono, { key: 'avax', size: 32 }),
  ]);
}
