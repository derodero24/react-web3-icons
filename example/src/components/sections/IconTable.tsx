'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import * as icons from '../../../..';
import { REACT_WEB3_ICONS } from '../../utils/icons';
import SearchForm from '../elements/SearchForm';

type IconName = Extract<keyof typeof icons, string>;

const iconMap = icons as Record<IconName, (typeof icons)[IconName]>;

export default function IconTable() {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('');
  const [tipShowed, setTipShowed] = useState<Record<string, boolean>>({});
  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    return () => {
      for (const id of Object.values(timers.current)) {
        clearTimeout(id);
      }
    };
  }, []);

  const category = useMemo<keyof typeof REACT_WEB3_ICONS>(() => {
    const param = searchParams.get('category');
    if (param && param in REACT_WEB3_ICONS) {
      return param as keyof typeof REACT_WEB3_ICONS;
    }
    return 'all';
  }, [searchParams]);

  const displayedIcons = useMemo(
    () =>
      (REACT_WEB3_ICONS[category] as IconName[])
        .filter(name => name.toLowerCase().includes(keyword.toLowerCase()))
        .map(name => ({ name, component: iconMap[name] })),
    [category, keyword],
  );

  const copy = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setTipShowed(prev => ({ ...prev, [value]: true }));
        clearTimeout(timers.current[value]);
        timers.current[value] = setTimeout(
          () => setTipShowed(prev => ({ ...prev, [value]: false })),
          2_000,
        );
      })
      // biome-ignore lint/suspicious/noConsole: legitimate error reporting for clipboard API
      .catch(console.error);
  };

  return (
    <section className="relative mb-24 ml-72 mr-8 mt-12">
      <p className="font-orbitron text-3xl font-bold capitalize">{category}</p>

      <SearchForm keyword={keyword} setKeyword={setKeyword} />

      <div className="mt-6 flex flex-wrap gap-x-3 gap-y-4">
        {displayedIcons.map((icon, idx) => (
          <div key={idx} className="relative">
            <button
              type="button"
              aria-label={`Copy ${icon.name}`}
              className="mx-auto flex aspect-square w-20 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm duration-100 hover:bg-gray-100 dark:border-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500/80"
              onClick={() => copy(icon.name)}
            >
              <icon.component className="text-4xl drop-shadow transition-shadow duration-100 dark:drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)]" />
            </button>
            <p className="mt-0.5 w-24 overflow-hidden text-ellipsis text-center text-xs font-medium">
              {icon.name}
            </p>

            <div
              className={
                'absolute -top-7 left-1/2 -translate-x-1/2 duration-150 ' +
                (tipShowed[icon.name] ? '' : 'translate-y-2 opacity-0')
              }
            >
              <div className="flex h-6 w-20 items-center justify-center rounded border border-gray-200 bg-white font-orbitron text-sm font-bold shadow-sm duration-100 dark:border-gray-500 dark:bg-gray-600">
                Copied !!
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
