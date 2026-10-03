/**
 * Makes mask and pattern content independent of the document it is rendered
 * in.
 *
 * Content of a `<mask>` or `<pattern>` inherits `fill` from the ancestors of
 * that element, not from the shape that references it. Inside a React icon
 * those ancestors end at the icon's `<svg>`, whose `fill` is a prop
 * (`<HardhatMono fill="#fff" />` would paint white cut-outs, which a
 * luminance mask then shows instead of hiding). So every such element whose
 * content would inherit `fill` gets the value the content inherits in the
 * standalone source file, and the rendering no longer depends on the host.
 */

import { getAttr, type XmlNode } from './xml.ts';

/** Elements whose content inherits from their own ancestors. */
const CONTENT_ROOTS: ReadonlySet<string> = new Set(['mask', 'pattern']);

/** Elements that paint with `fill`. */
const SHAPES: ReadonlySet<string> = new Set([
  'circle',
  'ellipse',
  'line',
  'path',
  'polygon',
  'polyline',
  'rect',
  'text',
  'use',
]);

/** SVG's initial `fill`; also what `currentColor` is with the initial `color`. */
export const INITIAL_FILL = '#000';

/** The node's own `fill`, from the attribute or a `fill:` style declaration. */
function ownFill(node: XmlNode): string | undefined {
  const style = getAttr(node, 'style');
  const declared =
    style && /(?:^|;)\s*fill\s*:\s*([^;]+?)\s*(?:;|$)/.exec(style);
  return declared ? declared[1] : getAttr(node, 'fill');
}

/** Whether a shape in the subtree takes its `fill` from above `node`. */
export function inheritsFill(node: XmlNode): boolean {
  return (
    ownFill(node) === undefined &&
    (SHAPES.has(node.tag) || node.children.some(inheritsFill))
  );
}

/**
 * Gives every `<mask>` / `<pattern>` whose content inherits `fill` an
 * explicit `fill`: the value inherited at that point of the source document,
 * with `currentColor` (and no value at all) resolved to black, which is what
 * the source renders with the initial `color`.
 *
 * @param inherited the `fill` inherited from the ancestors of `node`
 */
export function isolateMaskContent(node: XmlNode, inherited?: string): XmlNode {
  const own = ownFill(node);
  const fill = own ?? inherited;
  const attrs =
    CONTENT_ROOTS.has(node.tag) &&
    own === undefined &&
    node.children.some(inheritsFill)
      ? [
          ...node.attrs,
          [
            'fill',
            fill === undefined || fill === 'currentColor' ? INITIAL_FILL : fill,
          ] as const,
        ]
      : node.attrs;
  return {
    tag: node.tag,
    attrs,
    children: node.children.map(child => isolateMaskContent(child, fill)),
  };
}
