import type { ValueOf } from 'type-fest';

export const IMAGE_SIZE = {
  XS: 'xs',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  VH: 'vh'
} as const;

export type TImageSize = ValueOf<typeof IMAGE_SIZE>;
