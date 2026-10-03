import {
  act,
  type ComponentType,
  createRef,
  type ReactElement,
  type RefAttributes,
} from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LayerZero, LayerZeroMono } from '../src/bridge';
import {
  ArbitrumNovaFlat,
  Base,
  Ethereum,
  EthereumCircle,
  EthereumMono,
} from '../src/chain';
import { BtcCircleMono, Eth, EthMono } from '../src/coin';
import { Aave, AaveMono } from '../src/defi';
import { Uniswap, UniswapMono } from '../src/dex';
import * as dynamic from '../src/dynamic';
import type { DynamicIconProps } from '../src/dynamic/DynamicIcon';
import { bridgeImports } from '../src/dynamic/imports/bridge';
import { chainImports } from '../src/dynamic/imports/chain';
import { coinImports } from '../src/dynamic/imports/coin';
import { defiImports } from '../src/dynamic/imports/defi';
import { dexImports } from '../src/dynamic/imports/dex';
import { exchangeImports } from '../src/dynamic/imports/exchange';
import { oracleImports } from '../src/dynamic/imports/oracle';
import { walletImports } from '../src/dynamic/imports/wallet';
import { Binance, BinanceMono, BybitInverted } from '../src/exchange';
import { Pyth, PythMono } from '../src/oracle';
import type { IconProps } from '../src/utils';
import {
  BackpackWallet,
  MetaMask,
  MetaMaskMono,
  PhantomWalletSymbolMono,
} from '../src/wallet';

/**
 * Renders every public component of `react-web3-icons/dynamic` through a
 * real React root: identifier resolution, the `mono` variant, prop
 * forwarding, the fallback for unknown identifiers, and reuse of the loaded
 * component on remount.
 */

// This file drives React through act(); opt the environment in so act() does
// not warn that it is "not configured to support act(...)".
Reflect.set(globalThis, 'IS_REACT_ACT_ENVIRONMENT', true);

type ImportMap = Readonly<
  Record<string, () => Promise<Record<string, unknown>>>
>;
type DynamicName = keyof typeof dynamic;

interface DynamicSpec<P> {
  /** Props that resolve to `exportName`. */
  readonly props: P;
  /** Props carrying an identifier the category does not know. */
  readonly unknownProps: P;
  readonly exportName: string;
  readonly icon: ComponentType<IconProps>;
  readonly monoIcon: ComponentType<IconProps>;
  readonly imports: ImportMap;
}

const roots: Root[] = [];

afterEach(() => {
  act(() => {
    for (const root of roots) {
      root.unmount();
    }
  });
  roots.length = 0;
});

function mount(): { container: HTMLDivElement; root: Root } {
  const container = document.createElement('div');
  const root = createRoot(container);
  roots.push(root);
  return { container, root };
}

/**
 * Loads the icon chunk before rendering so React.lazy resolves inside the
 * act() scope instead of pinging the root after the test has moved on.
 */
async function preload(imports: ImportMap, exportName: string): Promise<void> {
  const load = imports[exportName];
  if (!load) {
    throw new Error(`${exportName} is missing from the import map`);
  }
  await load();
}

const FALLBACK = <span data-testid="fallback" />;
const FALLBACK_HTML = renderToStaticMarkup(FALLBACK);

const exportedComponents = new Map<string, unknown>(Object.entries(dynamic));
const described: DynamicName[] = [];

/** Props every dynamic component accepts besides its identifier. */
type SharedProps = Pick<
  DynamicIconProps<string>,
  'variant' | 'fallback' | 'width' | 'className'
>;

// biome-ignore lint/suspicious/noEmptyBlockStatements: intentional noop for mock
function noop() {}

