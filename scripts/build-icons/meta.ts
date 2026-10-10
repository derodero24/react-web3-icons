/**
 * Identifier data derived from the unit definitions, so `icons/` is its only
 * source:
 *
 *   src/meta/index.ts     lookup maps, from each unit's `slugs`, `chainIds`
 *                         and `tickers` (and `variantLookups`)
 *   src/deprecated.ts     DEPRECATED_ICON_NAMES, from `deprecated` and the
 *                         deprecated `aliasConst` / `localAliases` entries
 *
 * The manifest (manifest.ts) reads the same data through `primaryIds()` and
 * `deprecatedExports()`.
 */

import { normalizeKey } from '../../src/dynamic/normalize.ts';
import { quote } from './jsx.ts';
import {
  type Category,
  compareStrings,
  type SourceUnit,
  unitAllExportNames,
  unitLinks,
} from './lib.ts';
import { isArtwork, type LookupKeys } from './unit.ts';

export const LOOKUP_FIELDS = ['slugs', 'chainIds', 'tickers'] as const;
export type LookupField = (typeof LOOKUP_FIELDS)[number];

/** One map of `src/meta`: a lookup field of one category → export names. */
export interface LookupMapSpec {
  readonly category: Category;
  readonly field: LookupField;
  readonly constName: string;
  readonly typeName: string;
  readonly typeDoc: string;
  /** JSDoc of the map, one string per line. */
  readonly doc: readonly string[];
}

/** A map from lowercase slugs to the exports of a category. */
function slugMap(
  category: Category,
  constName: string,
  typeName: string,
  label: string,
  namespace: string,
): LookupMapSpec {
  return {
    category,
    field: 'slugs',
    constName,
    typeName,
    typeDoc: `Lowercased ${label} slug recognized by this package.`,
    doc: [
      `Lowercased slug → ${label} icon base name.`,
      '',
      `Maps to exports from \`react-web3-icons/${category}\`:`,
      '```ts',
      `import { ${constName}, type ${typeName} } from 'react-web3-icons/meta';`,
      `import * as ${namespace} from 'react-web3-icons/${category}';`,
      '',
      `const slug = ${category}Id.toLowerCase();`,
      `const Icon = Object.hasOwn(${constName}, slug)`,
      `  ? ${namespace}[${constName}[slug as ${typeName}]]`,
      '  : null;',
      '```',
    ],
  };
}

/**
 * The maps of `src/meta`, in output order. A unit may only declare the
 * lookup fields its category has a map for.
 */
export const LOOKUP_MAPS: readonly LookupMapSpec[] = [
  {
    category: 'chain',
    field: 'chainIds',
    constName: 'CHAIN_ID_TO_NAME',
    typeName: 'ChainId',
    typeDoc: 'EVM chain ID recognized by this package.',
    doc: [
      'EVM chain ID → chain icon base name.',
      '',
      'Use with `react-web3-icons/chain` for wagmi/viem integration:',
      '```ts',
      "import { CHAIN_ID_TO_NAME, type ChainId } from 'react-web3-icons/meta';",
      "import * as chains from 'react-web3-icons/chain';",
      '',
      '// Runtime check narrows to ChainId',
      'const Icon = Object.hasOwn(CHAIN_ID_TO_NAME, chain.id)',
      '  ? chains[CHAIN_ID_TO_NAME[chain.id as ChainId]]',
      '  : null;',
      '```',
    ],
  },
  {
    category: 'chain',
    field: 'slugs',
    constName: 'CHAIN_SLUG_TO_NAME',
    typeName: 'ChainSlug',
    typeDoc: 'Lowercased chain slug recognized by this package.',
    doc: [
      'Lowercased slug → chain icon base name. Includes legacy names of',
      "rebranded chains (`'klaytn'` → `'Kaia'`).",
      '',
      'Useful for URL-based or human-readable lookups:',
      '```ts',
      "import { CHAIN_SLUG_TO_NAME } from 'react-web3-icons/meta';",
      '',
      "const name = CHAIN_SLUG_TO_NAME['arbitrum']; // 'Arbitrum'",
      '```',
    ],
  },
  {
    category: 'coin',
    field: 'tickers',
    constName: 'TICKER_TO_COIN',
    typeName: 'Ticker',
    typeDoc: 'Uppercase ticker symbol recognized by this package.',
    doc: [
      'Uppercase ticker symbol → coin icon base name.',
      '',
      'Maps to exports from `react-web3-icons/coin`:',
      '```ts',
      "import { TICKER_TO_COIN, type Ticker } from 'react-web3-icons/meta';",
      "import * as coins from 'react-web3-icons/coin';",
      '',
      'const symbol = token.symbol.toUpperCase();',
      'const Icon = Object.hasOwn(TICKER_TO_COIN, symbol)',
      '  ? coins[TICKER_TO_COIN[symbol as Ticker]]',
      '  : null;',
      '```',
    ],
  },
  slugMap('wallet', 'WALLET_SLUG_TO_NAME', 'WalletSlug', 'wallet', 'wallets'),
  slugMap(
    'exchange',
    'EXCHANGE_SLUG_TO_NAME',
    'ExchangeSlug',
    'exchange',
    'exchanges',
  ),
  slugMap('defi', 'DEFI_SLUG_TO_NAME', 'DefiSlug', 'DeFi protocol', 'defi'),
  slugMap('dex', 'DEX_SLUG_TO_NAME', 'DexSlug', 'DEX', 'dexes'),
  slugMap('bridge', 'BRIDGE_SLUG_TO_NAME', 'BridgeSlug', 'bridge', 'bridges'),
  slugMap('oracle', 'ORACLE_SLUG_TO_NAME', 'OracleSlug', 'oracle', 'oracles'),
];

