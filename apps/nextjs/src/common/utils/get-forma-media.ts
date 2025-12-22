import type {
  FormaImageAssetDocumentType,
  FormaMediaInstanceObjectType,
  FormaVideoAssetDocumentType
} from 'types/generated/sanity-types-generated';
import { getSanityImageUrl, q, runQuery } from '@/utils/groqd-client';

type TFormaMediaUnwrappedBase = {
  mediaType: FormaImageAssetDocumentType['_type'] | FormaVideoAssetDocumentType['_type'];
  brightness: number;
  showMediaTitle: boolean;
};

export type TFormaMediaImageUnwrapped = TFormaMediaUnwrappedBase & {
  mediaType: FormaImageAssetDocumentType['_type'];
  imageUrl: string;
  imageAltText: string;
};

export type TFormaMediaVideoUnwrapped = TFormaMediaUnwrappedBase & {
  mediaType: FormaVideoAssetDocumentType['_type'];
  isMuted: boolean;
  isLoopEnabled: boolean;
  isAutoplayEnabled: boolean;
  areControlsEnabled: boolean;
  videoUrl: string;
  videoAltText: string;
  thumbnailUrl: string;
};

export type TFormaMediaUnwrapped = TFormaMediaImageUnwrapped | TFormaMediaVideoUnwrapped;

type TSanityQueryParams = {
  documentId: string;
};

export async function getFormaMediaData(formaMedia: FormaMediaInstanceObjectType): Promise<TFormaMediaUnwrapped> {
  const brightness = formaMedia.brightness;
  const showMediaTitle = formaMedia.showMediaTitle;

  const mediaAsset = await runQuery(q.parameters<TSanityQueryParams>().star.filterRaw('_id == $documentId').slice(0), {
    parameters: { documentId: formaMedia.formaMedia._ref }
  });

  if (mediaAsset._type === 'formaImageAssetDocumentType') {
    const imageUrl = getSanityImageUrl(mediaAsset.image);
    const imageAltText = `${mediaAsset.clientName} - ${mediaAsset.imageTitle}`;

    return {
      mediaType: 'formaImageAssetDocumentType',
      brightness,
      imageAltText,
      imageUrl,
      showMediaTitle
    };
  } else if (mediaAsset._type === 'formaVideoAssetDocumentType') {
    const videoAltText = `${mediaAsset.clientName} - ${mediaAsset.videoTitle}`;
    const thumbnailUrl = getSanityImageUrl(mediaAsset.thumbnail);
    const video = await runQuery(
      q.parameters<TSanityQueryParams>().star.filterByType('sanity.fileAsset').filterRaw('_id == $documentId').slice(0),
      { parameters: { documentId: mediaAsset.video.asset._ref } }
    );

    return {
      mediaType: 'formaVideoAssetDocumentType',
      areControlsEnabled: formaMedia.areControlsEnabled,
      brightness,
      isAutoplayEnabled: formaMedia.isAutoplayEnabled,
      isLoopEnabled: formaMedia.isLoopEnabled,
      isMuted: formaMedia.isMuted,
      showMediaTitle,
      videoAltText: videoAltText,
      videoUrl: video.url,
      thumbnailUrl: thumbnailUrl
    };
  }
}
