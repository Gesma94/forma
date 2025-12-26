'use client';

import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { useState } from 'react';
import { IconButton } from '@/ui/buttons/icon-button/icon-button';
import { Quote } from './quote';
import type { TQuoteWithAvatarUrl } from './types';

type Direction = 'left' | 'right';
type TProps = {
  quotes: TQuoteWithAvatarUrl[];
};

export function QuotesCarousel({ quotes }: TProps) {
  const [direction, setDirection] = useState<Direction | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuote = quotes[currentIndex];

  const handleNextClick = () => {
    setDirection('left');
    setCurrentIndex((currentIndex - 1 + quotes.length) % quotes.length);
  };

  const handlePreviousClick = () => {
    setDirection('right');
    setCurrentIndex((currentIndex + 1) % quotes.length);
  };

  return (
    <div>
      <div className='grid grid-cols-1 row-start-1 max-w-5xl mx-auto relative'>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            variants={motionVariants}
            transition={{ duration: 1 }}
            custom={direction}
            className='col-start-1 row-start-1 relative'
            initial='initial'
            animate='animate'
            exit='exit'
            key={currentQuote._id}
          >
            <Quote quote={currentQuote} />
          </motion.div>
        </AnimatePresence>
        <div className='mt-8 mx-auto md:mx-[unset] md:mt-0 md:absolute flex gap-2 bottom-3 right-8'>
          <IconButton icon={CaretLeftIcon} onClick={handlePreviousClick} aria-label='Previous quote' />
          <IconButton icon={CaretRightIcon} onClick={handleNextClick} aria-label='Next quote' />
        </div>
      </div>
    </div>
  );
}

const motionVariants: Variants = {
  initial: (direction: Direction) => ({ opacity: 0, x: direction === 'right' ? 100 : -100 }),
  animate: { opacity: 1, x: 0 },
  exit: (direction: Direction) => ({ opacity: 0, x: direction === 'left' ? 100 : -100 })
};
