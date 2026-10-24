// Server-only: reads the build-time catalog from disk and imports every icon
// module. Client components receive plain data (see `toSearchEntry`) and
// server-rendered icons as props, never this module.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as bridge from 'react-web3-icons/bridge';
import * as chain from 'react-web3-icons/chain';
import * as coin from 'react-web3-icons/coin';
import * as defi from 'react-web3-icons/defi';
import * as devtool from 'react-web3-icons/devtool';
import * as dex from 'react-web3-icons/dex';
import * as domain from 'react-web3-icons/domain';
import * as exchange from 'react-web3-icons/exchange';
import * as explorer from 'react-web3-icons/explorer';
import {
  ICON_MANIFEST,
  type IconCategory,
  type IconManifestEntry,
} from 'react-web3-icons/manifest';
import * as marketplace from 'react-web3-icons/marketplace';
import {
  BRIDGE_SLUG_TO_NAME,
  CHAIN_ID_TO_NAME,
  CHAIN_SLUG_TO_NAME,
  DEFI_SLUG_TO_NAME,
  DEX_SLUG_TO_NAME,
  EXCHANGE_SLUG_TO_NAME,
  ORACLE_SLUG_TO_NAME,
  TICKER_TO_COIN,
  WALLET_SLUG_TO_NAME,
} from 'react-web3-icons/meta';
import * as node from 'react-web3-icons/node';
import * as oracle from 'react-web3-icons/oracle';
import * as portfolio from 'react-web3-icons/portfolio';
import * as storage from 'react-web3-icons/storage';
import * as tracker from 'react-web3-icons/tracker';
import * as wallet from 'react-web3-icons/wallet';
import type { IconComponent } from '../types/icons';
import { CATEGORIES, type CategoryFilter, kebab } from './categories';
import type { SearchEntry } from './search';

/**
 * Category subpath modules, keyed by manifest category. `satisfies` makes a
 * category added to the manifest a type error here until it is wired up.
 */
const CATEGORY_MODULES = {
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
} satisfies Record<IconCategory, object>;

// --- Build-time data (scripts/build-icons/emit-site-catalog.ts) -----------

interface CatalogExport {
  readonly category: string;
  readonly name: string;
  readonly unit: string;
  readonly source: readonly string[];
  readonly notes: readonly string[];
  readonly target?: string;
  readonly svg: string;
}

function isStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

function isCatalogExport(value: unknown): value is CatalogExport {
  if (typeof value !== 'object' || value === null) return false;
  const v: Partial<Record<keyof CatalogExport, unknown>> = value;
  return (
    typeof v.category === 'string' &&
    typeof v.name === 'string' &&
    typeof v.unit === 'string' &&
    isStringArray(v.source) &&
    isStringArray(v.notes) &&
    (v.target === undefined || typeof v.target === 'string') &&
    typeof v.svg === 'string'
  );
}

function loadExports(): ReadonlyMap<string, CatalogExport> {
  const path = join(process.cwd(), 'src/generated/catalog.json');
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(path, 'utf-8'));
  } catch (error) {
    throw new Error(
      `${path} is missing or invalid. Run \`pnpm run catalog\` in example/ (the build and dev scripts do).`,
      { cause: error },
    );
  }
  const list =
    typeof parsed === 'object' && parsed !== null && 'exports' in parsed
      ? parsed.exports
      : undefined;
  if (!Array.isArray(list) || !list.every(isCatalogExport)) {
    throw new Error(`${path}: unexpected shape; regenerate it.`);
  }
  return new Map(list.map(item => [`${item.category}/${item.name}`, item]));
}

const EXPORTS = loadExports();

// --- Lookup keys (react-web3-icons/meta) ---------------------------------

/** The dynamic component that resolves a category's icons, and its prop. */
export interface DynamicUsage {
  readonly component: string;
  readonly prop: 'chainId' | 'name' | 'symbol';
  readonly value: string | number;
}

const SLUG_MAPS: Partial<
  Record<IconCategory, Readonly<Record<string, string>>>
> = {
  bridge: BRIDGE_SLUG_TO_NAME,
  chain: CHAIN_SLUG_TO_NAME,
  defi: DEFI_SLUG_TO_NAME,
  dex: DEX_SLUG_TO_NAME,
  exchange: EXCHANGE_SLUG_TO_NAME,
  oracle: ORACLE_SLUG_TO_NAME,
  wallet: WALLET_SLUG_TO_NAME,
};

