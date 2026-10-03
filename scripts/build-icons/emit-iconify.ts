#!/usr/bin/env node
/**
 * Emits IconifyJSON collections from the icons/ source tree:
 *
 *   dist/iconify.json       — colored icons  (prefix: web3)
 *   dist/iconify-mono.json  — currentColor icons (prefix: web3-mono)
 *
 * Icon names are `<category>-<kebab-name>` (e.g. `chain-ethereum-circle`);
 * ticker/deprecated re-exports become Iconify aliases (deprecated ones
 * hidden). Internal SVG ids are prefixed per icon so inlined icons never
 * collide on a page.
 */

import { writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { namespaceIds } from './ids.ts';
import {
  CATEGORIES,
  kebab,
  loadCategory,
  parseViewBox,
  unitLinks,
  type VariantSource,
} from './lib.ts';
import { isArtwork } from './unit.ts';
import { encodeAttr, getAttr, serializeSvg } from './xml.ts';

const ROOT = resolve(import.meta.dirname, '../..');
const ICONS = join(ROOT, 'icons');

export interface IconifyIcon {
  readonly body: string;
  readonly width: number;
  readonly height: number;
  readonly left?: number;
  readonly top?: number;
  readonly hidden?: true;
}

export interface IconifyAlias {
  readonly parent: string;
  readonly hidden?: true;
}

export interface IconifySet {
  readonly prefix: string;
  readonly info: {
    readonly name: string;
    readonly total: number;
    readonly author: { readonly name: string; readonly url: string };
    readonly license: {
      readonly title: string;
      readonly spdx: string;
      readonly url: string;
    };
    readonly samples: readonly string[];
    /** Height shared by every icon; omitted when heights differ. */
    readonly height?: number;
    readonly palette: boolean;
  };
  readonly icons: Readonly<Record<string, IconifyIcon>>;
  readonly aliases: Readonly<Record<string, IconifyAlias>>;
}

export interface IconifySets {
  readonly colored: IconifySet;
  readonly mono: IconifySet;
}

/** Converts one SVG source into an Iconify icon record. */
function toIconifyIcon(
  variant: VariantSource,
  iconName: string,
  mono: boolean,
  hidden: boolean,
): IconifyIcon {
  const root = namespaceIds(variant.root, iconName);
  const viewBox = parseViewBox(getAttr(root, 'viewBox') ?? '');
  if (viewBox === undefined) {
    throw new Error(`${variant.path}: malformed or missing viewBox`);
  }
  const [left, top, width, height] = viewBox;
  let body = root.children.map(child => serializeSvg(child)).join('');
  // Iconify keeps only the body, but many sources declare their fill on the
  // root <svg> (brand colour, currentColor, or none for stroke-only art) and
  // let the shapes inherit it. Re-establish that inheritance with a group.
  // Mono icons without an explicit root fill still default to currentColor.
  const rootFill = getAttr(root, 'fill') ?? (mono ? 'currentColor' : undefined);
  if (rootFill !== undefined) {
    body = `<g fill="${encodeAttr(rootFill)}">${body}</g>`;
  }
  return {
    body,
    width,
    height,
    ...(left === 0 ? {} : { left }),
    ...(top === 0 ? {} : { top }),
    ...(hidden ? { hidden } : {}),
  };
}

interface Collection {
  readonly icons: Record<string, IconifyIcon>;
  readonly aliases: Record<string, IconifyAlias>;
}

/**
 * IconifyJSON `info.height`: the icons' common height, or omitted when they
 * differ (the sources keep their native viewBoxes, e.g. 24, 64 or 2500).
 */
function commonHeight(icons: Readonly<Record<string, IconifyIcon>>): {
  readonly height?: number;
} {
  const heights = new Set(Object.values(icons).map(icon => icon.height));
  const [height] = heights;
  return heights.size === 1 && height !== undefined ? { height } : {};
}

function iconifySet(
  { icons, aliases }: Collection,
  prefix: string,
  name: string,
  samples: readonly string[],
  palette: boolean,
): IconifySet {
  return {
    prefix,
    info: {
      name,
      total: Object.keys(icons).length,
      author: {
        name: 'derodero24',
        url: 'https://github.com/derodero24/react-web3-icons',
      },
      license: {
        title: 'MIT',
        spdx: 'MIT',
        url: 'https://github.com/derodero24/react-web3-icons/blob/main/LICENSE',
      },
      samples,
      ...commonHeight(icons),
      palette,
    },
    icons,
    aliases,
  };
}

/**
 * Icon names cannot collide: they derive from export names, which
 * loadCategory() already requires to be unique per category.
 *
 * @param iconsDir the `icons/` source tree
 */
export function buildIconifySets(iconsDir: string = ICONS): IconifySets {
  const colored: Collection = { icons: {}, aliases: {} };
  const mono: Collection = { icons: {}, aliases: {} };
  const collectionFor = (isMono: boolean): Collection =>
    isMono ? mono : colored;

  // First pass: artwork units → icons, keyed for alias resolution.
  const iconNameByExport = new Map<string, string>(); // `${category}/${ExportName}` → iconify name
  const units = CATEGORIES.flatMap(category =>
    loadCategory(iconsDir, category),
  );
  for (const { category, meta, variants } of units) {
    for (const variant of variants) {
      const { suffix, exportName } = variant;
      const isMono = suffix.endsWith('Mono');
      const iconName = `${category}-${kebab(exportName)}`;
      const hidden = isArtwork(meta) && Boolean(meta.deprecated?.[exportName]);
      collectionFor(isMono).icons[iconName] = toIconifyIcon(
        variant,
        iconName,
        isMono,
        hidden,
      );
      iconNameByExport.set(`${category}/${exportName}`, iconName);
    }
  }

  // Second pass: alias/re-export names → Iconify aliases.
  const pendingLinks = units.flatMap(unit =>
    unitLinks(unit).map(link => ({
      category: unit.category,
      name: link.name,
      target: `${link.targetCategory}/${link.targetName}`,
      hidden: link.deprecated,
    })),
  );

  // Resolve alias chains (e.g. Matic → Pol → Polygon) over multiple rounds.
  let progressed = true;
  while (progressed && pendingLinks.length > 0) {
    progressed = false;
    // Back to front, so splicing keeps the remaining indices valid.
    for (const [i, link] of [...pendingLinks.entries()].reverse()) {
      const parent = iconNameByExport.get(link.target);
      if (parent === undefined) {
        continue;
      }
      const aliasName = `${link.category}-${kebab(link.name)}`;
      collectionFor(link.name.endsWith('Mono')).aliases[aliasName] = link.hidden
        ? { parent, hidden: true }
        : { parent };
      iconNameByExport.set(`${link.category}/${link.name}`, parent);
      pendingLinks.splice(i, 1);
      progressed = true;
    }
  }
  if (pendingLinks.length > 0) {
    throw new Error(
      `unresolved iconify aliases: ${pendingLinks.map(l => `${l.category}/${l.name}`).join(', ')}`,
    );
  }

  return {
    colored: iconifySet(
      colored,
      'web3',
      'React Web3 Icons',
      ['chain-ethereum', 'coin-bitcoin', 'wallet-meta-mask'],
      true,
    ),
    mono: iconifySet(
      mono,
      'web3-mono',
      'React Web3 Icons Mono',
      ['chain-ethereum-mono', 'coin-bitcoin-mono', 'wallet-meta-mask-mono'],
      false,
    ),
  };
}

if (
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const sets = buildIconifySets();
  writeFileSync(
    join(ROOT, 'dist/iconify.json'),
    `${JSON.stringify(sets.colored)}\n`,
  );
  writeFileSync(
    join(ROOT, 'dist/iconify-mono.json'),
    `${JSON.stringify(sets.mono)}\n`,
  );
  console.log(
    `dist/iconify.json (${sets.colored.info.total} icons, ${Object.keys(sets.colored.aliases).length} aliases) and dist/iconify-mono.json (${sets.mono.info.total} icons, ${Object.keys(sets.mono.aliases).length} aliases) written.`,
  );
}
