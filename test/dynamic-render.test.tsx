import { act, createElement, type ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createDynamicIcon } from '../src/dynamic/DynamicIcon';

// biome-ignore lint/suspicious/noEmptyBlockStatements: intentional noop for mock
function noop() {}

/**
 * Synchronously render an element and return the container.
 * Suitable for cases where no lazy resolution is needed.
 */
function renderSync(element: ReactNode): HTMLDivElement {
  const container = document.createElement('div');
  const root = ReactDOM.createRoot(container);
  act(() => {
    root.render(element);
  });
  return container;
}

// Minimal stub icon component used by the fake module
function StubIcon() {
  return createElement('svg', { 'data-testid': 'stub-icon' });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('createDynamicIcon fallback rendering', () => {
  it('renders fallback immediately when resolveExportName returns null', () => {
    const DynIcon = createDynamicIcon<{ name: string }>(
      () => null,
      () => Promise.resolve({}),
      ['name'],
    );

    const container = renderSync(
      createElement(DynIcon, {
        name: 'anything',
        fallback: createElement('span', null, 'loading'),
      }),
    );

    expect(container.innerHTML).toContain('loading');
  });

  it('renders nothing when resolveExportName returns null and no fallback is provided', () => {
    const DynIcon = createDynamicIcon<{ name: string }>(
      () => null,
      () => Promise.resolve({}),
      ['name'],
    );

    const container = renderSync(createElement(DynIcon, { name: 'anything' }));

    expect(container.innerHTML).toBe('');
  });

  it('renders the icon when the export exists in the module', async () => {
    const fakeModule = { testIcon: StubIcon };

    const DynIcon = createDynamicIcon<{ name: string }>(
      () => 'testIcon',
      () => Promise.resolve(fakeModule),
      ['name'],
    );

    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);

    await act(() => {
      root.render(
        createElement(DynIcon, {
          name: 'test',
          fallback: createElement('span', null, 'loading'),
        }),
      );
    });

    expect(container.querySelector('svg')).not.toBeNull();
    expect(container.innerHTML).not.toContain('loading');
    root.unmount();
  });

  it('renders fallback then resolves to empty when export is missing from module', async () => {
    const fakeModule = {}; // No matching export
    vi.spyOn(console, 'warn').mockImplementation(noop);

    const DynIcon = createDynamicIcon<{ name: string }>(
      () => 'MissingIcon',
      () => Promise.resolve(fakeModule),
      ['name'],
    );

    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);

    await act(() => {
      root.render(
        createElement(DynIcon, {
          name: 'test',
          fallback: createElement('span', null, 'fallback-text'),
        }),
      );
    });

    // After resolution, the lazy component renders null (icon not found)
    expect(container.querySelector('svg')).toBeNull();
    root.unmount();
  });

  it('emits a dev-mode console.warn when export is missing from module', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(noop);
    const fakeModule = {};

    const DynIcon = createDynamicIcon<{ name: string }>(
      () => 'NonExistent',
      () => Promise.resolve(fakeModule),
      ['name'],
    );

    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);

    await act(() => {
      root.render(createElement(DynIcon, { name: 'test' }));
    });

    expect(warnSpy).toHaveBeenCalledWith(
      '[react-web3-icons] Icon "NonExistent" not found in module.',
    );
    root.unmount();
  });

  it('warns only once per export name (deduplication)', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(noop);
    const fakeModule = {};

    const DynIcon = createDynamicIcon<{ name: string }>(
      () => 'DuplicateWarnTest',
      () => Promise.resolve(fakeModule),
      ['name'],
    );

    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);

    // Render twice with the same missing export
    await act(() => {
      root.render(createElement(DynIcon, { name: 'first' }));
    });
    await act(() => {
      root.render(createElement(DynIcon, { name: 'second' }));
    });

    const relevant = warnSpy.mock.calls.filter(
      args =>
        typeof args[0] === 'string' && args[0].includes('DuplicateWarnTest'),
    );
    expect(relevant).toHaveLength(1);
    root.unmount();
  });

  it('strips category-specific props before forwarding to the icon', async () => {
    let receivedProps: Record<string, unknown> = {};
    function SpyIcon(props: Record<string, unknown>) {
      receivedProps = props;
      return createElement('svg');
    }

    const fakeModule = { spyExport: SpyIcon };

    const DynIcon = createDynamicIcon<{ name: string }>(
      () => 'spyExport',
      () => Promise.resolve(fakeModule),
      ['name'],
    );

    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);

    await act(() => {
      root.render(
        createElement(DynIcon, {
          name: 'test',
          width: 32,
          height: 32,
        }),
      );
    });

    // 'name' should be stripped, width/height forwarded
    expect(receivedProps).not.toHaveProperty('name');
    expect(receivedProps).toHaveProperty('width', 32);
    expect(receivedProps).toHaveProperty('height', 32);
    root.unmount();
  });
});
