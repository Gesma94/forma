'use client';

import View360, { type AutoplayOptions, EquirectProjection } from '@egjs/react-view360';
import { useMemo } from 'react';
import '@egjs/react-view360/css/view360.min.css';
import { ArrowsOutCardinalIcon } from '@phosphor-icons/react';

type TProps = {
  imageUrl: string;
  isZoomEnabled: boolean;
  initialZoom: number;
  isAutoplayEnabled: boolean;
  showDisplayHint?: boolean;
};

export function Viewer360({ imageUrl, initialZoom, isAutoplayEnabled, isZoomEnabled, showDisplayHint }: TProps) {
  showDisplayHint ??= true;
  const projection = useMemo(
    () =>
      new EquirectProjection({
        src: imageUrl
      }),
    [imageUrl]
  );

  const autoplayOptions = useMemo<boolean | Partial<AutoplayOptions>>(() => {
    if (!isAutoplayEnabled) {
      return false;
    }

    return {
      delay: 0,
      canInterrupt: true,
      pauseOnHover: true,
      delayOnMouseLeave: 0,
      speed: 2
    };
  }, [isAutoplayEnabled]);

  return (
    <div className='size-full relative'>
      {showDisplayHint && (
        <div className='absolute size-full flex flex-col items-center justify-center z-10 text-primary-text pointer-events-none'>
          <ArrowsOutCardinalIcon className='size-1/4 max-w-32 max-h-32 opacity-50' />
          <p className='absolute bottom-4'>Click and drag to explore 360° view</p>
        </div>
      )}
      <View360
        autoplay={autoplayOptions}
        zoom={isZoomEnabled}
        initialZoom={initialZoom}
        className='is-16by9 size-full'
        projection={projection}
      />
    </div>
  );
}
