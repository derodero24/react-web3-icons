#!/usr/bin/env node
/**
 * Mono-quality audit: rasterizes every colored/mono variant pair from the
 * icons/ source tree and reports pairs whose mono departs from the colored
 * silhouette (see "Mono design rules" in CONTRIBUTING.md).
 *
 *   node scripts/audit-mono.mjs            # table of outliers
 *   node scripts/audit-mono.mjs --all      # full metric table
 *
 * Metrics per pair (128x128 raster, alpha>24 = ink):
 *   iou   — silhouette overlap between colored and mono (1 = identical)
 *   ink   — mono ink area / colored ink area (solid-blob or vanishing monos)
 *   edge  — mono edge count / colored color-boundary count (detail retention)
 *
 * Heuristic flags (tune with care, they mirror the initial audit):
 *   iou < 0.72        → silhouette/impression mismatch
 *   ink < 0.45        → mono much lighter than colored (container dropped?)
 *   ink > 1.45 && edge < 0.55 → mono went solid, detail lost
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ICONS = join(ROOT, 'icons');
const showAll = process.argv.includes('--all');

const pairs = [];
for (const cat of readdirSync(ICONS).sort()) {
  for (const f of readdirSync(join(ICONS, cat)).sort()) {
    if (!f.endsWith('.json')) continue;
    const meta = JSON.parse(readFileSync(join(ICONS, cat, f), 'utf8'));
    if (meta.kind !== 'icon') continue;
    for (const [suffix, spec] of Object.entries(meta.variants ?? {})) {
      if (suffix.endsWith('Mono')) continue;
      const monoKey = suffix ? `${suffix}Mono` : 'Mono';
      const mono = meta.variants[monoKey];
      if (!mono) continue;
      pairs.push({
        id: `${cat}/${meta.name}${suffix}`,
        colored: readFileSync(join(ICONS, cat, spec.file), 'utf8'),
        mono: readFileSync(join(ICONS, cat, mono.file), 'utf8'),
      });
    }
  }
}

const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();
const results = await page.evaluate(async (pairs) => {
  const N = 128;
  async function raster(svgText, forceColor) {
    let s = svgText;
    if (forceColor) s = s.replace('<svg', '<svg color="#000"');
    const url = URL.createObjectURL(new Blob([s], { type: 'image/svg+xml' }));
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error('load')); img.src = url; });
    const c = new OffscreenCanvas(N, N);
    const ctx = c.getContext('2d');
    const iw = img.width || N, ih = img.height || N;
    const sc = Math.min(N / iw, N / ih);
    ctx.drawImage(img, (N - iw * sc) / 2, (N - ih * sc) / 2, iw * sc, ih * sc);
    URL.revokeObjectURL(url);
    return ctx.getImageData(0, 0, N, N).data;
  }
  const mask = d => { const m = new Uint8Array(N * N); for (let i = 0; i < N * N; i++) m[i] = d[i * 4 + 3] > 24 ? 1 : 0; return m; };
  // outer footprint: fill enclosed holes so knockout monos compare fairly
  const filled = (m) => {
    const out = m.slice();
    const bg = new Uint8Array(N * N);
    const stack = [];
    for (let x = 0; x < N; x++) { stack.push(x, (N - 1) * N + x); }
    for (let y = 0; y < N; y++) { stack.push(y * N, y * N + N - 1); }
    while (stack.length) {
      const i = stack.pop();
      if (bg[i] || m[i]) continue;
      bg[i] = 1;
      const x = i % N, y = (i / N) | 0;
      if (x > 0) stack.push(i - 1);
      if (x < N - 1) stack.push(i + 1);
      if (y > 0) stack.push(i - N);
      if (y < N - 1) stack.push(i + N);
    }
    for (let i = 0; i < N * N; i++) if (!bg[i]) out[i] = 1;
    return out;
  };
  const ink = m => m.reduce((a, b) => a + b, 0);
  const iou = (a, b) => { let i = 0, u = 0; for (let k = 0; k < a.length; k++) { if (a[k] & b[k]) i++; if (a[k] | b[k]) u++; } return u ? i / u : 1; };
  const edges = m => { let e = 0; for (let y = 0; y < N; y++) for (let x = 0; x < N - 1; x++) e += m[y * N + x] !== m[y * N + x + 1]; for (let x = 0; x < N; x++) for (let y = 0; y < N - 1; y++) e += m[y * N + x] !== m[(y + 1) * N + x]; return e; };
  const colorEdges = (d) => {
    let e = 0;
    const q = i => d[i * 4 + 3] < 24 ? -1 : ((d[i * 4] >> 5) << 6) | ((d[i * 4 + 1] >> 5) << 3) | (d[i * 4 + 2] >> 5);
    for (let y = 0; y < N; y++) for (let x = 0; x < N - 1; x++) e += q(y * N + x) !== q(y * N + x + 1);
    for (let x = 0; x < N; x++) for (let y = 0; y < N - 1; y++) e += q(y * N + x) !== q((y + 1) * N + x);
    return e;
  };
  const out = [];
  for (const p of pairs) {
    try {
      const cd = await raster(p.colored, false);
      const md = await raster(p.mono, true);
      const cm = mask(cd), mm = mask(md);
      const cf = filled(cm), mf = filled(mm);
      // Threshold reference: binarize the colored art by luminance (best
      // threshold sweep) and measure disagreement with the mono ink. When
      // subject and background luminance are too close, the reference
      // degenerates to a near-solid or near-empty field -> flag instead.
      const monoInk = new Uint8Array(N * N);
      for (let i = 0; i < N * N; i++) {
        const a = md[i * 4 + 3];
        monoInk[i] = a > 128 && (md[i * 4] * 0.2126 + md[i * 4 + 1] * 0.7152 + md[i * 4 + 2] * 0.0722) < 128 ? 1 : 0;
      }
      const lum = new Float32Array(N * N);
      for (let i = 0; i < N * N; i++) {
        const a = cd[i * 4 + 3] / 255;
        const L = cd[i * 4] * 0.2126 + cd[i * 4 + 1] * 0.7152 + cd[i * 4 + 2] * 0.0722;
        lum[i] = L * a + 255 * (1 - a);
      }
      let bestT = 128, bestMiss = Infinity;
      for (let T = 40; T <= 240; T += 5) {
        let miss = 0;
        for (let i = 0; i < N * N; i++) miss += (lum[i] < T ? 1 : 0) !== monoInk[i] ? 1 : 0;
        if (miss < bestMiss) { bestMiss = miss; bestT = T; }
      }
      let refInk = 0;
      const bbox = ink(cf);
      for (let i = 0; i < N * N; i++) refInk += lum[i] < bestT ? 1 : 0;
      const refFrac = refInk / Math.max(bbox, 1);
      const refDegenerate = refFrac > 0.9 || refFrac < 0.08;
      out.push({ id: p.id, iou: iou(cf, mf), ink: ink(mf) / Math.max(ink(cf), 1), edge: edges(mm) / Math.max(colorEdges(cd), 1), refT: bestT, refMiss: +(100 * bestMiss / (N * N)).toFixed(2), refDegenerate });
    } catch { out.push({ id: p.id, error: true }); }
  }
  return out;
}, pairs);
await browser.close();

// Owner-approved designs that intentionally trip the generic thresholds
// (knockout polarity inversions, degenerate threshold references, wavy
// footprints). Reviewed on component-rendered proof sheets — see #746/#748.
const APPROVED = new Set([
  'coin/Cake',      // knockout polarity; threshold reference degenerate
  'dex/Osmosis',    // wavy liquid surface narrows the flood-filled footprint
]);
const flag = r => !APPROVED.has(r.id) && (r.error || r.iou < 0.85 || r.ink < 0.7 || r.edge < 0.3 || (!r.refDegenerate && r.refMiss > 8));
const rows = results.filter(r => showAll || flag(r)).sort((a, b) => (a.iou ?? 0) - (b.iou ?? 0));
console.log(`pairs: ${results.length}, flagged: ${results.filter(flag).length}`);
for (const r of rows) {
  console.log(r.error
    ? `${r.id.padEnd(48)} RENDER ERROR`
    : `${r.id.padEnd(48)} iou=${r.iou.toFixed(2)} ink=${r.ink.toFixed(2)} edge=${r.edge.toFixed(2)} refMiss=${r.refDegenerate ? 'degenerate' : r.refMiss + '%'}${flag(r) ? '  ⚠' : ''}`);
}
process.exitCode = 0;
