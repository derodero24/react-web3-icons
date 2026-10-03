/**
 * SVG AST → createIcon TSX emitter.
 *
 * The emitted component must render byte-identically to the source SVG
 * (modulo the per-icon `w3i-` prefix on internal ids), which the generator's
 * verification step and the snapshot test suite both enforce.
 */

import { collectIds, type IdRefRenderer, rewriteIdRefs } from './ids.ts';
import { getAttr, type XmlNode } from './xml.ts';

/**
 * Marks an element whose `fill` is an extra prop of the component
 * (`data-fill-prop="fill1"` → `fill={fill1}`); the element's own `fill`, if
 * any, becomes the prop's default. See `FillPropSpec` in unit.ts.
 */
export const FILL_PROP_ATTR = 'data-fill-prop';

/** Removes every {@link FILL_PROP_ATTR} mark (for the non-React outputs). */
export function stripFillProps(node: XmlNode): XmlNode {
  return {
    tag: node.tag,
    attrs: node.attrs.filter(([name]) => name !== FILL_PROP_ATTR),
    children: node.children.map(stripFillProps),
  };
}

/** Attribute names kept verbatim (React passes these through unchanged). */
const KEEP_VERBATIM = /^(data-|aria-)/;

/** Special-cased attribute renames that plain camelCasing would get wrong. */
const SPECIAL: ReadonlyMap<string, string> = new Map([
  ['class', 'className'],
  ['xlink:href', 'xlinkHref'],
  ['xml:space', 'xmlSpace'],
  ['xml:lang', 'xmlLang'],
  ['xmlns:xlink', 'xmlnsXlink'],
]);

/** Root <svg> attributes the pipeline accepts (see CONTRIBUTING.md). */
export const ROOT_ATTRS: readonly string[] = ['xmlns', 'viewBox', 'fill'];

const upper = (_: string, c: string): string => c.toUpperCase();

function jsxAttrName(name: string): string {
  if (KEEP_VERBATIM.test(name)) {
    return name;
  }
  return SPECIAL.get(name) ?? name.replace(/[-:]([a-z])/g, upper);
}

/**
 * CSS property → React style key: `mask-type` → `maskType`,
 * `-webkit-mask` → `WebkitMask`, but `-ms-transform` → `msTransform` (React's
 * one lowercase vendor prefix). Custom properties stay verbatim.
 */
function cssPropName(name: string): string {
  if (name.startsWith('--')) {
    return name;
  }
  return name.replace(/^-ms-/, 'ms-').replace(/-([a-z])/g, upper);
}

