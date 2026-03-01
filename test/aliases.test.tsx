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
  const idMap = new Map<string, string>();
  let counter = 0;

  const getNormalizedId = (original: string): string => {
    const existing = idMap.get(original);
    if (existing) {
      return existing;
    }

    const normalized = `__id_${counter}__`;
    counter += 1;
    idMap.set(original, normalized);
    return normalized;
  };

  let normalizedHtml = html.replace(/\bid="([^"]+)"/g, (_match, id: string) => {
    return `id="${getNormalizedId(id)}"`;
  });

  normalizedHtml = normalizedHtml.replace(
    /url\(#([^)]+)\)/g,
    (_match, id: string) => `url(#${getNormalizedId(id)})`,
  );

  normalizedHtml = normalizedHtml.replace(
    /\b(href|xlink:href)="#([^"]+)"/g,
    (_match, attr: string, id: string) => `${attr}="#${getNormalizedId(id)}"`,
  );

  return normalizedHtml;
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
