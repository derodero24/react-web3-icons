import { createIcon } from '../utils';

// Source: https://zerion.io
/** Zerion Circle wallet icon (colored). */
export const ZerionCircle = /* @__PURE__ */ createIcon(
  'ZerionCircle',
  '0 0 1024 1024',
  (_props, _id) => (
    <>
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
    </>
  ),
  { ids: true },
);

/** Zerion Square wallet icon (colored). */
export const ZerionSquare = /* @__PURE__ */ createIcon(
  'ZerionSquare',
  '279.67 178.83 40.15 40',
  () => (
    <>
      <path
        fill="#16161a"
        d="M279.666 189.542c0-3.748 0-5.623.729-7.054a6.7 6.7 0 0 1 2.925-2.925c1.432-.729 3.306-.729 7.054-.729h18.73c3.748 0 5.623 0 7.054.729a6.7 6.7 0 0 1 2.925 2.925c.73 1.432.73 3.306.73 7.054v18.583c0 3.748 0 5.623-.73 7.054a6.7 6.7 0 0 1-2.925 2.925c-1.432.73-3.306.73-7.054.73h-18.73c-3.748 0-5.623 0-7.054-.73a6.7 6.7 0 0 1-2.925-2.925c-.729-1.432-.729-3.306-.729-7.054z"
      />
      <path
        fill="#fff"
        d="M288.373 188.835c-.688 0-.953.848-.376 1.202l14.443 8.676a.83.83 0 0 0 1.088-.198l6.35-8.306c.432-.577-.005-1.374-.752-1.374zm22.7 20c.688 0 .96-.852.383-1.206l-14.447-8.675a.816.816 0 0 0-1.076.209l-6.362 8.304c-.432.577.018 1.369.765 1.369h20.738z"
      />
    </>
  ),
  {},
);

/** Zerion Circle wallet icon (monochrome). */
export const ZerionCircleMono = /* @__PURE__ */ createIcon(
  'ZerionCircleMono',
  '0 0 1024 1024',
  (_props, _id) => (
    <>
      <defs>
        <mask id={`${_id}-zr-circle-a`}>
          <rect width="100%" height="100%" fill="#fff" />
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
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Zerion Square wallet icon (monochrome). */
export const ZerionSquareMono = /* @__PURE__ */ createIcon(
  'ZerionSquareMono',
  '98.87 163.08 40.15 40',
  (_props, _id) => (
    <>
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
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Zerion wallet icon (colored). */
export const Zerion = ZerionCircle;

/** Zerion wallet icon (monochrome). */
export const ZerionMono = ZerionCircleMono;
