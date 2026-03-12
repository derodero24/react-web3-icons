import { createIcon } from '../utils';

const STARKNET_CIRCLE = 'M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0';
const STARKNET_STAR =
  'm8.029 9.88.222-.686a.45.45 0 0 1 .296-.29l.69-.213a.102.102 0 0 0 0-.195l-.686-.222a.45.45 0 0 1-.29-.295l-.213-.69c-.029-.095-.164-.096-.194-.001l-.222.686a.45.45 0 0 1-.296.291l-.69.212a.102.102 0 0 0-.001.195l.686.222a.45.45 0 0 1 .292.296l.211.689c.03.095.164.097.195.002';
const STARKNET_SNAKE_A =
  'M18.931 9.481c-.284-.318-.728-.497-1.16-.57a4 4 0 0 0-1.32.012c-.868.147-1.657.507-2.346.95-.357.218-.662.47-.978.727-.152.13-.29.268-.435.404l-.395.393a16 16 0 0 1-1.26 1.195c-.411.337-.795.593-1.174.771-.378.18-.783.286-1.31.303-.523.018-1.142-.076-1.803-.232-.665-.155-1.364-.376-2.145-.566a6.4 6.4 0 0 0 1.21 2.034c.532.6 1.198 1.146 2.052 1.506a4.97 4.97 0 0 0 2.89.3c.993-.191 1.864-.65 2.568-1.181a9.2 9.2 0 0 0 1.758-1.783c.133-.176.203-.274.299-.411l.266-.394c.184-.244.353-.52.535-.762.359-.505.712-1.01 1.123-1.475.206-.236.424-.461.681-.678.129-.106.268-.21.421-.303.156-.1.32-.18.523-.24';
const STARKNET_SNAKE_B =
  'M18.931 9.48c-.305-.77-.873-1.419-1.635-1.898a4.02 4.02 0 0 0-2.853-.509c-.515.1-1.014.292-1.452.547a6 6 0 0 0-1.165.89 9 9 0 0 0-.474.509l-.395.503-.61.81c-.776 1.042-1.613 2.263-2.986 2.625-1.348.355-1.933.04-2.756-.09.15.389.337.766.59 1.098.248.338.54.656.905.929.184.13.378.26.594.37.214.105.446.199.693.269a4 4 0 0 0 1.581.11 4.8 4.8 0 0 0 1.497-.468 6.3 6.3 0 0 0 1.196-.783 9.6 9.6 0 0 0 1.699-1.867q.344-.487.634-.984l.227-.392q.105-.174.212-.338c.289-.432.571-.778.914-1.039.339-.266.81-.463 1.439-.51.627-.046 1.35.04 2.145.219';
const STARKNET_DOT =
  'M15.541 15.885a1.026 1.026 0 1 0 2.051 0 1.026 1.026 0 0 0-2.051 0';

/** Stark Net chain icon (colored). */
export const StarkNet = createIcon('StarkNet', '0 0 24 24', _id => (
  <>
    <path
      d={STARKNET_CIRCLE}
      fill="#0C0C4F"
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <path
      d={STARKNET_STAR}
      fill="#FAFAFA"
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <path
      d={STARKNET_SNAKE_A}
      fill={`url(#${_id}-grad)`}
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <path
      d={STARKNET_SNAKE_B}
      fill="#FAFAFA"
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <path
      d={STARKNET_DOT}
      fill="#EC796B"
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient
        id={`${_id}-grad`}
        x1="20.903"
        x2="-13.607"
        y1="3.792"
        y2="13.742"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EC796B" />
        <stop offset="1" stopColor="#D672EF" />
      </linearGradient>
    </defs>
  </>
));

/** Stark Net chain icon (monochrome). */
export const StarkNetMono = createIcon(
  'StarkNetMono',
  '0 0 24 24',
  _id => (
    <>
      <path
        d={STARKNET_CIRCLE}
        mask={`url(#${_id}-a)`}
        fillRule="evenodd"
        clipRule="evenodd"
      />
      <defs>
        <mask id={`${_id}-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000" fillRule="evenodd" clipRule="evenodd">
            <path d={STARKNET_STAR} />
            <path d={STARKNET_SNAKE_A} />
            <path d={STARKNET_SNAKE_B} />
            <path d={STARKNET_DOT} />
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);

// Circle variant: 24×24 content scaled to ~46px centered in 64×64
// Gradient coordinates pre-computed: new = 9 + original * 1.917
const STARKNET_CIRCLE_TX = 'translate(9 9) scale(1.917)';

/** Stark Net Circle chain icon (colored). */
export const StarkNetCircle = createIcon('StarkNetCircle', '0 0 64 64', _id => (
  <>
    <circle cx="32" cy="32" r="32" fill="#0C0C4F" />
    <g transform={STARKNET_CIRCLE_TX} fillRule="evenodd" clipRule="evenodd">
      <path d={STARKNET_STAR} fill="#FAFAFA" />
      <path d={STARKNET_SNAKE_A} fill={`url(#${_id}-snkc-grad)`} />
      <path d={STARKNET_SNAKE_B} fill="#FAFAFA" />
      <path d={STARKNET_DOT} fill="#EC796B" />
    </g>
    <defs>
      <linearGradient
        id={`${_id}-snkc-grad`}
        x1="49.07"
        x2="-17.08"
        y1="16.27"
        y2="35.34"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EC796B" />
        <stop offset="1" stopColor="#D672EF" />
      </linearGradient>
    </defs>
  </>
));

/** Stark Net Square chain icon (colored). */
export const StarkNetSquare = createIcon('StarkNetSquare', '0 0 64 64', _id => (
  <>
    <rect width="64" height="64" rx="12.8" fill="#0C0C4F" />
    <g transform={STARKNET_CIRCLE_TX} fillRule="evenodd" clipRule="evenodd">
      <path d={STARKNET_STAR} fill="#FAFAFA" />
      <path d={STARKNET_SNAKE_A} fill={`url(#${_id}-snks-grad)`} />
      <path d={STARKNET_SNAKE_B} fill="#FAFAFA" />
      <path d={STARKNET_DOT} fill="#EC796B" />
    </g>
    <defs>
      <linearGradient
        id={`${_id}-snks-grad`}
        x1="49.07"
        x2="-17.08"
        y1="16.27"
        y2="35.34"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EC796B" />
        <stop offset="1" stopColor="#D672EF" />
      </linearGradient>
    </defs>
  </>
));

/** Stark Net Square chain icon (monochrome). */
export const StarkNetSquareMono = createIcon(
  'StarkNetSquareMono',
  '0 0 64 64',
  _id => (
    <>
      <rect width="64" height="64" rx="12.8" mask={`url(#${_id}-snksm-a)`} />
      <defs>
        <mask id={`${_id}-snksm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g
            transform={STARKNET_CIRCLE_TX}
            fill="#000"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d={STARKNET_STAR} />
            <path d={STARKNET_SNAKE_A} />
            <path d={STARKNET_SNAKE_B} />
            <path d={STARKNET_DOT} />
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);

/** Stark Net Circle chain icon (monochrome). */
export const StarkNetCircleMono = createIcon(
  'StarkNetCircleMono',
  '0 0 64 64',
  _id => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-snkcm-a)`} />
      <defs>
        <mask id={`${_id}-snkcm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g
            transform={STARKNET_CIRCLE_TX}
            fill="#000"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d={STARKNET_STAR} />
            <path d={STARKNET_SNAKE_A} />
            <path d={STARKNET_SNAKE_B} />
            <path d={STARKNET_DOT} />
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
