/**
 * Core of the SVG-first icon pipeline: reads the `icons/` source tree and
 * produces the TypeScript sources under `src/<category>/`.
 *
 * Unit kinds are declared in each `icons/<category>/<slug>.json`; see
 * `unit.ts` for their shapes.
 */

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { emitRender } from './jsx.ts';
import {
  type AliasUnitMeta,
  assertUnitMeta,
  type IconUnitMeta,
  isArtwork,
  type ReexportSpec,
  type UnitMeta,
} from './unit.ts';
import { parseSvg } from './xml.ts';

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
] as const;

export type Category = (typeof CATEGORIES)[number];

export function isCategory(value: string): value is Category {
  return CATEGORIES.some(category => category === value);
}

const CATEGORY_LABEL: Readonly<Record<Category, string>> = {
  bridge: 'bridge',
  chain: 'chain',
  coin: 'coin',
  defi: 'DeFi',
  devtool: 'devtool',
  dex: 'DEX',
  domain: 'domain',
  exchange: 'exchange',
  explorer: 'explorer',
  marketplace: 'marketplace',
  node: 'node',
  oracle: 'oracle',
  portfolio: 'portfolio',
  storage: 'storage',
  tracker: 'tracker',
  wallet: 'wallet',
};

/** One artwork variant of a unit, with its SVG source loaded. */
export interface VariantSource {
  /** Export-name suffix (`''`, `'Mono'`, `'CircleMono'`, …). */
  readonly suffix: string;
  /** `meta.name + suffix`. */
  readonly exportName: string;
  /** Root `fill` declared in the unit metadata. */
  readonly fill: string | undefined;
  readonly svg: string;
}

export interface SourceUnit {
  readonly category: Category;
  readonly slug: string;
  readonly meta: UnitMeta;
  /** Artwork variants in declaration order (empty for JSON-only units). */
  readonly variants: readonly VariantSource[];
}

