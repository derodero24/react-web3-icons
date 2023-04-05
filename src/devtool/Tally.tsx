import type { IconProps } from '../utils';

export function Tally(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="308.07 194 25 34.28"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path
        d="M333.069 204.706v7.681l-6.064-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681l18.938 10.711z"
        fill="#2a21a3"
      />
      <path
        d="M330.037 206.452v7.681l-6.06-3.43v15.828l-6.813-3.854v-15.825l-6.061-3.43v-7.681l18.934 10.711z"
        fill="#725bff"
      />
      <path
        d="M327.005 208.199v7.681l-6.06-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681l18.934 10.711z"
        fill="#00e6cd"
      />
    </svg>
  );
}

export function TallyMono(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="308.07 194 25 34.28"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <g mask="url(#tlym-a)">
        <path d="M333.069 204.706v7.681l-6.064-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681l18.938 10.711z" />
        <path d="M330.037 206.452v7.681l-6.06-3.43v15.828l-6.813-3.854v-15.825l-6.061-3.43v-7.681l18.934 10.711z" />
        <path d="M327.005 208.199v7.681l-6.06-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681l18.934 10.711z" />
      </g>
      <defs>
        <mask id="tlym-a">
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#fff" stroke="#000">
            <path d="M333.069 204.706v7.681l-6.064-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681l18.938 10.711z" />
            <path d="M330.037 206.452v7.681l-6.06-3.43v15.828l-6.813-3.854v-15.825l-6.061-3.43v-7.681l18.934 10.711z" />
            <path d="M327.005 208.199v7.681l-6.06-3.43v15.828l-6.81-3.854v-15.825l-6.064-3.43v-7.681l18.934 10.711z" />
          </g>
        </mask>
      </defs>
    </svg>
  );
}
