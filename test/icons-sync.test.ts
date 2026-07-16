import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Guards the SVG-first pipeline: src/<category>/ is generated from icons/,
 * and this test fails when either side changes without running
 * `pnpm run generate-icons`.
 *
 * - `input` hashes cover icons/<category>/<slug>.json + its SVG variants
 * - `output` hashes cover the generated (Biome-formatted) TSX modules
 * - `indexes` cover each category's index.ts
 */

const ROOT = join(import.meta.dirname, '..');
const ICONS = join(ROOT, 'icons');
const SRC = join(ROOT, 'src');
const lock = JSON.parse(
  readFileSync(join(ROOT, 'scripts/build-icons/icons.lock.json'), 'utf-8'),
) as {
  units: Record<string, { input: string; output?: string }>;
  indexes: Record<string, string>;
};

function sha256(text: string): string {
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

interface Unit {
  key: string;
  category: string;
  meta: {
    kind: string;
    name: string;
    variants?: Record<string, { file: string }>;
  };
  inputHash: string;
}

function loadUnits(): Unit[] {
  const units: Unit[] = [];
  for (const category of Object.keys(lock.indexes)) {
    const dir = join(ICONS, category);
    for (const file of readdirSync(dir).sort()) {
      if (!file.endsWith('.json')) {
        continue;
      }
      const slug = file.slice(0, -5);
      const meta = JSON.parse(readFileSync(join(dir, file), 'utf-8'));
      const svgs = Object.values(
        (meta.variants ?? {}) as Record<string, { file: string }>,
      ).map(v => readFileSync(join(dir, v.file), 'utf-8'));
      units.push({
        key: `${category}/${slug}`,
        category,
        meta,
        inputHash: sha256(JSON.stringify(meta) + svgs.join('\n')),
      });
    }
  }
  return units;
}

const units = loadUnits();

describe('icons/ ↔ src/ pipeline sync', () => {
  it('every icon unit is recorded in the lock file (and vice versa)', () => {
    const keys = units.map(u => u.key).sort();
    expect(keys).toEqual(Object.keys(lock.units).sort());
  });

  it('icons/ sources match the lock (regenerate with `pnpm run generate-icons`)', () => {
    const stale = units.filter(u => lock.units[u.key]?.input !== u.inputHash);
    expect(
      stale.map(u => u.key),
      'icons/ changed without regenerating src/ — run: pnpm run generate-icons',
    ).toEqual([]);
  });

  it('generated TSX modules match the lock (do not hand-edit generated files)', () => {
    const drifted: string[] = [];
    for (const unit of units) {
      if (unit.meta.kind === 'custom') {
        continue;
      }
      const path = join(SRC, unit.category, `${unit.meta.name}.tsx`);
      if (!existsSync(path)) {
        drifted.push(`${unit.key} (missing ${path})`);
        continue;
      }
      if (
        sha256(readFileSync(path, 'utf-8')) !== lock.units[unit.key]?.output
      ) {
        drifted.push(unit.key);
      }
    }
    expect(
      drifted,
      'generated src modules differ from the pipeline output — run: pnpm run generate-icons',
    ).toEqual([]);
  });

  it('category index.ts files match the lock', () => {
    for (const [category, hash] of Object.entries(lock.indexes)) {
      const content = readFileSync(join(SRC, category, 'index.ts'), 'utf-8');
      expect(sha256(content), `${category}/index.ts`).toBe(hash);
    }
  });

  it('custom units keep hand-written modules with matching exports', () => {
    for (const unit of units.filter(u => u.meta.kind === 'custom')) {
      const path = join(SRC, unit.category, `${unit.meta.name}.tsx`);
      const source = readFileSync(path, 'utf-8');
      for (const suffix of Object.keys(unit.meta.variants ?? {})) {
        expect(
          source,
          `${unit.key}: expected export ${unit.meta.name}${suffix}`,
        ).toContain(`export const ${unit.meta.name}${suffix}`);
      }
    }
  });
});