function describeDynamicIcon<P extends SharedProps>(
  name: DynamicName,
  Component: ComponentType<P & RefAttributes<SVGSVGElement>>,
  spec: DynamicSpec<P>,
): void {
  described.push(name);
  const {
    props,
    unknownProps,
    exportName,
    icon: Icon,
    monoIcon: MonoIcon,
  } = spec;

  describe(name, () => {
    it('is the component exported under this name', () => {
      expect(exportedComponents.get(name)).toBe(Component);
    });

    it(`is called ${name} in React DevTools`, () => {
      expect(Component.displayName).toBe(name);
    });

    it('forwards a ref to the <svg>', async () => {
      await preload(spec.imports, exportName);
      const ref = createRef<SVGSVGElement>();
      const { container, root } = mount();
      await act(() => {
        root.render(<Component {...props} ref={ref} />);
      });
      expect(ref.current).toBeInstanceOf(SVGSVGElement);
      expect(ref.current).toBe(container.querySelector('svg'));
    });

    it(`resolves to ${exportName} and forwards icon props`, async () => {
      await preload(spec.imports, exportName);
      const { container, root } = mount();
      await act(() => {
        root.render(
          <Component
            {...props}
            fallback={FALLBACK}
            width={32}
            className="dyn"
          />,
        );
      });
      // Identical markup also proves name/variant/fallback were stripped.
      expect(container.innerHTML).toBe(
        renderToStaticMarkup(<Icon width={32} className="dyn" />),
      );
    });

    it(`resolves variant="mono" to ${exportName}Mono`, async () => {
      await preload(spec.imports, `${exportName}Mono`);
      const { container, root } = mount();
      await act(() => {
        root.render(<Component {...props} variant="mono" />);
      });
      expect(container.innerHTML).toBe(renderToStaticMarkup(<MonoIcon />));
    });

    it('reuses the loaded component on remount without suspending', async () => {
      await preload(spec.imports, exportName);
      const first = mount();
      await act(() => {
        first.root.render(<Component {...props} />);
      });
      // A synchronous act() cannot wait for a lazy chunk: the icon only
      // renders here if the resolved component was cached by name.
      const second = mount();
      act(() => {
        second.root.render(<Component {...props} fallback={FALLBACK} />);
      });
      expect(second.container.innerHTML).toBe(renderToStaticMarkup(<Icon />));
    });

    it('renders the fallback for an unknown identifier', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(noop);
      const { container, root } = mount();
      act(() => {
        root.render(<Component {...unknownProps} fallback={FALLBACK} />);
      });
      expect(container.innerHTML).toBe(FALLBACK_HTML);
      expect(warn).toHaveBeenCalledWith(
        expect.stringMatching(
          new RegExp(`^\\[react-web3-icons\\] ${name}: no icon for `),
        ),
      );
      warn.mockRestore();
    });

    it('renders nothing for an unknown identifier without a fallback', () => {
      vi.spyOn(console, 'warn').mockImplementation(noop);
      const { container, root } = mount();
      act(() => {
        root.render(<Component {...unknownProps} />);
      });
      expect(container.innerHTML).toBe('');
    });
  });
}

describeDynamicIcon('ChainIcon', dynamic.ChainIcon, {
  props: { name: 'ethereum' },
  unknownProps: { name: 'not-a-chain' },
  exportName: 'Ethereum',
  icon: Ethereum,
  monoIcon: EthereumMono,
  imports: chainImports,
});

describeDynamicIcon('CoinIcon', dynamic.CoinIcon, {
  props: { symbol: 'ETH' },
  unknownProps: { symbol: 'NOT-A-COIN' },
  exportName: 'Eth',
  icon: Eth,
  monoIcon: EthMono,
  imports: coinImports,
});

describeDynamicIcon('WalletIcon', dynamic.WalletIcon, {
  props: { name: 'metamask' },
  unknownProps: { name: 'not-a-wallet' },
  exportName: 'MetaMask',
  icon: MetaMask,
  monoIcon: MetaMaskMono,
  imports: walletImports,
});

describeDynamicIcon('ExchangeIcon', dynamic.ExchangeIcon, {
  props: { name: 'binance' },
  unknownProps: { name: 'not-an-exchange' },
  exportName: 'Binance',
  icon: Binance,
  monoIcon: BinanceMono,
  imports: exchangeImports,
});

describeDynamicIcon('DefiIcon', dynamic.DefiIcon, {
  props: { name: 'aave' },
  unknownProps: { name: 'not-a-protocol' },
  exportName: 'Aave',
  icon: Aave,
  monoIcon: AaveMono,
  imports: defiImports,
});

describeDynamicIcon('DexIcon', dynamic.DexIcon, {
  props: { name: 'uniswap' },
  unknownProps: { name: 'not-a-dex' },
  exportName: 'Uniswap',
  icon: Uniswap,
  monoIcon: UniswapMono,
  imports: dexImports,
});

describeDynamicIcon('BridgeIcon', dynamic.BridgeIcon, {
  props: { name: 'layerzero' },
  unknownProps: { name: 'not-a-bridge' },
  exportName: 'LayerZero',
  icon: LayerZero,
  monoIcon: LayerZeroMono,
  imports: bridgeImports,
});

describeDynamicIcon('OracleIcon', dynamic.OracleIcon, {
  props: { name: 'pyth' },
  unknownProps: { name: 'not-an-oracle' },
  exportName: 'Pyth',
  icon: Pyth,
  monoIcon: PythMono,
  imports: oracleImports,
});

describe('ChainIcon by chain ID', () => {
  it('resolves chainId and lets it take precedence over name', async () => {
    await preload(chainImports, 'Base');
    const { container, root } = mount();
    await act(() => {
      root.render(<dynamic.ChainIcon chainId={8453} name="ethereum" />);
    });
    expect(container.innerHTML).toBe(renderToStaticMarkup(<Base />));
  });

  it('falls back to name when chainId is unknown', async () => {
    await preload(chainImports, 'Base');
    const { container, root } = mount();
    await act(() => {
      root.render(<dynamic.ChainIcon chainId={999_999} name="base" />);
    });
    expect(container.innerHTML).toBe(renderToStaticMarkup(<Base />));
  });
});

