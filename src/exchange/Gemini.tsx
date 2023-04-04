import type { IconProps } from '../utils';

function GeminiBase(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="132.9 202.31 44.98 44.98"
      width="1em"
      height="1em"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      <path d="M162.293 202.31c-7.911 0-14.631 6.085-15.478 13.917-7.832.847-13.917 7.567-13.917 15.478 0 8.599 6.985 15.584 15.584 15.584 7.911 0 14.658-6.085 15.478-13.917 7.832-.847 13.917-7.567 13.917-15.478 0-8.599-6.985-15.584-15.584-15.584zm11.933 17.33a12.13 12.13 0 0 1-10.16 10.16v-10.16zm-37.677 10.319a12.13 12.13 0 0 1 10.16-10.186v10.16h-10.16zm23.865 3.519a12.05 12.05 0 0 1-23.865 0zm.132-13.838v10.292h-10.319V219.64zm13.679-3.519h-23.865a12.05 12.05 0 0 1 23.865 0z" />
    </svg>
  );
}

export function Gemini(props: IconProps) {
  return <GeminiBase fill="#00dcfa" {...props} />;
}

export function GeminiMono(props: IconProps) {
  return <GeminiBase fill="currentColor" {...props} />;
}
