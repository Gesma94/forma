import type { MotionProps } from 'motion/react';

export const motionAnimationTranslateFromBottom: MotionProps = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: {
    once: true
  },
  transition: {
    duration: 0.8,
    ease: 'easeOut'
  }
} as const;
