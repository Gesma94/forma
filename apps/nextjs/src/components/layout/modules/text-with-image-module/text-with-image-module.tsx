import { ELEMENT_X_POSITION, MODULE_VARIANTS } from '@forma/common';
import { tv } from 'tailwind-variants';
import type { TextWithImageModuleDocumentType } from 'types/generated/sanity-types-generated';
import { BackgroundVariantContainer } from '@/ui/containers/background-variant-container/background-variant-container';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { VerticalPaddingContainer } from '@/ui/containers/vertical-padding-container/vertical-padding-container';
import { FormaMedia } from '@/ui/forma-media/forma-media';
import { Actions } from './subs/actions';
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
              <FormaMedia
                formaMedia={module.media}
                className='size-full object-cover rounded-2xl shadow-2xl'
                wrapper360Classname='size-full rounded-2xl overflow-hidden'
                imageBuilderOptions={{ width: 2000 }}
              />
            </div>
            <div className={textWrapper()}>
              <ContentPortableText value={module.content} variant={module.variant} />
              <Actions variant={module.variant} primaryCta={module.primaryCta} secondaryCta={module.secondaryCta} />
            </div>
          </div>
        </ModuleContentContainer>
      </VerticalPaddingContainer>
    </BackgroundVariantContainer>
  );
}

const style = tv({
  slots: {
    imageWrapper: 'hidden sm:block h-full contain-size',
    textWrapper: 'flex flex-col sm:py-10 z-10',
    contentContainer: 'grid sm:gap-10 xl:gap-20 grid-rows-1 grid-cols-1'
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
        contentContainer: 'sm:grid-cols-2 xl:grid-cols-[2fr_1fr]'
      },
      [ELEMENT_X_POSITION.RIGHT]: {
        imageWrapper: 'order-2',
        textWrapper: 'order-1',
        contentContainer: 'sm:grid-cols-2 xl:grid-cols-[1fr_2fr]'
      }
    }
  }
});
