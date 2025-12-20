import { randomUUID } from 'node:crypto';
import type { TImageTag } from '@forma/common';
import { getFormaMediaData } from 'common/utils/get-forma-media';
import type { ScrollGalleryModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ScrollGalleryClientModule } from './subs/scroll-gallery-client-module';
import type { TScrollGalleryMedia } from './subs/types';

type TProps = {
  module: ScrollGalleryModuleDocumentType;
};

export async function ScrollGalleryModule({ module }: TProps) {
  const medias = await Promise.all(
    module.scrollGalleryImages.map<Promise<TScrollGalleryMedia>>(async x => {
      const mediaData = await getFormaMediaData(x.formaMedia);
      return {
        key: x._key,
        ...mediaData,
        tags: x.imageTags as TImageTag[]
      };
    })
  );
  const targetLength = 50;
  const result: TScrollGalleryMedia[] = [];

  while (result.length < targetLength) {
    const randomIndex = Math.floor(Math.random() * medias.length);
    const element = structuredClone(medias[randomIndex]);
    element.key = randomUUID();
    result.push(element);
  }

  return <ScrollGalleryClientModule medias={medias} />;
}
