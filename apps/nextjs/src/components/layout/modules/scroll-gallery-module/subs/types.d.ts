import { TImageTag } from '@forma/common';
import { IFormImageAsset } from 'common/utils/get-forma-image';

export interface IScrollGalleryImage extends IFormImageAsset {
  key: string;
  tags: TImageTag[];
}
