import {
  BRIDGE_SLUG_TO_NAME,
  CHAIN_ID_TO_NAME,
  CHAIN_SLUG_TO_NAME,
  DEFI_SLUG_TO_NAME,
  DEX_SLUG_TO_NAME,
  EXCHANGE_SLUG_TO_NAME,
  TICKER_TO_COIN,
  WALLET_SLUG_TO_NAME,
} from '../meta';

type Variant = 'colored' | 'mono';

function withVariant(baseName: string, variant: Variant): string {
  return variant === 'mono' ? `${baseName}Mono` : baseName;
}

export function resolveChainExportName(props: {
  name?: string;
  chainId?: number;
  variant?: Variant;
}): string | null {
  const variant = props.variant ?? 'colored';
  let baseName: string | undefined;

  if (props.chainId !== undefined) {
    baseName = Object.hasOwn(CHAIN_ID_TO_NAME, props.chainId)
      ? CHAIN_ID_TO_NAME[props.chainId as keyof typeof CHAIN_ID_TO_NAME]
      : undefined;
  } else if (props.name) {
    const slug = props.name.toLowerCase().trim();
    baseName = Object.hasOwn(CHAIN_SLUG_TO_NAME, slug)
      ? CHAIN_SLUG_TO_NAME[slug as keyof typeof CHAIN_SLUG_TO_NAME]
      : undefined;
  }

  return baseName ? withVariant(baseName, variant) : null;
}

export function resolveCoinExportName(props: {
  symbol: string;
  variant?: Variant;
}): string | null {
  const variant = props.variant ?? 'colored';
  const ticker = props.symbol.toUpperCase().trim();
  const baseName = Object.hasOwn(TICKER_TO_COIN, ticker)
    ? TICKER_TO_COIN[ticker as keyof typeof TICKER_TO_COIN]
    : undefined;
  return baseName ? withVariant(baseName, variant) : null;
}

export function resolveWalletExportName(props: {
  name: string;
  variant?: Variant;
}): string | null {
  const variant = props.variant ?? 'colored';
  const slug = props.name.toLowerCase().trim();
  const baseName = Object.hasOwn(WALLET_SLUG_TO_NAME, slug)
    ? WALLET_SLUG_TO_NAME[slug as keyof typeof WALLET_SLUG_TO_NAME]
    : undefined;
  return baseName ? withVariant(baseName, variant) : null;
}

export function resolveExchangeExportName(props: {
  name: string;
  variant?: Variant;
}): string | null {
  const variant = props.variant ?? 'colored';
  const slug = props.name.toLowerCase().trim();
  const baseName = Object.hasOwn(EXCHANGE_SLUG_TO_NAME, slug)
    ? EXCHANGE_SLUG_TO_NAME[slug as keyof typeof EXCHANGE_SLUG_TO_NAME]
    : undefined;
  return baseName ? withVariant(baseName, variant) : null;
}

export function resolveDefiExportName(props: {
  name: string;
  variant?: Variant;
}): string | null {
  const variant = props.variant ?? 'colored';
  const slug = props.name.toLowerCase().trim();
  const baseName = Object.hasOwn(DEFI_SLUG_TO_NAME, slug)
    ? DEFI_SLUG_TO_NAME[slug as keyof typeof DEFI_SLUG_TO_NAME]
    : undefined;
  return baseName ? withVariant(baseName, variant) : null;
}

export function resolveDexExportName(props: {
  name: string;
  variant?: Variant;
}): string | null {
  const variant = props.variant ?? 'colored';
  const slug = props.name.toLowerCase().trim();
  const baseName = Object.hasOwn(DEX_SLUG_TO_NAME, slug)
    ? DEX_SLUG_TO_NAME[slug as keyof typeof DEX_SLUG_TO_NAME]
    : undefined;
  return baseName ? withVariant(baseName, variant) : null;
}

export function resolveBridgeExportName(props: {
  name: string;
  variant?: Variant;
}): string | null {
  const variant = props.variant ?? 'colored';
  const slug = props.name.toLowerCase().trim();
  const baseName = Object.hasOwn(BRIDGE_SLUG_TO_NAME, slug)
    ? BRIDGE_SLUG_TO_NAME[slug as keyof typeof BRIDGE_SLUG_TO_NAME]
    : undefined;
  return baseName ? withVariant(baseName, variant) : null;
}
