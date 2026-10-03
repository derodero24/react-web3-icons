import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import * as icons from '../src';
import { isIconComponent } from './helpers/units';

/** Every exported icon component; all of them are built by createIcon. */
const components = Object.entries(icons).flatMap(([name, value]) =>
  isIconComponent(value) ? [[name, value] as const] : [],
);

function renderSvg(element: ReactElement): SVGSVGElement {
  const container = document.createElement('div');
  container.innerHTML = renderToStaticMarkup(element);
  const svg = container.querySelector('svg');
  if (!svg) {
    throw new Error('expected an <svg> root');
  }
  return svg;
}

it('covers every exported icon', () => {
  expect(components.length).toBeGreaterThan(600);
});

describe.each(components)('%s accessibility', (_name, Icon) => {
  it('is decorative by default (aria-hidden, no role)', () => {
    const svg = renderSvg(<Icon />);
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.getAttribute('role')).toBeNull();
    expect(svg.querySelector('title')).toBeNull();
  });

  it('becomes non-decorative when title is provided', () => {
    const svg = renderSvg(<Icon title="Icon title" />);
    expect(svg.getAttribute('aria-hidden')).toBeNull();
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.querySelector('title')?.textContent).toBe('Icon title');
  });

  it.each([
    ['aria-label', { 'aria-label': 'Icon label' }],
    ['aria-labelledby', { 'aria-labelledby': 'external-label' }],
  ] as const)('becomes non-decorative when %s is provided', (_attr, label) => {
    const svg = renderSvg(<Icon {...label} />);
    expect(svg.getAttribute('aria-hidden')).toBeNull();
    expect(svg.getAttribute('role')).toBe('img');
  });

  it('links the <title> through aria-labelledby when titleId is given', () => {
    const svg = renderSvg(<Icon title="Accessible" titleId="my-title" />);
    expect(svg.querySelector('title')?.getAttribute('id')).toBe('my-title');
    expect(svg.getAttribute('aria-labelledby')).toBe('my-title');
  });

  it('does not set aria-labelledby for a title without titleId', () => {
    const svg = renderSvg(<Icon title="Accessible" />);
    expect(svg.getAttribute('aria-labelledby')).toBeNull();
  });

  it('lets an explicit aria-labelledby override the title link', () => {
    const svg = renderSvg(
      <Icon title="Accessible" titleId="my-title" aria-labelledby="custom" />,
    );
    expect(svg.getAttribute('aria-labelledby')).toBe('custom');
  });

  it('passes through arbitrary aria-* attributes', () => {
    const svg = renderSvg(
      <Icon aria-describedby="desc-id" aria-live="polite" />,
    );
    expect(svg.getAttribute('aria-describedby')).toBe('desc-id');
    expect(svg.getAttribute('aria-live')).toBe('polite');
  });
});
