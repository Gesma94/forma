'use client';

import type { TModuleVariants } from '@forma/common';
import { isNil } from 'es-toolkit';
import { motion, useDragControls } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { TFormaMediaUnwrapped } from 'types/forma-media';
import { FormaMediaClientSide } from '@/ui/forma-media/forma-media-client-side';

type TProps = {
  variant: TModuleVariants;
  images: TFormaMediaUnwrapped[];
};

export function InlineGalleryCarousel({ images }: TProps) {
  const scrollableElementRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef(null);
  const controls = useDragControls();
  const [manualX, setManualX] = useState(0);

  useEffect(() => {
    const scrollableElement = scrollableElementRef.current;

    if (isNil(scrollableElement)) {
      return;
    }

    const middleElement = scrollableElement.children[Math.floor(scrollableElement.children.length / 2)];

    if (middleElement instanceof HTMLElement) {
      setManualX(-middleElement.offsetLeft + (window.innerWidth - middleElement.clientWidth) / 2);
    }
  }, []);

  return (
    <div className='relative flex overflow-x-hidden' ref={constraintsRef}>
      <div className='max-w-dvw'>
        <motion.div
          ref={scrollableElementRef}
          drag='x'
          dragControls={controls}
          dragConstraints={constraintsRef}
          className='min-w-max flex gap-4 sm:gap-10 h-[720px] relative px-4 sm:px-20 lg:px-40 snap-x snap-mandatory'
          style={{ scrollbarWidth: 'none', x: manualX }}
        >
          {images.map(image => {
            return (
              <div
                key={image.id}
                className='h-full w-auto shrink-0 relative max-w-[calc(100vw-3rem)] sm:max-w-[calc(100vw-4rem)] snap-center'
              >
                <FormaMediaClientSide
                  {...image}
                  imgProps={{ draggable: 'false', className: 'rounded-2xl h-full w-auto object-cover' }}
                  videoProps={{ draggable: 'false', className: 'rounded-2xl h-full w-auto object-cover' }}
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
