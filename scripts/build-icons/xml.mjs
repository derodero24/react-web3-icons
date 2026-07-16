/**
 * Strict, dependency-free XML parser for the SVG sources under icons/.
 *
 * The inputs are machine-generated, well-formed SVG documents, so the parser
 * intentionally rejects anything exotic (comments, CDATA, processing
 * instructions, doctypes, text content) instead of guessing. Any icon that
 * needs more than this should be a `custom` unit with hand-written TSX.
 */

/**
 * @typedef {{ tag: string, attrs: [string, string][], children: Node[] }} Node
 */

const NAME = /[A-Za-z_][\w.:-]*/y;
const SPACE = /\s*/y;

class Parser {
  /** @param {string} text */
  constructor(text) {
    this.text = text;
    this.pos = 0;
  }

  error(message) {
    const context = this.text.slice(Math.max(0, this.pos - 40), this.pos + 40);
    throw new Error(`XML parse error at ${this.pos}: ${message}\n…${context}…`);
  }

  match(re) {
    re.lastIndex = this.pos;
    const m = re.exec(this.text);
    if (!m) {
      return null;
    }
    this.pos = re.lastIndex;
    return m[0];
  }

  expect(str) {
    if (!this.text.startsWith(str, this.pos)) {
      this.error(`expected ${JSON.stringify(str)}`);
    }
    this.pos += str.length;
  }

  /** @returns {Node} */
  parseElement() {
    this.expect('<');
    const tag = this.match(NAME);
    if (!tag) {
      this.error('expected tag name');
    }
    const attrs = [];
    for (;;) {
      this.match(SPACE);
      if (this.text.startsWith('/>', this.pos)) {
        this.pos += 2;
        return { tag, attrs, children: [] };
      }
      if (this.text.startsWith('>', this.pos)) {
        this.pos += 1;
        break;
      }
      const name = this.match(NAME);
      if (!name) {
        this.error('expected attribute name');
      }
      this.match(SPACE);
      this.expect('=');
      this.match(SPACE);
      const quote = this.text[this.pos];
      if (quote !== '"' && quote !== "'") {
        this.error('expected quoted attribute value');
      }
      this.pos += 1;
      const end = this.text.indexOf(quote, this.pos);
      if (end === -1) {
        this.error('unterminated attribute value');
      }
      attrs.push([name, decodeEntities(this.text.slice(this.pos, end))]);
      this.pos = end + 1;
    }
    const children = [];
    for (;;) {
      this.match(SPACE);
      if (this.text.startsWith(`</${tag}`, this.pos)) {
        this.pos += 2 + tag.length;
        this.match(SPACE);
        this.expect('>');
        return { tag, attrs, children };
      }
      if (this.text.startsWith('<!', this.pos) || this.text.startsWith('<?', this.pos)) {
        this.error('comments, doctypes, and processing instructions are not allowed');
      }
      if (this.text.startsWith('<', this.pos)) {
        children.push(this.parseElement());
        continue;
      }
      this.error('text content is not allowed in icon SVGs');
    }
  }
}

function decodeEntities(value) {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

export function encodeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

/**
 * Parses a standalone SVG document.
 * @returns {Node} the root <svg> node
 */
export function parseSvg(text) {
  const parser = new Parser(text.trim());
  const root = parser.parseElement();
  parser.match(SPACE);
  if (parser.pos !== parser.text.length) {
    parser.error('trailing content after root element');
  }
  if (root.tag !== 'svg') {
    throw new Error(`expected <svg> root, got <${root.tag}>`);
  }
  return root;
}

/** Serializes a node back to compact SVG text (one element per line). */
export function serializeSvg(node, indent = '') {
  const attrs = node.attrs.map(([k, v]) => ` ${k}="${encodeAttr(v)}"`).join('');
  if (node.children.length === 0) {
    return `${indent}<${node.tag}${attrs}/>`;
  }
  const children = node.children
    .map(child => serializeSvg(child, `${indent}  `))
    .join('\n');
  return `${indent}<${node.tag}${attrs}>\n${children}\n${indent}</${node.tag}>`;
}
