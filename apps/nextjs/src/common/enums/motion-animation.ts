import type { ValueOf } from 'type-fest';

export const MOTION_ANIMATION = {
  TRANSLATE_FROM_BOTTOM: 'TRANSLATE_FROM_BOTTOM',
  SCROLL_X_INFINITY: 'SCROLL_X_INFINITY'
} as const;

export type TMotionAnimation = ValueOf<typeof MOTION_ANIMATION>;
