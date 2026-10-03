/**
 * Internal-id handling shared by every emitter that rewrites ids (the JSX
 * emitter and the Iconify emitter), so the set of rewritten references cannot
 * drift between output formats.
 */

import type { XmlNode } from './xml.ts';

/** Collects every id="…" value in the subtree. */
export function collectIds(
  node: XmlNode,
  ids: Set<string> = new Set(),
): Set<string> {
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

/** How an emitter renders the literal text and the id parts of a value. */
export interface IdRefRenderer {
  readonly text: (text: string) => string;
  readonly id: (id: string) => string;
}

const URL_REF = /url\(#([^)]+)\)/g;

/**
 * Re-renders an attribute value that references internal ids: the `id`
 * itself, `href`/`xlink:href="#id"`, and `url(#id)` anywhere in the value.
 *
 * @returns the rendered value, or `undefined` when the value references no
 *   internal id (the caller then emits it unchanged).
 */
export function rewriteIdRefs(
  name: string,
  value: string,
  ids: ReadonlySet<string>,
  render: IdRefRenderer,
): string | undefined {
  if (name === 'id' && ids.has(value)) {
    return render.id(value);
  }
  if ((name === 'href' || name === 'xlink:href') && value.startsWith('#')) {
    const target = value.slice(1);
    if (ids.has(target)) {
      return render.text('#') + render.id(target);
    }
  }
  if (!value.includes('url(#')) {
    return undefined;
  }
  let out = '';
  let last = 0;
  let rewritten = false;
  for (const match of value.matchAll(URL_REF)) {
    const id = match[1];
    if (id === undefined || !ids.has(id)) {
      continue;
    }
    const idStart = match.index + 'url(#'.length;
    out += render.text(value.slice(last, idStart)) + render.id(id);
    last = idStart + id.length;
    rewritten = true;
  }
  return rewritten ? out + render.text(value.slice(last)) : undefined;
}

/**
 * Prefixes every internal id (and every reference to one) with `prefix-`,
 * so several inlined icons never collide on a page.
 */
export function namespaceIds(
  node: XmlNode,
  prefix: string,
  ids: ReadonlySet<string> = collectIds(node),
): XmlNode {
  const render: IdRefRenderer = {
    text: text => text,
    id: id => `${prefix}-${id}`,
  };
  return {
    tag: node.tag,
    attrs: node.attrs.map(([name, value]) => [
      name,
      rewriteIdRefs(name, value, ids, render) ?? value,
    ]),
    children: node.children.map(child => namespaceIds(child, prefix, ids)),
  };
}
