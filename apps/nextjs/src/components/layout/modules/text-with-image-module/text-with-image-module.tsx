import { ELEMENT_X_POSITION, MODULE_VARIANTS } from '@forma/common';
import { tv } from 'tailwind-variants';
import type { TextWithImageModuleDocumentType } from 'types/generated/sanity-types-generated';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { BackgroundVariantContainer } from '@/ui/containers/background-variant-container/background-variant-container';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { ModuleContentContainerTitle } from '@/ui/containers/module-content-container/subs/module-content-container-title';
import { VerticalPaddingContainer } from '@/ui/containers/vertical-padding-container/vertical-padding-container';
import { FormaMedia } from '@/ui/forma-media/forma-media';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';

type TProps = {
  module: TextWithImageModuleDocumentType;
};

export async function TextWithImageModule({ module }: TProps) {
  const { imageWrapper, textWrapper } = style({ imagePosition: module.imagePosition });

  return (
    <BackgroundVariantContainer variant={module.variant}>
      <VerticalPaddingContainer {...module.paddings}>
        <ModuleContentContainer variant={module.variant}>
          <div
            className={'grid gap-x-20 gap-y-6 grid-rows-[auto_auto] grid-cols-1 xl:grid-rows-1 xl:grid-cols-[2fr_1fr]'}
          >
            <div className={imageWrapper()}>
              <FormaMedia formaMedia={module.media} className='size-full object-cover rounded-2xl shadow-2xl' />
            </div>
            <div className={textWrapper()}>
              <div className='order-2'>
                <div className='mb-4 md:mb-10'>
                  <ModuleContentContainerTitle value={module.heading} alignment='left' variant={module.variant} />
                </div>
                <ParagraphPortableText value={module.content} variant={module.variant} />
                {module.primaryCta.showCta && (
                  <div className='mt-8 grid xs:flex'>
                    <LinkButton href={module.primaryCta.url} size='large' variant='primary' surface='bg'>
                      {module.primaryCta.caption}
                    </LinkButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ModuleContentContainer>
      </VerticalPaddingContainer>
    </BackgroundVariantContainer>
  );
}

const style = tv({
  slots: {
    imageWrapper: 'contain-size',
    textWrapper: 'flex flex-col'
  },
  variants: {
    variant: {
      [MODULE_VARIANTS.ON_BG]: {},
      [MODULE_VARIANTS.ON_PRIMARY]: {}
    },
    imagePosition: {
      [ELEMENT_X_POSITION.LEFT]: {
        imageWrapper: 'order-1',
        textWrapper: 'order-2'
      },
      [ELEMENT_X_POSITION.RIGHT]: {
        imageWrapper: 'order-2',
        textWrapper: 'order-1'
      }
    }
  }
});
