import * as bridge from '../../../src/bridge';
import * as chain from '../../../src/chain';
import * as coin from '../../../src/coin';
import * as defi from '../../../src/defi';
import * as devtool from '../../../src/devtool';
import * as dex from '../../../src/dex';
import * as domain from '../../../src/domain';
import * as exchange from '../../../src/exchange';
import * as explorer from '../../../src/explorer';
import * as marketplace from '../../../src/marketplace';
import * as node from '../../../src/node';
import * as portfolio from '../../../src/portfolio';
import * as storage from '../../../src/storage';
import * as tracker from '../../../src/tracker';
import * as wallet from '../../../src/wallet';

export const ICON_CATEGORIES = [
  'all',
  'bridge',
  'chain',
  'coin',
  'defi',
  'devtool',
  'dex',
  'domain',
  'exchange',
  'explorer',
  'marketplace',
  'node',
  'portfolio',
  'storage',
  'tracker',
  'wallet',
] as const;

export type IconCategory = (typeof ICON_CATEGORIES)[number];

// Deprecated aliases — excluded to avoid showing duplicate icons in the example
const DEPRECATED = new Set([
  'Matic',
  'MaticCircle',
  'MaticMono',
  'MaticCircleMono',
  'GnosisSafe',
  'GnosisSafeMono',
]);
const filter = (keys: string[]) => keys.filter(k => !DEPRECATED.has(k));

const bridgeIcons = filter(Object.keys(bridge)).sort();
const chainIcons = filter(Object.keys(chain)).sort();
const coinIcons = filter(Object.keys(coin)).sort();
const defiIcons = filter(Object.keys(defi)).sort();
const devtoolIcons = filter(Object.keys(devtool)).sort();
const dexIcons = filter(Object.keys(dex)).sort();
const domainIcons = filter(Object.keys(domain)).sort();
const exchangeIcons = filter(Object.keys(exchange)).sort();
const explorerIcons = filter(Object.keys(explorer)).sort();
const marketplaceIcons = filter(Object.keys(marketplace)).sort();
const nodeIcons = filter(Object.keys(node)).sort();
const portfolioIcons = filter(Object.keys(portfolio)).sort();
const storageIcons = filter(Object.keys(storage)).sort();
const trackerIcons = filter(Object.keys(tracker)).sort();
const walletIcons = filter(Object.keys(wallet)).sort();

export const REACT_WEB3_ICONS: Record<IconCategory, string[]> = {
  all: [
    ...bridgeIcons,
    ...chainIcons,
    ...coinIcons,
    ...defiIcons,
    ...devtoolIcons,
    ...dexIcons,
    ...domainIcons,
    ...exchangeIcons,
    ...explorerIcons,
    ...marketplaceIcons,
    ...nodeIcons,
    ...portfolioIcons,
    ...storageIcons,
    ...trackerIcons,
    ...walletIcons,
  ].sort(),
  bridge: bridgeIcons,
  chain: chainIcons,
  coin: coinIcons,
  defi: defiIcons,
  devtool: devtoolIcons,
  dex: dexIcons,
  domain: domainIcons,
  exchange: exchangeIcons,
  explorer: explorerIcons,
  marketplace: marketplaceIcons,
  node: nodeIcons,
  portfolio: portfolioIcons,
  storage: storageIcons,
  tracker: trackerIcons,
  wallet: walletIcons,
};
