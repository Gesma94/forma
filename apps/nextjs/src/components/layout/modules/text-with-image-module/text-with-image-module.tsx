import { ELEMENT_X_POSITION, MODULE_VARIANTS } from '@forma/common';
import { tv } from 'tailwind-variants';
import type { TextWithImageModuleDocumentType } from 'types/generated/sanity-types-generated';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { BackgroundVariantContainer } from '@/ui/containers/background-variant-container/background-variant-container';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { VerticalPaddingContainer } from '@/ui/containers/vertical-padding-container/vertical-padding-container';
import { FormaMedia } from '@/ui/forma-media/forma-media';
import { ContentPortableText } from './subs/content';

type TProps = {
  module: TextWithImageModuleDocumentType;
};

export async function TextWithImageModule({ module }: TProps) {
  const { imageWrapper, textWrapper, contentContainer } = style({ imagePosition: module.imagePosition });

  return (
    <BackgroundVariantContainer variant={module.variant}>
      <VerticalPaddingContainer {...module.paddings}>
        <ModuleContentContainer variant={module.variant}>
          <div className={contentContainer()}>
            <div className={imageWrapper()}>
              <FormaMedia formaMedia={module.media} className='size-full object-cover rounded-2xl shadow-2xl' />
            </div>
            <div className={textWrapper()}>
              <ContentPortableText value={module.content} variant={module.variant} />
              {module.primaryCta.showCta && (
                <div className='mt-8 grid xs:flex'>
                  <LinkButton href={module.primaryCta.url} size='large' variant='primary' surface='bg'>
                    {module.primaryCta.caption}
                  </LinkButton>
                </div>
              )}
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
    textWrapper: 'flex flex-col py-10',
    contentContainer: 'grid gap-20 grid-rows-[auto_auto] xl:grid-rows-1 grid-cols-1'
  },
  variants: {
    variant: {
      [MODULE_VARIANTS.ON_BG]: {},
      [MODULE_VARIANTS.ON_PRIMARY]: {}
    },
    imagePosition: {
      [ELEMENT_X_POSITION.LEFT]: {
        imageWrapper: 'order-1',
        textWrapper: 'order-2',
        contentContainer: ' xl:grid-cols-[2fr_1fr]'
      },
      [ELEMENT_X_POSITION.RIGHT]: {
        imageWrapper: 'order-2',
        textWrapper: 'order-1',
        contentContainer: ' xl:grid-cols-[1fr_2fr]'
      }
    }
  }
});
