import { randomUUID } from 'node:crypto';
import type { TImageTag } from '@forma/common';
import { fetchFormaImageAssetDocument } from 'common/utils/get-forma-image';
import type { ScrollGalleryModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ScrollGalleryClientModule } from './subs/scroll-gallery-client-module';
import type { IScrollGalleryImage } from './subs/types';

type TProps = {
  module: ScrollGalleryModuleDocumentType;
};

export async function ScrollGalleryModule({ module }: TProps) {
  const images = await Promise.all(
    module.scrollGalleryImages.map<Promise<IScrollGalleryImage>>(async x => {
      const imageData = await fetchFormaImageAssetDocument(x.image._ref);
      return {
        key: x._key,
        ...imageData,
        tags: x.imageTags as TImageTag[]
      };
    })
  );
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
