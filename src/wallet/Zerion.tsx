import { createIcon } from '../utils';

// Source: https://zerion.io
/** Zerion Circle wallet icon (colored). */
export const ZerionCircle = /* @__PURE__ */ createIcon(
  'ZerionCircle',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.0625)">
      <rect width="1024" height="1024" fill={`url(#${_id}-zr-a)`} rx="512" />
      <path
        fill="#fff"
        d="M258.644 288c-15.355 0-21.271 18.987-8.387 26.918l322.327 194.353c8.036 4.946 18.751 2.992 24.283-4.43L738.586 318.79c9.635-12.925-.1-30.79-16.779-30.79zm506.608 448c15.352 0 21.422-19.09 8.54-27.019L451.371 514.652c-8.034-4.945-18.49-2.743-24.021 4.677L285.356 705.344c-9.633 12.922.407 30.656 17.082 30.656z"
      />
      <defs>
        <linearGradient
          id={`${_id}-zr-a`}
          x1="0"
          x2="1209.97"
          y1="0"
          y2="704.7"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2962ef" />
          <stop offset="1" stopColor="#255ce5" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Zerion Square wallet icon (colored). */
export const ZerionSquare = /* @__PURE__ */ createIcon(
  'ZerionSquare',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#16161a"
        d="M-.007 17.195c0-5.975 0-8.963 1.162-11.244a10.68 10.68 0 0 1 4.663-4.663C8.1.126 11.088.126 17.062.126h29.856c5.974 0 8.963 0 11.244 1.162a10.68 10.68 0 0 1 4.663 4.663c1.163 2.282 1.163 5.27 1.163 11.244v29.621c0 5.975 0 8.964-1.163 11.245a10.68 10.68 0 0 1-4.663 4.662c-2.282 1.164-5.27 1.164-11.244 1.164H17.062c-5.974 0-8.963 0-11.244-1.164a10.68 10.68 0 0 1-4.663-4.662C-.007 55.778-.007 52.79-.007 46.816z"
      />
      <path
        fill="#fff"
        d="M13.872 16.068c-1.096 0-1.519 1.351-.599 1.916l23.022 13.83a1.323 1.323 0 0 0 1.735-.316l10.122-13.24c.688-.92-.008-2.19-1.199-2.19zm36.185 31.88c1.096 0 1.53-1.358.61-1.922L27.638 32.198a1.3 1.3 0 0 0-1.715.333L15.782 45.768c-.689.92.029 2.182 1.22 2.182h33.056z"
      />
    </>
  ),
  {},
);

/** Zerion Circle wallet icon (monochrome). */
export const ZerionCircleMono = /* @__PURE__ */ createIcon(
  'ZerionCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.0625)">
      <defs>
        <mask id={`${_id}-zr-circle-a`}>
          <rect width="1024" height="1024" fill="#fff" />
          <path
            fill="#000"
            d="M258.644 288c-15.355 0-21.271 18.987-8.387 26.918l322.327 194.353c8.036 4.946 18.751 2.992 24.283-4.43L738.586 318.79c9.635-12.925-.1-30.79-16.779-30.79zm506.608 448c15.352 0 21.422-19.09 8.54-27.019L451.371 514.652c-8.034-4.945-18.49-2.743-24.021 4.677L285.356 705.344c-9.633 12.922.407 30.656 17.082 30.656z"
          />
        </mask>
      </defs>
      <rect
        width="1024"
        height="1024"
        mask={`url(#${_id}-zr-circle-a)`}
        rx="512"
      />
    </g>
  ),
  { fill: 'currentColor', ids: true },
);

/** Zerion Square wallet icon (monochrome). */
export const ZerionSquareMono = /* @__PURE__ */ createIcon(
  'ZerionSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-157.601 -259.833)scale(1.59402)">
      <defs>
        <mask id={`${_id}-zr-square-a`}>
          <path fill="#fff" d="M-180.792-15.75h1847.001v1635H-180.792z" />
          <path
            fill="#000"
            d="M107.581 173.085c-.688 0-.953.848-.376 1.202l14.443 8.676a.83.83 0 0 0 1.088-.198l6.35-8.306c.432-.577-.005-1.374-.752-1.374zm22.7 20c.688 0 .96-.852.383-1.206l-14.447-8.675a.816.816 0 0 0-1.076.209l-6.362 8.304c-.432.577.018 1.369.765 1.369h20.738z"
          />
        </mask>
      </defs>
      <path
        d="M98.874 173.792c0-3.748 0-5.623.729-7.054a6.7 6.7 0 0 1 2.925-2.925c1.432-.729 3.306-.729 7.054-.729h18.73c3.748 0 5.623 0 7.054.729a6.7 6.7 0 0 1 2.925 2.925c.73 1.432.73 3.306.73 7.054v18.583c0 3.748 0 5.623-.73 7.054a6.7 6.7 0 0 1-2.925 2.925c-1.432.73-3.306.73-7.054.73h-18.73c-3.748 0-5.623 0-7.054-.73a6.7 6.7 0 0 1-2.925-2.925c-.729-1.432-.729-3.306-.729-7.054z"
        mask={`url(#${_id}-zr-square-a)`}
      />
    </g>
  ),
  { fill: 'currentColor', ids: true },
);

/** Zerion wallet icon (colored). */
export const Zerion = ZerionCircle;

/** Zerion wallet icon (monochrome). */
export const ZerionMono = ZerionCircleMono;
