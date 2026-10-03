import type { ReactElement } from 'react';
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it } from 'vitest';
import { Ens, Ethereum, HardhatMono, NftStorageMono } from '../src';
import { createIcon } from '../src/utils';
import { isIconComponent } from './helpers/units';

/**
 * Internal ids (masks, gradients, clip paths) are unique per rendered
 * instance, so every icon resolves its `url(#…)` references inside its own
 * `<svg>`, whatever happens to the other instances on the page.
 */

const roots: ReturnType<typeof ReactDOM.createRoot>[] = [];

afterEach(() => {
  for (const root of roots) {
    root.unmount();
  }
  roots.length = 0;
});

function render(element: ReactElement): SVGSVGElement[] {
  const container = document.createElement('div');
  const root = ReactDOM.createRoot(container);
  roots.push(root);
  flushSync(() => {
    root.render(element);
  });
  return [...container.querySelectorAll('svg')];
}

/** The ids an `<svg>` references through `url(#…)` and `href="#…"`. */
function references(svg: SVGSVGElement): string[] {
  return [...svg.querySelectorAll('*')].flatMap(el =>
    [...el.attributes].flatMap(({ name, value }) => {
      if (name === 'href' && value.startsWith('#')) {
        return [value.slice(1)];
      }
      return [...value.matchAll(/url\(#([^)]+)\)/g)].flatMap(([, id]) =>
        id === undefined ? [] : [id],
      );
    }),
  );
}

function ids(svg: SVGSVGElement): string[] {
  return [...svg.querySelectorAll('[id]')].map(el => el.id);
}

/** Painted shapes inside masks whose `fill` would come from outside the mask. */
function maskShapesInheritingFill(svg: SVGSVGElement): Element[] {
  return [...svg.querySelectorAll('mask *')].filter(shape => {
    if (shape.children.length > 0) {
      return false;
    }
    for (let el: Element | null = shape; el; el = el.parentElement) {
      if (el.hasAttribute('fill')) {
        return false;
      }
      if (el.tagName === 'mask') {
        return true;
      }
    }
    return true;
  });
}

describe.each([
  ['masked', HardhatMono],
  ['gradient', Ens],
  ['masked with <use>', NftStorageMono],
])('two instances of a %s icon', (_kind, Icon) => {
  it('get distinct ids that resolve inside their own <svg>', () => {
    const svgs = render(
      <>
        <div style={{ display: 'none' }}>
          <Icon />
        </div>
        <Icon />
      </>,
    );
    expect(svgs).toHaveLength(2);
    const [hidden = [], visible = []] = svgs.map(ids);
    expect(visible.length).toBeGreaterThan(0);
    expect(visible.filter(id => hidden.includes(id))).toEqual([]);
    for (const svg of svgs) {
      const own = ids(svg);
      expect(references(svg).filter(id => !own.includes(id))).toEqual([]);
    }
  });

  it('use ids that need no escaping in url() and href', () => {
    for (const id of render(<Icon />).flatMap(ids)) {
      expect(id).toMatch(/^w3i-[a-z0-9]+-[A-Za-z0-9]+-[A-Za-z0-9-]+$/);
    }
  });
});

describe('mask content', () => {
  it('does not inherit `fill` from the host <svg>', () => {
    const svgs = render(
      <>
        <HardhatMono fill="#fff" />
        <HardhatMono />
        <NftStorageMono fill="currentColor" />
      </>,
    );
    for (const svg of svgs) {
      expect(svg.querySelector('mask')).not.toBeNull();
      expect(maskShapesInheritingFill(svg)).toEqual([]);
    }
  });

  it('keeps the fill the source rendered with', () => {
    const [hardhat, nftStorage] = render(
      <>
        <HardhatMono fill="#fff" />
        <NftStorageMono fill="currentColor" />
      </>,
    );
    // No root fill in the source: mask content painted SVG's initial black.
    expect(hardhat?.querySelector('mask')?.getAttribute('fill')).toBe('#000');
    // Root fill="none" in the source: the unfilled content painted nothing.
    expect(nftStorage?.querySelector('mask')?.getAttribute('fill')).toBe(
      'none',
    );
  });
});

describe('server rendering', () => {
  it('is stable across renders and unique within one', () => {
    const page = (
      <>
        <HardhatMono />
        <HardhatMono />
      </>
    );
    const markup = renderToStaticMarkup(page);
    expect(renderToStaticMarkup(page)).toBe(markup);
    const container = document.createElement('div');
    container.innerHTML = markup;
    const [first = [], second = []] = [
      ...container.querySelectorAll('svg'),
    ].map(ids);
    expect(first.length).toBeGreaterThan(0);
    expect(second.filter(id => first.includes(id))).toEqual([]);
  });
});

describe('hooks', () => {
  /** Calls a forwardRef component's render function outside of React. */
  function renderOutsideReact(Icon: unknown): unknown {
    const renderFn: unknown =
      isIconComponent(Icon) && Reflect.get(Icon, 'render');
    if (typeof renderFn !== 'function') {
      throw new Error('not a forwardRef component');
    }
    return renderFn({}, null);
  }

  it('icons without internal ids call none', () => {
    expect(() => renderOutsideReact(Ethereum)).not.toThrow();
  });

  it('icons with internal ids call useId', () => {
    expect(() => renderOutsideReact(HardhatMono)).toThrow();
  });
});

describe('createIcon v4 form', () => {
  const Legacy = createIcon(
    'Legacy',
    '0 0 1 1',
    id => (
      <>
        <mask id={`${id}-m`} />
        <rect width="1" height="1" mask={`url(#${id}-m)`} />
      </>
    ),
    'red',
  );
  const Unfilled = createIcon('Unfilled', '0 0 1 1', () => <rect />);

  it('passes a per-instance id to render(id)', () => {
    const svgs = render(
      <>
        <Legacy />
        <Legacy />
      </>,
    );
    const [first = [], second = []] = svgs.map(ids);
    expect(first).toHaveLength(1);
    expect(second).toHaveLength(1);
    expect(first[0]).not.toBe(second[0]);
    expect(first[0]).toMatch(/^w3i-legacy-[A-Za-z0-9]+-m$/);
    expect(svgs[0]?.getAttribute('fill')).toBe('red');
  });

  it('defaultFill stays optional', () => {
    const [svg] = render(<Unfilled />);
    expect(svg?.hasAttribute('fill')).toBe(false);
  });
});
