'use client';

import { animate } from 'motion';
import { motion, useInView, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';

type TProps = {
  value: number;
};

export function AnimatedValue({ value }: TProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const count = useMotionValue(0);
  const isInView = useInView(ref, { once: true });
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: 'easeOut' });
      return () => controls.stop();
    }
  }, [count, value, isInView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
