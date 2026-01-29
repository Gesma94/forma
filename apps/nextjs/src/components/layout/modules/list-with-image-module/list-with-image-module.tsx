import { ELEMENT_X_POSITION } from '@forma/common';
import { isNotNil } from 'es-toolkit';
import { tv } from 'tailwind-variants';
import type { ListWithImageModuleDocumentType } from 'types/generated/sanity-types-generated';
import { BackgroundVariantContainer } from '@/ui/containers/background-variant-container/background-variant-container';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { VerticalPaddingContainer } from '@/ui/containers/vertical-padding-container/vertical-padding-container';
import { FormaMedia } from '@/ui/forma-media/forma-media';
import { ListTextItem } from '../studio-module/subs/list-text-item';
import { Heading } from './subs/heading';

type TProps = {
  module: ListWithImageModuleDocumentType;
};

export async function ListWithImageModule({ module }: TProps) {
  const { imageWrapper, textWrapper, contentContainer } = stylesTv({ imagePosition: module.imagePosition });
  return (
    <BackgroundVariantContainer variant={module.variant}>
      <VerticalPaddingContainer {...module.paddings}>
        <ModuleContentContainer variant={module.variant}>
          <div className={contentContainer()}>
            <div className={imageWrapper()}>
              <FormaMedia
                formaMedia={module.formaMedia}
                className='size-full xl:max-h-dvh object-cover rounded-2xl'
                wrapper360Classname='size-full overflow-hidden rounded-2xl'
                imageBuilderOptions={{ width: 2000 }}
              />
            </div>
            <div className={textWrapper()}>
              {isNotNil(module.heading) && (
                <div>
                  <Heading value={module.heading} imagePosition={module.imagePosition} />
                </div>
              )}
              <div className='flex gap-8 my-auto flex-col'>
                {module.items.map(item => (
                  <ListTextItem
                    key={item._key}
                    caption={item.caption}
                    heading={item.heading}
                    imagePosition={module.imagePosition}
                  />
                ))}
              </div>
            </div>
          </div>
        </ModuleContentContainer>
      </VerticalPaddingContainer>
    </BackgroundVariantContainer>
  );
}

const stylesTv = tv({
  slots: {
    imageWrapper: 'hidden sm:block h-full contain-size',
    textWrapper: 'flex flex-col gap-10',
    contentContainer: 'grid sm:gap-10 xl:gap-20 grid-rows-1 grid-cols-1'
  },
  variants: {
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
