'use client';

import View360, { type AutoplayOptions, EquirectProjection } from '@egjs/react-view360';
import { useMemo, useState } from 'react';
import '@egjs/react-view360/css/view360.min.css';
import { FrameCornersIcon } from '@phosphor-icons/react';
import { IconButton } from '../buttons/icon-button/icon-button';
import { FullScreenModal } from './subs/full-screen-modal';
import { Icon360 } from './subs/icon-360';

type TProps = {
  imageLabel: string;
  imageUrl: string;
  isZoomEnabled: boolean;
  initialZoom: number;
  isAutoplayEnabled: boolean;
  showDisplayHint?: boolean;
  isFullScreenShown?: boolean;
  hintOpacity?: number;
};

export function Viewer360({
  imageUrl,
  initialZoom,
  imageLabel,
  isAutoplayEnabled,
  isZoomEnabled,
  hintOpacity,
  showDisplayHint,
  isFullScreenShown
}: TProps) {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className='size-full relative group'>
      {showDisplayHint && (
        <div
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 size-[calc(100%_-_20px)] max-w-40 max-h-40 group-hover:opacity-50 group-hover:pointer-events-none transition-opacity duration-500'
          style={{ opacity: hintOpacity ? `${hintOpacity / 100} !important` : undefined }}
        >
          <Icon360 />
        </div>
      )}
      <View360
        autoplay={autoplayOptions}
        zoom={isZoomEnabled}
        initialZoom={initialZoom}
        className='is-16by9 size-full active:'
        projection={projection}
        canvasClass='outline-none'
        title={imageLabel}
      />
      {isFullScreenShown && (
        <>
          <div className='absolute bottom-4 left-4'>
            <IconButton
              size='medium'
              icon={FrameCornersIcon}
              aria-label='Open in full screen'
              onClick={() => setIsOpen(true)}
            />
          </div>
          <FullScreenModal imageLabel={imageLabel} isOpen={isOpen} projection={projection} onOpenChange={setIsOpen} />
        </>
      )}
    </div>
  );
}
