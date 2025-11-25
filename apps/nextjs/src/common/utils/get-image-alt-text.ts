import { isNotNil } from "es-toolkit";
import { getFormaImageAsset } from "services/sanity";
import { FormaImageAssetDocumentType, FormaImageInstanceObjectType } from "types/generated/sanity-types-generated";

export function getImageAltText(image: { altText?: string }): string {
  return image.altText ?? 'Forma Artwork';
}

export async function getImageAltText2(formaImageInstance: FormaImageInstanceObjectType, formaImageAsset?: FormaImageAssetDocumentType): Promise<string> {
  if (!isNotNil(formaImageInstance.overrideAltText)) {
    return formaImageInstance.overrideAltText;
  }

  formaImageAsset ??= await getFormaImageAsset(formaImageInstance);
  return formaImageAsset.altText ?? 'Forma Artwork';
}