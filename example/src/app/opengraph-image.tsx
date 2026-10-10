import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'React Web3 Icons';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The image is rendered once at build time (`output: 'export'`), so it reads
// the library's own icon sources (`icons/<category>/<slug>.svg`, the default
// variant of each unit) and always shows the shipped artwork.
const ICONS_DIR = join(process.cwd(), '..', 'icons');

const icons: readonly (readonly [label: string, source: string])[] = [
  ['Ethereum', 'chain/ethereum'],
  ['Bitcoin', 'chain/bitcoin'],
  ['Solana', 'chain/solana'],
  ['BNB', 'chain/bnb-smart-chain'],
  ['Polygon', 'chain/polygon'],
  ['Avalanche', 'chain/avalanche'],
  ['Arbitrum', 'chain/arbitrum'],
  ['Optimism', 'chain/optimism'],
  ['MetaMask', 'wallet/meta-mask'],
  ['Uniswap', 'dex/uniswap'],
  ['Aave', 'defi/aave'],
  ['Lido', 'defi/lido'],
];

/** An icon source as an SVG data URI, which ImageResponse renders through resvg. */
function iconDataUri(source: string): string {
  const svg = readFileSync(join(ICONS_DIR, `${source}.svg`));
  return `data:image/svg+xml;base64,${svg.toString('base64')}`;
}

export default function Image() {
  const gridCols = 6;
  const iconSize = 72;
  const gap = 24;
  const padding = 72;

  const totalWidth = gridCols * iconSize + (gridCols - 1) * gap;
  const startX = (size.width - totalWidth) / 2;

  return new ImageResponse(
    <div
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        background: '#080808',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow gradient */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.25) 0%, transparent 70%)',
        }}
      />

      {/* Title */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: `${padding}px`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: '52px',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '-1px',
            lineHeight: '1',
          }}
        >
          React Web3 Icons
        </div>
        <div
          style={{
            fontSize: '22px',
            color: 'rgba(255,255,255,0.55)',
            marginTop: '14px',
            letterSpacing: '0px',
          }}
        >
          Open-source icon library for Web3 — chains, coins, wallets & more
        </div>
      </div>

      {/* Icon grid */}
      <div
        style={{
          position: 'absolute',
          bottom: `${padding}px`,
          left: `${startX}px`,
          display: 'flex',
          flexWrap: 'wrap',
          gap: `${gap}px`,
          width: `${totalWidth}px`,
        }}
      >
        {icons.map(([label, source]) => (
          <div
            key={label}
            style={{
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* biome-ignore lint/performance/noImgElement: ImageResponse renders plain <img>, not next/image */}
            <img src={iconDataUri(source)} width={36} height={36} alt={label} />
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
