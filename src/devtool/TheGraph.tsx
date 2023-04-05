import type { IconProps } from '../utils';

export function TheGraph(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 362.8 467.6"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <g transform="translate(-110.2 -123.3)">
        <linearGradient
          id="tgrp-a"
          gradientUnits="userSpaceOnUse"
          x1="169.567"
          y1="159.84"
          x2="357.741"
          y2="392.465"
        >
          <stop offset="0" stopColor="#00d1e6" />
          <stop offset="1" stopColor="#2b4dd4" />
        </linearGradient>
        <path
          d="M266.2 435.3c-21.1 0-41.5-4.1-60.7-12.3-18.6-7.9-35.3-19.1-49.6-33.4s-25.6-31-33.4-49.6c-8.1-19.3-12.3-39.7-12.3-60.7s4.1-41.5 12.3-60.7c7.9-18.6 19.1-35.3 33.4-49.6s31-25.6 49.6-33.4c19.3-8.1 39.7-12.3 60.7-12.3s41.5 4.1 60.7 12.3c18.6 7.9 35.3 19.1 49.6 33.4s25.6 31 33.4 49.6c8.1 19.3 12.3 39.7 12.3 60.7s-4.1 41.5-12.3 60.7c-7.9 18.6-19.1 35.3-33.4 49.6s-31 25.6-49.6 33.4c-19.2 8.1-39.6 12.3-60.7 12.3zm0-261.6c-58.2 0-105.5 47.3-105.5 105.5s47.4 105.6 105.6 105.6 105.6-47.4 105.6-105.6c-.1-58.2-47.5-105.5-105.7-105.5z"
          fill="url(#tgrp-a)"
        />
        <linearGradient
          id="tgrp-b"
          gradientUnits="userSpaceOnUse"
          x1="343.706"
          y1="18.976"
          x2="531.881"
          y2="251.601"
        >
          <stop offset="0" stopColor="#00d1e6" />
          <stop offset="1" stopColor="#2b4dd4" />
        </linearGradient>
        <circle cx="448.4" cy="148.4" r="24.6" fill="url(#tgrp-b)" />
        <linearGradient
          id="tgrp-c"
          gradientUnits="userSpaceOnUse"
          x1="102.643"
          y1="213.976"
          x2="290.817"
          y2="446.601"
        >
          <stop offset="0" stopColor="#00d1e6" />
          <stop offset="1" stopColor="#2b4dd4" />
        </linearGradient>
        <path
          d="M292.1 590.9a25.06 25.06 0 0 1-17.8-7.4 25.17 25.17 0 0 1 0-35.7l105-105a25.17 25.17 0 1 1 35.7 35.7l-105 105c-5 5-11.5 7.4-17.9 7.4z"
          fill="url(#tgrp-c)"
        />
      </g>
    </svg>
  );
}

export function TheGraphMono(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 362.8 467.6"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M156 312c-21.1 0-41.5-4.1-60.7-12.3-18.6-7.9-35.3-19.1-49.6-33.4s-25.6-31-33.4-49.6C4.2 197.4 0 177 0 156s4.1-41.5 12.3-60.7C20.2 76.7 31.4 60 45.7 45.7s31-25.6 49.6-33.4C114.6 4.2 135 0 156 0s41.5 4.1 60.7 12.3c18.6 7.9 35.3 19.1 49.6 33.4s25.6 31 33.4 49.6C307.8 114.6 312 135 312 156s-4.1 41.5-12.3 60.7c-7.9 18.6-19.1 35.3-33.4 49.6s-31 25.6-49.6 33.4c-19.2 8.1-39.6 12.3-60.7 12.3zm0-261.6c-58.2 0-105.5 47.3-105.5 105.5s47.4 105.6 105.6 105.6 105.6-47.4 105.6-105.6C261.6 97.7 214.2 50.4 156 50.4z" />
      <circle cx="338.2" cy="25.1" r="24.6" />
      <path d="M181.9 467.6a25.06 25.06 0 0 1-17.8-7.4 25.17 25.17 0 0 1 0-35.7l105-105c9.858-9.858 25.842-9.858 35.7 0s9.858 25.842 0 35.7l-105 105c-5 5-11.5 7.4-17.9 7.4z" />
    </svg>
  );
}
