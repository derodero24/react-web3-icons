// @vitest-environment node
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  CATEGORIES,
  type Category,
  loadCategory,
  type SourceUnit,
  type VariantSource,
} from '../scripts/build-icons/lib.ts';
import { isArtwork } from '../scripts/build-icons/unit.ts';
import { parseSvg } from '../scripts/build-icons/xml.ts';
import {
  analyzeTone,
  geometryOf,
  isDominatedBy,
  isMonochrome,
  parseColor,
  type Tone,
  type ToneAnalysis,
} from './helpers/legibility.ts';

/**
 * Dark/light-background legibility audit (issue #712). Every colored default
 * icon that mostly vanishes on a dark (or light) background — see
 * `helpers/legibility.ts` for the measure — must come with a colored
 * alternative that does not:
 *
 *  1. a colored `Circle*`, `Square*` or `Inverted*` variant that is not
 *     itself dominated by that tone; or
 *  2. for a mark with no colour besides that tone (Aptos, LayerZero, …), its
 *     `Mono` variant with identical geometry: `<AptosMono color="#fff" />`
 *     *is* the brand's reversed mark, with no brand colour to give up; or
 *  3. an entry in {@link EXEMPTIONS}, whose reason is verified below.
 *
 * Variants are only added from official artwork (CONTRIBUTING.md,
 * "Icon Authenticity Policy"); when none exists, add an exemption instead.
 */

const ROOT = join(import.meta.dirname, '..');
const ICONS = join(ROOT, 'icons');
const TONES: readonly Tone[] = ['dark', 'light'];

type UnitKey = `${Category}/${string}`;

type Exemption = {
  /** The background the default icon vanishes on. */
  readonly tone: Tone;
  /** Why, in a sentence; shown when the exemption goes stale. */
  readonly note: string;
} & (
  | {
      /** Another colored variant (outside rule 1's suffixes) is legible. */
      readonly kind: 'legible-variant';
      readonly variant: string;
    }
  | {
      /**
       * No official alternative artwork was found; the unit's `Mono` variant
       * with a contrasting `color` is the documented legible option.
       */
      readonly kind: 'no-official-alternative';
      /** Where an official alternative was looked for. */
      readonly searched: readonly string[];
    }
);

/** Keep this list short: prefer adding official variants. */
const EXEMPTIONS: Readonly<Record<UnitKey, Exemption>> = {
  'coin/Looks': {
    tone: 'dark',
    kind: 'legible-variant',
    variant: 'Alt',
    note: 'LooksAlt is the green-disc LOOKS mark, legible on dark.',
  },
  'exchange/Htx': {
    tone: 'light',
    kind: 'no-official-alternative',
    searched: ['https://www.htx.com'],
    note: 'The light/blue flame comes from @web3icons/react (HT token); no official HTX brand kit or dark-on-light flame was found. Use HtxMono with a dark color.',
  },
};

const LEGIBLE_SUFFIX = /^(?:Circle|Square|Inverted)/;

const isColored = (variant: VariantSource): boolean =>
  !variant.suffix.endsWith('Mono') && variant.fill !== 'currentColor';

/** The default export's artwork: `""`, or the variant a `localAlias` names. */
function defaultVariant(unit: SourceUnit): VariantSource | undefined {
  const { meta, variants } = unit;
  const target =
    isArtwork(meta) &&
    meta.localAliases?.find(alias => alias.name === meta.name)?.target;
  const suffix = target ? target.slice(meta.name.length) : '';
  return variants.find(variant => variant.suffix === suffix);
}

type Coverage =
  | { readonly kind: 'legible' }
  | { readonly kind: 'variant'; readonly exportName: string }
  | { readonly kind: 'monochrome'; readonly exportName: string }
  | { readonly kind: 'exempt'; readonly exemption: Exemption }
  | { readonly kind: 'missing' };

interface Audited {
  readonly unit: SourceUnit;
  readonly key: UnitKey;
  readonly base: VariantSource;
  readonly tones: ReadonlyMap<VariantSource, ToneAnalysis>;
}

const units = CATEGORIES.flatMap(category => loadCategory(ICONS, category));

const audited: Audited[] = units.flatMap(unit => {
  const base = defaultVariant(unit);
  if (
    base === undefined ||
    !isColored(base) ||
    (isArtwork(unit.meta) && unit.meta.deprecated?.[base.exportName])
  ) {
    return [];
  }
  const tones = new Map(
    unit.variants
      .filter(isColored)
      .map(variant => [variant, analyzeTone(variant.root)] as const),
  );
  const key: UnitKey = `${unit.category}/${unit.meta.name}`;
  return [{ unit, key, base, tones }];
});

