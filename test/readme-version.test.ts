// @vitest-environment node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  packageVersion,
  syncReadmeVersion,
} from '../scripts/sync-readme-version.ts';

/**
 * README.md's CDN examples pin an exact version. `pnpm run version-packages`
 * (the version PR) moves the pins along with package.json; these tests cover
 * the rewrite and fail when the README and package.json disagree.
 */

describe('syncReadmeVersion', () => {
  it('sets every exact pin to the version', () => {
    const readme = [
      'https://cdn.jsdelivr.net/npm/react-web3-icons@4.0.0/dist/svg/chain/Ethereum.svg',
      'https://unpkg.com/react-web3-icons@4.0.0/dist/svg/chain/Ethereum.svg',
      "fetch('https://cdn.jsdelivr.net/npm/react-web3-icons@3.12.1/dist/manifest.json', {",
    ].join('\n');
    expect(syncReadmeVersion(readme, '5.0.0')).toBe(
      [
        'https://cdn.jsdelivr.net/npm/react-web3-icons@5.0.0/dist/svg/chain/Ethereum.svg',
        'https://unpkg.com/react-web3-icons@5.0.0/dist/svg/chain/Ethereum.svg',
        "fetch('https://cdn.jsdelivr.net/npm/react-web3-icons@5.0.0/dist/manifest.json', {",
      ].join('\n'),
    );
  });

  it.each([
    {
      name: 'a prerelease pin to a release',
      input: 'react-web3-icons@5.0.0-next.1/dist',
      version: '5.0.0',
      expected: 'react-web3-icons@5.0.0/dist',
    },
    {
      name: 'a release pin to a prerelease',
      input: 'react-web3-icons@4.0.0/dist',
      version: '5.1.0-beta.0',
      expected: 'react-web3-icons@5.1.0-beta.0/dist',
    },
  ])('replaces $name', ({ input, version, expected }) => {
    expect(syncReadmeVersion(input, version)).toBe(expected);
  });

  it('sets the major range in the unpinned-URL example to the major', () => {
    const sentence = (major: string): string =>
      `An unpinned URL (\`@latest\`, \`@${major}\`) can start serving different files`;
    expect(syncReadmeVersion(sentence('4'), '5.0.0')).toBe(sentence('5'));
    expect(syncReadmeVersion(sentence('5'), '12.0.0-rc.1')).toBe(
      sentence('12'),
    );
  });

  it('leaves everything else unchanged', () => {
    const readme = [
      'pnpm add react-web3-icons',
      "import ethereumSvgUrl from 'react-web3-icons/svg/chain/Ethereum.svg';",
      'https://cdn.jsdelivr.net/npm/react-web3-icons@latest/dist/manifest.json',
      'An unpinned URL (`@latest`) can start serving different files',
      "import { Icon } from '@iconify/react';",
      'react@18.3.1 and @types/react@19.3.0',
    ].join('\n');
    expect(syncReadmeVersion(readme, '5.0.0')).toBe(readme);
  });

  it('is idempotent', () => {
    const once = syncReadmeVersion(
      'react-web3-icons@4.0.0 (`@latest`, `@4`)',
      '5.0.0',
    );
    expect(once).toBe('react-web3-icons@5.0.0 (`@latest`, `@5`)');
    expect(syncReadmeVersion(once, '5.0.0')).toBe(once);
  });

  it.each(['', '5', '5.0', 'v5.0.0', '5.0.0 '])(
    'rejects the version %j',
    version => {
      expect(() =>
        syncReadmeVersion('react-web3-icons@4.0.0', version),
      ).toThrow('Not a semver version');
    },
  );
});

describe('packageVersion', () => {
  it('reads the version field', () => {
    expect(
      packageVersion('{"name": "react-web3-icons", "version": "5.0.0"}'),
    ).toBe('5.0.0');
  });

  it.each(['{}', 'null', '"5.0.0"', '{"version": 5}'])('rejects %s', json => {
    expect(() => packageVersion(json)).toThrow('no string `version` field');
  });
});

describe('README.md', () => {
  const root = join(import.meta.dirname, '..');
  const readme = readFileSync(join(root, 'README.md'), 'utf-8');
  const version = packageVersion(
    readFileSync(join(root, 'package.json'), 'utf-8'),
  );

  it("pins every exact version to package.json's version", () => {
    const pins = [
      ...readme.matchAll(/react-web3-icons@(\d+\.\d+\.\d+[^\s/'"`)]*)/g),
    ].map(([, pin]) => pin);
    expect(pins.length).toBeGreaterThan(0);
    expect(new Set(pins)).toEqual(new Set([version]));
  });

  it('is what the sync script writes', () => {
    expect(syncReadmeVersion(readme, version)).toBe(readme);
  });
});
