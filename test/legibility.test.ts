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
  'defi/Frax': {
    tone: 'light',
    kind: 'no-official-alternative',
    searched: ['https://docs.frax.com', 'https://frax.com'],
    note: "A static misreading: the official FraxIcon's white disc is only a keyline ring under the black disc, so on light backgrounds the icon reads as the black disc with the white crosshair, but counting paints treats the white disc as a light container and the black disc and white crosshair as half light. FraxMono with a dark color is the same black disc.",
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

  it('parses hex and keyword colours with alpha and rejects others', () => {
    expect(parseColor('#fff')).toEqual({ rgb: [255, 255, 255], alpha: 1 });
    expect(parseColor('#0008')).toEqual({ rgb: [0, 0, 0], alpha: 0x88 / 255 });
    expect(parseColor('#fff0')).toEqual({ rgb: [255, 255, 255], alpha: 0 });
    expect(parseColor('#12345678')).toEqual({
      rgb: [0x12, 0x34, 0x56],
      alpha: 0x78 / 255,
    });
    expect(parseColor('#ffffff00').alpha).toBe(0);
    expect(parseColor('Black')).toEqual({ rgb: [0, 0, 0], alpha: 1 });
    expect(parseColor('transparent').alpha).toBe(0);
    for (const unsupported of [
      'rgb(0,0,0)',
      'rgba(0,0,0,0)',
      'hsla(0,0%,0%,0)',
      'red',
    ]) {
      expect(() => parseColor(unsupported)).toThrow(/unsupported colour/);
    }
  });

  it('drops transparent colours, solid or in gradients (regression)', () => {
    // Fully transparent paints must not dilute the black mark's share.
    const solid = svg(
      `${dot('#000')}${dot('#fff0')}${dot('#ffffff00')}${dot('transparent')}`,
    );
    expect(solid.overall).toEqual({ dark: 1, light: 0, weight: 1 });
    expect(isDominatedBy(solid, 'dark')).toBe(true);
    // Half-transparent white counts half.
    expect(svg(`${dot('#000')}${dot('#ffffff80')}`).overall.light).toBeCloseTo(
      0x80 / 255 / (1 + 0x80 / 255),
    );
    // A gradient whose stops are all invisible paints no container.
    const invisible = svg(
      `<defs><linearGradient id="g"><stop stop-color="#f00" stop-opacity="0"/><stop stop-color="#00f0"/></linearGradient></defs><rect width="10" height="10" fill="url(#g)"/>${dot('#000')}`,
    );
    expect(invisible.container).toBeUndefined();
    expect(invisible.overall).toEqual({ dark: 1, light: 0, weight: 1 });
    expect(isDominatedBy(invisible, 'dark')).toBe(true);
    // Stop alpha multiplies stop-opacity.
    const faded = svg(
      `<defs><linearGradient id="g"><stop stop-color="#0008" stop-opacity=".5"/></linearGradient></defs><path d="M0 0h1v1z" fill="url(#g)"/>`,
    );
    expect(faded.overall.weight).toBeCloseTo((0x88 / 255) * 0.5);
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

  it('paints a symbol in its own and the <use> paint context (regression)', () => {
    const own = svg(
      '<defs><symbol id="s" fill="#fff"><path d="M0 0h1v1z"/></symbol></defs><use href="#s"/>',
    );
    expect(own.overall).toEqual({ dark: 0, light: 1, weight: 1 });
    const fromUse = svg(
      '<defs><symbol id="s"><path d="M0 0h1v1z"/></symbol></defs><use href="#s" fill="#fff" opacity=".5"/>',
    );
    expect(fromUse.overall).toEqual({ dark: 0, light: 1, weight: 0.5 });
    // The symbol's own paint wins over the <use>'s.
    const both = svg(
      '<defs><symbol id="s" fill="#000"><path d="M0 0h1v1z"/></symbol></defs><use href="#s" fill="#fff"/>',
    );
    expect(both.overall.dark).toBe(1);
  });

  it('never fills lines or outlines without area (regression)', () => {
    const diagonal = '<line x1="0" y1="0" x2="10" y2="10" fill="#f00"/>';
    // An unstroked line paints nothing, so it cannot be a container.
    const unstroked = svg(`${diagonal}${dot('#000')}`);
    expect(unstroked.container).toBeUndefined();
    expect(unstroked.overall).toEqual({ dark: 1, light: 0, weight: 1 });
    expect(isDominatedBy(unstroked, 'dark')).toBe(true);
    // A stroked line paints only its stroke: no default black fill.
    const stroked = svg('<line x1="0" y1="0" x2="10" y2="10" stroke="#f00"/>');
    expect(stroked.overall).toEqual({ dark: 0, light: 0, weight: 1 });
    for (const flat of [
      '<polyline points="0 0 10 10" fill="#f00"/>',
      '<path d="M0 0L10 10" fill="#f00"/>',
      '<path d="M0 0l5 5 5 5z" fill="#f00"/>',
      '<rect width="10" height="0" fill="#f00"/>',
    ]) {
      const measured = svg(`${flat}${dot('#000')}`);
      expect(measured.container, flat).toBeUndefined();
      expect(measured.overall.weight, flat).toBe(1);
    }
    const polylineStroke = svg(
      '<polyline points="0 0 10 10" fill="#f00" stroke="#fff"/>',
    );
    expect(polylineStroke.overall).toEqual({ dark: 0, light: 1, weight: 1 });
  });

  it('checks fill area per subpath (regression)', () => {
    // Two disconnected flat lines: together their points span the viewBox,
    // but neither subpath bounds an area, so the red fill paints nothing.
    for (const lines of [
      '<path d="M0 0L10 0M0 10L10 10" fill="#f00"/>',
      '<path d="M0 0h10m-10 10h10" fill="#f00"/>',
      '<path d="M0 0h10zl0 10 0 0z" fill="#f00"/>',
    ]) {
      const measured = svg(`${lines}${dot('#000')}`);
      expect(measured.container, lines).toBeUndefined();
      expect(measured.overall, lines).toEqual({ dark: 1, light: 0, weight: 1 });
      expect(isDominatedBy(measured, 'dark'), lines).toBe(true);
    }
    // One subpath with area is enough to fill, and only it sizes the fill:
    // a small triangle plus a viewBox-wide flat line is no container.
    const small = svg(
      `<path d="M0 0h2v2zM0 10h10" fill="#f00"/>${dot('#000')}`,
    );
    expect(small.container).toBeUndefined();
    expect(small.overall).toEqual({ dark: 0.5, light: 0, weight: 2 });
    // A second subpath after a closepath (no moveto) still counts.
    const reopened = svg(
      `<path d="M0 0h10zv10h10z" fill="#f00"/>${dot('#000')}`,
    );
    expect(reopened.container).toMatchObject({ dark: 0, light: 0 });
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
    // A zero-radius arc is a straight line: a triangle once closed.
    expect(contained('<path d="M0 0a0 0 0 0 0 10 10H0z"/>')).toBe(true);
    expect(contained('<path d="M0 0a0 0 0 0 0 10 10"/>')).toBe(false);
    expect(contained('<path d="M0 5A1 1 0 0 1 10 5L10 10Z"/>')).toBe(true);
    expect(
      contained('<path d="M0 0C10 0 10 10 0 10S0 0 0 0Q5 5 5 5T6 6"/>'),
    ).toBe(true);
    expect(contained('<path d="m0 0 6 0V6h-6v-6M1 1l1 1"/>')).toBe(true);
    expect(contained('<ellipse cx="5" cy="5" rx="5" ry="4"/>')).toBe(true);
    // Lines and two-point polylines have no fill area (see above).
    expect(contained('<line x1="0" y1="0" x2="10" y2="10"/>')).toBe(false);
    expect(contained('<polygon points="0,0 10,0 10,10"/>')).toBe(true);
    expect(contained('<polyline points="0 0 10 10"/>')).toBe(false);
    expect(contained('<polyline points="0 0 10 0 10 10"/>')).toBe(true);
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

  it('keeps whether shapes fill or stroke in geometry (regression)', () => {
    const geometry = (root: string, shape: string): string =>
      geometryOf(parseSvg(`<svg viewBox="0 0 10 10"${root}>${shape}</svg>`));
    const circle = '<circle cx="5" cy="5" r="4"';
    const disc = geometry('', `${circle} fill="#000"/>`);
    const ring = geometry('', `${circle} fill="none" stroke="#000"/>`);
    expect(ring).not.toBe(disc);
    // Enablement is resolved through inheritance, colours are ignored.
    expect(geometry(' fill="currentColor"', `${circle}/>`)).toBe(disc);
    expect(geometry('', `${circle}/>`)).toBe(disc);
    expect(geometry(' fill="none" stroke="currentColor"', `${circle}/>`)).toBe(
      ring,
    );
    expect(
      geometry('', `<g fill="none" stroke="#123">${circle}/></g>`),
    ).not.toBe(geometry('', `<g fill="#123">${circle}/></g>`));
    // Zero-alpha colours paint nothing, as in the tone measure.
    for (const invisible of ['#fff0', '#ffffff00', '#00000000']) {
      expect(geometry('', `${circle} fill="${invisible}"/>`), invisible).toBe(
        geometry('', `${circle} fill="none"/>`),
      );
      // A black mark with an invisible rect is not a Mono painting that rect.
      const rect = '<rect width="10" height="10"';
      expect(
        geometry('', `${rect} fill="${invisible}"/>${circle} fill="#000"/>`),
        invisible,
      ).not.toBe(geometry(' fill="currentColor"', `${rect}/>${circle}/>`));
    }
    expect(geometry('', `${circle} fill="#fff8"/>`)).toBe(disc);
    // So do gradients whose stops are all invisible.
    expect(
      geometry(
        '',
        `<defs><linearGradient id="g"><stop stop-color="#000" stop-opacity="0"/></linearGradient></defs>${circle} fill="url(#g)"/>`,
      ),
    ).not.toBe(
      geometry(
        '',
        `<defs><linearGradient id="g"><stop stop-color="#000" stop-opacity="0"/></linearGradient></defs>${circle} fill="#000"/>`,
      ),
    );
    expect(geometry('', `${circle} fill="transparent"/>`)).toBe(
      geometry('', `${circle} fill="none"/>`),
    );
    // Inside a mask, black and white are coverage and stay significant.
    const mask = (inner: string): string =>
      geometry(
        '',
        `<mask id="m"><rect width="10" height="10" fill="${inner}"/></mask>${circle} mask="url(#m)"/>`,
      );
    expect(mask('#fff')).not.toBe(mask('#000'));
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
