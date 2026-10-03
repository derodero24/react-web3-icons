import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { AvalancheCircle, AvalancheCircleMono } from '../src/chain/Avalanche';
import { Bybit, BybitInverted, BybitMono } from '../src/exchange/Bybit';
import {
  RainbowWallet,
  RainbowWalletSymbol,
} from '../src/wallet/RainbowWallet';
import { isIconComponent, loadCustomUnits } from './helpers/units';

/**
 * Hand-maintained (`"kind": "custom"`) icon modules bypass the generator, so
 * their accessibility wiring and extra props are tested here directly.
 */

function renderSvg(element: ReactElement): SVGSVGElement {
  const container = document.createElement('div');
  container.innerHTML = renderToStaticMarkup(element);
  const svg = container.querySelector('svg');
  if (!svg) {
    throw new Error('expected an <svg> root');
  }
  return svg;
}

/** `fill` values of the direct `<path>` children, in document order. */
function pathFills(svg: SVGSVGElement): (string | null)[] {
  return [...svg.querySelectorAll(':scope > path')].map(path =>
    path.getAttribute('fill'),
  );
}

const customExports = await Promise.all(
  loadCustomUnits().flatMap(unit =>
    unit.exportNames.map(async exportName => {
      const mod: Record<string, unknown> = await import(unit.modulePath);
      const Icon = mod[exportName];
      if (!isIconComponent(Icon)) {
        throw new Error(`${exportName} is not an icon component`);
      }
      return [exportName, Icon] as const;
    }),
  ),
);

describe.each(customExports)('%s accessibility', (_name, Icon) => {
  it('is decorative by default', () => {
    const svg = renderSvg(<Icon />);
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.hasAttribute('role')).toBe(false);
    expect(svg.querySelector('title')).toBeNull();
  });

  it('renders a <title> and role="img" when titled', () => {
    const svg = renderSvg(<Icon title="Label" titleId="label-id" />);
    expect(svg.hasAttribute('aria-hidden')).toBe(false);
    expect(svg.getAttribute('role')).toBe('img');
    const title = svg.querySelector('title');
    expect(title?.textContent).toBe('Label');
    expect(title?.id).toBe('label-id');
  });

  it.each([
    ['aria-label', { 'aria-label': 'Label' }],
    ['aria-labelledby', { 'aria-labelledby': 'external-label' }],
  ] as const)('is not decorative with %s', (_attr, labelProps) => {
    const svg = renderSvg(<Icon {...labelProps} />);
    expect(svg.hasAttribute('aria-hidden')).toBe(false);
    expect(svg.getAttribute('role')).toBe('img');
  });

  it('sizes from `size`, overridden by width/height', () => {
    const sized = renderSvg(<Icon size={48} />);
    expect(sized.getAttribute('width')).toBe('48');
    expect(sized.getAttribute('height')).toBe('48');
    const explicit = renderSvg(<Icon size={48} width={10} height={20} />);
    expect(explicit.getAttribute('width')).toBe('10');
    expect(explicit.getAttribute('height')).toBe('20');
  });
});

describe('Avalanche withBackground', () => {
  const Background = 'M287 258h928v844H287z';
  const hasBackground = (svg: SVGSVGElement) =>
    svg.querySelector(`path[d="${Background}"]`) !== null;

  it('AvalancheCircle fills the glyph cut-out by default', () => {
    expect(hasBackground(renderSvg(<AvalancheCircle />))).toBe(true);
    expect(
      hasBackground(renderSvg(<AvalancheCircle withBackground={false} />)),
    ).toBe(false);
  });

  it('AvalancheCircleMono leaves the cut-out transparent by default', () => {
    expect(hasBackground(renderSvg(<AvalancheCircleMono />))).toBe(false);
    expect(
      hasBackground(renderSvg(<AvalancheCircleMono withBackground />)),
    ).toBe(true);
  });

  it('withBackground is not forwarded to the DOM', () => {
    const svg = renderSvg(<AvalancheCircle withBackground />);
    expect(svg.hasAttribute('withBackground')).toBe(false);
    expect(svg.hasAttribute('withbackground')).toBe(false);
  });
});

describe('Bybit fill1 / fill2', () => {
  it.each([
    ['Bybit', Bybit, ['#f7a600', '#15192a']],
    ['BybitInverted', BybitInverted, ['#f7a600', '#fff']],
    ['BybitMono', BybitMono, ['currentColor', 'currentColor']],
  ] as const)('%s uses its brand defaults', (_name, Icon, fills) => {
    expect(pathFills(renderSvg(<Icon />))).toEqual(fills);
  });

  it.each([
    ['Bybit', Bybit],
    ['BybitInverted', BybitInverted],
    ['BybitMono', BybitMono],
  ] as const)('%s applies fill1 / fill2 overrides', (_name, Icon) => {
    const svg = renderSvg(<Icon fill1="#111" fill2="#222" />);
    expect(pathFills(svg)).toEqual(['#111', '#222']);
    expect(svg.hasAttribute('fill1')).toBe(false);
    expect(svg.hasAttribute('fill2')).toBe(false);
  });

  it('BybitMono follows the `fill` prop when no override is given', () => {
    const svg = renderSvg(<BybitMono fill="#333" />);
    expect(svg.getAttribute('fill')).toBe('#333');
    expect(pathFills(svg)).toEqual(['#333', '#333']);
  });
});

describe('RainbowWallet withBackground', () => {
  it('RainbowWallet includes the gradient tile by default', () => {
    const svg = renderSvg(<RainbowWallet />);
    expect(svg.getAttribute('viewBox')).toBe('0 0 120 120');
    expect(svg.querySelector('#w3i-rainbowwallet-rbw-a')).not.toBeNull();
  });

  it('RainbowWalletSymbol crops to the arcs by default', () => {
    const svg = renderSvg(<RainbowWalletSymbol />);
    expect(svg.getAttribute('viewBox')).toBe('20 20 80 80');
    expect(svg.querySelector('#w3i-rainbowwallet-rbw-a')).toBeNull();
  });

  it('withBackground overrides each default', () => {
    expect(renderSvg(<RainbowWallet withBackground={false} />).outerHTML).toBe(
      renderSvg(<RainbowWalletSymbol />).outerHTML,
    );
    expect(renderSvg(<RainbowWalletSymbol withBackground />).outerHTML).toBe(
      renderSvg(<RainbowWallet />).outerHTML,
    );
  });
});
