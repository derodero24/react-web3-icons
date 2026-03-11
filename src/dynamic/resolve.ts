import {
  CHAIN_ID_TO_NAME,
  CHAIN_SLUG_TO_NAME,
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
    baseName = CHAIN_ID_TO_NAME[props.chainId as keyof typeof CHAIN_ID_TO_NAME];
  } else if (props.name) {
    const slug = props.name.toLowerCase().trim();
    baseName = CHAIN_SLUG_TO_NAME[slug as keyof typeof CHAIN_SLUG_TO_NAME];
  }

  return baseName ? withVariant(baseName, variant) : null;
}

export function resolveCoinExportName(props: {
  symbol: string;
  variant?: Variant;
}): string | null {
  const variant = props.variant ?? 'colored';
  const ticker = props.symbol.toUpperCase().trim();
  const baseName = TICKER_TO_COIN[ticker as keyof typeof TICKER_TO_COIN];
  return baseName ? withVariant(baseName, variant) : null;
}

export function resolveWalletExportName(props: {
  name: string;
  variant?: Variant;
}): string | null {
  const variant = props.variant ?? 'colored';
  const slug = props.name.toLowerCase().trim();
  const baseName =
    WALLET_SLUG_TO_NAME[slug as keyof typeof WALLET_SLUG_TO_NAME];
  return baseName ? withVariant(baseName, variant) : null;
}

export function resolveExchangeExportName(props: {
  name: string;
  variant?: Variant;
}): string | null {
  const variant = props.variant ?? 'colored';
  const slug = props.name.toLowerCase().trim();
  const baseName =
    EXCHANGE_SLUG_TO_NAME[slug as keyof typeof EXCHANGE_SLUG_TO_NAME];
  return baseName ? withVariant(baseName, variant) : null;
}
