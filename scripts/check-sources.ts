#!/usr/bin/env node
/**
 * Reports `source` URLs in icons/<category>/<unit>.json that no longer serve
 * what they cite: gone (404 / 410), moved to another site (a redirect chain
 * that ends on a different domain, as when a domain lapses or a project
 * moves; a redirect to a kit host such as Notion or Figma does not count), or
 * failing (other error statuses, DNS and connection errors, timeouts). Sites
 * that wall off bots (401, 403, 429, challenge pages) are only counted: they
 * say nothing about the URL.
 *
 *   node scripts/check-sources.ts
 *
 * Report only: it always exits 0 once the check ran. The Markdown report goes
 * to stdout and, in GitHub Actions, to the job summary, with a warning
 * annotation per problem. `.github/workflows/source-links.yml` runs it every
 * month. It uses Node built-ins only, so it needs no `pnpm install`.
 */

import { appendFileSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');

const USER_AGENT =
  'react-web3-icons source check (+https://github.com/derodero24/react-web3-icons)';
const TIMEOUT_MS = 20_000;
const MAX_REDIRECTS = 10;
const CONCURRENCY = 8;

/** Every http(s) URL in a `source` entry, without trailing punctuation. */
export function extractUrls(text: string): string[] {
  return [...text.matchAll(/https?:\/\/[^\s"'<>]+/g)].map(([match]) => {
    let url = match.replace(/[.,;:!?]+$/, '');
    // A closing parenthesis belongs to the URL only when it opens one too.
    while (
      url.endsWith(')') &&
      (url.match(/\(/g)?.length ?? 0) < (url.match(/\)/g)?.length ?? 0)
    ) {
      url = url.slice(0, -1);
    }
    return url;
  });
}

/** The URLs in a parsed unit's `source` array. */
function sourceUrls(unit: unknown): string[] {
  const source =
    typeof unit === 'object' && unit !== null && 'source' in unit
      ? unit.source
      : undefined;
  return (Array.isArray(source) ? source : []).flatMap(entry =>
    typeof entry === 'string' ? extractUrls(entry) : [],
  );
}

/** `icons/<category>/<unit>.json` paths under `iconsDir`, sorted. */
function unitPaths(iconsDir: string): string[] {
  return readdirSync(iconsDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .flatMap(({ name: category }) =>
      readdirSync(join(iconsDir, category))
        .filter(file => file.endsWith('.json'))
        .map(file => `${category}/${file}`),
    )
    .sort();
}

/** Source URL → the unit files that cite it, in path order. */
export function collectSources(iconsDir: string): Map<string, string[]> {
  const sources = new Map<string, string[]>();
  for (const unitPath of unitPaths(iconsDir)) {
    const unit: unknown = JSON.parse(
      readFileSync(join(iconsDir, unitPath), 'utf-8'),
    );
    const path = `icons/${unitPath}`;
    for (const url of new Set(sourceUrls(unit))) {
      sources.set(url, [...(sources.get(url) ?? []), path]);
    }
  }
  return sources;
}

/** Second-level labels under which country-code domains register names. */
const SECOND_LEVEL = new Set(['ac', 'co', 'com', 'edu', 'gov', 'net', 'org']);

/** Domains that serve one site's files under another name. */
const SAME_SITE: Readonly<Record<string, string>> = {
  'githubusercontent.com': 'github.com',
  'googleusercontent.com': 'google.com',
  'notion.site': 'notion.com',
  'notion.so': 'notion.com',
};

/**
 * Sites that host brand kits for many projects (Notion pages, Figma files,
 * Google Drive folders, standards.site guidelines): a brand page that
 * redirects there has not moved.
 */
const KIT_HOSTS = new Set([
  'figma.com',
  'google.com',
  'notion.com',
  'standards.site',
]);

/**
 * The registrable domain of a hostname, approximately (`www.lace.io` →
 * `lace.io`, `brand.example.co.uk` → `example.co.uk`), so redirects within
 * one site do not count as moves.
 */
export function siteOf(hostname: string): string {
  const labels = hostname.toLowerCase().replace(/\.$/, '').split('.');
  const tld = labels.at(-1) ?? '';
  const second = labels.at(-2) ?? '';
  const keep = tld.length === 2 && SECOND_LEVEL.has(second) ? 3 : 2;
  const site = labels.slice(-keep).join('.');
  return SAME_SITE[site] ?? site;
}

/** What requesting one URL ended with. */
export interface Probe {
  /** Final HTTP status, absent when no response arrived. */
  readonly status?: number;
  /** The URL the redirect chain ended on. */
  readonly finalUrl: string;
  /** Network error, timeout or redirect loop, when no final status. */
  readonly error?: string;
  /** The response was a bot challenge (Cloudflare `cf-mitigated`). */
  readonly challenge?: boolean;
}

export type Verdict = 'ok' | 'broken' | 'moved' | 'failing' | 'blocked';

/** How a probe of `url` reads. */
export function classify(url: string, probe: Probe): Verdict {
  if (probe.status === undefined) {
    return 'failing';
  }
  if (
    probe.challenge ||
    probe.status === 401 ||
    probe.status === 403 ||
    probe.status === 429
  ) {
    return 'blocked';
  }
  if (probe.status === 404 || probe.status === 410) {
    return 'broken';
  }
  if (probe.status >= 400) {
    return 'failing';
  }
  const site = siteOf(new URL(probe.finalUrl).hostname);
  return site === siteOf(new URL(url).hostname) || KIT_HOSTS.has(site)
    ? 'ok'
    : 'moved';
}

type Fetch = typeof fetch;

/** `fetch failed (ENOTFOUND)`: the message plus the cause's error code. */
function describeError(error: unknown): string {
  if (!(error instanceof Error)) {
    return String(error);
  }
  const { cause } = error;
  const code =
    typeof cause === 'object' && cause !== null && 'code' in cause
      ? ` (${String(cause.code)})`
      : '';
  return `${error.message}${code}`;
}

/** Follows redirects by hand, so the chain's end is known. */
async function request(
  url: string,
  method: 'HEAD' | 'GET',
  fetchImpl: Fetch,
): Promise<Probe> {
  let current = url;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    let response: Response;
    try {
      response = await fetchImpl(current, {
        method,
        redirect: 'manual',
        headers: { 'user-agent': USER_AGENT, accept: '*/*' },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
    } catch (error) {
      return { finalUrl: current, error: describeError(error) };
    }
    // Only the headers matter; never download the file.
    await response.body?.cancel();
    const location = response.headers.get('location');
    if (response.status >= 300 && response.status < 400 && location) {
      current = new URL(location, current).href;
      continue;
    }
    return {
      status: response.status,
      finalUrl: current,
      challenge: response.headers.get('cf-mitigated') === 'challenge',
    };
  }
  return { finalUrl: current, error: `more than ${MAX_REDIRECTS} redirects` };
}

/**
 * Probes a URL with HEAD and, when that does not end in success (servers
 * that refuse or mishandle HEAD), once more with GET.
 */
export async function probe(
  url: string,
  fetchImpl: Fetch = fetch,
): Promise<Probe> {
  const head = await request(url, 'HEAD', fetchImpl);
  if (head.status !== undefined && head.status < 400) {
    return head;
  }
  return request(url, 'GET', fetchImpl);
}

/** Runs `task` over `items` with at most `limit` in flight, keeping order. */
async function mapLimit<T, R>(
  items: readonly T[],
  limit: number,
  task: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  let next = 0;
  const worker = async (): Promise<void> => {
    while (next < items.length) {
      const index = next++;
      results[index] = await task(items[index] as T);
    }
  };
  await Promise.all(Array.from({ length: limit }, worker));
  return results;
}

export interface Checked {
  readonly url: string;
  readonly units: readonly string[];
  readonly probe: Probe;
  readonly verdict: Verdict;
}

const HEADINGS: Readonly<Record<Exclude<Verdict, 'ok'>, string>> = {
  broken: 'Gone (404 / 410)',
  moved: 'Moved to another site',
  failing: 'Failing (other errors)',
  blocked: 'Blocked by the site (401 / 403 / 429 / challenge; not a finding)',
};

function outcome({ probe: p }: Checked): string {
  return p.status === undefined
    ? (p.error ?? 'no response')
    : `HTTP ${p.status}`;
}

/** Escapes a value for a GitHub Actions workflow command. */
const escapeCommand = (text: string): string =>
  text.replaceAll('%', '%25').replaceAll('\r', '%0D').replaceAll('\n', '%0A');

/** The Markdown report of a run. */
export function report(checked: readonly Checked[]): string {
  const count = (verdict: Verdict): number =>
    checked.filter(c => c.verdict === verdict).length;
  const lines = [
    '## Icon source URLs',
    '',
    `${checked.length} URLs cited in \`icons/**/*.json\` \`source\`: ${count('ok')} OK, ${count('broken')} gone, ${count('moved')} moved to another site, ${count('failing')} failing, ${count('blocked')} blocked by the site.`,
  ];
  for (const verdict of ['broken', 'moved', 'failing', 'blocked'] as const) {
    const rows = checked.filter(c => c.verdict === verdict);
    if (rows.length === 0) {
      continue;
    }
    lines.push('', `### ${HEADINGS[verdict]}`, '');
    if (verdict === 'blocked') {
      lines.push('<details><summary>URLs</summary>', '');
    }
    lines.push('| URL | Result | Cited by |', '| --- | --- | --- |');
    for (const row of rows) {
      const result =
        verdict === 'moved'
          ? `→ ${row.probe.finalUrl} (${outcome(row)})`
          : outcome(row);
      const cell = (text: string): string => text.replaceAll('|', '\\|');
      lines.push(
        `| ${cell(row.url)} | ${cell(result)} | ${row.units.map(u => `\`${u}\``).join(', ')} |`,
      );
    }
    if (verdict === 'blocked') {
      lines.push('', '</details>');
    }
  }
  return `${lines.join('\n')}\n`;
}

/** Probes every source URL under `iconsDir`. */
export function checkSources(
  iconsDir: string,
  fetchImpl: Fetch = fetch,
): Promise<Checked[]> {
  const sources = [...collectSources(iconsDir)];
  return mapLimit(sources, CONCURRENCY, async ([url, units]) => {
    const result = await probe(url, fetchImpl);
    return { url, units, probe: result, verdict: classify(url, result) };
  });
}

if (
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const checked = await checkSources(join(ROOT, 'icons'));
  const markdown = report(checked);
  console.log(markdown);
  const { GITHUB_STEP_SUMMARY: summary } = process.env;
  if (summary) {
    appendFileSync(summary, markdown);
    for (const row of checked) {
      if (row.verdict === 'broken' || row.verdict === 'moved') {
        const what =
          row.verdict === 'moved'
            ? `moved to ${row.probe.finalUrl}`
            : `HTTP ${row.probe.status}`;
        console.log(
          `::warning title=Icon source ${row.verdict}::${escapeCommand(`${row.url} (${what}), cited by ${row.units.join(', ')}`)}`,
        );
      }
    }
  }
}
