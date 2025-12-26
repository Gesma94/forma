'use client';

import { ELEMENT_X_POSITION, SHADE_COLOR, type TElementXPosition } from '@forma/common';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { MOTION_ANIMATION } from 'common/enums/motion-animation';
import { secondsToMilliseconds } from 'date-fns';
import { AnimatePresence, type HTMLMotionProps, motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { useInterval } from 'react-use';
import { tv } from 'tailwind-variants';
import { IconButton } from '@/ui/buttons/icon-button/icon-button';
import { FormaMediaClientSide } from '@/ui/forma-media/forma-media-client-side';
import { MotionDiv } from '@/ui/motion/motion-div';
import type { TBasePortableTextValue } from '@/ui/portable-text/base-portable-text';
import { Heading } from './heading';
import { ReviewStatement } from './review-statement';
import type { TReview } from './types';

type TProps = {
  reviews: TReview[];
  moduleTitle: string | TBasePortableTextValue;
  imagePosition: TElementXPosition;
};

export function ReviewsCarousel({ reviews, moduleTitle, imagePosition }: TProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMouseEntered, setHasMouseEntered] = useState(false);
  const {
    authorAvatar,
    authorAvatarUrl,
    authorCompany,
    authorName,
    id,
    formaMediaData,
    authorRole,
    statement,
    brandImageUrl,
    brand,
    brandShade
  } = reviews[currentIndex];
  const { brandImgTv, reviewContentWrapperTv, reviewImgWrapperTv, reviewWrapperTv } = stylesTv({
    imagePosition,
    brandShade
  });

  const handleNextClick = () => {
    setCurrentIndex((currentIndex - 1 + reviews.length) % reviews.length);
  };

  const handlePreviousClick = () => {
    setCurrentIndex((currentIndex + 1) % reviews.length);
  };

  const handleMouseEnter = () => {
    setHasMouseEntered(true);
  };

  const handleMouseLeave = () => {
    setHasMouseEntered(false);
  };

  useInterval(() => handleNextClick(), hasMouseEntered ? null : secondsToMilliseconds(6));

  return (
    <MotionDiv
      animation={MOTION_ANIMATION.TRANSLATE_FROM_BOTTOM}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={reviewWrapperTv()}>
        <div className={reviewContentWrapperTv()}>
          <AnimatePresence initial={false}>
            <div key={id} className='py-4 px-6 md:py-10 md:px-10 flex col-start-1 row-start-1'>
              <div className='flex flex-col justify-between'>
                <div>
                  <Heading value={moduleTitle} />
                </div>
                <motion.div {...commonMotionProps} className='mt-4 lg:mt-0'>
                  <ReviewStatement value={statement} variant='on-primary' />
                  <div className='flex w-full items-center justify-center md:justify-start mx-auto gap-4 relative mt-4'>
                    <div className='flex-col flex md:gap-4 items-center md:flex-row'>
                      <Image
                        src={authorAvatarUrl}
                        alt={authorAvatar.altText ?? authorName}
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
                </motion.div>
              </div>
            </div>
          </AnimatePresence>
          <div className='mt-4 mb-10 mx-auto md:mt-0 md:mb-0 md:mx-0 md:absolute flex gap-2 bottom-[3.25rem] right-10'>
            <IconButton
              surface='primary'
              icon={CaretLeftIcon}
              onClick={handlePreviousClick}
              aria-label='Previous review'
            />
            <IconButton surface='primary' icon={CaretRightIcon} onClick={handleNextClick} aria-label='Next review' />
          </div>
        </div>
        <AnimatePresence initial={false}>
          <div className={reviewImgWrapperTv()} key={id}>
            <motion.div {...commonMotionProps}>
              <div className='absolute inset-0'>
                <FormaMediaClientSide {...formaMediaData} className='size-full object-cover' />
              </div>
              <div className='z-10 absolute bottom-10 right-10'>
                <img src={brandImageUrl} alt={brand.logo.altText} className={brandImgTv()} />
              </div>
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

const stylesTv = tv({
  slots: {
    brandImgTv: 'h-16 w-auto',
    reviewWrapperTv:
      'w-full lg:h-[720px] grid grid-cols-1 grid-rows-[400px_auto] lg:grid-rows-1 bg-primary overflow-hidden',
    reviewImgWrapperTv: 'row-start-1 relative',
    reviewContentWrapperTv: 'row-start-2 lg:row-start-1 relative grid grid-cols-1 grid-rows-1'
  },
  variants: {
    imagePosition: {
      [ELEMENT_X_POSITION.LEFT]: {
        reviewWrapperTv: 'lg:grid-cols-[2fr_minmax(512px,1fr)]',
        reviewContentWrapperTv: 'col-start-2',
        reviewImgWrapperTv: 'col-start-1'
      },

      [ELEMENT_X_POSITION.RIGHT]: {
        reviewWrapperTv: 'lg:grid-cols-[minmax(512px,1fr)_2fr]',
        reviewContentWrapperTv: 'col-start-1',
        reviewImgWrapperTv: 'col-start-2'
      }
    },
    brandShade: {
      [SHADE_COLOR.DARK]: {
        brandImgTv: ''
      },
      [SHADE_COLOR.LIGHT]: {
        brandImgTv: 'invert-[88%]'
      }
    }
  }
});
