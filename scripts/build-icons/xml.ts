/**
 * Strict, dependency-free XML parser for the SVG sources under icons/.
 *
 * The inputs are machine-generated, well-formed SVG documents, so the parser
 * intentionally rejects anything exotic (comments, CDATA, processing
 * instructions, doctypes, text content) instead of guessing. Any icon that
 * needs more than this should be a `custom` unit with hand-written TSX.
 */

/** One attribute, in source order. */
export type XmlAttr = readonly [name: string, value: string];

/** An element; icon SVGs carry no text nodes. */
export interface XmlNode {
  readonly tag: string;
  readonly attrs: readonly XmlAttr[];
  readonly children: readonly XmlNode[];
}

const NAME = /[A-Za-z_][\w.:-]*/y;
const SPACE = /\s*/y;

class Parser {
  readonly text: string;
  pos = 0;

  constructor(text: string) {
    this.text = text;
  }

  error(message: string): Error {
    const context = this.text.slice(Math.max(0, this.pos - 40), this.pos + 40);
    return new Error(
      `XML parse error at ${this.pos}: ${message}\n…${context}…`,
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
      attrs.push(this.parseAttr());
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
    const value = decodeEntities(this.text.slice(this.pos, end));
    this.pos = end + 1;
    return [name, value];
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

function decodeEntities(value: string): string {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

export function encodeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

/**
 * Parses a standalone SVG document.
 * @returns the root <svg> node
 */
export function parseSvg(text: string): XmlNode {
  const parser = new Parser(text.trim());
  const root = parser.parseElement();
  parser.match(SPACE);
  if (parser.pos !== parser.text.length) {
    throw parser.error('trailing content after root element');
  }
  if (root.tag !== 'svg') {
    throw new Error(`expected <svg> root, got <${root.tag}>`);
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
