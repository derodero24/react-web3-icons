#!/usr/bin/env node
/**
 * Renders a markdown report from `size-limit --json` output, optionally
 * comparing against a base-branch run.
 *
 * Usage:
 *   size-limit --json > pr.json
 *   node scripts/size-report.ts pr.json [base.json] > report.md
 *
 * Exits 1 if any entry exceeds its limit, so CI fails with the report
 * still written to stdout.
 */

import { readFileSync } from 'node:fs';
import { isArray } from './guards.ts';

const [prPath, basePath] = process.argv.slice(2);
if (!prPath) {
  console.error('Usage: node scripts/size-report.ts <pr.json> [base.json]');
  process.exit(2);
}

/** One `size-limit --json` result (fields this report reads). */
interface Entry {
  readonly name: string;
  readonly passed: boolean;
  readonly size: number;
  readonly sizeLimit?: number;
}

function isEntry(value: unknown): value is Entry {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    typeof value.name === 'string' &&
    'passed' in value &&
    typeof value.passed === 'boolean' &&
    'size' in value &&
    typeof value.size === 'number' &&
    (!('sizeLimit' in value) || typeof value.sizeLimit === 'number')
  );
}

function load(path: string): Entry[] {
  const data: unknown = JSON.parse(readFileSync(path, 'utf-8'));
  if (!isArray(data)) {
    throw new Error(`${path}: expected a size-limit --json array`);
  }
  return data.map((entry, i) => {
    if (!isEntry(entry)) {
      throw new Error(`${path}: entry ${i} is not a size-limit result`);
    }
    return entry;
  });
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }
  return `${bytes} B`;
}

function formatDelta(delta: number): string {
  if (delta === 0) {
    return '=';
  }
  const sign = delta > 0 ? '+' : '';
  return `${sign}${formatBytes(Math.abs(delta)).replace(/^/, delta < 0 ? '-' : '')}`;
}

const pr = load(prPath);
const base = basePath
  ? new Map(load(basePath).map(e => [e.name, e]))
  : undefined;

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
