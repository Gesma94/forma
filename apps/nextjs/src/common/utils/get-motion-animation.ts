import { MOTION_ANIMATION, type TMotionAnimation } from 'common/enums/motion-animation';
import type { MotionProps } from 'motion/react';
import { motionAnimationTranslateFromBottom } from '@/styles/motion';

export function getMotionAnimation(motionAnimation: TMotionAnimation): MotionProps {
  switch (motionAnimation) {
    case MOTION_ANIMATION.TRANSLATE_FROM_BOTTOM:
      return motionAnimationTranslateFromBottom;
  }
}
