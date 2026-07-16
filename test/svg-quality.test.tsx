import type { ComponentType } from 'react';
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import * as icons from '../src';

const forwardRefType = Symbol.for('react.forward_ref');
const entries = Object.entries(icons).filter(([, value]) => {
  if (typeof value === 'function') {
    return true;
  }
  if (
    typeof value === 'object' &&
    value !== null &&
    '$$typeof' in (value as object)
  ) {
    return (value as { $$typeof?: unknown }).$$typeof === forwardRefType;
  }
  return false;
}) as [string, ComponentType][];

describe('SVG quality checks', () => {
  describe.each(entries)('%s', (_name, Component) => {
    let svg: SVGSVGElement | null = null;
    let root: ReturnType<typeof ReactDOM.createRoot> | null = null;

    beforeAll(() => {
      const container = document.createElement('div');
      root = ReactDOM.createRoot(container);
      flushSync(() => {
        root?.render(<Component />);
      });
      svg = container.querySelector('svg');
    });

    afterAll(() => {
      root?.unmount();
      root = null;
      svg = null;
    });

    it('renders an SVG element', () => {
      expect(
        svg,
        `${_name}: component did not render an <svg> element`,
      ).not.toBeNull();
    });

    it('has a viewBox attribute', () => {
      expect(
        svg?.getAttribute('viewBox'),
        `${_name}: missing viewBox`,
      ).toBeTruthy();
    });

    it('viewBox is 4 space-separated numbers with positive width/height', () => {
      const viewBox = svg?.getAttribute('viewBox');
      if (!viewBox) {
        return; // covered by the previous test
      }
      const parts = viewBox.trim().split(/\s+/);
      expect(
        parts.length,
        `${_name}: viewBox "${viewBox}" must have exactly 4 values`,
      ).toBe(4);
      for (const part of parts) {
        expect(
          Number.isFinite(Number(part)),
          `${_name}: viewBox value "${part}" is not a valid number`,
        ).toBe(true);
      }
      const width = Number(parts[2]);
      const height = Number(parts[3]);
      expect(
        width,
        `${_name}: viewBox width must be positive, got ${width}`,
      ).toBeGreaterThan(0);
      expect(
        height,
        `${_name}: viewBox height must be positive, got ${height}`,
      ).toBeGreaterThan(0);
    });

    it('has no <style> tags', () => {
      const styleTags = svg?.querySelectorAll('style') ?? [];
      expect(
        styleTags.length,
        `${_name}: contains <style> tags — use style props or direct attributes instead`,
      ).toBe(0);
    });

    it('has only namespaced internal IDs', () => {
      // Internal IDs are deterministic (RSC-compatible, no useId) but must be
      // namespaced with a component prefix so different icons never collide:
      // `w3i-<componentname>-<local>`. Alias exports render their canonical
      // component, so the embedded name may differ from the export name.
      const namespacedIdRe = /^w3i-[a-z0-9]+-/;
      const elementsWithId = svg?.querySelectorAll('[id]') ?? [];
      const badIds: string[] = [];
      for (const el of elementsWithId) {
        const id = el.getAttribute('id') ?? '';
        // Title element IDs are user-controlled via the titleId prop — always allow them
        if (el.tagName.toLowerCase() === 'title') {
          continue;
        }
        if (!namespacedIdRe.test(id)) {
          badIds.push(id);
        }
      }
      expect(
        badIds,
        `${_name}: contains IDs outside the w3i- namespace: ${badIds.join(', ')}`,
      ).toHaveLength(0);
    });

    it('SVG root has no hardcoded px dimensions', () => {
      const width = svg?.getAttribute('width');
      const height = svg?.getAttribute('height');
      if (width) {
        expect(width, `${_name}: hardcoded px width`).not.toMatch(
          /[+-]?(?:\d+|\d*\.\d+)px$/i,
        );
      }
      if (height) {
        expect(height, `${_name}: hardcoded px height`).not.toMatch(
          /[+-]?(?:\d+|\d*\.\d+)px$/i,
        );
      }
    });
  });
});
