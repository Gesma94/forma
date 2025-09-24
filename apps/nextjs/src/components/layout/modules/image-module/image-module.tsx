import { IMAGE_SIZE } from '@forma/common';
import Image from 'next/image';
import { tv } from 'tailwind-variants';
import type { ImageModuleDocumentType } from 'types/generated/sanity-types-generated';
import { getSanityImageUrl } from '@/utils/groqd-client';

type TProps = {
  module: ImageModuleDocumentType;
};

export async function ImageModule({ module }: TProps) {
  const containerStyle = style({ size: module.size });
  const imageUrl = getSanityImageUrl(module.backgroundImage);

  return (
    <div className={containerStyle}>
      <Image
        fill={true}
        src={imageUrl}
        priority={false}
        alt={module.backgroundImage.altText}
        className='object-cover object-bottom'
        style={{ filter: `brightness(${module.backgroundImage.brightness}%)` }}
      />
    </div>
  );
}

const style = tv({
  base: 'relative',
  variants: {
    size: {
      [IMAGE_SIZE.XS]: 'h-80',
      [IMAGE_SIZE.MD]: 'h-[35rem]',
      [IMAGE_SIZE.LG]: 'h-[50rem]',
      [IMAGE_SIZE.XL]: 'h-[75rem]',
      [IMAGE_SIZE.VH]: 'h-dvh'
    }
  }
});
