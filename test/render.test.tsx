/// <reference types="vitest/globals" />
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import * as icons from '../src';

const entries = Object.entries(icons);

describe('All icons render without error', () => {
  it.each(entries)('%s renders without crashing', (_name, Component) => {
    expect(typeof Component).toBe('function');
    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);
    flushSync(() => {
      root.render(<Component />);
    });
    root.unmount();
  });
});
