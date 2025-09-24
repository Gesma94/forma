import type { InlineGalleryModuleDocumentType } from 'types/generated/sanity-types-generated';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { getSanityImageUrl } from '@/utils/groqd-client';
import { InlineGalleryCarousel } from './subs/inline-gallery-carousel';

type TProps = {
  module: InlineGalleryModuleDocumentType;
};

export async function InlineGalleryModule({ module }: TProps) {
  const imagesUrl = await Promise.all(module.images.map(x => getSanityImageUrl(x)));

  return (
    <ModuleContentContainer variant='on-primary' title={module.heading} skipContentContainer={true}>
      <InlineGalleryCarousel module={module} imagesUrl={imagesUrl} />
      {(module.primaryCta.showCta || module.secondaryCta.showCta) && (
        <div className='mt-10 mx-auto flex gap-8'>
          {module.primaryCta.showCta && (
            <LinkButton href={module.primaryCta.url} size='large' variant='primary' surface='primary'>
              {module.primaryCta.caption}
            </LinkButton>
          )}
          {module.secondaryCta.showCta && (
            <LinkButton href={module.secondaryCta.url} size='large' variant='ghost' surface='primary'>
              {module.secondaryCta.caption}
            </LinkButton>
          )}
        </div>
      )}
    </ModuleContentContainer>
  );
}
