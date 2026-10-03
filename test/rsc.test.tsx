import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadCustomUnits, SRC } from './helpers/units';

/**
 * Static guard for React Server Components compatibility. test/rsc/ renders
 * every icon under the `react-server` build of React; this scan additionally
 * keeps hooks out of icon modules, where only `useId` (which React supports
 * in Server Components) is allowed.
 *
 * Only `src/dynamic/**` is a client boundary (`'use client'`, React.lazy);
 * every other module ships to server components.
 */

// Any hook call except useId, including member calls such as `React.useMemo(`.
const HOOK_CALL_RE = /\buse(?!Id\b)[A-Z]\w*\s*\(/;
const CLIENT_DIR = join(SRC, 'dynamic');

function collectServerModules(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (path !== CLIENT_DIR) {
        files.push(...collectServerModules(path));
      }
    } else if (/\.tsx?$/.test(entry.name)) {
      files.push(path);
    }
  }
  return files;
}

const serverModules = collectServerModules(SRC);

describe('React Server Components compatibility', () => {
  it('no module outside src/dynamic calls a hook other than useId', () => {
    const offenders = serverModules
      .filter(path => HOOK_CALL_RE.test(readFileSync(path, 'utf-8')))
      .map(path => relative(SRC, path));
    expect(offenders).toEqual([]);
  });

  it('the pattern matches hooks but not useId', () => {
    expect(HOOK_CALL_RE.test('const [a] = useState(0);')).toBe(true);
    expect(HOOK_CALL_RE.test('React.useMemo(() => 1, []);')).toBe(true);
    expect(HOOK_CALL_RE.test('const id = useId();')).toBe(false);
    expect(HOOK_CALL_RE.test('const id = React.useId();')).toBe(false);
  });

  it('the scan covers createIcon and every custom unit', () => {
    expect(serverModules).toContain(join(SRC, 'utils/createIcon.tsx'));
    for (const unit of loadCustomUnits()) {
      expect(serverModules).toContain(unit.modulePath);
    }
  });
});
