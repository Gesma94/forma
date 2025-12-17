import { isNotNil } from 'es-toolkit';
import type { CSSProperties, DetailedHTMLProps, ImgHTMLAttributes, VideoHTMLAttributes } from 'react';
import type { FormaMediaInstanceObjectType } from 'types/generated/sanity-types-generated';
import { getSanityImageUrl, q, runQuery } from '@/utils/groqd-client';

type TProps = {
  imgWidth?: number;
  imgHeight?: number;
  className?: string;
  formaMedia: FormaMediaInstanceObjectType;
  imgProps?: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  videoProps?: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
};

type TSanityQueryParams = {
  documentId: string;
};

export async function FormaMedia({ formaMedia, videoProps, imgProps, className }: TProps) {
  const brightnessStyle: CSSProperties = isNotNil(formaMedia.brightness)
    ? {
        filter: `brightness(${formaMedia.brightness}%)`
      }
    : {};

  const mediaAsset = await runQuery(q.parameters<TSanityQueryParams>().star.filterRaw('_id == $documentId').slice(0), {
    parameters: { documentId: formaMedia.formaMedia._ref }
  });

  if (mediaAsset._type === 'formaImageAssetDocumentType') {
    const imageUrl = getSanityImageUrl(mediaAsset.image);
    const imageAltText = `${mediaAsset.clientName} - ${mediaAsset.imageTitle}`;

    return (
      <img
        src={imageUrl}
        alt={imageAltText}
        style={brightnessStyle}
        {...imgProps}
        className={className ?? imgProps.className}
      />
    );
  } else if (mediaAsset._type === 'formaVideoAssetDocumentType') {
    const video = await runQuery(
      q.parameters<TSanityQueryParams>().star.filterByType('sanity.fileAsset').filterRaw('_id == $documentId').slice(0),
      { parameters: { documentId: mediaAsset.video.asset._ref } }
    );

    return (
      <video
        preload='metadata'
        style={brightnessStyle}
        muted={formaMedia.isMuted}
        loop={formaMedia.isLoopEnabled}
        autoPlay={formaMedia.isAutoplayEnabled}
        controls={formaMedia.areControlsEnabled}
        {...videoProps}
        className={className ?? videoProps.className}
      >
        <source src={video.url} type='video/mp4' />
      </video>
    );
  }
}
