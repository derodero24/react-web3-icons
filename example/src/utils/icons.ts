import * as rootExports from 'react-web3-icons';
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
import * as node from 'react-web3-icons/node';
import * as oracle from 'react-web3-icons/oracle';
import * as portfolio from 'react-web3-icons/portfolio';
import * as storage from 'react-web3-icons/storage';
import * as tracker from 'react-web3-icons/tracker';
import * as wallet from 'react-web3-icons/wallet';
import type { IconComponent } from '../types/icons';

export type { IconCategory };

/** Category filter shown in the UI: every manifest category plus "all". */
export type CategoryFilter = 'all' | IconCategory;

/**
 * Category subpath modules, keyed by manifest category. `satisfies` makes a
 * category added to the manifest a type error here until it is wired up.
 * Components are looked up per category (not from the root entry), so the
 * drawer shows the artwork of the category the manifest lists, even if a
 * name were ever reused across categories (test/manifest-sync.test.ts
 * currently requires same-name entries to be one component).
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

function isIconComponent(value: unknown): value is IconComponent {
  return (
    typeof value === 'function' ||
    (typeof value === 'object' && value !== null && '$$typeof' in value)
  );
}

function getComponent(source: object, name: string): IconComponent | undefined {
  const value: unknown = Object.hasOwn(source, name)
    ? Reflect.get(source, name)
    : undefined;
  return isIconComponent(value) ? value : undefined;
}

export interface IconVariant {
  /** Export name (e.g. `EthereumCircleMono`). */
  readonly name: string;
  /** Variant suffix relative to the group base (`''` for the primary). */
  readonly suffix: string;
  /** Whether this is a monochrome (`currentColor`) variant. */
  readonly mono: boolean;
  readonly Component: IconComponent;
}

export interface IconGroup {
  /** Base export name (e.g. `Ethereum`); unique within a category. */
  readonly base: string;
  /** Category subpath this group is exported from. */
  readonly category: IconCategory;
  /** Variants in manifest order, primary (`''` suffix) first. */
  readonly variants: readonly IconVariant[];
  /**
   * Whether `import { <base> } from 'react-web3-icons'` resolves to this
   * artwork. False when the root entry exports a different component under
   * the same name (none today; kept as a guard for future collisions).
   */
  readonly inRootEntry: boolean;
}

/** Categories in manifest order (alphabetical). */
export const ICON_CATEGORIES: readonly IconCategory[] = [
  ...new Set(ICON_MANIFEST.map(entry => entry.category)),
];

export const CATEGORY_FILTERS: readonly CategoryFilter[] = [
  'all',
  ...ICON_CATEGORIES,
];

/**
 * Every variant suffix the manifest declares (`Mono`, `CircleMono`, …),
 * longest first. Used only to attach an export that no manifest entry lists
 * among its `variants` to a sibling export in the same category.
 */
const KNOWN_SUFFIXES: readonly string[] = [
  ...new Set(
    ICON_MANIFEST.flatMap(entry => entry.variants ?? []).filter(Boolean),
  ),
].sort((a, b) => b.length - a.length);

/**
 * Code-unit order: deterministic across runtimes and locales, so the
 * prerendered grid and the client render always agree.
 */
function byBase(a: IconGroup, b: IconGroup): number {
  return a.base < b.base ? -1 : a.base > b.base ? 1 : 0;
}

