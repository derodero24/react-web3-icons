/**
 * EVM chain ID → chain icon base name.
 *
 * Use with `react-web3-icons/chain` for wagmi/viem integration:
 * ```ts
 * import { CHAIN_ID_TO_NAME, type ChainId } from 'react-web3-icons/meta';
 * import * as chains from 'react-web3-icons/chain';
 *
 * // Runtime check narrows to ChainId
 * const Icon = Object.hasOwn(CHAIN_ID_TO_NAME, chain.id)
 *   ? chains[CHAIN_ID_TO_NAME[chain.id as ChainId]]
 *   : null;
 * ```
 */
export const CHAIN_ID_TO_NAME = {
  1: 'Ethereum',
  10: 'Optimism',
  56: 'BinanceSmartChain',
  100: 'GnosisChain',
  137: 'Polygon',
  169: 'MantaPacific',
  250: 'Fantom',
  252: 'Fraxtal',
  324: 'ZkSync',
  480: 'WorldChain',
  592: 'Astar',
  1088: 'Metis',
  1329: 'Sei',
  2222: 'Kava',
  5000: 'Mantle',
  8453: 'Base',
  13371: 'ImmutableX',
  34443: 'Mode',
  42161: 'Arbitrum',
  42170: 'ArbitrumNova',
  42220: 'Celo',
  43114: 'Avalanche',
  57073: 'Ink',
  59144: 'Linea',
  80094: 'Berachain',
  81457: 'Blast',
  167000: 'Taiko',
  534352: 'Scroll',
  7777777: 'Zora',
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
  'arbitrum-nova': 'ArbitrumNova',
  astar: 'Astar',
  avalanche: 'Avalanche',
  base: 'Base',
  berachain: 'Berachain',
  blast: 'Blast',
  bsc: 'BinanceSmartChain',
  bitcoin: 'Bitcoin',
  cardano: 'Cardano',
  celestia: 'Celestia',
  celo: 'Celo',
  'cosmos-hub': 'CosmosHub',
  eclipse: 'Eclipse',
  ethereum: 'Ethereum',
  fantom: 'Fantom',
  fraxtal: 'Fraxtal',
  gnosis: 'GnosisChain',
  hedera: 'Hedera',
  immutablex: 'ImmutableX',
  ink: 'Ink',
  injective: 'Injective',
  kava: 'Kava',
  linea: 'Linea',
  manta: 'MantaPacific',
  mantle: 'Mantle',
  metis: 'Metis',
  mode: 'Mode',
  near: 'Near',
  optimism: 'Optimism',
  polkadot: 'Polkadot',
  polygon: 'Polygon',
  scroll: 'Scroll',
  sei: 'Sei',
  solana: 'Solana',
  stacks: 'Stacks',
  starknet: 'StarkNet',
  stellar: 'Stellar',
  sui: 'Sui',
  taiko: 'Taiko',
  ton: 'Ton',
  tron: 'Tron',
  worldchain: 'WorldChain',
  zksync: 'ZkSync',
  zora: 'Zora',
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
 * const Icon = Object.hasOwn(TICKER_TO_COIN, symbol)
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
  BCH: 'Bch',
  BNB: 'Bnb',
  BTC: 'Btc',
  BUSD: 'Busd',
  CAKE: 'Cake',
  CRO: 'Cro',
  CRV: 'Crv',
  DAI: 'Dai',
  DOGE: 'Doge',
  EIGEN: 'Eigen',
  ENA: 'Ena',
  ETH: 'Eth',
  FIL: 'Fil',
  FTM: 'Ftm',
  JUP: 'Jup',
  KAS: 'Kas',
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
  VET: 'Vet',
  WLD: 'Wld',
  XLM: 'Xlm',
  XMR: 'Xmr',
  XRP: 'Xrp',
  ZEC: 'Zec',
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
 * const Icon = Object.hasOwn(WALLET_SLUG_TO_NAME, slug)
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
  solflare: 'Solflare',
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
 * const Icon = Object.hasOwn(EXCHANGE_SLUG_TO_NAME, slug)
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

/**
 * Lowercased slug → DeFi protocol icon base name.
 *
 * Maps to exports from `react-web3-icons/defi`:
 * ```ts
 * import { DEFI_SLUG_TO_NAME } from 'react-web3-icons/meta';
 *
 * const name = DEFI_SLUG_TO_NAME['aave']; // 'Aave'
 * ```
 */
export const DEFI_SLUG_TO_NAME = {
  aave: 'Aave',
  babylon: 'Babylon',
  balancer: 'Balancer',
  compound: 'Compound',
  convex: 'Convex',
  eigenlayer: 'EigenLayer',
  ethena: 'Ethena',
  etherfi: 'EtherFi',
  frax: 'Frax',
  gmx: 'Gmx',
  kamino: 'Kamino',
  lido: 'Lido',
  liquity: 'Liquity',
  makerdao: 'MakerDao',
  maple: 'Maple',
  morpho: 'Morpho',
  pendle: 'Pendle',
  rocketpool: 'RocketPool',
  safeprotocol: 'SafeProtocol',
  spark: 'Spark',
  synthetix: 'Synthetix',
  venus: 'Venus',
  yearn: 'Yearn',
} as const satisfies Record<string, string>;

/** Lowercased DeFi protocol slug recognized by this package. */
export type DefiSlug = keyof typeof DEFI_SLUG_TO_NAME;

/**
 * Lowercased slug → DEX icon base name.
 *
 * Maps to exports from `react-web3-icons/dex`:
 * ```ts
 * import { DEX_SLUG_TO_NAME } from 'react-web3-icons/meta';
 *
 * const name = DEX_SLUG_TO_NAME['uniswap']; // 'Uniswap'
 * ```
 */
export const DEX_SLUG_TO_NAME = {
  aerodrome: 'Aerodrome',
  camelot: 'Camelot',
  cowprotocol: 'CowProtocol',
  dydx: 'Dydx',
  ekubo: 'Ekubo',
  hyperliquid: 'Hyperliquid',
  jupiter: 'Jupiter',
  odos: 'Odos',
  oneinch: 'Oneinch',
  osmosis: 'Osmosis',
  pancakeswap: 'PancakeSwap',
  paraswap: 'ParaSwap',
  raydium: 'Raydium',
  sushiswap: 'SushiSwap',
  uniswap: 'Uniswap',
  velodrome: 'Velodrome',
} as const satisfies Record<string, string>;

/** Lowercased DEX slug recognized by this package. */
export type DexSlug = keyof typeof DEX_SLUG_TO_NAME;

/**
 * Lowercased slug → bridge icon base name.
 *
 * Maps to exports from `react-web3-icons/bridge`:
 * ```ts
 * import { BRIDGE_SLUG_TO_NAME } from 'react-web3-icons/meta';
 *
 * const name = BRIDGE_SLUG_TO_NAME['layerzero']; // 'LayerZero'
 * ```
 */
export const BRIDGE_SLUG_TO_NAME = {
  across: 'Across',
  axelar: 'Axelar',
  debridge: 'DeBridge',
  hopprotocol: 'HopProtocol',
  layerzero: 'LayerZero',
  stargate: 'Stargate',
  wormhole: 'Wormhole',
} as const satisfies Record<string, string>;

/** Lowercased bridge slug recognized by this package. */
export type BridgeSlug = keyof typeof BRIDGE_SLUG_TO_NAME;
