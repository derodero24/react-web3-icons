#!/usr/bin/env node
/**
 * Naming-convention audit over the icons/ source tree.
 *
 *   node scripts/audit-naming.mjs
 *
 * Checks (see CONTRIBUTING "Icon Variant Naming Convention"):
 *  - PascalCase unit names
 *  - variant suffixes belong to the documented vocabulary (including
 *    compound forms and multiword-brand variants)
 *  - colored/mono pairing gaps (reported, not fatal — Alt/Inverted/Flat
 *    variants may intentionally omit monos)
 *  - trailing digits only for brand-intrinsic names (explicit allowlist)
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ICONS = join(dirname(fileURLToPath(import.meta.url)), '..', 'icons');
const STYLE = ['Circle', 'Square', 'Wordmark', 'Symbol', 'Flat', 'Alt', 'Inverted', 'Light'];
// Multiword brands modeled as variants of a shared artwork unit.
const BRAND_VARIANTS = ['One', 'Nova'];
// Brand names whose trailing digits are part of the brand itself.
const DIGIT_BRANDS = new Set(['X2Y2', 'Api3']);

const suffixOk = (suf) => {
  let s = suf.replace(/Mono$/, '');
  for (const b of BRAND_VARIANTS) if (s.startsWith(b)) s = s.slice(b.length);
  while (s.length) {
    const hit = STYLE.find(t => s.startsWith(t));
    if (!hit) return false;
    s = s.slice(hit.length);
  }
  return true;
};

let bad = 0;
const warn = (msg) => { console.log('⚠', msg); bad++; };
for (const cat of readdirSync(ICONS).sort()) {
  for (const f of readdirSync(join(ICONS, cat)).sort()) {
    if (!f.endsWith('.json')) continue;
    const meta = JSON.parse(readFileSync(join(ICONS, cat, f), 'utf8'));
    const name = meta.name;
    if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) warn(`${cat}/${name}: not PascalCase`);
    if (/\d+$/.test(name) && !DIGIT_BRANDS.has(name)) warn(`${cat}/${name}: trailing digits (add to DIGIT_BRANDS if brand-intrinsic)`);
    const variants = meta.variants ?? {};
    for (const suf of Object.keys(variants)) {
      if (suf !== '' && !suffixOk(suf)) warn(`${cat}/${name}${suf}: suffix outside the documented vocabulary`);
    }
    for (const suf of Object.keys(variants)) {
      if (suf.endsWith('Mono')) {
        if (!(suf.slice(0, -4) in variants)) console.log(`ℹ ${cat}/${name}${suf}: mono without a colored counterpart`);
      } else if (!((suf ? suf + 'Mono' : 'Mono') in variants)) {
        console.log(`ℹ ${cat}/${name}${suf}: colored variant without a mono`);
      }
    }
    for (const list of [meta.reexport?.exports ?? [], meta.aliasConst?.exports ?? []]) {
      for (const e of list) {
        const n = e.as ?? e.name;
        if (/\d+$/.test(n) && !DIGIT_BRANDS.has(n)) warn(`${cat}/${n}: trailing digits on re-export/alias`);
      }
    }
  }
}
console.log(bad ? `\n${bad} violation(s).` : '\nNo violations (ℹ lines are informational coverage gaps).');
process.exitCode = bad ? 1 : 0;
