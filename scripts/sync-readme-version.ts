#!/usr/bin/env node
/**
 * Sets the version pins in README.md's CDN examples to the version in
 * package.json:
 *
 * - every exact pin `react-web3-icons@X.Y.Z` (prerelease suffix included)
 *   becomes `react-web3-icons@<version>`;
 * - every backticked major range such as `` `@4` `` (the unpinned-URL example)
 *   becomes the major of `<version>`.
 *
 *   node scripts/sync-readme-version.ts
 *
 * `pnpm run version-packages` runs it right after `changeset version`, so the
 * version PR that bumps package.json also moves the README pins, and the
 * README published with a release points at that release's files.
 * test/readme-version.test.ts fails when the pins and package.json disagree.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');

/** A semver version: X.Y.Z with an optional prerelease suffix. */
const VERSION = /^(\d+)\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

/** An exact pin of this package, as in a CDN URL. */
const EXACT_PIN = /react-web3-icons@\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?/g;

/** A major range in a code span, as in "An unpinned URL (`@latest`, `@4`)". */
const MAJOR_RANGE = /`@\d+`/g;

/** Returns `readme` with every pin set to `version`. */
export function syncReadmeVersion(readme: string, version: string): string {
  const major = VERSION.exec(version)?.[1];
  if (major === undefined) {
    throw new Error(`Not a semver version: ${JSON.stringify(version)}`);
  }
  return readme
    .replace(EXACT_PIN, () => `react-web3-icons@${version}`)
    .replace(MAJOR_RANGE, () => `\`@${major}\``);
}

/** The `version` field of a package.json. */
export function packageVersion(packageJson: string): string {
  const pkg: unknown = JSON.parse(packageJson);
  if (
    typeof pkg !== 'object' ||
    pkg === null ||
    !('version' in pkg) ||
    typeof pkg.version !== 'string'
  ) {
    throw new Error('package.json has no string `version` field');
  }
  return pkg.version;
}

if (
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const version = packageVersion(
    readFileSync(join(ROOT, 'package.json'), 'utf-8'),
  );
  const path = join(ROOT, 'README.md');
  const readme = readFileSync(path, 'utf-8');
  const synced = syncReadmeVersion(readme, version);
  if (synced === readme) {
    console.log(`README.md already pins react-web3-icons@${version}.`);
  } else {
    writeFileSync(path, synced);
    console.log(`README.md now pins react-web3-icons@${version}.`);
  }
}