describe('variants', () => {
  const cases: [
    string,
    () => ReactElement,
    ComponentType,
    ImportMap,
    string,
  ][] = [
    [
      'ChainIcon variant="Circle"',
      () => <dynamic.ChainIcon name="ethereum" variant="Circle" />,
      EthereumCircle,
      chainImports,
      'EthereumCircle',
    ],
    [
      'ChainIcon of a variant lookup, variant="Flat"',
      () => <dynamic.ChainIcon name="Arbitrum Nova" variant="Flat" />,
      ArbitrumNovaFlat,
      chainImports,
      'ArbitrumNovaFlat',
    ],
    [
      'CoinIcon variant="CircleMono"',
      () => <dynamic.CoinIcon symbol="btc" variant="CircleMono" />,
      BtcCircleMono,
      coinImports,
      'BtcCircleMono',
    ],
    [
      'WalletIcon variant="SymbolMono"',
      () => <dynamic.WalletIcon name="phantom" variant="SymbolMono" />,
      PhantomWalletSymbolMono,
      walletImports,
      'PhantomWalletSymbolMono',
    ],
    [
      'ExchangeIcon variant="Inverted"',
      () => <dynamic.ExchangeIcon name="bybit" variant="Inverted" />,
      BybitInverted,
      exchangeImports,
      'BybitInverted',
    ],
  ];

  it.each(cases)('%s', async (_, element, Icon, imports, exportName) => {
    await preload(imports, exportName);
    const { container, root } = mount();
    await act(() => {
      root.render(element());
    });
    expect(container.innerHTML).toBe(renderToStaticMarkup(<Icon />));
  });

  it('renders the fallback when the icon lacks the variant', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(noop);
    const { container, root } = mount();
    act(() => {
      root.render(
        <dynamic.ChainIcon name="aptos" variant="Circle" fallback={FALLBACK} />,
      );
    });
    expect(container.innerHTML).toBe(FALLBACK_HTML);
    expect(warn).toHaveBeenCalledWith(
      '[react-web3-icons] ChainIcon: Aptos has no "Circle" variant; rendering the fallback.',
    );
    warn.mockRestore();
  });

  it('renders the fallback for a variant the category does not ship', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(noop);
    const { container, root } = mount();
    act(() => {
      root.render(
        // @ts-expect-error DefiIcon has no Circle variant
        <dynamic.DefiIcon name="aave" variant="Circle" fallback={FALLBACK} />,
      );
    });
    expect(container.innerHTML).toBe(FALLBACK_HTML);
    expect(warn).toHaveBeenCalledWith(
      '[react-web3-icons] DefiIcon: unknown variant "Circle" (expected one of "colored", "mono"); rendering the fallback.',
    );
    warn.mockRestore();
  });
});

describe('connector ids and aliases', () => {
  it('resolves a wallet connector id', async () => {
    await preload(walletImports, 'BackpackWallet');
    const { container, root } = mount();
    await act(() => {
      root.render(<dynamic.WalletIcon name="backpack" />);
    });
    expect(container.innerHTML).toBe(renderToStaticMarkup(<BackpackWallet />));
  });

  it('resolves a manifest alias', async () => {
    await preload(bridgeImports, 'LayerZero');
    const { container, root } = mount();
    await act(() => {
      root.render(<dynamic.BridgeIcon name="LZ" />);
    });
    expect(container.innerHTML).toBe(renderToStaticMarkup(<LayerZero />));
  });
});

describe('identifiers from untyped data', () => {
  // Each element is typed wrongly on purpose: TypeScript rejects it, but
  // untyped API data reaches the component all the same.
  const cases: [string, () => ReactElement][] = [
    [
      'CoinIcon symbol={undefined}',
      () => (
        // @ts-expect-error a missing symbol
        <dynamic.CoinIcon symbol={undefined} fallback={FALLBACK} />
      ),
    ],
    [
      'CoinIcon symbol={null}',
      () => (
        // @ts-expect-error a null symbol
        <dynamic.CoinIcon symbol={null} fallback={FALLBACK} />
      ),
    ],
    [
      'WalletIcon name={1}',
      () => (
        // @ts-expect-error a numeric name
        <dynamic.WalletIcon name={1} fallback={FALLBACK} />
      ),
    ],
    [
      'DexIcon name={undefined}',
      () => (
        // @ts-expect-error a missing name
        <dynamic.DexIcon name={undefined} fallback={FALLBACK} />
      ),
    ],
    [
      'ChainIcon name={1}',
      () => (
        // @ts-expect-error a numeric name
        <dynamic.ChainIcon name={1} fallback={FALLBACK} />
      ),
    ],
  ];

  it.each(cases)(
    '%s renders the fallback instead of throwing',
    (_, element) => {
      vi.spyOn(console, 'warn').mockImplementation(noop);
      const { container, root } = mount();
      act(() => {
        root.render(element());
      });
      expect(container.innerHTML).toBe(FALLBACK_HTML);
    },
  );

  it('ChainIcon still resolves chainId next to a null name', async () => {
    await preload(chainImports, 'Base');
    const { container, root } = mount();
    await act(() => {
      // @ts-expect-error untyped API data can pass null
      root.render(<dynamic.ChainIcon chainId={8453} name={null} />);
    });
    expect(container.innerHTML).toBe(renderToStaticMarkup(<Base />));
  });
});

describe('react-web3-icons/dynamic', () => {
  it('every exported component is covered above', () => {
    expect(Object.keys(dynamic).sort()).toEqual([...described].sort());
  });
});
