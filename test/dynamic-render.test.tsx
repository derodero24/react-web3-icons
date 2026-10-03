// biome-ignore-all lint/style/useNamingConvention: import map keys are icon export names (PascalCase)
import {
  act,
  createElement,
  createRef,
  forwardRef,
  type ReactNode,
} from 'react';
import ReactDOM from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createDynamicIcon,
  type DynamicIconProps,
  type IconImports,
} from '../src/dynamic/DynamicIcon';

// This file drives React through act(); opt the environment in so act() does
// not warn that it is "not configured to support act(...)".
Reflect.set(globalThis, 'IS_REACT_ACT_ENVIRONMENT', true);

// biome-ignore lint/suspicious/noEmptyBlockStatements: intentional noop for mock
function noop() {}

interface TestProps extends DynamicIconProps {
  name?: string | undefined;
}

const roots: ReactDOM.Root[] = [];

afterEach(() => {
  for (const root of roots) {
    act(() => root.unmount());
  }
  roots.length = 0;
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

/** Renders `element` (letting lazy imports settle) and returns the container. */
async function render(element: ReactNode): Promise<{
  container: HTMLDivElement;
  rerender: (next: ReactNode) => Promise<void>;
}> {
  const container = document.createElement('div');
  const root = ReactDOM.createRoot(container);
  roots.push(root);
  await act(() => {
    root.render(element);
  });
  return {
    container,
    rerender: async next => {
      await act(() => {
        root.render(next);
      });
    },
  };
}

// A stub icon, shaped like the createIcon components the modules export.
const StubIcon = forwardRef<SVGSVGElement, Record<string, unknown>>(
  (props, ref) => createElement('svg', { ...props, ref, 'data-stub': '' }),
);

/** A dynamic icon resolving `name` to the export name `exportName`. */
function dynamicIcon(imports: IconImports, exportName: string | null = 'Stub') {
  return createDynamicIcon<TestProps>({
    displayName: 'TestIcon',
    resolve: () => exportName,
    imports,
    identifiers: ['name'],
  });
}

const fallback = createElement('span', null, 'fallback');

describe('createDynamicIcon', () => {
  it('renders the icon once its module has loaded', async () => {
    const Icon = dynamicIcon({
      Stub: () => Promise.resolve({ Stub: StubIcon }),
    });
    const { container } = await render(
      createElement(Icon, { name: 'x', fallback }),
    );
    expect(container.querySelector('svg[data-stub]')).not.toBeNull();
    expect(container.textContent).toBe('');
  });

  it('forwards icon props but not its own props', async () => {
    const Icon = dynamicIcon({
      Stub: () => Promise.resolve({ Stub: StubIcon }),
    });
    const { container } = await render(
      createElement(Icon, {
        name: 'x',
        variant: 'mono',
        fallback,
        width: 32,
        className: 'icon',
      }),
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('32');
    expect(svg?.getAttribute('class')).toBe('icon');
    expect(svg?.hasAttribute('name')).toBe(false);
    expect(svg?.hasAttribute('variant')).toBe(false);
  });

  it('forwards a ref to the loaded <svg>', async () => {
    const Icon = dynamicIcon({
      Stub: () => Promise.resolve({ Stub: StubIcon }),
    });
    const ref = createRef<SVGSVGElement>();
    await render(createElement(Icon, { name: 'x', ref }));
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  it('has the given displayName', () => {
    expect(dynamicIcon({}).displayName).toBe('TestIcon');
  });

  describe('fallback', () => {
    it('renders for an unknown identifier, and nothing without one', async () => {
      vi.spyOn(console, 'warn').mockImplementation(noop);
      const Icon = dynamicIcon({}, null);
      const titled = await render(createElement(Icon, { name: 'a', fallback }));
      expect(titled.container.textContent).toBe('fallback');
      const bare = await render(createElement(Icon, { name: 'a' }));
      expect(bare.container.innerHTML).toBe('');
    });

    it('renders when the import map lacks the export name', async () => {
      vi.spyOn(console, 'warn').mockImplementation(noop);
      const Icon = dynamicIcon({}, 'Unmapped');
      const { container } = await render(createElement(Icon, { fallback }));
      expect(container.textContent).toBe('fallback');
    });

    it('renders when the module lacks the export', async () => {
      vi.spyOn(console, 'warn').mockImplementation(noop);
      const Icon = dynamicIcon({ Stub: () => Promise.resolve({}) });
      const { container } = await render(createElement(Icon, { fallback }));
      expect(container.textContent).toBe('fallback');
      expect(container.querySelector('svg')).toBeNull();
    });

    it('renders when the import fails, and a later render retries', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(noop);
      const error = new Error('chunk failed');
      const load = vi
        .fn<() => Promise<Readonly<Record<string, unknown>>>>()
        .mockRejectedValueOnce(error)
        .mockResolvedValue({ Stub: StubIcon });
      const Icon = dynamicIcon({ Stub: load });

      const { container, rerender } = await render(
        createElement(Icon, { name: 'a', fallback }),
      );
      expect(container.textContent).toBe('fallback');
      expect(container.querySelector('svg')).toBeNull();
      expect(warn).toHaveBeenCalledWith(
        '[react-web3-icons] TestIcon: loading icon "Stub" failed; rendering the fallback until a later render retries.',
        error,
      );

      await rerender(createElement(Icon, { name: 'b', fallback }));
      expect(load).toHaveBeenCalledTimes(2);
      expect(container.querySelector('svg[data-stub]')).not.toBeNull();
    });

    it('retries a chunk that loaded without the export', async () => {
      vi.spyOn(console, 'warn').mockImplementation(noop);
      const load = vi
        .fn<() => Promise<Readonly<Record<string, unknown>>>>()
        .mockResolvedValueOnce({})
        .mockResolvedValue({ Stub: StubIcon });
      const Icon = dynamicIcon({ Stub: load });

      const { container, rerender } = await render(
        createElement(Icon, { name: 'a', fallback }),
      );
      expect(container.textContent).toBe('fallback');

      await rerender(createElement(Icon, { name: 'b', fallback }));
      expect(load).toHaveBeenCalledTimes(2);
      expect(container.querySelector('svg[data-stub]')).not.toBeNull();
    });
  });

  describe('development warnings', () => {
    it('warn once per unknown input', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(noop);
      const Icon = dynamicIcon({}, null);
      await render(createElement(Icon, { name: 'nope' }));
      await render(createElement(Icon, { name: 'nope' }));
      await render(createElement(Icon, { name: undefined }));
      expect(warn.mock.calls).toEqual([
        [
          '[react-web3-icons] TestIcon: no icon for name="nope"; rendering the fallback.',
        ],
        [
          '[react-web3-icons] TestIcon: no icon for name=undefined; rendering the fallback.',
        ],
      ]);
    });

    it('warn once per missing export', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(noop);
      const Icon = dynamicIcon(
        { Missing: () => Promise.resolve({}) },
        'Missing',
      );
      await render(createElement(Icon));
      await render(createElement(dynamicIcon({}, 'Missing')));
      expect(warn.mock.calls).toEqual([
        ['[react-web3-icons] Icon "Missing" not found.'],
      ]);
    });

    it('are silent in production', async () => {
      vi.stubEnv('NODE_ENV', 'production');
      const warn = vi.spyOn(console, 'warn');
      await render(createElement(dynamicIcon({}, null), { name: 'prod' }));
      await render(createElement(dynamicIcon({}, 'ProdUnmapped')));
      await render(
        createElement(
          dynamicIcon(
            { ProdMissing: () => Promise.resolve({}) },
            'ProdMissing',
          ),
        ),
      );
      await render(
        createElement(
          dynamicIcon(
            { ProdFailing: () => Promise.reject(new Error('offline')) },
            'ProdFailing',
          ),
        ),
      );
      expect(warn).not.toHaveBeenCalled();
    });

    it('are silent where no bundler defined process.env.NODE_ENV', async () => {
      vi.stubGlobal('process', undefined);
      const warn = vi.spyOn(console, 'warn');
      const { container } = await render(
        createElement(dynamicIcon({}, null), { name: 'no-process', fallback }),
      );
      vi.unstubAllGlobals();
      expect(container.textContent).toBe('fallback');
      expect(warn).not.toHaveBeenCalled();
    });
  });
});
