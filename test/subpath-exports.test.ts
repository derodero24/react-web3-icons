import { describe, expect, it } from 'vitest';

import * as bridge from '../src/bridge';
import * as defi from '../src/defi';

describe('Structure-only category exports', () => {
  it('exports empty bridge category module', () => {
    expect(Object.keys(bridge)).toHaveLength(0);
  });

  it('exports defi category icons', () => {
    expect(Object.keys(defi)).toContain('Aave');
    expect(Object.keys(defi)).toContain('AaveMono');
    expect(Object.keys(defi)).toContain('Lido');
    expect(Object.keys(defi)).toContain('LidoMono');
  });
});
