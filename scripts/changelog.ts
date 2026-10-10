/**
 * Changelog generator for `changeset version` (.changeset/config.json
 * `changelog`). @changesets/apply-release-plan resolves the path relative to
 * .changeset/ and loads this file with import(), so it runs through Node's
 * type stripping like the other scripts.
 *
 * It is @changesets/changelog-github with one fix. Upstream links every
 * `#<digits>` in a summary to an issue (`\B#([1-9]\d*)\b`), code included,
 * so a digit-only hex colour such as `#141414`, or a character reference
 * such as `&#10;`, turns into a link to an issue that does not exist. The
 * wrapper keeps the upstream entry and turns the issue links inside code back
 * into the `#N` the changeset wrote. Only links inside code go away: issue
 * links in prose, pull request links and commit links stay as upstream wrote
 * them.
 */

import changelogGithub from '@changesets/changelog-github';
import { fromMarkdown } from 'mdast-util-from-markdown';

type ChangelogFunctions = typeof changelogGithub;

type Root = ReturnType<typeof fromMarkdown>;

/**
 * Any node of the tree: mdast's `Nodes`, spelled from fromMarkdown's return
 * type because @types/mdast is only a dependency of mdast-util-from-markdown.
 */
type MdastNode = Root | Root['children'][number];

/** A [start, end) range of source offsets. */
type SourceRange = readonly [start: number, end: number];

/** An issue link as upstream writes it: `[#N](<server>/<repo>/issues/N)`. */
const ISSUE_LINK = /\[#(\d+)\]\(https?:\/\/[^)\s]+\/issues\/\1\)/g;

/**
 * The source ranges of every code span (`inlineCode`) and code block (`code`,
 * fenced or indented) in `node`, in document order. Code nodes have no
 * children, so the ranges never overlap.
 */
function codeRanges(node: MdastNode): SourceRange[] {
  if (node.type === 'inlineCode' || node.type === 'code') {
    const start = node.position?.start.offset;
    const end = node.position?.end.offset;
    // fromMarkdown positions every node it creates; only trees built by hand
    // lack positions, and without them the code cannot be found in the text.
    if (start === undefined || end === undefined) {
      throw new Error(`The parsed ${node.type} node has no source offsets.`);
    }
    return [[start, end]];
  }
  return 'children' in node ? node.children.flatMap(codeRanges) : [];
}

/**
 * Turns every issue link upstream added inside code back into the plain `#N`
 * it replaced. Code is what a CommonMark parser finds: code spans and fenced
 * or indented code blocks. GitHub's extensions to CommonMark (tables,
 * autolink literals, …) are not parsed. Text outside code is returned
 * unchanged.
 */
export function unlinkIssueRefsInCode(markdown: string): string {
  let result = markdown;
  // From the last range to the first, so that shortening one range leaves
  // the offsets of the ranges before it valid.
  for (const [start, end] of codeRanges(fromMarkdown(markdown)).reverse()) {
    result =
      result.slice(0, start) +
      result.slice(start, end).replace(ISSUE_LINK, '#$1') +
      result.slice(end);
  }
  return result;
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
