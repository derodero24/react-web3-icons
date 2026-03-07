import type { ComponentType } from 'react';
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { describe, expect, it } from 'vitest';
import * as icons from '../src';

// Filter to only forwardRef icon components, excluding non-component exports
// (IconContext, DEPRECATED_ICON_NAMES, type-only exports, etc.)
const FORWARD_REF = Symbol.for('react.forward_ref');
const entries = Object.entries(icons).filter(
  ([, value]) =>
    value !== null &&
    typeof value === 'object' &&
    (value as { $$typeof?: symbol }).$$typeof === FORWARD_REF,
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
