import { MODULE_VARIANTS } from '@forma/common';
import { getImageAltText } from 'common/utils/get-image-alt-text';
import { tv } from 'tailwind-variants';
import type { ParallaxImagesModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { ContentContainer } from '@/ui/content-container/content-container';
import { getSanityImageUrl } from '@/utils/groqd-client';
import { ParallaxImage } from './subs/parallax-image';

type TProps = {
  module: ParallaxImagesModuleDocumentType;
};

export function ParallaxImageModule({ module }: TProps) {
  const { smallImageWrapperTv, bigImageWrapperTv, pairContainerTv, imagesContainerTv } = styleTv();

  const imagesUrls = module.imagePairs.map(x => ({
    leftImageUrl: getSanityImageUrl(x.leftImage),
    rightImageUrl: getSanityImageUrl(x.rightImage)
  }));

  return (
    <ModuleContentContainer skipContentContainer={true} skipYPadding={true}>
      <div className='flex flex-col'>
        {module.imagePairs.map((m, i) => {
          const variant = m.variant;
          const isEven = i % 2 === 0;
          const sameVariantAsPrevious = i === 0 ? false : variant === module.imagePairs[i - 1].variant;

          return (
            <div key={m._key} className={pairContainerTv({ variant, isEven, sameVariantAsPrevious })}>
              <ContentContainer>
                <div className={imagesContainerTv({ isEven })}>
                  <div className={bigImageWrapperTv({ isEven: i % 2 === 0 })}>
                    <ParallaxImage
                      imageUrl={imagesUrls[i].leftImageUrl}
                      altText={getImageAltText(m.leftImage)}
                      isSmallImage={false}
                    />
                  </div>
                  <div className={smallImageWrapperTv({ isEven: i % 2 === 0 })}>
                    <ParallaxImage
                      imageUrl={imagesUrls[i].rightImageUrl}
                      altText={getImageAltText(m.rightImage)}
                      isSmallImage={true}
                    />
                  </div>
                </div>
              </ContentContainer>
            </div>
          );
        })}
      </div>
    </ModuleContentContainer>
  );
}

const styleTv = tv({
  slots: {
    pairContainerTv: 'py-10 md:py-20 max-h-dvh h-[980px] w-full',
    imagesContainerTv: 'size-full grid grid-cols-[5fr_2fr] gap-20',
    bigImageWrapperTv: 'rounded-2xl relative row-start-1 contain-size',
    smallImageWrapperTv: 'rounded-2xl relative h-3/4 row-start-1 self-center contain-size'
  },
  variants: {
    variant: {
      [MODULE_VARIANTS.ON_BG]: {
        pairContainerTv: 'bg-bg'
      },
      [MODULE_VARIANTS.ON_PRIMARY]: {
        pairContainerTv: 'bg-primary'
      }
    },
    isEven: {
      true: {
        imagesContainerTv: 'grid-cols-[5fr_2fr]',
        bigImageWrapperTv: 'col-start-1',
        smallImageWrapperTv: 'col-start-2'
      },
      false: {
        imagesContainerTv: 'grid-cols-[2fr_5fr]',
        bigImageWrapperTv: 'col-start-2',
        smallImageWrapperTv: 'col-start-1'
      }
    },
    sameVariantAsPrevious: {
      true: {
        pairContainerTv: 'pt-0 md:pt-0'
      },
      false: {}
    }
  }
});
