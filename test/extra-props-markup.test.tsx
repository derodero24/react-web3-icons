// biome-ignore-all lint/style/useNamingConvention: keys are icon export names (PascalCase)
import type { ComponentType } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import * as avalanche from '../src/chain/Avalanche';
import * as bybit from '../src/exchange/Bybit';
import * as rainbowWallet from '../src/wallet/RainbowWallet';

/**
 * Pins what the icons with extra props (`withBackground`, `fill1`/`fill2`)
 * paint for every combination of those props, so the way they are built can
 * change without changing what they render.
 *
 * The markup is compared after two normalizations that do not change the
 * rendering: internal ids are renumbered in order of appearance, and `fill`
 * is resolved onto every painted shape (inherited from its nearest ancestor,
 * SVG's initial `black` otherwise) instead of being compared where it is
 * declared.
 */

const SHAPES = new Set([
  'circle',
  'ellipse',
  'line',
  'path',
  'polygon',
  'polyline',
  'rect',
  'use',
]);

function effectiveFill(element: Element): string {
  for (let node: Element | null = element; node; node = node.parentElement) {
    const fill = node.getAttribute('fill');
    if (fill !== null) {
      return fill;
    }
  }
  return 'black';
}

function normalize(markup: string): string {
  const template = document.createElement('template');
  template.innerHTML = markup;
  const elements = [...template.content.querySelectorAll('*')];
  const fills = elements.map(el => (SHAPES.has(el.tagName) ? el : undefined));
  const resolved = fills.map(el => (el ? effectiveFill(el) : undefined));
  for (const [i, el] of elements.entries()) {
    const fill = resolved[i];
    if (fill === undefined) {
      el.removeAttribute('fill');
    } else {
      el.setAttribute('fill', fill);
    }
  }
  let html = template.innerHTML;
  const ids = elements
    .map(el => el.getAttribute('id'))
    .filter(id => id !== null);
  for (const [i, id] of ids.entries()) {
    html = html.replaceAll(`"${id}"`, `"id${i}"`);
    html = html.replaceAll(`#${id})`, `#id${i})`);
    html = html.replaceAll(`"#${id}"`, `"#id${i}"`);
  }
  return html;
}

type Props = Readonly<Record<string, string | number | boolean | undefined>>;

/** Every combination of the given prop values (undefined = prop omitted). */
function combinations(
  values: Readonly<Record<string, readonly (string | boolean | undefined)[]>>,
): Props[] {
  return Object.entries(values).reduce<Props[]>(
    (acc, [key, options]) =>
      acc.flatMap(props =>
        options.map(value =>
          value === undefined ? props : { ...props, [key]: value },
        ),
      ),
    [{}],
  );
}

function isComponent(value: unknown): value is ComponentType<Props> {
  return (
    typeof value === 'object' &&
    value !== null &&
    '$$typeof' in value &&
    value.$$typeof === Symbol.for('react.forward_ref')
  );
}

const FILL = { fill: ['#123456', undefined] };
const BACKGROUND = { withBackground: [undefined, true, false], ...FILL };
const BYBIT = {
  fill1: [undefined, '#111'],
  fill2: [undefined, '#222'],
  ...FILL,
};

/** Prop values to combine, per export of each module. */
const cases = [
  [
    'Avalanche',
    avalanche,
    {
      Avalanche: FILL,
      AvalancheCircle: BACKGROUND,
      AvalancheCircleMono: BACKGROUND,
      AvalancheMono: FILL,
      AvalancheSquare: FILL,
      AvalancheSquareMono: FILL,
    },
  ],
  ['Bybit', bybit, { Bybit: BYBIT, BybitInverted: BYBIT, BybitMono: BYBIT }],
  [
    'RainbowWallet',
    rainbowWallet,
    {
      RainbowWallet: BACKGROUND,
      RainbowWalletCircle: FILL,
      RainbowWalletCircleMono: FILL,
      RainbowWalletMono: FILL,
      RainbowWalletSquare: FILL,
      RainbowWalletSquareMono: FILL,
      RainbowWalletSymbol: BACKGROUND,
      RainbowWalletSymbolMono: FILL,
    },
  ],
] as const;

describe('icons with extra props', () => {
  it.each(cases)(
    '%s renders unchanged for every prop combination',
    (_unit, mod, exports) => {
      const members = new Map<string, unknown>(Object.entries(mod));
      const exported = [...members]
        .filter(([, value]) => isComponent(value))
        .map(([name]) => name);
      expect(exported.sort()).toEqual(Object.keys(exports).sort());
      const rendered: Record<string, string> = {};
      for (const [name, values] of Object.entries(exports)) {
        const Icon = members.get(name);
        if (!isComponent(Icon)) {
          throw new Error(`${name} is not an icon component`);
        }
        for (const props of combinations(values)) {
          rendered[`${name} ${JSON.stringify(props)}`] = normalize(
            renderToStaticMarkup(<Icon {...props} />),
          );
        }
        rendered[`${name} titled`] = normalize(
          renderToStaticMarkup(<Icon title="Label" size={20} className="c" />),
        );
      }
      expect(rendered).toMatchSnapshot();
    },
  );
});
