/**
 * SVG AST → createIcon TSX emitter.
 *
 * The emitted component must render byte-identically to the source SVG
 * (modulo the per-icon `w3i-` prefix on internal ids), which the generator's
 * verification step and the snapshot test suite both enforce.
 */

import { collectIds, type IdRefRenderer, rewriteIdRefs } from './ids.ts';
import type { XmlNode } from './xml.ts';

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
 * `&` or `"`: JSX decodes HTML entities inside string attributes, so those
 * are emitted as JS string expressions (`{'a &amp; b'}`), which it does not.
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
  return /[&"]/.test(value) ? `{${quote(value)}}` : `"${value}"`;
}

function emitNode(
  node: XmlNode,
  ids: ReadonlySet<string>,
  indent: string,
): string {
  const attrs = node.attrs
    .map(
      ([name, value]) => ` ${jsxAttrName(name)}=${attrValue(name, value, ids)}`,
    )
    .join('');
  if (node.children.length === 0) {
    return `${indent}<${node.tag}${attrs} />`;
  }
  const children = node.children
    .map(child => emitNode(child, ids, `${indent}  `))
    .join('\n');
  return `${indent}<${node.tag}${attrs}>\n${children}\n${indent}</${node.tag}>`;
}

export interface RenderedIcon {
  /** JSX expression for the `createIcon` render callback. */
  readonly body: string;
  /** Whether the body references the per-component `_id` prefix. */
  readonly usesId: boolean;
  readonly viewBox: string;
  readonly fill: string | undefined;
}

/**
 * Emits the render callback body for `createIcon` from the root <svg> node's
 * children.
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
  const [first, ...rest] = svgRoot.children;
  let body: string;
  if (first !== undefined && rest.length === 0) {
    body = emitNode(first, ids, '  ').trimStart();
  } else {
    const inner = svgRoot.children
      .map(child => emitNode(child, ids, '    '))
      .join('\n');
    body = `<>\n${inner}\n  </>`;
  }
  return { body, usesId: ids.size > 0, viewBox, fill };
}
