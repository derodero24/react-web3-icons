import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import {
  AvalancheCircle,
  AvalancheCircleMono,
  AvalancheSquare,
} from '../src/chain/Avalanche';
import { Bybit, BybitInverted, BybitMono } from '../src/exchange/Bybit';
import { createIcon } from '../src/utils';
import {
  RainbowWallet,
  RainbowWalletSymbol,
} from '../src/wallet/RainbowWallet';

/**
 * Behaviour of the extra props some units declare (`props` in their unit
 * JSON): `withBackground` toggles between two variants' artwork, `fill1` /
 * `fill2` set the fill of marked elements. extra-props-markup.test.tsx pins
 * their rendering for every combination.
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

/** Effective `fill` of the direct `<path>` children, in document order. */
function pathFills(svg: SVGSVGElement): (string | null)[] {
  return [...svg.querySelectorAll(':scope > path')].map(
    path => path.getAttribute('fill') ?? svg.getAttribute('fill'),
  );
}

describe('Avalanche withBackground', () => {
  // The white fill behind the glyph, on the 64×64 grid.
  const background = 'M12.208 10.95H51.75v35.963H12.208z';
  const hasBackground = (svg: SVGSVGElement) =>
    svg.querySelector(`path[d="${background}"]`) !== null;

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

  it('each variant keeps its own fill', () => {
    expect(renderSvg(<AvalancheCircle />).getAttribute('fill')).toBe('#e84142');
    expect(
      renderSvg(<AvalancheCircleMono withBackground />).getAttribute('fill'),
    ).toBe('currentColor');
  });

  it('withBackground is not forwarded to the DOM', () => {
    const svg = renderSvg(<AvalancheCircle withBackground />);
    expect(svg.hasAttribute('withBackground')).toBe(false);
    expect(svg.hasAttribute('withbackground')).toBe(false);
  });

  it('is only accepted by the variants it switches', () => {
    // @ts-expect-error AvalancheSquare has no withBackground prop
    const element = <AvalancheSquare withBackground />;
    expect(element.props).toHaveProperty('withBackground', true);
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
    const svg = renderSvg(<BybitMono fill="#333" fill2="#222" />);
    expect(svg.getAttribute('fill')).toBe('#333');
    expect(pathFills(svg)).toEqual(['#333', '#222']);
  });
});

describe('RainbowWallet withBackground', () => {
  // The gradient tile, in the 120-unit artwork scaled onto the 64×64 grid.
  const tile = 'M0 0h120v120H0z';
  // Both artworks share the grid; the toggle switches the artwork only.

  it('RainbowWallet includes the gradient tile by default', () => {
    const svg = renderSvg(<RainbowWallet />);
    expect(svg.getAttribute('viewBox')).toBe('0 0 64 64');
    expect(svg.querySelector(`path[d="${tile}"]`)).not.toBeNull();
  });

  it('RainbowWalletSymbol crops to the arcs by default', () => {
    const svg = renderSvg(<RainbowWalletSymbol />);
    expect(svg.getAttribute('viewBox')).toBe('0 0 64 64');
    expect(svg.querySelector(`path[d="${tile}"]`)).toBeNull();
  });

  it('withBackground overrides each default', () => {
    const symbol = renderSvg(<RainbowWallet withBackground={false} />);
    expect(symbol.getAttribute('viewBox')).toBe('0 0 64 64');
    expect(symbol.querySelector(`path[d="${tile}"]`)).toBeNull();
    const tiled = renderSvg(<RainbowWalletSymbol withBackground />);
    expect(tiled.getAttribute('viewBox')).toBe('0 0 64 64');
    expect(tiled.querySelector(`path[d="${tile}"]`)).not.toBeNull();
  });
});

describe('a viewBox that depends on extra props', () => {
  // Every generated icon shares the 64×64 grid today, so no toggle switches
  // the viewBox any more; the generator still emits this form for toggles
  // between artworks with different viewBoxes.
  const Toggled = createIcon<{ readonly wide?: boolean }>(
    'Toggled',
    ({ wide }) => (wide ? '0 0 128 64' : '0 0 64 64'),
    () => <path d="M0 0h64v64H0z" />,
    { props: ['wide'] },
  );

  it('follows the prop', () => {
    expect(renderSvg(<Toggled />).getAttribute('viewBox')).toBe('0 0 64 64');
    const wide = renderSvg(<Toggled wide />);
    expect(wide.getAttribute('viewBox')).toBe('0 0 128 64');
    expect(wide.hasAttribute('wide')).toBe(false);
  });
});
