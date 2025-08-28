import { MOTION_ANIMATION, type TMotionAnimation } from 'common/enums/motion-animation';
import type { MotionProps } from 'motion/react';
import { motionAnimationScrollXInfinity, motionAnimationTranslateFromBottom } from '@/styles/motion';

export function getMotionAnimation(motionAnimation: TMotionAnimation): MotionProps {
  switch (motionAnimation) {
    case MOTION_ANIMATION.TRANSLATE_FROM_BOTTOM:
      return motionAnimationTranslateFromBottom;
    case MOTION_ANIMATION.SCROLL_X_INFINITY:
      return motionAnimationScrollXInfinity;
  }
}
