import {
  BRIDGE_SLUG_TO_NAME,
  CHAIN_ID_TO_NAME,
  CHAIN_SLUG_TO_NAME,
  DEFI_SLUG_TO_NAME,
  DEX_SLUG_TO_NAME,
  EXCHANGE_SLUG_TO_NAME,
  ORACLE_SLUG_TO_NAME,
  TICKER_TO_COIN,
  WALLET_SLUG_TO_NAME,
} from '../meta';
import { normalizeKey } from './normalize';

/**
 * Resolves an identifier to the export name of its icon (the lookup target,
 * e.g. `'Ethereum'`), or `undefined`. Identifiers from untyped data that
 * are not strings resolve to nothing.
 */
export type Lookup = (key: unknown) => string | undefined;

/**
 * A lookup through one `react-web3-icons/meta` map. Both its keys and the
 * identifier go through {@link normalizeKey}; the generator guarantees that
 * no two keys of a map normalize alike. The normalized table is built on
 * first use, so a component that never renders costs nothing at startup.
 */
export function lookupBy(map: Readonly<Record<string, string>>): Lookup {
  let table: ReadonlyMap<string, string> | undefined;
  return key => {
    if (typeof key !== 'string') {
      return;
    }
    table ??= new Map(
      Object.entries(map).map(([k, name]) => [normalizeKey(k), name]),
    );
    return table.get(normalizeKey(key));
  };
}

export const resolveChainSlug: Lookup =
  /* @__PURE__ */ lookupBy(CHAIN_SLUG_TO_NAME);
export const resolveTicker: Lookup = /* @__PURE__ */ lookupBy(TICKER_TO_COIN);
export const resolveWalletSlug: Lookup =
  /* @__PURE__ */ lookupBy(WALLET_SLUG_TO_NAME);
export const resolveExchangeSlug: Lookup = /* @__PURE__ */ lookupBy(
  EXCHANGE_SLUG_TO_NAME,
);
export const resolveDefiSlug: Lookup =
  /* @__PURE__ */ lookupBy(DEFI_SLUG_TO_NAME);
export const resolveDexSlug: Lookup =
  /* @__PURE__ */ lookupBy(DEX_SLUG_TO_NAME);
export const resolveBridgeSlug: Lookup =
  /* @__PURE__ */ lookupBy(BRIDGE_SLUG_TO_NAME);
export const resolveOracleSlug: Lookup =
  /* @__PURE__ */ lookupBy(ORACLE_SLUG_TO_NAME);

/** An EVM chain ID (a number, or its decimal string from untyped data). */
export function resolveChainId(chainId: unknown): string | undefined {
  return (typeof chainId === 'number' || typeof chainId === 'string') &&
    Object.hasOwn(CHAIN_ID_TO_NAME, chainId)
    ? CHAIN_ID_TO_NAME[chainId as keyof typeof CHAIN_ID_TO_NAME]
    : undefined;
}

/**
 * `<ChainIcon>`: by `chainId`, else by `name`. An unknown `chainId` falls
 * back to `name`, so a chain this package has no ID for still renders when
 * its slug is known.
 */
export function resolveChain(props: {
  readonly chainId?: unknown;
  readonly name?: unknown;
}): string | undefined {
  return resolveChainId(props.chainId) ?? resolveChainSlug(props.name);
}
