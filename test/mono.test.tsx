import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { describe, expect, it } from 'vitest';
import {
  AlchemyMono,
  BitcoinMono,
  EthereumMono,
  OpenSeaMono,
  PhantomWalletMono,
  SolanaMono,
  UniswapMono,
} from '../src';

const monoIcons = [
  ['EthereumMono', EthereumMono],
  ['BitcoinMono', BitcoinMono],
  ['PhantomWalletMono', PhantomWalletMono],
  ['UniswapMono', UniswapMono],
  ['OpenSeaMono', OpenSeaMono],
  ['AlchemyMono', AlchemyMono],
  ['SolanaMono', SolanaMono],
] as const;

describe('Mono variant icons', () => {
  it.each(
    monoIcons,
  )('%s uses currentColor instead of hardcoded colors', (_name, Component) => {
    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);
    flushSync(() => {
      root.render(<Component />);
    });
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();

    // Mono icons use currentColor as primary color (on <svg> or child
    // elements), with #fff/#000 allowed for contrast elements
    const allowed = new Set(['currentColor', '#fff', '#000']);
    const allElements = container.querySelectorAll(
      'svg, path, circle, rect, polygon',
    );
    for (const el of allElements) {
      const fill = el.getAttribute('fill');
      const stroke = el.getAttribute('stroke');
      if (fill && fill !== 'none') {
        expect(
          allowed.has(fill),
          `Unexpected fill "${fill}" — expected currentColor, #fff, or #000`,
        ).toBe(true);
      }
      if (stroke && stroke !== 'none') {
        expect(
          allowed.has(stroke),
          `Unexpected stroke "${stroke}" — expected currentColor, #fff, or #000`,
        ).toBe(true);
      }
    }

    // At least one element must use currentColor
    const allFills = Array.from(allElements).map(el => el.getAttribute('fill'));
    const allStrokes = Array.from(allElements).map(el =>
      el.getAttribute('stroke'),
    );
    const usesCurrentColor =
      allFills.includes('currentColor') || allStrokes.includes('currentColor');
    expect(
      usesCurrentColor,
      'Mono icon must use currentColor at least once',
    ).toBe(true);
    root.unmount();
  });
});
