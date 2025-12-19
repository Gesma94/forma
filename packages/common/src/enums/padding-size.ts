import type { ValueOf } from 'type-fest';

export const PADDING_SIZE = {
  NONE: 'none',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export type TPaddingSize = ValueOf<typeof PADDING_SIZE>;
