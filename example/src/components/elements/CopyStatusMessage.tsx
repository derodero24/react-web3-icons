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
}: {
  status: CopyStatus;
  copiedMessage?: string;
}) {
  return (
    <span role="status" className="sr-only">
      {status === 'copied' ? copiedMessage : MESSAGES[status]}
    </span>
  );
}
