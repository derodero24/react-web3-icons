import { createIcon } from '../utils';

// Source: https://www.bithumbcorp.com/bithumb_bi_asset.zip (official BI kit, 1_Bithumb Symbol/웹_RGB/bithumb_symbol_RGB_full color.ai and bithumb_symbol_RGB_black.ai)
// Source: https://www.bithumbcorp.com/ko/promotion/bi.php (official CI·BI page of Bithumb Co., Ltd., which links the kit)
// Source: https://www.bithumbcorp.com/bithumb_bi_system_guide_v5_0.pdf (BI system guide v5.0: primary colour Bithumb Orange, Pantone 1505 C, #FF6C00)
// Default: the kit's bithumb_symbol_RGB_full color.ai (Illustrator PDF, vector only): the #D1350F flag and the #FF8200 b, path data unchanged, plus the kit's #D1350F shadow on the bowl's shoulder. Every coordinate is mapped from the 1080 pt PDF page by X = (x - 565.938) * 56/900 + 32, Y = (540 - y) * 56/900 + 32 (y flipped; centred on the ArtBox, 900 pt tall -> 56 units)
// Shadow: the .ai paints a constant #D1350F shading through the shoulder's clip path under a luminosity soft mask (an axial DeviceGray 0 -> 1 shading under cm [-115.3766 125.7091 169.1205 151.4174 771.047 544.2887]). It is converted analytically, not sampled from pixels: a userSpaceOnUse linearGradient of #D1350F from stop-opacity 0 to 1, from PDF point E = (771.047, 544.289) to E + g/|g|^2 = (657.239, 671.402), where g is the first row of the inverse shading matrix, both mapped like the paths (no gradientTransform). It matches the kit's own bithumb_symbol_RGB_full color.png within 0.07/255 mean colour error
// Mono: the kit's one-colour bithumb_symbol_RGB_black.ai (the same file as its orange and white versions): the b and a separate flag sliver, path data unchanged and mapped the same way, in currentColor; the kit's own gaps keep the flag and the shoulder apart from the stem
// brandColor: the guide's primary colour Bithumb Orange #FF6C00 (also on the BI page as RGB 255 108 0); the artwork's most frequent colour would be the #D1350F flag
/** Bithumb exchange icon (colored). */
export const Bithumb = /* @__PURE__ */ createIcon(
  'Bithumb',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <path
        fill="#D1350F"
        d="M16.43 32h-.76c-3.52 0-5.55-2.85-4.54-6.36l2.55-8.91h7.13Z"
      />
      <path
        fill="#FF8200"
        d="M38.38 16.73h-4.33L29.67 32H34c2.8 0 3.72 2.12 2.5 6.36s-3.35 6.37-6.15 6.37-3.72-2.12-2.5-6.37l8.02-28C36.88 6.85 34.85 4 31.33 4h-8.9l-9.86 34.36C8.44 52.8 14 60 25.97 60s21.67-7.21 25.8-21.64c4.14-14.42-1.43-21.63-13.4-21.63"
      />
      <path
        fill={`url(#${_id}-bith-a)`}
        d="M34.05 16.73 29.67 32H34c2.8 0 3.72 2.12 2.5 6.36h15.27c4.14-14.42-1.43-21.63-13.4-21.63Z"
      />
      <defs>
        <linearGradient
          id={`${_id}-bith-a`}
          x1="44.76"
          x2="37.68"
          y1="31.73"
          y2="23.82"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D1350F" stopOpacity="0" />
          <stop offset="1" stopColor="#D1350F" />
        </linearGradient>
      </defs>
    </>
  ),
  { ids: true },
);

/** Bithumb exchange icon (monochrome). */
export const BithumbMono = /* @__PURE__ */ createIcon(
  'BithumbMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M38.38 16.73h-3.06L30.94 32H34c2.8 0 3.72 2.12 2.5 6.36s-3.35 6.37-6.15 6.37-3.72-2.12-2.5-6.37l8.02-28C36.88 6.85 34.85 4 31.33 4h-8.9l-9.86 34.36C8.44 52.8 14 60 25.97 60s21.67-7.21 25.8-21.64c4.14-14.42-1.43-21.63-13.4-21.63" />
      <path d="M17.5 16.73h-3.82l-2.55 8.9c-.75 2.61.18 4.85 2.15 5.83Z" />
    </>
  ),
  { fill: 'currentColor' },
);
