/**
 * EVM chain ID → chain icon base name.
 *
 * Use with `react-web3-icons/chain` for wagmi/viem integration:
 * ```ts
 * import { CHAIN_ID_TO_NAME, type ChainId } from 'react-web3-icons/meta';
 * import * as chains from 'react-web3-icons/chain';
 *
 * // Runtime check narrows to ChainId
 * const Icon = chain.id in CHAIN_ID_TO_NAME
 *   ? chains[CHAIN_ID_TO_NAME[chain.id as ChainId]]
 *   : null;
 * ```
 */
export const CHAIN_ID_TO_NAME = {
  1: 'Ethereum',
  10: 'Optimism',
  56: 'BinanceSmartChain',
  137: 'Polygon',
  250: 'Fantom',
  324: 'ZkSync',
  592: 'Astar',
  1329: 'Sei',
  5000: 'Mantle',
  8453: 'Base',
  13371: 'ImmutableX',
  42161: 'Arbitrum',
  43114: 'Avalanche',
  59144: 'Linea',
  80094: 'Berachain',
  534352: 'Scroll',
} as const satisfies Record<number, string>;

/** EVM chain ID recognized by this package. */
export type ChainId = keyof typeof CHAIN_ID_TO_NAME;

/**
 * Lowercased slug → chain icon base name.
 *
 * Useful for URL-based or human-readable lookups:
 * ```ts
 * import { CHAIN_SLUG_TO_NAME } from 'react-web3-icons/meta';
 *
 * const name = CHAIN_SLUG_TO_NAME['arbitrum']; // 'Arbitrum'
 * ```
 */
export const CHAIN_SLUG_TO_NAME = {
  algorand: 'Algorand',
  aptos: 'Aptos',
  arbitrum: 'Arbitrum',
  astar: 'Astar',
  avalanche: 'Avalanche',
  base: 'Base',
  berachain: 'Berachain',
  bsc: 'BinanceSmartChain',
  bitcoin: 'Bitcoin',
  cardano: 'Cardano',
  ethereum: 'Ethereum',
  fantom: 'Fantom',
  immutablex: 'ImmutableX',
  linea: 'Linea',
  mantle: 'Mantle',
  near: 'Near',
  optimism: 'Optimism',
  polkadot: 'Polkadot',
  polygon: 'Polygon',
  scroll: 'Scroll',
  sei: 'Sei',
  solana: 'Solana',
  starknet: 'StarkNet',
  stellar: 'Stellar',
  sui: 'Sui',
  ton: 'Ton',
  tron: 'Tron',
  zksync: 'ZkSync',
} as const satisfies Record<string, string>;

/** Lowercased chain slug recognized by this package. */
export type ChainSlug = keyof typeof CHAIN_SLUG_TO_NAME;

/**
 * Uppercase ticker symbol → coin icon base name.
 *
 * Maps to exports from `react-web3-icons/coin`:
 * ```ts
 * import { TICKER_TO_COIN, type Ticker } from 'react-web3-icons/meta';
 * import * as coins from 'react-web3-icons/coin';
 *
 * const symbol = token.symbol.toUpperCase();
 * const Icon = symbol in TICKER_TO_COIN
 *   ? coins[TICKER_TO_COIN[symbol as Ticker]]
 *   : null;
 * ```
 */
export const TICKER_TO_COIN = {
  ADA: 'Ada',
  APT: 'Apt',
  ARB: 'Arb',
  ATOM: 'Atom',
  AVAX: 'Avax',
  BNB: 'Bnb',
  BTC: 'Btc',
  BUSD: 'Busd',
  CAKE: 'Cake',
  CRV: 'Crv',
  DAI: 'Dai',
  DOGE: 'Doge',
  EIGEN: 'Eigen',
  ETH: 'Eth',
  FIL: 'Fil',
  FTM: 'Ftm',
  JUP: 'Jup',
  LDO: 'Ldo',
  LINK: 'Link',
  LOOKS: 'Looks',
  LTC: 'Ltc',
  MKR: 'Mkr',
  MNT: 'Mnt',
  OP: 'Op',
  POL: 'Pol',
  PYTH: 'Pyth',
  SHIB: 'Shib',
  SOL: 'Sol',
  TRX: 'Trx',
  UNI: 'Uni',
  USDC: 'Usdc',
  USDT: 'Usdt',
  WLD: 'Wld',
  XLM: 'Xlm',
  XRP: 'Xrp',
} as const satisfies Record<string, string>;

/** Uppercase ticker symbol recognized by this package. */
export type Ticker = keyof typeof TICKER_TO_COIN;

/**
 * Lowercased slug → wallet icon base name.
 *
 * Maps to exports from `react-web3-icons/wallet`:
 * ```ts
 * import { WALLET_SLUG_TO_NAME, type WalletSlug } from 'react-web3-icons/meta';
 * import * as wallets from 'react-web3-icons/wallet';
 *
 * const slug = walletId.toLowerCase();
 * const Icon = slug in WALLET_SLUG_TO_NAME
 *   ? wallets[WALLET_SLUG_TO_NAME[slug as WalletSlug]]
 *   : null;
 * ```
 */
export const WALLET_SLUG_TO_NAME = {
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
} as const satisfies Record<string, string>;

/** Lowercased wallet slug recognized by this package. */
export type WalletSlug = keyof typeof WALLET_SLUG_TO_NAME;

/**
 * Lowercased slug → exchange icon base name.
 *
 * Maps to exports from `react-web3-icons/exchange`:
 * ```ts
 * import { EXCHANGE_SLUG_TO_NAME, type ExchangeSlug } from 'react-web3-icons/meta';
 * import * as exchanges from 'react-web3-icons/exchange';
 *
 * const slug = exchangeId.toLowerCase();
 * const Icon = slug in EXCHANGE_SLUG_TO_NAME
 *   ? exchanges[EXCHANGE_SLUG_TO_NAME[slug as ExchangeSlug]]
 *   : null;
 * ```
 */
export const EXCHANGE_SLUG_TO_NAME = {
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
} as const satisfies Record<string, string>;

/** Lowercased exchange slug recognized by this package. */
export type ExchangeSlug = keyof typeof EXCHANGE_SLUG_TO_NAME;
