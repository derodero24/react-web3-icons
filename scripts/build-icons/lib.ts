/**
 * Core of the SVG-first icon pipeline: reads the `icons/` source tree and
 * produces the TypeScript sources under `src/<category>/`.
 *
 * Unit kinds are declared in each `icons/<category>/<slug>.json`; see
 * `unit.ts` for their shapes.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { validateIds } from './ids.ts';
import { isolateMaskContent } from './isolate.ts';
import {
  emitRender,
  quote,
  type RenderedIcon,
  ROOT_ATTRS,
  stripFillProps,
} from './jsx.ts';
import {
  emitIconCall,
  emitPropsInterface,
  emitToggleArtworks,
  validateProps,
} from './props.ts';
import {
  type AliasUnitMeta,
  assertUnitMeta,
  type IconUnitMeta,
  isArtwork,
  type ReexportSpec,
  type UnitMeta,
  type Variant,
} from './unit.ts';
import { getAttr, parseSvg, type XmlNode } from './xml.ts';

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

/** Category name as used in prose (`DeFi`, `DEX`, …). */
export const CATEGORY_LABEL: Readonly<Record<Category, string>> = {
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

/**
 * Locale-independent string order (UTF-16 code units), used for every sort
 * that shapes generated output. `localeCompare()` without a fixed locale
 * would make the output depend on the machine's `LANG`/`LC_ALL`.
 */
export function compareStrings(a: string, b: string): number {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
}

/** Kebab-case of a PascalCase export name (`EthereumCircle` → `ethereum-circle`). */
export const kebab = (name: string): string =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

/** One artwork variant of a unit, with its SVG source loaded. */
export interface VariantSource {
  /** Export-name suffix (`''`, `'Mono'`, `'CircleMono'`, …). */
  readonly suffix: string;
  /** `meta.name + suffix`. */
  readonly exportName: string;
  /** Root `fill` declared in the unit metadata. */
  readonly fill: string | undefined;
  /** Source path relative to the repository root, for error messages. */
  readonly path: string;
  readonly svg: string;
  /**
   * The parsed and validated document, with mask content isolated from the
   * host document (see isolate.ts); every emitter but the TSX one renders
   * this tree.
   */
  readonly root: XmlNode;
  /**
   * `root` with its `data-fill-prop` marks (see props.ts), which only the
   * TSX emitter renders.
   */
  readonly template: XmlNode;
}

export interface SourceUnit {
  readonly category: Category;
  readonly slug: string;
  /** Path of the unit definition relative to the repository root. */
  readonly path: string;
  readonly meta: UnitMeta;
  /** Artwork variants in declaration order (empty for JSON-only units). */
  readonly variants: readonly VariantSource[];
}

/**
 * An SVG `<number>`: optional sign, decimal digits with an optional fraction,
 * optional exponent. Stricter than `Number()`, which also accepts `""`,
 * `0x18`, `Infinity` and the like.
 */
const SVG_NUMBER = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;

/**
 * `"minX minY width height"` (whitespace and/or comma separated) → its four
 * numbers, or `undefined` when malformed or of non-positive size.
 */
export function parseViewBox(
  viewBox: string,
): readonly [number, number, number, number] | undefined {
  const tokens = viewBox.trim().split(/\s*,\s*|\s+/);
  if (!tokens.every(token => SVG_NUMBER.test(token))) {
    return undefined;
  }
  const parts = tokens.map(Number);
  const [left, top, width, height, ...rest] = parts;
  if (
    left === undefined ||
    top === undefined ||
    width === undefined ||
    height === undefined ||
    rest.length > 0 ||
    !parts.every(Number.isFinite) ||
    width <= 0 ||
    height <= 0
  ) {
    return undefined;
  }
  return [left, top, width, height];
}

/** Checks what every emitter relies on: root attributes, viewBox, ids. */
export function validateSvg(root: XmlNode, fill: string | undefined): void {
  for (const [name] of root.attrs) {
    if (!ROOT_ATTRS.includes(name)) {
      throw new Error(
        `unexpected root <svg> attribute ${name} (allowed: ${ROOT_ATTRS.join(', ')})`,
      );
    }
  }
  const viewBox = getAttr(root, 'viewBox');
  if (viewBox === undefined || parseViewBox(viewBox) === undefined) {
    throw new Error(`malformed or missing viewBox ${JSON.stringify(viewBox)}`);
  }
  const rootFill = getAttr(root, 'fill');
  if (rootFill !== fill) {
    throw new Error(
      `root fill ${rootFill ?? '(none)'} does not match the variant's "fill" ${fill ?? '(none)'}`,
    );
  }
  validateIds(root);
}

/** Adds the file path to errors thrown by `load`. */
function withPath<T>(path: string, load: () => T): T {
  try {
    return load();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(message.startsWith(path) ? message : `${path}: ${message}`);
  }
}

function loadVariant(
  iconsDir: string,
  category: Category,
  unitName: string,
  [suffix, variant]: readonly [string, Variant],
): VariantSource {
  const path = `icons/${category}/${variant.file}`;
  return withPath(path, () => {
    const svg = readFileSync(join(iconsDir, category, variant.file), 'utf-8');
    const parsed = parseSvg(svg, path);
    validateSvg(parsed, variant.fill);
    const template = isolateMaskContent(parsed);
    return {
      suffix,
      exportName: unitName + suffix,
      fill: variant.fill,
      path,
      svg,
      root: stripFillProps(template),
      template,
    };
  });
}

/**
 * Rejects two units or exports that would resolve to the same output: one
 * `<Name>.tsx` module, one `dist/svg/<category>/<Export>.svg` file, one
 * export name in the category barrel (where `export *` silently drops
 * conflicting names). Compared case-insensitively, since macOS and Windows
 * file systems are; that also keeps kebab-case names (Iconify icon names,
 * dist/svg id prefixes) unique, as `kebab` only inserts hyphens.
 *
 * The one exception is a case-only rename: a deprecated alias that differs
 * from its own target only in letter case (`OKXWallet` → `OkxWallet`). It is
 * the same component, so it gets no dist/svg file or Iconify alias of its
 * own (see {@link isCaseOnlyRename}); the barrel, which compares names
 * exactly, keeps both.
 */
function assertUniqueOutputs(units: readonly SourceUnit[]): void {
  const modules = new Map<string, string>();
  const exports = new Map<string, string>();
  const claim = (
    seen: Map<string, string>,
    key: string,
    what: string,
    path: string,
  ): void => {
    const previous = seen.get(key.toLowerCase());
    if (previous !== undefined) {
      throw new Error(
        `${path}: ${what} ${key} is already defined by ${previous}`,
      );
    }
    seen.set(key.toLowerCase(), path);
  };
  for (const unit of units) {
    claim(modules, unit.meta.name, 'module', unit.path);
    const caseOnly = new Set(
      unitLinks(unit)
        .filter(link => isCaseOnlyRename(unit.category, link))
        .map(link => link.name),
    );
    for (const name of unitAllExportNames(unit)) {
      if (!caseOnly.has(name)) {
        claim(exports, name, 'export', unit.path);
      }
    }
  }
}

/**
 * Whether a link is a deprecated alias of an export of its own category
 * whose name differs from it only in letter case (`StarkNet` → `Starknet`).
 */
export function isCaseOnlyRename(category: string, link: ExportLink): boolean {
  return (
    link.deprecated &&
    link.targetCategory === category &&
    link.name !== link.targetName &&
    link.name.toLowerCase() === link.targetName.toLowerCase()
  );
}

/** Loads and validates every unit definition in a category directory. */
export function loadCategory(
  iconsDir: string,
  category: Category,
): SourceUnit[] {
  const dir = join(iconsDir, category);
  const units: SourceUnit[] = [];
  for (const file of readdirSync(dir).sort(compareStrings)) {
    if (!file.endsWith('.json')) {
      continue;
    }
    const path = `icons/${category}/${file}`;
    const meta: unknown = withPath(path, () =>
      JSON.parse(readFileSync(join(dir, file), 'utf-8')),
    );
    assertUnitMeta(meta, path);
    const variants = isArtwork(meta)
      ? Object.entries(meta.variants).map(entry =>
          loadVariant(iconsDir, category, meta.name, entry),
        )
      : [];
    const unit = { category, slug: file.slice(0, -5), path, meta, variants };
    if (isArtwork(meta)) {
      withPath(path, () => validateProps({ meta, variants }));
    }
    units.push(unit);
  }
  assertUniqueOutputs(units);
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

/** Emits the TSX module for an artwork ("icon") unit. */
function emitIconUnit(unit: SourceUnit, meta: IconUnitMeta): string {
  const { category } = unit;
  const blocks: string[] = [];
  if (meta.reexport) {
    blocks.push(reexportStatement(meta.reexport));
  }
  const rendered = new Map(
    unit.variants.map(variant => [
      variant.suffix,
      withPath(variant.path, () => emitRender(variant.template)),
    ]),
  );
  const renderedOf = (suffix: string): RenderedIcon => {
    const icon = rendered.get(suffix);
    if (icon === undefined) {
      throw new Error(`${unit.path}: no variant "${suffix}"`);
    }
    return icon;
  };
  const artwork = { meta, variants: unit.variants };
  const propsInterface = emitPropsInterface(artwork);
  if (propsInterface !== undefined) {
    blocks.push(propsInterface);
  }
  blocks.push(...emitToggleArtworks(artwork, renderedOf));
  for (const { suffix, exportName: name } of unit.variants) {
    const deprecatedMsg = meta.deprecated?.[name];
    const jsdoc = jsdocFor(
      name,
      category,
      suffix.endsWith('Mono'),
      deprecatedMsg,
    );
    const call = emitIconCall(artwork, suffix, renderedOf);
    const args = [quote(name), call.viewBox, call.render, call.options];
    blocks.push(
      `${jsdoc}\nexport const ${name} = /* @__PURE__ */ createIcon${call.typeArgs}(\n  ${args.join(',\n  ')},\n);`,
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

/** TSX module source for a unit. */
function emitUnit(unit: SourceUnit): string {
  const { meta } = unit;
  switch (meta.kind) {
    case 'icon':
      return emitIconUnit(unit, meta);
    case 'reexport':
      return `${commentBlock(meta)}${reexportStatement(meta.reexport)}\n`;
    case 'alias':
      return emitAliasUnit(meta);
    default:
      return meta satisfies never;
  }
}

export interface GeneratedCategory {
  /** '<Base>.tsx' → content. */
  readonly files: ReadonlyMap<string, string>;
  readonly indexTs: string;
}

/** Generates all module sources for a category. */
export function generateCategory(
  units: readonly SourceUnit[],
): GeneratedCategory {
  const files = new Map<string, string>();
  for (const unit of units) {
    files.set(`${unit.meta.name}.tsx`, emitUnit(unit));
  }
  const moduleNames = units.map(unit => unit.meta.name).sort(compareStrings);
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
    const importCategory = categoryOf(meta.aliasConst.importFrom, category);
    const imported = new Set(meta.aliasConst.imports);
    for (const e of meta.aliasConst.exports) {
      links.push({
        name: e.name,
        // A target that is not imported is an earlier export of this module
        // (`OKXWallet` → `OkxWallet`, itself `Okx` from ../exchange/Okx).
        targetCategory: imported.has(e.target) ? importCategory : category,
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
