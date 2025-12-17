import { fetchFormaImageAssetDocument } from 'common/utils/get-forma-image';
import type { InlineGalleryModuleDocumentType } from 'types/generated/sanity-types-generated';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { InlineGalleryCarousel } from './subs/inline-gallery-carousel';
import { tv } from 'tailwind-variants';
import { isNotNil } from 'es-toolkit';

type TProps = {
  module: InlineGalleryModuleDocumentType;
};

export async function InlineGalleryModule({ module }: TProps) {
  const { inlineGalleryWrapperTv } = stylesTv({ withTitle: isNotNil(module.heading)});
  const images = await Promise.all(
    module.images.map(async x => ({ ...(await fetchFormaImageAssetDocument(x._ref)), key: x._key }))
  );

  return (
    <ModuleContentContainer variant='on-primary' title={module.heading} skipContentContainer={true}>
      <div className={inlineGalleryWrapperTv()}>
        <InlineGalleryCarousel images={images} />
      </div>
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

const stylesTv = tv({
  slots: {
    inlineGalleryWrapperTv: ''
  },
  variants: {
    withTitle: {
      true: {
        inlineGalleryWrapperTv: 'mt-10',
      }
    }
  }
})