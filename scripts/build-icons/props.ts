/**
 * Extra props of artwork units (the `props` field, see `PropSpec` in
 * unit.ts): checks them against the variants, and emits the TSX that
 * implements them on top of `createIcon(name, viewBox, render, options)`.
 *
 *  - A "toggle" prop switches between the artwork of two variants. Both
 *    variants share one module-level artwork function and differ only in
 *    their root fill and their default (`true` for `on`, `false` for `off`).
 *  - A "fill" prop sets the `fill` of the elements marked
 *    `data-fill-prop="<name>"`; their own `fill` becomes its default.
 */

import { FILL_PROP_ATTR, quote, type RenderedIcon } from './jsx.ts';
import type { PropSpec, TogglePropSpec } from './unit.ts';
import { getAttr, type XmlNode } from './xml.ts';

/** The parts of a unit this module needs (structurally a `SourceUnit`). */
interface UnitSource {
  readonly meta: {
    readonly name: string;
    readonly variants: Readonly<Record<string, unknown>>;
    readonly props?: Readonly<Record<string, PropSpec>>;
  };
  readonly variants: readonly {
    readonly suffix: string;
    readonly path: string;
    readonly template: XmlNode;
  }[];
}

/** Every fill prop a template marks. */
function markedFillProps(
  node: XmlNode,
  names: Set<string> = new Set(),
): Set<string> {
  const prop = getAttr(node, FILL_PROP_ATTR);
  if (prop !== undefined) {
    names.add(prop);
  }
  for (const child of node.children) {
    markedFillProps(child, names);
  }
  return names;
}

/** The toggle prop that switches `suffix`, as `[name, spec]`. */
function toggleOf(
  props: Readonly<Record<string, PropSpec>>,
  suffix: string,
): [string, TogglePropSpec] | undefined {
  for (const [name, spec] of Object.entries(props)) {
    if (spec.type === 'toggle' && (spec.on === suffix || spec.off === suffix)) {
      return [name, spec];
    }
  }
  return undefined;
}

/**
 * Checks that every toggle switches two existing variants and no variant is
 * switched twice; returns the switched variant suffixes.
 */
function validateToggles(unit: UnitSource): Set<string> {
  const toggled = new Map<string, string>();
  for (const [name, spec] of Object.entries(unit.meta.props ?? {})) {
    for (const suffix of spec.type === 'toggle' ? [spec.on, spec.off] : []) {
      if (!Object.hasOwn(unit.meta.variants, suffix)) {
        throw new Error(`props.${name}: no variant "${suffix}"`);
      }
      const other = toggled.get(suffix);
      if (other !== undefined) {
        throw new Error(
          `props.${name}: variant "${suffix}" is already switched by ${other}`,
        );
      }
      toggled.set(suffix, name);
    }
  }
  return new Set(toggled.keys());
}

/** Throws unless a unit's props and its variants agree. */
export function validateProps(unit: UnitSource): void {
  const props = unit.meta.props ?? {};
  const toggled = validateToggles(unit);
  const marked = new Set<string>();
  for (const variant of unit.variants) {
    for (const prop of markedFillProps(variant.template)) {
      if (props[prop]?.type !== 'fill') {
        throw new Error(
          `${variant.path}: ${FILL_PROP_ATTR}="${prop}" names no "fill" prop of the unit`,
        );
      }
      if (toggled.has(variant.suffix)) {
        throw new Error(
          `${variant.path}: a variant switched by a toggle prop cannot bind fill props`,
        );
      }
      marked.add(prop);
    }
  }
  for (const [name, spec] of Object.entries(props)) {
    if (spec.type === 'fill' && !marked.has(name)) {
      throw new Error(
        `props.${name}: no variant marks an element with ${FILL_PROP_ATTR}="${name}"`,
      );
    }
  }
}

/** Name of the interface that declares a unit's extra props. */
export const propsInterfaceName = (unitName: string): string =>
  `${unitName}Props`;

/** `export interface <Name>Props { … }`, or `undefined` without props. */
export function emitPropsInterface(unit: UnitSource): string | undefined {
  const props = Object.entries(unit.meta.props ?? {});
  if (props.length === 0) {
    return undefined;
  }
  const { name } = unit.meta;
  const members = props.map(([prop, spec]) => {
    if (spec.type === 'fill') {
      return `  /** ${spec.description} */\n  ${prop}?: string | undefined;`;
    }
    const defaults = `Defaults to \`true\` for \`${name}${spec.on}\` and \`false\` for \`${name}${spec.off}\`.`;
    return `  /** ${spec.description} ${defaults} */\n  ${prop}?: boolean | undefined;`;
  });
  return `/** Extra props of the ${name} icons (on top of \`IconProps\`). */\nexport interface ${propsInterfaceName(name)} {\n${members.join('\n')}\n}`;
}

