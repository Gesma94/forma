import type { TFormaMediaUnwrapped } from 'common/utils/get-forma-media';
import type { MediaTagAssetDocumentType } from 'types/generated/sanity-types-generated';

export type TScrollGalleryMedia = TFormaMediaUnwrapped & {
  key: string;
  tags: MediaTagAssetDocumentType[];
};
