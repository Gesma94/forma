'use client';

import type { TModuleVariants } from '@forma/common';
import type { TFormaMediaUnwrapped } from 'common/utils/get-forma-media';
import { motion, useDragControls, useMotionValue } from 'motion/react';
import { useRef } from 'react';
import { FormaMediaClientSide } from '@/ui/forma-media/forma-media-client-side';

type TProps = {
  variant: TModuleVariants;
  images: TFormaMediaUnwrapped[];
};

export function InlineGalleryCarousel({ images }: TProps) {
  // const [isCaretLeftDisabled, setIsCaretLeftDisabled] = useState(false);
  // const [isCaretRightDisabled, setIsCaretRightDisabled] = useState(false);
  const scrollableElementRef = useRef<HTMLDivElement>(null);
  // const isInView = useInView(scrollableElementRef, { once: true });
  const constraintsRef = useRef(null);
  const controls = useDragControls();
  const handleX = useMotionValue(0);

  // const buttonSurface: ComponentProps<typeof IconButton>['surface'] = variant === 'on-primary' ? 'primary' : 'bg';

  // const handleCaretLeftClick = () => {
  //   const scrollableElement = scrollableElementRef.current;

  //   if (isNil(scrollableElement)) {
  //     return false;
  //   }

  //   scrollableElement.scrollBy({ left: -1, behavior: 'smooth' });

  //   controls.start(new PointerEvent('test', { clientX: 200, movementX: 200 }));
  // };

  // const handleCaretRightClick = () => {
  //   const scrollableElement = scrollableElementRef.current;

  //   if (isNil(scrollableElement)) {
  //     return false;
  //   }

  //   scrollableElement.scrollBy({ left: 1, behavior: 'smooth' });

  //   animate(handleX, 100, { duration: 2, ease: 'easeOut' });
  // };

  // const handleScroll: UIEventHandler<HTMLDivElement> = e => {
  //   setIsCaretLeftDisabled(e.currentTarget.scrollLeft === 0);
  //   setIsCaretRightDisabled(e.currentTarget.scrollLeft + e.currentTarget.offsetWidth >= e.currentTarget.scrollWidth);
  // };

  // useEffect(() => {
  //   const scrollableElement = scrollableElementRef.current;

  //   if (isNil(scrollableElement)) {
  //     return;
  //   }

  //   const middleElement = scrollableElement.children[Math.floor(scrollableElement.children.length / 2)];
  //   const middleElementBbox = middleElement.getBoundingClientRect();

  //   if (middleElement instanceof HTMLElement) {
  //     handleX.jump(-(160 + middleElement.offsetLeft + (middleElementBbox.width / 2) + 105));
  //   }

  // }, []);

  return (
    <div className='relative flex overflow-x-hidden' ref={constraintsRef}>
      {/* <div className='top-1/2 left-2 sm:left-14 absolute -translate-y-1/2 z-10 touch-device:hidden'>
        <IconButton
          icon={CaretLeftIcon}
          size='large'
          surface={buttonSurface}
          onClick={handleCaretLeftClick}
          isDisabled={isCaretLeftDisabled}
        />
      </div> */}

      <div className='max-w-dvw'>
        <motion.div
          ref={scrollableElementRef}
          // onScroll={handleScroll}
          drag='x'
          dragControls={controls}
          dragConstraints={constraintsRef}
          // initial={{ x: '-44%' }}
          className='min-w-max flex gap-4 sm:gap-10 h-[720px] relative px-4 sm:px-20 lg:px-40 snap-x snap-mandatory'
          style={{ scrollbarWidth: 'none', x: handleX }}
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

      {/* <div className='top-1/2 right-2 sm:right-14 absolute -translate-y-1/2 z-10 touch-device:hidden'>
        <IconButton
          icon={CaretRightIcon}
          size='large'
          surface={buttonSurface}
          onClick={handleCaretRightClick}
          isDisabled={isCaretRightDisabled}
        />
      </div> */}
    </div>
  );
}
