// Asserts that the production bundle built from main.js contains the one
// imported icon and no other. Every icon is created with
// `createIcon(displayName, viewBox, …)`, and minifiers keep those string
// arguments, so a `"<Name>", "<viewBox>"` pair marks an icon that survived
// tree-shaking. Run `vite build` first.
import { readdirSync, readFileSync } from 'node:fs';
import manifest from 'react-web3-icons/manifest.json' with { type: 'json' };

const EXPECTED = 'Ethereum';
const assetsDir = new URL('./dist/assets/', import.meta.url);
const bundle = readdirSync(assetsDir)
  .filter(file => file.endsWith('.js'))
  .map(file => readFileSync(new URL(file, assetsDir), 'utf8'))
  .join('\n');

const iconNames = manifest.map(entry => entry.name);
const bundled = iconNames.filter(name =>
  new RegExp(`([\`'"])${name}\\1,\\s*([\`'"])[-\\d. ]+\\2`).test(bundle),
);

if (bundled.length !== 1 || bundled[0] !== EXPECTED) {
  throw new Error(
    `Expected only ${EXPECTED} in the bundle, found: ${bundled.join(', ') || 'none'}`,
  );
}
process.stdout.write(
  `Tree-shaking OK: ${EXPECTED} bundled, ${iconNames.length - 1} other icons dropped.\n`,
);
