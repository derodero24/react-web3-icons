import type { ComponentType } from 'react';
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { describe, expect, it } from 'vitest';
import * as icons from '../src';

// Dynamically discover all Mono variants from exports
const monoEntries = Object.entries(icons).filter(
  ([name]) => /Mono\d*$/.test(name) && name !== 'IconContext',
) as [string, ComponentType][];

describe('Mono variant icons', () => {
  it('discovers at least 30 Mono variants', () => {
    expect(monoEntries.length).toBeGreaterThanOrEqual(30);
  });

  it.each(
    monoEntries,
  )('%s uses currentColor instead of hardcoded colors', (_name, Component) => {
    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);
    flushSync(() => {
      root.render(<Component />);
    });
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();

    // Mono icons use currentColor as primary color (on <svg> or child
    // elements), with #fff/#000/black/white allowed for contrast or masks.
    // Elements inside <defs> (masks, clip-paths) use colors for alpha
    // values, not visible colors, so they are excluded.
    const allowed = new Set(['currentColor', '#fff', '#000', 'black', 'white']);
    const allElements = container.querySelectorAll(
      'svg, path, circle, rect, polygon, ellipse, line, polyline, g',
    );
    const visibleElements = Array.from(allElements).filter(
      el => !el.closest('defs'),
    );
    for (const el of visibleElements) {
      const fill = el.getAttribute('fill');
      const stroke = el.getAttribute('stroke');
      if (fill && fill !== 'none') {
        expect(
          allowed.has(fill),
          `${_name}: unexpected fill "${fill}" — expected currentColor, #fff, or #000`,
        ).toBe(true);
      }
      if (stroke && stroke !== 'none') {
        expect(
          allowed.has(stroke),
          `${_name}: unexpected stroke "${stroke}" — expected currentColor, #fff, or #000`,
        ).toBe(true);
      }
    }

    // At least one visible element or <svg> must use currentColor
    const svgFill = svg?.getAttribute('fill');
    const usesCurrentColor =
      svgFill === 'currentColor' ||
      visibleElements.some(
        el =>
          el.getAttribute('fill') === 'currentColor' ||
          el.getAttribute('stroke') === 'currentColor',
      );
    expect(
      usesCurrentColor,
      `${_name}: must use currentColor at least once`,
    ).toBe(true);
    root.unmount();
  });
});
