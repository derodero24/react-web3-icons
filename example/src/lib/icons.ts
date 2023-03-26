import * as icon from '../../../.';

const chain = [
  { name: 'Algorand', component: icon.Algorand },
  { name: 'Algorand2', component: icon.Algorand2 },
  { name: 'AlgorandMono', component: icon.AlgorandMono },
  { name: 'Astar', component: icon.Astar },
  { name: 'AstarMono', component: icon.AstarMono },
  { name: 'Avalanche', component: icon.Avalanche },
  { name: 'Avalanche2', component: icon.Avalanche2 },
  { name: 'BinanceSmartChain', component: icon.BinanceSmartChain },
  { name: 'BinanceSmartChainMono', component: icon.BinanceSmartChainMono },
  { name: 'Bitcoin', component: icon.Bitcoin },
  { name: 'Bitcoin2', component: icon.Bitcoin2 },
  { name: 'BitcoinMono', component: icon.BitcoinMono },
  { name: 'BitcoinMono2', component: icon.BitcoinMono2 },
  { name: 'Cardano', component: icon.Cardano },
  { name: 'Cardano2', component: icon.Cardano2 },
  { name: 'CardanoMono', component: icon.CardanoMono },
  { name: 'Ethereum', component: icon.Ethereum },
  { name: 'EthereumMono', component: icon.EthereumMono },
  { name: 'ImmutableX', component: icon.ImmutableX },
  { name: 'ImmutableXMono', component: icon.ImmutableXMono },
  { name: 'Polkadot', component: icon.Polkadot },
  { name: 'PolkadotMono', component: icon.PolkadotMono },
  { name: 'Polygon', component: icon.Polygon },
  { name: 'PolygonMono', component: icon.PolygonMono },
  { name: 'Solana', component: icon.Solana },
  { name: 'SolanaMono', component: icon.SolanaMono },
].sort();

const coin = [
  { name: 'Ada', component: icon.Ada },
  { name: 'Ada2', component: icon.Ada2 },
  { name: 'AdaMono', component: icon.AdaMono },
  { name: 'Bnb', component: icon.Bnb },
  { name: 'Btc', component: icon.Btc },
  { name: 'Btc2', component: icon.Btc2 },
  { name: 'BtcMono', component: icon.BtcMono },
  { name: 'BtcMono2', component: icon.BtcMono2 },
  { name: 'Cake', component: icon.Cake },
  { name: 'Eth', component: icon.Eth },
  { name: 'EthMono', component: icon.EthMono },
  { name: 'Looks', component: icon.Looks },
  { name: 'Looks2', component: icon.Looks2 },
  { name: 'Usdc', component: icon.Usdc },
  { name: 'Usdt', component: icon.Usdt },
  { name: 'UsdtMono', component: icon.UsdtMono },
  { name: 'Xrp', component: icon.Xrp },
  { name: 'Xrp2', component: icon.Xrp2 },
  { name: 'XrpMono', component: icon.XrpMono },
].sort();

const dex = [
  { name: 'Dydx', component: icon.Dydx },
  { name: 'Dydx2', component: icon.Dydx2 },
  { name: 'DydxMono', component: icon.DydxMono },
  { name: 'PancakeSwap', component: icon.PancakeSwap },
  { name: 'Uniswap', component: icon.Uniswap },
  { name: 'UniswapMono', component: icon.UniswapMono },
].sort();

const exchange = [
  { name: 'Binance', component: icon.Binance },
  { name: 'BinanceMono', component: icon.BinanceMono },
].sort();

const marketplace = [
  { name: 'LooksRare', component: icon.LooksRare },
  { name: 'LooksRare2', component: icon.LooksRare2 },
  { name: 'LooksRareMono', component: icon.LooksRareMono },
  { name: 'OpenSea', component: icon.OpenSea },
  { name: 'OpenSea2', component: icon.OpenSea2 },
  { name: 'OpenSeaMono', component: icon.OpenSeaMono },
  { name: 'OpenSeaMono2', component: icon.OpenSeaMono2 },
  { name: 'TofuNft', component: icon.TofuNft },
  { name: 'TofuNftMono', component: icon.TofuNftMono },
].sort();

const node = [
  { name: 'Alchemy', component: icon.Alchemy },
  { name: 'AlchemyMono', component: icon.AlchemyMono },
].sort();

const storage = [{ name: 'Pinata', component: icon.Pinata }].sort();

const wallet = [
  { name: 'MetaMask', component: icon.MetaMask },
  { name: 'MetaMask2', component: icon.MetaMask2 },
  { name: 'PhantomWallet', component: icon.PhantomWallet },
  { name: 'PhantomWalletMono', component: icon.PhantomWalletMono },
  { name: 'WalletConnect', component: icon.WalletConnect },
  { name: 'WalletConnectMono', component: icon.WalletConnectMono },
].sort();

export const REACT_WEB3_ICONS = {
  all: [
    ...chain,
    ...coin,
    ...dex,
    ...exchange,
    ...marketplace,
    ...node,
    ...storage,
    ...wallet,
  ].sort(),
  chain,
  coin,
  dex,
  exchange,
  marketplace,
  node,
  storage,
  wallet,
};
