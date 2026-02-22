/// <reference types="vitest/globals" />
import ReactDOM from 'react-dom/client';
import * as icons from '../src';

const entries = Object.entries(icons);

describe('All icons render without error', () => {
  it.each(entries)('%s is a function component', (_name, Component) => {
    expect(typeof Component).toBe('function');
  });

  it.each(entries)('%s renders without crashing', (_name, Component) => {
    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);
    root.render(<Component />);
    root.unmount();
  });
});
