import { TImageTag } from '@forma/common';
import { TFormaMediaUnwrapped } from 'common/utils/get-forma-media';

export type TScrollGalleryMedia = TFormaMediaUnwrapped & {
  key: string;
  tags: TImageTag[];
};
