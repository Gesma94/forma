'use client';

import type { TFormaMediaUnwrapped } from 'common/utils/get-forma-media';
import { isNotNil } from 'es-toolkit';
import type { CSSProperties, DetailedHTMLProps, ImgHTMLAttributes, VideoHTMLAttributes } from 'react';

type TProps = TFormaMediaUnwrapped & {
  imgWidth?: number;
  imgHeight?: number;
  className?: string;
  imgProps?: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  videoProps?: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
  forceHideMediaTitle?: true;
};

export function FormaMediaClientSide(props: TProps) {
  const { brightness, mediaType, showMediaTitle, className, forceHideMediaTitle } = props;
  const shouldHideMediaTitle = forceHideMediaTitle === true || !showMediaTitle;
  const shouldDisplayMediaTitle = !shouldHideMediaTitle;

  const brightnessStyle: CSSProperties = isNotNil(brightness)
    ? {
        filter: `brightness(${brightness}%)`
      }
    : {};

  if (mediaType === 'formaImageAssetDocumentType') {
    const { imageUrl, imageAltText, imgProps } = props;
    return (
      <div className='contents relative'>
        <img
          src={imageUrl}
          alt={imageAltText}
          style={brightnessStyle}
          {...imgProps}
          className={className ?? imgProps?.className}
        />
        {shouldDisplayMediaTitle && (
          <div className='absolute bottom-4 left-4  text-primary-text  text-shadow-xl text-md'>
            <p className='text-md'>{imageAltText}</p>
          </div>
        )}
      </div>
    );
  } else if (props.mediaType === 'formaVideoAssetDocumentType') {
    const { isMuted, isLoopEnabled, isAutoplayEnabled, areControlsEnabled, videoUrl, videoAltText, videoProps } = props;

    return (
      <div className='contents relative'>
        <video
          preload='metadata'
          style={brightnessStyle}
          muted={isMuted}
          loop={isLoopEnabled}
          autoPlay={isAutoplayEnabled}
          controls={areControlsEnabled}
          {...videoProps}
          className={className ?? videoProps?.className}
        >
          <source src={`${videoUrl}#t=0.1`} type='video/mp4' />
        </video>
        {shouldDisplayMediaTitle && (
          <div className='absolute bottom-4 left-4  text-primary-text  text-shadow-xl text-md'>
            <p className='text-md'>{videoAltText}</p>
          </div>
        )}
      </div>
    );
  }
}
