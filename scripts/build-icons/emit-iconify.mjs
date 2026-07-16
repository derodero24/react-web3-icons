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
import { CATEGORIES, loadCategory } from './lib.mjs';
import { parseSvg, serializeSvg } from './xml.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const ICONS = join(ROOT, 'icons');

const kebab = name =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

/** Prefixes internal ids with the icon name to avoid cross-icon collisions. */
function namespaceIds(node, prefix, ids) {
  node.attrs = node.attrs.map(([name, value]) => {
    if (name === 'id' && ids.has(value)) {
      return [name, `${prefix}-${value}`];
    }
    if ((name === 'href' || name === 'xlink:href') && value.startsWith('#')) {
      const target = value.slice(1);
      if (ids.has(target)) {
        return [name, `#${prefix}-${target}`];
      }
    }
    if (value.includes('url(#')) {
      return [
        name,
        value.replace(/url\(#([^)]+)\)/g, (whole, id) =>
          ids.has(id) ? `url(#${prefix}-${id})` : whole,
        ),
      ];
    }
    return [name, value];
  });
  for (const child of node.children) {
    namespaceIds(child, prefix, ids);
  }
}

function collectIds(node, ids = new Set()) {
  for (const [name, value] of node.attrs) {
    if (name === 'id') {
      ids.add(value);
    }
  }
  for (const child of node.children) {
    collectIds(child, ids);
  }
  return ids;
}

/** Converts one SVG source file into an Iconify icon record. */
function toIconifyIcon(svgText, iconName, mono) {
  const root = parseSvg(svgText);
  const viewBox = root.attrs.find(([k]) => k === 'viewBox')?.[1];
  const [left, top, width, height] = viewBox.split(/\s+/).map(Number);
  const ids = collectIds(root);
  if (ids.size > 0) {
    namespaceIds(root, iconName, ids);
  }
  let body = root.children.map(child => serializeSvg(child)).join('');
  if (mono) {
    // Our mono SVGs rely on a root fill="currentColor"; Iconify keeps only
    // the body, so re-establish inheritance with a wrapping group.
    body = `<g fill="currentColor">${body}</g>`;
  }
  const icon = { body, width, height };
  if (left !== 0) {
    icon.left = left;
  }
  if (top !== 0) {
    icon.top = top;
  }
  return icon;
}

export function buildIconifySets() {
  const sets = {
    colored: {
      prefix: 'web3',
      info: {
        name: 'React Web3 Icons',
        total: 0,
        author: {
          name: 'derodero24',
          url: 'https://github.com/derodero24/react-web3-icons',
        },
        license: {
          title: 'MIT',
          spdx: 'MIT',
          url: 'https://github.com/derodero24/react-web3-icons/blob/main/LICENSE',
        },
        samples: ['chain-ethereum', 'coin-bitcoin', 'wallet-meta-mask'],
        height: 24,
        palette: true,
      },
      icons: {},
      aliases: {},
    },
    mono: {
      prefix: 'web3-mono',
      info: {
        name: 'React Web3 Icons Mono',
        total: 0,
        author: {
          name: 'derodero24',
          url: 'https://github.com/derodero24/react-web3-icons',
        },
        license: {
          title: 'MIT',
          spdx: 'MIT',
          url: 'https://github.com/derodero24/react-web3-icons/blob/main/LICENSE',
        },
        samples: [
          'chain-ethereum-mono',
          'coin-bitcoin-mono',
          'wallet-meta-mask-mono',
        ],
        height: 24,
        palette: false,
      },
      icons: {},
      aliases: {},
    },
  };

  // First pass: artwork units → icons, keyed for alias resolution.
  const iconNameByExport = new Map(); // `${category}/${ExportName}` → iconify name
  const unitsByCategory = new Map();
  for (const category of CATEGORIES) {
    const units = loadCategory(ICONS, category);
    unitsByCategory.set(category, units);
    for (const unit of units) {
      const { meta, svgs } = unit;
      if (meta.kind !== 'icon' && meta.kind !== 'custom') {
        continue;
      }
      for (const [suffix, variant] of Object.entries(meta.variants)) {
        const exportName = meta.name + suffix;
        const mono = suffix.endsWith('Mono');
        const set = mono ? sets.mono : sets.colored;
        const iconName = `${category}-${kebab(exportName)}`;
        set.icons[iconName] = toIconifyIcon(svgs[suffix], iconName, mono);
        if (meta.deprecated?.[exportName]) {
          set.icons[iconName].hidden = true;
        }
        iconNameByExport.set(`${category}/${exportName}`, iconName);
      }
    }
  }

  // Second pass: alias/re-export names → Iconify aliases.
  const pendingLinks = [];
  const categoryOf = (spec, current) =>
    /^\.\.\/([a-z]+)\//.exec(spec)?.[1] ?? current;
  for (const [category, units] of unitsByCategory) {
    for (const unit of units) {
      const { meta } = unit;
      const links = [];
      if (meta.reexport) {
        const refCat = categoryOf(meta.reexport.from, category);
        for (const { of, as } of meta.reexport.exports) {
          links.push({ name: as, target: `${refCat}/${of}`, hidden: false });
        }
      }
      if (meta.aliasConst) {
        const refCat = categoryOf(meta.aliasConst.importFrom, category);
        for (const e of meta.aliasConst.exports) {
          links.push({
            name: e.name,
            target: `${refCat}/${e.target}`,
            hidden: Boolean(e.deprecated),
          });
        }
      }
      for (const a of meta.localAliases ?? []) {
        links.push({
          name: a.name,
          target: `${category}/${a.target}`,
          hidden: Boolean(a.deprecated),
        });
      }
      for (const link of links) {
        pendingLinks.push({ category, ...link });
      }
    }
  }

  // Resolve alias chains (e.g. Matic → Pol → Polygon) over multiple rounds.
  let progressed = true;
  while (progressed && pendingLinks.length > 0) {
    progressed = false;
    for (let i = pendingLinks.length - 1; i >= 0; i--) {
      const link = pendingLinks[i];
      const parent = iconNameByExport.get(link.target);
      if (!parent) {
        continue;
      }
      const mono = link.name.endsWith('Mono');
      const set = mono ? sets.mono : sets.colored;
      const aliasName = `${link.category}-${kebab(link.name)}`;
      set.aliases[aliasName] = link.hidden
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

  sets.colored.info.total = Object.keys(sets.colored.icons).length;
  sets.mono.info.total = Object.keys(sets.mono.icons).length;
  return sets;
}

if (import.meta.url === (await import('node:url')).pathToFileURL(process.argv[1]).href) {
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
