import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import * as icons from '../src';
import { isIconComponent } from './helpers/units';

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

/** `export const <name> = <first line of the initializer>` of every module. */
const declarations = collectIconFiles(SRC_DIR).flatMap(file =>
  [
    ...readFileSync(file, 'utf-8').matchAll(
      /^export const (\w+) =\s*(\S[^\n]*)/gm,
    ),
  ].map(([, name = '', init = '']) => ({ file, name, init })),
);

/** An annotated factory call, or an alias of another export. */
const PURE_CALL = /^\/\* @__PURE__ \*\/ createIcon(?:<.+>)?\($/;
const ALIAS = /^[A-Z]\w*;$/;

describe('PURE annotations', () => {
  // Without /* @__PURE__ */, bundlers must assume createIcon() has side
  // effects and keep every icon in an included chunk — importing a single
  // icon then bundles the whole category (see issue #696). The annotation
  // is load-bearing for tree-shaking, so it is enforced for every export.
  it('every exported component is a /* @__PURE__ */ createIcon call or an alias', () => {
    const offenders = declarations
      .filter(({ init }) => !(PURE_CALL.test(init) || ALIAS.test(init)))
      .map(({ file, name, init }) => `${file}: ${name} = ${init}`);
    expect(
      offenders,
      `exports that are not annotated createIcon calls:\n${offenders.join('\n')}`,
    ).toEqual([]);
  });

  it('the scan sees every exported component', () => {
    // Re-exports (`export { A as B } from …`) name a declaration elsewhere.
    const reexported = collectIconFiles(SRC_DIR).flatMap(file =>
      [...readFileSync(file, 'utf-8').matchAll(/export \{([^}]*)\} from/g)]
        .flatMap(([, list = '']) => list.split(','))
        .map(
          spec =>
            spec
              .trim()
              .split(/\s+as\s+/)
              .at(-1) ?? '',
        ),
    );
    const declared = new Set([
      ...declarations.map(({ name }) => name),
      ...reexported,
    ]);
    const missing = Object.entries(icons)
      .filter(([name, value]) => isIconComponent(value) && !declared.has(name))
      .map(([name]) => name);
    expect(missing).toEqual([]);
  });
});
