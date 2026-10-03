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
import { bridgeImports } from './imports/bridge';
import { chainImports } from './imports/chain';
import { coinImports } from './imports/coin';
import { defiImports } from './imports/defi';
import { dexImports } from './imports/dex';
import { exchangeImports } from './imports/exchange';
import { oracleImports } from './imports/oracle';
import { walletImports } from './imports/wallet';
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

export interface ChainIconProps extends DynamicIconProps {
  /** Chain slug, case-insensitive (e.g. `'ethereum'`, `'arbitrum'`). */
  name?: ChainSlug | (string & {});
  /** EVM chain ID (e.g. `1`, `8453`). Takes precedence over `name`. */
  chainId?: ChainId | (number & {});
}

export interface CoinIconProps extends DynamicIconProps {
  /** Ticker symbol, case-insensitive (e.g. `'ETH'`, `'btc'`). */
  symbol: Ticker | (string & {});
}

export interface WalletIconProps extends DynamicIconProps {
  /** Wallet name, case-insensitive (e.g. `'metamask'`, `'rabby'`). */
  name: WalletSlug | (string & {});
}

export interface ExchangeIconProps extends DynamicIconProps {
  /** Exchange name, case-insensitive (e.g. `'binance'`, `'coinbase'`). */
  name: ExchangeSlug | (string & {});
}

export interface DefiIconProps extends DynamicIconProps {
  /** DeFi protocol name, case-insensitive (e.g. `'aave'`, `'lido'`). */
  name: DefiSlug | (string & {});
}

export interface DexIconProps extends DynamicIconProps {
  /** DEX name, case-insensitive (e.g. `'uniswap'`, `'sushiswap'`). */
  name: DexSlug | (string & {});
}

export interface BridgeIconProps extends DynamicIconProps {
  /** Bridge name, case-insensitive (e.g. `'layerzero'`, `'wormhole'`). */
  name: BridgeSlug | (string & {});
}

export interface OracleIconProps extends DynamicIconProps {
  /** Oracle protocol name, case-insensitive (e.g. `'pyth'`, `'band'`). */
  name: OracleSlug | (string & {});
}

/**
 * Untyped data (API responses) can pass `undefined`, `null` or a non-string
 * where a name is expected; treat that as an unknown identifier instead of
 * letting the resolver call string methods on it.
 */
function withStringName<
  K extends string,
  P extends Partial<Record<K, unknown>>,
>(key: K, resolve: (props: P) => string | null): (props: P) => string | null {
  return props => (typeof props[key] === 'string' ? resolve(props) : null);
}

/** Lazily loads a chain icon by chain ID or slug. */
export const ChainIcon = createDynamicIcon<ChainIconProps>({
  displayName: 'ChainIcon',
  // `name` is optional here: a nullish one falls through to `chainId`.
  resolve: props =>
    props.name === undefined ||
    props.name === null ||
    typeof props.name === 'string'
      ? resolveChainExportName(props)
      : null,
  imports: chainImports,
  identifiers: ['chainId', 'name'],
});

/** Lazily loads a coin icon by ticker symbol. */
export const CoinIcon = createDynamicIcon<CoinIconProps>({
  displayName: 'CoinIcon',
  resolve: withStringName('symbol', resolveCoinExportName),
  imports: coinImports,
  identifiers: ['symbol'],
});

/** Lazily loads a wallet icon by name. */
export const WalletIcon = createDynamicIcon<WalletIconProps>({
  displayName: 'WalletIcon',
  resolve: withStringName('name', resolveWalletExportName),
  imports: walletImports,
  identifiers: ['name'],
});

/** Lazily loads an exchange icon by name. */
export const ExchangeIcon = createDynamicIcon<ExchangeIconProps>({
  displayName: 'ExchangeIcon',
  resolve: withStringName('name', resolveExchangeExportName),
  imports: exchangeImports,
  identifiers: ['name'],
});

/** Lazily loads a DeFi protocol icon by name. */
export const DefiIcon = createDynamicIcon<DefiIconProps>({
  displayName: 'DefiIcon',
  resolve: withStringName('name', resolveDefiExportName),
  imports: defiImports,
  identifiers: ['name'],
});

/** Lazily loads a DEX icon by name. */
export const DexIcon = createDynamicIcon<DexIconProps>({
  displayName: 'DexIcon',
  resolve: withStringName('name', resolveDexExportName),
  imports: dexImports,
  identifiers: ['name'],
});

/** Lazily loads a bridge icon by name. */
export const BridgeIcon = createDynamicIcon<BridgeIconProps>({
  displayName: 'BridgeIcon',
  resolve: withStringName('name', resolveBridgeExportName),
  imports: bridgeImports,
  identifiers: ['name'],
});

/** Lazily loads an oracle icon by name. */
export const OracleIcon = createDynamicIcon<OracleIconProps>({
  displayName: 'OracleIcon',
  resolve: withStringName('name', resolveOracleExportName),
  imports: oracleImports,
  identifiers: ['name'],
});
