'use client';

import type { TMotionAnimation } from 'common/enums/motion-animation';
import { getMotionAnimation } from 'common/utils/get-motion-animation';
import { motion } from 'motion/react';
import type { ComponentProps } from 'react';

type TProps = ComponentProps<typeof motion.div> & {
  animation: TMotionAnimation;
};

export function MotionDiv({ animation, ...rest }: TProps) {
  return <motion.div {...getMotionAnimation(animation)} {...rest} />;
}
