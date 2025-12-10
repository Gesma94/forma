'use client';

import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react/dist/ssr';
import { isNil } from 'es-toolkit';
import { useInView } from 'motion/react';
import { type UIEventHandler, useLayoutEffect, useRef, useState } from 'react';
import type { InlineGalleryModuleDocumentType } from 'types/generated/sanity-types-generated';
import { IconButton } from '@/ui/buttons/icon-button/icon-button';
import { motion } from 'motion/react';

type TProps = {
  module: InlineGalleryModuleDocumentType;
  imagesUrl: string[];
};

export function InlineGalleryCarousel({ module, imagesUrl }: TProps) {
  const [isCaretLeftDisabled, setIsCaretLeftDisabled] = useState(false);
  const [isCaretRightDisabled, setIsCaretRightDisabled] = useState(false);
  const scrollableElementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollableElementRef, { once: true });
  const constraintsRef = useRef(null)

  const handleCaretLeftClick = () => {
    const scrollableElement = scrollableElementRef.current;

    if (isNil(scrollableElement)) {
      return false;
    }

    scrollableElement.scrollBy({ left: -1, behavior: 'smooth' });
  };

  const handleCaretRightClick = () => {
    const scrollableElement = scrollableElementRef.current;

    if (isNil(scrollableElement)) {
      return false;
    }

    scrollableElement.scrollBy({ left: 1, behavior: 'smooth' });
  };

  const handleScroll: UIEventHandler<HTMLDivElement> = e => {
    setIsCaretLeftDisabled(e.currentTarget.scrollLeft === 0);
    setIsCaretRightDisabled(e.currentTarget.scrollLeft + e.currentTarget.offsetWidth >= e.currentTarget.scrollWidth);
  };

  useLayoutEffect(() => {
    if (!isInView) {
      return;
    }

    const scrollableElement = scrollableElementRef.current;

    if (isNil(scrollableElement)) {
      return;
    }

    const middleElement = scrollableElement.children[Math.floor(scrollableElement.children.length / 2)];

    if (middleElement instanceof HTMLElement) {
      // scrollableElement.style.transform = `translateX(-${middleElement.offsetLeft + (window.innerWidth / 2)}px)`;
      // scrollableElement = .scrollLeft = middleElement.offsetLeft;
    }
  }, [isInView]);

  return (
    <div className='relative mt-10 flex overflow-x-hidden' ref={constraintsRef}>
      <div className='top-1/2 left-2 sm:left-14 absolute -translate-y-1/2 z-10 touch-device:hidden'>
        <IconButton
          icon={CaretLeftIcon}
          size='large'
          surface='primary'
          onClick={handleCaretLeftClick}
          isDisabled={isCaretLeftDisabled}
        />
      </div>

<div className='max-w-dvw'>
      <motion.div
        ref={scrollableElementRef}
        onScroll={handleScroll}
        drag='x'
        dragConstraints={constraintsRef}
        className='min-w-max flex gap-4 sm:gap-10 h-[720px] relative px-4 sm:px-20 lg:px-40 snap-x snap-mandatory'
        style={{ scrollbarWidth: 'none' }}
      >
        {imagesUrl.map((imageUrl, i) => {
          const image = module.images[i];
          return (
            <div
              key={image._key}
              className='h-full w-auto shrink-0 relative max-w-[calc(100vw-3rem)] sm:max-w-[calc(100vw-4rem)] snap-center'
            >
              <img src={imageUrl} alt={image.altText} draggable={false} className='rounded-2xl h-full w-auto object-cover' />
              <div className='absolute bottom-4 left-4 text-shadow-xl text-md'>
                <p className='text-md'>{image.title}</p>
                <p className='text-sm'>{image.subtitle}</p>
              </div>
            </div>
          );
        })}
      </motion.div>
        </div>
        

      <div className='top-1/2 right-2 sm:right-14 absolute -translate-y-1/2 z-10 touch-device:hidden'>
        <IconButton
          icon={CaretRightIcon}
          size='large'
          surface='primary'
          onClick={handleCaretRightClick}
          isDisabled={isCaretRightDisabled}
        />
      </div>
    </div>
  );
}
