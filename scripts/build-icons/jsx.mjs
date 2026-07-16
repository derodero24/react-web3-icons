/**
 * SVG AST → createIcon TSX emitter.
 *
 * The emitted component must render byte-identically to the source SVG
 * (modulo the `useId`-based prefix on internal ids), which the generator's
 * verification step and the snapshot test suite both enforce.
 */

/** Attribute names kept verbatim (React passes these through unchanged). */
const KEEP_VERBATIM = /^(data-|aria-)/;

/** Special-cased attribute renames that plain camelCasing would get wrong. */
const SPECIAL = new Map([
  ['class', 'className'],
  ['xlink:href', 'xlinkHref'],
  ['xml:space', 'xmlSpace'],
  ['xml:lang', 'xmlLang'],
  ['xmlns:xlink', 'xmlnsXlink'],
]);

function jsxAttrName(name) {
  if (KEEP_VERBATIM.test(name)) {
    return name;
  }
  const special = SPECIAL.get(name);
  if (special) {
    return special;
  }
  return name.replace(/[-:]([a-z])/g, (_, c) => c.toUpperCase());
}

function cssPropName(name) {
  return name.startsWith('--')
    ? name
    : name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function quote(value) {
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function template(value) {
  return value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

/** style="a: b; c: d" → style={{ a: 'b', c: 'd' }} */
function styleObject(value) {
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
      return `${prop}: ${quote(val)}`;
    });
  return `{{ ${entries.join(', ')} }}`;
}

/**
 * Renders an attribute value, rewriting references to internal ids so they
 * are prefixed with the component's unique `_id` at runtime.
 */
function attrValue(name, value, ids) {
  if (name === 'style') {
    return styleObject(value);
  }
  if (name === 'id' && ids.has(value)) {
    return `{\`\${_id}-${template(value)}\`}`;
  }
  if ((name === 'href' || name === 'xlink:href') && value.startsWith('#')) {
    const target = value.slice(1);
    if (ids.has(target)) {
      return `{\`#\${_id}-${template(target)}\`}`;
    }
  }
  if (value.includes('url(#')) {
    let dynamic = false;
    const tpl = template(value).replace(/url\(#([^)]+)\)/g, (whole, id) => {
      if (ids.has(id)) {
        dynamic = true;
        return `url(#\${_id}-${id})`;
      }
      return whole;
    });
    if (dynamic) {
      return `{\`${tpl}\`}`;
    }
  }
  return `"${value.replace(/"/g, '&quot;')}"`;
}

/** Collects every id="…" value in the subtree. */
export function collectIds(node, ids = new Set()) {
  for (const [name, value] of node.attrs) {
    if (name === 'id') {
      ids.add(value);
    }
  }
  for (const child of node.children) {
    collectIds(child, ids);
  }
  return ids;
}

function emitNode(node, ids, indent) {
  const attrs = node.attrs
    .map(([name, value]) => ` ${jsxAttrName(name)}=${attrValue(name, value, ids)}`)
    .join('');
  if (node.children.length === 0) {
    return `${indent}<${node.tag}${attrs} />`;
  }
  const children = node.children
    .map(child => emitNode(child, ids, `${indent}  `))
    .join('\n');
  return `${indent}<${node.tag}${attrs}>\n${children}\n${indent}</${node.tag}>`;
}

/**
 * Emits the render callback body for `createIcon` from the root <svg> node's
 * children.
 *
 * @returns {{ body: string, usesId: boolean, viewBox: string, fill: string | undefined }}
 */
export function emitRender(svgRoot) {
  const rootAttrs = new Map(svgRoot.attrs);
  const viewBox = rootAttrs.get('viewBox');
  if (!viewBox) {
    throw new Error('icon SVG is missing a viewBox');
  }
  const fill = rootAttrs.get('fill');
  for (const [name] of svgRoot.attrs) {
    if (!['xmlns', 'viewBox', 'fill'].includes(name)) {
      throw new Error(`unexpected root <svg> attribute: ${name}`);
    }
  }
  const ids = collectIds(svgRoot);
  const children = svgRoot.children;
  let body;
  if (children.length === 1) {
    body = emitNode(children[0], ids, '  ').trimStart();
  } else {
    const inner = children.map(child => emitNode(child, ids, '    ')).join('\n');
    body = `<>\n${inner}\n  </>`;
  }
  return { body, usesId: ids.size > 0, viewBox, fill };
}
