/**
 * In-process Biome for generated sources: the equivalent of running
 * `biome check --write` (safe lint fixes, then formatting) on each file with
 * the repository's biome.json, without spawning a shell or putting hundreds
 * of paths on a command line (which breaks on Windows, where `pnpm` is a
 * `.cmd` shim and command lines are length-limited).
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Biome, type Configuration } from '@biomejs/js-api/nodejs';
import { isRecord } from '../guards.ts';

/**
 * Biome deserializes and type-checks the configuration itself
 * (`applyConfiguration` throws on an invalid one), so the only thing to
 * establish here is that biome.json holds an object.
 */
function isConfiguration(value: unknown): value is Configuration {
  return isRecord(value);
}

export type Formatter = (path: string, content: string) => string;

/**
 * Creates a formatter bound to the Biome configuration under `root`.
 * `path` (relative to `root`) selects the language and the overrides that
 * apply; it is never read from disk.
 */
export function createFormatter(root: string): Formatter {
  const config: unknown = JSON.parse(
    readFileSync(join(root, 'biome.json'), 'utf-8'),
  );
  if (!isConfiguration(config)) {
    throw new Error('biome.json must hold a JSON object');
  }
  const biome = new Biome();
  const { projectKey } = biome.openProject(root);
  biome.applyConfiguration(projectKey, config);

  return (path, content) => {
    const linted = biome.lintContent(projectKey, content, {
      filePath: path,
      fixFileMode: 'safeFixes',
    });
    const formatted = biome.formatContent(projectKey, linted.content, {
      filePath: path,
    });
    const errors = [...linted.diagnostics, ...formatted.diagnostics].filter(
      diagnostic =>
        diagnostic.severity === 'error' || diagnostic.severity === 'fatal',
    );
    if (errors.length > 0) {
      throw new Error(
        `Biome rejected generated ${path}:\n${biome.printDiagnostics(errors, { filePath: path, fileSource: linted.content })}`,
      );
    }
    return formatted.content;
  };
}
