#!/usr/bin/env node
/**
 * Renders a markdown report from `size-limit --json` output, optionally
 * comparing against a base-branch run.
 *
 * Usage:
 *   size-limit --json > pr.json
 *   node scripts/size-report.mjs pr.json [base.json] > report.md
 *
 * Exits 1 if any entry exceeds its limit, so CI fails with the report
 * still written to stdout.
 */

import { readFileSync } from 'node:fs';

const [prPath, basePath] = process.argv.slice(2);
if (!prPath) {
  console.error('Usage: node scripts/size-report.mjs <pr.json> [base.json]');
  process.exit(2);
}

/** @typedef {{ name: string, passed: boolean, size: number, sizeLimit?: number }} Entry */

/** @returns {Entry[]} */
function load(path) {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function formatBytes(bytes) {
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }
  return `${bytes} B`;
}

function formatDelta(delta) {
  if (delta === 0) {
    return '=';
  }
  const sign = delta > 0 ? '+' : '';
  return `${sign}${formatBytes(Math.abs(delta)).replace(/^/, delta < 0 ? '-' : '')}`;
}

const pr = load(prPath);
const base = basePath ? new Map(load(basePath).map(e => [e.name, e])) : null;

const rows = pr.map(entry => {
  const limit = entry.sizeLimit ? formatBytes(entry.sizeLimit) : '—';
  const status = entry.passed ? '✅' : '❌';
  const baseEntry = base?.get(entry.name);
  const delta =
    baseEntry === undefined ? 'new' : formatDelta(entry.size - baseEntry.size);
  return `| ${entry.name} | ${formatBytes(entry.size)} | ${delta} | ${limit} | ${status} |`;
});

const changed = pr.filter(e => {
  const b = base?.get(e.name);
  return !e.passed || b === undefined || b.size !== e.size;
});

const lines = [
  '<!-- size-report -->',
  '## 📦 Bundle size',
  '',
  base && changed.length === 0
    ? '_No size changes against the base branch._'
    : '',
  '| Entry | Size (min+brotli) | Δ vs base | Limit | |',
  '| --- | --- | --- | --- | --- |',
  ...rows,
  '',
];

console.log(lines.filter(l => l !== '').join('\n'));

if (pr.some(e => !e.passed)) {
  console.error('size-limit: one or more entries exceed their limit');
  process.exit(1);
}
