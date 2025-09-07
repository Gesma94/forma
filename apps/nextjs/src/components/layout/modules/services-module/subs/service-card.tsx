'use client';

import { useEffect, useRef, useState } from 'react';
import { tv } from 'tailwind-variants';
import { BasePortableText } from '@/ui/portable-text/base-portable-text';
import type { TServiceCard } from './type';

type TProps = TServiceCard;

export function ServiceCard({ content, title, video }: TProps) {
  const [isActive, setIsActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { videoStyle, buttonStyle, contentContainerStyle, h2Style } = style({ isActive });

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

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isActive]);

  return (
    <button
      type='button'
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      className={buttonStyle()}
      onMouseOver={hanldleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <video
        ref={videoRef}
        preload='metadata'
        loop={true}
        controls={false}
        autoPlay={false}
        muted={true}
        className={videoStyle()}
      >
        <source src={video.url} type='video/mp4' />
      </video>
      <div className={contentContainerStyle()}>
        <h2 className={h2Style()}>{title}</h2>
        <BasePortableText value={content} components={{}} />
      </div>
    </button>
  );
}

const style = tv({
  slots: {
    buttonStyle: 'size-full relative overflow-hidden',
    videoStyle: 'absolute inset-0 size-full object-cover transition-all duration-300',
    contentContainerStyle: 'relative px-10 xl:px-20',
    h2Style: 'text-3xl xl:text-5xl text-primary-text font-accent'
  },
  variants: {
    isActive: {
      true: {
        videoStyle: 'scale-125 brightness-50'
      },
      false: {
        videoStyle: 'scale-100 brightness-[.25]'
      }
    }
  }
});
