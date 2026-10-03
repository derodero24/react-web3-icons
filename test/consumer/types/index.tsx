// Type-checks the published declarations the way a consumer would use them.
// Compiled with tsconfig.bundler.json and tsconfig.node16.json against the
// installed tarball, with skipLibCheck off so the .d.mts files are checked too.
// The JSON subpaths are covered by ../node/check.mjs: `module: node16` does not
// support import attributes.
import { createRef, type ReactElement } from 'react';
import {
  DEPRECATED_ICON_NAMES,
  Ethereum,
  type IconName,
  type IconProps,
} from 'react-web3-icons';
import { Across } from 'react-web3-icons/bridge';
import { Bitcoin } from 'react-web3-icons/chain';
import { Ada } from 'react-web3-icons/coin';
import { Aave } from 'react-web3-icons/defi';
import { DEPRECATED_ICON_NAMES as DEPRECATED_FROM_SUBPATH } from 'react-web3-icons/deprecated';
import { Aragon } from 'react-web3-icons/devtool';
import { Aerodrome } from 'react-web3-icons/dex';
import { Ens } from 'react-web3-icons/domain';
import {
  ChainIcon,
  type ChainIconProps,
  CoinIcon,
  WalletIcon,
} from 'react-web3-icons/dynamic';
import { Binance } from 'react-web3-icons/exchange';
import { Arbiscan } from 'react-web3-icons/explorer';
import {
  ICON_MANIFEST,
  type IconManifestEntry,
} from 'react-web3-icons/manifest';
import { LooksRare } from 'react-web3-icons/marketplace';
import { CHAIN_ID_TO_NAME, type ChainId } from 'react-web3-icons/meta';
import { Alchemy } from 'react-web3-icons/node';
import { Api3 } from 'react-web3-icons/oracle';
import { CoinLedger } from 'react-web3-icons/portfolio';
import { Arweave } from 'react-web3-icons/storage';
import { CoinGecko } from 'react-web3-icons/tracker';
import { Argent } from 'react-web3-icons/wallet';

const ref = createRef<SVGSVGElement>();
const props: IconProps = { size: 24, title: 'Ethereum', titleId: 'eth-title' };
const chainProps: ChainIconProps = { chainId: 1, variant: 'mono' };

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
  <Argent key="wallet" onClick={event => event.currentTarget.getBBox()} />,
  <ChainIcon key="dynamic-chain" {...chainProps} fallback={null} />,
  <CoinIcon key="dynamic-coin" symbol="ETH" size={20} />,
  <WalletIcon key="dynamic-wallet" name="metamask" />,
  // @ts-expect-error unknown props must be rejected (types are not `any`)
  <Ethereum key="invalid" notAnSvgProp />,
];

const iconName: IconName = 'Ethereum';
const chainId: ChainId = 1;
const firstEntry: IconManifestEntry | undefined = ICON_MANIFEST[0];

export const values: readonly unknown[] = [
  DEPRECATED_ICON_NAMES.has(iconName),
  DEPRECATED_FROM_SUBPATH.size,
  CHAIN_ID_TO_NAME[chainId],
  firstEntry?.category,
];
