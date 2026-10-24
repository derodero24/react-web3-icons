import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { CatalogIcon } from '../../lib/catalog';

/** URL of an export's SVG file (public/svg mirrors the package's dist/svg). */
export function svgUrl(category: string, name: string): string {
  return `/svg/${category}/${name}.svg`;
}

/**
 * One gallery card. The artwork loads as SVG files rather than inline
 * markup, so a page of 300+ cards stays small and images load lazily:
 * the default variant as an <img>, the mono variant as a CSS mask filled
 * with the text color. GalleryControls shows one of the two with a style
 * rule, so switching styles needs no client-side icon code.
 */
export default function IconCard({ icon }: { icon: CatalogIcon }) {
  const [primary] = icon.variants;
  const mono =
    icon.variants.find(variant => variant.suffix === 'Mono') ??
    icon.variants.find(variant => variant.mono);
  const monoStyle: CSSProperties | undefined = mono && {
    maskImage: `url(${svgUrl(icon.category, mono.name)})`,
  };
  return (
    <li data-id={icon.id} data-mono={mono ? '' : undefined}>
      <Link
        href={icon.href}
        title={icon.name}
        className="group flex h-full flex-col items-center gap-3 rounded-xl border border-transparent bg-surface px-2 pb-3 pt-5 transition-colors hover:border-border hover:bg-surface-hover focus-visible:border-accent focus-visible:outline-none"
      >
        <span className="flex h-16 items-center justify-center transition-transform group-hover:scale-110">
          {/* biome-ignore lint/performance/noImgElement: static export; the SVGs need no optimization */}
          <img
            src={svgUrl(icon.category, primary.name)}
            alt=""
            width={32}
            height={32}
            loading="lazy"
            decoding="async"
            className="icon-color size-(--icon-size)"
          />
          {monoStyle && (
            <span
              aria-hidden="true"
              style={monoStyle}
              className="icon-mono hidden size-(--icon-size) bg-fg mask-contain mask-center mask-no-repeat"
            />
          )}
        </span>
        <span className="w-full truncate text-center text-xs text-fg-muted group-hover:text-fg">
          {icon.name}
        </span>
      </Link>
    </li>
  );
}
