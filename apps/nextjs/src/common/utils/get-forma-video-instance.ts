import type { FormaVideoAssetDocumentType } from 'types/generated/sanity-types-generated';
import { getSanityImageUrl, q, runQuery } from '@/utils/groqd-client';

type TFormaVideoInstanceUnwrapped = {
  mediaType: FormaVideoAssetDocumentType['_type'];
  videoUrl: string;
  thumbnailUrl: string;
  videoAltText: string;
};

type TSanityQueryParams = {
  documentId: string;
};

export async function getFormaVideoInstanceData(
  formaVideo: FormaVideoAssetDocumentType
): Promise<TFormaVideoInstanceUnwrapped> {
  const videoAltText = `${formaVideo.clientName} - ${formaVideo.videoTitle}`;
  const thumbnailUrl = getSanityImageUrl(formaVideo.thumbnail);
  const video = await runQuery(
    q.parameters<TSanityQueryParams>().star.filterByType('sanity.fileAsset').filterRaw('_id == $documentId').slice(0),
    { parameters: { documentId: formaVideo.video.asset._ref } }
  );
  return {
    thumbnailUrl,
    videoAltText,
    videoUrl: video.url,
    mediaType: 'formaVideoAssetDocumentType'
  };
}
