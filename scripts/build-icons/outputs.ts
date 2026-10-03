/**
 * Applies a fully computed set of generated files to the working tree, or
 * reports how the tree differs from it (`--check`).
 *
 * Generators build every file in memory first, so a malformed input aborts
 * before anything is written; only files whose content changed are
 * rewritten (unchanged files keep their mtimes), and generated files whose
 * source is gone are removed.
 */

import { readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { compareStrings } from './lib.ts';

export interface Outputs {
  /** Generated files: path relative to the repository root → content. */
  readonly files: ReadonlyMap<string, string>;
  /**
   * Directories (relative to the root) owned by the generator: any file in
   * them that is neither generated nor listed in `keep` is an orphan.
   */
  readonly ownedDirs: readonly string[];
  /** Hand-written files inside `ownedDirs`. */
  readonly keep: ReadonlySet<string>;
}

export interface OutputChanges {
  /** Generated files that are missing or differ on disk. */
  readonly changed: readonly string[];
  /** Files in owned directories that no input generates any more. */
  readonly orphans: readonly string[];
}

function readIfExists(path: string): string | undefined {
  try {
    return readFileSync(path, 'utf-8');
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return undefined;
    }
    throw error;
  }
}

export function diffOutputs(root: string, outputs: Outputs): OutputChanges {
  const changed = [...outputs.files]
    .filter(([path, content]) => readIfExists(join(root, path)) !== content)
    .map(([path]) => path);
  const orphans = outputs.ownedDirs.flatMap(dir =>
    readdirSync(join(root, dir), { withFileTypes: true })
      .filter(entry => entry.isFile())
      .map(entry => `${dir}/${entry.name}`)
      .filter(path => !(outputs.files.has(path) || outputs.keep.has(path))),
  );
  return {
    changed: changed.sort(compareStrings),
    orphans: orphans.sort(compareStrings),
  };
}

export function applyOutputs(
  root: string,
  outputs: Outputs,
  changes: OutputChanges,
): void {
  for (const path of changes.changed) {
    const content = outputs.files.get(path);
    if (content !== undefined) {
      writeFileSync(join(root, path), content);
    }
  }
  for (const path of changes.orphans) {
    rmSync(join(root, path));
  }
}

export interface GeneratorCli {
  /** Script name and purpose, printed by `--help`. */
  readonly usage: string;
  /** Command that regenerates the outputs, for `--check` failures. */
  readonly regenerate: string;
  readonly root: string;
  readonly build: () => Outputs;
}

/**
 * Shared CLI of the source generators:
 *
 *   (no flags)  regenerate in place
 *   --check     write nothing; exit 1 if any file would change
 *   --help      print usage
 */
export function runGenerator(cli: GeneratorCli): void {
  const usage = `${cli.usage}\n\nOptions:\n  --check  write nothing; exit 1 if any generated file is stale or orphaned\n  --help   show this help`;
  let check: boolean;
  try {
    const { values } = parseArgs({
      options: {
        check: { type: 'boolean' },
        help: { type: 'boolean', short: 'h' },
      },
    });
    if (values.help) {
      console.log(usage);
      return;
    }
    check = values.check === true;
  } catch (error) {
    console.error(
      `${error instanceof Error ? error.message : String(error)}\n\n${usage}`,
    );
    process.exitCode = 2;
    return;
  }
  const outputs = cli.build();
  const upToDate = `All ${outputs.files.size} generated file(s) are up to date.`;
  const changes = diffOutputs(cli.root, outputs);
  const stale = [
    ...changes.changed.map(path => `  changed: ${path}`),
    ...changes.orphans.map(path => `  orphan:  ${path}`),
  ];
  if (check) {
    if (stale.length > 0) {
      console.error(
        `Generated files are out of date (run: ${cli.regenerate}):\n${stale.join('\n')}`,
      );
      process.exitCode = 1;
    } else {
      console.log(upToDate);
    }
    return;
  }
  applyOutputs(cli.root, outputs, changes);
  console.log(
    stale.length > 0
      ? `Updated ${stale.length} of ${outputs.files.size} generated files:\n${stale.join('\n')}`
      : upToDate,
  );
}
