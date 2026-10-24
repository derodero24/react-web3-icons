'use client';

import type { ReactNode } from 'react';
import { useCopyAction } from '../../hooks/useCopyAction';
import CopyStatusMessage from '../elements/CopyStatusMessage';

/** Keep a blob URL alive long enough for the browser to start the download. */
const REVOKE_DELAY_MS = 10_000;
const PNG_SIZE = 512;

function download(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), REVOKE_DELAY_MS);
}

/** Rasterizes standalone SVG markup to a square PNG. */
async function toPng(svg: string, size: number): Promise<Blob> {
  const sized = svg.replace(/^<svg\b/, `<svg width="${size}" height="${size}"`);
  const image = new Image();
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(sized)}`;
  await image.decode();
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('2D canvas unavailable');
  context.drawImage(image, 0, 0, size, size);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => (blob ? resolve(blob) : reject(new Error('PNG export failed'))),
      'image/png',
    );
  });
}

const ACTION =
  'rounded-md px-2 py-1 text-xs text-fg-muted transition-colors hover:bg-fg/10 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

export default function VariantCard({
  name,
  label,
  svg,
  children,
}: {
  name: string;
  label: string;
  /** Standalone SVG markup of the variant. */
  svg: string;
  /** The variant, rendered on the server. */
  children: ReactNode;
}) {
  const jsx = useCopyAction();
  const markup = useCopyAction();

  return (
    <li className="flex flex-col overflow-hidden rounded-xl border border-border">
      <div className="preview-surface flex aspect-[4/3] items-center justify-center">
        {children}
      </div>
      <div className="space-y-2 border-t border-border p-3">
        <div className="flex items-baseline justify-between gap-2">
          <code className="truncate font-mono text-sm">{name}</code>
          <span className="shrink-0 text-xs text-fg-muted">{label}</span>
        </div>
        <div className="-mx-2 flex flex-wrap">
          <button
            type="button"
            className={ACTION}
            onClick={() => void jsx.copy(`<${name} />`)}
          >
            {jsx.status === 'copied' ? 'Copied' : 'Copy JSX'}
          </button>
          <button
            type="button"
            className={ACTION}
            onClick={() => void markup.copy(svg)}
          >
            {markup.status === 'copied' ? 'Copied' : 'Copy SVG'}
          </button>
          <button
            type="button"
            className={ACTION}
            onClick={() =>
              download(
                new Blob([`${svg}\n`], { type: 'image/svg+xml' }),
                `${name}.svg`,
              )
            }
          >
            SVG ↓
          </button>
          <button
            type="button"
            className={ACTION}
            onClick={() =>
              void toPng(svg, PNG_SIZE).then(blob =>
                download(blob, `${name}.png`),
              )
            }
          >
            PNG ↓
          </button>
        </div>
        <CopyStatusMessage status={jsx.status} />
        <CopyStatusMessage
          status={markup.status}
          failedMessage="Copy failed. Download the SVG instead."
        />
      </div>
    </li>
  );
}
