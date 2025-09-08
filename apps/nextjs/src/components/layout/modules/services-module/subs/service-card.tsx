'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { tv } from 'tailwind-variants';
import { ServiceCardContent } from './service-card-content';
import type { TServiceCard } from './type';

type TProps = TServiceCard;

export function ServiceCard({ content, title, video }: TProps) {
  const [isActive, setIsActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { videoStyle, buttonStyle, contentContainerStyle, h2Style, contentWrapperStyle } = style({ isActive });

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
        <motion.h2 className={h2Style()}>{title}</motion.h2>
        <motion.div
          className={contentWrapperStyle()}
          initial={{ opacity: 0, y: 10, height: 0 }}
          animate={isActive ? { opacity: 1, y: 0, height: '50%' } : { opacity: 0, y: 10, height: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ServiceCardContent value={content} />
        </motion.div>
      </div>
    </button>
  );
}

const style = tv({
  slots: {
    buttonStyle: 'size-full relative overflow-hidden',
    videoStyle: 'absolute inset-0 size-full object-cover transition-all duration-300',
    contentContainerStyle: 'size-full flex flex-col items-center justify-center relative px-10 xl:px-20',
    h2Style: 'text-3xl xl:text-5xl text-primary-text font-accent',
    contentWrapperStyle: 'hidden lg:block mt-10'
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
