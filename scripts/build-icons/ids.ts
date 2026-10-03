/**
 * Internal-id handling shared by every emitter that rewrites ids (the JSX,
 * Iconify and dist SVG emitters), so the set of rewritten references cannot
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

/**
 * `url(#id)` in any of its CSS spellings: `url('#id')`, `url("#id")`,
 * `url( #id )`, and `URL(#id)` (CSS function names are ASCII
 * case-insensitive; the id itself is not). Group 2 is the id.
 */
const URL_REF = /url\(\s*(['"]?)#([^'"()\s]+)\1\s*\)/gi;

/** A reference to an internal id: the id and its offset in the value. */
interface IdRef {
  readonly id: string;
  readonly start: number;
}

/**
 * The internal-id references in an attribute value: `href`/`xlink:href="#id"`
 * and `url(#id)` anywhere in any value (presentation attributes and `style`
 * declarations alike).
 */
function idRefs(name: string, value: string): IdRef[] {
  if ((name === 'href' || name === 'xlink:href') && value.startsWith('#')) {
    return [{ id: value.slice(1), start: 1 }];
  }
  return [...value.matchAll(URL_REF)].flatMap(match => {
    const [whole, , id] = match;
    return id === undefined
      ? []
      : [{ id, start: match.index + whole.indexOf('#') + 1 }];
  });
}

/**
 * Rejects duplicate ids and references to ids the document does not define.
 * Both would otherwise ship silently broken artwork: the browser resolves a
 * duplicate to whichever element comes first, and a dangling `url(#…)` paints
 * nothing.
 */
export function validateIds(root: XmlNode): void {
  const seen = new Set<string>();
  const refs: {
    readonly tag: string;
    readonly name: string;
    readonly id: string;
  }[] = [];
  const walk = (node: XmlNode): void => {
    for (const [name, value] of node.attrs) {
      if (name === 'id') {
        if (seen.has(value)) {
          throw new Error(`duplicate id "${value}"`);
        }
        seen.add(value);
      }
      for (const { id } of idRefs(name, value)) {
        refs.push({ tag: node.tag, name, id });
      }
    }
    for (const child of node.children) {
      walk(child);
    }
  };
  walk(root);
  const dangling = refs.find(ref => !seen.has(ref.id));
  if (dangling) {
    throw new Error(
      `<${dangling.tag} ${dangling.name}> references undefined id "${dangling.id}"`,
    );
  }
}

/** How an emitter renders the literal text and the id parts of a value. */
export interface IdRefRenderer {
  readonly text: (text: string) => string;
  readonly id: (id: string) => string;
}

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
  if (name === 'id') {
    return ids.has(value) ? render.id(value) : undefined;
  }
  const refs = idRefs(name, value).filter(ref => ids.has(ref.id));
  if (refs.length === 0) {
    return undefined;
  }
  let out = '';
  let last = 0;
  for (const { id, start } of refs) {
    out += render.text(value.slice(last, start)) + render.id(id);
    last = start + id.length;
  }
  return out + render.text(value.slice(last));
}

/** Joins a namespace prefix and an original id; never part of a prefix. */
const ID_SEPARATOR = '_';

/**
 * Prefixes every internal id (and every reference to one) with `prefix_`,
 * so several inlined icons never collide on a page.
 *
 * The prefix must not contain the separator: `prefix_id` then splits back
 * into its parts at the first `_`, so distinct prefixes can never produce
 * the same id (`foo` + `bar-a` vs `foo-bar` + `a`), whatever the source ids.
 */
export function namespaceIds(
  node: XmlNode,
  prefix: string,
  ids: ReadonlySet<string> = collectIds(node),
): XmlNode {
  if (prefix === '' || prefix.includes(ID_SEPARATOR)) {
    throw new Error(
      `id prefix ${JSON.stringify(prefix)} must be non-empty and must not contain "${ID_SEPARATOR}"`,
    );
  }
  const render: IdRefRenderer = {
    text: text => text,
    id: id => `${prefix}${ID_SEPARATOR}${id}`,
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
