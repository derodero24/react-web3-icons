// Threshold-reference QA: binarize the COLORED icon by luminance (sweeping
// thresholds, keeping the best), compare against the mono, emit diff images.
import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
const S = process.argv[2];
const targets = JSON.parse(process.argv[3]); // [[cat,slug,suffix?],...]
const pairs = targets.map(([cat, slug]) => {
  const meta = JSON.parse(readFileSync(`icons/${cat}/${slug}.json`, 'utf8'));
  return {
    id: `${cat}/${meta.name}`,
    colored: readFileSync(`icons/${cat}/${meta.variants[''].file}`, 'utf8'),
    mono: readFileSync(`icons/${cat}/${meta.variants['Mono'].file}`, 'utf8'),
  };
});
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium/chrome-linux/chrome' }).catch(() => chromium.launch());
const page = await (await browser.newContext()).newPage();
const out = await page.evaluate(async (pairs) => {
  const N = 192;
  async function raster(svg, color) {
    const s = color ? svg.replace('<svg', `<svg color="${color}"`) : svg;
    const url = URL.createObjectURL(new Blob([s], { type: 'image/svg+xml' }));
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
    const c = new OffscreenCanvas(N, N); const ctx = c.getContext('2d');
    const sc = Math.min(N / img.width, N / img.height);
    ctx.drawImage(img, (N - img.width * sc) / 2, (N - img.height * sc) / 2, img.width * sc, img.height * sc);
    URL.revokeObjectURL(url);
    return ctx.getImageData(0, 0, N, N).data;
  }
  const results = [];
  for (const p of pairs) {
    const cd = await raster(p.colored);
    const md = await raster(p.mono, '#000');
    // mono ink mask: dark & opaque
    const monoInk = new Uint8Array(N * N);
    for (let i = 0; i < N * N; i++) {
      const a = md[i * 4 + 3];
      monoInk[i] = a > 128 && (md[i * 4] * 0.2126 + md[i * 4 + 1] * 0.7152 + md[i * 4 + 2] * 0.0722) < 128 ? 1 : 0;
    }
    // luminance of colored over white
    const lum = new Float32Array(N * N);
    for (let i = 0; i < N * N; i++) {
      const a = cd[i * 4 + 3] / 255;
      const L = cd[i * 4] * 0.2126 + cd[i * 4 + 1] * 0.7152 + cd[i * 4 + 2] * 0.0722;
      lum[i] = L * a + 255 * (1 - a);
    }
    // sweep thresholds for best agreement
    let bestT = 128, bestMiss = Infinity;
    for (let T = 40; T <= 240; T += 5) {
      let miss = 0;
      for (let i = 0; i < N * N; i++) miss += (lum[i] < T ? 1 : 0) !== monoInk[i] ? 1 : 0;
      if (miss < bestMiss) { bestMiss = miss; bestT = T; }
    }
    // build triptych png: thresholded | mono | diff overlay
    const c = new OffscreenCanvas(N * 3 + 16, N); const ctx = c.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
    const imgData = ctx.createImageData(N, N);
    for (let i = 0; i < N * N; i++) {
      const ink = lum[i] < bestT;
      imgData.data[i * 4] = imgData.data[i * 4 + 1] = imgData.data[i * 4 + 2] = ink ? 20 : 255;
      imgData.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
    const m2 = ctx.createImageData(N, N);
    for (let i = 0; i < N * N; i++) {
      m2.data[i * 4] = m2.data[i * 4 + 1] = m2.data[i * 4 + 2] = monoInk[i] ? 20 : 255;
      m2.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(m2, N + 8, 0);
    const df = ctx.createImageData(N, N);
    for (let i = 0; i < N * N; i++) {
      const ref = lum[i] < bestT ? 1 : 0;
      const diff = ref !== monoInk[i];
      if (diff) { df.data[i * 4] = 230; df.data[i * 4 + 1] = 40; df.data[i * 4 + 2] = 40; }
      else { const v = monoInk[i] ? 200 : 255; df.data[i * 4] = df.data[i * 4 + 1] = df.data[i * 4 + 2] = v; }
      df.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(df, 2 * (N + 8), 0);
    const blob = await c.convertToBlob({ type: 'image/png' });
    const b64 = await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result.split(',')[1]); fr.readAsDataURL(blob); });
    results.push({ id: p.id, bestT, missPct: +(100 * bestMiss / (N * N)).toFixed(2), png: b64 });
  }
  return results;
}, pairs);
for (const r of out) {
  writeFileSync(`${S}/thresh-${r.id.replace('/', '_')}.png`, Buffer.from(r.png, 'base64'));
  console.log(`${r.id.padEnd(28)} bestT=${r.bestT} mismatch=${r.missPct}%`);
}
await browser.close();
