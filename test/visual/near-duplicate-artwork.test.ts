import { describe, expect, test } from 'vitest';

/**
 * The raster half of test/duplicate-artwork.test.ts: no artwork ships twice
 * (CONTRIBUTING.md, "Aliases and re-exports"). That test compares canonical
 * markup, so it misses two files that draw the same picture in different
 * markup: a fill on the root instead of on the path, coordinates rounded
 * differently, a rect written as a path, a mask instead of an evenodd
 * cut-out. Here every variant file under icons/ is rendered in the browser,
 * and two files whose renders match cell by cell are one icon under two
 * names: keep one file and declare the other export as a `localAliases`
 * entry or a `reexport`, or list the pair in NEAR_DUPLICATES with the reason.
 */

declare global {
  interface ImportMeta {
    glob<T>(
      pattern: string,
      options: { eager: true; import: 'default'; query?: string },
    ): Record<string, T>;
  }
}

/**
 * Export pairs that draw the same artwork on purpose, keyed by the two
 * exports (`category/Export`, sorted, joined by ` + `), with the reason.
 */
const NEAR_DUPLICATES: Readonly<Record<string, string>> = {
  'exchange/CoinbaseMono + wallet/CoinbaseWalletMono':
    'Two products whose colored marks differ (the #0052FF Coinbase C, the gradient Coinbase Wallet ring) but whose one-colour silhouettes are the same C-ring.',
  'explorer/BscscanMono + explorer/EtherscanMono':
    'Etherscan runs BscScan, whose logo is the Etherscan logo in BNB colours, so the one-colour marks are the same two paths.',
  'explorer/BasescanMono + explorer/BscscanMono':
    'BaseScan and BscScan both use the Etherscan logo in their own colours, so the one-colour marks are the same two paths.',
  'explorer/BasescanMono + explorer/EtherscanMono':
    'Etherscan runs BaseScan, whose logo is the Etherscan logo in Base colours, so the one-colour marks are the same two paths.',
};

/** Render size in pixels: 2 pixels per unit of the 64×64 grid. */
const SIZE = 128;
/** Side of the square pixel cells whose averages are compared. */
const CELL = 4;
/**
 * Largest difference (0–255) a cell's premultiplied channel or alpha may
 * have between near-duplicates. Averaging over cells absorbs anti-aliasing
 * and re-rounded coordinates: the copies this guard found differed by at
 * most 32, while the closest distinct artwork differs by more than 120.
 */
const MAX_CELL_DIFF = 48;

interface UnitJson {
  readonly name: string;
  readonly variants?: Readonly<Record<string, { readonly file: string }>>;
}

