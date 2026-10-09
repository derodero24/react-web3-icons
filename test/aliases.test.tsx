import type { ReactElement } from 'react';
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { describe, expect, it } from 'vitest';
import {
  Aptos,
  AptosMono,
  Argent,
  ArgentMono,
  Backpack,
  BackpackWallet,
  BinanceSmartChain,
  BinanceSmartChainSquare,
  Bitcoin,
  BitcoinCircle,
  BitcoinCircleMono,
  BitcoinMono,
  BnbCircle,
  BnbCircleMono,
  BnbSmartChain,
  BnbSmartChainCircle,
  BnbSmartChainCircleMono,
  BnbSmartChainSquare,
  Btc,
  BtcCircle,
  BtcCircleMono,
  BtcMono,
  Celoscan,
  CeloscanMono,
  CeloscanSquare,
  CeloscanSquareMono,
  Chainlink,
  ChainlinkMono,
  Daedalus,
  DaedalusWallet,
  EigenLayer,
  EigenLayerMono,
  Eth,
  EthCircle,
  EthCircleMono,
  Ethereum,
  EthereumCircle,
  EthereumCircleMono,
  EthereumMono,
  EthMono,
  Fantom,
  FantomMono,
  Flare,
  FlareMono,
  Gate,
  Gateio,
  GateioMono,
  GateMono,
  Jupiter,
  JupiterMono,
  Lido,
  LidoMono,
  MakerDao,
  MakerDaoMono,
  Mantle,
  MantleMono,
  OKXWallet,
  OKXWalletMono,
  OkxWallet,
  OkxWalletMono,
  Phantom,
  PhantomMono,
  PhantomSymbolMono,
  PhantomWallet,
  PhantomWalletSymbolMono,
  Rainbow,
  RainbowSymbol,
  RainbowWallet,
  RainbowWalletSymbol,
  Ready,
  ReadyMono,
  Sol,
  Solana,
  SolanaCircle,
  SolanaCircleMono,
  SolanaMono,
  SolCircle,
  SolCircleMono,
  SolMono,
  StarkNet,
  StarkNetCircle,
  StarkNetCircleMono,
  Starknet,
  StarknetCircle,
  StarknetCircleMono,
  StarknetMono,
  Stellar,
  StellarMono,
  Tron,
  TronMono,
  Uniswap,
  UniswapMono,
  Xlm,
  XlmMono,
  Yoroi,
  YoroiWallet,
} from '../src';
import {
  Apt,
  AptMono,
  Eigen,
  EigenMono,
  Flr,
  FlrMono,
  Ftm,
  FtmMono,
  Jup,
  JupMono,
  Ldo,
  LdoMono,
  Link,
  LinkMono,
  Mkr,
  MkrMono,
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
import { SafeProtocol, SafeProtocolMono } from '../src/defi';
import { Safe, SafeMono } from '../src/wallet';

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
  ['BnbCircle → BnbSmartChainCircle', BnbCircle, BnbSmartChainCircle],
  [
    'BnbCircleMono → BnbSmartChainCircleMono',
    BnbCircleMono,
    BnbSmartChainCircleMono,
  ],
  ['Btc → Bitcoin', Btc, Bitcoin],
  ['BtcCircle → BitcoinCircle', BtcCircle, BitcoinCircle],
  ['BtcCircleMono → BitcoinCircleMono', BtcCircleMono, BitcoinCircleMono],
  ['BtcMono → BitcoinMono', BtcMono, BitcoinMono],
  ['Eth → Ethereum', Eth, Ethereum],
  ['EthCircle → EthereumCircle', EthCircle, EthereumCircle],
  ['EthCircleMono → EthereumCircleMono', EthCircleMono, EthereumCircleMono],
  ['EthMono → EthereumMono', EthMono, EthereumMono],
  ['Sol → Solana', Sol, Solana],
  ['SolCircle → SolanaCircle', SolCircle, SolanaCircle],
  ['SolCircleMono → SolanaCircleMono', SolCircleMono, SolanaCircleMono],
  ['SolMono → SolanaMono', SolMono, SolanaMono],
  ['Xlm → Stellar', Xlm, Stellar],
  ['XlmMono → StellarMono', XlmMono, StellarMono],
  ['Apt → Aptos', Apt, Aptos],
  ['AptMono → AptosMono', AptMono, AptosMono],
  ['Flr → Flare', Flr, Flare],
  ['FlrMono → FlareMono', FlrMono, FlareMono],
  ['Ftm → Fantom', Ftm, Fantom],
  ['FtmMono → FantomMono', FtmMono, FantomMono],
  ['Mnt → Mantle', Mnt, Mantle],
  ['MntMono → MantleMono', MntMono, MantleMono],
  ['OpCircle → Op', OpCircle, Op],
  ['OpCircleMono → OpMono', OpCircleMono, OpMono],
  ['Trx → Tron', Trx, Tron],
  ['TrxMono → TronMono', TrxMono, TronMono],
  ['Link → Chainlink', Link, Chainlink],
  ['LinkMono → ChainlinkMono', LinkMono, ChainlinkMono],
  ['SafeProtocol → Safe', SafeProtocol, Safe],
  ['SafeProtocolMono → SafeMono', SafeProtocolMono, SafeMono],
  ['Uni → Uniswap', Uni, Uniswap],
  ['UniMono → UniswapMono', UniMono, UniswapMono],
  ['Ldo → Lido', Ldo, Lido],
  ['LdoMono → LidoMono', LdoMono, LidoMono],
  ['Eigen → EigenLayer', Eigen, EigenLayer],
  ['EigenMono → EigenLayerMono', EigenMono, EigenLayerMono],
  ['Jup → Jupiter', Jup, Jupiter],
  ['JupMono → JupiterMono', JupMono, JupiterMono],
  // v5 renames: the deprecated names render their replacement (#815)
  ['PhantomWallet → Phantom', PhantomWallet, Phantom],
  [
    'PhantomWalletSymbolMono → PhantomMono',
    PhantomWalletSymbolMono,
    PhantomMono,
  ],
  ['RainbowWallet → Rainbow', RainbowWallet, Rainbow],
  ['RainbowWalletSymbol → RainbowSymbol', RainbowWalletSymbol, RainbowSymbol],
  ['BackpackWallet → Backpack', BackpackWallet, Backpack],
  ['YoroiWallet → Yoroi', YoroiWallet, Yoroi],
  ['DaedalusWallet → Daedalus', DaedalusWallet, Daedalus],
  ['OKXWallet → OkxWallet', OKXWallet, OkxWallet],
  ['OKXWalletMono → OkxWalletMono', OKXWalletMono, OkxWalletMono],
  ['Argent → Ready', Argent, Ready],
  ['ArgentMono → ReadyMono', ArgentMono, ReadyMono],
  ['Gateio → Gate', Gateio, Gate],
  ['GateioMono → GateMono', GateioMono, GateMono],
  ['StarkNet → Starknet', StarkNet, Starknet],
  [
    'StarkNetCircleMono → StarknetCircleMono',
    StarkNetCircleMono,
    StarknetCircleMono,
  ],
  // Variants whose official artwork is the default itself: one file, one
  // component (no second copy of the same SVG).
  ['StarknetCircle → Starknet', StarknetCircle, Starknet],
  ['StarknetCircleMono → StarknetMono', StarknetCircleMono, StarknetMono],
  ['StarkNetCircle → Starknet', StarkNetCircle, Starknet],
  ['CeloscanSquare → Celoscan', CeloscanSquare, Celoscan],
  ['CeloscanSquareMono → CeloscanMono', CeloscanSquareMono, CeloscanMono],
  ['PhantomSymbolMono → PhantomMono', PhantomSymbolMono, PhantomMono],
  ['BinanceSmartChain → BnbSmartChain', BinanceSmartChain, BnbSmartChain],
  [
    'BinanceSmartChainSquare → BnbSmartChainSquare',
    BinanceSmartChainSquare,
    BnbSmartChainSquare,
  ],
  ['Mkr → MakerDao', Mkr, MakerDao],
  ['MkrMono → MakerDaoMono', MkrMono, MakerDaoMono],
] as const;

describe('Icon aliases', () => {
  it.each(aliasPairs)('%s renders identical SVG', (_label, Alias, Original) => {
    expect(normalizeGeneratedIds(renderToHtml(<Alias />))).toBe(
      normalizeGeneratedIds(renderToHtml(<Original />)),
    );
  });
});
