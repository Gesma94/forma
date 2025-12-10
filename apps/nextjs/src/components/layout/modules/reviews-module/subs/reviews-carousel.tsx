'use client';

import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { MOTION_ANIMATION } from 'common/enums/motion-animation';
import { AnimatePresence, type HTMLMotionProps, motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { IconButton } from '@/ui/buttons/icon-button/icon-button';
import { MotionDiv } from '@/ui/motion/motion-div';
import { ReviewStatement } from './review-statement';
import type { TReview } from './types';

type TProps = {
  reviews: TReview[];
};

export function ReviewsCarousel({ reviews }: TProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    authorAvatar,
    authorAvatarUrl,
    authorCompany,
    authorName,
    id,
    image,
    reviewImageUrl,
    authorRole,
    statement,
    brandImageUrl,
    brand
  } = reviews[currentIndex];

  const handleNextClick = () => {
    setCurrentIndex((currentIndex - 1 + reviews.length) % reviews.length);
  };

  const handlePreviousClick = () => {
    setCurrentIndex((currentIndex + 1) % reviews.length);
  };

  return (
    <MotionDiv animation={MOTION_ANIMATION.TRANSLATE_FROM_BOTTOM} drag="x" onDragStart={x => console.log(x)}>
      <div className='w-full lg:h-[720px] grid grid-cols-1 lg:grid-cols-[minmax(512px,1fr)_2fr] grid-rows-[400px_auto] lg:grid-rows-1 bg-primary overflow-hidden'>
        <div className='col-start-1 row-start-2 lg:row-start-1 relative grid grid-cols-1 grid-rows-1'>
          <AnimatePresence initial={false}>
            <div key={id} className='py-4 px-6 md:py-10 md:px-10 flex col-start-1 row-start-1'>
              <motion.div {...commonMotionProps} className='flex'>
                <div className='flex flex-col justify-between'>
                  <div>
                    <img src={brandImageUrl} alt={brand.logo.altText} className='h-16 w-auto invert-[88%]' />
                  </div>
                  <div className='mt-4 lg:mt-0'>
                    <ReviewStatement value={statement} variant='on-primary' />
                    <div className='flex w-full items-center justify-center md:justify-start mx-auto gap-4 relative mt-4'>
                      <div className='flex-col flex md:gap-4 items-center md:flex-row'>
                        <Image
                          src={authorAvatarUrl}
                          alt={authorAvatar.altText}
                          width={64}
                          height={64}
                          className='size-16 rounded-full order-1 md:order-1'
                        />
                        <div className='flex flex-col items-center md:justify-end md:items-start order-2 md:order-2'>
                          <p className='prose-lg font-bold text-primary-text'>{authorName}</p>
                          <p className='prose-sm text-center text-primary-text'>
                            {authorRole}, {authorCompany}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatePresence>
          <div className='mt-4 mb-10 mx-auto md:mt-0 md:mb-0 md:mx-0 md:absolute flex gap-2 bottom-[3.25rem] right-10'>
            <IconButton surface='primary' icon={CaretLeftIcon} onClick={handlePreviousClick} />
            <IconButton surface='primary' icon={CaretRightIcon} onClick={handleNextClick} />
          </div>
        </div>
        <AnimatePresence initial={false}>
          <div className='col-start-1 lg:col-start-2 row-start-1 relative' key={id}>
            <motion.div className='absolute inset-0' {...commonMotionProps}>
              <img src={reviewImageUrl} alt={image.altText} className='size-full object-cover' />
            </motion.div>
          </div>
        </AnimatePresence>
      </div>
    </MotionDiv>
  );
}

const commonMotionProps: HTMLMotionProps<'div'> = {
  transition: { duration: 1 },
  variants: {
    start: { opacity: 0 },
    animate: { opacity: 1 },
    end: { opacity: 0 }
  },
  initial: 'start',
  animate: 'animate',
  exit: 'end'
};
