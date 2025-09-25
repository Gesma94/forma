import { BACKGROUND_COLOR, IMAGE_SIZE } from '@forma/common';
import Image from 'next/image';
import { tv } from 'tailwind-variants';
import type { ImageModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { getSanityImageUrl } from '@/utils/groqd-client';

type TProps = {
  module: ImageModuleDocumentType;
};

export async function ImageModule({ module }: TProps) {
  const { imageWrapperStyle, outerContainerStyle, lowerBackgroundStyle, upperBackgroundStyle, titleStyle } = style({
    size: module.size,
    upperBackground: module.upperBackground,
    lowerBackground: module.lowerBackground
  });
  const imageUrl = getSanityImageUrl(module.backgroundImage);

  return (
    <ModuleContentContainer skipContentContainer={true} skipYPadding={true}>
      <div className={outerContainerStyle()}>
        <div className={upperBackgroundStyle()} />
        <div className={lowerBackgroundStyle()} />
        <div className={imageWrapperStyle()}>
          <Image
            fill={true}
            src={imageUrl}
            priority={false}
            alt={module.title}
            className='object-cover md:shadow-[0_25px_50px_-12px_rgb(0_0_0/_78%)] rounded-2xl'
            style={{ filter: `brightness(${module.backgroundImage.brightness}%)` }}
          />
          <p className={titleStyle()}>{module.title}</p>
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
    imageWrapperStyle: 'relative rounded-2xl row-start-1 row-span-2 col-start-1 my-4 md:my-20 mx-4',
    titleStyle: `absolute bottom-2 md:bottom-10 left-2 md:left-10 bg-bg text-bg-text  px-4 py-2 rounded-2xl max-w-[calc(100%-1rem)]
      text-2xl leading-8 md:text-4xl md:leading-12
    `
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
