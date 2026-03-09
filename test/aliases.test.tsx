import type { ReactElement } from 'react';
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { describe, expect, it } from 'vitest';
import {
  Aptos,
  AptosMono,
  BasescanInverted,
  BasescanLight,
  Bitcoin,
  BitcoinMono,
  BscscanInverted,
  BscscanLight,
  Btc,
  BtcMono,
  BybitInverted,
  BybitLight,
  Chainlink,
  ChainlinkMono,
  EigenLayer,
  EigenLayerMono,
  Eth,
  EthCircle,
  EthCircleMono,
  Ethereum,
  EthereumCircle,
  EthereumCircleMono,
  EthereumMono,
  EtherscanInverted,
  EtherscanLight,
  EthMono,
  Fantom,
  FantomMono,
  GnosisSafe,
  GnosisSafeMono,
  Jupiter,
  JupiterMono,
  Lido,
  LidoMono,
  Mantle,
  MantleMono,
  Matic,
  MaticMono,
  Optimism,
  OptimismCircle,
  OptimismCircleMono,
  OptimismMono,
  Pol,
  PolMono,
  Safe,
  SafeMono,
  Sol,
  Solana,
  SolanaCircle,
  SolanaCircleMono,
  SolanaMono,
  SolCircle,
  SolCircleMono,
  SolMono,
  Stellar,
  StellarMono,
  Tron,
  TronMono,
  Uniswap,
  UniswapMono,
  Xlm,
  XlmMono,
} from '../src';
import {
  Apt,
  AptMono,
  Eigen,
  EigenMono,
  Ftm,
  FtmMono,
  Jup,
  JupMono,
  Ldo,
  LdoMono,
  Link,
  LinkMono,
  Mnt,
  MntMono,
  Op,
  OpCircle,
  OpCircleMono,
  OpMono,
  Trx,
  TrxMono,
  Uni,
  UniMono,
} from '../src/coin';

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
  ['EthCircle → EthereumCircle', EthCircle, EthereumCircle],
  ['EthCircleMono → EthereumCircleMono', EthCircleMono, EthereumCircleMono],
  ['EthMono → EthereumMono', EthMono, EthereumMono],
  ['Matic → Pol', Matic, Pol],
  ['MaticMono → PolMono', MaticMono, PolMono],
  ['GnosisSafe → Safe', GnosisSafe, Safe],
  ['GnosisSafeMono → SafeMono', GnosisSafeMono, SafeMono],
  ['Sol → Solana', Sol, Solana],
  ['SolCircle → SolanaCircle', SolCircle, SolanaCircle],
  ['SolCircleMono → SolanaCircleMono', SolCircleMono, SolanaCircleMono],
  ['SolMono → SolanaMono', SolMono, SolanaMono],
  ['Xlm → Stellar', Xlm, Stellar],
  ['XlmMono → StellarMono', XlmMono, StellarMono],
  ['Apt → Aptos', Apt, Aptos],
  ['AptMono → AptosMono', AptMono, AptosMono],
  ['Ftm → Fantom', Ftm, Fantom],
  ['FtmMono → FantomMono', FtmMono, FantomMono],
  ['Mnt → Mantle', Mnt, Mantle],
  ['MntMono → MantleMono', MntMono, MantleMono],
  ['Op → Optimism', Op, Optimism],
  ['OpCircle → OptimismCircle', OpCircle, OptimismCircle],
  ['OpCircleMono → OptimismCircleMono', OpCircleMono, OptimismCircleMono],
  ['OpMono → OptimismMono', OpMono, OptimismMono],
  ['Trx → Tron', Trx, Tron],
  ['TrxMono → TronMono', TrxMono, TronMono],
  ['Link → Chainlink', Link, Chainlink],
  ['LinkMono → ChainlinkMono', LinkMono, ChainlinkMono],
  ['Uni → Uniswap', Uni, Uniswap],
  ['UniMono → UniswapMono', UniMono, UniswapMono],
  ['Ldo → Lido', Ldo, Lido],
  ['LdoMono → LidoMono', LdoMono, LidoMono],
  ['Eigen → EigenLayer', Eigen, EigenLayer],
  ['EigenMono → EigenLayerMono', EigenMono, EigenLayerMono],
  ['Jup → Jupiter', Jup, Jupiter],
  ['JupMono → JupiterMono', JupMono, JupiterMono],
  ['BasescanLight → BasescanInverted', BasescanLight, BasescanInverted],
  ['BscscanLight → BscscanInverted', BscscanLight, BscscanInverted],
  ['BybitLight → BybitInverted', BybitLight, BybitInverted],
  ['EtherscanLight → EtherscanInverted', EtherscanLight, EtherscanInverted],
] as const;

describe('Icon aliases', () => {
  it.each(aliasPairs)('%s renders identical SVG', (_label, Alias, Original) => {
    expect(normalizeGeneratedIds(renderToHtml(<Alias />))).toBe(
      normalizeGeneratedIds(renderToHtml(<Original />)),
    );
  });
});
