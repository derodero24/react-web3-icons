import type { CopyStatus } from '../../hooks/useCopyAction';

const MESSAGES: Record<CopyStatus, string> = {
  idle: '',
  copied: 'Copied to clipboard',
  failed: 'Copy failed. Select the text and copy it manually.',
};

/**
 * Visually hidden live region announcing the result of a copy action.
 * Keep it mounted (it renders empty while idle) so changes are announced.
 */
export default function CopyStatusMessage({
  status,
  copiedMessage = MESSAGES.copied,
  failedMessage = MESSAGES.failed,
}: {
  status: CopyStatus;
  copiedMessage?: string;
  /** Override when the copied text is not visible on the page. */
  failedMessage?: string;
}) {
  const message =
    status === 'copied'
      ? copiedMessage
      : status === 'failed'
        ? failedMessage
        : MESSAGES.idle;
  return (
    <span role="status" className="sr-only">
      {message}
    </span>
  );
}
