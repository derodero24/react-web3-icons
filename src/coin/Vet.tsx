import { createIcon } from '../utils';

const vetPath =
  'M21 3.844h-1.609c-.394 0-.748.225-.922.58l-4.219 8.74-.006-.005-1.125 2.328v.012l-1.125 2.329-5.619-11.65h1.603c.394 0 .754.225.923.58l3.673 7.554 1.125-2.329-2.965-6.103a3.61 3.61 0 0 0-3.25-2.036H3l1.125 2.334 6.75 13.978h2.25z';

export const Vet = createIcon('Vet', '0 0 24 24', _id => (
  <>
    <path fill={`url(#${_id}-a)`} d={vetPath} />
    <defs>
      <linearGradient
        id={`${_id}-a`}
        x1="3"
        x2="20.048"
        y1="20.593"
        y2="1.144"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#582974" />
        <stop offset=".15" stopColor="#4163AD" />
        <stop offset=".47" stopColor="#22B2F9" />
        <stop offset=".74" stopColor="#54B1B6" />
        <stop offset="1" stopColor="#86E931" />
      </linearGradient>
    </defs>
  </>
));

export const VetMono = createIcon(
  'VetMono',
  '0 0 24 24',
  () => <path d={vetPath} />,
  'currentColor',
);
