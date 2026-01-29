import { getFormaMediaData } from 'common/utils/get-forma-media';
import type { ScrollGalleryModuleDocumentType } from 'types/generated/sanity-types-generated';
import { q, runQuery } from '@/utils/groqd-client';
import { ScrollGalleryClientModule } from './subs/scroll-gallery-client-module';
import type { TScrollGalleryMedia } from './subs/types';

type TProps = {
  module: ScrollGalleryModuleDocumentType;
};

export async function ScrollGalleryModule({ module }: TProps) {
  const filters = await runQuery(q.star.filterByType('mediaTagAssetDocumentType'));
  const medias = await Promise.all(
    module.scrollGalleryImages.map<Promise<TScrollGalleryMedia>>(async x => {
      const mediaData = await getFormaMediaData(x.formaMedia, { imageBuilderOptions: { width: 1000 } });
      return {
        key: x._key,
        tagReferences: x.mediaTags,
        formaMediaUnwrapped: mediaData
      };
    })
  );

  return (
    <ScrollGalleryClientModule medias={medias} filters={filters} backgroundShadeColor={module.backgroundShadeColor} />
  );
}
