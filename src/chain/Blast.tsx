import { createIcon } from '../utils';

const blastContent = () => (
  <>
    <path d="m17.183 11.894 2.838-1.415L21 7.476l-1.957-1.424H6.013L3 8.29h15.316l-.813 2.518H11.36l-.591 1.841h6.142l-1.725 5.3 2.878-1.425 1.026-3.177-1.927-1.415z" />
    <path d="m7.33 15.67 1.774-5.521-1.967-1.473-2.955 9.271h11.005l.737-2.276z" />
  </>
);

export const Blast = createIcon('Blast', '0 0 24 24', blastContent, '#FCFC03');

export const BlastMono = createIcon(
  'BlastMono',
  '0 0 24 24',
  blastContent,
  'currentColor',
);
