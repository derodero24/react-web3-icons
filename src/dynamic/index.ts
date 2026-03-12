'use client';

import type { ReactNode } from 'react';
import type {
  BridgeSlug,
  ChainId,
  ChainSlug,
  DefiSlug,
  DexSlug,
  ExchangeSlug,
  OracleSlug,
  Ticker,
  WalletSlug,
} from '../meta';
import type { IconProps } from '../utils';
import { createDynamicIcon } from './DynamicIcon';
import {
  resolveBridgeExportName,
  resolveChainExportName,
  resolveCoinExportName,
  resolveDefiExportName,
  resolveDexExportName,
  resolveExchangeExportName,
  resolveOracleExportName,
  resolveWalletExportName,
} from './resolve';

type Variant = 'colored' | 'mono';

interface DynamicIconBase extends Omit<IconProps, 'ref'> {
  /** Icon variant. Defaults to `'colored'`. */
  variant?: Variant;
  /** Rendered while loading or when the identifier is not recognized. */
  fallback?: ReactNode;
}

export interface ChainIconProps extends DynamicIconBase {
  /** Chain slug, case-insensitive (e.g. `'ethereum'`, `'arbitrum'`). */
  name?: ChainSlug | (string & {});
  /** EVM chain ID (e.g. `1`, `8453`). Takes precedence over `name`. */
  chainId?: ChainId | (number & {});
}

export interface CoinIconProps extends DynamicIconBase {
  /** Ticker symbol, case-insensitive (e.g. `'ETH'`, `'btc'`). */
  symbol: Ticker | (string & {});
}

export interface WalletIconProps extends DynamicIconBase {
  /** Wallet name, case-insensitive (e.g. `'metamask'`, `'rabby'`). */
  name: WalletSlug | (string & {});
}

export interface ExchangeIconProps extends DynamicIconBase {
  /** Exchange name, case-insensitive (e.g. `'binance'`, `'coinbase'`). */
  name: ExchangeSlug | (string & {});
}

export interface DefiIconProps extends DynamicIconBase {
  /** DeFi protocol name, case-insensitive (e.g. `'aave'`, `'lido'`). */
  name: DefiSlug | (string & {});
}

export interface DexIconProps extends DynamicIconBase {
  /** DEX name, case-insensitive (e.g. `'uniswap'`, `'sushiswap'`). */
  name: DexSlug | (string & {});
}

export interface BridgeIconProps extends DynamicIconBase {
  /** Bridge name, case-insensitive (e.g. `'layerzero'`, `'wormhole'`). */
  name: BridgeSlug | (string & {});
}

export interface OracleIconProps extends DynamicIconBase {
  /** Oracle protocol name, case-insensitive (e.g. `'pyth'`, `'band'`). */
  name: OracleSlug | (string & {});
}

const CHAIN_STRIP = ['name', 'chainId', 'variant', 'fallback'] as const;
const NAME_STRIP = ['name', 'variant', 'fallback'] as const;
const SYMBOL_STRIP = ['symbol', 'variant', 'fallback'] as const;

/** Lazily loads a chain icon by chain ID or slug. */
export const ChainIcon = createDynamicIcon<ChainIconProps>(
  resolveChainExportName,
  () => import('../chain'),
  CHAIN_STRIP,
);

/** Lazily loads a coin icon by ticker symbol. */
export const CoinIcon = createDynamicIcon<CoinIconProps>(
  resolveCoinExportName,
  () => import('../coin'),
  SYMBOL_STRIP,
);

/** Lazily loads a wallet icon by name. */
export const WalletIcon = createDynamicIcon<WalletIconProps>(
  resolveWalletExportName,
  () => import('../wallet'),
  NAME_STRIP,
);

/** Lazily loads an exchange icon by name. */
export const ExchangeIcon = createDynamicIcon<ExchangeIconProps>(
  resolveExchangeExportName,
  () => import('../exchange'),
  NAME_STRIP,
);

/** Lazily loads a DeFi protocol icon by name. */
export const DefiIcon = createDynamicIcon<DefiIconProps>(
  resolveDefiExportName,
  () => import('../defi'),
  NAME_STRIP,
);

/** Lazily loads a DEX icon by name. */
export const DexIcon = createDynamicIcon<DexIconProps>(
  resolveDexExportName,
  () => import('../dex'),
  NAME_STRIP,
);

/** Lazily loads a bridge icon by name. */
export const BridgeIcon = createDynamicIcon<BridgeIconProps>(
  resolveBridgeExportName,
  () => import('../bridge'),
  NAME_STRIP,
);

/** Lazily loads an oracle icon by name. */
export const OracleIcon = createDynamicIcon<OracleIconProps>(
  resolveOracleExportName,
  () => import('../oracle'),
  NAME_STRIP,
);
