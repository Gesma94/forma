import { IMAGE_X_POSITION } from '@forma/common';
import { tv } from 'tailwind-variants';
import type { ReasonsModuleDocumentType } from 'types/generated/sanity-types-generated';
import { twoColumnLayout } from '@/styles/layouts';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { ContentContainer } from '@/ui/content-container/content-container';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';
import { getSanityImageUrl } from '@/utils/groqd-client';
import { SubHeading } from './subs/sub-heading';

type TProps = {
  module: ReasonsModuleDocumentType;
};

export async function ReasonsModule({ module }: TProps) {
  const { imageWrapper, textWrapper } = style({ imagePosition: IMAGE_X_POSITION.LEFT });
  const leftImageUrl = getSanityImageUrl(module.leftImage);
  const rightImageUrl = getSanityImageUrl(module.rightImage);

  return (
    <ModuleContentContainer title={module.heading} skipContentContainer={true}>
      <ContentContainer>
        <div className='max-w-5xl mx-auto'>
          <ParagraphPortableText value={module.content} className='text-center' />
        </div>
        <div className='mt-8 w-full overflow-hidden grid grid-rows-2 gap-16'>
          <div
            className={twoColumnLayout({
              class: 'grid-rows-[auto_auto] grid-cols-1 xl:grid-rows-1 xl:grid-cols-2'
            })}
          >
            <div className={imageWrapper()}>
              <img
                className='max-h-96 size-full xl:max-h-dvh object-cover rounded-2xl shadow-2xl'
                alt={module.leftImage.altText}
                src={leftImageUrl}
              />
            </div>
            <div className={textWrapper()}>
              <div>
                <div className='mb-4'>
                  <SubHeading value={module.firstSubHeading} />
                </div>
                <ParagraphPortableText value={module.firstSubContent} />
              </div>
              <div>
                <div className='mb-4'>
                  <SubHeading value={module.secondSubHeading} />
                </div>
                <ParagraphPortableText value={module.secondSubContent} />
              </div>
            </div>
          </div>
          <div
            className={twoColumnLayout({
              class: 'grid-rows-[auto_auto] grid-cols-1 xl:grid-rows-1 xl:grid-cols-2'
            })}
          >
            <div className={imageWrapper({ imagePosition: IMAGE_X_POSITION.RIGHT })}>
              <img
                className='max-h-96 size-full xl:max-h-dvh object-cover rounded-2xl shadow-2xl'
                alt={module.rightImage.altText}
                src={rightImageUrl}
              />
            </div>
            <div className={textWrapper({ imagePosition: IMAGE_X_POSITION.RIGHT })}>
              <div>
                <div className='mb-4'>
                  <SubHeading value={module.thirdSubHeading} />
                </div>
                <ParagraphPortableText value={module.thirdSubContent} />
              </div>
              <div>
                <div className='mb-4'>
                  <SubHeading value={module.fourthSubHeading} />
                </div>
                <ParagraphPortableText value={module.fourthSubContent} />
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </ModuleContentContainer>
  );
}
const style = tv({
  slots: {
    imageWrapper: '',
    textWrapper: 'flex gap-8 my-auto flex-col xl:py-image-side-spacing'
  },
  variants: {
    imagePosition: {
      [IMAGE_X_POSITION.LEFT]: {
        imageWrapper: 'order-1',
        textWrapper: 'order-2'
      },
      [IMAGE_X_POSITION.RIGHT]: {
        imageWrapper: 'order-2',
        textWrapper: 'order-1 text-right'
      }
    }
  }
});
