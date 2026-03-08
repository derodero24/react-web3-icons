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
