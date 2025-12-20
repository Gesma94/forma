import type { Reference } from '@sanity/types';
import type { TFormaMediaUnwrapped } from 'common/utils/get-forma-media';

export type TScrollGalleryMedia = TFormaMediaUnwrapped & {
  key: string;
  tagReferences: Reference[];
};
