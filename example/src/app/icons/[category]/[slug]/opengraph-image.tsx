import { ImageResponse } from 'next/og';
import { CATALOG, getIcon } from '../../../../lib/catalog';
import { CATEGORY_INFO } from '../../../../lib/categories';

export const alt = 'Icon preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamicParams = false;

export function generateStaticParams(): { category: string; slug: string }[] {
  return CATALOG.map(icon => ({ category: icon.category, slug: icon.slug }));
}

function dataUri(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/** Build-time social card of an icon page: its default and mono artwork. */
export default async function Image({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const icon = getIcon(category, slug);
  if (!icon) throw new Error(`unknown icon ${category}/${slug}`);
  const [primary] = icon.variants;
  const mono = icon.variants.find(variant => variant.suffix === 'Mono');
  const tile = {
    width: '280px',
    height: '280px',
    borderRadius: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as const;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px',
        background: '#ffffff',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
        <div style={{ ...tile, background: '#f3f3f5' }}>
          {/* biome-ignore lint/performance/noImgElement: ImageResponse renders plain <img> */}
          <img src={dataUri(primary.svg)} width={176} height={176} alt="" />
        </div>
        {mono && (
          <div style={{ ...tile, background: '#111111' }}>
            {/* biome-ignore lint/performance/noImgElement: ImageResponse renders plain <img> */}
            <img
              src={dataUri(mono.svg.replaceAll('currentColor', '#ffffff'))}
              width={176}
              height={176}
              alt=""
            />
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div
          style={{
            fontSize: '72px',
            fontWeight: 700,
            color: '#111111',
            letterSpacing: '-2px',
          }}
        >
          {icon.name}
        </div>
        <div style={{ fontSize: '30px', color: '#66666c' }}>
          {`${CATEGORY_INFO[icon.category].noun} icon · ${icon.variants.length} variants · React Web3 Icons`}
        </div>
      </div>
    </div>,
    size,
  );
}