interface ArtworkFile {
  /** `category/ExportName`. */
  readonly id: string;
  readonly path: string;
  readonly svg: string;
  /** Painted in `currentColor`: compared with the other mono files only. */
  readonly mono: boolean;
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

const files: ArtworkFile[] = Object.entries(units).flatMap(
  ([jsonPath, unit]) => {
    const dir = jsonPath.slice(0, jsonPath.lastIndexOf('/') + 1);
    const category = dir.slice('../../icons/'.length, -1);
    return Object.entries(unit.variants ?? {}).map(([suffix, { file }]) => {
      const svg = sources[`${dir}${file}`];
      if (svg === undefined) {
        throw new Error(`${jsonPath}: missing ${file}`);
      }
      return {
        id: `${category}/${unit.name}${suffix}`,
        path: `${dir.slice('../../'.length)}${file}`,
        svg,
        mono: svg.includes('currentColor'),
      };
    });
  },
);

/**
 * Renders `svg` at SIZE×SIZE and averages its premultiplied RGBA over
 * CELL×CELL cells. `currentColor` renders black.
 */
async function cellsOf(svg: string): Promise<Float32Array> {
  const root = new DOMParser().parseFromString(
    svg,
    'image/svg+xml',
  ).documentElement;
  root.setAttribute('width', String(SIZE));
  root.setAttribute('height', String(SIZE));
  const url = URL.createObjectURL(
    new Blob([new XMLSerializer().serializeToString(root)], {
      type: 'image/svg+xml',
    }),
  );
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const canvas = new OffscreenCanvas(SIZE, SIZE);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('no 2d canvas context');
    }
    ctx.drawImage(img, 0, 0, SIZE, SIZE);
    const { data } = ctx.getImageData(0, 0, SIZE, SIZE);
    const side = SIZE / CELL;
    const cells = new Float32Array(side * side * 4);
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const p = (y * SIZE + x) * 4;
        const alpha = (data[p + 3] ?? 0) / 255;
        const c = (Math.floor(y / CELL) * side + Math.floor(x / CELL)) * 4;
        for (let k = 0; k < 3; k++) {
          cells[c + k] = (cells[c + k] ?? 0) + (data[p + k] ?? 0) * alpha;
        }
        cells[c + 3] = (cells[c + 3] ?? 0) + (data[p + 3] ?? 0);
      }
    }
    return cells.map(sum => sum / (CELL * CELL));
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Whether no cell value of `a` and `b` differs by more than MAX_CELL_DIFF. */
function nearlyEqual(a: Float32Array, b: Float32Array): boolean {
  for (let i = 0; i < a.length; i++) {
    if (Math.abs((a[i] ?? 0) - (b[i] ?? 0)) > MAX_CELL_DIFF) {
      return false;
    }
  }
  return true;
}

/** Every pair of files (colored with colored, mono with mono) that match. */
async function nearDuplicatePairs(): Promise<[ArtworkFile, ArtworkFile][]> {
  const cells: Float32Array[] = [];
  // Decode in batches: one at a time takes about 20 times longer.
  for (let i = 0; i < files.length; i += 64) {
    cells.push(
      ...(await Promise.all(files.slice(i, i + 64).map(f => cellsOf(f.svg)))),
    );
  }
  const pairs: [ArtworkFile, ArtworkFile][] = [];
  files.forEach((a, i) => {
    files.forEach((b, j) => {
      const ca = cells[i];
      const cb = cells[j];
      if (j > i && a.mono === b.mono && ca && cb && nearlyEqual(ca, cb)) {
        pairs.push([a, b]);
      }
    });
  });
  return pairs;
}

const pairKey = ([a, b]: readonly [ArtworkFile, ArtworkFile]): string =>
  [a.id, b.id].sort().join(' + ');

describe('no artwork ships twice (rendered)', () => {
  test('finds the variant files', () => {
    expect(files.length).toBeGreaterThan(500);
  });

  test('a mark rendered from different markup is a near-duplicate', async () => {
    const xmlns = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"';
    const [rect, path, other] = await Promise.all([
      cellsOf(`<svg ${xmlns}><rect x="8" y="8" width="48" height="48"/></svg>`),
      cellsOf(`<svg ${xmlns} fill="#000"><path d="M56.02 8v48H8V8z"/></svg>`),
      cellsOf(`<svg ${xmlns}><circle cx="32" cy="32" r="24"/></svg>`),
    ]);
    expect(nearlyEqual(rect, path)).toBe(true);
    expect(nearlyEqual(rect, other)).toBe(false);
  });

  test('every near-duplicate pair is declared as an alias or re-export instead', async () => {
    const pairs = await nearDuplicatePairs();
    const undeclared = pairs
      .filter(pair => !Object.hasOwn(NEAR_DUPLICATES, pairKey(pair)))
      .map(
        ([a, b]) =>
          `${a.path} (${a.id}) ≈ ${b.path} (${b.id}): keep one file and declare the other export in "localAliases" (same unit) or as a "reexport" (another unit)`,
      );
    expect(undeclared).toEqual([]);
    const found = new Set(pairs.map(pairKey));
    for (const [pair, reason] of Object.entries(NEAR_DUPLICATES)) {
      expect(reason, pair).toMatch(/\S/);
      expect(
        found.has(pair),
        `${pair} no longer matches; remove the entry`,
      ).toBe(true);
    }
  });
});
