/**
 * Strict, dependency-free XML parser for the SVG sources under icons/.
 *
 * The inputs are machine-generated, well-formed SVG documents, so the parser
 * intentionally rejects anything exotic (comments, CDATA, processing
 * instructions, doctypes, text content, entities beyond the five XML
 * predefines) instead of guessing. Any icon that needs more than this should
 * be a `custom` unit with hand-written TSX.
 */

/** One attribute, in source order, with its value fully decoded. */
export type XmlAttr = readonly [name: string, value: string];

/** An element; icon SVGs carry no text nodes. */
export interface XmlNode {
  readonly tag: string;
  readonly attrs: readonly XmlAttr[];
  readonly children: readonly XmlNode[];
}

const NAME = /[A-Za-z_][\w.:-]*/y;
const SPACE = /\s*/y;

/** The five entities XML predefines; icon SVGs declare no others. */
const NAMED_ENTITIES: ReadonlyMap<string, string> = new Map([
  ['lt', '<'],
  ['gt', '>'],
  ['amp', '&'],
  ['quot', '"'],
  ['apos', "'"],
]);

/** Every `&…;` reference, plus any bare `&` (which XML does not allow). */
const REFERENCE = /&(?:#x[0-9A-Fa-f]+;|#\d+;|[A-Za-z]+;)?/g;

/** Whether `code` is a character XML 1.0 allows in a document. */
function isXmlChar(code: number): boolean {
  return (
    code === 0x9 ||
    code === 0xa ||
    code === 0xd ||
    (code >= 0x20 && code <= 0xd7_ff) ||
    (code >= 0xe0_00 && code <= 0xff_fd) ||
    (code >= 0x1_00_00 && code <= 0x10_ff_ff)
  );
}

/** Decodes one reference matched by REFERENCE, or `undefined` if invalid. */
function decodeReference(ref: string): string | undefined {
  if (ref.startsWith('&#')) {
    const code = ref.startsWith('&#x')
      ? Number.parseInt(ref.slice(3, -1), 16)
      : Number.parseInt(ref.slice(2, -1), 10);
    return isXmlChar(code) ? String.fromCodePoint(code) : undefined;
  }
  return NAMED_ENTITIES.get(ref.slice(1, -1));
}

class Parser {
  readonly text: string;
  /** Names the document in error messages (usually its path). */
  readonly source: string;
  pos = 0;

  constructor(text: string, source: string) {
    this.text = text;
    this.source = source;
  }

  error(message: string, pos = this.pos): Error {
    const before = this.text.slice(0, pos);
    const line = before.split('\n').length;
    const column = pos - before.lastIndexOf('\n');
    const context = this.text.slice(Math.max(0, pos - 40), pos + 40);
    return new Error(
      `${this.source}:${line}:${column}: XML parse error: ${message}\n…${context}…`,
    );
  }

  match(re: RegExp): string | undefined {
    re.lastIndex = this.pos;
    const m = re.exec(this.text);
    if (!m) {
      return undefined;
    }
    this.pos = re.lastIndex;
    return m[0];
  }

  /** Consumes `str` if the input continues with it. */
  eat(str: string): boolean {
    if (!this.text.startsWith(str, this.pos)) {
      return false;
    }
    this.pos += str.length;
    return true;
  }

  expect(str: string): void {
    if (!this.eat(str)) {
      throw this.error(`expected ${JSON.stringify(str)}`);
    }
  }

  parseElement(): XmlNode {
    this.expect('<');
    const tag = this.match(NAME);
    if (!tag) {
      throw this.error('expected tag name');
    }
    const attrs: XmlAttr[] = [];
    for (;;) {
      this.match(SPACE);
      if (this.eat('/>')) {
        return { tag, attrs, children: [] };
      }
      if (this.eat('>')) {
        return { tag, attrs, children: this.parseChildren(tag) };
      }
      const start = this.pos;
      const attr = this.parseAttr();
      if (attrs.some(([name]) => name === attr[0])) {
        throw this.error(`duplicate attribute ${attr[0]} on <${tag}>`, start);
      }
      attrs.push(attr);
    }
  }

  parseAttr(): XmlAttr {
    const name = this.match(NAME);
    if (!name) {
      throw this.error('expected attribute name');
    }
    this.match(SPACE);
    this.expect('=');
    this.match(SPACE);
    const quote = this.text[this.pos];
    if (quote !== '"' && quote !== "'") {
      throw this.error('expected quoted attribute value');
    }
    this.pos += 1;
    const end = this.text.indexOf(quote, this.pos);
    if (end === -1) {
      throw this.error('unterminated attribute value');
    }
    const value = this.decodeValue(this.pos, end);
    this.pos = end + 1;
    return [name, value];
  }

  /** Decodes the attribute value `text[start, end)`. */
  decodeValue(start: number, end: number): string {
    const raw = this.text.slice(start, end);
    const lt = raw.indexOf('<');
    if (lt !== -1) {
      throw this.error('"<" must be escaped in attribute values', start + lt);
    }
    return raw.replace(REFERENCE, (ref: string, offset: number) => {
      const decoded = decodeReference(ref);
      if (decoded === undefined) {
        throw this.error(
          `invalid reference ${JSON.stringify(ref)} (write a literal "&" as "&amp;")`,
          start + offset,
        );
      }
      return decoded;
    });
  }

  /** Parses the children of `<tag>` up to and including its closing tag. */
  parseChildren(tag: string): XmlNode[] {
    const children: XmlNode[] = [];
    for (;;) {
      this.match(SPACE);
      if (this.eat(`</${tag}`)) {
        this.match(SPACE);
        this.expect('>');
        return children;
      }
      if (
        this.text.startsWith('<!', this.pos) ||
        this.text.startsWith('<?', this.pos)
      ) {
        throw this.error(
          'comments, doctypes, and processing instructions are not allowed',
        );
      }
      if (!this.text.startsWith('<', this.pos)) {
        throw this.error('text content is not allowed in icon SVGs');
      }
      children.push(this.parseElement());
    }
  }
}

export function encodeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

/**
 * Parses a standalone SVG document.
 * @param source names the document in error messages (usually its path)
 * @returns the root <svg> node
 */
export function parseSvg(text: string, source = 'SVG'): XmlNode {
  const parser = new Parser(text.trim(), source);
  const root = parser.parseElement();
  parser.match(SPACE);
  if (parser.pos !== parser.text.length) {
    throw parser.error('trailing content after root element');
  }
  if (root.tag !== 'svg') {
    throw new Error(`${source}: expected <svg> root, got <${root.tag}>`);
  }
  return root;
}

/** Value of the attribute `name` on `node`, if present. */
export function getAttr(node: XmlNode, name: string): string | undefined {
  return node.attrs.find(([k]) => k === name)?.[1];
}

/** Serializes a node back to compact SVG text (one element per line). */
export function serializeSvg(node: XmlNode, indent = ''): string {
  const attrs = node.attrs.map(([k, v]) => ` ${k}="${encodeAttr(v)}"`).join('');
  if (node.children.length === 0) {
    return `${indent}<${node.tag}${attrs}/>`;
  }
  const children = node.children
    .map(child => serializeSvg(child, `${indent}  `))
    .join('\n');
  return `${indent}<${node.tag}${attrs}>\n${children}\n${indent}</${node.tag}>`;
}
