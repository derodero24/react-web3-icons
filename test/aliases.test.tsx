import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { describe, expect, it } from 'vitest';
import {
  Bitcoin,
  BitcoinMono,
  Btc,
  BtcMono,
  Eth,
  Ethereum,
  EthereumMono,
  EthMono,
  Stellar,
  StellarMono,
  Xlm,
  XlmMono,
} from '../src';

function renderToHtml(component: React.ReactElement): string {
  const container = document.createElement('div');
  const root = ReactDOM.createRoot(container);
  flushSync(() => {
    root.render(component);
  });
  const html = container.innerHTML;
  root.unmount();
  return html;
}

const aliasPairs = [
  ['Btc → Bitcoin', Btc, Bitcoin],
  ['BtcMono → BitcoinMono', BtcMono, BitcoinMono],
  ['Eth → Ethereum', Eth, Ethereum],
  ['EthMono → EthereumMono', EthMono, EthereumMono],
  ['Xlm → Stellar', Xlm, Stellar],
  ['XlmMono → StellarMono', XlmMono, StellarMono],
] as const;

describe('Icon aliases', () => {
  it.each(aliasPairs)('%s renders identical SVG', (_label, Alias, Original) => {
    expect(renderToHtml(<Alias />)).toBe(renderToHtml(<Original />));
  });
});
