/**
 * Changelog generator for `changeset version` (.changeset/config.json
 * `changelog`). @changesets/apply-release-plan resolves the path relative to
 * .changeset/ and loads this file with import(), so it runs through Node's
 * type stripping like the other scripts.
 *
 * It is @changesets/changelog-github with one fix. Upstream links every
 * `#<digits>` in a summary to an issue (`\B#([1-9]\d*)\b`), including inside
 * code. A digit-only hex colour such as `#141414`, or a character reference
 * such as `&#10;`, then turns into a link to an issue that does not exist.
 * The wrapper keeps the upstream entry and turns the issue links inside code
 * back into the text the changeset wrote. Issue links in prose stay linked.
 */

import changelogGithub from '@changesets/changelog-github';

type ChangelogFunctions = typeof changelogGithub;

/** An issue link as upstream writes it: `[#N](<server>/<repo>/issues/N)`. */
const ISSUE_LINK = /\[#(\d+)\]\(https?:\/\/[^\s)]+\/issues\/\1\)/g;

/** A leading block quote marker; each one is a level of nesting. */
const QUOTE_MARKER = /^[ \t]*>[ \t]?/;

/** Leading list item markers (`-`, `+`, `*`, `1.`, `1)`), nested or not. */
const LIST_MARKERS = /^(?:[ \t]*(?:[-+*]|\d{1,9}[.)])(?:[ \t]+|$))*/;

/** The number that an ordered list marker starts its list at. */
const ORDERED_MARKER = /^[ \t]*(\d{1,9})[.)]/;

/** A code fence: a run of at least three backticks or three tildes. */
const FENCE = /^([ \t]*)(`{3,}|~{3,})(.*)$/;

/** A line that is a block on its own: a heading or a horizontal rule. */
const SINGLE_LINE_BLOCK =
  /^[ \t]*(?:#{1,6}(?:[ \t]|$)|([-*_])(?:[ \t]*\1){2,}[ \t]*$|(?:-+|=+)[ \t]*$)/;

const BLANK = /^[ \t]*$/;

const INDENT = /^[ \t]*/;

const unlink = (code: string): string => code.replace(ISSUE_LINK, '#$1');

/** The start of the next run of exactly `length` backticks, or -1. */
function findBacktickRun(text: string, length: number, from: number): number {
  for (let start = text.indexOf('`', from); start !== -1; ) {
    let end = start;
    while (text[end] === '`') {
      end++;
    }
    if (end - start === length) {
      return start;
    }
    start = text.indexOf('`', end);
  }
  return -1;
}

/**
 * Unlinks the issue links inside the code spans of one paragraph, with
 * CommonMark's rules: a span opens at a whole run of backticks that is not
 * backslash-escaped and closes at the next run of the same length. A run
 * without such a closer is literal text, and the scan goes on after it.
 */
function unlinkCodeSpans(paragraph: string): string {
  let result = '';
  let copied = 0;
  let index = 0;
  while (index < paragraph.length) {
    const char = paragraph[index];
    if (char === '`') {
      const open = index;
      while (paragraph[index] === '`') {
        index++;
      }
      const close = findBacktickRun(paragraph, index - open, index);
      if (close !== -1) {
        result += paragraph.slice(copied, index);
        result += unlink(paragraph.slice(index, close));
        copied = close;
        index = close + (index - open);
      }
    } else {
      // A backslash escapes the next character: `\`` opens nothing, and
      // `\\`` is an escaped backslash followed by an opening backtick.
      index += char === '\\' ? 2 : 1;
    }
  }
  return result + paragraph.slice(copied);
}

/**
 * Splits off a line's leading block quote markers, at most `limit` of them,
 * and returns how many there were and the text after them.
 */
function splitQuote(
  line: string,
  limit = Number.POSITIVE_INFINITY,
): { depth: number; text: string } {
  let depth = 0;
  let text = line;
  for (
    let marker = QUOTE_MARKER.exec(text);
    marker && depth < limit;
    marker = QUOTE_MARKER.exec(text)
  ) {
    text = text.slice(marker[0].length);
    depth++;
  }
  return { depth, text };
}

interface Fence {
  readonly char: string;
  readonly length: number;
  /** The column the fence starts at, counted after block quote markers. */
  readonly column: number;
  readonly quoteDepth: number;
}

/** What the start of a line means for the blocks around it. */
interface LineStart {
  /** The code fence the line opens, if it opens one. */
  readonly fence: Fence | undefined;
  /** Blank after its block quote markers, so it ends a paragraph. */
  readonly blank: boolean;
  readonly quoteDepth: number;
  /** How far the line is indented, after block quote markers. */
  readonly indent: number;
  /** Where the line's text starts, after block quote and list markers. */
  readonly textColumn: number;
  /**
   * Opens a heading, a rule, or a list item that can interrupt a paragraph:
   * one that has text and is a bullet or numbered 1.
   */
  readonly interrupts: boolean;
  /**
   * Opens a list item that cannot interrupt a paragraph: an empty one, or one
   * numbered other than 1. Inside a paragraph it is paragraph text, unless it
   * is indented less than the paragraph's first line, which puts it outside
   * the list item holding the paragraph.
   */
  readonly weakListItem: boolean;
  /** A heading or a rule, which no later line continues. */
  readonly singleLine: boolean;
}

