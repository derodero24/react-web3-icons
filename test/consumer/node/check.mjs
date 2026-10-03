// Loads every entry of the installed package's `exports` map the way a Node
// consumer would: `import` for all of them, and `require` too where Node
// supports require(esm). Run after installing the packed tarball here.
import { existsSync } from 'node:fs';
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
  const specifier = `${pkg.name}${subpath.slice(1)}`.replace(
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

const { Ethereum } = await import(pkg.name);
expect(
  Ethereum.$$typeof === Symbol.for('react.forward_ref') &&
    Ethereum.displayName === 'Ethereum',
  'Ethereum is not a forwardRef icon component',
);

process.stdout.write(
  `Node ${process.version}: ${Object.keys(pkg.exports).length} export entries loaded via import${canRequireEsm ? ' and require(esm)' : ' (require(esm) unsupported, skipped)'}.\n`,
);
