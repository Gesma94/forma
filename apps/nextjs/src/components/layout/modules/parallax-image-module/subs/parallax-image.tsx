'use client';

import { isNotNil } from 'es-toolkit';
import { useRef, useState } from 'react';

type TProps = {
  isSmallImage: boolean;
  imageUrl: string;
  altText: string | undefined | null;
};

export function ParallaxImage({ altText, imageUrl }: TProps) {
  const hasAltText = isNotNil(altText);
  const imageRef = useRef<HTMLImageElement>(null);
  const [xTranslate] = useState(0);

  // const handleDocumentScroll = useCallback((e: Event) => {
  //     const image = imageRef.current;

  //     if (isNil(image) || !isInView) {
  //         return;
  //     }

  //     const imageBox = image.getBoundingClientRect();
  //     const distanceFromTop = window.innerHeight - imageBox.top;

  //     if (distanceFromTop < 0) {
  //     console.log("here1");
  //     return;
  //     }
  //     setXTranslate((distanceFromTop / imageBox.height * 40 * (isSmallImage ? 0.2 : -1)) + (isSmallImage ? 10 : 45));
  // }, [isInView]);

  // useLayoutEffect(() => {
  //     document.addEventListener('scroll', handleDocumentScroll);

  //     return () => {
  //         document.removeEventListener('scroll', handleDocumentScroll);
  //     }
  // }, [handleDocumentScroll]);

  return (
    <div
      className='size-full contain-size shadow-image rounded-2xl'
      style={{ transform: `translateY(${-xTranslate}px)` }}
    >
      <img ref={imageRef} src={imageUrl} alt={altText} className='size-full object-cover rounded-2xl' />
      {hasAltText && (
        <div className='absolute bottom-4 left-4  text-primary-text  text-shadow-xl text-md'>
          <p className='text-md'>{altText}</p>
        </div>
      )}
    </div>
  );
}
