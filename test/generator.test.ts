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
import {
  collectDynamic,
  emitDynamicImports,
} from '../scripts/build-icons/dynamic.ts';
import {
  buildDistSvgs,
  distSvgIdPrefix,
} from '../scripts/build-icons/emit-dist-svg.ts';
import { buildIconifySets } from '../scripts/build-icons/emit-iconify.ts';
import { generateIconSources } from '../scripts/build-icons/generate.ts';
import { namespaceIds, validateIds } from '../scripts/build-icons/ids.ts';
import { isolateMaskContent } from '../scripts/build-icons/isolate.ts';
import { emitRender } from '../scripts/build-icons/jsx.ts';
import {
  CATEGORIES,
  compareStrings,
  generateCategory,
  loadCategory,
  parseViewBox,
} from '../scripts/build-icons/lib.ts';
import {
  buildManifest,
  extractBrandColor,
  isNeutralColor,
} from '../scripts/build-icons/manifest.ts';
import {
  collectLookups,
  deprecatedExports,
  LOOKUP_MAPS,
} from '../scripts/build-icons/meta.ts';
import {
  createOptimizer,
  isSvgoNormalized,
  normalizeRoot,
} from '../scripts/build-icons/normalize.ts';
import {
  applyOutputs,
  diffOutputs,
  type OutputFs,
} from '../scripts/build-icons/outputs.ts';
import {
  assertUnitMeta,
  SCHEMA_REF,
  UNIT_JSON_SCHEMA,
} from '../scripts/build-icons/unit.ts';
import { getAttr, parseSvg, serializeSvg } from '../scripts/build-icons/xml.ts';

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

