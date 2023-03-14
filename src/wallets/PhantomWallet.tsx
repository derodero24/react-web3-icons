import type { IconProps } from '../lib';

export function PhantomWallet(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <circle cx="64" cy="64" r="64" fill="url(#phantom-a)" />
      <path
        d="M110.584 64.914H99.142C99.142 41.765 80.173 23 56.772 23c-23.111 0-41.901 18.306-42.361 41.058C13.936 87.577 36.241 108 60.019 108h2.991c20.963 0 49.06-16.233 53.45-36.013.811-3.646-2.101-7.073-5.875-7.073zm-70.815 1.031c0 3.096-2.559 5.627-5.689 5.627s-5.689-2.533-5.689-5.627v-9.104c0-3.096 2.559-5.627 5.689-5.627s5.689 2.532 5.689 5.627v9.104zm19.753 0c0 3.096-2.559 5.627-5.689 5.627s-5.689-2.533-5.689-5.627v-9.104c0-3.096 2.56-5.627 5.689-5.627s5.689 2.532 5.689 5.627v9.104z"
        fill="url(#phantom-b)"
      />
      <defs>
        <linearGradient
          id="phantom-a"
          x1="64"
          y1="0"
          x2="64"
          y2="128"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#534bb1" />
          <stop offset="1" stopColor="#551bf9" />
        </linearGradient>
        <linearGradient
          id="phantom-b"
          x1="65.5"
          y1="23"
          x2="65.5"
          y2="108"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity=".82" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PhantomWalletMono(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 106"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M120.471 52.009h-14.332C106.139 23.285 82.379 0 53.068 0 24.12 0 .585 22.715.009 50.947c-.596 29.183 27.342 54.525 57.125 54.525h3.746c26.257 0 61.45-20.143 66.948-44.686 1.016-4.524-2.631-8.777-7.358-8.777zm-88.7 1.28c0 3.841-3.206 6.983-7.125 6.983s-7.125-3.143-7.125-6.983V41.992c0-3.841 3.206-6.983 7.125-6.983s7.125 3.142 7.125 6.983v11.297zm24.743 0c0 3.841-3.206 6.983-7.125 6.983s-7.125-3.143-7.125-6.983V41.992c0-3.841 3.207-6.983 7.125-6.983s7.125 3.142 7.125 6.983v11.297z" />
    </svg>
  );
}
