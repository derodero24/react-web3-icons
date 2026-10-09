// @vitest-environment node
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import {
  type Checked,
  checkSources,
  classify,
  collectSources,
  extractUrls,
  probe,
  report,
  siteOf,
} from '../scripts/check-sources.ts';

/**
 * The monthly source-URL check (.github/workflows/source-links.yml). The
 * network is replaced by a fake `fetch` that serves a fixed table.
 */

type Route = {
  readonly status: number;
  readonly location?: string;
  readonly headers?: Readonly<Record<string, string>>;
  /** Only answer this method; the other gets 405. */
  readonly method?: 'HEAD' | 'GET';
};

/** A `fetch` serving `routes` (URL → response); unknown URLs fail to connect. */
function fakeFetch(routes: Readonly<Record<string, Route>>): typeof fetch {
  return (input, init) => {
    const url = String(input);
    const route = routes[url];
    if (route === undefined) {
      return Promise.reject(
        new TypeError('fetch failed', {
          cause: Object.assign(new Error('getaddrinfo'), { code: 'ENOTFOUND' }),
        }),
      );
    }
    if (init?.redirect !== 'manual') {
      return Promise.reject(new Error('redirects must be followed by hand'));
    }
    const status =
      route.method && route.method !== init?.method ? 405 : route.status;
    return Promise.resolve(
      new Response(null, {
        status,
        headers: {
          ...route.headers,
          ...(route.location ? { location: route.location } : {}),
        },
      }),
    );
  };
}

describe('extractUrls', () => {
  it.each([
    [
      'https://lido.fi/static/LIDO_press_kit.zip (official 2026 press kit)',
      ['https://lido.fi/static/LIDO_press_kit.zip'],
    ],
    ['see https://example.com/brand.', ['https://example.com/brand']],
    ['(from https://example.com/a_(b))', ['https://example.com/a_(b)']],
    ['(from https://example.com/logo.svg)', ['https://example.com/logo.svg']],
    [
      'http://a.example/x and https://b.example/y',
      ['http://a.example/x', 'https://b.example/y'],
    ],
    ['re-export of Bitcoin — see src/chain/Bitcoin.tsx', []],
  ])('%j → %j', (text, urls) => {
    expect(extractUrls(text)).toEqual(urls);
  });
});

describe('siteOf', () => {
  it.each([
    ['www.lace.io', 'lace.io'],
    ['lace.io.', 'lace.io'],
    ['brand.example.co.uk', 'example.co.uk'],
    ['cdn.example.io', 'example.io'],
    ['raw.githubusercontent.com', 'github.com'],
    ['soniclabs.notion.site', 'notion.com'],
    ['localhost', 'localhost'],
  ])('%s → %s', (host, site) => {
    expect(siteOf(host)).toBe(site);
  });
});

describe('classify', () => {
  const url = 'https://brand.example.com/logo.svg';
  it.each([
    [{ status: 200, finalUrl: url }, 'ok'],
    [{ status: 200, finalUrl: 'https://www.example.com/logo.svg' }, 'ok'],
    [{ status: 200, finalUrl: 'https://www.figma.com/file/x' }, 'ok'],
    [{ status: 200, finalUrl: 'https://casino.example.net/' }, 'moved'],
    [{ status: 404, finalUrl: url }, 'broken'],
    [{ status: 410, finalUrl: url }, 'broken'],
    [{ status: 403, finalUrl: url }, 'blocked'],
    [{ status: 401, finalUrl: url }, 'blocked'],
    [{ status: 429, finalUrl: url }, 'blocked'],
    [{ status: 503, finalUrl: url, challenge: true }, 'blocked'],
    [{ status: 500, finalUrl: url }, 'failing'],
    [{ finalUrl: url, error: 'fetch failed (ENOTFOUND)' }, 'failing'],
  ] as const)('%j → %s', (result, verdict) => {
    expect(classify(url, result)).toBe(verdict);
  });
});