/** Lookup keys a unit declares for one of its exports. */
export interface UnitLookup {
  readonly exportName: string;
  readonly keys: LookupKeys;
  /** Location of `keys` in the unit file, for error messages. */
  readonly field: string;
}

/** The unit's own lookup keys (→ `name`) and its `variantLookups`. */
export function unitLookups(unit: SourceUnit): UnitLookup[] {
  const { meta } = unit;
  const lookups: UnitLookup[] = [
    { exportName: meta.name, keys: meta, field: '' },
  ];
  if (isArtwork(meta)) {
    for (const [suffix, keys] of Object.entries(meta.variantLookups ?? {})) {
      lookups.push({
        exportName: meta.name + suffix,
        keys,
        field: `variantLookups.${suffix}.`,
      });
    }
  }
  return lookups;
}

function keysOf(
  keys: LookupKeys,
  field: LookupField,
): readonly (number | string)[] {
  return keys[field] ?? [];
}

/**
 * Export names of a unit that are deprecated: `deprecated` variants of
 * artwork units and deprecated alias consts.
 */
export function deprecatedExports(unit: SourceUnit): string[] {
  const names = unitLinks(unit)
    .filter(link => link.deprecated)
    .map(link => link.name);
  if (isArtwork(unit.meta)) {
    const variants = new Set(unit.variants.map(v => v.exportName));
    for (const name of Object.keys(unit.meta.deprecated ?? {})) {
      if (!variants.has(name)) {
        throw new Error(
          `${unit.path}: deprecated.${name} is not a variant export of ${unit.meta.name}`,
        );
      }
      names.push(name);
    }
  }
  return names;
}

/** A lookup map's entries: key → export name, in output order. */
export type LookupEntries = ReadonlyMap<number | string, string>;

interface Claim {
  /** The key as the unit declares it. */
  readonly key: number | string;
  readonly exportName: string;
  readonly path: string;
}

/**
 * What a key is unique by: chain IDs as they are, string keys after
 * {@link normalizeKey}, which the dynamic components apply to both sides.
 */
const claimOf = (key: number | string): number | string =>
  typeof key === 'number' ? key : normalizeKey(key);

/**
 * The dynamic components render `<Target>` and `<Target>Mono`, and keys of
 * a deprecated export belong on its replacement (they would break when the
 * export is removed).
 */
function assertTarget(unit: SourceUnit, lookup: UnitLookup): void {
  const exports = new Set(unitAllExportNames(unit));
  const deprecated = new Set(deprecatedExports(unit));
  const where = lookup.field ? ` in ${lookup.field.slice(0, -1)}` : '';
  for (const name of [lookup.exportName, `${lookup.exportName}Mono`]) {
    if (!exports.has(name)) {
      throw new Error(
        `${unit.path}: lookup keys${where} need an export ${name} (the dynamic components render <Target> and <Target>Mono)`,
      );
    }
    if (deprecated.has(name)) {
      throw new Error(
        `${unit.path}: lookup keys${where} target the deprecated export ${name}; move them to its replacement`,
      );
    }
  }
}

/** The map a lookup field of the unit's category feeds. */
function specFor(
  unit: SourceUnit,
  lookup: UnitLookup,
  field: LookupField,
): LookupMapSpec {
  const spec = LOOKUP_MAPS.find(
    s => s.category === unit.category && s.field === field,
  );
  if (!spec) {
    const allowed = LOOKUP_MAPS.filter(s => s.category === unit.category)
      .map(s => s.field)
      .join(', ');
    throw new Error(
      `${unit.path}: ${lookup.field}${field} is not a lookup key of the ${unit.category} category (allowed: ${allowed || 'none'})`,
    );
  }
  return spec;
}

