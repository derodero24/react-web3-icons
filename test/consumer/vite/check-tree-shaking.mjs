// Asserts that the production bundle built from main.js contains the
// imported icons and no other. Every icon is created with
// `createIcon(displayName, viewBox, …)`, and minifiers keep those arguments,
// so a `"<Name>",` followed by a viewBox string, or by the arrow function of
// a props-dependent viewBox, marks an icon that survived tree-shaking. Run
// `vite build` first.
import { readdirSync, readFileSync } from 'node:fs';
import manifest from 'react-web3-icons/manifest.json' with { type: 'json' };

const EXPECTED = ['AvalancheMono', 'Ethereum'];
const assetsDir = new URL('./dist/assets/', import.meta.url);
const bundle = readdirSync(assetsDir)
  .filter(file => file.endsWith('.js'))
  .map(file => readFileSync(new URL(file, assetsDir), 'utf8'))
  .join('\n');

const iconNames = manifest.map(entry => entry.name);
const bundled = iconNames.filter(name =>
  new RegExp(`([\`'"])${name}\\1,\\s*(?:([\`'"])[-\\d. ]+\\2|\\()`).test(
    bundle,
  ),
);

if (bundled.join() !== EXPECTED.join()) {
  throw new Error(
    `Expected only ${EXPECTED.join(', ')} in the bundle, found: ${bundled.join(', ') || 'none'}`,
  );
}
if (bundle.includes('withBackground')) {
  throw new Error('The withBackground artwork of AvalancheCircle was bundled');
}
process.stdout.write(
  `Tree-shaking OK: ${EXPECTED.join(', ')} bundled, ${iconNames.length - EXPECTED.length} other icons dropped.\n`,
);
