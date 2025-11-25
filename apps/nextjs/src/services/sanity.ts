import { q, runQuery } from "@/utils/groqd-client";
import { FormaImageInstanceObjectType } from "types/generated/sanity-types-generated";

type TSanityQueryParams = {
    imageAssetId: string;
}
export async function getFormaImageAsset(formaImageInstance: FormaImageInstanceObjectType) {
    const imageAsset = await runQuery(q.parameters<TSanityQueryParams>().star.filterByType('formaImageAssetDocumentType').filterBy('_id == $imageAssetId').slice(0),
        { parameters: { imageAssetId: formaImageInstance.image._ref }}
      );

    return imageAsset;
}