/**
 * Records the unit's keys of one field in their map. Keys are unique, also
 * after normalization: `arbitrum-nova` and `arbitrumnova` would both match
 * the input `'Arbitrum Nova'`.
 */
function claimKeys(
  claimed: Map<number | string, Claim>,
  spec: LookupMapSpec,
  unit: SourceUnit,
  lookup: UnitLookup,
  field: LookupField,
): void {
  for (const key of keysOf(lookup.keys, field)) {
    const previous = claimed.get(claimOf(key));
    if (previous) {
      const clash =
        previous.key === key
          ? 'is already used by'
          : `normalizes to ${JSON.stringify(claimOf(key))} like ${JSON.stringify(previous.key)} of`;
      throw new Error(
        `${unit.path}: ${lookup.field}${field} ${JSON.stringify(key)} ${clash} ${previous.path} (${spec.constName} keys must be unique after normalization: lowercase, without whitespace, ".", "-" and "_")`,
      );
    }
    claimed.set(claimOf(key), {
      key,
      exportName: lookup.exportName,
      path: unit.path,
    });
  }
}

/** Exports of the unit that some lookup key resolves to. */
export function lookupTargets(unit: SourceUnit): string[] {
  return unitLookups(unit)
    .filter(lookup => LOOKUP_FIELDS.some(f => keysOf(lookup.keys, f).length))
    .map(lookup => lookup.exportName);
}

/**
 * Manifest `aliases` are search terms, but the dynamic components resolve
 * lookup keys only. So that every alias of a dynamic category still
 * resolves, and resolves to its own icon, each one must normalize to a
 * string key of the unit. Like the keys, the aliases of a deprecated icon
 * belong on its replacement (`ftm` is an alias of `Sonic`, not `Fantom`).
 */
function assertAliases(
  units: readonly SourceUnit[],
  claims: ReadonlyMap<LookupMapSpec, ReadonlyMap<number | string, Claim>>,
): void {
  for (const unit of units) {
    const specs = LOOKUP_MAPS.filter(
      s => s.category === unit.category && s.field !== 'chainIds',
    );
    const aliases = isArtwork(unit.meta) ? (unit.meta.aliases ?? []) : [];
    const own = new Set(lookupTargets(unit));
    for (const alias of specs.length > 0 ? aliases : []) {
      assertAlias(unit, own, alias, claimOfAlias(specs, claims, alias));
    }
  }
}

/** The claim of the key an alias normalizes to, in one of `specs`. */
function claimOfAlias(
  specs: readonly LookupMapSpec[],
  claims: ReadonlyMap<LookupMapSpec, ReadonlyMap<number | string, Claim>>,
  alias: string,
): Claim | undefined {
  return specs
    .map(s => claims.get(s)?.get(normalizeKey(alias)))
    .find(c => c !== undefined);
}

function assertAlias(
  unit: SourceUnit,
  own: ReadonlySet<string>,
  alias: string,
  claim: Claim | undefined,
): void {
  if (claim === undefined) {
    throw new Error(
      `${unit.path}: alias ${JSON.stringify(alias)} is not a lookup key; add it to slugs/tickers (the dynamic components resolve lookup keys only)`,
    );
  }
  if (!own.has(claim.exportName)) {
    throw new Error(
      `${unit.path}: alias ${JSON.stringify(alias)} resolves to ${claim.exportName} (key ${JSON.stringify(claim.key)} of ${claim.path}), not to this icon`,
    );
  }
}

function compareKeys(a: number | string, b: number | string): number {
  return typeof a === 'number' && typeof b === 'number'
    ? a - b
    : compareStrings(String(a), String(b));
}

/**
 * Collects every map of {@link LOOKUP_MAPS} from the units of all
 * categories. Fails on a lookup field the unit's category has no map for,
 * on a key used twice within one map (also after {@link normalizeKey}), on
 * a target that the dynamic components could not render (missing export or
 * `Mono` counterpart), and on a manifest alias that no key of the unit
 * matches (see {@link assertAliases}).
 */
