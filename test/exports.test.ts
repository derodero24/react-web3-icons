import { describe, expect, it } from 'vitest';
import * as icons from '../src';

describe('Export integrity', () => {
  const entries = Object.entries(icons);

  it('all exports are defined', () => {
    for (const [name, value] of entries) {
      expect(value, `${name} should not be undefined`).toBeDefined();
    }
  });

  it('exports at least 100 icons', () => {
    expect(entries.length).toBeGreaterThanOrEqual(100);
  });
});
