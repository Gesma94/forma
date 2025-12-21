import { BACKGROUND_COLOR, IMAGE_SIZE, MODULE_VARIANTS } from '@forma/common';
import { getFormaImageData } from 'common/utils/get-forma-image';
import { isNotNil } from 'es-toolkit';
import Image from 'next/image';
import { tv } from 'tailwind-variants';
import type { ImageModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';

type TProps = {
  module: ImageModuleDocumentType;
};

export async function ImageModule({ module }: TProps) {
  const { imageWrapperStyle, outerContainerStyle, lowerBackgroundStyle, upperBackgroundStyle } = style({
    size: module.size,
    upperBackground: module.upperBackground,
    lowerBackground: module.lowerBackground
  });
  const backgroundImageData = await getFormaImageData(module.backgroundImage);

  return (
    <ModuleContentContainer skipContentContainer={true} skipYPadding={true} variant={MODULE_VARIANTS.ON_BG}>
      <div className={outerContainerStyle()}>
        <div className={upperBackgroundStyle()} />
        <div className={lowerBackgroundStyle()} />
        <div className={imageWrapperStyle()}>
          <Image
            fill={true}
            priority={false}
            src={backgroundImageData.imageUrl}
            alt={backgroundImageData.imageAltText}
            className='object-cover md:shadow-[0_25px_50px_-12px_rgb(0_0_0/_78%)] rounded-2xl'
            style={{ filter: `brightness(${module.backgroundImage.brightness}%)` }}
          />
          {isNotNil(module.title) && (
            <div className='absolute bottom-4 left-4  text-primary-text  text-shadow-xl text-lg'>
              <p className='text-md'>{module.title}</p>
            </div>
          )}
        </div>
      </div>
    </ModuleContentContainer>
  );
}

const style = tv({
  slots: {
    outerContainerStyle: 'max-h-dvh grid grid-rows-2 grid-cols-1',
    upperBackgroundStyle: 'row-start-1 col-start-1',
    lowerBackgroundStyle: 'row-start-2 col-start-1',
    imageWrapperStyle: 'relative rounded-2xl row-start-1 row-span-2 col-start-1 my-4 md:my-20 mx-4'
  },
  variants: {
    size: {
      [IMAGE_SIZE.XS]: { outerContainerStyle: 'h-80' },
      [IMAGE_SIZE.MD]: { outerContainerStyle: 'h-[35rem]' },
      [IMAGE_SIZE.LG]: { outerContainerStyle: 'h-[50rem]' },
      [IMAGE_SIZE.XL]: { outerContainerStyle: 'h-[75rem]' },
      [IMAGE_SIZE.VH]: { outerContainerStyle: 'h-dvh' }
    },
    upperBackground: {
      [BACKGROUND_COLOR.BG]: { upperBackgroundStyle: 'bg-bg' },
      [BACKGROUND_COLOR.PRIMARY]: { upperBackgroundStyle: 'bg-primary' }
    },
    lowerBackground: {
      [BACKGROUND_COLOR.BG]: { lowerBackgroundStyle: 'bg-bg' },
      [BACKGROUND_COLOR.PRIMARY]: { lowerBackgroundStyle: 'bg-primary' }
    }
  }
});
