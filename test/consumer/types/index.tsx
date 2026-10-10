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
import * as bridgeIcons from 'react-web3-icons/bridge';
import { Across } from 'react-web3-icons/bridge';
import * as chainIcons from 'react-web3-icons/chain';
import { AvalancheCircle, Bitcoin } from 'react-web3-icons/chain';
import * as coinIcons from 'react-web3-icons/coin';
import { Ada } from 'react-web3-icons/coin';
import * as defiIcons from 'react-web3-icons/defi';
import { Aave } from 'react-web3-icons/defi';
import { DEPRECATED_ICON_NAMES as DEPRECATED_FROM_SUBPATH } from 'react-web3-icons/deprecated';
import * as devtoolIcons from 'react-web3-icons/devtool';
import { Aragon } from 'react-web3-icons/devtool';
import * as dexIcons from 'react-web3-icons/dex';
import { Aerodrome } from 'react-web3-icons/dex';
import * as domainIcons from 'react-web3-icons/domain';
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
import * as exchangeIcons from 'react-web3-icons/exchange';
import { Binance, Bybit, type BybitProps } from 'react-web3-icons/exchange';
import * as explorerIcons from 'react-web3-icons/explorer';
import { Arbiscan } from 'react-web3-icons/explorer';
import {
  ICON_MANIFEST,
  type IconManifestEntry,
  type IconManifestName,
} from 'react-web3-icons/manifest';
import * as marketplaceIcons from 'react-web3-icons/marketplace';
import { LooksRare } from 'react-web3-icons/marketplace';
import { CHAIN_ID_TO_NAME, type ChainId } from 'react-web3-icons/meta';
import * as nodeIcons from 'react-web3-icons/node';
import { Alchemy } from 'react-web3-icons/node';
import * as oracleIcons from 'react-web3-icons/oracle';
import { Api3 } from 'react-web3-icons/oracle';
import * as portfolioIcons from 'react-web3-icons/portfolio';
import { CoinLedger } from 'react-web3-icons/portfolio';
import * as storageIcons from 'react-web3-icons/storage';
import { Arweave } from 'react-web3-icons/storage';
import * as trackerIcons from 'react-web3-icons/tracker';
import { CoinGecko } from 'react-web3-icons/tracker';
import * as walletIcons from 'react-web3-icons/wallet';
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
// Optional props accept `undefined` under exactOptionalPropertyTypes, like the
// SVG attributes of @types/react, so values that may be missing pass through.
declare const maybeLabel: string | undefined;
declare const maybeSize: number | undefined;
declare const maybeFlag: boolean | undefined;
declare const maybeVariant: ChainVariant | undefined;

// A wrapper that drops props from each member of the ChainIconProps union
// still requires an identifier and spreads into ChainIcon; a plain `Omit`
// would make both identifiers optional.
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;
function ChainIconWithoutFallback(
  wrapperProps: DistributiveOmit<ChainIconProps, 'fallback'>,
): ReactElement {
  return <ChainIcon {...wrapperProps} fallback={null} />;
}

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
  // @ts-expect-error ChainIcon needs chainId or name
  <ChainIcon key="dynamic-no-identifier" />,
  // @ts-expect-error ChainIcon needs chainId or name
  <ChainIcon key="dynamic-variant-only" variant="Circle" />,
  // An identifier that may be undefined (data not loaded yet) renders fallback.
  <ChainIcon key="dynamic-maybe-name" name={maybeLabel} />,
  <ChainIcon key="dynamic-maybe-id" chainId={maybeSize} />,
  <CoinIcon key="dynamic-maybe-symbol" symbol={maybeLabel} />,
  <AvalancheCircle key="extra-toggle" withBackground={false} ref={ref} />,
  <Bybit key="extra-fill" {...bybitProps} />,
  // @ts-expect-error extra props are typed per component
  <Binance key="no-extra" withBackground />,
  // @ts-expect-error unknown props must be rejected (types are not `any`)
  <Ethereum key="invalid" notAnSvgProp />,
  <Ethereum
    key="optional-undefined"
    title={maybeLabel}
    titleId={maybeLabel}
    size={maybeSize}
  />,
  <AvalancheCircle key="optional-toggle" withBackground={maybeFlag} />,
  <Bybit key="optional-fill" fill1={maybeLabel} fill2={undefined} />,
  <ChainIcon
    key="optional-dynamic"
    chainId={1}
    name={maybeLabel}
    variant={maybeVariant}
  />,
  <ChainIcon key="dynamic-icon-props" chainId={1} {...props} />,
  <ChainIconWithoutFallback key="wrapper" name="base" variant="Circle" />,
  // @ts-expect-error the wrapper keeps the identifier requirement
  <ChainIconWithoutFallback key="wrapper-no-identifier" variant="Circle" />,
];

// A category namespace exports icon components only: every key is an
// `IconName` (the declarations once exported an `index_d_exports` namespace
// that does not exist at runtime), and every value renders.
type ExportName<T> = T extends unknown ? keyof T : never;
type NonIconExport = Exclude<
  ExportName<
    | typeof bridgeIcons
    | typeof chainIcons
    | typeof coinIcons
    | typeof defiIcons
    | typeof devtoolIcons
    | typeof dexIcons
    | typeof domainIcons
    | typeof exchangeIcons
    | typeof explorerIcons
    | typeof marketplaceIcons
    | typeof nodeIcons
    | typeof oracleIcons
    | typeof portfolioIcons
    | typeof storageIcons
    | typeof trackerIcons
    | typeof walletIcons
  >,
  IconName
>;
const onlyIconExports: [NonIconExport] extends [never] ? true : false = true;

export const categoryElements: ReactElement[] = [
  ...Object.values(bridgeIcons).map(Icon => <Icon key={Icon.displayName} />),
  ...Object.values(chainIcons).map(Icon => <Icon key={Icon.displayName} />),
  ...Object.values(coinIcons).map(Icon => <Icon key={Icon.displayName} />),
  ...Object.values(defiIcons).map(Icon => <Icon key={Icon.displayName} />),
  ...Object.values(devtoolIcons).map(Icon => <Icon key={Icon.displayName} />),
  ...Object.values(dexIcons).map(Icon => <Icon key={Icon.displayName} />),
  ...Object.values(domainIcons).map(Icon => <Icon key={Icon.displayName} />),
  ...Object.values(exchangeIcons).map(Icon => <Icon key={Icon.displayName} />),
  ...Object.values(explorerIcons).map(Icon => <Icon key={Icon.displayName} />),
  ...Object.values(marketplaceIcons).map(Icon => (
    <Icon key={Icon.displayName} />
  )),
  ...Object.values(nodeIcons).map(Icon => <Icon key={Icon.displayName} />),
  ...Object.values(oracleIcons).map(Icon => <Icon key={Icon.displayName} />),
  ...Object.values(portfolioIcons).map(Icon => <Icon key={Icon.displayName} />),
  ...Object.values(storageIcons).map(Icon => <Icon key={Icon.displayName} />),
  ...Object.values(trackerIcons).map(Icon => <Icon key={Icon.displayName} />),
  ...Object.values(walletIcons).map(Icon => <Icon key={Icon.displayName} />),
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
  onlyIconExports,
  DEPRECATED_ICON_NAMES.has(iconName),
  DEPRECATED_ICON_NAMES.has(anyName),
  deprecatedNames,
  DEPRECATED_FROM_SUBPATH.size,
  CHAIN_ID_TO_NAME[chainId],
  firstEntry?.category,
  firstIcon,
];
