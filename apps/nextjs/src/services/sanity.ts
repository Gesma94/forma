import type { FormaImageInstanceObjectType } from 'types/generated/sanity-types-generated';
import { q, runQuery } from '@/utils/groqd-client';

type TSanityQueryParams = {
  imageAssetId: string;
};
export async function getFormaImageAsset(formaImageInstance: FormaImageInstanceObjectType) {
  const imageAsset = await runQuery(
    q
      .parameters<TSanityQueryParams>()
      .star.filterByType('formaImageAssetDocumentType')
      .filterBy('_id == $imageAssetId')
      .slice(0),
    { parameters: { imageAssetId: formaImageInstance.image._ref } }
  );

  return imageAsset;
}
