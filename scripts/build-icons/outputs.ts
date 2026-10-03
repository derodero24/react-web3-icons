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
import { dirname, join } from 'node:path';
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

/**
 * The file-system operations the sync needs, on absolute paths. Injectable
 * so the case-insensitive behavior of macOS and Windows can be tested.
 */
export interface OutputFs {
  /** File names in `dir` with their on-disk spelling (empty if missing). */
  readonly listFiles: (dir: string) => readonly string[];
  readonly read: (path: string) => string;
  readonly write: (path: string, content: string) => void;
  readonly remove: (path: string) => void;
}

const isEnoent = (error: unknown): boolean =>
  error instanceof Error && 'code' in error && error.code === 'ENOENT';

export const nodeOutputFs: OutputFs = {
  listFiles: dir => {
    try {
      return readdirSync(dir, { withFileTypes: true })
        .filter(entry => entry.isFile())
        .map(entry => entry.name);
    } catch (error) {
      if (isEnoent(error)) {
        return [];
      }
      throw error;
    }
  },
  read: path => readFileSync(path, 'utf-8'),
  write: (path, content) => writeFileSync(path, content),
  remove: path => rmSync(path),
};

/**
 * Compares the generated files with the tree. A generated file counts as up
 * to date only if its directory lists it with exactly that spelling: on a
 * case-insensitive file system, `Foo.tsx` on disk would otherwise satisfy a
 * generated `FOO.tsx` and the case-only rename would never be applied.
 */
export function diffOutputs(
  root: string,
  outputs: Outputs,
  fs: OutputFs = nodeOutputFs,
): OutputChanges {
  const listings = new Map<string, ReadonlySet<string>>();
  const listing = (dir: string): ReadonlySet<string> => {
    let names = listings.get(dir);
    if (names === undefined) {
      names = new Set(fs.listFiles(join(root, dir)));
      listings.set(dir, names);
    }
    return names;
  };
  const upToDate = (path: string, content: string): boolean =>
    listing(dirname(path)).has(path.slice(dirname(path).length + 1)) &&
    fs.read(join(root, path)) === content;
  const changed = [...outputs.files]
    .filter(([path, content]) => !upToDate(path, content))
    .map(([path]) => path);
  const orphans = outputs.ownedDirs.flatMap(dir =>
    [...listing(dir)]
      .map(name => `${dir}/${name}`)
      .filter(path => !(outputs.files.has(path) || outputs.keep.has(path))),
  );
  // A hand-written file whose unit was renamed only in case (`Bybit.tsx` on
  // disk, `BYBIT.tsx` kept) would look like an orphan. It cannot be
  // regenerated, so refuse instead of deleting it.
  const kept = new Map(
    [...outputs.keep].map(path => [path.toLowerCase(), path] as const),
  );
  const renamed = orphans.flatMap(path => {
    const keptPath = kept.get(path.toLowerCase());
    return keptPath === undefined ? [] : [`${path} → ${keptPath}`];
  });
  if (renamed.length > 0) {
    throw new Error(
      `hand-written file(s) differ from their unit name only in case; rename them (git mv) first:\n  ${renamed.join('\n  ')}`,
    );
  }
  return {
    changed: changed.sort(compareStrings),
    orphans: orphans.sort(compareStrings),
  };
}

/**
 * Removes the orphans, then writes the changed files. That order matters for
 * a case-only rename (`Foo.tsx` → `FOO.tsx`) on a case-insensitive file
 * system, where both names are one file: writing first and removing the old
 * spelling afterwards would delete the freshly generated output.
 */
export function applyOutputs(
  root: string,
  outputs: Outputs,
  changes: OutputChanges,
  fs: OutputFs = nodeOutputFs,
): void {
  for (const path of changes.orphans) {
    fs.remove(join(root, path));
  }
  for (const path of changes.changed) {
    const content = outputs.files.get(path);
    if (content !== undefined) {
      fs.write(join(root, path), content);
    }
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
