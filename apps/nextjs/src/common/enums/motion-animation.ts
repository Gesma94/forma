import type { ValueOf } from 'type-fest';

export const MOTION_ANIMATION = {
  TRANSLATE_FROM_BOTTOM: 'TRANSLATE_FROM_BOTTOM'
} as const;

export type TMotionAnimation = ValueOf<typeof MOTION_ANIMATION>;
