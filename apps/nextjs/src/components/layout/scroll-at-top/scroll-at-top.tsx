'use client';

import { CaretCircleUpIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { tv } from 'tailwind-variants';
import { IconButton } from '@/ui/buttons/icon-button/icon-button';

const MotionIconButton = motion.create(IconButton);

export function ScrollAtTop() {
  const { scrollAtTopWrapperTv } = styleTv();
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleScroll = useCallback(() => {
    if (window.scrollY > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className={scrollAtTopWrapperTv()}>
      <MotionIconButton
        icon={CaretCircleUpIcon}
        onClick={handleClick}
        animate={isVisible ? { opacity: '100%', rotate: 0 } : { opacity: '0%', rotate: 180 }}
        initial={{ opacity: '0%', rotate: 180 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className='shadow-[0_0_15px_-5px_black]'
        aria-label='Scroll to top'
      />
    </div>
  );
}

const styleTv = tv({
  slots: {
    scrollAtTopWrapperTv: 'fixed bottom-4 right-4 z-50'
  }
});