describe('probe', () => {
  it('follows redirects to their end', async () => {
    const fetchImpl = fakeFetch({
      'https://namiwallet.io/': {
        status: 301,
        location: 'https://www.lace.io',
      },
      'https://www.lace.io/': { status: 302, location: '/en' },
      'https://www.lace.io/en': { status: 200 },
    });
    const result = await probe('https://namiwallet.io/', fetchImpl);
    expect(result).toEqual({
      status: 200,
      finalUrl: 'https://www.lace.io/en',
      challenge: false,
    });
    expect(classify('https://namiwallet.io/', result)).toBe('moved');
  });

  it('retries with GET when HEAD fails', async () => {
    const fetchImpl = fakeFetch({
      'https://example.com/kit.zip': { status: 200, method: 'GET' },
    });
    expect(await probe('https://example.com/kit.zip', fetchImpl)).toMatchObject(
      { status: 200 },
    );
  });

  it('reports network errors with their code, and redirect loops', async () => {
    expect(await probe('https://gone.example/', fakeFetch({}))).toEqual({
      finalUrl: 'https://gone.example/',
      error: 'fetch failed (ENOTFOUND)',
    });
    const loop = fakeFetch({
      'https://loop.example/': { status: 302, location: '/' },
    });
    expect(await probe('https://loop.example/', loop)).toMatchObject({
      error: 'more than 10 redirects',
    });
    const thrown: typeof fetch = () => Promise.reject('boom');
    expect(await probe('https://x.example/', thrown)).toMatchObject({
      error: 'boom',
    });
  });

  it('recognises bot challenges', async () => {
    const fetchImpl = fakeFetch({
      'https://walled.example/': {
        status: 403,
        headers: { 'cf-mitigated': 'challenge' },
      },
    });
    expect(await probe('https://walled.example/', fetchImpl)).toMatchObject({
      status: 403,
      challenge: true,
    });
  });
});

describe('collecting and reporting', () => {
  const root = mkdtempSync(join(tmpdir(), 'w3i-sources-'));
  afterAll(() => rmSync(root, { recursive: true, force: true }));
  const write = (path: string, unit: unknown): void => {
    mkdirSync(join(root, path, '..'), { recursive: true });
    writeFileSync(join(root, path), JSON.stringify(unit));
  };
  write('chain/a.json', {
    name: 'A',
    source: [
      'https://ok.example/a.svg (kit)',
      'https://ok.example/a.svg (same file again)',
      'https://gone.example/a.svg',
    ],
  });
  write('coin/b.json', { name: 'B', source: ['https://ok.example/a.svg', 3] });
  write('coin/c.json', { name: 'C', kind: 'reexport' });
  writeFileSync(join(root, 'schema.json'), '{}');

  it('maps each source URL to the units citing it', () => {
    expect([...collectSources(root)]).toEqual([
      ['https://ok.example/a.svg', ['icons/chain/a.json', 'icons/coin/b.json']],
      ['https://gone.example/a.svg', ['icons/chain/a.json']],
    ]);
  });

  it('reports the problems with the units citing them', async () => {
    const checked = await checkSources(
      root,
      fakeFetch({
        'https://ok.example/a.svg': { status: 200 },
        'https://gone.example/a.svg': { status: 404 },
      }),
    );
    expect(checked.map(c => [c.url, c.verdict])).toEqual([
      ['https://ok.example/a.svg', 'ok'],
      ['https://gone.example/a.svg', 'broken'],
    ]);
    const markdown = report(checked);
    expect(markdown).toContain(
      '2 URLs cited in `icons/**/*.json` `source`: 1 OK, 1 gone, 0 moved to another site, 0 failing, 0 blocked by the site.',
    );
    expect(markdown).toContain(
      '| https://gone.example/a.svg | HTTP 404 | `icons/chain/a.json` |',
    );
    expect(markdown).not.toContain('ok.example');
  });

  it('lists moves with their target and folds the blocked URLs away', () => {
    const row = (
      url: string,
      verdict: Checked['verdict'],
      probe: Checked['probe'],
    ): Checked => ({ url, units: ['icons/x/y.json'], probe, verdict });
    const markdown = report([
      row('https://old.example/', 'moved', {
        status: 200,
        finalUrl: 'https://new.example/a|b',
      }),
      row('https://walled.example/', 'blocked', {
        status: 403,
        finalUrl: 'https://walled.example/',
      }),
      row('https://down.example/', 'failing', {
        finalUrl: 'https://down.example/',
      }),
    ]);
    expect(markdown).toContain(
      '| https://old.example/ | → https://new.example/a\\|b (HTTP 200) | `icons/x/y.json` |',
    );
    expect(markdown).toMatch(/<details><summary>URLs<\/summary>[\s\S]*walled/);
    expect(markdown).toContain('| https://down.example/ | no response |');
  });
});