const artworkName = (prop: string): string => `${prop}Artwork`;

function wrap(body: string): string {
  return `(\n  ${body}\n)`;
}

/** The module-level artwork functions of the unit's toggle props. */
export function emitToggleArtworks(
  unit: UnitSource,
  rendered: (suffix: string) => RenderedIcon,
): string[] {
  return Object.entries(unit.meta.props ?? {}).flatMap(([prop, spec]) => {
    if (spec.type !== 'toggle') {
      return [];
    }
    const on = rendered(spec.on);
    const off = rendered(spec.off);
    const params =
      on.usesId || off.usesId
        ? `${prop}: boolean, _id: string`
        : `${prop}: boolean`;
    return [
      `/** The artwork \`${prop}\` switches between. */\nconst ${artworkName(prop)} = (${params}) =>\n  ${prop} ? ${wrap(on.body)} : ${wrap(off.body)};`,
    ];
  });
}

/** The `createIcon` arguments of one variant. */
export interface IconCall {
  /** Type argument list, e.g. `<BybitProps>`, or `''`. */
  readonly typeArgs: string;
  readonly viewBox: string;
  readonly render: string;
  readonly options: string;
}

/** How a variant renders: its extra props, viewBox and render function. */
interface Drawing {
  readonly accepted: readonly string[];
  readonly usesId: boolean;
  readonly viewBox: string;
  readonly render: string;
}

/** A variant switched by the toggle `prop`: it calls the shared artwork. */
function toggleDrawing(
  [prop, spec]: readonly [string, TogglePropSpec],
  suffix: string,
  rendered: (suffix: string) => RenderedIcon,
): Drawing {
  const on = rendered(spec.on);
  const off = rendered(spec.off);
  const binding = `{ ${prop} = ${spec.on === suffix} }`;
  const usesId = on.usesId || off.usesId;
  return {
    accepted: [prop],
    usesId,
    viewBox:
      on.viewBox === off.viewBox
        ? quote(on.viewBox)
        : `(${binding}) =>\n    ${prop} ? ${quote(on.viewBox)} : ${quote(off.viewBox)}`,
    render: usesId
      ? `(${binding}, _id) => ${artworkName(prop)}(${prop}, _id)`
      : `(${binding}) => ${artworkName(prop)}(${prop})`,
  };
}

/** A variant with its own artwork, which may read fill props. */
function artworkDrawing(
  props: Readonly<Record<string, PropSpec>>,
  own: RenderedIcon,
): Drawing {
  const accepted = Object.keys(props).filter(prop => own.fillProps.has(prop));
  const defaults = accepted.map(prop => {
    const fill = own.fillProps.get(prop);
    return fill === undefined ? prop : `${prop} = ${quote(fill)}`;
  });
  const extra = defaults.length > 0 ? `{ ${defaults.join(', ')} }` : '';
  const params = own.usesId ? `${extra || '_props'}, _id` : extra;
  return {
    accepted,
    usesId: own.usesId,
    viewBox: quote(own.viewBox),
    render: `(${params}) => ${wrap(own.body)}`,
  };
}

/** `createIcon` arguments for the variant `suffix`. */
export function emitIconCall(
  unit: UnitSource,
  suffix: string,
  rendered: (suffix: string) => RenderedIcon,
): IconCall {
  const props = unit.meta.props ?? {};
  const own = rendered(suffix);
  const toggle = toggleOf(props, suffix);
  const { accepted, usesId, viewBox, render } = toggle
    ? toggleDrawing(toggle, suffix, rendered)
    : artworkDrawing(props, own);
  const options = [
    ...(own.fill === undefined ? [] : [`fill: ${quote(own.fill)}`]),
    ...(usesId ? ['ids: true'] : []),
    ...(accepted.length > 0
      ? [`props: [${accepted.map(quote).join(', ')}]`]
      : []),
  ];
  const iface = propsInterfaceName(unit.meta.name);
  let typeArgs = '';
  if (accepted.length > 0) {
    typeArgs =
      accepted.length === Object.keys(props).length
        ? `<${iface}>`
        : `<Pick<${iface}, ${accepted.map(quote).join(' | ')}>>`;
  }
  return {
    typeArgs,
    viewBox,
    render,
    options: options.length > 0 ? `{ ${options.join(', ')} }` : '{}',
  };
}
