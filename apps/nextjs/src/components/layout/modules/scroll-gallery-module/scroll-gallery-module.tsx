import { randomUUID } from 'node:crypto';
import type { TImageTag } from '@forma/common';
import type { ScrollGalleryModuleDocumentType } from 'types/generated/sanity-types-generated';
import { getSanityImageUrl } from '@/utils/groqd-client';
import { ScrollGalleryClientModule } from './subs/scroll-gallery-client-module';
import type { IScrollGalleryImage } from './subs/types';

type TProps = {
  module: ScrollGalleryModuleDocumentType;
};

export function ScrollGalleryModule({ module }: TProps) {
  const images = module.scrollGalleryImages.map<IScrollGalleryImage>(x => ({
    key: x._key,
    title: x.title,
    image: x.image,
    iamgeUrl: getSanityImageUrl(x.image),
    tags: x.imageTags as TImageTag[]
  }));
  const targetLength = 50;
  const result: IScrollGalleryImage[] = [];

  while (result.length < targetLength) {
    const randomIndex = Math.floor(Math.random() * images.length);
    const element = structuredClone(images[randomIndex]);
    element.key = randomUUID();
    result.push(element);
  }

  return <ScrollGalleryClientModule images={result} />;
}
