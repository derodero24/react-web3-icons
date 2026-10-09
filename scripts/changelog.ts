/**
 * Changelog generator for `changeset version` (.changeset/config.json
 * `changelog`). @changesets/apply-release-plan resolves the path relative to
 * .changeset/ and loads this file with import(), so it runs through Node's
 * type stripping like the other scripts.
 *
 * It is @changesets/changelog-github with one fix. Upstream links every
 * `#<digits>` in a summary to an issue (`\B#([1-9]\d*)\b`), including inside
 * code spans. A digit-only hex colour such as `#141414`, or a character
 * reference such as `&#10;`, then turns into a link to an issue that does
 * not exist. The wrapper keeps the upstream entry and turns the issue links
 * inside code spans (and fenced code blocks) back into the text the
 * changeset wrote. Issue links in prose stay linked.
 */

import changelogGithub from '@changesets/changelog-github';

type ChangelogFunctions = typeof changelogGithub;

/**
 * A code span as CommonMark delimits it: a whole run of N backticks, then
 * the content, then the next run of exactly N backticks. Runs with no
 * matching closer are skipped. A fenced code block (```) matches too.
 */
const CODE_SPAN = /(?<!`)(`+)(?!`)([\s\S]*?[^`])\1(?!`)/g;

/** An issue link as upstream writes it: `[#N](<server>/<repo>/issues/N)`. */
const ISSUE_LINK = /\[#(\d+)\]\(https?:\/\/[^\s)]+\/issues\/\1\)/g;

/**
 * Turns every issue link upstream added inside a code span back into the
 * plain `#N` it replaced. Text outside code spans is returned unchanged.
 */
export function unlinkIssueRefsInCodeSpans(markdown: string): string {
  return markdown.replace(CODE_SPAN, span => span.replace(ISSUE_LINK, '#$1'));
}

export const getReleaseLine: ChangelogFunctions['getReleaseLine'] = async (
  changeset,
  type,
  options,
) =>
  unlinkIssueRefsInCodeSpans(
    await changelogGithub.getReleaseLine(changeset, type, options),
  );

/** Dependency lines hold commit links only, so they are passed through. */
export const getDependencyReleaseLine: ChangelogFunctions['getDependencyReleaseLine'] =
  changelogGithub.getDependencyReleaseLine;