const DYNAMIC_COMPONENT: Partial<Record<IconCategory, string>> = {
  bridge: 'BridgeIcon',
  chain: 'ChainIcon',
  coin: 'CoinIcon',
  defi: 'DefiIcon',
  dex: 'DexIcon',
  exchange: 'ExchangeIcon',
  oracle: 'OracleIcon',
  wallet: 'WalletIcon',
};

/** Inverts a key → name map into name → keys, keys in map order. */
function invert<K extends string>(
  map: Readonly<Record<K, string>>,
): ReadonlyMap<string, readonly K[]> {
  const result = new Map<string, K[]>();
  for (const key of Object.keys(map) as K[]) {
    const name = map[key];
    const list = result.get(name);
    if (list) list.push(key);
    else result.set(name, [key]);
  }
  return result;
}

const CHAIN_IDS_BY_NAME = invert(CHAIN_ID_TO_NAME);
const TICKERS_BY_NAME = invert(TICKER_TO_COIN);
const SLUGS_BY_CATEGORY = new Map(
  Object.entries(SLUG_MAPS).map(([category, map]) => [category, invert(map)]),
);

// --- The catalog ------------------------------------------------------------

export interface CatalogVariant {
  /** Export name (`EthereumCircleMono`). */
  readonly name: string;
  /** Suffix relative to the icon (`''` for the default). */
  readonly suffix: string;
  /** Human label of the suffix (`Default`, `Circle Mono`). */
  readonly label: string;
  /** Whether the variant draws in `currentColor`. */
  readonly mono: boolean;
  readonly Component: IconComponent;
  /** Standalone SVG markup, as in `dist/svg`. */
  readonly svg: string;
}

export interface CatalogIcon {
  /** `<category>/<slug>`, unique across the catalog. */
  readonly id: string;
  readonly href: string;
  readonly category: IconCategory;
  /** Kebab-case of `name`. */
  readonly slug: string;
  /** Export name of the default variant. */
  readonly name: string;
  readonly variants: readonly [CatalogVariant, ...CatalogVariant[]];
  readonly brandColor: string;
  readonly chainIds: readonly number[];
  readonly slugs: readonly string[];
  readonly tickers: readonly string[];
  readonly aliases: readonly string[];
  readonly dynamic: DynamicUsage | undefined;
  readonly source: readonly string[];
  readonly notes: readonly string[];
  /** Unit file under icons/<category>/ (`ethereum.json`). */
  readonly unitPath: string;
  /** `<category>/<name>` of the default variant's artwork, re-exports resolved. */
  readonly artwork: string;
  /**
   * Whether the "All" view lists this icon. An export name shared by several
   * categories (`Celo`) is one component, listed once.
   */
  readonly listedInAll: boolean;
}

function isIconComponent(value: unknown): value is IconComponent {
  return (
    typeof value === 'function' ||
    (typeof value === 'object' && value !== null && '$$typeof' in value)
  );
}

function getComponent(
  category: IconCategory,
  name: string,
): IconComponent | undefined {
  const source: object = CATEGORY_MODULES[category];
  const value: unknown = Object.hasOwn(source, name)
    ? Reflect.get(source, name)
    : undefined;
  return isIconComponent(value) ? value : undefined;
}

/** `CircleMono` → `Circle Mono`, `''` → `Default`. */
function suffixLabel(suffix: string): string {
  return suffix === ''
    ? 'Default'
    : suffix.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}

/** Follows re-exports to the export that owns the artwork. */
function resolveArtwork(key: string): string {
  let current = key;
  for (let depth = 0; depth < 10; depth++) {
    const target = EXPORTS.get(current)?.target;
    if (target === undefined) return current;
    current = target;
  }
  throw new Error(`re-export cycle at ${key}`);
}

function requireExport(category: IconCategory, name: string): CatalogExport {
  const item = EXPORTS.get(`${category}/${name}`);
  if (!item) {
    throw new Error(
      `${category}/${name} is in the manifest but not in the catalog; regenerate it.`,
    );
  }
  return item;
}