/** A single-quoted JS string literal (control characters escaped). */
export function quote(value: string): string {
  const escaped = JSON.stringify(value)
    .slice(1, -1)
    .replace(/\\"/g, '"')
    .replace(/'/g, "\\'");
  return `'${escaped}'`;
}

function template(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

/** Renders internal-id references as `${_id}-…` template-literal parts. */
const ID_TEMPLATE: IdRefRenderer = {
  text: template,
  id: id => `\${_id}-${template(id)}`,
};

/**
 * style="a: b; c: url(#g)" → style={{ a: 'b', c: `url(#${_id}-g)` }}, with
 * id references rewritten exactly as in presentation attributes.
 */
function styleObject(value: string, ids: ReadonlySet<string>): string {
  const entries = value
    .split(';')
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => {
      const idx = part.indexOf(':');
      if (idx === -1) {
        throw new Error(`unparseable style declaration: ${part}`);
      }
      const prop = cssPropName(part.slice(0, idx).trim());
      const val = part.slice(idx + 1).trim();
      const dynamic = rewriteIdRefs('style', val, ids, ID_TEMPLATE);
      return `${prop}: ${dynamic === undefined ? quote(val) : `\`${dynamic}\``}`;
    });
  return `{{ ${entries.join(', ')} }}`;
}

/**
 * Renders an attribute value, rewriting references to internal ids so they
 * are prefixed with the component's unique `_id` at runtime.
 *
 * Plain values stay JSX string attributes (`d="M0 0"`), except values with a
 * `&` or `"` (JSX decodes HTML entities inside string attributes) or a tab or
 * line break (which JSX would collapse): those are emitted as JS string
 * expressions (`{'a &amp; b'}`), which keep every character as is.
 */
function attrValue(
  name: string,
  value: string,
  ids: ReadonlySet<string>,
): string {
  if (name === 'style') {
    return styleObject(value, ids);
  }
  const dynamic = rewriteIdRefs(name, value, ids, ID_TEMPLATE);
  if (dynamic !== undefined) {
    return `{\`${dynamic}\`}`;
  }
  return /[&"\t\n\r]/.test(value) ? `{${quote(value)}}` : `"${value}"`;
}

/** Fill prop name → the `fill` its elements declare in the source (if any). */
type FillProps = Map<string, string | undefined>;

/**
 * Records the fill prop an element binds, if any, and returns its name. All
 * elements bound to one prop must declare the same default.
 */
function bindFillProp(node: XmlNode, fillProps: FillProps): string | undefined {
  const prop = getAttr(node, FILL_PROP_ATTR);
  if (prop === undefined) {
    return undefined;
  }
  if (!/^[a-z][A-Za-z0-9]*$/.test(prop)) {
    throw new Error(`${FILL_PROP_ATTR}="${prop}" is not a camelCase prop name`);
  }
  const fill = getAttr(node, 'fill');
  if (fillProps.has(prop) && fillProps.get(prop) !== fill) {
    throw new Error(
      `${FILL_PROP_ATTR}="${prop}" marks elements with different fills (${fillProps.get(prop) ?? 'none'}, ${fill ?? 'none'})`,
    );
  }
  fillProps.set(prop, fill);
  return prop;
}

function emitNode(
  node: XmlNode,
  ids: ReadonlySet<string>,
  indent: string,
  fillProps: FillProps,
): string {
  const prop = bindFillProp(node, fillProps);
  // A bound fill takes the place of the element's own fill, or of the mark
  // when the element has none.
  const propSlot =
    getAttr(node, 'fill') === undefined ? FILL_PROP_ATTR : 'fill';
  const attrs = node.attrs
    .map(([name, value]) => {
      if (prop !== undefined && (name === 'fill' || name === FILL_PROP_ATTR)) {
        return name === propSlot ? ` fill={${prop}}` : '';
      }
      return ` ${jsxAttrName(name)}=${attrValue(name, value, ids)}`;
    })
    .join('');
  if (node.children.length === 0) {
    return `${indent}<${node.tag}${attrs} />`;
  }
  const children = node.children
    .map(child => emitNode(child, ids, `${indent}  `, fillProps))
    .join('\n');
  return `${indent}<${node.tag}${attrs}>\n${children}\n${indent}</${node.tag}>`;
}

export interface RenderedIcon {
  /** JSX expression for the `createIcon` render callback. */
  readonly body: string;
  /** Whether the body references the per-instance `_id` prefix. */
  readonly usesId: boolean;
  readonly viewBox: string;
  readonly fill: string | undefined;
  /** Fill props the body reads, with their defaults from the source. */
  readonly fillProps: ReadonlyMap<string, string | undefined>;
}

/**
 * Emits the render callback body for `createIcon` from the root <svg> node's
 * children. Elements marked with {@link FILL_PROP_ATTR} read their `fill`
 * from the prop of that name, which the caller must have in scope.
 */
export function emitRender(svgRoot: XmlNode): RenderedIcon {
  const rootAttrs = new Map(svgRoot.attrs);
  const viewBox = rootAttrs.get('viewBox');
  if (!viewBox) {
    throw new Error('icon SVG is missing a viewBox');
  }
  const fill = rootAttrs.get('fill');
  for (const [name] of svgRoot.attrs) {
    if (!ROOT_ATTRS.includes(name)) {
      throw new Error(`unexpected root <svg> attribute: ${name}`);
    }
  }
  const ids = collectIds(svgRoot);
  const fillProps: FillProps = new Map();
  const [first, ...rest] = svgRoot.children;
  let body: string;
  if (first !== undefined && rest.length === 0) {
    body = emitNode(first, ids, '  ', fillProps).trimStart();
  } else {
    const inner = svgRoot.children
      .map(child => emitNode(child, ids, '    ', fillProps))
      .join('\n');
    body = `<>\n${inner}\n  </>`;
  }
  return { body, usesId: ids.size > 0, viewBox, fill, fillProps };
}
