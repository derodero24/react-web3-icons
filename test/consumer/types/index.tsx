// Type-checks the published declarations the way a consumer would use them.
// Compiled with tsconfig.bundler.json and tsconfig.node16.json against the
// installed tarball, with skipLibCheck off so the .d.mts files are checked too.
// The JSON subpaths are covered by ../node/check.mjs: `module: node16` does not
// support import attributes.
import { createRef, type ReactElement } from 'react';
import * as allIcons from 'react-web3-icons';
import {
  DEPRECATED_ICON_NAMES,
  Ethereum,
  type IconName,
  type IconProps,
} from 'react-web3-icons';
import { Across } from 'react-web3-icons/bridge';
import { AvalancheCircle, Bitcoin } from 'react-web3-icons/chain';
import { Ada } from 'react-web3-icons/coin';
import { Aave } from 'react-web3-icons/defi';
import { DEPRECATED_ICON_NAMES as DEPRECATED_FROM_SUBPATH } from 'react-web3-icons/deprecated';
import { Aragon } from 'react-web3-icons/devtool';
import { Aerodrome } from 'react-web3-icons/dex';
import { Ens } from 'react-web3-icons/domain';
import {
  ChainIcon,
  type ChainIconProps,
  type ChainVariant,
  CoinIcon,
  DefiIcon,
  type DefiVariant,
  WalletIcon,
  type WalletIconProps,
} from 'react-web3-icons/dynamic';
import { Binance, Bybit, type BybitProps } from 'react-web3-icons/exchange';
import { Arbiscan } from 'react-web3-icons/explorer';
import {
  ICON_MANIFEST,
  type IconManifestEntry,
  type IconManifestName,
} from 'react-web3-icons/manifest';
import { LooksRare } from 'react-web3-icons/marketplace';
import { CHAIN_ID_TO_NAME, type ChainId } from 'react-web3-icons/meta';
import { Alchemy } from 'react-web3-icons/node';
import { Api3 } from 'react-web3-icons/oracle';
import { CoinLedger } from 'react-web3-icons/portfolio';
import { Arweave } from 'react-web3-icons/storage';
import { CoinGecko } from 'react-web3-icons/tracker';
import { Ready } from 'react-web3-icons/wallet';

const ref = createRef<SVGSVGElement>();
const props: IconProps = { size: 24, title: 'Ethereum', titleId: 'eth-title' };
const chainProps: ChainIconProps = { chainId: 1, variant: 'mono' };
const bybitProps: IconProps & BybitProps = { fill1: '#000', size: 24 };
// `variant` is a strict per-category union.
const chainVariant: ChainVariant = 'CircleMono';
const defiVariant: DefiVariant = 'mono';
// Identifiers keep autocomplete but accept any runtime string.
const connectorId: string = 'metaMaskSDK';
const walletProps: WalletIconProps = { name: connectorId, variant: 'Square' };

export const elements: ReactElement[] = [
  <Ethereum key="root" ref={ref} {...props} />,
  <Across key="bridge" />,
  <Bitcoin key="chain" className="icon" />,
  <Ada key="coin" width={16} height="1rem" />,
  <Aave key="defi" aria-label="Aave" />,
  <Aragon key="devtool" />,
  <Aerodrome key="dex" />,
  <Ens key="domain" />,
  <Binance key="exchange" />,
  <Arbiscan key="explorer" />,
  <LooksRare key="marketplace" />,
  <Alchemy key="node" />,
  <Api3 key="oracle" />,
  <CoinLedger key="portfolio" />,
  <Arweave key="storage" />,
  <CoinGecko key="tracker" />,
  <Ready key="wallet" onClick={event => event.currentTarget.getBBox()} />,
  <ChainIcon key="dynamic-chain" {...chainProps} fallback={null} />,
  <CoinIcon key="dynamic-coin" symbol="ETH" size={20} />,
  <WalletIcon key="dynamic-wallet" name="metamask" ref={ref} />,
  <WalletIcon key="dynamic-connector" {...walletProps} />,
  <ChainIcon key="dynamic-variant" name="ethereum" variant={chainVariant} />,
  <ChainIcon key="dynamic-id-name" chainId={999_999} name="base" />,
  <CoinIcon key="dynamic-coin-variant" symbol="btc" variant="Circle" />,
  <DefiIcon key="dynamic-defi" name="ether.fi" variant={defiVariant} />,
  // @ts-expect-error DeFi icons ship no Square variant
  <DefiIcon key="dynamic-bad-variant" name="aave" variant="Square" />,
  // @ts-expect-error variants are case-sensitive suffixes
  <ChainIcon key="dynamic-variant-case" name="base" variant="circle" />,
  <AvalancheCircle key="extra-toggle" withBackground={false} ref={ref} />,
  <Bybit key="extra-fill" {...bybitProps} />,
  // @ts-expect-error extra props are typed per component
  <Binance key="no-extra" withBackground />,
  // @ts-expect-error unknown props must be rejected (types are not `any`)
  <Ethereum key="invalid" notAnSvgProp />,
];

const iconName: IconName = 'Ethereum';
const chainId: ChainId = 1;
const firstEntry: IconManifestEntry | undefined = ICON_MANIFEST[0];

// The set holds icon names but still accepts any string (backward compatible).
const deprecatedNames: readonly IconName[] = [...DEPRECATED_ICON_NAMES];
const anyName: string = firstEntry?.name ?? '';
// Manifest names are icon names, so they index the icon exports without a cast.
const manifestName: IconManifestName = iconName;
// biome-ignore lint/performance/noDynamicNamespaceImportAccess: the pattern under test
const firstIcon = allIcons[firstEntry?.name ?? manifestName];

export const values: readonly unknown[] = [
  DEPRECATED_ICON_NAMES.has(iconName),
  DEPRECATED_ICON_NAMES.has(anyName),
  deprecatedNames,
  DEPRECATED_FROM_SUBPATH.size,
  CHAIN_ID_TO_NAME[chainId],
  firstEntry?.category,
  firstIcon,
];
