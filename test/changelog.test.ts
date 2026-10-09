// @vitest-environment node
import { readFileSync } from 'node:fs';
import changelogGithub from '@changesets/changelog-github';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getDependencyReleaseLine,
  getReleaseLine,
  unlinkIssueRefsInCodeSpans,
} from '../scripts/changelog.ts';
import { isArray } from '../scripts/guards.ts';

const REPO = 'derodero24/react-web3-icons';
const SERVER = 'https://github.com';

/** An issue link as @changesets/changelog-github writes it. */
const issue = (n: string): string => `[#${n}](${SERVER}/${REPO}/issues/${n})`;

describe('unlinkIssueRefsInCodeSpans', () => {
  it.each([
    {
      name: 'a digit-only hex colour in a code span',
      input: `\`Xrp\` (\`${issue('141414')}\`)`,
      expected: '`Xrp` (`#141414`)',
    },
    {
      name: 'a character reference in a code span',
      input: `references (\`&${issue('10')};\`) are kept`,
      expected: 'references (`&#10;`) are kept',
    },
    {
      name: 'several code spans on one line',
      input: `\`Scroll\` \`${issue('101010')}\` → \`#ffeeda\`, \`Bitstamp\` \`${issue('282828')}\` → \`#149f49\``,
      expected:
        '`Scroll` `#101010` → `#ffeeda`, `Bitstamp` `#282828` → `#149f49`',
    },
    {
      name: 'a double-backtick span with a backtick inside',
      input: `\`\` a\`b ${issue('141414')} \`\` and ${issue('836')}`,
      expected: `\`\` a\`b #141414 \`\` and ${issue('836')}`,
    },
    {
      name: 'a fenced code block in a continuation line',
      input: `Example:\n\n  \`\`\`tsx\n  <Xrp color="${issue('141414')}" />\n  \`\`\`\n\n  See ${issue('836')}`,
      expected: `Example:\n\n  \`\`\`tsx\n  <Xrp color="#141414" />\n  \`\`\`\n\n  See ${issue('836')}`,
    },
  ])('unlinks $name', ({ input, expected }) => {
    expect(unlinkIssueRefsInCodeSpans(input)).toBe(expected);
  });

  it('keeps issue links outside code spans', () => {
    const line = `Replace the \`Zec\` artwork (${issue('836')}); see also ${issue('835')}.`;
    expect(unlinkIssueRefsInCodeSpans(line)).toBe(line);
  });

  it('leaves commit and pull request links alone', () => {
    // The commit link's backticks close their own span, so they must not
    // pair with the backtick that opens the summary's first code span.
    const commit = `[\`abc1234\`](${SERVER}/${REPO}/commit/abc1234def5678)`;
    const pull = `[#867](${SERVER}/${REPO}/pull/867)`;
    expect(
      unlinkIssueRefsInCodeSpans(
        `- ${pull} ${commit} - \`Ekubo\`: the official \`${issue('101010')}\` symbol (${issue('836')})`,
      ),
    ).toBe(
      `- ${pull} ${commit} - \`Ekubo\`: the official \`#101010\` symbol (${issue('836')})`,
    );
  });

  it('only unlinks links that upstream generated from `#N`', () => {
    const span = `\`[#7](${SERVER}/${REPO}/issues/8) [#7](${SERVER}/${REPO}/pull/7)\``;
    expect(unlinkIssueRefsInCodeSpans(span)).toBe(span);
  });

  it('does not treat a backtick run without a closing run as a span', () => {
    const line = `a \`\` b ${issue('5')} \` c ${issue('6')}`;
    expect(unlinkIssueRefsInCodeSpans(line)).toBe(line);
  });
});

describe('getReleaseLine', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('wraps @changesets/changelog-github and unlinks every code span', async () => {
    vi.stubEnv('GITHUB_SERVER_URL', SERVER);
    // The 11 code spans that @changesets/changelog-github 1.0.1 turned into
    // issue links in the v5 version PR (#823). Without a commit or `pr:`
    // line in the changeset, no GitHub API request is made.
    const summary = [
      'Artwork refresh (#836).',
      '',
      '- `Xrp` and `XrpCircle`: white on a `#141414` disc; `Stx` (`#141414`); `Xrp` (`#141414`).',
      '- `Scroll` `#101010` → `#ffeeda`; `Ekubo`: the official `#101010` symbol.',
      '- `Bitstamp` `#282828` → `#149f49`; `Xverse` `#181818` → `#ee7a30`.',
      '- `Polkadot`: near-black `#171717`; `SonicCircleMono`: a `#141416` disc.',
      '- `CowProtocol`: in `#490072` purple (#835).',
      '- Line breaks written as character references (`&#10;`) are kept.',
    ].join('\n');

    const line = await getReleaseLine(
      { id: 'v5-artwork', summary, releases: [] },
      'major',
      { repo: REPO },
    );

    expect(line).not.toMatch(
      /issues\/(?:141414|101010|282828|181818|171717|141416|490072|10)\)/,
    );
    expect(line.match(/`#141414`/g)).toHaveLength(3);
    expect(line.match(/`#101010`/g)).toHaveLength(2);
    for (const span of [
      '`#282828`',
      '`#181818`',
      '`#171717`',
      '`#141416`',
      '`#490072`',
      '`&#10;`',
    ]) {
      expect(line).toContain(span);
    }
    expect(line).toContain(`Artwork refresh (${issue('836')}).`);
    expect(line).toContain(`purple (${issue('835')}).`);
  });

  it('passes dependency release lines through unchanged', () => {
    expect(getDependencyReleaseLine).toBe(
      changelogGithub.getDependencyReleaseLine,
    );
  });
});

describe('.changeset/config.json', () => {
  it('loads this module as the changelog generator', async () => {
    const config: unknown = JSON.parse(
      readFileSync(
        new URL('../.changeset/config.json', import.meta.url),
        'utf8',
      ),
    );
    expect(config).toMatchObject({
      changelog: [expect.any(String), { repo: REPO }],
    });
    const changelog =
      typeof config === 'object' && config !== null && 'changelog' in config
        ? config.changelog
        : undefined;
    const [generator] = isArray(changelog) ? changelog : [];
    // @changesets/apply-release-plan resolves the path relative to
    // .changeset/ and import()s it.
    const loaded: unknown = await import(
      new URL(String(generator), new URL('../.changeset/', import.meta.url))
        .href
    );
    expect(loaded).toMatchObject({ getReleaseLine, getDependencyReleaseLine });
  });
});
