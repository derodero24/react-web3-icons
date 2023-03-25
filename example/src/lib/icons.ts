import * as icon from '../../../.';

const chain = [
  icon.Algorand,
  icon.Algorand2,
  icon.AlgorandMono,
  icon.Astar,
  icon.AstarMono,
  icon.Avalanche,
  icon.Avalanche2,
  icon.BinanceSmartChain,
  icon.BinanceSmartChainMono,
  icon.Bitcoin,
  icon.Bitcoin2,
  icon.BitcoinMono,
  icon.BitcoinMono2,
  icon.Cardano,
  icon.Cardano2,
  icon.CardanoMono,
  icon.Ethereum,
  icon.EthereumMono,
  icon.ImmutableX,
  icon.ImmutableXMono,
  icon.Polkadot,
  icon.PolkadotMono,
  icon.Polygon,
  icon.PolygonMono,
  icon.Solana,
  icon.SolanaMono,
].sort();

const coin = [
  icon.Ada,
  icon.Ada2,
  icon.AdaMono,
  icon.Bnb,
  icon.Btc,
  icon.Btc2,
  icon.BtcMono,
  icon.BtcMono2,
  icon.Cake,
  icon.Eth,
  icon.EthMono,
  icon.Looks,
  icon.Looks2,
  icon.Usdc,
  icon.Usdt,
  icon.Xrp,
  icon.Xrp2,
  icon.XrpMono,
].sort();

const dex = [
  icon.Dydx,
  icon.Dydx2,
  icon.DydxMono,
  icon.PancakeSwap,
  icon.Uniswap,
  icon.UniswapMono,
].sort();

const exchange = [icon.Binance, icon.BinanceMono].sort();

const marketplace = [
  icon.LooksRare,
  icon.LooksRare2,
  icon.LooksRareMono,
  icon.OpenSea,
  icon.OpenSea2,
  icon.OpenSeaMono,
  icon.OpenSeaMono2,
].sort();

const node = [icon.Alchemy, icon.AlchemyMono].sort();

const storage = [icon.Pinata].sort();

const wallet = [
  icon.MetaMask,
  icon.MetaMask2,
  icon.PhantomWallet,
  icon.PhantomWalletMono,
  icon.WalletConnect,
  icon.WalletConnectMono,
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
