'use client';

import type { TModuleVariants } from '@forma/common';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { TFormaMediaUnwrapped } from 'types/forma-media';
import { FormaMediaClientSide } from '@/ui/forma-media/forma-media-client-side';
import 'swiper/css';

type TProps = {
  variant: TModuleVariants;
  images: TFormaMediaUnwrapped[];
};

export function InlineGalleryCarousel({ images }: TProps) {
  return (
    <div className='relative flex overflow-x-hidden'>
      <div className='max-w-dvw'>
        <Swiper
          loop={true}
          draggable='false'
          slidesPerView='auto'
          centeredSlides={true}
          className='h-[720px]'
          initialSlide={Math.floor(images.length / 2)}
        >
          {images.map(image => {
            return (
              <SwiperSlide
                key={image.id}
                draggable='false'
                className='h-full px-4'
                style={{ width: 'fit-content', userSelect: 'none' }}
              >
                <FormaMediaClientSide
                  {...image}
                  imgProps={{ draggable: 'false', className: 'rounded-2xl h-full w-auto object-cover' }}
                  videoProps={{ draggable: 'false', className: 'rounded-2xl h-full w-auto object-cover' }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
