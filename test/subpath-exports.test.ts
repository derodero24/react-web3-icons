import { describe, expect, it } from 'vitest';

import * as bridge from '../src/bridge';
import * as defi from '../src/defi';

describe('Category module exports', () => {
  it('exports bridge category icons', () => {
    expect(Object.keys(bridge)).toContain('Wormhole');
    expect(Object.keys(bridge)).toContain('WormholeMono');
    expect(Object.keys(bridge)).toContain('Stargate');
    expect(Object.keys(bridge)).toContain('StargateMono');
    expect(Object.keys(bridge)).toContain('LayerZero');
    expect(Object.keys(bridge)).toContain('LayerZeroMono');
    expect(Object.keys(bridge)).toContain('Across');
    expect(Object.keys(bridge)).toContain('AcrossMono');
  });

  it('exports defi category icons', () => {
    expect(Object.keys(defi)).toContain('Aave');
    expect(Object.keys(defi)).toContain('AaveMono');
    expect(Object.keys(defi)).toContain('Lido');
    expect(Object.keys(defi)).toContain('LidoMono');
  });
});
