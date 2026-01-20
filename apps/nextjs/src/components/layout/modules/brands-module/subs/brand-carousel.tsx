'use client';

import 'swiper/css';
import type { TModuleVariants } from '@forma/common';
import { type Options, Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { BrandListItem } from './brand-list-item';
import type { TClientBrand } from './types';
import '@splidejs/splide/dist/css/splide.min.css';
import { useMemo } from 'react';

type Props = {
  brands: TClientBrand[];
  variant: TModuleVariants;
};

export function BrandCarousel({ brands, variant }: Props) {
  const splideOptionsMemoized = useMemo<Options>(
    () => ({
      type: 'loop',
      autoScroll: {
        pauseOnHover: false,
        pauseOnFocus: false,
        rewind: true,
        speed: 1
      },
      autoWidth: true,
      arrows: false,
      pagination: false
    }),
    []
  );

  const splideExtensions = useMemo(() => ({ AutoScroll }), []);
  return (
    <Splide options={splideOptionsMemoized} extensions={splideExtensions}>
      {brands.map(brand => {
        return (
          <SplideSlide className='px-4' key={`${brand._id}_1`}>
            <BrandListItem brand={brand} variant={variant} />
          </SplideSlide>
        );
      })}
    </Splide>
  );
}
