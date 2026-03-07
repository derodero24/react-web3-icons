import type { ComponentType } from 'react';
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { describe, expect, it } from 'vitest';
import * as icons from '../src';

const entries = Object.entries(icons).filter(
  ([name]) => name !== 'IconContext',
) as [string, ComponentType][];

describe('SVG quality checks', () => {
  describe.each(entries)('%s', (_name, Component) => {
    let container: HTMLElement;
    let svg: SVGSVGElement | null;

    // Render once per icon before the checks
    function ensureRendered() {
      if (container) {
        return;
      }
      container = document.createElement('div');
      const root = ReactDOM.createRoot(container);
      flushSync(() => {
        root.render(<Component />);
      });
      svg = container.querySelector('svg');
    }

    it('has a viewBox attribute', () => {
      ensureRendered();
      expect(
        svg?.getAttribute('viewBox'),
        `${_name}: missing viewBox`,
      ).toBeTruthy();
    });

    it('has no <style> tags', () => {
      ensureRendered();
      const styleTags = svg?.querySelectorAll('style') ?? [];
      expect(
        styleTags.length,
        `${_name}: contains <style> tags — use style props or direct attributes instead`,
      ).toBe(0);
    });

    it('SVG root has no hardcoded px dimensions', () => {
      ensureRendered();
      const width = svg?.getAttribute('width');
      const height = svg?.getAttribute('height');
      if (width) {
        expect(width, `${_name}: hardcoded px width`).not.toMatch(/\d+px$/);
      }
      if (height) {
        expect(height, `${_name}: hardcoded px height`).not.toMatch(/\d+px$/);
      }
    });
  });
});
