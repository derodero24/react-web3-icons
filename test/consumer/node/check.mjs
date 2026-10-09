// Loads every entry of the installed package's `exports` map the way a Node
// consumer would: `import` for all of them, and `require` too where Node
// supports require(esm). Run after installing the packed tarball here.
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import pkg from 'react-web3-icons/package.json' with { type: 'json' };

const require = createRequire(import.meta.url);
const canRequireEsm = process.features.require_module === true;
const WILDCARD_SAMPLE = 'chain/Ethereum.svg';

function expect(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const sameJson = (a, b) => JSON.stringify(a) === JSON.stringify(b);

for (const subpath of Object.keys(pkg.exports)) {
  // Node allows a single `*` per exports pattern; reject anything else rather
  // than silently substituting only part of it.
  expect(
    subpath.split('*').length <= 2,
    `${subpath} has more than one wildcard`,
  );
  const specifier = `${pkg.name}${subpath.slice(1)}`.replaceAll(
    '*',
    WILDCARD_SAMPLE,
  );

  if (subpath.includes('*')) {
    const file = fileURLToPath(import.meta.resolve(specifier));
    expect(existsSync(file), `${specifier} resolves to a missing file`);
    expect(
      require.resolve(specifier) === file,
      `require.resolve('${specifier}') differs from import.meta.resolve`,
    );
  } else if (subpath.endsWith('.json')) {
    const { default: json } = await import(specifier, {
      with: { type: 'json' },
    });
    expect(typeof json === 'object', `${specifier} is not JSON`);
    expect(
      sameJson(require(specifier), json),
      `require('${specifier}') differs from import()`,
    );
  } else {
    const names = Object.keys(await import(specifier));
    expect(names.length > 0, `${specifier} has no exports`);
    if (canRequireEsm) {
      expect(
        sameJson(Object.keys(require(specifier)), names),
        `require('${specifier}') exports differ from import()`,
      );
    }
  }
  process.stdout.write(`ok ${specifier}\n`);
}

// Every manifest entry ships as `svg/<category>/<name>.svg`; check them all,
// not just the wildcard sample above, so a file missing from the tarball fails.
const { default: manifest } = await import(`${pkg.name}/manifest.json`, {
  with: { type: 'json' },
});
expect(
  Array.isArray(manifest) && manifest.length > 0,
  'manifest.json is empty',
);
// A deprecated alias that differs from a current export only in letter case
// (StarkNet → Starknet) ships no file of its own: the two paths would collide
// on case-insensitive filesystems (MIGRATION.md, v5 renames).
const caseKey = ({ category, name }) => `${category}/${name.toLowerCase()}`;
const currentKeys = new Set(
  manifest.filter(entry => !entry.deprecated).map(caseKey),
);
const missingSvgs = manifest
  .filter(entry => !(entry.deprecated && currentKeys.has(caseKey(entry))))
  .map(({ category, name }) => `${pkg.name}/svg/${category}/${name}.svg`)
  .filter(
    specifier => !existsSync(fileURLToPath(import.meta.resolve(specifier))),
  );
expect(
  missingSvgs.length === 0,
  `missing SVG files: ${missingSvgs.join(', ')}`,
);
process.stdout.write(`ok ${manifest.length} SVG subpaths\n`);

// The dynamic components are the package's only client boundary. tsdown emits
// each module on its own, which keeps their 'use client' directive; the build
// silences rolldown's warning about it (tsdown.config.ts), so check it here.
for (const file of ['index.mjs', 'DynamicIcon.mjs']) {
  const url = new URL(file, import.meta.resolve(`${pkg.name}/dynamic`));
  expect(
    readFileSync(url, 'utf8').startsWith('"use client";'),
    `dynamic/${file} does not start with the "use client" directive`,
  );
}
process.stdout.write('ok "use client" in the dynamic modules\n');

const { Ethereum } = await import(pkg.name);
expect(
  Ethereum.$$typeof === Symbol.for('react.forward_ref') &&
    Ethereum.displayName === 'Ethereum',
  'Ethereum is not a forwardRef icon component',
);

process.stdout.write(
  `Node ${process.version}: ${Object.keys(pkg.exports).length} export entries loaded via import${canRequireEsm ? ' and require(esm)' : ' (require(esm) unsupported, skipped)'}.\n`,
);
