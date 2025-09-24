'use client';

import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react/dist/ssr';
import { isNil } from 'es-toolkit';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import type { InlineGalleryModuleDocumentType } from 'types/generated/sanity-types-generated';
import { IconButton } from '@/ui/buttons/icon-button/icon-button';

type TProps = {
  module: InlineGalleryModuleDocumentType;
  imagesUrl: string[];
};

export function InlineGalleryCarousel({ module, imagesUrl }: TProps) {
  const scrollableElementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scrollableElement = scrollableElementRef.current;

    if (isNil(scrollableElement)) {
      return;
    }

    scrollableElement.scrollLeft = (scrollableElement.scrollWidth - scrollableElement.clientWidth) / 2;
  }, []);

  return (
    <div className='relative mt-10'>
      <div className='top-1/2 left-14 absolute -translate-y-1/2 z-10'>
        <IconButton icon={CaretLeftIcon} size='large' surface='primary' />
      </div>

      <div
        ref={scrollableElementRef}
        className='flex gap-10 h-[720px] overflow-auto relative px-40'
        style={{ scrollbarWidth: 'none' }}
      >
        {imagesUrl.map((imageUrl, i) => (
          <div key={module.images[i]._key} className='h-full w-auto shrink-0 relative'>
            <Image
              src={imageUrl}
              alt={module.images[i].altText}
              height={1000}
              width={1000}
              className='rounded-2xl h-full w-auto brightness-50'
            />
            <div className='absolute bottom-10 left-6 text-fg-light flex flex-col gap-2'>
              <p className='text-3xl font-lg'>Client Name</p>
              <p className='text-xl'>Location Name</p>
            </div>
          </div>
        ))}
      </div>
      <div className='top-1/2 right-14 absolute -translate-y-1/2 z-10'>
        <IconButton icon={CaretRightIcon} size='large' surface='primary' />
      </div>
    </div>
  );
}
