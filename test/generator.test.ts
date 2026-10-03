// @vitest-environment node
import { execFileSync, spawnSync } from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  utimesSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { namespaceIds, validateIds } from '../scripts/build-icons/ids.ts';
import { emitRender } from '../scripts/build-icons/jsx.ts';
import {
  CATEGORIES,
  compareStrings,
  generateCategory,
  loadCategory,
  parseViewBox,
} from '../scripts/build-icons/lib.ts';
import { applyOutputs, diffOutputs } from '../scripts/build-icons/outputs.ts';
import {
  assertUnitMeta,
  UNIT_JSON_SCHEMA,
} from '../scripts/build-icons/unit.ts';
import { parseSvg, serializeSvg } from '../scripts/build-icons/xml.ts';

/**
 * Failure modes of the icon generator. Malformed inputs are written to
 * throw-away directories under the OS temp dir, never into icons/.
 */

const ROOT = join(import.meta.dirname, '..');
const XMLNS = 'xmlns="http://www.w3.org/2000/svg"';
const SQUARE = `<svg ${XMLNS} viewBox="0 0 24 24">\n  <path d="M0 0h24v24H0z"/>\n</svg>\n`;

const tempDirs: string[] = [];
afterAll(() => {
  for (const dir of tempDirs) {
    rmSync(dir, { recursive: true, force: true });
  }
});

/** Creates a temp tree with every category directory plus `files`. */
function fixture(files: Readonly<Record<string, string>>): string {
  const root = mkdtempSync(join(tmpdir(), 'w3i-generator-'));
  tempDirs.push(root);
  for (const category of CATEGORIES) {
    mkdirSync(join(root, 'icons', category), { recursive: true });
  }
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  return root;
}

/** JSON of an `icon` unit with one variant (`suffix` → `file`). */
function iconUnit(
  name: string,
  [suffix, file]: readonly [suffix: string, file: string],
  extra: Readonly<Record<string, unknown>> = {},
): string {
  return JSON.stringify({
    name,
    kind: 'icon',
    variants: { [suffix]: { file } },
    ...extra,
  });
}

/** Loads the chain category of a fixture. */
function loadChain(files: Readonly<Record<string, string>>) {
  return loadCategory(join(fixture(files), 'icons'), 'chain');
}

describe('XML parser', () => {
  it('decodes numeric, hex and all predefined entities', () => {
    const root = parseSvg(
      `<svg a="&#65;&#x42;&apos;&quot;&lt;&gt;&amp;"/>`,
      'x.svg',
    );
    expect(root.attrs).toEqual([['a', 'AB\'"<>&']]);
  });

  it('re-encodes decoded values once (no &amp;#10; double encoding)', () => {
    const root = parseSvg('<svg a="x &amp;lt; y &#38; z"/>');
    expect(serializeSvg(root)).toBe('<svg a="x &amp;lt; y &amp; z"/>');
  });

  it.each([
    ['an unknown entity', '<svg a="&nbsp;"/>', /invalid reference "&nbsp;"/],
    ['a bare ampersand', '<svg a="a & b"/>', /invalid reference "&"/],
    ['a non-XML character', '<svg a="&#0;"/>', /invalid reference "&#0;"/],
    ['an unescaped <', '<svg a="a<b"/>', /"<" must be escaped/],
    [
      'a duplicate attribute',
      '<svg a="1"\n  a="2"/>',
      /2:3: XML parse error: duplicate attribute a on <svg>/,
    ],
  ])('rejects %s, naming the file, line and column', (_, svg, message) => {
    expect(() => parseSvg(svg, 'icons/chain/x.svg')).toThrow(
      /^icons\/chain\/x\.svg:\d+:\d+: XML parse error/,
    );
    expect(() => parseSvg(svg, 'icons/chain/x.svg')).toThrow(message);
  });
});

