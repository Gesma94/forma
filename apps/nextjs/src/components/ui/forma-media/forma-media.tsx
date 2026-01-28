import { isNotNil } from 'es-toolkit';
import type { CSSProperties, DetailedHTMLProps, ImgHTMLAttributes, VideoHTMLAttributes } from 'react';
import type { FormaMediaInstanceObjectType } from 'types/generated/sanity-types-generated';
import { getSanityImageUrl, q, runQuery, type TSanityImageUrlBuilderOptions } from '@/utils/groqd-client';
import { Viewer360 } from '../viewer-360/viewer-360';

type TProps = {
  imgWidth?: number;
  imgHeight?: number;
  className?: string;
  formaMedia: FormaMediaInstanceObjectType;
  imgProps?: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  videoProps?: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
  wrapper360Classname?: string;
  forceHideMediaTitle?: true;
  forceIs360HintShown?: boolean;
  imageBuilderOptions?: TSanityImageUrlBuilderOptions;
};

type TSanityQueryParams = {
  documentId: string;
};

export async function FormaMedia({
  formaMedia,
  videoProps,
  imgProps,
  wrapper360Classname,
  className,
  forceHideMediaTitle,
  forceIs360HintShown,
  imageBuilderOptions
}: TProps) {
  const shouldHideMediaTitle = forceHideMediaTitle === true || !formaMedia.showMediaTitle;
  const shouldDisplayMediaTitle = !shouldHideMediaTitle;
  const brightnessStyle: CSSProperties = isNotNil(formaMedia.brightness)
    ? {
        filter: `brightness(${formaMedia.brightness}%)`
      }
    : {};
  const mediaAsset = await runQuery(q.parameters<TSanityQueryParams>().star.filterRaw('_id == $documentId').slice(0), {
    parameters: { documentId: formaMedia.formaMedia._ref }
  });

  if (mediaAsset._type === 'formaImageAssetDocumentType') {
    const imageUrl = getSanityImageUrl(mediaAsset.image, imageBuilderOptions);
    const imageAltText = `${mediaAsset.clientName} - ${mediaAsset.imageTitle}`;

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
  } else if (mediaAsset._type === 'forma360AssetDocumentType') {
    const imageUrl = getSanityImageUrl(mediaAsset.image);
    const showDisplayHint = forceIs360HintShown ? true : formaMedia.is360HintShown;
    const imageAltText = `${mediaAsset.clientName} - ${mediaAsset.imageTitle}`;

    return (
      <div className={wrapper360Classname ?? 'size-full'} style={brightnessStyle}>
        <Viewer360
          imageUrl={imageUrl}
          imageLabel={imageAltText}
          showDisplayHint={showDisplayHint}
          hintOpacity={formaMedia.hintOpacity}
          initialZoom={formaMedia.initialZoom}
          isZoomEnabled={formaMedia.isZoomEnabled}
          isAutoplayEnabled={formaMedia.is360AutoplayEnabled}
          isFullScreenShown={formaMedia.is360FullScreenShown}
        />
      </div>
    );
  } else if (mediaAsset._type === 'formaVideoAssetDocumentType') {
    const videoAltText = `${mediaAsset.clientName} - ${mediaAsset.videoTitle}`;
    const thumbnailUrl = getSanityImageUrl(mediaAsset.thumbnail);
    const video = await runQuery(
      q.parameters<TSanityQueryParams>().star.filterByType('sanity.fileAsset').filterRaw('_id == $documentId').slice(0),
      { parameters: { documentId: mediaAsset.video.asset._ref } }
    );

    return (
      <div className='relative size-full'>
        <video
          preload='metadata'
          style={brightnessStyle}
          playsInline={true}
          muted={formaMedia.isMuted}
          loop={formaMedia.isLoopEnabled}
          autoPlay={formaMedia.isAutoplayEnabled}
          controls={formaMedia.areControlsEnabled}
          {...videoProps}
          poster={thumbnailUrl}
          className={className ?? videoProps?.className}
        >
          <source src={video.url} type='video/mp4' />
        </video>
        {shouldDisplayMediaTitle && (
          <div className='absolute bottom-4 left-4 text-primary-text text-shadow-xl text-md'>
            <p className='text-md'>{videoAltText}</p>
          </div>
        )}
      </div>
    );
  }
}
