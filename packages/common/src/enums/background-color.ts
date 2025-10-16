import type { ValueOf } from 'type-fest';

export const BACKGROUND_COLOR = {
  BG: 'bg',
  PRIMARY: 'primary'
} as const;

export type TBackgroundColor = ValueOf<typeof BACKGROUND_COLOR>;
