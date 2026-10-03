'use client';

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
import { createDynamicIcon, type DynamicIconProps } from './DynamicIcon';
import {
  type BridgeVariant,
  bridgeImports,
  bridgeVariants,
} from './imports/bridge';
import {
  type ChainVariant,
  chainImports,
  chainVariants,
} from './imports/chain';
import { type CoinVariant, coinImports, coinVariants } from './imports/coin';
import { type DefiVariant, defiImports, defiVariants } from './imports/defi';
import { type DexVariant, dexImports, dexVariants } from './imports/dex';
import {
  type ExchangeVariant,
  exchangeImports,
  exchangeVariants,
} from './imports/exchange';
import {
  type OracleVariant,
  oracleImports,
  oracleVariants,
} from './imports/oracle';
import {
  type WalletVariant,
  walletImports,
  walletVariants,
} from './imports/wallet';
import {
  resolveBridgeSlug,
  resolveChain,
  resolveDefiSlug,
  resolveDexSlug,
  resolveExchangeSlug,
  resolveOracleSlug,
  resolveTicker,
  resolveWalletSlug,
} from './resolve';

export type {
  BridgeVariant,
  ChainVariant,
  CoinVariant,
  DefiVariant,
  DexVariant,
  ExchangeVariant,
  OracleVariant,
  WalletVariant,
};

// Identifier props are typed `<Key> | (string & {})`: editors suggest the
// known keys, and any string (API data, connector ids, user input) still
// type-checks, since it is resolved at runtime anyway: case-insensitively,
// ignoring whitespace, `.`, `-` and `_` (see normalize.ts). An identifier
// nothing matches renders `fallback`. `variant` is strict: one of the
// category's variants.

export interface ChainIconProps extends DynamicIconProps<ChainVariant> {
  /**
   * Chain slug, normalized (e.g. `'ethereum'`, `'Arbitrum Nova'`,
   * `'arbitrum-one'`). Used when `chainId` is absent or unknown.
   */
  name?: ChainSlug | (string & {});
  /**
   * EVM chain ID (e.g. `1`, `8453`). Takes precedence over `name`; an
   * unknown chain ID falls back to `name`.
   */
  chainId?: ChainId | (number & {});
}

export interface CoinIconProps extends DynamicIconProps<CoinVariant> {
  /** Ticker symbol, case-insensitive (e.g. `'ETH'`, `'btc'`). */
  symbol: Ticker | (string & {});
}

export interface WalletIconProps extends DynamicIconProps<WalletVariant> {
  /**
   * Wallet name or connector id, normalized (e.g. `'metamask'`, `'metaMaskSDK'`,
   * `'phantom'`, `'Trust Wallet'`).
   */
  name: WalletSlug | (string & {});
}

export interface ExchangeIconProps extends DynamicIconProps<ExchangeVariant> {
  /** Exchange name, normalized (e.g. `'binance'`, `'Crypto.com'`). */
  name: ExchangeSlug | (string & {});
}

export interface DefiIconProps extends DynamicIconProps<DefiVariant> {
  /** DeFi protocol name, normalized (e.g. `'aave'`, `'ether.fi'`). */
  name: DefiSlug | (string & {});
}

export interface DexIconProps extends DynamicIconProps<DexVariant> {
  /** DEX name, normalized (e.g. `'uniswap'`, `'1inch'`). */
  name: DexSlug | (string & {});
}

export interface BridgeIconProps extends DynamicIconProps<BridgeVariant> {
  /** Bridge name, normalized (e.g. `'layerzero'`, `'hop-protocol'`). */
  name: BridgeSlug | (string & {});
}

export interface OracleIconProps extends DynamicIconProps<OracleVariant> {
  /** Oracle protocol name, normalized (e.g. `'pyth'`, `'RedStone'`). */
  name: OracleSlug | (string & {});
}

/** Lazily loads a chain icon by chain ID or slug. */
export const ChainIcon = createDynamicIcon<ChainIconProps>({
  displayName: 'ChainIcon',
  resolve: resolveChain,
  imports: chainImports,
  variants: chainVariants,
  identifiers: ['chainId', 'name'],
});

/** Lazily loads a coin icon by ticker symbol. */
export const CoinIcon = createDynamicIcon<CoinIconProps>({
  displayName: 'CoinIcon',
  resolve: props => resolveTicker(props.symbol),
  imports: coinImports,
  variants: coinVariants,
  identifiers: ['symbol'],
});

/** Lazily loads a wallet icon by name or connector id. */
export const WalletIcon = createDynamicIcon<WalletIconProps>({
  displayName: 'WalletIcon',
  resolve: props => resolveWalletSlug(props.name),
  imports: walletImports,
  variants: walletVariants,
  identifiers: ['name'],
});

/** Lazily loads an exchange icon by name. */
export const ExchangeIcon = createDynamicIcon<ExchangeIconProps>({
  displayName: 'ExchangeIcon',
  resolve: props => resolveExchangeSlug(props.name),
  imports: exchangeImports,
  variants: exchangeVariants,
  identifiers: ['name'],
});

/** Lazily loads a DeFi protocol icon by name. */
export const DefiIcon = createDynamicIcon<DefiIconProps>({
  displayName: 'DefiIcon',
  resolve: props => resolveDefiSlug(props.name),
  imports: defiImports,
  variants: defiVariants,
  identifiers: ['name'],
});

/** Lazily loads a DEX icon by name. */
export const DexIcon = createDynamicIcon<DexIconProps>({
  displayName: 'DexIcon',
  resolve: props => resolveDexSlug(props.name),
  imports: dexImports,
  variants: dexVariants,
  identifiers: ['name'],
});

/** Lazily loads a bridge icon by name. */
export const BridgeIcon = createDynamicIcon<BridgeIconProps>({
  displayName: 'BridgeIcon',
  resolve: props => resolveBridgeSlug(props.name),
  imports: bridgeImports,
  variants: bridgeVariants,
  identifiers: ['name'],
});

/** Lazily loads an oracle icon by name. */
export const OracleIcon = createDynamicIcon<OracleIconProps>({
  displayName: 'OracleIcon',
  resolve: props => resolveOracleSlug(props.name),
  imports: oracleImports,
  variants: oracleVariants,
  identifiers: ['name'],
});
