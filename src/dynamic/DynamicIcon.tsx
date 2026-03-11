'use client';

import {
  type ComponentType,
  lazy,
  type ReactNode,
  Suspense,
  useMemo,
} from 'react';
import type { IconProps } from '../utils';

type LazyComponent = ComponentType<IconProps>;
type LazyCache = Map<string, LazyComponent>;

const warnedNames: Set<string> = /* @__PURE__ */ new Set<string>();

/**
 * Creates a dynamic icon component that lazily loads icons from a category module.
 *
 * @param resolveExportName - Maps user-facing props to the icon's export name (e.g. 'EthereumMono'), or null if not found.
 * @param importCategory - Lazy import for the category module (e.g. `() => import('../chain')`).
 * @param stripKeys - Props keys to remove before forwarding to the underlying icon component.
 */
export function createDynamicIcon<P>(
  resolveExportName: (props: P) => string | null,
  importCategory: () => Promise<Record<string, unknown>>,
  stripKeys: readonly string[],
) {
  const cache: LazyCache = new Map();

  function DynamicIconInner(
    props: P & Omit<IconProps, 'ref'> & { fallback?: ReactNode },
  ) {
    const { fallback = null, ...rest } = props;
    const exportName = resolveExportName(props as P);

    const LazyIcon = useMemo(() => {
      if (!exportName) {
        return null;
      }
      const cached = cache.get(exportName);
      if (cached) {
        return cached;
      }
      const component = lazy(() =>
        importCategory().then(mod => {
          const comp = mod[exportName] as LazyComponent | undefined;
          if (!comp) {
            if (
              // biome-ignore lint/complexity/useLiteralKeys: TS noPropertyAccessFromIndexSignature
              process.env['NODE_ENV'] !== 'production' &&
              !warnedNames.has(exportName)
            ) {
              warnedNames.add(exportName);
              // biome-ignore lint/suspicious/noConsole: intentional dev-mode warning
              console.warn(
                `[react-web3-icons] Icon "${exportName}" not found in module.`,
              );
            }
            return { default: (() => null) as unknown as LazyComponent };
          }
          return { default: comp };
        }),
      );
      cache.set(exportName, component);
      return component;
    }, [exportName]);

    if (!LazyIcon) {
      return <>{fallback}</>;
    }

    // Strip category-specific props before forwarding
    const iconProps: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(rest)) {
      if (!stripKeys.includes(key)) {
        iconProps[key] = value;
      }
    }

    return (
      <Suspense fallback={fallback}>
        <LazyIcon {...(iconProps as IconProps)} />
      </Suspense>
    );
  }

  return DynamicIconInner;
}
