import type { FormaImageAssetDocumentType } from 'types/generated/sanity-types-generated';
import { getSanityImageUrl, type TSanityImageUrlBuilderOptions } from '@/utils/groqd-client';

export type TFormaImageInstanceUnwrapped = {
  mediaType: FormaImageAssetDocumentType['_type'];
  imageUrl: string;
  imageUrlHq: string;
  imageAltText: string;
};

export function getFormaImageInstanceData(
  formaImage: FormaImageAssetDocumentType,
  imageBuilderOptions?: TSanityImageUrlBuilderOptions
): TFormaImageInstanceUnwrapped {
  const imageUrl = getSanityImageUrl(formaImage.image, imageBuilderOptions);
  const imageUrlHq = getSanityImageUrl(formaImage.image);
  const imageAltText = `${formaImage.clientName} - ${formaImage.imageTitle}`;

  return {
    imageUrl,
    imageUrlHq,
    imageAltText,
    mediaType: 'formaImageAssetDocumentType'
  };
}
