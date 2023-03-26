import type { IconProps } from '../lib';

export function Zerion(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <rect width="1024" height="1024" rx="512" fill="url(#zerion-a)" />
      <path
        d="M258.644 288c-15.355 0-21.271 18.987-8.387 26.918l322.327 194.353c8.036 4.946 18.751 2.992 24.283-4.43L738.586 318.79c9.635-12.925-.1-30.79-16.779-30.79H258.644zm506.608 448c15.352 0 21.422-19.09 8.54-27.019L451.371 514.652c-8.034-4.945-18.49-2.743-24.021 4.677L285.356 705.344c-9.633 12.922.407 30.656 17.082 30.656h462.814z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="zerion-a"
          x1="0"
          y1="0"
          x2="1209.97"
          y2="704.696"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2962ef" />
          <stop offset="1" stopColor="#255ce5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ZerionMono(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}

      <defs>
        <mask id="zerionmono-a">
          <rect width="100%" height="100%" fill="white" />
          <path
            d="M258.644 288c-15.355 0-21.271 18.987-8.387 26.918l322.327 194.353c8.036 4.946 18.751 2.992 24.283-4.43L738.586 318.79c9.635-12.925-.1-30.79-16.779-30.79H258.644zm506.608 448c15.352 0 21.422-19.09 8.54-27.019L451.371 514.652c-8.034-4.945-18.49-2.743-24.021 4.677L285.356 705.344c-9.633 12.922.407 30.656 17.082 30.656h462.814z"
            fill="black"
          />
        </mask>
      </defs>
      <rect
        width="1024"
        height="1024"
        rx="512"
        fill="currentColor"
        mask="url(#zerionmono-a)"
      />
    </svg>
  );
}
