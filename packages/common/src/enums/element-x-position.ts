import type { ValueOf } from 'type-fest';

export const ELEMENT_X_POSITION = {
  LEFT: 'left',
  RIGHT: 'right'
} as const;

export type TElementXPosition = ValueOf<typeof ELEMENT_X_POSITION>;
