'use client';

import type { TMotionAnimation } from 'common/enums/motion-animation';
import { getMotionAnimation } from 'common/utils/get-motion-animation';
import { motion } from 'motion/react';
import type { ComponentProps } from 'react';

type TProps = ComponentProps<typeof motion.ul> & {
  animation: TMotionAnimation;
};

export function MotionUl({ animation, ...rest }: TProps) {
  return <motion.ul {...getMotionAnimation(animation)} {...rest} />;
}
