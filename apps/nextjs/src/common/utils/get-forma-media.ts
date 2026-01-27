import type { TFormaMediaUnwrapped } from 'types/forma-media';
import type { FormaMediaInstanceObjectType } from 'types/generated/sanity-types-generated';
import { getSanityImageUrl, q, runQuery, type TSanityImageUrlBuilderOptions } from '@/utils/groqd-client';

type TSanityQueryParams = {
  documentId: string;
};

type TGetFormaMediaDataOptions = {
  imageBuilderOptions?: TSanityImageUrlBuilderOptions;
};

export async function getFormaMediaData(
  formaMedia: FormaMediaInstanceObjectType,
  options?: TGetFormaMediaDataOptions
): Promise<TFormaMediaUnwrapped> {
  const brightness = formaMedia.brightness;
  const showMediaTitle = formaMedia.showMediaTitle;

  const mediaAsset = await runQuery(q.parameters<TSanityQueryParams>().star.filterRaw('_id == $documentId').slice(0), {
    parameters: { documentId: formaMedia.formaMedia._ref }
  });

  if (mediaAsset._type === 'formaImageAssetDocumentType') {
    const imageUrl = getSanityImageUrl(mediaAsset.image, options?.imageBuilderOptions);
    const imageUrlHq = getSanityImageUrl(mediaAsset.image);
    const imageAltText = `${mediaAsset.clientName} - ${mediaAsset.imageTitle}`;

    return {
      id: mediaAsset._id,
      mediaType: 'formaImageAssetDocumentType',
      brightness,
      imageAltText,
      imageUrl,
      imageUrlHq,
      showMediaTitle
    };
  } else if (mediaAsset._type === 'forma360AssetDocumentType') {
    const imageUrl = getSanityImageUrl(mediaAsset.image);
    const imageUrlHq = getSanityImageUrl(mediaAsset.image);
    const imageAltText = `${mediaAsset.clientName} - ${mediaAsset.imageTitle}`;

    return {
      id: mediaAsset._id,
      mediaType: 'forma360AssetDocumentType',
      brightness,
      imageAltText,
      imageUrl,
      imageUrlHq,
      showMediaTitle,
      initialZoom: formaMedia.initialZoom ?? 0,
      hintOpacity: formaMedia.hintOpacity ?? 100,
      isZoomEnabled: formaMedia.isZoomEnabled ?? false,
      is360HintShown: formaMedia.is360HintShown ?? true,
      is360FullScreenShown: formaMedia.is360FullScreenShown ?? true,
      is360AutoplayEnabled: formaMedia.is360AutoplayEnabled ?? false
    };
  } else if (mediaAsset._type === 'formaVideoAssetDocumentType') {
    const videoAltText = `${mediaAsset.clientName} - ${mediaAsset.videoTitle}`;
    const thumbnailUrl = getSanityImageUrl(mediaAsset.thumbnail);
    const video = await runQuery(
      q.parameters<TSanityQueryParams>().star.filterByType('sanity.fileAsset').filterRaw('_id == $documentId').slice(0),
      { parameters: { documentId: mediaAsset.video.asset._ref } }
    );

    return {
      id: mediaAsset._id,
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
