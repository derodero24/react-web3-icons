'use client';

import { useEffect, useRef, useState } from 'react';

export function useCopy() {
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const statusTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => {
      clearTimeout(copiedTimer.current);
      clearTimeout(statusTimer.current);
    };
  }, []);

  const copy = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopyStatus(`Copied ${value}`);
        setCopiedName(value);
        clearTimeout(copiedTimer.current);
        copiedTimer.current = setTimeout(() => setCopiedName(null), 1_500);
        clearTimeout(statusTimer.current);
        statusTimer.current = setTimeout(() => setCopyStatus(''), 2_000);
      })
      // biome-ignore lint/suspicious/noConsole: legitimate error reporting for clipboard API
      .catch(console.error);
  };

  return { copy, copiedName, copyStatus };
}