function buildCategoryGroups(
  category: IconCategory,
  entries: readonly IconManifestEntry[],
): IconGroup[] {
  const categoryModule = CATEGORY_MODULES[category];
  // Deprecated exports are hidden from the demo (same set as DEPRECATED_ICON_NAMES).
  const names = new Set(
    entries.filter(entry => !entry.deprecated).map(entry => entry.name),
  );
  const suffixesByBase = new Map<string, string[]>();
  const claimed = new Set<string>();

  // 1. Icons: their entries list their variants explicitly, re-exports such
  //    as `Eth` (→ `Ethereum`) included.
  for (const entry of entries) {
    if (!entry.variants || !names.has(entry.name)) continue;
    const suffixes = entry.variants.filter(suffix =>
      names.has(`${entry.name}${suffix}`),
    );
    for (const suffix of suffixes) claimed.add(`${entry.name}${suffix}`);
    suffixesByBase.set(entry.name, suffixes);
  }

  // 2. Anything left: attach to an existing sibling base when one of the
  //    manifest's suffixes leads to it, otherwise start a new group.
  for (const name of names) {
    if (claimed.has(name)) continue;
    const suffix =
      KNOWN_SUFFIXES.find(
        s =>
          name.length > s.length &&
          name.endsWith(s) &&
          names.has(name.slice(0, -s.length)),
      ) ?? '';
    const base = name.slice(0, name.length - suffix.length);
    const suffixes = suffixesByBase.get(base);
    if (suffixes) {
      suffixes.push(suffix);
    } else {
      suffixesByBase.set(base, [suffix]);
    }
  }

  const groups: IconGroup[] = [];
  for (const [base, suffixes] of suffixesByBase) {
    // Primary first, then manifest order (step 1) / alphabetical (step 2).
    const ordered = suffixes.includes('')
      ? ['', ...suffixes.filter(suffix => suffix !== '')]
      : suffixes;
    const variants: IconVariant[] = [];
    for (const suffix of ordered) {
      const name = `${base}${suffix}`;
      const Component = getComponent(categoryModule, name);
      if (Component) {
        variants.push({
          name,
          suffix,
          mono: suffix.endsWith('Mono'),
          Component,
        });
      }
    }
    const primary = variants[0];
    if (!primary) continue;
    groups.push({
      base,
      category,
      variants,
      inRootEntry:
        getComponent(rootExports, primary.name) === primary.Component,
    });
  }
  return groups.sort(byBase);
}

/**
 * Pick the group shown in the "all" view when several categories export the
 * same base name: the one the root entry resolves to, then the one with more
 * variants, then the first category.
 */
function preferForAll(current: IconGroup, candidate: IconGroup): IconGroup {
  if (current.inRootEntry !== candidate.inRootEntry) {
    return current.inRootEntry ? current : candidate;
  }
  return candidate.variants.length > current.variants.length
    ? candidate
    : current;
}

function buildIconGroups(): ReadonlyMap<CategoryFilter, readonly IconGroup[]> {
  const entriesByCategory = new Map<IconCategory, IconManifestEntry[]>();
  for (const entry of ICON_MANIFEST) {
    const list = entriesByCategory.get(entry.category);
    if (list) {
      list.push(entry);
    } else {
      entriesByCategory.set(entry.category, [entry]);
    }
  }

  const groups = new Map<CategoryFilter, readonly IconGroup[]>();
  // Cross-category icons (e.g. `Celo` in chain + coin) appear in every
  // category that exports them, but only once in "all".
  const all = new Map<string, IconGroup>();
  for (const category of ICON_CATEGORIES) {
    const categoryGroups = buildCategoryGroups(
      category,
      entriesByCategory.get(category) ?? [],
    );
    groups.set(category, categoryGroups);
    for (const group of categoryGroups) {
      const existing = all.get(group.base);
      all.set(group.base, existing ? preferForAll(existing, group) : group);
    }
  }
  groups.set('all', [...all.values()].sort(byBase));
  return groups;
}

const ICON_GROUPS = buildIconGroups();

/**
 * Number of distinct current icons: the components of the manifest entries
 * that list `variants`, so a re-export (`Eth` → `Ethereum`) counts once.
 */
export const ICON_COUNT = new Set(
  ICON_MANIFEST.filter(entry => entry.variants && !entry.deprecated).map(
    entry => getComponent(CATEGORY_MODULES[entry.category], entry.name),
  ),
).size;

/** Icon groups for a category filter, sorted by base name. */
export function getIconGroups(filter: CategoryFilter): readonly IconGroup[] {
  return ICON_GROUPS.get(filter) ?? [];
}
