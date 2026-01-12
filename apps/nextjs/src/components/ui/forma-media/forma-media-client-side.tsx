'use client';

import { isNotNil } from 'es-toolkit';
import type { CSSProperties, DetailedHTMLProps, ImgHTMLAttributes, VideoHTMLAttributes } from 'react';
import type { TFormaMediaUnwrapped } from 'types/forma-media';
import { Viewer360 } from '../viewer-360/viewer-360';

type TProps = TFormaMediaUnwrapped & {
  imgWidth?: number;
  imgHeight?: number;
  className?: string;
  imgProps?: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  videoProps?: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
  wrapper360Classname?: string;
  forceHideMediaTitle?: true;
  forceIs360HintShown?: boolean;
};

export function FormaMediaClientSide(props: TProps) {
  const { brightness, mediaType, showMediaTitle, className, forceHideMediaTitle, forceIs360HintShown } = props;
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
      <div className='relative size-full'>
        <img
          src={imageUrl}
          alt={imageAltText}
          style={brightnessStyle}
          {...imgProps}
          className={className ?? imgProps?.className}
        />
        {shouldDisplayMediaTitle && (
          <div className='absolute bottom-4 left-4 text-primary-text text-shadow-xl text-md'>
            <p className='text-md'>{imageAltText}</p>
          </div>
        )}
      </div>
    );
  } else if (props.mediaType === 'forma360AssetDocumentType') {
    const showDisplayHint = forceIs360HintShown ? true : props.forceIs360HintShown;
    return (
      <div className={props.wrapper360Classname ?? 'size-full'} style={brightnessStyle}>
        <Viewer360
          imageUrl={props.imageUrl}
          showDisplayHint={showDisplayHint}
          initialZoom={props.initialZoom}
          isZoomEnabled={props.isZoomEnabled}
          isAutoplayEnabled={props.is360AutoplayEnabled}
        />
      </div>
    );
  } else if (props.mediaType === 'formaVideoAssetDocumentType') {
    const {
      isMuted,
      isLoopEnabled,
      isAutoplayEnabled,
      areControlsEnabled,
      videoUrl,
      videoAltText,
      thumbnailUrl,
      videoProps
    } = props;

    return (
      <div className='relative size-full'>
        <video
          preload='metadata'
          style={brightnessStyle}
          muted={isMuted}
          loop={isLoopEnabled}
          autoPlay={isAutoplayEnabled}
          controls={areControlsEnabled}
          {...videoProps}
          poster={thumbnailUrl}
          className={className ?? videoProps?.className}
        >
          <source src={videoUrl} type='video/mp4' />
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
