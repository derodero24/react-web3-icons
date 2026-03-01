import type { ReactElement } from 'react';
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { Avalanche, Ethereum, IconContext } from '../src';

const roots: ReturnType<typeof ReactDOM.createRoot>[] = [];

afterEach(() => {
  for (const root of roots) {
    root.unmount();
  }
  roots.length = 0;
});

function renderToContainer(element: ReactElement): HTMLElement {
  const container = document.createElement('div');
  const root = ReactDOM.createRoot(container);
  roots.push(root);
  flushSync(() => {
    root.render(element);
  });
  return container;
}

describe('IconContext', () => {
  it('uses default size when no provider is present', () => {
    const container = renderToContainer(<Ethereum />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('1em');
    expect(svg?.getAttribute('height')).toBe('1em');
  });

  it('applies size from context', () => {
    const container = renderToContainer(
      <IconContext.Provider value={{ size: 24 }}>
        <Ethereum />
      </IconContext.Provider>,
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
  });

  it('direct props override context', () => {
    const container = renderToContainer(
      <IconContext.Provider value={{ size: 24 }}>
        <Ethereum size={32} />
      </IconContext.Provider>,
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('32');
    expect(svg?.getAttribute('height')).toBe('32');
  });

  it('applies className from context', () => {
    const container = renderToContainer(
      <IconContext.Provider value={{ className: 'ctx-class' }}>
        <Ethereum />
      </IconContext.Provider>,
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('class')).toBe('ctx-class');
  });

  it('direct className overrides context className', () => {
    const container = renderToContainer(
      <IconContext.Provider value={{ className: 'ctx-class' }}>
        <Ethereum className="direct-class" />
      </IconContext.Provider>,
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('class')).toBe('direct-class');
  });

  it('shallow-merges style from context and direct props', () => {
    const container = renderToContainer(
      <IconContext.Provider value={{ style: { color: 'red' } }}>
        <Ethereum style={{ padding: '4px' }} />
      </IconContext.Provider>,
    );
    const svg = container.querySelector('svg');
    expect(svg?.style.color).toBe('red');
    expect(svg?.style.padding).toBe('4px');
  });

  it('direct style property overrides same context style property', () => {
    const container = renderToContainer(
      <IconContext.Provider value={{ style: { color: 'red', padding: '2px' } }}>
        <Ethereum style={{ color: 'blue' }} />
      </IconContext.Provider>,
    );
    const svg = container.querySelector('svg');
    expect(svg?.style.color).toBe('blue');
    expect(svg?.style.padding).toBe('2px');
  });

  it('inner provider overrides outer provider', () => {
    const container = renderToContainer(
      <IconContext.Provider value={{ size: 24 }}>
        <IconContext.Provider value={{ size: 48 }}>
          <Ethereum />
        </IconContext.Provider>
      </IconContext.Provider>,
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('48');
    expect(svg?.getAttribute('height')).toBe('48');
  });

  it('works with manual forwardRef icons (Avalanche)', () => {
    const container = renderToContainer(
      <IconContext.Provider value={{ size: 24, className: 'ctx' }}>
        <Avalanche />
      </IconContext.Provider>,
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
    expect(svg?.getAttribute('class')).toBe('ctx');
  });

  it('empty context value has no effect', () => {
    const container = renderToContainer(
      <IconContext.Provider value={{}}>
        <Ethereum />
      </IconContext.Provider>,
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('1em');
    expect(svg?.getAttribute('height')).toBe('1em');
  });
});