export function collectLookups(
  units: readonly SourceUnit[],
): Map<LookupMapSpec, LookupEntries> {
  const claims = new Map<LookupMapSpec, Map<number | string, Claim>>();
  for (const unit of units) {
    for (const lookup of unitLookups(unit)) {
      // Presence, not key count: an empty `tickers: []` on a chain is still a
      // field the category has no map for.
      const fields = LOOKUP_FIELDS.filter(f => lookup.keys[f] !== undefined);
      if (fields.length > 0 || lookup.field !== '') {
        assertTarget(unit, lookup);
      }
      for (const field of fields) {
        const spec = specFor(unit, lookup, field);
        const claimed = claims.get(spec) ?? new Map<number | string, Claim>();
        claims.set(spec, claimed);
        claimKeys(claimed, spec, unit, lookup, field);
      }
    }
  }
  assertAliases(units, claims);
  return new Map(
    LOOKUP_MAPS.map(spec => [
      spec,
      new Map(
        [...(claims.get(spec)?.values() ?? [])]
          .sort((a, b) => compareKeys(a.key, b.key))
          .map(claim => [claim.key, claim.exportName]),
      ),
    ]),
  );
}

/** A unit export's primary identifiers, as listed in the manifest. */
export interface PrimaryIds {
  readonly chainId?: number;
  readonly slug?: string;
  readonly ticker?: string;
}

/** Export name → its first key of each lookup field (manifest `slug` etc.). */
export function primaryIds(unit: SourceUnit): Map<string, PrimaryIds> {
  const ids = new Map<string, PrimaryIds>();
  for (const { exportName, keys } of unitLookups(unit)) {
    const [chainId] = keys.chainIds ?? [];
    const [slug] = keys.slugs ?? [];
    const [ticker] = keys.tickers ?? [];
    const entry: PrimaryIds = {
      ...(chainId === undefined ? {} : { chainId }),
      ...(slug === undefined ? {} : { slug }),
      ...(ticker === undefined ? {} : { ticker }),
    };
    if (Object.keys(entry).length > 0) {
      ids.set(exportName, entry);
    }
  }
  return ids;
}

function propertyKey(key: number | string): string {
  return typeof key === 'number' || /^[A-Za-z_$][\w$]*$/.test(key)
    ? String(key)
    : quote(key);
}

function jsdoc(lines: readonly string[]): string {
  return `/**\n${lines.map(line => (line ? ` * ${line}` : ' *')).join('\n')}\n */`;
}

const HEADER = `// Auto-generated by scripts/build-icons/cli.ts from icons/<category>/<slug>.json
// — do not edit manually. Regenerate: pnpm run generate-icons
`;

/** Source of `src/meta/index.ts` (before Biome formatting). */
export function emitMeta(
  tables: ReadonlyMap<LookupMapSpec, LookupEntries>,
): string {
  const categories = [...new Set(LOOKUP_MAPS.map(spec => spec.category))].sort(
    compareStrings,
  );
  const imports = categories
    .map(category => `import type * as ${category} from '../${category}';`)
    .join('\n');
  const blocks = LOOKUP_MAPS.map(spec => {
    const entries = [...(tables.get(spec) ?? [])]
      .map(([key, name]) => `  ${propertyKey(key)}: ${quote(name)},`)
      .join('\n');
    const keyType = spec.field === 'chainIds' ? 'number' : 'string';
    return `${jsdoc(spec.doc)}
export const ${spec.constName} = {
${entries}
} as const satisfies Record<${keyType}, keyof typeof ${spec.category}>;

/** ${spec.typeDoc} */
export type ${spec.typeName} = keyof typeof ${spec.constName};`;
  });
  return `${HEADER}
${imports}

${blocks.join('\n\n')}
`;
}

/** Source of `src/deprecated.ts` (before Biome formatting). */
export function emitDeprecated(units: readonly SourceUnit[]): string {
  const groups = units.flatMap(unit => {
    const names = deprecatedExports(unit);
    return names.length === 0
      ? []
      : [
          `  // ${unit.path}\n${names.map(name => `  ${quote(name)},`).join('\n')}`,
        ];
  });
  return `${HEADER}
import type { IconName } from './utils';

/**
 * Names of all deprecated icon exports in this package.
 *
 * Use this to filter deprecated aliases from icon lists without maintaining
 * a separate copy in your app. \`has()\` accepts any string, so keys of a
 * module namespace can be tested directly.
 *
 * @example
 * \`\`\`ts
 * import * as icons from 'react-web3-icons';
 * import { DEPRECATED_ICON_NAMES } from 'react-web3-icons';
 *
 * // Get current (non-deprecated) icon names, excluding non-icon exports
 * const activeIconNames = Object.keys(icons).filter(
 *   name =>
 *     !DEPRECATED_ICON_NAMES.has(name) &&
 *     name !== 'DEPRECATED_ICON_NAMES',
 * );
 * \`\`\`
 */
export const DEPRECATED_ICON_NAMES: ReadonlySet<IconName> & {
  has(name: string): boolean;
} = new Set<IconName>([
${groups.join('\n')}
]);
`;
}
