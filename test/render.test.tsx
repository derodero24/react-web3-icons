import type { ComponentType } from 'react';
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { describe, expect, it } from 'vitest';
import * as icons from '../src';

const entries = Object.entries(icons).filter(
  ([name]) => name !== 'IconContext',
) as [string, ComponentType][];

describe('All icons render without error', () => {
  it.each(entries)('%s renders without crashing', (_name, Component) => {
    expect(
      typeof Component === 'function' || typeof Component === 'object',
    ).toBe(true);
    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);
    flushSync(() => {
      root.render(<Component />);
    });
    root.unmount();
  });
});
