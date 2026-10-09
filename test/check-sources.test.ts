// @vitest-environment node
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import {
  type Checked,
  checkSources,
  citesFile,
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

describe('citesFile', () => {
  it.each([
    ['https://brand.example.com/logo.svg', true],
    ['https://brand.example.com/kit/Press%20Kit.ZIP', true],
    ['https://brand.example.com/brand.pdf?download=1', true],
    ['https://brand.example.com/brand', false],
    ['https://brand.example.com/brand.html', false],
    ['https://brand.example.com/v1.2', false],
    ['https://raw.githubusercontent.com/org/repo/main/logo.svg', true],
    ['https://github.com/org/repo/blob/main/logo.svg', false],
    ['https://github.com/org/repo/tree/main/logos/x.png', false],
    ['https://github.com/org/repo/raw/main/logo.svg', true],
  ])('%s → %s', (url, file) => {
    expect(citesFile(url)).toBe(file);
  });
});

describe('classify', () => {
  const url = 'https://brand.example.com/logo.svg';
  it.each([
    [{ status: 200, finalUrl: url }, 'ok'],
    [{ status: 200, finalUrl: url, contentType: 'image/svg+xml' }, 'ok'],
    // A file URL answered with a web page: catch-all, soft 404 or parking.
    [{ status: 200, finalUrl: url, contentType: 'text/html' }, 'webpage'],
    [
      {
        status: 200,
        finalUrl: 'https://www.example.com/',
        contentType: 'text/html',
      },
      'webpage',
    ],
    [
      {
        status: 200,
        finalUrl: 'https://parked.example.net/',
        contentType: 'text/html',
      },
      'moved',
    ],
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

  it('expects web pages from page URLs', () => {
    const html = { status: 200, contentType: 'text/html' } as const;
    for (const page of [
      'https://brand.example.com/brand',
      'https://github.com/org/repo/blob/main/logo.svg',
    ]) {
      expect(classify(page, { ...html, finalUrl: page })).toBe('ok');
    }
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

  it('records the media type of the final response', async () => {
    const fetchImpl = fakeFetch({
      'https://brand.example.com/logo.svg': {
        status: 301,
        location: 'https://brand.example.com/',
        headers: { 'content-type': 'text/plain' },
      },
      'https://brand.example.com/': {
        status: 200,
        headers: { 'content-type': 'Text/HTML; charset=utf-8' },
      },
    });
    const result = await probe('https://brand.example.com/logo.svg', fetchImpl);
    expect(result).toEqual({
      status: 200,
      finalUrl: 'https://brand.example.com/',
      challenge: false,
      contentType: 'text/html',
    });
    expect(classify('https://brand.example.com/logo.svg', result)).toBe(
      'webpage',
    );
  });

  it('reports a malformed redirect target instead of throwing', async () => {
    const fetchImpl = fakeFetch({
      'https://a.example/': { status: 302, location: 'http://bad host/' },
    });
    expect(await probe('https://a.example/', fetchImpl)).toEqual({
      finalUrl: 'https://a.example/',
      error: 'invalid redirect target "http://bad host/"',
    });
  });

  it('ignores a body that fails to cancel', async () => {
    const body = new ReadableStream({
      pull: controller => controller.error(new Error('reset')),
    });
    const response = new Response(body, { status: 200 });
    await response.body
      ?.getReader()
      .read()
      .catch(() => undefined);
    const fetchImpl: typeof fetch = () => Promise.resolve(response);
    expect(await probe('https://reset.example/', fetchImpl)).toMatchObject({
      status: 200,
    });
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
      '2 URLs cited in `icons/**/*.json` `source`: 1 OK, 1 gone, 0 moved to another site, 0 serving a web page, 0 failing, 0 blocked by the site.',
    );
    expect(markdown).toContain(
      '| https://gone.example/a.svg | HTTP 404 | `icons/chain/a.json` |',
    );
    expect(markdown).not.toContain('ok.example');
  });

  it('reports a URL whose check throws as failing and goes on', async () => {
    const fetchImpl: typeof fetch = input =>
      String(input) === 'https://gone.example/a.svg'
        ? // Not a Response: reading its headers throws.
          Promise.resolve({ status: 200 } as Response)
        : fakeFetch({ 'https://ok.example/a.svg': { status: 200 } })(input, {
            redirect: 'manual',
          });
    const checked = await checkSources(root, fetchImpl);
    expect(checked.map(c => [c.url, c.verdict])).toEqual([
      ['https://ok.example/a.svg', 'ok'],
      ['https://gone.example/a.svg', 'failing'],
    ]);
    expect(checked[1]?.probe.error).toMatch(/reading 'get'/);
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
      row('https://soft.example/logo.svg', 'webpage', {
        status: 200,
        finalUrl: 'https://soft.example/',
        contentType: 'text/html',
      }),
    ]);
    expect(markdown).toContain(
      '| https://old.example/ | → https://new.example/a\\|b (HTTP 200) | `icons/x/y.json` |',
    );
    expect(markdown).toMatch(/<details><summary>URLs<\/summary>[\s\S]*walled/);
    expect(markdown).toContain('| https://down.example/ | no response |');
    expect(markdown).toContain(
      '| https://soft.example/logo.svg | → https://soft.example/ (HTTP 200, text/html) |',
    );
    expect(markdown).toContain('1 serving a web page');
  });
});