export function sha256(text: string): string {
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

/** Loads every unit definition in a category directory. */
export function loadCategory(
  iconsDir: string,
  category: Category,
): SourceUnit[] {
  const dir = join(iconsDir, category);
  const units: SourceUnit[] = [];
  for (const file of readdirSync(dir).sort()) {
    if (!file.endsWith('.json')) {
      continue;
    }
    const slug = file.slice(0, -5);
    const meta: unknown = JSON.parse(readFileSync(join(dir, file), 'utf-8'));
    assertUnitMeta(meta, `icons/${category}/${file}`);
    const variants = isArtwork(meta)
      ? Object.entries(meta.variants).map(([suffix, variant]) => ({
          suffix,
          exportName: meta.name + suffix,
          fill: variant.fill,
          svg: readFileSync(join(dir, variant.file), 'utf-8'),
        }))
      : [];
    units.push({ category, slug, meta, variants });
  }
  return units;
}

/** "EthereumCircleMono" → "Ethereum Circle Mono" (for JSDoc text). */
function humanize(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}

function jsdocFor(
  name: string,
  category: Category,
  isMono: boolean,
  deprecatedMsg: string | undefined,
): string {
  // The exports test recognizes deprecations via a JSDoc whose first content
  // is the @deprecated tag, so deprecated exports get only that tag.
  if (deprecatedMsg) {
    return `/** @deprecated ${deprecatedMsg} */`;
  }
  const label = CATEGORY_LABEL[category];
  const display = humanize(isMono ? name.replace(/Mono$/, '') : name);
  const tone = isMono ? 'monochrome' : 'colored';
  return `/** ${display} ${label} icon (${tone}). */`;
}

function commentBlock(meta: UnitMeta): string {
  const lines = [
    ...(meta.source ?? []).map(src => `// Source: ${src}`),
    ...(meta.notes ?? []).map(note => `// ${note}`),
  ];
  return lines.length > 0 ? `${lines.join('\n')}\n` : '';
}

function reexportStatement(reexport: ReexportSpec): string {
  const specs = reexport.exports
    .map(e => (e.of === e.as ? `  ${e.of},` : `  ${e.of} as ${e.as},`))
    .join('\n');
  return `export {\n${specs}\n} from '${reexport.from}';`;
}

function wrapBody(body: string): string {
  return `(\n  ${body}\n)`;
}

/** Emits the TSX module for an artwork ("icon") unit. */
function emitIconUnit(unit: SourceUnit, meta: IconUnitMeta): string {
  const { category } = unit;
  const blocks: string[] = [];
  if (meta.reexport) {
    blocks.push(reexportStatement(meta.reexport));
  }
  for (const variant of unit.variants) {
    const { suffix, exportName: name } = variant;
    const { body, usesId, viewBox, fill } = emitRender(parseSvg(variant.svg));
    if (variant.fill !== fill) {
      throw new Error(
        `${category}/${meta.name}${suffix}: root fill ${fill ?? '(none)'} does not match variant metadata`,
      );
    }
    const deprecatedMsg = meta.deprecated?.[name];
    const jsdoc = jsdocFor(
      name,
      category,
      suffix.endsWith('Mono'),
      deprecatedMsg,
    );
    const param = usesId ? '_id =>' : '() =>';
    const args = [`'${name}'`, `'${viewBox}'`, `${param} ${wrapBody(body)}`];
    if (fill) {
      args.push(`'${fill}'`);
    }
    blocks.push(
      `${jsdoc}\nexport const ${name} = /* @__PURE__ */ createIcon(\n  ${args.join(',\n  ')},\n);`,
    );
  }
  for (const alias of meta.localAliases ?? []) {
    const jsdoc = jsdocFor(
      alias.name,
      category,
      alias.name.endsWith('Mono'),
      alias.deprecated,
    );
    blocks.push(`${jsdoc}\nexport const ${alias.name} = ${alias.target};`);
  }
  return `import { createIcon } from '../utils';\n\n${commentBlock(meta)}${blocks.join('\n\n')}\n`;
}

/** Emits a deprecated-alias module (`export const A = B;` with JSDoc). */
function emitAliasUnit(meta: AliasUnitMeta): string {
  const { importFrom, imports, exports } = meta.aliasConst;
  const importLine = `import { ${imports.join(', ')} } from '${importFrom}';`;
  const consts = exports
    .map(e => {
      const jsdoc = e.deprecated ? `/** @deprecated ${e.deprecated} */\n` : '';
      return `${jsdoc}export const ${e.name} = ${e.target};`;
    })
    .join('\n\n');
  return `${importLine}\n\n${commentBlock(meta)}${consts}\n`;
}

/** TSX module source for a unit, or `undefined` for hand-written units. */
function emitUnit(unit: SourceUnit): string | undefined {
  const { meta } = unit;
  switch (meta.kind) {
    case 'icon':
      return emitIconUnit(unit, meta);
    case 'reexport':
      return `${commentBlock(meta)}${reexportStatement(meta.reexport)}\n`;
    case 'alias':
      return emitAliasUnit(meta);
    case 'custom':
      return undefined;
    default:
      return meta satisfies never;
  }
}

export interface GeneratedCategory {
  /** '<Base>.tsx' → content (custom units are omitted). */
  readonly files: ReadonlyMap<string, string>;
  readonly indexTs: string;
}

/** Generates all module sources for a category. */
export function generateCategory(
  units: readonly SourceUnit[],
): GeneratedCategory {
  const files = new Map<string, string>();
  for (const unit of units) {
    const content = emitUnit(unit);
    if (content !== undefined) {
      files.set(`${unit.meta.name}.tsx`, content);
    }
  }
  const moduleNames = units
    .map(unit => unit.meta.name)
    .sort((a, b) => a.localeCompare(b));
  const indexTs = `${moduleNames.map(n => `export * from './${n}';`).join('\n')}\n`;
  return { files, indexTs };
}

/** Categories that ship a dynamic lookup component. */
export const DYNAMIC_CATEGORIES: readonly Category[] = [
  'bridge',
  'chain',
  'coin',
  'defi',
  'dex',
  'exchange',
  'oracle',
  'wallet',
];

/** An export that names another export instead of carrying artwork. */
export interface ExportLink {
  readonly name: string;
  /** Category of the target: '../chain/Polygon' → chain; './Pol' → own. */
  readonly targetCategory: string;
  readonly targetName: string;
  readonly deprecated: boolean;
}

function categoryOf(spec: string, current: Category): string {
  return /^\.\.\/([a-z]+)\//.exec(spec)?.[1] ?? current;
}

/** Re-exports, alias consts and local aliases a unit's module provides. */
export function unitLinks(unit: SourceUnit): ExportLink[] {
  const { category, meta } = unit;
  const links: ExportLink[] = [];
  const reexport = meta.kind === 'alias' ? undefined : meta.reexport;
  if (reexport) {
    const targetCategory = categoryOf(reexport.from, category);
    for (const e of reexport.exports) {
      links.push({
        name: e.as,
        targetCategory,
        targetName: e.of,
        deprecated: false,
      });
    }
  }
  if (meta.kind === 'alias') {
    const targetCategory = categoryOf(meta.aliasConst.importFrom, category);
    for (const e of meta.aliasConst.exports) {
      links.push({
        name: e.name,
        targetCategory,
        targetName: e.target,
        deprecated: Boolean(e.deprecated),
      });
    }
  }
  for (const alias of isArtwork(meta) ? (meta.localAliases ?? []) : []) {
    links.push({
      name: alias.name,
      targetCategory: category,
      targetName: alias.target,
      deprecated: Boolean(alias.deprecated),
    });
  }
  return links;
}

/** Every export name a unit's module provides, for per-icon import maps. */
export function unitAllExportNames(unit: SourceUnit): string[] {
  return [
    ...unit.variants.map(v => v.exportName),
    ...unitLinks(unit).map(link => link.name),
  ];
}

/** Emits the per-icon dynamic import map module for a category. */
export function emitDynamicImports(
  category: Category,
  units: readonly SourceUnit[],
): string {
  const entries: string[] = [];
  for (const unit of units) {
    for (const name of unitAllExportNames(unit)) {
      entries.push(
        `  ${name}: () => import('../../${category}/${unit.meta.name}'),`,
      );
    }
  }
  entries.sort();
  return `// Auto-generated by scripts/build-icons/cli.mjs — do not edit manually.
// Regenerate: pnpm run generate-icons
// biome-ignore-all lint/style/useNamingConvention: keys are icon export names (PascalCase)

/** Per-icon lazy import map for the ${category} category. */
export const ${category}Imports: Record<
  string,
  () => Promise<Record<string, unknown>>
> = {
${entries.join('\n')}
};
`;
}
