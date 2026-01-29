import { getFormaImageInstanceData } from 'common/utils/get-forma-image-instance';
import { getFormaVideoInstanceData } from 'common/utils/get-forma-video-instance';
import { isNotNil } from 'es-toolkit';
import type { ComponentProps } from 'react';
import { tv } from 'tailwind-variants';
import type { TFormaMediaUnwrapped } from 'types/forma-media';
import type { InlineGalleryModuleDocumentType } from 'types/generated/sanity-types-generated';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { BackgroundVariantContainer } from '@/ui/containers/background-variant-container/background-variant-container';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { VerticalPaddingContainer } from '@/ui/containers/vertical-padding-container/vertical-padding-container';
import { q, runQuery } from '@/utils/groqd-client';
import { InlineGalleryCarousel } from './subs/inline-gallery-carousel';

type TProps = {
  module: InlineGalleryModuleDocumentType;
};

type TSanityQueryParams = {
  documentId: string;
};

export async function InlineGalleryModule({ module }: TProps) {
  const { inlineGalleryWrapperTv } = stylesTv({ withTitle: isNotNil(module.heading) });
  const images = await Promise.all<TFormaMediaUnwrapped>(
    module.medias.map(async m => {
      const media = await runQuery(
        q
          .parameters<TSanityQueryParams>()
          .star.filterByType('formaImageAssetDocumentType', 'formaVideoAssetDocumentType')
          .filterRaw('_id == $documentId')
          .slice(0),
        { parameters: { documentId: m._ref } }
      );

      if (media._type === 'formaImageAssetDocumentType') {
        const imageInstanceData = getFormaImageInstanceData(media, { width: 1800 });

        return {
          id: media._id,
          mediaType: 'formaImageAssetDocumentType',
          ...imageInstanceData,
          brightness: 100,
          showMediaTitle: true
        } satisfies TFormaMediaUnwrapped;
      } else {
        const videoInstanceData = await getFormaVideoInstanceData(media);

        return {
          id: media._id,
          mediaType: 'formaVideoAssetDocumentType',
          ...videoInstanceData,
          brightness: 100,
          areControlsEnabled: false,
          isAutoplayEnabled: true,
          isLoopEnabled: true,
          isMuted: true,

          showMediaTitle: true
        } satisfies TFormaMediaUnwrapped;
      }
    })
  );

  const buttonSurface: ComponentProps<typeof LinkButton>['surface'] =
    module.variant === 'on-primary' ? 'primary' : 'bg';

  return (
    <BackgroundVariantContainer variant={module.variant}>
      <VerticalPaddingContainer {...module.paddings}>
        <ModuleContentContainer variant={module.variant} title={module.heading} skipContentContainer={true}>
          <div className={inlineGalleryWrapperTv()}>
            <InlineGalleryCarousel images={images} variant={module.variant} />
          </div>
          {(module.primaryCta.showCta || module.secondaryCta.showCta) && (
            <div className='mt-10 mx-4 lg:mx-auto flex flex-col lg:flex-row gap-2 lg:gap-8'>
              {module.primaryCta.showCta && (
                <LinkButton href={module.primaryCta.url} size='large' variant='primary' surface={buttonSurface}>
                  {module.primaryCta.caption}
                </LinkButton>
              )}
              {module.secondaryCta.showCta && (
                <LinkButton href={module.secondaryCta.url} size='large' variant='ghost' surface={buttonSurface}>
                  {module.secondaryCta.caption}
                </LinkButton>
              )}
            </div>
          )}
        </ModuleContentContainer>
      </VerticalPaddingContainer>
    </BackgroundVariantContainer>
  );
}

const stylesTv = tv({
  slots: {
    inlineGalleryWrapperTv: 'min-w-0'
  },
  variants: {
    withTitle: {
      true: {
        inlineGalleryWrapperTv: 'mt-10'
      }
    }
  }
});
