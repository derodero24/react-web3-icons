// @vitest-environment node
import { spawnSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

/**
 * `pnpm run new-icon` end to end. It writes to icons/ and regenerates src/,
 * so it runs in a throw-away copy of the repository (node_modules is
 * linked), never in the real tree.
 */

const ROOT = join(import.meta.dirname, '..');
const XMLNS = 'xmlns="http://www.w3.org/2000/svg"';

/** Putting artwork on the 64×64 grid measures it in Chromium. */
const hasChromium = existsSync(chromium.executablePath());

let copy = '';
beforeAll(() => {
  copy = mkdtempSync(join(tmpdir(), 'w3i-new-icon-'));
  for (const path of [
    'biome.json',
    'icons',
    'package.json',
    'scripts',
    'src',
    'svgo.config.js',
  ]) {
    cpSync(join(ROOT, path), join(copy, path), { recursive: true });
  }
  symlinkSync(
    join(ROOT, 'node_modules'),
    join(copy, 'node_modules'),
    'junction',
  );
  writeFileSync(
    join(copy, 'in.svg'),
    `<svg ${XMLNS} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#28a0f0"/></svg>`,
  );
  writeFileSync(
    join(copy, 'in.mono.svg'),
    `<svg ${XMLNS} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`,
  );
});
afterAll(() => {
  rmSync(copy, { recursive: true, force: true });
});

const run = (script: string, args: readonly string[]) =>
  spawnSync(process.execPath, [script, ...args], {
    cwd: copy,
    encoding: 'utf-8',
  });
const newIcon = (...args: string[]) => run('scripts/new-icon.ts', args);
const read = (path: string): string => readFileSync(join(copy, path), 'utf-8');

const CHAIN_ICON = ['--category', 'chain', '--name', 'Scaffold'];
const SVGS = ['--svg', 'in.svg', '--mono', 'in.mono.svg'];
/** Reading these would fail (exit code 1). */
const MISSING = ['--svg', 'missing.svg', '--mono', 'missing.mono.svg'];

describe('new-icon', () => {
  it.each([
    [
      'a dynamic-category icon without lookup keys',
      [...CHAIN_ICON, ...MISSING],
      'Icons in the chain category need at least one lookup key (--chain-id, --slug)',
    ],
    [
      'a dynamic-category icon without --mono',
      [...CHAIN_ICON, '--svg', 'missing.svg', '--slug', 'scaffold'],
      'Icons in the chain category need --mono',
    ],
    [
      'a lookup key of another category',
      [...CHAIN_ICON, ...MISSING, '--ticker', 'SCF'],
      '--ticker is not a lookup key of the chain category (allowed: --chain-id, --slug)',
    ],
    [
      'a malformed slug',
      [...CHAIN_ICON, ...MISSING, '--slug', 'Scaffold'],
      'slugs[0] must be a lowercase kebab-case slug, got "Scaffold"',
    ],
    [
      'a malformed chain ID',
      [...CHAIN_ICON, ...MISSING, '--chain-id', '0x10'],
      "--chain-id must be a positive decimal integer (got '0x10')",
    ],
  ])(
    'rejects %s before reading the SVGs',
    (_, args, message) => {
      const result = newIcon(...args);
      expect(result.status, result.stderr).toBe(2);
      expect(result.stderr).toContain(message);
      expect(existsSync(join(copy, 'icons/chain/scaffold.json'))).toBe(false);
    },
    60_000,
  );
});

// The CI test job installs no browser; the visual-regression job does, but
// runs only the browser-mode tests.
describe.skipIf(!hasChromium)('new-icon with Chromium', () => {
  // Several Node processes, Chromium, and a full regeneration with Biome.
  it('scaffolds a chain unit with its lookup keys', () => {
    const result = newIcon(
      ...CHAIN_ICON,
      ...SVGS,
      '--source',
      'https://example.org',
      '--slug',
      'scaffold',
      '--slug',
      'scaffold-legacy',
      '--chain-id',
      '4242424242',
    );
    expect(result.status, result.stderr).toBe(0);
    expect(JSON.parse(read('icons/chain/scaffold.json'))).toEqual({
      $schema: '../schema.json',
      name: 'Scaffold',
      kind: 'icon',
      source: ['https://example.org'],
      variants: Object.fromEntries([
        ['', { file: 'scaffold.svg' }],
        ['Mono', { file: 'scaffold.mono.svg', fill: 'currentColor' }],
      ]),
      slugs: ['scaffold', 'scaffold-legacy'],
      chainIds: [4_242_424_242],
    });
    expect(read('src/chain/Scaffold.tsx')).toContain(
      'export const ScaffoldMono',
    );
    const meta = read('src/meta/index.ts');
    expect(meta).toContain("4242424242: 'Scaffold',");
    expect(meta).toContain("scaffold: 'Scaffold',");
    expect(meta).toContain("'scaffold-legacy': 'Scaffold',");
    expect(read('src/dynamic/imports/chain.ts')).toContain(
      "Scaffold: () => import('../../chain/Scaffold'),",
    );
    expect(result.stdout).toContain(
      'Next steps:\n  1. Verify: pnpm test && pnpm run check\n  2. Add a changeset',
    );
    const check = run('scripts/build-icons/cli.ts', ['--check']);
    expect(check.status, check.stdout + check.stderr).toBe(0);
  }, 180_000);
});