function toneOf(entry: Audited, variant: VariantSource): ToneAnalysis {
  const analysis = entry.tones.get(variant);
  if (analysis === undefined) {
    throw new Error(`${variant.path}: not a colored variant`);
  }
  return analysis;
}

const monoOf = (unit: SourceUnit): VariantSource | undefined =>
  unit.variants.find(variant => variant.suffix === 'Mono');

/** How `entry` stays legible on a `tone` background, ignoring exemptions. */
function coverage(entry: Audited, tone: Tone): Coverage {
  const base = toneOf(entry, entry.base);
  if (!isDominatedBy(base, tone)) {
    return { kind: 'legible' };
  }
  const alternative = [...entry.tones].find(
    ([variant, analysis]) =>
      LEGIBLE_SUFFIX.test(variant.suffix) && !isDominatedBy(analysis, tone),
  );
  if (alternative) {
    return { kind: 'variant', exportName: alternative[0].exportName };
  }
  const mono = monoOf(entry.unit);
  if (
    mono !== undefined &&
    isMonochrome(base, tone) &&
    geometryOf(mono.root) === geometryOf(entry.base.root)
  ) {
    return { kind: 'monochrome', exportName: mono.exportName };
  }
  return { kind: 'missing' };
}

function withExemption(entry: Audited, tone: Tone): Coverage {
  const found = coverage(entry, tone);
  const exemption = EXEMPTIONS[entry.key];
  return found.kind === 'missing' && exemption?.tone === tone
    ? { kind: 'exempt', exemption }
    : found;
}

describe('dark/light background legibility (issue #712)', () => {
  it('measures every colored artwork', () => {
    for (const entry of audited) {
      for (const [variant, analysis] of entry.tones) {
        expect(
          analysis.overall.weight,
          `${variant.path} paints`,
        ).toBeGreaterThan(0);
      }
    }
  });

  it.each(TONES)(
    'every colored default icon has a legible option on %s backgrounds',
    tone => {
      const missing = audited
        .filter(entry => withExemption(entry, tone).kind === 'missing')
        .map(
          ({ key, base }) =>
            `${key}: ${base.path} mostly vanishes on ${tone} backgrounds; add an official Circle/Square/Inverted variant or an exemption in test/legibility.test.ts`,
        );
      expect(missing).toEqual([]);
    },
  );

  it('documents how each affected icon stays legible', () => {
    const report = audited.flatMap(entry =>
      TONES.flatMap(tone => {
        const found = withExemption(entry, tone);
        switch (found.kind) {
          case 'legible':
          case 'missing':
            return [];
          case 'variant':
          case 'monochrome':
            return [
              `${tone}: ${entry.key} → ${found.kind} ${found.exportName}`,
            ];
          case 'exempt':
            return [`${tone}: ${entry.key} → exempt (${found.exemption.kind})`];
          default:
            return found satisfies never;
        }
      }),
    );
    expect(report).toMatchSnapshot();
  });

  describe('exemptions', () => {
    const byKey = new Map<string, Audited>(
      audited.map(entry => [entry.key, entry]),
    );

    it.each(Object.entries(EXEMPTIONS))(
      '%s is still needed and valid',
      (key, exemption) => {
        const entry = byKey.get(key);
        expect(entry, `${key}: no such colored icon unit`).toBeDefined();
        if (entry === undefined) {
          return;
        }
        expect(
          coverage(entry, exemption.tone).kind,
          `${key}: stale exemption — ${exemption.note}`,
        ).toBe('missing');
        if (exemption.kind === 'legible-variant') {
          const variant = entry.unit.variants.find(
            v => v.suffix === exemption.variant,
          );
          expect(
            variant,
            `${key}: no variant ${exemption.variant}`,
          ).toBeDefined();
          if (variant !== undefined) {
            expect(isDominatedBy(toneOf(entry, variant), exemption.tone)).toBe(
              false,
            );
          }
        } else {
          expect(exemption.searched.length).toBeGreaterThan(0);
          expect(
            monoOf(entry.unit),
            `${key}: needs a Mono variant`,
          ).toBeDefined();
        }
      },
    );
  });
});

