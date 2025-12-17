'use client';

import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react/dist/ssr';
import type { IFormImageAsset } from 'common/utils/get-forma-image';
import { isNil } from 'es-toolkit';
import { useInView } from 'motion/react';
import { ComponentProps, type UIEventHandler, useLayoutEffect, useRef, useState } from 'react';
import { IconButton } from '@/ui/buttons/icon-button/icon-button';
import { TModuleVariants } from '@forma/common';

type TProps = {
  variant: TModuleVariants;
  images: (IFormImageAsset & { key: string })[];
};

export function InlineGalleryCarousel({ images, variant }: TProps) {
  const [isCaretLeftDisabled, setIsCaretLeftDisabled] = useState(false);
  const [isCaretRightDisabled, setIsCaretRightDisabled] = useState(false);
  const scrollableElementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollableElementRef, { once: true });

  const buttonSurface : ComponentProps<typeof IconButton>['surface'] = variant === 'on-primary' ? 'primary' : 'bg';

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
      scrollableElement.scrollLeft = middleElement.offsetLeft;
    }
  }, [isInView]);

  return (
    <div className='relative'>
      <div className='top-1/2 left-2 sm:left-14 absolute -translate-y-1/2 z-10 touch-device:hidden'>
        <IconButton
          icon={CaretLeftIcon}
          size='large'
          surface={buttonSurface}
          onClick={handleCaretLeftClick}
          isDisabled={isCaretLeftDisabled}
        />
      </div>

      <div
        ref={scrollableElementRef}
        onScroll={handleScroll}
        className='flex gap-4 sm:gap-10 h-[720px] overflow-auto relative px-4 sm:px-20 lg:px-40 snap-x snap-mandatory touch-pan-x'
        style={{ scrollbarWidth: 'none' }}
      >
        {images.map(image => {
          return (
            <div
              key={image.key}
              className='h-full w-auto shrink-0 relative max-w-[calc(100vw-3rem)] sm:max-w-[calc(100vw-4rem)] snap-center'
            >
              <img src={image.imageUrl} alt={image.imageAltText} className='rounded-2xl h-full w-auto object-cover' />
              <div className='absolute bottom-4 left-4 text-shadow-xl text-md text-primary-text'>
                <p className='text-md'>{image.imageTitle}</p>
                <p className='text-sm'>{image.clientName}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className='top-1/2 right-2 sm:right-14 absolute -translate-y-1/2 z-10 touch-device:hidden'>
        <IconButton
          icon={CaretRightIcon}
          size='large'
          surface={buttonSurface}
          onClick={handleCaretRightClick}
          isDisabled={isCaretRightDisabled}
        />
      </div>
    </div>
  );
}
