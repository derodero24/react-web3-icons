// Client-safe category data: no icon modules are imported here.

import type { IconCategory } from 'react-web3-icons/manifest';

export type { IconCategory };

/** Every manifest category, alphabetical like the package subpaths. */
export const CATEGORIES = [
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
  'oracle',
  'portfolio',
  'storage',
  'tracker',
  'wallet',
] as const satisfies readonly IconCategory[];

type AssertTrue<T extends true> = T;

/** Fails the type check when the manifest gains a category not listed above. */
export type CategoriesComplete = AssertTrue<
  [Exclude<IconCategory, (typeof CATEGORIES)[number]>] extends [never]
    ? true
    : false
>;

/** Category filter of the gallery: every category plus "all". */
export type CategoryFilter = 'all' | IconCategory;

export function isCategory(value: string): value is IconCategory {
  return (CATEGORIES as readonly string[]).includes(value);
}

export const CATEGORY_INFO: Readonly<
  Record<
    IconCategory,
    {
      /** Plural, for headings and tabs. */
      readonly label: string;
      /** Singular, in running text (`an Ethereum chain icon`). */
      readonly noun: string;
      readonly blurb: string;
    }
  >
> = {
  bridge: {
    label: 'Bridges',
    noun: 'bridge',
    blurb: 'Cross-chain bridges and messaging.',
  },
  chain: {
    label: 'Chains',
    noun: 'chain',
    blurb: 'L1 and L2 networks, with EVM chain IDs for lookup.',
  },
  coin: {
    label: 'Coins',
    noun: 'coin',
    blurb: 'Native coins and tokens, by ticker.',
  },
  defi: {
    label: 'DeFi',
    noun: 'DeFi',
    blurb: 'Lending, staking and yield protocols.',
  },
  devtool: {
    label: 'Dev tools',
    noun: 'dev tool',
    blurb: 'SDKs, frameworks and infrastructure.',
  },
  dex: {
    label: 'DEXs',
    noun: 'DEX',
    blurb: 'Decentralized exchanges and aggregators.',
  },
  domain: { label: 'Domains', noun: 'domain', blurb: 'Name services.' },
  exchange: {
    label: 'Exchanges',
    noun: 'exchange',
    blurb: 'Centralized exchanges.',
  },
  explorer: { label: 'Explorers', noun: 'explorer', blurb: 'Block explorers.' },
  marketplace: {
    label: 'Marketplaces',
    noun: 'marketplace',
    blurb: 'NFT marketplaces.',
  },
  node: {
    label: 'Node providers',
    noun: 'node provider',
    blurb: 'RPC and node infrastructure.',
  },
  oracle: {
    label: 'Oracles',
    noun: 'oracle',
    blurb: 'Price feeds and data oracles.',
  },
  portfolio: {
    label: 'Portfolio',
    noun: 'portfolio',
    blurb: 'Portfolio trackers and dashboards.',
  },
  storage: {
    label: 'Storage',
    noun: 'storage',
    blurb: 'Decentralized storage networks.',
  },
  tracker: {
    label: 'Trackers',
    noun: 'tracker',
    blurb: 'Market data and analytics.',
  },
  wallet: {
    label: 'Wallets',
    noun: 'wallet',
    blurb: 'Wallets, with ids that match wagmi and RainbowKit connectors.',
  },
};

/** Kebab-case of a PascalCase export name (`EthereumCircle` → `ethereum-circle`), as in scripts/build-icons/lib.ts. */
export const kebab = (name: string): string =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

export function categoryHref(filter: CategoryFilter): string {
  return filter === 'all' ? '/' : `/icons/${filter}/`;
}
