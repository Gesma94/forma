import type { ValueOf } from 'type-fest';

export const IMAGE_X_POSITION = {
  LEFT: 'left',
  RIGHT: 'right'
} as const;

export type TImageXPosition = ValueOf<typeof IMAGE_X_POSITION>;
