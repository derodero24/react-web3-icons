import { describe, expect, test } from 'vitest';
import type { Category } from '../../scripts/build-icons/lib.ts';
import {
  MONO_AUDIT_ALLOWLIST,
  type MonoResult,
  measureMonoPairs,
  monoPairs,
  monoProblems,
  type PairableUnit,
  type PairId,
} from '../../scripts/build-icons/mono-audit.ts';

/**
 * Mono legibility guard (issue #746, "Mono design rules" in
 * docs/icon-variants.md): every colored/mono pair is rasterized in the
 * browser and measured like `node scripts/audit-mono.ts` does. A pair that
 * trips the thresholds fails unless it is in MONO_AUDIT_ALLOWLIST, and an
 * allowlist entry fails once its pair passes with a margin (stale entry).
 */

declare global {
  interface ImportMeta {
    glob<T>(
      pattern: string,
      options: { eager: true; import: 'default'; query?: string },
    ): Record<string, T>;
  }
}

interface UnitJson {
  readonly name: string;
  readonly kind: string;
  readonly variants?: Readonly<Record<string, { readonly file: string }>>;
}

const sources = import.meta.glob<string>('../../icons/*/*.svg', {
  eager: true,
  import: 'default',
  query: '?raw',
});
const unitJsons = import.meta.glob<UnitJson>('../../icons/*/*.json', {
  eager: true,
  import: 'default',
});

const units: PairableUnit[] = Object.entries(unitJsons).map(
  ([jsonPath, unit]) => {
    const dir = jsonPath.slice(0, jsonPath.lastIndexOf('/') + 1);
    return {
      // '../../icons/<category>/' → '<category>'
      category: dir.slice('../../icons/'.length, -1) as Category,
      name: unit.name,
      kind: unit.kind,
      variants: Object.entries(unit.variants ?? {}).map(
        ([suffix, { file }]) => {
          const svg = sources[`${dir}${file}`];
          if (svg === undefined) {
            throw new Error(`${jsonPath}: missing ${file}`);
          }
          return { suffix, svg };
        },
      ),
    };
  },
);
const pairs = monoPairs(units);
const pairIds = new Set<string>(pairs.map(p => p.id));

/** Tightens the thresholds for the stale check (see `monoProblems`). */
const STALE_MARGIN = 1.15;

describe('Mono audit', () => {
  test('finds the colored/mono pairs', () => {
    expect(pairs.length).toBeGreaterThan(250);
  });

  test('allowlist entries name existing pairs and give a reason', () => {
    for (const [id, allowance] of Object.entries(MONO_AUDIT_ALLOWLIST)) {
      expect(pairIds.has(id), id).toBe(true);
      expect(allowance.reason.trim(), id).not.toBe('');
    }
  });

  test.each(pairs.map(p => [p.id, p] as const))(
    '%s mono reads like its colored variant',
    async (id, pair) => {
      const [result] = await measureMonoPairs([pair]);
      if (result === undefined) {
        throw new Error(`${id}: no result`);
      }
      const allowance = MONO_AUDIT_ALLOWLIST[id as PairId];
      if (allowance === undefined) {
        expect(monoProblems(result), describeResult(result)).toEqual([]);
      } else {
        expect(
          monoProblems(result, STALE_MARGIN),
          `${id} passes the audit now: remove its MONO_AUDIT_ALLOWLIST entry (${describeResult(result)})`,
        ).not.toEqual([]);
      }
    },
  );
});

function describeResult(result: MonoResult): string {
  return result.error === undefined
    ? `${result.id}: iou=${result.iou.toFixed(2)} ink=${result.ink.toFixed(2)} edge=${result.edge.toFixed(2)} refMiss=${result.refDegenerate ? 'degenerate' : `${result.refMiss}%`}`
    : `${result.id}: ${result.error}`;
}
