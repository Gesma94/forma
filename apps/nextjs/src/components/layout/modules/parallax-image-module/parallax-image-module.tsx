import { ELEMENT_X_POSITION } from '@forma/common';
import { getFormaImageData } from 'common/utils/get-forma-image';
import { tv } from 'tailwind-variants';
import type { ParallaxImagesModuleDocumentType } from 'types/generated/sanity-types-generated';
import { BackgroundVariantContainer } from '@/ui/containers/background-variant-container/background-variant-container';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { VerticalPaddingContainer } from '@/ui/containers/vertical-padding-container/vertical-padding-container';
import { ParallaxImage } from './subs/parallax-image';

type TProps = {
  module: ParallaxImagesModuleDocumentType;
};

export async function ParallaxImageModule({ module }: TProps) {
  const { smallImageWrapperTv, bigImageWrapperTv, imagesContainerTv } = styleTv({
    bigImagePosition: module.bigImagePosition
  });

  const [leftImageData, rightImageData] = await Promise.all([
    getFormaImageData(module.imagePair.leftImage),
    getFormaImageData(module.imagePair.rightImage)
  ]);

  return (
    <BackgroundVariantContainer variant={module.variant}>
      <VerticalPaddingContainer {...module.paddings}>
        <ModuleContentContainer variant={module.variant}>
          <div className={imagesContainerTv()}>
            <div className={bigImageWrapperTv()}>
              <ParallaxImage
                imageUrl={leftImageData.imageUrl}
                altText={leftImageData.imageAltText}
                isSmallImage={false}
              />
            </div>
            <div className={smallImageWrapperTv()}>
              <ParallaxImage
                imageUrl={rightImageData.imageUrl}
                altText={rightImageData.imageAltText}
                isSmallImage={true}
              />
            </div>
          </div>
        </ModuleContentContainer>
      </VerticalPaddingContainer>
    </BackgroundVariantContainer>
  );
}

const styleTv = tv({
  slots: {
    imagesContainerTv: 'size-full grid grid-cols-[5fr_2fr] gap-20 max-h-dvh h-[980px]',
    bigImageWrapperTv: 'rounded-2xl relative row-start-1 contain-size',
    smallImageWrapperTv: 'rounded-2xl relative h-3/4 row-start-1 self-center contain-size'
  },
  variants: {
    bigImagePosition: {
      [ELEMENT_X_POSITION.LEFT]: {
        imagesContainerTv: 'grid-cols-[5fr_2fr]',
        bigImageWrapperTv: 'col-start-1',
        smallImageWrapperTv: 'col-start-2'
      },
      [ELEMENT_X_POSITION.RIGHT]: {
        imagesContainerTv: 'grid-cols-[2fr_5fr]',
        bigImageWrapperTv: 'col-start-2',
        smallImageWrapperTv: 'col-start-1'
      }
    }
  }
});
