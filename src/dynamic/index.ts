'use client';

import type { ReactNode } from 'react';
import type { IconProps } from '../utils';
import { createDynamicIcon } from './DynamicIcon';
import {
  resolveChainExportName,
  resolveCoinExportName,
  resolveExchangeExportName,
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
  /** Lowercase chain slug (e.g. `'ethereum'`, `'arbitrum'`). */
  name?: string;
  /** EVM chain ID (e.g. `1`, `8453`). Takes precedence over `name`. */
  chainId?: number;
}

export interface CoinIconProps extends DynamicIconBase {
  /** Ticker symbol, case-insensitive (e.g. `'ETH'`, `'btc'`). */
  symbol: string;
}

export interface WalletIconProps extends DynamicIconBase {
  /** Wallet name, case-insensitive (e.g. `'metamask'`, `'rabby'`). */
  name: string;
}

export interface ExchangeIconProps extends DynamicIconBase {
  /** Exchange name, case-insensitive (e.g. `'binance'`, `'coinbase'`). */
  name: string;
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