describe('tone analysis', () => {
  const svg = (body: string, viewBox = '0 0 10 10'): ToneAnalysis =>
    analyzeTone(
      parseSvg(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${body}</svg>`,
      ),
    );
  const dot = (fill: string): string =>
    `<circle cx="5" cy="5" r="1" fill="${fill}"/>`;

  it('parses hex and keyword colours and rejects others', () => {
    expect(parseColor('#fff')).toEqual([255, 255, 255]);
    expect(parseColor('#0008')).toEqual([0, 0, 0]);
    expect(parseColor('#12345678')).toEqual([0x12, 0x34, 0x56]);
    expect(parseColor('Black')).toEqual([0, 0, 0]);
    expect(() => parseColor('rgb(0,0,0)')).toThrow(/unsupported colour/);
    expect(() => parseColor('red')).toThrow(/unsupported colour/);
  });

  it('counts the initial black fill, inherited fills and strokes', () => {
    expect(svg('<path d="M0 0h1v1z"/>').ink.dark).toBe(1);
    expect(svg('<g fill="#fff"><path d="M0 0h1v1z"/></g>').ink.light).toBe(1);
    const stroked = svg(
      '<path d="M0 0h1v1z" fill="none" stroke="#000"/><path d="M0 0h1v1z" fill="#f00"/>',
    );
    expect(stroked.ink).toMatchObject({ dark: 0.5, light: 0, weight: 2 });
  });

  it('weights paints by opacity and skips invisible ones', () => {
    const shaded = svg(
      `${dot('#f00')}<g opacity="50%">${dot('#000')}</g><path d="M0 0h1v1z" fill-opacity="0"/>`,
    );
    expect(shaded.ink.weight).toBe(1.5);
    expect(shaded.ink.dark).toBeCloseTo(1 / 3);
    expect(() => svg('<path d="M0 0h1v1z" opacity="x"/>')).toThrow(
      /malformed opacity/,
    );
  });

  it('ignores masks, clip paths and gradient definitions', () => {
    const masked = svg(
      `<defs><mask id="m"><rect width="10" height="10" fill="#fff"/>${dot('#000')}</mask></defs><circle cx="5" cy="5" r="2" fill="#f00" mask="url(#m)"/>`,
    );
    expect(masked.overall).toEqual({ dark: 0, light: 0, weight: 1 });
  });

  it('splits gradient paints across stops, following href templates', () => {
    const gradient = svg(
      '<defs><linearGradient id="a"><stop stop-color="#000"/><stop stop-color="#fff" stop-opacity="0"/></linearGradient><radialGradient id="b" xlink:href="#a"/></defs><path d="M0 0h1v1z" fill="url(#b)"/>',
    );
    expect(gradient.ink).toEqual({ dark: 1, light: 0, weight: 0.5 });
    expect(() =>
      svg('<defs><pattern id="p"/></defs><path d="M0 0h1v1z" fill="url(#p)"/>'),
    ).toThrow(/unsupported paint server <pattern>/);
    expect(() => svg('<path d="M0 0h1v1z" fill="url(#nope)"/>')).toThrow(
      /unresolved reference/,
    );
    expect(() =>
      svg(
        '<defs><linearGradient id="a" href="#b"/><linearGradient id="b" href="#a"/></defs><path d="M0 0h1v1z" fill="url(#a)"/>',
      ),
    ).toThrow(/too deep/);
  });

  it('follows <use> into elements and symbols, rejecting cycles', () => {
    const used = svg(
      '<defs><path id="p" d="M0 0h1v1z"/><symbol id="s"><path d="M0 0h1v1z" fill="#fff"/></symbol></defs><use href="#p"/><use xlink:href="#s" x="1" y="1"/>',
    );
    expect(used.ink).toMatchObject({ dark: 0.5, light: 0.5, weight: 2 });
    expect(() => svg('<g id="g"><use href="#g"/></g>')).toThrow(
      /circular <use>/,
    );
  });

  it('treats a large bottom fill as the container', () => {
    const disc = svg(
      `<circle cx="5" cy="5" r="5" fill="#00f"/>${dot('#fff')}${dot('#fff')}`,
    );
    expect(disc.container).toMatchObject({ dark: 0, light: 0 });
    expect(disc.ink.light).toBe(1);
    expect(isDominatedBy(disc, 'light')).toBe(false);

    const blackSquare = svg(`<path d="M0 0h10v10H0z"/>${dot('#fff')}`);
    expect(isDominatedBy(blackSquare, 'dark')).toBe(false);
    const allBlack = svg(`<rect width="10" height="10"/>${dot('#000')}`);
    expect(isDominatedBy(allBlack, 'dark')).toBe(true);
    expect(isMonochrome(allBlack, 'dark')).toBe(true);
    expect(isMonochrome(blackSquare, 'dark')).toBe(false);

    // A lone shape is the mark itself, not a container.
    expect(svg('<rect width="10" height="10"/>').container).toBeUndefined();
    // Too small: 5 of 10 units.
    expect(
      svg(`<rect width="5" height="5"/>${dot('#fff')}`).container,
    ).toBeUndefined();
  });

  it('measures extents through transforms, arcs and every shape', () => {
    const contained = (shape: string, viewBox?: string): boolean =>
      svg(`${shape}${dot('#fff')}`, viewBox).container !== undefined;
    // A circle drawn as two arcs, as SVGO writes it (packed flags too).
    expect(contained('<path d="M5 0a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"/>')).toBe(
      true,
    );
    expect(contained('<path d="M0 5a5 5 0 1110 0 5 5 0 01-10 0z"/>')).toBe(
      true,
    );
    expect(contained('<path d="M0 0a0 0 0 0 0 10 10"/>')).toBe(true);
    expect(contained('<path d="M0 5A1 1 0 0 1 10 5L10 10Z"/>')).toBe(true);
    expect(
      contained('<path d="M0 0C10 0 10 10 0 10S0 0 0 0Q5 5 5 5T6 6"/>'),
    ).toBe(true);
    expect(contained('<path d="m0 0 6 0V6h-6v-6M1 1l1 1"/>')).toBe(true);
    expect(contained('<ellipse cx="5" cy="5" rx="5" ry="4"/>')).toBe(true);
    expect(contained('<line x1="0" y1="0" x2="10" y2="10"/>')).toBe(true);
    expect(contained('<polygon points="0,0 10,0 10,10"/>')).toBe(true);
    expect(contained('<polyline points="0 0 10 10"/>')).toBe(true);
    expect(contained('<rect width="2" height="2" transform="scale(5)"/>')).toBe(
      true,
    );
    expect(
      contained('<rect width="2" height="2" transform="matrix(5 0 0 5 0 0)"/>'),
    ).toBe(true);
    expect(
      contained('<rect width="10" height="10" transform="translate(8)"/>'),
    ).toBe(false);
    expect(
      contained('<rect width="10" height="10" transform="rotate(45 5 5)"/>'),
    ).toBe(true);
    expect(
      contained(
        '<rect width="10" height="10" transform="skewX(10) skewY(10)"/>',
      ),
    ).toBe(true);
    expect(contained('<rect width="10" height="10"/>', '-10 -10 20 20')).toBe(
      false,
    );
    expect(() =>
      contained('<rect width="1" height="1" transform="spin(2)"/>'),
    ).toThrow(/unsupported transform/);
    expect(() =>
      contained('<rect width="1" height="1" transform="oops"/>'),
    ).toThrow(/malformed transform/);
    expect(() => contained('<path d="X0 0"/>')).toThrow(/malformed path data/);
    expect(() => contained('<path d="M0 0L1"/>')).toThrow(
      /malformed path data/,
    );
    expect(() => contained('<text/>')).toThrow(/unsupported element <text>/);
  });

  it('rejects a missing viewBox', () => {
    expect(() => analyzeTone(parseSvg('<svg/>'))).toThrow(/viewBox/);
  });

  it('compares geometry without paint', () => {
    const a = parseSvg(
      '<svg viewBox="0 0 1 1" fill="#000"><path d="M0 0h1v1z" fill="#111"/></svg>',
    );
    const b = parseSvg(
      '<svg viewBox="0 0 1 1" fill="currentColor"><path d="M0 0h1v1z"/></svg>',
    );
    const c = parseSvg('<svg viewBox="0 0 1 1"><path d="M0 0h1v2z"/></svg>');
    expect(geometryOf(a)).toBe(geometryOf(b));
    expect(geometryOf(a)).not.toBe(geometryOf(c));
  });

  it('measures artwork that paints nothing as weightless', () => {
    expect(svg('<path d="M0 0h1v1z" fill="none"/>').overall).toEqual({
      dark: 0,
      light: 0,
      weight: 0,
    });
    expect(svg(dot('currentColor')).overall).toEqual({
      dark: 0,
      light: 0,
      weight: 1,
    });
  });
});
