import { describe, expect, test } from 'vitest';
import {
  checkUnitOnGrid,
  type MeasuredVariant,
  measurableSvg,
  OPTICAL_EXEMPTIONS,
} from '../../scripts/build-icons/optical.ts';
import { runRasterJobs } from '../../scripts/build-icons/raster.ts';

/**
 * Optical-size guard (issue #704, "Optical size" in CONTRIBUTING.md): every
 * icon source is rendered in the browser and its painted box must follow
 * the fill rule on the 64×64 grid (marks 56 units, containers 64, centred;
 * a mono pair is judged by the union of both), unless the source is listed
 * in OPTICAL_EXEMPTIONS. The viewBox itself is checked by the unit test
 * test/optical-size.test.ts.
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
const units = import.meta.glob<UnitJson>('../../icons/*/*.json', {
  eager: true,
  import: 'default',
});

const cases = Object.entries(units).flatMap(([jsonPath, unit]) => {
  const dir = jsonPath.slice(0, jsonPath.lastIndexOf('/') + 1);
  const variants = Object.entries(unit.variants ?? {}).map(
    ([suffix, { file }]) => {
      const svg = sources[`${dir}${file}`];
      if (svg === undefined) {
        throw new Error(`${jsonPath}: missing ${file}`);
      }
      return { suffix, file, path: `${dir.slice(6)}${file}`, svg };
    },
  );
  return variants.length > 0
    ? [[jsonPath.slice(6, -5), variants] as const]
    : [];
});

describe('Optical size', () => {
  test('finds the icon sources', () => {
    expect(cases.length).toBeGreaterThan(200);
  });

  test.each(cases)('%s follows the fill rule', async (_unit, variants) => {
    const results = await runRasterJobs(
      variants.map(v => ({ kind: 'measure', svg: measurableSvg(v.svg) })),
    );
    const measured: MeasuredVariant[] = variants.map((v, i) => {
      const result = results[i];
      if (result?.kind !== 'measure') {
        throw new Error(`${v.path}: ${JSON.stringify(result)}`);
      }
      return { suffix: v.suffix, file: v.file, measurement: result };
    });
    const pathOf = new Map(variants.map(v => [v.file, v.path]));
    const problems = checkUnitOnGrid(measured, file =>
      Object.hasOwn(OPTICAL_EXEMPTIONS, pathOf.get(file) ?? file),
    ).map(p => `${pathOf.get(p.file)}: ${p.message}`);
    expect(problems).toEqual([]);
  });
});
