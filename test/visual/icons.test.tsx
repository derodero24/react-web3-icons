import type { ComponentType, SVGProps } from 'react';
import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import * as icons from '../../src';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const entries = Object.entries(icons).filter(
  ([name]) => name !== 'IconContext',
) as [string, IconComponent][];

describe('Icon visual regression', () => {
  test.each(entries)('%s', async (_name, Component) => {
    await render(
      <div
        data-testid="icon-wrapper"
        style={{
          padding: 8,
          background: '#fff',
          display: 'inline-block',
        }}
      >
        <Component width={64} height={64} />
      </div>,
    );
    await expect
      .element(page.getByTestId('icon-wrapper'))
      .toMatchScreenshot(_name);
  });
});
