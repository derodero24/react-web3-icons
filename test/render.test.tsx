import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
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
import * as oracle from '../src/oracle';
import * as portfolio from '../src/portfolio';
import * as storage from '../src/storage';
import * as tracker from '../src/tracker';
import * as wallet from '../src/wallet';
import { isIconComponent } from './helpers/units';

// Iterates the category entry points rather than the root barrel: the root
// omits exports whose names collide across categories (oracle `Pyth` vs
// coin `Pyth`), and those must render too.
const CATEGORIES = {
  bridge,
  chain,
  coin,
  defi,
  devtool,
  dex,
  domain,
  exchange,
  explorer,
  marketplace,
  node,
  oracle,
  portfolio,
  storage,
  tracker,
  wallet,
};

const entries = Object.entries(CATEGORIES).flatMap(([category, mod]) =>
  Object.entries(mod).flatMap(([name, value]) =>
    isIconComponent(value) ? [[`${category}/${name}`, value] as const] : [],
  ),
);

describe('All icons render without error', () => {
  it.each(entries)('%s renders an <svg>', (_name, Component) => {
    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);
    flushSync(() => {
      root.render(<Component />);
    });
    expect(container.firstElementChild?.tagName).toBe('svg');
    root.unmount();
  });
});
