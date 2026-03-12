import { createIcon } from '../utils';

// Liquity V2 logo: light-blue circle + indigo column/arc overlay
const liquityContent = () => (
  <>
    <path
      d="M40 20C40 31.0467 31.045 40 20 40C8.955 40 0 31.0467 0 20C0 8.955 8.955 0 20 0C31.045 0 40 8.955 40 20Z"
      fill="#95CBF3"
    />
    <path
      d="M0 19.9999C0 28.7082 5.56667 36.1165 13.3333 38.8615V1.13818C5.56667 3.88318 0 11.2915 0 19.9999ZM38.87 13.3582C38.5083 13.3415 38.145 13.3332 37.7783 13.3332C24.2783 13.3332 13.3333 24.2782 13.3333 37.7782C13.3333 38.1448 13.3417 38.5082 13.3583 38.8698C15.4367 39.6032 17.6717 39.9998 20 39.9998C31.045 39.9998 40 31.0465 40 19.9998C40 17.6715 39.6017 15.4365 38.87 13.3582Z"
      fill="#405AE5"
    />
  </>
);

/** Liquity DeFi icon (colored). */
export const Liquity = createIcon('Liquity', '0 0 40 40', liquityContent);

/** Liquity DeFi icon (monochrome). */
export const LiquityMono = createIcon(
  'LiquityMono',
  '0 0 40 40',
  _id => (
    <>
      <circle cx="20" cy="20" r="20" mask={`url(#${_id}-lqty-a)`} />
      <defs>
        <mask id={`${_id}-lqty-a`}>
          <rect width="40" height="40" fill="#fff" />
          {/* indigo overlay paths become transparent cutout in mono */}
          <path
            d="M0 19.9999C0 28.7082 5.56667 36.1165 13.3333 38.8615V1.13818C5.56667 3.88318 0 11.2915 0 19.9999ZM38.87 13.3582C38.5083 13.3415 38.145 13.3332 37.7783 13.3332C24.2783 13.3332 13.3333 24.2782 13.3333 37.7782C13.3333 38.1448 13.3417 38.5082 13.3583 38.8698C15.4367 39.6032 17.6717 39.9998 20 39.9998C31.045 39.9998 40 31.0465 40 19.9998C40 17.6715 39.6017 15.4365 38.87 13.3582Z"
            fill="#000"
          />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