/** JSON of an `icon` unit with one variant (`suffix` → `file`, `fill`). */
function iconUnit(
  name: string,
  [suffix, file, fill]: readonly [
    suffix: string,
    file: string,
    fill?: string | undefined,
  ],
  extra: Readonly<Record<string, unknown>> = {},
): string {
  return JSON.stringify({
    $schema: SCHEMA_REF,
    name,
    kind: 'icon',
    variants: { [suffix]: fill === undefined ? { file } : { file, fill } },
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

  it('normalizes literal whitespace but keeps character references', () => {
    const root = parseSvg('<svg a="1\r\n2\t3\n4\r5" b="x&#10;y&#9;z&#13;"/>');
    expect(root.attrs).toEqual([
      ['a', '1 2 3 4 5'],
      ['b', 'x\ny\tz\r'],
    ]);
    const serialized = serializeSvg(root);
    expect(serialized).toBe('<svg a="1 2 3 4 5" b="x&#10;y&#9;z&#13;"/>');
    // Round trip through a parser that applies XML attribute normalization.
    expect(parseSvg(serialized).attrs).toEqual(root.attrs);
    expect(
      emitRender(
        parseSvg(
          `<svg ${XMLNS} viewBox="0 0 24 24"><path data-label="a&#10;b" d="M0 0"/></svg>`,
        ),
      ).body,
    ).toContain("data-label={'a\\nb'}");
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
    expect(prefixed).toContain('id="p_g"');
    expect(prefixed).toMatch(/url\(\s*(?:['"]|&quot;)?#p_g/);
    expect(emitRender(root).body).toMatch(/url\(\s*['"]?#\$\{_id\}-g/);
  });

  it('rewrites a url() reference on the root element', () => {
    const root = parseSvg(
      `<svg ${XMLNS} viewBox="0 0 24 24" fill="url(#g)"><linearGradient id="g"/></svg>`,
    );
    expect(serializeSvg(namespaceIds(root, 'p'))).toContain('fill="url(#p_g)"');
  });

  it.each(['URL(#g)', 'Url(#g)'])(
    'treats the function name in %s case-insensitively',
    ref => {
      const root = parseSvg(
        svg(`<defs><linearGradient id="g"/></defs><path fill="${ref}"/>`),
      );
      expect(() => validateIds(root)).not.toThrow();
      expect(serializeSvg(namespaceIds(root, 'p'))).toContain(
        `fill="${ref.slice(0, 4)}#p_g)"`,
      );
      expect(emitRender(root).body).toContain(`${ref.slice(0, 4)}#\${_id}-g)`);
      // The id itself stays case-sensitive.
      expect(() =>
        validateIds(parseSvg(svg('<g id="G"/><path fill="URL(#g)"/>'))),
      ).toThrow(/references undefined id "g"/);
    },
  );

  it.each(['', 'a_b'])('rejects the id prefix %j', prefix => {
    expect(() => namespaceIds(parseSvg(svg('')), prefix)).toThrow(
      /must be non-empty and must not contain "_"/,
    );
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

  it('asks for per-instance ids only when the artwork has internal ids', () => {
    const { files } = generateCategory(
      loadChain({
        'icons/chain/plain.svg': SQUARE,
        'icons/chain/plain.json': iconUnit('Plain', ['', 'plain.svg']),
        'icons/chain/masked.svg': `<svg ${XMLNS} viewBox="0 0 1 1"><mask id="m"><rect fill="#fff"/></mask><rect mask="url(#m)"/></svg>`,
        'icons/chain/masked.json': iconUnit('Masked', ['', 'masked.svg']),
        'icons/chain/filled.svg': `<svg ${XMLNS} viewBox="0 0 1 1" fill="none"><path/></svg>`,
        'icons/chain/filled.json': iconUnit('Filled', [
          '',
          'filled.svg',
        ]).replace('"filled.svg"', '"filled.svg", "fill": "none"'),
      }),
    );
    expect(files.get('Plain.tsx')).toContain('() => (');
    expect(files.get('Plain.tsx')).toContain('{},\n);');
    expect(files.get('Masked.tsx')).toContain('(_props, _id) => (');
    expect(files.get('Masked.tsx')).toContain('{ ids: true },\n);');
    expect(files.get('Filled.tsx')).toContain(`{ fill: 'none' },\n);`);
  });
});

describe('extra props', () => {
  const unit = (
    variants: readonly (readonly [suffix: string, file: string])[],
    props: Readonly<Record<string, unknown>>,
    svgs: Readonly<Record<string, string>>,
  ): Readonly<Record<string, string>> => ({
    'icons/chain/x.json': JSON.stringify({
      $schema: SCHEMA_REF,
      name: 'X',
      kind: 'icon',
      variants: Object.fromEntries(
        variants.map(([suffix, file]) => [suffix, { file }]),
      ),
      props,
    }),
    ...Object.fromEntries(
      Object.entries(svgs).map(([file, svg]) => [`icons/chain/${file}`, svg]),
    ),
  });
  const svg = (viewBox: string, body: string): string =>
    `<svg ${XMLNS} viewBox="${viewBox}">${body}</svg>`;
  const toggle = {
    big: { type: 'toggle', description: 'Big.', on: '', off: 'Small' },
  };
  const fill = { tint: { type: 'fill', description: 'Tint.' } };
  const emit = (files: Readonly<Record<string, string>>): string =>
    generateCategory(loadChain(files)).files.get('X.tsx') ?? '';

  it('switches artwork and viewBox with a toggle prop', () => {
    const tsx = emit(
      unit(
        [
          ['', 'a.svg'],
          ['Small', 'b.svg'],
        ],
        toggle,
        {
          'a.svg': svg('0 0 2 2', '<rect id="r"/><use href="#r"/>'),
          'b.svg': svg('0 0 1 1', '<path/>'),
        },
      ),
    );
    expect(tsx).toContain('export interface XProps {');
    expect(tsx).toContain(
      'Defaults to `true` for `X` and `false` for `XSmall`.',
    );
    expect(tsx).toContain('const bigArtwork = (big: boolean, _id: string) =>');
    expect(tsx).toContain(
      `({ big = true }) =>\n    big ? '0 0 2 2' : '0 0 1 1'`,
    );
    expect(tsx).toContain('({ big = false }, _id) => bigArtwork(big, _id)');
    expect(tsx).toContain(`{ ids: true, props: ['big'] }`);
  });

  it('binds marked fills to a fill prop, defaulting to the source fill', () => {
    const tsx = emit(
      unit(
        [
          ['', 'a.svg'],
          ['Bare', 'b.svg'],
        ],
        fill,
        {
          'a.svg': svg(
            '0 0 1 1',
            '<path fill="#f00" data-fill-prop="tint"/><path data-fill-prop="tint" fill="#f00"/>',
          ),
          'b.svg': svg('0 0 1 1', '<path data-fill-prop="tint"/>'),
        },
      ),
    );
    expect(tsx).toContain(`({ tint = '#f00' }) => (`);
    expect(tsx).toContain('<path fill={tint} />');
    expect(tsx).toContain('({ tint }) => (\n  <path fill={tint} />');
    expect(tsx).not.toContain('data-fill-prop');
  });

  it('types variants that accept only some props with Pick', () => {
    const tsx = emit(
      unit(
        [
          ['', 'a.svg'],
          ['Small', 'b.svg'],
          ['Tinted', 'c.svg'],
        ],
        { ...toggle, ...fill },
        {
          'a.svg': svg('0 0 1 1', '<path/>'),
          'b.svg': svg('0 0 1 1', '<rect/>'),
          'c.svg': svg('0 0 1 1', '<path data-fill-prop="tint"/>'),
        },
      ),
    );
    expect(tsx).toContain(`createIcon<Pick<XProps, 'big'>>(`);
    expect(tsx).toContain(`createIcon<Pick<XProps, 'tint'>>(`);
    expect(tsx).toContain(`'0 0 1 1',\n  ({ big = true }) => bigArtwork(big),`);
  });

  it('keeps the marks out of the non-React outputs', () => {
    const [x] = loadChain(
      unit([['', 'a.svg']], fill, {
        'a.svg': svg('0 0 1 1', '<path data-fill-prop="tint"/>'),
      }),
    );
    expect(
      serializeSvg(x?.variants[0]?.root ?? parseSvg('<svg/>')),
    ).not.toContain('data-fill-prop');
  });

  it.each([
    [
      'a toggle naming a missing variant',
      unit([['', 'a.svg']], toggle, { 'a.svg': svg('0 0 1 1', '<path/>') }),
      /props\.big: no variant "Small"/,
    ],
    [
      'a variant switched twice',
      unit(
        [
          ['', 'a.svg'],
          ['Small', 'b.svg'],
        ],
        { ...toggle, wide: { ...toggle.big, off: '' } },
        {
          'a.svg': svg('0 0 1 1', '<path/>'),
          'b.svg': svg('0 0 1 1', '<path/>'),
        },
      ),
      /props\.wide: variant "" is already switched by big/,
    ],
    [
      'a mark naming no fill prop',
      unit([['', 'a.svg']], fill, {
        'a.svg': svg('0 0 1 1', '<path data-fill-prop="other"/>'),
      }),
      /data-fill-prop="other" names no "fill" prop/,
    ],
    [
      'a fill prop nothing marks',
      unit([['', 'a.svg']], fill, { 'a.svg': svg('0 0 1 1', '<path/>') }),
      /props\.tint: no variant marks an element/,
    ],
    [
      'a fill mark in a toggled variant',
      unit(
        [
          ['', 'a.svg'],
          ['Small', 'b.svg'],
        ],
        { ...toggle, ...fill },
        {
          'a.svg': svg('0 0 1 1', '<path data-fill-prop="tint"/>'),
          'b.svg': svg('0 0 1 1', '<path/>'),
        },
      ),
      /a variant switched by a toggle prop cannot bind fill props/,
    ],
  ])('rejects %s', (_, files, message) => {
    expect(() => loadChain(files)).toThrow(message);
  });

  it.each([
    [
      'conflicting defaults',
      '<path fill="#f00" data-fill-prop="tint"/><path fill="#0f0" data-fill-prop="tint"/>',
      /marks elements with different fills \(#f00, #0f0\)/,
    ],
    [
      'a mark that is no prop name',
      '<path data-fill-prop="no-name"/>',
      /is not a camelCase prop name/,
    ],
  ])('the emitter rejects %s', (_, body, message) => {
    expect(() => emitRender(parseSvg(svg('0 0 1 1', body)))).toThrow(message);
  });
});

describe('mask content isolation', () => {
  const isolate = (svg: string): string =>
    serializeSvg(isolateMaskContent(parseSvg(svg)));

  it('gives masks the fill their content inherits in the source', () => {
    expect(
      isolate('<svg><mask id="m"><path/><path fill="#fff"/></mask></svg>'),
    ).toContain('<mask id="m" fill="#000">');
    expect(
      isolate('<svg fill="none"><mask id="m"><path/></mask></svg>'),
    ).toContain('<mask id="m" fill="none">');
    expect(
      isolate('<svg><g fill="#f00"><mask id="m"><path/></mask></g></svg>'),
    ).toContain('<mask id="m" fill="#f00">');
    expect(
      isolate('<svg><pattern id="p"><g><use href="#x"/></g></pattern></svg>'),
    ).toContain('<pattern id="p" fill="#000">');
  });

  it('resolves currentColor to what the source renders: black', () => {
    expect(
      isolate('<svg fill="currentColor"><mask id="m"><path/></mask></svg>'),
    ).toContain('<mask id="m" fill="#000">');
  });

  it('leaves masks alone whose content has its own fill', () => {
    for (const svg of [
      '<svg><mask id="m"><path fill="#fff"/><g fill="#000"><path/></g></mask></svg>',
      '<svg><mask id="m" fill="#fff"><path/></mask></svg>',
      '<svg><mask id="m"><path style="fill: #fff"/></mask></svg>',
      '<svg><clipPath id="c"><path/></clipPath></svg>',
    ]) {
      expect(isolate(svg)).toBe(serializeSvg(parseSvg(svg)));
    }
  });
});

describe('unit definitions', () => {
  const check = (value: unknown): void => assertUnitMeta(value, 'u.json');
  const valid = {
    $schema: SCHEMA_REF,
    name: 'Foo',
    kind: 'icon',
    variants: { '': { file: 'f.svg' } },
  };

  it('accepts a valid unit', () => {
    expect(() => check(valid)).not.toThrow();
  });

  it.each([
    [
      'a unit without $schema',
      { name: 'Foo', kind: 'icon', variants: { '': { file: 'f.svg' } } },
      /u\.json: \$schema must be "\.\.\/schema\.json"/,
    ],
    [
      'another $schema',
      { ...valid, $schema: './schema.json' },
      /u\.json: \$schema must be "\.\.\/schema\.json"/,
    ],
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
    ...['\u2028', '\u2029'].flatMap((separator): [string, object, RegExp][] => [
      [
        `a source with U+${separator.charCodeAt(0).toString(16).toUpperCase()}`,
        { ...valid, source: [`ok${separator}globalThis.marker = 42;`] },
        /source\[0\] must be a single line/,
      ],
      [
        `notes with U+${separator.charCodeAt(0).toString(16).toUpperCase()}`,
        { ...valid, notes: [`ok${separator}globalThis.marker = 42;`] },
        /notes\[0\] must be a single line/,
      ],
      [
        `a deprecation message with U+${separator.charCodeAt(0).toString(16).toUpperCase()}`,
        {
          ...valid,
          deprecated: Object.fromEntries([
            ['Foo', `ok${separator}*/ globalThis.marker = 42; /*`],
          ]),
        },
        /deprecated\.Foo must be a non-empty single-line message/,
      ],
    ]),
    ...['#12345', '#1234567', '#12'].map((fill): [string, object, RegExp] => [
      `the hex fill ${fill}`,
      { ...valid, variants: { '': { file: 'f.svg', fill } } },
      /fill must be none, currentColor, or a hex color/,
    ]),
    [
      'a path-traversing file',
      { ...valid, variants: { '': { file: '../x.svg' } } },
      /file must be a sibling \.svg file name/,
    ],
    [
      'an unquoted module specifier',
      {
        $schema: SCHEMA_REF,
        name: 'Foo',
        kind: 'reexport',
        reexport: { from: "./A';", exports: [] },
      },
      /reexport\.from must be a module specifier/,
    ],
    [
      'the removed "custom" kind',
      { ...valid, kind: 'custom' },
      /kind must be one of icon, reexport, alias/,
    ],
    [
      'a prop of an unknown type',
      { ...valid, props: { big: { type: 'size', description: 'x' } } },
      /props\.big\.type must be one of "toggle", "fill"/,
    ],
    [
      'a non-camelCase prop name',
      {
        ...valid,
        props: Object.fromEntries([
          ['Big', { type: 'fill', description: 'x' }],
        ]),
      },
      /props key "Big" must be a camelCase prop name/,
    ],
    [
      'a toggle without its variants',
      { ...valid, props: { big: { type: 'toggle', description: 'x' } } },
      /props\.big\.on must be a string/,
    ],
  ])('rejects %s', (_, value, message) => {
    expect(() => check(value)).toThrow(message);
  });

  it('describes the same rules as JSON Schema', () => {
    const [icon] = UNIT_JSON_SCHEMA.oneOf;
    expect(icon).toMatchObject({
      type: 'object',
      additionalProperties: false,
      required: ['$schema', 'name', 'variants', 'kind'],
      properties: { kind: { const: 'icon' } },
    });
  });

  it('requires $schema in every kind of unit', () => {
    const kinds = UNIT_JSON_SCHEMA.oneOf;
    expect(kinds).toHaveLength(3);
    for (const kind of kinds) {
      expect(kind).toMatchObject({
        required: expect.arrayContaining(['$schema']),
      });
    }
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
        'icons/chain/a.json': iconUnit('Foo', ['Alt', 'a.svg']),
        'icons/chain/b.json': iconUnit('Bar', ['', 'b.svg'], {
          localAliases: [{ name: 'FooAlt', target: 'Bar' }],
        }),
      },
      /icons\/chain\/b\.json: export FooAlt is already defined by icons\/chain\/a\.json/,
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

  it('accepts a deprecated alias that renames its target only in case', () => {
    const unit = (deprecated?: string): string =>
      iconUnit('FooBar', ['', 'a.svg'], {
        localAliases: [
          {
            name: 'FOOBar',
            target: 'FooBar',
            ...(deprecated && { deprecated }),
          },
        ],
      });
    const files = { 'icons/chain/a.svg': SQUARE };
    expect(
      loadChain({ ...files, 'icons/chain/a.json': unit('Use FooBar.') }),
    ).toHaveLength(1);
    // Not deprecated, it would be a second export of the same file name.
    expect(() => loadChain({ ...files, 'icons/chain/a.json': unit() })).toThrow(
      /export FOOBar is already defined by icons\/chain\/a\.json/,
    );
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

  it.each([
    ['no fill', undefined],
    ['a hex fill', '#000'],
  ])('rejects a Mono variant with %s', (_, fill) => {
    const root = fill === undefined ? '' : ` fill="${fill}"`;
    expect(() =>
      loadChain({
        'icons/chain/foo.json': iconUnit('Foo', [
          'CircleMono',
          'foo.svg',
          fill,
        ]),
        'icons/chain/foo.svg': `<svg ${XMLNS} viewBox="0 0 24 24"${root}/>`,
      }),
    ).toThrow(
      `icons/chain/foo.json: variants.CircleMono.fill must be "currentColor" (or "none" for stroke-only artwork), got ${fill ?? '(none)'}`,
    );
  });

  it('accepts a stroke-only Mono variant with fill none', () => {
    expect(
      loadChain({
        'icons/chain/foo.json': iconUnit('Foo', ['Mono', 'foo.svg', 'none']),
        'icons/chain/foo.svg': `<svg ${XMLNS} viewBox="0 0 24 24" fill="none"><path stroke="currentColor" d="M0 0h24"/></svg>`,
      }),
    ).toHaveLength(1);
  });

  it('rejects an SVG that no variant references', () => {
    expect(() =>
      loadChain({
        'icons/chain/foo.json': iconUnit('Foo', ['', 'foo.svg']),
        'icons/chain/foo.svg': SQUARE,
        'icons/chain/foo.square.svg': SQUARE,
      }),
    ).toThrow(
      "icons/chain/foo.square.svg: SVG is not referenced by any unit's variants",
    );
  });

  it('rejects a file that is neither a unit nor artwork', () => {
    const files = {
      'icons/chain/foo.json': iconUnit('Foo', ['', 'foo.svg']),
      'icons/chain/foo.svg': SQUARE,
    };
    expect(() =>
      loadChain({ ...files, 'icons/chain/README.txt': 'notes' }),
    ).toThrow(
      'icons/chain/README.txt: neither a unit (.json) nor artwork (.svg)',
    );
    // macOS Finder's folder metadata, ignored by git.
    expect(loadChain({ ...files, 'icons/chain/.DS_Store': '' })).toHaveLength(
      1,
    );
  });

  it('rejects a directory under icons/ that is not a category', () => {
    const generate = (files: Readonly<Record<string, string>>) => () =>
      generateIconSources(fixture(files), (_, content) => content);
    expect(generate({ 'icons/chains/foo.svg': SQUARE })).toThrow(
      /^icons\/chains\/: not a category \(expected one of bridge, chain, /,
    );
    // Files at that level are fine: icons/schema.json lives there.
    expect(generate({ 'icons/schema.json': '{}' })).not.toThrow();
  });

  it('parses comma-separated viewBoxes', () => {
    expect(parseViewBox('0,0, 24 ,32')).toEqual([0, 0, 24, 32]);
    expect(parseViewBox(' -1.5 +.5 2e1 24. ')).toEqual([-1.5, 0.5, 20, 24]);
  });

  it.each([
    '0 0 24 x',
    '0,,24,24',
    '0 0 0x18 24',
    '0 0 Infinity 24',
    '0 0 24',
    '0 0 24 24 1',
    '0 0 0 24',
    '0 0 24 -1',
    '',
  ])('rejects the viewBox %j', viewBox => {
    expect(parseViewBox(viewBox)).toBeUndefined();
  });
});

describe('lookup keys', () => {
  const MonoSvg = `<svg ${XMLNS} viewBox="0 0 24 24" fill="currentColor"/>`;
  /** `variants` of a unit `slug` with the given suffixes. */
  const variantsOf = (slug: string, suffixes: readonly string[]) =>
    Object.fromEntries(
      suffixes.map(suffix => [
        suffix,
        suffix.endsWith('Mono')
          ? { file: `${slug}.mono.svg`, fill: 'currentColor' }
          : { file: `${slug}.svg` },
      ]),
    );
  /** A chain unit with `''` and `Mono` variants plus `extra` fields. */
  const chainUnit = (
    slug: string,
    name: string,
    extra: Readonly<Record<string, unknown>> = {},
  ): Record<string, string> => ({
    [`icons/chain/${slug}.json`]: JSON.stringify({
      $schema: SCHEMA_REF,
      name,
      kind: 'icon',
      variants: variantsOf(slug, ['', 'Mono']),
      ...extra,
    }),
    [`icons/chain/${slug}.svg`]: SQUARE,
    [`icons/chain/${slug}.mono.svg`]: MonoSvg,
  });
  const tableOf = (
    constName: string,
    units: Parameters<typeof collectLookups>[0],
  ) => {
    const spec = LOOKUP_MAPS.find(s => s.constName === constName);
    return [...((spec && collectLookups(units).get(spec)) ?? [])];
  };

  it('collects sorted maps, including variant lookups', () => {
    const units = loadChain({
      ...chainUnit('b', 'Beta', {
        slugs: ['beta', 'b-legacy'],
        chainIds: [10],
      }),
      ...chainUnit('a', 'Alpha', {
        chainIds: [2],
        variants: variantsOf('a', ['', 'Mono', 'Two', 'TwoMono']),
        variantLookups: Object.fromEntries([['Two', { chainIds: [1] }]]),
      }),
    });
    expect(tableOf('CHAIN_ID_TO_NAME', units)).toEqual([
      [1, 'AlphaTwo'],
      [2, 'Alpha'],
      [10, 'Beta'],
    ]);
    expect(tableOf('CHAIN_SLUG_TO_NAME', units)).toEqual([
      ['b-legacy', 'Beta'],
      ['beta', 'Beta'],
    ]);
  });

  it.each([
    [
      'a key used twice in one map',
      {
        ...chainUnit('a', 'Alpha', { slugs: ['x'] }),
        ...chainUnit('b', 'Beta', { slugs: ['x'] }),
      },
      /icons\/chain\/b\.json: slugs "x" is already used by icons\/chain\/a\.json/,
    ],
    [
      'a lookup field of another category',
      chainUnit('a', 'Alpha', { tickers: ['ALP'] }),
      /icons\/chain\/a\.json: tickers is not a lookup key of the chain category \(allowed: chainIds, slugs\)/,
    ],
    [
      'an empty lookup field of another category',
      chainUnit('a', 'Alpha', { tickers: [] }),
      /icons\/chain\/a\.json: tickers is not a lookup key of the chain category/,
    ],
    [
      'a target without a Mono export',
      {
        'icons/chain/a.json': JSON.stringify({
          $schema: SCHEMA_REF,
          name: 'Alpha',
          kind: 'icon',
          variants: variantsOf('a', ['']),
          slugs: ['alpha'],
        }),
        'icons/chain/a.svg': SQUARE,
      },
      /icons\/chain\/a\.json: lookup keys need an export AlphaMono/,
    ],
    [
      'a variant lookup of a missing variant',
      chainUnit('a', 'Alpha', {
        variantLookups: Object.fromEntries([['Nova', { slugs: ['nova'] }]]),
      }),
      /lookup keys in variantLookups\.Nova need an export AlphaNova/,
    ],
    [
      'keys of a deprecated export',
      chainUnit('a', 'Alpha', {
        slugs: ['alpha'],
        deprecated: Object.fromEntries([['AlphaMono', 'Gone.']]),
      }),
      /lookup keys target the deprecated export AlphaMono; move them to its replacement/,
    ],
  ])('rejects %s', (_, files, message) => {
    expect(() => collectLookups(loadChain(files))).toThrow(message);
  });

  it('rejects malformed keys in the unit schema', () => {
    const valid = {
      $schema: SCHEMA_REF,
      name: 'Foo',
      kind: 'icon',
      variants: { '': { file: 'f.svg' } },
    };
    expect(() =>
      assertUnitMeta({ ...valid, slugs: ['Foo'] }, 'u.json'),
    ).toThrow(/slugs\[0\] must be a lowercase kebab-case slug/);
    expect(() =>
      assertUnitMeta({ ...valid, tickers: ['eth'] }, 'u.json'),
    ).toThrow(/tickers\[0\] must be an uppercase alphanumeric ticker/);
    expect(() =>
      assertUnitMeta({ ...valid, chainIds: [1.5] }, 'u.json'),
    ).toThrow(/chainIds\[0\] must be a positive integer chain ID/);
  });

  it('rejects a deprecation of an export the unit does not have', () => {
    const [unit] = loadChain(
      chainUnit('a', 'Alpha', {
        deprecated: Object.fromEntries([['Beta', 'Gone.']]),
      }),
    );
    expect(() => unit && deprecatedExports(unit)).toThrow(
      /deprecated\.Beta is not a variant export of Alpha/,
    );
  });

  it.each([
    [
      'keys that collide after normalization',
      {
        ...chainUnit('a', 'Alpha', { slugs: ['alpha-one'] }),
        ...chainUnit('b', 'Beta', { slugs: ['alphaone'] }),
      },
      /icons\/chain\/b\.json: slugs "alphaone" normalizes to "alphaone" like "alpha-one" of icons\/chain\/a\.json/,
    ],
    [
      'an alias that is not a lookup key',
      chainUnit('a', 'Alpha', { slugs: ['alpha'], aliases: ['alp'] }),
      /icons\/chain\/a\.json: alias "alp" is not a lookup key; add it to slugs\/tickers/,
    ],
    [
      "an alias that is another icon's key",
      {
        ...chainUnit('a', 'Alpha', { slugs: ['alpha'], aliases: ['beta'] }),
        ...chainUnit('b', 'Beta', { slugs: ['beta'] }),
      },
      /icons\/chain\/a\.json: alias "beta" resolves to Beta \(key "beta" of icons\/chain\/b\.json\), not to this icon/,
    ],
  ])('rejects %s', (_, files, message) => {
    expect(() => collectLookups(loadChain(files))).toThrow(message);
  });

  it('accepts aliases that normalize to a key of the icon', () => {
    const units = loadChain({
      ...chainUnit('a', 'Alpha', {
        slugs: ['alpha-one'],
        aliases: ['alpha one', 'alpha.one'],
      }),
      // A fully deprecated icon may point its aliases at its replacement.
      ...chainUnit('o', 'Old', {
        aliases: ['alpha-one'],
        deprecated: Object.fromEntries([
          ['Old', 'Use Alpha.'],
          ['OldMono', 'Use AlphaMono.'],
        ]),
      }),
    });
    expect(tableOf('CHAIN_SLUG_TO_NAME', units)).toEqual([
      ['alpha-one', 'Alpha'],
    ]);
  });
});

describe('dynamic import maps', () => {
  const MonoSvg = `<svg ${XMLNS} viewBox="0 0 24 24" fill="currentColor"/>`;
  /** A chain unit `name` with the given variants plus `extra` fields. */
  const unit = (
    slug: string,
    name: string,
    suffixes: readonly string[],
    extra: Readonly<Record<string, unknown>> = {},
  ): Record<string, string> => ({
    [`icons/chain/${slug}.json`]: JSON.stringify({
      $schema: SCHEMA_REF,
      name,
      kind: 'icon',
      variants: Object.fromEntries(
        suffixes.map(suffix => [
          suffix,
          suffix.endsWith('Mono')
            ? { file: `${slug}.mono.svg`, fill: 'currentColor' }
            : { file: `${slug}.svg` },
        ]),
      ),
      ...extra,
    }),
    [`icons/chain/${slug}.svg`]: SQUARE,
    [`icons/chain/${slug}.mono.svg`]: MonoSvg,
  });
  const dynamicOf = (files: Readonly<Record<string, string>>) =>
    collectDynamic('chain', loadChain(files));

  it('lists every variant of every target, and the extra suffixes', () => {
    const result = dynamicOf({
      ...unit('a', 'Alpha', ['', 'Mono', 'Circle', 'Nova', 'NovaMono'], {
        slugs: ['alpha'],
        variantLookups: Object.fromEntries([['Nova', { slugs: ['nova'] }]]),
      }),
      ...unit('b', 'Beta', ['', 'Mono', 'Square'], { slugs: ['beta'] }),
    });
    expect(
      [...result.exports].map(([name, r]) => [name, r.target, r.suffix]),
    ).toEqual([
      ['Alpha', 'Alpha', ''],
      ['AlphaCircle', 'Alpha', 'Circle'],
      ['AlphaMono', 'Alpha', 'Mono'],
      ['AlphaNova', 'AlphaNova', ''],
      ['AlphaNovaMono', 'AlphaNova', 'Mono'],
      ['Beta', 'Beta', ''],
      ['BetaMono', 'Beta', 'Mono'],
      ['BetaSquare', 'Beta', 'Square'],
    ]);
    expect(result.variants).toEqual(['Circle', 'Square']);
    const source = emitDynamicImports(result);
    expect(source).toContain(
      "  AlphaNovaMono: () => import('../../chain/Alpha'),",
    );
    expect(source).toContain(
      "export const chainVariants: readonly string[] = ['Circle', 'Square'];",
    );
    expect(source).toContain(
      "export type ChainVariant =\n  | 'colored'\n  | 'mono'\n  | 'Circle'\n  | 'Square';",
    );
  });

  it('leaves out deprecated exports and accepts aliases of reachable ones', () => {
    const result = dynamicOf({
      ...unit('a', 'Alpha', ['', 'Mono', 'Old'], {
        slugs: ['alpha'],
        deprecated: Object.fromEntries([['AlphaOld', 'Gone.']]),
      }),
      'icons/chain/g.json': JSON.stringify({
        $schema: SCHEMA_REF,
        name: 'Gamma',
        kind: 'alias',
        aliasConst: {
          importFrom: './Alpha',
          imports: ['Alpha'],
          exports: [{ name: 'Gamma', target: 'Alpha' }],
        },
      }),
    });
    expect([...result.exports.keys()]).toEqual(['Alpha', 'AlphaMono']);
  });

  it.each([
    [
      'an icon without lookup keys',
      {
        ...unit('a', 'Alpha', ['', 'Mono'], { slugs: ['alpha'] }),
        ...unit('z', 'Zeta', ['', 'Mono']),
      },
      /icons\/chain\/z\.json: Zeta is not reachable through the dynamic components/,
    ],
    [
      'a target plus a variant naming another target',
      {
        ...unit('a', 'Alpha', ['', 'Mono'], { slugs: ['alpha'] }),
        ...unit('ac', 'AlphaCircle', ['', 'Mono'], { slugs: ['alpha-circle'] }),
        ...unit('b', 'Beta', ['', 'Mono', 'Circle'], { slugs: ['beta'] }),
      },
      /AlphaCircle: Alpha \+ variant "Circle" names AlphaCircle, a variant of AlphaCircle/,
    ],
  ])('rejects %s', (_, files, message) => {
    expect(() => dynamicOf(files)).toThrow(message);
  });
});

describe('manifest brandColor', () => {
  const svg = (...fills: readonly string[]): string =>
    `<svg ${XMLNS} viewBox="0 0 24 24">${fills.map(f => `<path fill="${f}"/>`).join('')}</svg>`;

  it.each([
    [
      'the most frequent colour',
      svg('#E57310', '#e57310', '#1B4ADD'),
      '#e57310',
    ],
    [
      'an accent over a dominant black container',
      svg('#040404', '#040404', '#BFF009'),
      '#bff009',
    ],
    [
      'an accent over greys and near-white',
      svg('#181818', '#888', '#fafafa', '#EE7A30'),
      '#ee7a30',
    ],
    [
      'a neutral when there is nothing else',
      svg('#fff', '#000', '#000'),
      '#000000',
    ],
    ['nothing for white-only artwork', svg('#FFF', '#ffffffcc'), undefined],
    ['the keyword black', svg('black', 'black', 'White'), '#000000'],
    ['an accent over the keyword black', svg('black', '#FF8A00'), '#ff8a00'],
    [
      'black for shapes in the initial fill',
      `<svg ${XMLNS} viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>`,
      '#000000',
    ],
    [
      'black for an unfilled container behind a white glyph',
      `<svg ${XMLNS} viewBox="0 0 24 24"><rect width="24" height="24"/><path fill="#fff" d="M4 4h4v4H4z"/></svg>`,
      '#000000',
    ],
    [
      'nothing when the only unfilled shapes are not painted',
      `<svg ${XMLNS} viewBox="0 0 24 24"><defs><clipPath id="a"><path d="M0 0h1v1H0z"/></clipPath><mask id="b"><rect width="24" height="24"/></mask></defs><path fill="#fff" d="M0 0h24v24H0z"/></svg>`,
      undefined,
    ],
    [
      'nothing when a group sets the fill of its shapes',
      `<svg ${XMLNS} viewBox="0 0 24 24"><g fill="white"><path d="M0 0h24v24H0z"/></g></svg>`,
      undefined,
    ],
    [
      'nothing when the root sets the fill',
      `<svg ${XMLNS} viewBox="0 0 24 24" fill="#FFF"><path d="M0 0h24v24H0z"/></svg>`,
      undefined,
    ],
    [
      'colours set in style declarations',
      `<svg ${XMLNS} viewBox="0 0 24 24"><path style="fill:#E57310" d="M0 0h1v1H0z"/><path fill="#1B4ADD" d="M1 0h1v1H1z"/><path style="mix-blend-mode: multiply; fill: #e57310" d="M2 0h1v1H2z"/></svg>`,
      '#e57310',
    ],
    [
      'nothing when a style sets the fill of the only shape',
      `<svg ${XMLNS} viewBox="0 0 24 24"><path style="fill:#fff" d="M0 0h24v24H0z"/></svg>`,
      undefined,
    ],
    [
      "nothing when a group's style sets the fill of its shapes",
      `<svg ${XMLNS} viewBox="0 0 24 24"><g style="opacity:.5;fill:none"><path d="M0 0h24v24H0z"/></g></svg>`,
      undefined,
    ],
  ])('picks %s', (_, artwork, expected) => {
    expect(extractBrandColor(artwork)).toBe(expected);
  });

  it("takes the re-exported base icon's colour when a unit has no default artwork", () => {
    const colored = `<svg ${XMLNS} viewBox="0 0 24 24"><path fill="#0085FF" d="M0 0h24v24H0z"/></svg>`;
    const units = loadChain({
      'icons/chain/lido.json': iconUnit('Lido', ['', 'lido.svg']),
      'icons/chain/lido.svg': colored,
      'icons/chain/curated.json': iconUnit('Curated', ['', 'lido.svg'], {
        brandColor: '#ffaa7d',
      }),
      'icons/chain/ldo.json': iconUnit('Ldo', ['Circle', 'circle.svg'], {
        reexport: { from: './Lido', exports: [{ of: 'Lido', as: 'Ldo' }] },
      }),
      'icons/chain/cur.json': iconUnit('Cur', ['Circle', 'circle.svg'], {
        reexport: {
          from: './Curated',
          exports: [{ of: 'Curated', as: 'Cur' }],
        },
      }),
      // A re-export takes the colour of the artwork it renders, and no unit
      // here draws LidoMono.
      'icons/chain/variant.json': iconUnit(
        'Variant',
        ['Circle', 'circle.svg'],
        {
          reexport: {
            from: './Lido',
            exports: [{ of: 'LidoMono', as: 'Variant' }],
          },
        },
      ),
      'icons/chain/circle.svg': SQUARE,
    });
    expect(buildManifest(units).map(e => [e.name, e.brandColor])).toEqual([
      ['Cur', '#ffaa7d'],
      ['CurCircle', undefined],
      ['Curated', '#ffaa7d'],
      ['Ldo', '#0085ff'],
      ['LdoCircle', undefined],
      ['Lido', '#0085ff'],
      ['Variant', undefined],
      ['VariantCircle', undefined],
    ]);
  });

  it('gives every icon variants and a colour, re-exports and variant lookups included', () => {
    const colored = (fill: string): string =>
      `<svg ${XMLNS} viewBox="0 0 24 24"><path fill="${fill}" d="M0 0h24v24H0z"/></svg>`;
    const mono = `<svg ${XMLNS} viewBox="0 0 24 24" fill="currentColor"/>`;
    const json = (unit: Readonly<Record<string, unknown>>): string =>
      JSON.stringify({ $schema: SCHEMA_REF, ...unit });
    const units = loadChain({
      'icons/chain/alpha.json': json({
        name: 'Alpha',
        kind: 'icon',
        variants: Object.fromEntries([
          ['Old', { file: 'alpha.svg' }],
          ['NovaMono', { file: 'mono.svg', fill: 'currentColor' }],
          ['Nova', { file: 'nova.svg' }],
          ['Mono', { file: 'mono.svg', fill: 'currentColor' }],
          ['', { file: 'alpha.svg' }],
        ]),
        deprecated: Object.fromEntries([['AlphaOld', 'Use Alpha.']]),
        slugs: ['alpha'],
        variantLookups: Object.fromEntries([['Nova', { slugs: ['nova'] }]]),
      }),
      'icons/chain/alpha.svg': colored('#E57310'),
      'icons/chain/nova.svg': colored('#1B4ADD'),
      'icons/chain/mono.svg': mono,
      'icons/chain/al.json': json({
        name: 'Al',
        kind: 'reexport',
        reexport: {
          from: './Alpha',
          exports: [
            { of: 'Alpha', as: 'Al' },
            { of: 'AlphaMono', as: 'AlMono' },
          ],
        },
      }),
      'icons/chain/old-alpha.json': json({
        name: 'OldAlpha',
        kind: 'alias',
        aliasConst: {
          importFrom: './Alpha',
          imports: ['Alpha'],
          exports: [
            { name: 'OldAlpha', target: 'Alpha', deprecated: 'Use Alpha.' },
          ],
        },
      }),
      'icons/chain/gone.json': json({
        name: 'Gone',
        kind: 'icon',
        variants: Object.fromEntries([
          ['Mono', { file: 'mono.svg', fill: 'currentColor' }],
          ['', { file: 'nova.svg' }],
        ]),
        deprecated: Object.fromEntries([
          ['Gone', 'Gone.'],
          ['GoneMono', 'Gone.'],
        ]),
      }),
    });
    expect(
      buildManifest(units).flatMap(e =>
        e.variants ? [[e.name, e.variants, e.brandColor]] : [],
      ),
    ).toEqual([
      ['Al', ['', 'Mono'], '#e57310'],
      // AlphaNova is an icon of its own, and AlphaOld is deprecated.
      ['Alpha', ['', 'Mono'], '#e57310'],
      ['AlphaNova', ['', 'Mono'], '#1b4add'],
      // A deprecated icon keeps its variants.
      ['Gone', ['', 'Mono'], '#1b4add'],
    ]);
  });

  it('classifies neutrals by channel spread and lightness', () => {
    expect(
      ['#110f23', '#1b1230', '#8c8c8c', '#f1eaea'].filter(isNeutralColor),
    ).toEqual(['#110f23', '#1b1230', '#8c8c8c', '#f1eaea']);
    expect(['#7142cf', '#ffeeda', '#0052ff'].some(isNeutralColor)).toBe(false);
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

  /**
   * An in-memory file system under `/r/gen`; case-insensitive like the
   * macOS and Windows defaults when `foldCase` is set.
   */
  function memoryFs(
    initial: Readonly<Record<string, string>>,
    foldCase: boolean,
  ): { readonly fs: OutputFs; readonly names: () => string[] } {
    const key = (name: string): string =>
      foldCase ? name.toLowerCase() : name;
    // key → [on-disk spelling, content]
    const files = new Map<string, [string, string]>(
      Object.entries(initial).map(([name, content]) => [
        key(name),
        [name, content],
      ]),
    );
    // Paths arrive joined with the platform separator (`\\r\\gen` on Windows).
    const gen = join('/r', 'gen');
    const nameOf = (path: string): string => {
      if (dirname(path) !== gen) {
        throw new Error(`unexpected path ${path}`);
      }
      return path.slice(gen.length + 1);
    };
    return {
      fs: {
        listFiles: dir =>
          dir === gen ? [...files.values()].map(([name]) => name) : [],
        read: path => {
          const file = files.get(key(nameOf(path)));
          if (file === undefined) {
            throw new Error(`ENOENT ${path}`);
          }
          return file[1];
        },
        write: (path, content) => {
          const name = nameOf(path);
          // Writing through another spelling keeps the existing one.
          const spelling = files.get(key(name))?.[0] ?? name;
          files.set(key(name), [spelling, content]);
        },
        remove: path => {
          files.delete(key(nameOf(path)));
        },
      },
      names: () => [...files.values()].map(([name]) => name).sort(),
    };
  }

  it.each([
    ['case-sensitive', false],
    ['case-insensitive', true],
  ])('applies a case-only rename on a %s file system', (_, foldCase) => {
    const renamed = {
      files: new Map([['gen/FOO.ts', 'same\n']]),
      ownedDirs: ['gen'],
      keep: new Set<string>(),
    };
    const { fs, names } = memoryFs({ 'Foo.ts': 'same\n' }, foldCase);
    const changes = diffOutputs('/r', renamed, fs);
    expect(changes).toEqual({
      changed: ['gen/FOO.ts'],
      orphans: ['gen/Foo.ts'],
    });
    applyOutputs('/r', renamed, changes, fs);
    expect(names()).toEqual(['FOO.ts']);
    expect(diffOutputs('/r', renamed, fs)).toEqual({
      changed: [],
      orphans: [],
    });
  });

  it.each([
    ['case-sensitive', false],
    ['case-insensitive', true],
  ])(
    'refuses to delete a hand-written file renamed only in case (%s)',
    (_, foldCase) => {
      const custom = {
        files: new Map<string, string>(),
        ownedDirs: ['gen'],
        keep: new Set(['gen/BYBIT.tsx']),
      };
      const { fs, names } = memoryFs(
        { 'Bybit.tsx': 'hand-written\n' },
        foldCase,
      );
      expect(() => diffOutputs('/r', custom, fs)).toThrow(
        /rename them \(git mv\) first:\n {2}gen\/Bybit\.tsx → gen\/BYBIT\.tsx/,
      );
      expect(names()).toEqual(['Bybit.tsx']);
    },
  );

  // Two Node processes that load the whole generator: about 2 s on an idle
  // machine, more next to the parallel pre-push build.
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
  }, 60_000);
});

describe('published artifacts', () => {
  it('dist/svg files never share an id, and their references resolve', () => {
    const owner = new Map<string, string>();
    for (const [path, svg] of buildDistSvgs(join(ROOT, 'icons'))) {
      const root = parseSvg(svg, path);
      validateIds(root);
      for (const [, id] of svg.matchAll(/\sid="([^"]*)"/g)) {
        expect(owner.get(id ?? ''), `${path}: id ${id}`).toBeUndefined();
        owner.set(id ?? '', path);
      }
    }
    expect(owner.size).toBeGreaterThan(0);
  });

  it('dist/svg ids carry a per-file prefix', () => {
    const svg = buildDistSvgs(join(ROOT, 'icons')).get(
      'chain/AlgorandCircleMono.svg',
    );
    const prefix = distSvgIdPrefix('chain', 'AlgorandCircleMono');
    expect(prefix).toBe('w3i-chain-algorand-circle-mono');
    expect(svg).toContain(`id="${prefix}_algo-cm-a"`);
    expect(svg).toContain(`url(#${prefix}_algo-cm-a)`);
  });

  it('dist/svg and Iconify ids cannot collide across icons', () => {
    // `foo` + `bar-a` and `foo-bar` + `a` joined with "-" would both give
    // `…-foo-bar-a`.
    const gradient = (id: string): string =>
      `<svg ${XMLNS} viewBox="0 0 24 24"><linearGradient id="${id}"/><path fill="url(#${id})" d="M0 0"/></svg>`;
    const iconsDir = join(
      fixture({
        'icons/chain/foo.json': iconUnit('Foo', ['', 'foo.svg']),
        'icons/chain/foo.svg': gradient('bar-a'),
        'icons/chain/foo-bar.json': iconUnit('FooBar', ['', 'foo-bar.svg']),
        'icons/chain/foo-bar.svg': gradient('a'),
      }),
      'icons',
    );
    const ids = (text: string | undefined): string[] =>
      [...(text ?? '').matchAll(/\sid="([^"]*)"/g)].map(([, id]) => id ?? '');
    const svgs = buildDistSvgs(iconsDir);
    const distIds = [
      ...ids(svgs.get('chain/Foo.svg')),
      ...ids(svgs.get('chain/FooBar.svg')),
    ];
    expect(distIds).toEqual(['w3i-chain-foo_bar-a', 'w3i-chain-foo-bar_a']);
    const { icons } = buildIconifySets(iconsDir).colored;
    expect([
      ...ids(icons['chain-foo']?.body),
      ...ids(icons['chain-foo-bar']?.body),
    ]).toEqual(['chain-foo_bar-a', 'chain-foo-bar_a']);
  });

  it('a case-only rename gets no dist/svg file or Iconify alias of its own', () => {
    const iconsDir = join(
      fixture({
        'icons/chain/foo-bar.json': iconUnit('FooBar', ['', 'foo-bar.svg'], {
          localAliases: [
            { name: 'FOOBar', target: 'FooBar', deprecated: 'Use FooBar.' },
            { name: 'Foobar', target: 'FooBar', deprecated: 'Use FooBar.' },
          ],
        }),
        'icons/chain/foo-bar.svg': SQUARE,
      }),
      'icons',
    );
    expect([...buildDistSvgs(iconsDir).keys()]).toEqual(['chain/FooBar.svg']);
    // `FOOBar` shares the icon name `chain-foo-bar`; `Foobar` does not.
    const { icons, aliases } = buildIconifySets(iconsDir).colored;
    expect(Object.keys(icons)).toEqual(['chain-foo-bar']);
    expect(aliases).toEqual({
      'chain-foobar': { parent: 'chain-foo-bar', hidden: true },
    });
  });

  it('Iconify info.height is the common height, or omitted', () => {
    const tall = `<svg ${XMLNS} viewBox="0,0,24,48" fill="currentColor"/>`;
    const sets = buildIconifySets(
      join(
        fixture({
          'icons/chain/a.json': iconUnit('Alpha', ['', 'a.svg']),
          'icons/chain/b.json': iconUnit('Beta', ['', 'b.svg']),
          'icons/chain/a.svg': SQUARE,
          'icons/chain/b.svg': SQUARE,
          'icons/coin/c.json': iconUnit('Gamma', [
            'Mono',
            'c.svg',
            'currentColor',
          ]),
          'icons/coin/c.svg': tall,
        }),
        'icons',
      ),
    );
    expect(sets.colored.info.height).toBe(24);
    expect(sets.mono.icons['coin-gamma-mono']).toMatchObject({
      width: 24,
      height: 48,
    });
    // The real sets: test/iconify.test.ts.
  });

  it('Iconify colored bodies state the black that unset fills render', () => {
    const sets = buildIconifySets(
      join(
        fixture({
          'icons/chain/a.json': iconUnit('Alpha', ['', 'a.svg']),
          'icons/chain/a.svg': SQUARE,
          'icons/chain/b.json': iconUnit('Beta', ['', 'b.svg']),
          'icons/chain/b.svg': `<svg ${XMLNS} viewBox="0 0 24 24"><path fill="#f00" d="M0 0"/></svg>`,
        }),
        'icons',
      ),
    );
    expect(sets.colored.icons['chain-alpha']?.body).toBe(
      '<g fill="#000"><path d="M0 0h24v24H0z"/></g>',
    );
    expect(sets.colored.icons['chain-beta']?.body).toBe(
      '<path fill="#f00" d="M0 0"/>',
    );
  });
});

describe('new-icon normalization', () => {
  it('moves inherited root attributes onto a group instead of dropping them', () => {
    const root = normalizeRoot(
      parseSvg(
        `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M0 0"/></svg>`,
      ),
      false,
    );
    expect(serializeSvg(root)).toBe(
      `<svg ${XMLNS} viewBox="0 0 24 24" fill="none">\n  <g stroke="currentColor" stroke-width="2">\n    <path d="M0 0"/>\n  </g>\n</svg>`,
    );
  });

  it('defaults mono artwork to currentColor and requires a viewBox', () => {
    const mono = normalizeRoot(parseSvg(`<svg viewBox="0 0 1 1"/>`), true);
    expect(mono.attrs).toContainEqual(['fill', 'currentColor']);
    expect(() => normalizeRoot(parseSvg('<svg/>'), false)).toThrow(
      /needs a viewBox/,
    );
  });

  it('SVGO keeps a root fill, which is the default fill of the component', async () => {
    const optimize = await createOptimizer(ROOT);
    for (const fill of ['#000', 'black', '#e84142', 'currentColor']) {
      const optimized = optimize(
        `<svg ${XMLNS} viewBox="0 0 24 24" fill="${fill}"><path fill="#000" d="M0 0h24v24z"/></svg>`,
        'in.svg',
      );
      expect(getAttr(parseSvg(optimized), 'fill')).toBe(fill);
      expect(isSvgoNormalized(optimize, optimized, 'in.svg')).toBe(true);
    }
  });

  it('SVGO moves paint out of style attributes', async () => {
    const optimize = await createOptimizer(ROOT);
    const optimized = optimize(
      `<svg ${XMLNS} viewBox="0 0 24 24"><path style="fill:#E57310;mix-blend-mode:multiply" d="M0 0h24v24H0z"/></svg>`,
      'in.svg',
    );
    const [path] = parseSvg(optimized).children;
    expect(path && getAttr(path, 'fill')).toBe('#E57310');
    expect(path && getAttr(path, 'style')).toBe('mix-blend-mode:multiply');
    expect(isSvgoNormalized(optimize, optimized, 'in.svg')).toBe(true);
  });

  it('SVGO strips <title> and <desc>, which the parser would reject', async () => {
    const optimize = await createOptimizer(ROOT);
    const optimized = optimize(
      `<svg ${XMLNS} viewBox="0 0 24 24"><title>T</title><desc>D</desc><path d="M0 0h24"/></svg>`,
      'in.svg',
    );
    expect(() => parseSvg(optimized)).not.toThrow();
    expect(isSvgoNormalized(optimize, optimized, 'in.svg')).toBe(true);
    expect(
      isSvgoNormalized(
        optimize,
        `<svg ${XMLNS} viewBox="0 0 24 24"><path d="M 0 0 L 24 0"/></svg>`,
        'in.svg',
      ),
    ).toBe(false);
  });
});
