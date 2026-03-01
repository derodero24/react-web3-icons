import type { ReactElement } from 'react';
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
  GnosisSafe,
  GnosisSafeMono,
  Matic,
  MaticMono,
  Pol,
  PolMono,
  Safe,
  SafeMono,
  Stellar,
  StellarMono,
  Xlm,
  XlmMono,
} from '../src';

function renderToHtml(component: ReactElement): string {
  const container = document.createElement('div');
  const root = ReactDOM.createRoot(container);
  flushSync(() => {
    root.render(component);
  });
  const html = container.innerHTML;
  root.unmount();
  return html;
}

function normalizeGeneratedIds(html: string): string {
  const ids = Array.from(new Set(html.match(/_r_[A-Za-z0-9_-]+/g) ?? []));
  return ids.reduce(
    (acc, id, index) => acc.split(id).join(`__id_${index}__`),
    html,
  );
}

const aliasPairs = [
  ['Btc → Bitcoin', Btc, Bitcoin],
  ['BtcMono → BitcoinMono', BtcMono, BitcoinMono],
  ['Eth → Ethereum', Eth, Ethereum],
  ['EthMono → EthereumMono', EthMono, EthereumMono],
  ['Matic → Pol', Matic, Pol],
  ['MaticMono → PolMono', MaticMono, PolMono],
  ['GnosisSafe → Safe', GnosisSafe, Safe],
  ['GnosisSafeMono → SafeMono', GnosisSafeMono, SafeMono],
  ['Xlm → Stellar', Xlm, Stellar],
  ['XlmMono → StellarMono', XlmMono, StellarMono],
] as const;

describe('Icon aliases', () => {
  it.each(aliasPairs)('%s renders identical SVG', (_label, Alias, Original) => {
    expect(normalizeGeneratedIds(renderToHtml(<Alias />))).toBe(
      normalizeGeneratedIds(renderToHtml(<Original />)),
    );
  });
});