function readLineStart(line: string): LineStart {
  const { depth, text } = splitQuote(line);
  const marker = LIST_MARKERS.exec(text)?.[0] ?? '';
  const content = text.slice(marker.length);
  const [, indent = '', run = '', info = ''] = FENCE.exec(content) ?? [];
  // A backtick fence's info string cannot hold a backtick (```a``` on its
  // own line is a code span); a tilde fence's can.
  const opensFence = run !== '' && !(run.startsWith('`') && info.includes('`'));
  const singleLine =
    SINGLE_LINE_BLOCK.test(text) || SINGLE_LINE_BLOCK.test(content);
  const [, start = '1'] = ORDERED_MARKER.exec(marker) ?? [];
  const strongListItem =
    marker !== '' && !BLANK.test(content) && Number(start) === 1;
  return {
    fence: opensFence
      ? {
          char: run.charAt(0),
          length: run.length,
          column: marker.length + indent.length,
          quoteDepth: depth,
        }
      : undefined,
    blank: BLANK.test(text),
    quoteDepth: depth,
    indent: INDENT.exec(text)?.[0].length ?? 0,
    textColumn: marker.length + (INDENT.exec(content)?.[0].length ?? 0),
    interrupts: singleLine || strongListItem,
    weakListItem: marker !== '' && !strongListItem,
    singleLine,
  };
}

/**
 * Whether a line ends the paragraph that `paragraph`, its first line, opened.
 * A deeper block quote interrupts the paragraph; a shallower line is a lazy
 * continuation of it.
 */
function endsParagraph(start: LineStart, paragraph: LineStart): boolean {
  return (
    start.interrupts ||
    start.quoteDepth > paragraph.quoteDepth ||
    (start.weakListItem && start.indent < paragraph.textColumn)
  );
}

/**
 * Where a line after the opening fence belongs: to the code, as the closing
 * fence, or after the block. A closing fence uses the same character, is at
 * least as long, and is indented at most 3 columns more than the opening
 * fence. A line quoted less deeply ends the block quote the fence is in, and
 * the fence with it.
 */
function placeInFence(line: string, fence: Fence): 'code' | 'close' | 'after' {
  const { depth, text } = splitQuote(line, fence.quoteDepth);
  if (depth < fence.quoteDepth) {
    return 'after';
  }
  const [, indent = '', run = '', rest = ''] = FENCE.exec(text) ?? [];
  const closes =
    run.startsWith(fence.char) &&
    run.length >= fence.length &&
    indent.length <= fence.column + 3 &&
    BLANK.test(rest);
  return closes ? 'close' : 'code';
}

/**
 * Appends the fenced code block that `lines[open]` opens to `output`, with
 * its issue links unlinked, and returns the index of its last line.
 */
function unlinkFencedBlock(
  lines: readonly string[],
  open: number,
  fence: Fence,
  output: string[],
): number {
  output.push(unlink(lines[open] ?? ''));
  for (let index = open + 1; index < lines.length; index++) {
    const line = lines[index] ?? '';
    const place = placeInFence(line, fence);
    if (place === 'after') {
      return index - 1;
    }
    output.push(place === 'code' ? unlink(line) : line);
    if (place === 'close') {
      return index;
    }
  }
  return lines.length - 1;
}

/**
 * Turns every issue link upstream added inside code back into the plain `#N`
 * it replaced. Code means:
 *
 * - fenced code blocks, from a fence of three or more backticks or tildes to
 *   a closing fence of the same character that is at least as long, or else
 *   to the end of the block quote holding the fence, or of the entry;
 * - code spans, paired within one paragraph as `unlinkCodeSpans` describes.
 *
 * Paragraphs end at blank lines and fences, and before lines that open a
 * heading, a rule, a deeper block quote or a list item (as `LineStart`
 * describes). That approximates CommonMark's block structure: it does not
 * check that a block-opening line is indented at most 3 columns past the
 * list item holding it, it does not end a fence where that list item ends,
 * and it does not model indented code blocks, raw HTML, autolinks or table
 * cells, where issue links stay as upstream wrote them. Text outside code is
 * returned unchanged.
 */
export function unlinkIssueRefsInCode(markdown: string): string {
  const lines = markdown.split('\n');
  const output: string[] = [];
  let paragraph: string[] = [];
  let paragraphStart: LineStart | undefined;

  const endParagraph = (): void => {
    if (paragraph.length > 0) {
      output.push(unlinkCodeSpans(paragraph.join('\n')));
    }
    paragraph = [];
    paragraphStart = undefined;
  };

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index] ?? '';
    const start = readLineStart(line);
    if (start.fence) {
      endParagraph();
      index = unlinkFencedBlock(lines, index, start.fence, output);
      continue;
    }
    if (start.blank) {
      endParagraph();
      output.push(line);
      continue;
    }
    if (paragraphStart && endsParagraph(start, paragraphStart)) {
      endParagraph();
    }
    paragraphStart ??= start;
    paragraph.push(line);
    if (start.singleLine) {
      endParagraph();
    }
  }
  endParagraph();
  return output.join('\n');
}

export const getReleaseLine: ChangelogFunctions['getReleaseLine'] = async (
  changeset,
  type,
  options,
) =>
  unlinkIssueRefsInCode(
    await changelogGithub.getReleaseLine(changeset, type, options),
  );

/** Dependency lines hold commit links only, so they are passed through. */
export const getDependencyReleaseLine: ChangelogFunctions['getDependencyReleaseLine'] =
  changelogGithub.getDependencyReleaseLine;
