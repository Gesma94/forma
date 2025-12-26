import type { Reference } from '@sanity/types';
import type { TFormaMediaUnwrapped } from 'common/utils/get-forma-media';

export type TScrollGalleryMedia = {
  key: string;
  tagReferences: Reference[];
  formaMediaUnwrapped: TFormaMediaUnwrapped;
};