describe('internal id references', () => {
  const svg = (body: string): string =>
    `<svg ${XMLNS} viewBox="0 0 24 24">${body}</svg>`;

  it.each([
    ['url(#g)', 'fill="url(#g)"'],
    ["url('#g')", `fill="url('#g')"`],
    ['url( "#g" )', 'fill=\'url( "#g" )\''],
    ['style url()', 'style="fill:url(#g)"'],
  ])('rewrites %s in every emitter', (_, attr) => {
    const root = parseSvg(
      svg(`<defs><linearGradient id="g"/></defs><path ${attr} d="M0 0"/>`),
    );
    expect(() => validateIds(root)).not.toThrow();
    const prefixed = serializeSvg(namespaceIds(root, 'p'));
    expect(prefixed).toContain('id="p-g"');
    expect(prefixed).toMatch(/url\(\s*(?:['"]|&quot;)?#p-g/);
    expect(emitRender(root).body).toMatch(/url\(\s*['"]?#\$\{_id\}-g/);
  });

  it('rewrites a url() reference on the root element', () => {
    const root = parseSvg(
      `<svg ${XMLNS} viewBox="0 0 24 24" fill="url(#g)"><linearGradient id="g"/></svg>`,
    );
    expect(serializeSvg(namespaceIds(root, 'p'))).toContain('fill="url(#p-g)"');
  });

  it.each([
    ['a duplicate id', '<g id="a"/><g id="a"/>', /duplicate id "a"/],
    [
      'a dangling url()',
      '<path fill="url(#nope)"/>',
      /<path fill> references undefined id "nope"/,
    ],
    [
      'a dangling url() in style',
      '<path style="fill:url(#nope)"/>',
      /<path style> references undefined id "nope"/,
    ],
    [
      'a dangling href',
      '<use href="#nope"/>',
      /<use href> references undefined id "nope"/,
    ],
  ])('rejects %s', (_, body, message) => {
    expect(() => validateIds(parseSvg(svg(body)))).toThrow(message);
  });
});

describe('JSX emitter', () => {
  const render = (body: string): string =>
    emitRender(parseSvg(`<svg ${XMLNS} viewBox="0 0 24 24">${body}</svg>`))
      .body;

  it('emits values containing & or " as JS strings, so JSX cannot decode entities', () => {
    expect(render('<path d="M0 0" data-label="x &amp;lt; y"/>')).toBe(
      `<path d="M0 0" data-label={'x &lt; y'} />`,
    );
    expect(render('<path data-label="say &quot;hi&quot;"/>')).toBe(
      `<path data-label={'say "hi"'} />`,
    );
  });

  it('keeps React vendor-prefix casing in style objects', () => {
    expect(
      render(
        '<g style="-ms-transform:rotate(1deg);-webkit-mask:none;mask-type:alpha"/>',
      ),
    ).toBe(
      `<g style={{ msTransform: 'rotate(1deg)', WebkitMask: 'none', maskType: 'alpha' }} />`,
    );
  });
});

describe('unit definitions', () => {
  const check = (value: unknown): void => assertUnitMeta(value, 'u.json');
  const valid = {
    name: 'Foo',
    kind: 'icon',
    variants: { '': { file: 'f.svg' } },
  };

  it('accepts a valid unit, including the optional $schema hint', () => {
    expect(() => check(valid)).not.toThrow();
    expect(() => check({ $schema: '../schema.json', ...valid })).not.toThrow();
  });

  it.each([
    [
      'an unknown key',
      { ...valid, variant: {} },
      /u\.json: variant is not a known key/,
    ],
    [
      'an unknown nested key',
      { ...valid, variants: { '': { file: 'f.svg', fil: 'none' } } },
      /variants\[""\]\.fil is not a known key/,
    ],
    [
      'a non-identifier name',
      { ...valid, name: "Foo'" },
      /name must be a PascalCase identifier/,
    ],
    [
      'a deprecation message that closes the JSDoc',
      {
        ...valid,
        deprecated: Object.fromEntries([['Foo', 'gone */ x']]),
      },
      /deprecated\.Foo must be a non-empty single-line message/,
    ],
    [
      'a multi-line source',
      { ...valid, source: ['a\nb'] },
      /source\[0\] must be a single line/,
    ],
    [
      'a path-traversing file',
      { ...valid, variants: { '': { file: '../x.svg' } } },
      /file must be a sibling \.svg file name/,
    ],
    [
      'an unquoted module specifier',
      {
        name: 'Foo',
        kind: 'reexport',
        reexport: { from: "./A';", exports: [] },
      },
      /reexport\.from must be a module specifier/,
    ],
  ])('rejects %s', (_, value, message) => {
    expect(() => check(value)).toThrow(message);
  });

  it('describes the same rules as JSON Schema', () => {
    const [icon] = UNIT_JSON_SCHEMA.oneOf;
    expect(icon).toMatchObject({
      type: 'object',
      additionalProperties: false,
      required: ['name', 'variants', 'kind'],
      properties: { kind: { const: 'icon' } },
    });
  });
});

describe('loading icons/', () => {
  it('names the SVG file in parse errors', () => {
    expect(() =>
      loadChain({
        'icons/chain/foo.json': iconUnit('Foo', ['', 'foo.svg']),
        'icons/chain/foo.svg': `<svg ${XMLNS} viewBox="0 0 24 24"><!-- x --></svg>`,
      }),
    ).toThrow(/^icons\/chain\/foo\.svg:1:\d+: XML parse error/);
  });

  it('names the JSON file in syntax errors', () => {
    expect(() => loadChain({ 'icons/chain/foo.json': '{ "name": ' })).toThrow(
      /^icons\/chain\/foo\.json: /,
    );
  });

  it.each([
    [
      'two units with one module name',
      {
        'icons/chain/a.json': iconUnit('Foo', ['', 'a.svg']),
        'icons/chain/b.json': iconUnit('FOO', ['', 'b.svg']),
      },
      /icons\/chain\/b\.json: module FOO is already defined by icons\/chain\/a\.json/,
    ],
    [
      'two units with one export name',
      {
        'icons/chain/a.json': iconUnit('Foo', ['Mono', 'a.svg']),
        'icons/chain/b.json': iconUnit('Bar', ['', 'b.svg'], {
          localAliases: [{ name: 'FooMono', target: 'Bar' }],
        }),
      },
      /icons\/chain\/b\.json: export FooMono is already defined by icons\/chain\/a\.json/,
    ],
  ])('rejects %s', (_, files, message) => {
    expect(() =>
      loadChain({
        ...files,
        'icons/chain/a.svg': SQUARE,
        'icons/chain/b.svg': SQUARE,
      }),
    ).toThrow(message);
  });

  it.each([
    [
      'a malformed viewBox',
      `<svg ${XMLNS} viewBox="0 0 24"/>`,
      /malformed or missing viewBox/,
    ],
    [
      'a zero-size viewBox',
      `<svg ${XMLNS} viewBox="0 0 0 24"/>`,
      /malformed or missing viewBox/,
    ],
    [
      'a root fill the JSON does not declare',
      `<svg ${XMLNS} viewBox="0 0 24 24" fill="none"/>`,
      /root fill none does not match the variant's "fill" \(none\)/,
    ],
    [
      'an unsupported root attribute',
      `<svg ${XMLNS} viewBox="0 0 24 24" stroke="red"/>`,
      /unexpected root <svg> attribute stroke/,
    ],
    [
      'a dangling reference',
      `<svg ${XMLNS} viewBox="0 0 24 24"><path fill="url(#a)"/></svg>`,
      /references undefined id "a"/,
    ],
  ])('rejects %s, naming the SVG file', (_, svg, message) => {
    const load = (): unknown =>
      loadChain({
        'icons/chain/foo.json': iconUnit('Foo', ['', 'foo.svg']),
        'icons/chain/foo.svg': svg,
      });
    expect(load).toThrow(/^icons\/chain\/foo\.svg: /);
    expect(load).toThrow(message);
  });

  it('parses comma-separated viewBoxes', () => {
    expect(parseViewBox('0,0, 24 ,32')).toEqual([0, 0, 24, 32]);
    expect(parseViewBox('0 0 24 x')).toBeUndefined();
  });
});

describe('deterministic output', () => {
  it('sorts by code unit, independent of the locale', () => {
    // Danish collation sorts "Aa" after "Z"; generated files must not.
    expect(new Intl.Collator('da').compare('Aave', 'Zora')).toBeGreaterThan(0);
    expect(['Zora', 'Aave', 'Ab'].sort(compareStrings)).toEqual([
      'Aave',
      'Ab',
      'Zora',
    ]);
    const units = loadChain({
      'icons/chain/a.json': iconUnit('Zora', ['', 'a.svg']),
      'icons/chain/b.json': iconUnit('Aave', ['', 'a.svg']),
      'icons/chain/a.svg': SQUARE,
    });
    expect(generateCategory(units).indexTs).toBe(
      "export * from './Aave';\nexport * from './Zora';\n",
    );
  });
});

describe('output sync', () => {
  const outputs = {
    files: new Map([
      ['gen/same.ts', 'same\n'],
      ['gen/stale.ts', 'new\n'],
      ['gen/missing.ts', 'missing\n'],
    ]),
    ownedDirs: ['gen'],
    keep: new Set(['gen/hand-written.tsx']),
  };

  it('rewrites only changed files and removes orphans', () => {
    const root = fixture({
      'gen/same.ts': 'same\n',
      'gen/stale.ts': 'old\n',
      'gen/orphan.ts': 'orphan\n',
      'gen/hand-written.tsx': 'kept\n',
    });
    const past = new Date('2020-01-01T00:00:00Z');
    utimesSync(join(root, 'gen/same.ts'), past, past);

    const changes = diffOutputs(root, outputs);
    expect(changes).toEqual({
      changed: ['gen/missing.ts', 'gen/stale.ts'],
      orphans: ['gen/orphan.ts'],
    });
    applyOutputs(root, outputs, changes);
    expect(diffOutputs(root, outputs)).toEqual({ changed: [], orphans: [] });
    expect(statSync(join(root, 'gen/same.ts')).mtime).toEqual(past);
    expect(readFileSync(join(root, 'gen/hand-written.tsx'), 'utf-8')).toBe(
      'kept\n',
    );
  });

  it('the CLI parses its flags instead of regenerating on --help', () => {
    const cli = join(ROOT, 'scripts/build-icons/cli.ts');
    expect(
      execFileSync(process.execPath, [cli, '--help'], { encoding: 'utf-8' }),
    ).toContain('--check');
    const bogus = spawnSync(process.execPath, [cli, '--bogus'], {
      encoding: 'utf-8',
    });
    expect(bogus.status).toBe(2);
    expect(bogus.stderr).toContain("Unknown option '--bogus'");
  });
});
