import type { ReactElement } from 'react';
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { Ethereum, MetaMask, Uniswap } from '../src';

const testIcons = [
  ['Ethereum', Ethereum],
  ['MetaMask', MetaMask],
  ['Uniswap', Uniswap],
] as const;

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

describe.each(testIcons)('%s accessibility', (_name, Icon) => {
  it('is decorative by default (aria-hidden, no role)', () => {
    const container = renderToContainer(<Icon />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
    expect(svg?.getAttribute('role')).toBeNull();
  });

  it('becomes non-decorative when title is provided', () => {
    const container = renderToContainer(<Icon title="Icon title" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBeNull();
    expect(svg?.getAttribute('role')).toBe('img');
  });

  it('becomes non-decorative when aria-label is provided', () => {
    const container = renderToContainer(<Icon aria-label="Icon label" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBeNull();
    expect(svg?.getAttribute('role')).toBe('img');
  });

  it('becomes non-decorative when aria-labelledby is provided', () => {
    const container = renderToContainer(
      <Icon aria-labelledby="external-label" />,
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBeNull();
    expect(svg?.getAttribute('role')).toBe('img');
  });

  it('renders title with titleId for aria-labelledby linking', () => {
    const container = renderToContainer(
      <Icon title="Accessible" titleId="my-title" />,
    );
    const title = container.querySelector('title');
    expect(title?.getAttribute('id')).toBe('my-title');
    expect(title?.textContent).toBe('Accessible');
  });

  it('passes through arbitrary aria-* attributes', () => {
    const container = renderToContainer(
      <Icon aria-describedby="desc-id" aria-live="polite" />,
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-describedby')).toBe('desc-id');
    expect(svg?.getAttribute('aria-live')).toBe('polite');
  });
});
