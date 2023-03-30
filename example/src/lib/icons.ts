import type * as icons from '../../../.';

type ReactWeb3IconKey = keyof typeof icons;

const chain = [
  'Algorand',
  'Algorand2',
  'AlgorandMono',
  'Astar',
  'AstarMono',
  'Avalanche',
  'Avalanche2',
  'AvalancheMono',
  'AvalancheMono2',
  'BinanceSmartChain',
  'BinanceSmartChainMono',
  'Bitcoin',
  'Bitcoin2',
  'BitcoinMono',
  'BitcoinMono2',
  'Cardano',
  'Cardano2',
  'CardanoMono',
  'CardanoMono2',
  'Ethereum',
  'EthereumMono',
  'ImmutableX',
  'ImmutableXMono',
  'Polkadot',
  'PolkadotMono',
  'Polygon',
  'PolygonMono',
  'Solana',
  'SolanaMono',
].sort() as ReactWeb3IconKey[];

const coin = [
  'Ada',
  'Ada2',
  'AdaMono',
  'AdaMono2',
  'Avax',
  'Avax2',
  'AvaxMono',
  'AvaxMono2',
  'Bnb',
  'BnbMono',
  'Btc',
  'Btc2',
  'BtcMono',
  'BtcMono2',
  'Busd',
  'BusdMono',
  'Cake',
  'CakeMono',
  'Dai',
  'Dai2',
  'DaiMono',
  'DaiMono2',
  'Doge',
  'Eth',
  'EthMono',
  'Looks',
  'Looks2',
  'LooksMono',
  'Ltc',
  'LtcMono',
  'Shib',
  'Usdc',
  'UsdcMono',
  'Usdt',
  'UsdtMono',
  'Xrp',
  'Xrp2',
  'XrpMono',
  'XrpMono2',
].sort() as ReactWeb3IconKey[];

const dex = [
  'Dydx',
  'Dydx2',
  'DydxMono',
  'DydxMono2',
  'PancakeSwap',
  'PancakeSwapMono',
  'Uniswap',
  'UniswapMono',
].sort() as ReactWeb3IconKey[];

const domain = [
  'Ens',
  'Ens2',
  'EnsMono',
  'EnsMono2',
  'UnstoppableDomains',
  'UnstoppableDomainsMono',
].sort() as ReactWeb3IconKey[];

const exchange = [
  'Binance',
  'BinanceMono',
  'Coinbase',
  'Coinbase2',
  'Coinbase3',
  'CoinbaseMono',
  'CoinbaseMono2',
  'Kraken',
  'KrakenMono',
  'KuCoin',
  'KuCoinMono',
].sort() as ReactWeb3IconKey[];

const library = [
  'Drizzle',
  'DrizzleMono',
  'EthersJs',
  'EthersJsMono',
  'Ganache',
  'GanacheMono',
  'Hardhat',
  'HardhatMono',
  'OpenZeppelin',
  'OpenZeppelinMono',
  'Truffle',
  'TruffleMono',
].sort() as ReactWeb3IconKey[];

const marketplace = [
  'LooksRare',
  'LooksRare2',
  'LooksRareMono',
  'OpenSea',
  'OpenSea2',
  'OpenSeaMono',
  'OpenSeaMono2',
  'TofuNft',
  'TofuNftMono',
  'X2Y2',
  'X2Y2Mono',
].sort() as ReactWeb3IconKey[];

const node = [
  'Alchemy',
  'AlchemyMono',
  'Infura',
  'InfuraMono',
  'QuickNode',
  'QuickNodeMono',
].sort() as ReactWeb3IconKey[];

const storage = [
  'Arweave',
  'ArweaveMono',
  'Ipfs',
  'IpfsMono',
  'NftStorage',
  'NftStorageMono',
  'Pinata',
  'PinataMono',
].sort() as ReactWeb3IconKey[];

const wallet = [
  'Argent',
  'ArgentMono',
  'CoinbaseWallet',
  'CoinbaseWalletMono',
  'DaedalusWallet',
  'DaedalusWalletMono',
  'GnosisSafe',
  'GnosisSafe2',
  'GnosisSafeMono',
  'GnosisSafeMono2',
  'MetaMask',
  'MetaMask2',
  'NamiWallet',
  'NamiWalletMono',
  'PhantomWallet',
  'PhantomWalletMono',
  'PhantomWalletMono2',
  'PolkadotJs',
  'PolkadotJsMono',
  'RainbowWallet',
  'RainbowWallet2',
  'TrustWallet',
  'TrustWallet2',
  'TrustWalletMono',
  'TrustWalletMono2',
  'WalletConnect',
  'WalletConnectMono',
  'YoroiWallet',
  'YoroiWalletMono',
  'Zerion',
  'Zerion2',
  'ZerionMono',
  'ZerionMono2',
].sort() as ReactWeb3IconKey[];

export const REACT_WEB3_ICONS = {
  all: [
    ...chain,
    ...coin,
    ...dex,
    ...domain,
    ...exchange,
    ...library,
    ...marketplace,
    ...node,
    ...storage,
    ...wallet,
  ].sort(),
  chain,
  coin,
  dex,
  domain,
  exchange,
  library,
  marketplace,
  node,
  storage,
  wallet,
};
