import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { EthereumCircleMono } from '../src/chain/Ethereum';
import { RainbowWallet } from '../src/wallet/RainbowWallet';

/**
 * Guards React Server Components compatibility: static icons must stay pure,
 * hook-free components. Hooks like useId/useContext force a 'use client'
 * boundary and were removed in v4 — this test keeps them out.
 */

const HOOK_IMPORT_RE =
  /import\s*\{[^}]*\buse(?:Id|Context|State|Effect|Memo|Ref|Callback)\b[^}]*\}\s*from\s*'react'/;

describe('React Server Components compatibility', () => {
  it('createIcon has no hook imports', () => {
    const source = readFileSync(
      join(import.meta.dirname, '../src/utils/createIcon.tsx'),
      'utf-8',
    );
    expect(source).not.toMatch(HOOK_IMPORT_RE);
  });

  it('custom icon modules have no hook imports', () => {
    for (const file of [
      '../src/chain/Avalanche.tsx',
      '../src/exchange/Bybit.tsx',
      '../src/wallet/RainbowWallet.tsx',
    ]) {
      const source = readFileSync(join(import.meta.dirname, file), 'utf-8');
      expect(source, file).not.toMatch(HOOK_IMPORT_RE);
    }
  });

  it('server rendering is deterministic with namespaced ids', () => {
    const first = renderToStaticMarkup(<EthereumCircleMono />);
    const second = renderToStaticMarkup(<EthereumCircleMono />);
    expect(first).toBe(second);
    expect(first).toContain('id="w3i-ethereumcirclemono-ethc-a"');

    const custom = renderToStaticMarkup(<RainbowWallet />);
    expect(custom).toBe(renderToStaticMarkup(<RainbowWallet />));
    expect(custom).toContain('w3i-rainbowwallet');
  });
});
