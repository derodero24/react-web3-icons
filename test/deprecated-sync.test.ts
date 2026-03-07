import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DEPRECATED_ICON_NAMES } from '../src/deprecated';

/**
 * Recursively collect all .tsx / .ts files under `dir`.
 */
function collectSourceFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectSourceFiles(full));
    } else if (/\.(tsx|ts)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

/**
 * Extract names of exports annotated with `@deprecated` in a source file.
 * Matches patterns like:
 *   /** @deprecated ... * /
 *   export const FooBar = ...
 */
function extractDeprecatedExports(source: string): string[] {
  const names: string[] = [];
  // Match @deprecated JSDoc block followed by `export const NAME`
  const re = /\/\*\*\s*@deprecated[\s\S]*?\*\/\s*export\s+const\s+(\w+)/g;
  for (const match of source.matchAll(re)) {
    const name = match[1];
    if (name) {
      names.push(name);
    }
  }
  return names;
}

describe('DEPRECATED_ICON_NAMES sync with source', () => {
  const srcDir = join(__dirname, '..', 'src');
  const sourceFiles = collectSourceFiles(srcDir);

  // Collect all @deprecated exports from source
  const deprecatedInSource = new Set<string>();
  for (const file of sourceFiles) {
    const source = readFileSync(file, 'utf8');
    for (const name of extractDeprecatedExports(source)) {
      deprecatedInSource.add(name);
    }
  }

  it('DEPRECATED_ICON_NAMES contains every @deprecated export in src', () => {
    const missing = [...deprecatedInSource].filter(
      name => !DEPRECATED_ICON_NAMES.has(name),
    );
    expect(
      missing,
      `These exports are marked @deprecated in src but missing from DEPRECATED_ICON_NAMES: ${missing.join(', ')}`,
    ).toHaveLength(0);
  });

  it('DEPRECATED_ICON_NAMES has no entries absent from src @deprecated exports', () => {
    const stale = [...DEPRECATED_ICON_NAMES].filter(
      name => !deprecatedInSource.has(name),
    );
    expect(
      stale,
      `These entries are in DEPRECATED_ICON_NAMES but have no @deprecated JSDoc in src: ${stale.join(', ')}`,
    ).toHaveLength(0);
  });
});
