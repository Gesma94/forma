import type { FormaImageAssetDocumentType } from 'types/generated/sanity-types-generated';
import { getSanityImageUrl } from '@/utils/groqd-client';

export type TFormaImageInstanceUnwrapped = {
  mediaType: FormaImageAssetDocumentType['_type'];
  imageUrl: string;
  imageAltText: string;
};

export function getFormaImageInstanceData(formaImage: FormaImageAssetDocumentType): TFormaImageInstanceUnwrapped {
  const imageUrl = getSanityImageUrl(formaImage.image);
  const imageAltText = `${formaImage.clientName} - ${formaImage.imageTitle}`;

  return {
    imageUrl,
    imageAltText,
    mediaType: 'formaImageAssetDocumentType'
  };
}
