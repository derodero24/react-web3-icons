'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const COPY_FEEDBACK_MS = 1500;

/** Copy text to clipboard and show brief success feedback. */
export function useCopyAction() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copy = useCallback((text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
      })
      // biome-ignore lint/suspicious/noConsole: clipboard error
      .catch(console.error);
  }, []);

  const reset = useCallback(() => {
    setCopied(false);
    clearTimeout(timerRef.current);
  }, []);

  return { copied, copy, reset };
}
