'use client';

import { useEffect, useRef, useState } from 'react';

export function buildImportStatement(name: string): string {
  return `import { ${name} } from 'react-web3-icons';`;
}

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

  const copy = (name: string) => {
    const text = buildImportStatement(name);
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyStatus(`Copied import for ${name}`);
        setCopiedName(name);
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
