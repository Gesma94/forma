import { IMAGE_X_POSITION, MODULE_VARIANTS } from '@forma/common';
import { tv } from 'tailwind-variants';
import type { TextWithImageModuleDocumentType } from 'types/generated/sanity-types-generated';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { ModuleContentContainerTitle } from '@/ui/containers/module-content-container/subs/module-content-container-title';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';
import { getSanityImageUrl } from '@/utils/groqd-client';

type TProps = {
  module: TextWithImageModuleDocumentType;
};

export function TextWithImageModule({ module }: TProps) {
  const { imageWrapper, textWrapper } = style({ imagePosition: module.image.imagePosition });
  const imageUrl = getSanityImageUrl(module.image);

  return (
    <ModuleContentContainer variant={module.variant}>
      <div className={'grid gap-x-20 gap-y-6 grid-rows-[auto_auto] grid-cols-1 xl:grid-rows-1 xl:grid-cols-[2fr_1fr]'}>
        <div className={imageWrapper()}>
          <img className='size-full object-cover rounded-2xl shadow-2xl' alt={module.image.altText} src={imageUrl} />
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
      [IMAGE_X_POSITION.LEFT]: {
        imageWrapper: 'order-1',
        textWrapper: 'order-2'
      },
      [IMAGE_X_POSITION.RIGHT]: {
        imageWrapper: 'order-2',
        textWrapper: 'order-1'
      }
    }
  }
});
