import { CHAIN_ID_TO_NAME, CHAIN_SLUG_TO_NAME, TICKER_TO_COIN } from '../meta';

type Variant = 'colored' | 'mono';

function withVariant(baseName: string, variant: Variant): string {
  return variant === 'mono' ? `${baseName}Mono` : baseName;
}

// Wallet slug → export base name
const WALLET_SLUG_TO_NAME: Record<string, string> = {
  argent: 'Argent',
  backpackwallet: 'BackpackWallet',
  bitgetwallet: 'BitgetWallet',
  coinbasewallet: 'CoinbaseWallet',
  daedaluswallet: 'DaedalusWallet',
  enkrypt: 'Enkrypt',
  exodus: 'Exodus',
  imtoken: 'ImToken',
  keplr: 'Keplr',
  ledger: 'Ledger',
  metamask: 'MetaMask',
  namiwallet: 'NamiWallet',
  okxwallet: 'OKXWallet',
  phantomwallet: 'PhantomWallet',
  polkadotjs: 'PolkadotJs',
  rabby: 'Rabby',
  rainbowwallet: 'RainbowWallet',
  safe: 'Safe',
  subwallet: 'SubWallet',
  tangem: 'Tangem',
  trezor: 'Trezor',
  trustwallet: 'TrustWallet',
  walletconnect: 'WalletConnect',
  yoroiwallet: 'YoroiWallet',
  zerion: 'Zerion',
};

// Exchange slug → export base name
const EXCHANGE_SLUG_TO_NAME: Record<string, string> = {
  binance: 'Binance',
  bitfinex: 'Bitfinex',
  bitget: 'Bitget',
  bithumb: 'Bithumb',
  bitstamp: 'Bitstamp',
  bybit: 'Bybit',
  coinbase: 'Coinbase',
  cryptocom: 'CryptoCom',
  deribit: 'Deribit',
  gateio: 'Gateio',
  gemini: 'Gemini',
  htx: 'Htx',
  kraken: 'Kraken',
  kucoin: 'KuCoin',
  mexc: 'Mexc',
  okx: 'Okx',
  phemex: 'Phemex',
  upbit: 'Upbit',
};

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
  const baseName = WALLET_SLUG_TO_NAME[slug];
  return baseName ? withVariant(baseName, variant) : null;
}

export function resolveExchangeExportName(props: {
  name: string;
  variant?: Variant;
}): string | null {
  const variant = props.variant ?? 'colored';
  const slug = props.name.toLowerCase().trim();
  const baseName = EXCHANGE_SLUG_TO_NAME[slug];
  return baseName ? withVariant(baseName, variant) : null;
}
