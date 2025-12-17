import type { FormaImageInstanceObjectType } from 'types/generated/sanity-types-generated';
import { getSanityImageUrl, q, runQuery } from '@/utils/groqd-client';

export interface IFormImageInstance extends IFormImageAsset {
  brightness: number;
}

export interface IFormImageAsset {
  imageUrl: string;
  imageAltText: string;
  clientName?: string;
  imageTitle?: string;
}

type TSanityQueryParams = {
  documentId: string;
};

export async function getFormaImageData(formaImageInstance: FormaImageInstanceObjectType): Promise<IFormImageInstance> {
  const formaImageAsset = await fetchFormaImageAssetDocument(formaImageInstance.formaImage._ref);

  return {
    ...formaImageAsset,
    brightness: formaImageInstance.brightness,
    imageAltText: formaImageInstance.overrideAltText ?? formaImageAsset.imageAltText
  };
}

export async function fetchFormaImageAssetDocument(documentId: string): Promise<IFormImageAsset> {
  const imageAsset = await runQuery(
    q
      .parameters<TSanityQueryParams>()
      .star.filterByType('formaImageAssetDocumentType')
      .filterRaw('_id == $documentId')
      .slice(0),
    { parameters: { documentId } }
  );

  const imageUrl = getSanityImageUrl(imageAsset.image);
  const imageAltText = `${imageAsset.clientName} - ${imageAsset.imageTitle}`;

  return {
    imageAltText,
    imageUrl: imageUrl,
    clientName: imageAsset.clientName,
    imageTitle: imageAsset.imageTitle
  };
}
