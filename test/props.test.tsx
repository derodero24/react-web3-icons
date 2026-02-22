/// <reference types="vitest/globals" />
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { Btc, Ethereum, MetaMask } from '../src';

const testIcons = [
  ['Ethereum', Ethereum],
  ['MetaMask', MetaMask],
  ['Btc', Btc],
] as const;

function renderToContainer(element: React.ReactElement): HTMLElement {
  const container = document.createElement('div');
  const root = ReactDOM.createRoot(container);
  flushSync(() => {
    root.render(element);
  });
  return container;
}

describe.each(testIcons)('%s props passthrough', (_name, Icon) => {
  it('passes className to svg element', () => {
    const container = renderToContainer(<Icon className="custom-class" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('class')).toBe('custom-class');
  });

  it('passes style to svg element', () => {
    const container = renderToContainer(<Icon style={{ color: 'red' }} />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.style.color).toBe('red');
  });

  it('renders title element when title prop is provided', () => {
    const container = renderToContainer(<Icon title="Test Title" />);
    const title = container.querySelector('title');
    expect(title).not.toBeNull();
    expect(title?.textContent).toBe('Test Title');
  });

  it('does not render title element when title prop is omitted', () => {
    const container = renderToContainer(<Icon />);
    const title = container.querySelector('title');
    expect(title).toBeNull();
  });

  it('has default width and height of "1em"', () => {
    const container = renderToContainer(<Icon />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('width')).toBe('1em');
    expect(svg?.getAttribute('height')).toBe('1em');
  });
});
