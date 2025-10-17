import { TImageTag } from '@forma/common';
import { ScrollGalleryImageObjectType } from 'types/generated/sanity-types-generated';

export interface IScrollGalleryImage {
  key: string;
  title: string;
  iamgeUrl: string;
  tags: TImageTag[];
  image: ScrollGalleryImageObjectType['image'];
}
