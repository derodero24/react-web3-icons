import * as React from 'react';
import { describe, expect, it } from 'vitest';
import * as icons from '../../src';
import { EthereumCircleMono } from '../../src/chain/Ethereum';
import { HardhatMono } from '../../src/devtool/Hardhat';
import { isIconComponent } from '../helpers/units';

/**
 * Renders the static icons as React Server Components: this project resolves
 * `react` under the `react-server` export condition (see vitest.config.ts)
 * and serializes the tree with a real Flight server renderer. A component
 * that used a client-only hook, or anything else the server build lacks,
 * fails here.
 *
 * Server Components ship with React 19; vitest.config.ts leaves this project
 * out under React 18 (the compat job), whose `react-server` entry throws.
 */

/** A host element in the Flight payload: `["$", type, key, props]`. */
interface FlightElement {
  readonly type: string;
  readonly props: Readonly<Record<string, unknown>>;
}

function asElement(value: unknown): FlightElement | undefined {
  if (
    Array.isArray(value) &&
    value[0] === '$' &&
    typeof value[1] === 'string' &&
    typeof value[3] === 'object' &&
    value[3] !== null
  ) {
    return { type: value[1], props: value[3] };
  }
  return undefined;
}

/** Every value nested in a JSON value, depth first. */
function* walk(value: unknown): Generator<unknown> {
  yield value;
  if (typeof value === 'object' && value !== null) {
    for (const child of Object.values(value)) {
      yield* walk(child);
    }
  }
}

/** The `<svg>` elements of a Flight payload, in order. */
function svgElements(payload: Uint8Array): FlightElement[] {
  const svgs: FlightElement[] = [];
  for (const value of flightRows(payload).flatMap(row => [...walk(row)])) {
    const element = asElement(value);
    if (element?.type === 'svg') {
      svgs.push(element);
    }
  }
  return svgs;
}

const COLON = 0x3a;
const COMMA = 0x2c;
const NEWLINE = 0x0a;
const TEXT_ROW = 0x54; // 'T'

/**
 * The JSON rows of a Flight payload. Rows are `<id>:<data>` plus a newline,
 * except text rows (`<id>:T<hex byte length>,<text>`), which have none.
 */
function flightRows(payload: Uint8Array): unknown[] {
  const decoder = new TextDecoder();
  const rows: unknown[] = [];
  let pos = 0;
  while (pos < payload.length) {
    const colon = payload.indexOf(COLON, pos);
    if (payload[colon + 1] === TEXT_ROW) {
      const comma = payload.indexOf(COMMA, colon);
      const length = decoder.decode(payload.subarray(colon + 2, comma));
      pos = comma + 1 + Number.parseInt(length, 16);
      continue;
    }
    const end = payload.indexOf(NEWLINE, colon);
    const data = decoder.decode(payload.subarray(colon + 1, end));
    if (data.startsWith('[') || data.startsWith('{')) {
      rows.push(JSON.parse(data));
    }
    pos = end + 1;
  }
  return rows;
}

/** The string props of every element inside `svg`, as `[name, value]`. */
function stringProps(svg: FlightElement): [string, string][] {
  return [...walk(svg.props)].flatMap(value =>
    Object.entries(asElement(value)?.props ?? {}).flatMap(([name, prop]) =>
      typeof prop === 'string' ? [[name, prop] as const] : [],
    ),
  );
}

/** The internal id a prop value references, if any. */
function referencedIds(name: string, value: string): string[] {
  if ((name === 'href' || name === 'xlinkHref') && value.startsWith('#')) {
    return [value.slice(1)];
  }
  return [...value.matchAll(/url\(#([^)]+)\)/g)].flatMap(([, id]) =>
    id === undefined ? [] : [id],
  );
}

/** Internal ids defined and referenced inside one rendered `<svg>`. */
function idsOf(svg: FlightElement): { defined: string[]; used: string[] } {
  const props = stringProps(svg);
  return {
    defined: props.filter(([name]) => name === 'id').map(([, id]) => id),
    used: props.flatMap(([name, value]) => referencedIds(name, value)),
  };
}

async function renderFlight(model: React.ReactNode): Promise<Uint8Array> {
  const { renderToReadableStream } = await import(
    'react-server-dom-parcel/server'
  );
  const errors: unknown[] = [];
  const stream = renderToReadableStream(model, {
    onError: (error: unknown) => {
      errors.push(error);
    },
  });
  const payload = new Uint8Array(await new Response(stream).arrayBuffer());
  if (errors.length > 0) {
    throw errors[0];
  }
  return payload;
}

const components = Object.entries(icons).flatMap(([name, value]) =>
  isIconComponent(value) ? [[name, value] as const] : [],
);

describe('React Server Components', () => {
  it('runs under the react-server build of React', () => {
    // The server build leaves out client-only hooks; useId stays.
    expect('useState' in React).toBe(false);
    expect('useEffect' in React).toBe(false);
    expect(typeof React.useId).toBe('function');
  });

  it('reports a component that uses a client-only hook', async () => {
    function ClientOnly() {
      React.useState(0);
      return null;
    }
    await expect(renderFlight(<ClientOnly />)).rejects.toThrow(
      /useState is not a function/,
    );
  });

  it('renders every icon export', async () => {
    expect(components.length).toBeGreaterThan(100);
    const payload = await renderFlight(
      components.map(([name, Icon]) =>
        React.createElement(Icon, { key: name, title: name }),
      ),
    );
    expect(svgElements(payload)).toHaveLength(components.length);
  });

  it('gives each instance its own internal ids', async () => {
    const payload = await renderFlight(
      <>
        <EthereumCircleMono />
        <EthereumCircleMono />
        <HardhatMono fill="#fff" />
        <HardhatMono />
      </>,
    );
    const svgs = svgElements(payload).map(idsOf);
    expect(svgs).toHaveLength(4);
    const all = svgs.flatMap(svg => svg.defined);
    expect(new Set(all).size).toBe(all.length);
    for (const { defined, used } of svgs) {
      expect(defined.length).toBeGreaterThan(0);
      for (const id of used) {
        expect(defined).toContain(id);
      }
    }
  });
});
