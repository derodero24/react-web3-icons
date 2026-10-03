import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { EthereumCircleMono } from '../src/chain/Ethereum';
import { isIconComponent, loadCustomUnits, SRC } from './helpers/units';

/**
 * Guards React Server Components compatibility: static icons must stay pure,
 * hook-free components. Hooks like useId/useContext force a 'use client'
 * boundary and were removed in v4 — this test keeps them out.
 *
 * Only `src/dynamic/**` is a client boundary (`'use client'`, React.lazy +
 * useMemo); every other module ships to server components.
 */

// Any hook call, including member calls such as `React.useId(`.
const HOOK_CALL_RE = /\buse[A-Z]\w*\s*\(/;
const CLIENT_DIR = join(SRC, 'dynamic');

function collectServerModules(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (path !== CLIENT_DIR) {
        files.push(...collectServerModules(path));
      }
    } else if (/\.tsx?$/.test(entry.name)) {
      files.push(path);
    }
  }
  return files;
}

const serverModules = collectServerModules(SRC);
const customUnits = loadCustomUnits();

describe('React Server Components compatibility', () => {
  it('no module outside src/dynamic calls a hook', () => {
    const offenders = serverModules
      .filter(path => HOOK_CALL_RE.test(readFileSync(path, 'utf-8')))
      .map(path => relative(SRC, path));
    expect(offenders).toEqual([]);
  });

  it('the scan covers createIcon and every custom unit', () => {
    expect(serverModules).toContain(join(SRC, 'utils/createIcon.tsx'));
    expect(customUnits.length).toBeGreaterThan(0);
    for (const unit of customUnits) {
      expect(serverModules).toContain(unit.modulePath);
    }
  });

  it('server rendering is deterministic with namespaced ids', () => {
    const first = renderToStaticMarkup(<EthereumCircleMono />);
    const second = renderToStaticMarkup(<EthereumCircleMono />);
    expect(first).toBe(second);
    expect(first).toContain('id="w3i-ethereumcirclemono-ethc-a"');
  });

  it.each(customUnits.map(unit => [unit.name, unit] as const))(
    'custom unit %s renders deterministically on the server',
    async (_name, unit) => {
      const mod: Record<string, unknown> = await import(unit.modulePath);
      for (const exportName of unit.exportNames) {
        const Icon = mod[exportName];
        if (!isIconComponent(Icon)) {
          throw new Error(`${exportName} is not an icon component`);
        }
        const markup = renderToStaticMarkup(<Icon />);
        expect(markup, exportName).toBe(renderToStaticMarkup(<Icon />));
      }
    },
  );
});