function buildIcon(entry: IconManifestEntry): CatalogIcon {
  const { category, name } = entry;
  const variants: CatalogVariant[] = [];
  for (const suffix of entry.variants ?? []) {
    const variantName = `${name}${suffix}`;
    const Component = getComponent(category, variantName);
    if (!Component) {
      throw new Error(`${category}/${variantName} is not exported`);
    }
    variants.push({
      name: variantName,
      suffix,
      label: suffixLabel(suffix),
      mono: suffix.endsWith('Mono'),
      Component,
      svg: requireExport(category, variantName).svg,
    });
  }
  const [first, ...rest] = variants;
  if (!first) throw new Error(`${category}/${name} has no variants`);

  const meta = requireExport(category, name);
  const artwork = resolveArtwork(`${category}/${name}`);
  // Provenance lives on the unit that owns the artwork (`Eth` → Ethereum).
  const owner = EXPORTS.get(artwork) ?? meta;
  const slug = kebab(name);
  const chainIds = (CHAIN_IDS_BY_NAME.get(name) ?? []).map(Number);
  const tickers = TICKERS_BY_NAME.get(name) ?? [];
  const slugs = SLUGS_BY_CATEGORY.get(category)?.get(name) ?? [];
  const component = DYNAMIC_COMPONENT[category];
  const [chainId] = chainIds;
  const [ticker] = tickers;
  const [firstSlug] = slugs;
  const dynamic: DynamicUsage | undefined =
    component === undefined
      ? undefined
      : chainId !== undefined
        ? { component, prop: 'chainId', value: chainId }
        : ticker !== undefined
          ? { component, prop: 'symbol', value: ticker }
          : firstSlug !== undefined
            ? { component, prop: 'name', value: firstSlug }
            : undefined;

  return {
    id: `${category}/${slug}`,
    href: `/icons/${category}/${slug}/`,
    category,
    slug,
    name,
    variants: [first, ...rest],
    brandColor: entry.brandColor ?? '#000000',
    chainIds,
    slugs,
    tickers,
    aliases: entry.aliases ?? [],
    dynamic,
    source: owner.source,
    notes: owner.notes,
    unitPath: `icons/${owner.category}/${owner.unit}.json`,
    artwork,
    listedInAll: true,
  };
}

function compareNames(a: CatalogIcon, b: CatalogIcon): number {
  // Code-unit order: identical on the server and in every browser.
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
}

function buildCatalog(): readonly CatalogIcon[] {
  const icons = ICON_MANIFEST.filter(
    entry => entry.variants !== undefined && entry.deprecated === undefined,
  )
    .map(buildIcon)
    .sort(compareNames);
  // One card per export name in "All": the entry with the most variants.
  const best = new Map<string, CatalogIcon>();
  for (const icon of icons) {
    const current = best.get(icon.name);
    if (!current || icon.variants.length > current.variants.length) {
      best.set(icon.name, icon);
    }
  }
  return icons.map(icon =>
    best.get(icon.name) === icon ? icon : { ...icon, listedInAll: false },
  );
}

export const CATALOG: readonly CatalogIcon[] = buildCatalog();

const BY_ID = new Map(CATALOG.map(icon => [icon.id, icon]));

export function getIcon(
  category: string,
  slug: string,
): CatalogIcon | undefined {
  return BY_ID.get(`${category}/${slug}`);
}

/** Icons of a category filter, sorted by name. */
export function getIcons(filter: CategoryFilter): readonly CatalogIcon[] {
  return filter === 'all'
    ? CATALOG.filter(icon => icon.listedInAll)
    : CATALOG.filter(icon => icon.category === filter);
}

/** Categories that have at least one icon, in manifest order. */
export const CATALOG_CATEGORIES: readonly IconCategory[] = CATEGORIES.filter(
  category => CATALOG.some(icon => icon.category === category),
);

/**
 * Icons that share this icon's artwork or unit in any category (`Ethereum`
 * ↔ `Eth`, `Arbitrum` ↔ `ArbitrumNova`), excluding the icon itself.
 */
export function getRelated(icon: CatalogIcon): readonly CatalogIcon[] {
  return CATALOG.filter(
    other =>
      other !== icon &&
      (other.artwork === icon.artwork || other.unitPath === icon.unitPath),
  );
}

export const STATS = {
  /** Cards in the "All" view: one per export name with variants. */
  icons: getIcons('all').length,
  /** Non-deprecated component exports. */
  components: ICON_MANIFEST.filter(entry => entry.deprecated === undefined)
    .length,
  categories: CATALOG_CATEGORIES.length,
  chainIds: Object.keys(CHAIN_ID_TO_NAME).length,
  tickers: Object.keys(TICKER_TO_COIN).length,
} as const;

/** Plain data for the client-side search (no components, no SVG). */
export function toSearchEntry(icon: CatalogIcon): SearchEntry {
  return {
    id: icon.id,
    name: icon.name.toLowerCase(),
    keys: [
      ...icon.aliases,
      ...icon.slugs,
      ...icon.tickers.map(ticker => ticker.toLowerCase()),
      ...icon.chainIds.map(String),
    ],
    hasMono: icon.variants.some(variant => variant.mono),
  };
}
