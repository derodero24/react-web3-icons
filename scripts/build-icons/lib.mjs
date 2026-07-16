/**
 * Core of the SVG-first icon pipeline: reads the `icons/` source tree and
 * produces the TypeScript sources under `src/<category>/`.
 *
 * Unit kinds (declared in each `icons/<category>/<slug>.json`):
 *  - "icon"     — artwork unit: sibling `.svg` files per variant → createIcon TSX
 *  - "reexport" — renames exports of another module (`export { A as B } from …`)
 *  - "alias"    — deprecated `export const A = B;` aliases with JSDoc
 *  - "custom"   — hand-written TSX kept as-is (only listed for dist/svg output)
 */

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { emitRender } from './jsx.mjs';
import { parseSvg } from './xml.mjs';

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
];

const CATEGORY_LABEL = {
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

export function sha256(text) {
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

/** Loads every unit definition in a category directory. */
export function loadCategory(iconsDir, category) {
  const dir = join(iconsDir, category);
  const units = [];
  for (const file of readdirSync(dir).sort()) {
    if (!file.endsWith('.json')) {
      continue;
    }
    const slug = file.slice(0, -5);
    const meta = JSON.parse(readFileSync(join(dir, file), 'utf-8'));
    const svgs = {};
    if (meta.kind === 'icon' || meta.kind === 'custom') {
      for (const [suffix, variant] of Object.entries(meta.variants)) {
        svgs[suffix] = readFileSync(join(dir, variant.file), 'utf-8');
      }
    }
    units.push({ category, slug, meta, svgs });
  }
  return units;
}

/** "EthereumCircleMono" → "Ethereum Circle" (for JSDoc text). */
function humanize(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}

function jsdocFor(name, category, isMono, deprecatedMsg) {
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

function commentBlock(meta) {
  const lines = [];
  for (const src of meta.source ?? []) {
    lines.push(`// Source: ${src}`);
  }
  for (const note of meta.notes ?? []) {
    lines.push(`// ${note}`);
  }
  return lines.length > 0 ? `${lines.join('\n')}\n` : '';
}

/** Emits the TSX module for an artwork ("icon") unit. */
function emitIconUnit(unit) {
  const { meta, svgs, category } = unit;
  const blocks = [];
  if (meta.reexport) {
    const specs = meta.reexport.exports
      .map(e => (e.of === e.as ? `  ${e.of},` : `  ${e.of} as ${e.as},`))
      .join('\n');
    blocks.push(`export {\n${specs}\n} from '${meta.reexport.from}';`);
  }
  for (const [suffix, variant] of Object.entries(meta.variants)) {
    const name = meta.name + suffix;
    const svg = parseSvg(svgs[suffix]);
    const { body, usesId, viewBox, fill } = emitRender(svg);
    if ((variant.fill ?? undefined) !== fill) {
      throw new Error(
        `${category}/${meta.name}${suffix}: root fill ${fill ?? '(none)'} does not match variant metadata`,
      );
    }
    const deprecatedMsg = meta.deprecated?.[name];
    const jsdoc = jsdocFor(name, category, suffix.endsWith('Mono'), deprecatedMsg);
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

function wrapBody(body) {
  return `(\n  ${body}\n)`;
}

/** Emits a `export { A as B } from '…';` re-export module. */
function emitReexportUnit(unit) {
  const { meta } = unit;
  const specs = meta.reexport.exports
    .map(e => (e.of === e.as ? `  ${e.of},` : `  ${e.of} as ${e.as},`))
    .join('\n');
  return `${commentBlock(meta)}export {\n${specs}\n} from '${meta.reexport.from}';\n`;
}

/** Emits a deprecated-alias module (`export const A = B;` with JSDoc). */
function emitAliasUnit(unit) {
  const { meta } = unit;
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

/**
 * Generates all module sources for a category.
 * @returns {{ files: Map<string, string>, indexTs: string, exportedFiles: string[] }}
 *   `files` maps '<Base>.tsx' → content (custom units are omitted).
 */
export function generateCategory(units) {
  const files = new Map();
  const moduleNames = [];
  for (const unit of units) {
    const base = unit.meta.name;
    moduleNames.push(base);
    if (unit.meta.kind === 'custom') {
      continue;
    }
    let content;
    if (unit.meta.kind === 'icon') {
      content = emitIconUnit(unit);
    } else if (unit.meta.kind === 'reexport') {
      content = emitReexportUnit(unit);
    } else if (unit.meta.kind === 'alias') {
      content = emitAliasUnit(unit);
    } else {
      throw new Error(`${unit.category}/${unit.slug}: unknown kind ${unit.meta.kind}`);
    }
    files.set(`${base}.tsx`, content);
  }
  moduleNames.sort((a, b) => a.localeCompare(b));
  const indexTs = `${moduleNames.map(n => `export * from './${n}';`).join('\n')}\n`;
  return { files, indexTs };
}

/** All export names of a unit (used for dist/svg passthrough naming). */
export function unitExportNames(unit) {
  const { meta } = unit;
  if (meta.kind === 'icon' || meta.kind === 'custom') {
    return Object.keys(meta.variants).map(suffix => ({
      exportName: meta.name + suffix,
      suffix,
    }));
  }
  return [];
}

/** Categories that ship a dynamic lookup component. */
export const DYNAMIC_CATEGORIES = [
  'bridge',
  'chain',
  'coin',
  'defi',
  'dex',
  'exchange',
  'oracle',
  'wallet',
];

/** Every export name a unit's module provides, for per-icon import maps. */
export function unitAllExportNames(unit) {
  const { meta } = unit;
  const names = [];
  if (meta.kind === 'icon' || meta.kind === 'custom') {
    names.push(...Object.keys(meta.variants).map(s => meta.name + s));
  }
  if (meta.reexport) {
    names.push(...meta.reexport.exports.map(e => e.as));
  }
  if (meta.aliasConst) {
    names.push(...meta.aliasConst.exports.map(e => e.name));
  }
  names.push(...(meta.localAliases ?? []).map(a => a.name));
  return names;
}

/** Emits the per-icon dynamic import map module for a category. */
export function emitDynamicImports(category, units) {
  const entries = [];
  for (const unit of units) {
    for (const name of unitAllExportNames(unit)) {
      entries.push(`  ${name}: () => import('../../${category}/${unit.meta.name}'),`);
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
