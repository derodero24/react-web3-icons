import { describe, expect, it } from 'vitest';

import * as bridge from '../src/bridge';
import * as defi from '../src/defi';

describe('Structure-only category exports', () => {
  it('exports empty bridge category module', () => {
    expect(Object.keys(bridge)).toHaveLength(0);
  });

  it('exports empty defi category module', () => {
    expect(Object.keys(defi)).toHaveLength(0);
  });
});
