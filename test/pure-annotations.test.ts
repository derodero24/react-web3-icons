import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const SRC_DIR = join(import.meta.dirname, '../src');

/** Recursively collect icon component source files (excludes utils/dynamic internals). */
function collectIconFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'utils' || entry.name === 'dynamic') {
        continue;
      }
      files.push(...collectIconFiles(fullPath));
    } else if (entry.name.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

describe('PURE annotations', () => {
  // Without /* @__PURE__ */, bundlers must assume createIcon() has side
  // effects and keep every icon in an included chunk — importing a single
  // icon then bundles the whole category (see issue #696). The annotation
  // is load-bearing for tree-shaking, so it is enforced here.
  it('every createIcon call site is /* @__PURE__ */-annotated', () => {
    const offenders: string[] = [];
    for (const filePath of collectIconFiles(SRC_DIR)) {
      const source = readFileSync(filePath, 'utf-8');
      for (const match of source.matchAll(/^.*\bcreateIcon\(/gm)) {
        const line = match[0];
        // Ignore imports and comments; only assignment call sites matter
        if (/^\s*(import|\/\/|\*)/.test(line)) {
          continue;
        }
        if (!/\/\* @__PURE__ \*\/ createIcon\($/.test(line.trimEnd())) {
          offenders.push(`${filePath}: ${line.trim()}`);
        }
      }
    }
    expect(
      offenders,
      `createIcon calls missing /* @__PURE__ */ annotation:\n${offenders.join('\n')}`,
    ).toEqual([]);
  });
});
