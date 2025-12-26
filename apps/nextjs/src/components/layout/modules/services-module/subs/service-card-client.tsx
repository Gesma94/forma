'use client';

import { type CSSProperties, useState } from 'react';
import type { TFormaMediaUnwrapped } from 'types/forma-media';
import type { ServiceObjectType } from 'types/generated/sanity-types-generated';
import { FormaMediaClientSide } from '@/ui/forma-media/forma-media-client-side';
import { CardDescription } from './card-description';
import { CardHeading } from './card-heading';

type TProps = {
  service: ServiceObjectType;
  formaMediaData: TFormaMediaUnwrapped;
};

export function ServiceCardClient({ formaMediaData, service }: TProps) {
  const [isActive, setIsActive] = useState(false);
  const handleOnFocus = () => {
    setIsActive(true);
  };

  const handleOnBlur = () => {
    setIsActive(false);
  };

  const hanldleMouseOver = () => {
    setIsActive(true);
  };

  const handleMouseOut = () => {
    setIsActive(false);
  };

  const getContainerStyle = (): CSSProperties => {
    if (isActive) {
      return {
        gridTemplateRows: '1fr 35rem',
        transform: 'scale(110%)',
        zIndex: 10
      };
    }
  };

  return (
    <button
      type='button'
      style={getContainerStyle()}
      className='transition-all duration-300 size-full grid grid-rows-[1fr_5rem] relative h-[40rem] rounded-2xl overflow-hidden shadow-2xl'
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      onMouseOver={hanldleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className='absolute inset-0'>
        <FormaMediaClientSide {...formaMediaData} className='size-full rounded-2xl object-cover' />
      </div>
      <div className='transition-all row-start-2 bg-primary relative'>
        <div className='h-[5rem] text-center flex items-center justify-center'>
          <CardHeading value={service.title} />
        </div>
        <div className='h-[30rem] px-10 py-4 text-center'>
          <CardDescription value={service.description} />
        </div>
      </div>
    </button>
  );
}
