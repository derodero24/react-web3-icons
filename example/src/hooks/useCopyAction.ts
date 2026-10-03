'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const COPY_FEEDBACK_MS = 1500;

export type CopyStatus = 'idle' | 'copied' | 'failed';

/**
 * Legacy fallback for contexts without the async Clipboard API (plain HTTP,
 * some embedded webviews). `execCommand('copy')` is deprecated but remains
 * the only synchronous option there.
 */
function copyWithSelection(text: string): boolean {
  const previousFocus =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.append(textarea);
  textarea.select();
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    textarea.remove();
    previousFocus?.focus();
  }
}

async function writeToClipboard(text: string): Promise<boolean> {
  // `navigator.clipboard` is only exposed in secure contexts.
  if ('clipboard' in navigator) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Permission denied or document not focused: try the fallback.
    }
  }
  return copyWithSelection(text);
}

/**
 * Copy text to the clipboard and expose brief success/failure feedback.
 * Never throws; render `<CopyStatusMessage status={status} />` next to the
 * trigger so the result is announced to screen readers.
 */
export function useCopyAction() {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copy = useCallback(async (text: string) => {
    const ok = await writeToClipboard(text);
    setStatus(ok ? 'copied' : 'failed');
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setStatus('idle'), COPY_FEEDBACK_MS);
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    clearTimeout(timerRef.current);
  }, []);

  return { status, copied: status === 'copied', copy, reset };
}
