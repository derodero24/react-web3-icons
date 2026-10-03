import { format } from 'node:util';
import { afterEach, beforeEach, type MockInstance, vi } from 'vitest';

/**
 * Global test setup (vitest `setupFiles`).
 *
 * Fails any test that logs an unexpected `console.error` / `console.warn`:
 * React reports invalid DOM props, duplicate keys and act() misuse there,
 * and those must not pass silently. A test that triggers a warning on
 * purpose replaces the implementation explicitly and asserts on the spy:
 *
 *   const warn = vi.spyOn(console, 'warn').mockImplementation(noop);
 *   …
 *   expect(warn).toHaveBeenCalledWith(…);
 *
 * (`vi.spyOn` returns the spy installed here, so the explicit
 * implementation replaces the recorder for the rest of that test.)
 */

const CONSOLE_METHODS = ['error', 'warn'] as const;
const unexpected: string[] = [];
const spies: MockInstance[] = [];

beforeEach(() => {
  unexpected.length = 0;
  for (const method of CONSOLE_METHODS) {
    spies.push(
      vi.spyOn(console, method).mockImplementation((...args: unknown[]) => {
        unexpected.push(`console.${method}: ${format(...args)}`);
      }),
    );
  }
});

afterEach(() => {
  for (const spy of spies) {
    spy.mockRestore();
  }
  spies.length = 0;
  if (unexpected.length > 0) {
    throw new Error(
      `Unexpected console output (spy on it explicitly if intended):\n${unexpected.join('\n')}`,
    );
  }
});
