import { MODULE_VARIANTS } from '@forma/common';
import { tv, type VariantProps } from 'tailwind-variants';
import type { SetRequired } from 'type-fest';
import type { BrandDocumentType } from 'types/generated/sanity-types-generated';
import { getSanityImageUrl } from '@/utils/groqd-client';

type TProps = SetRequired<VariantProps<typeof style>, 'variant'> & {
  brand: BrandDocumentType;
};

export function BrandListItem({ variant, brand }: TProps) {
  const { imageTv, wrapperTv } = style({ variant });
  return (
    <li className={wrapperTv()}>
      <img className={imageTv()} key={brand._id} src={getSanityImageUrl(brand.logo)} alt={brand.logo.altText} />
    </li>
  );
}

const style = tv({
  slots: {
    wrapperTv: 'size-64 shrink-0 flex items-center justify-center p-4 rounded-2xl border',
    imageTv: 'max-w-full max-h-full'
  },
  variants: {
    variant: {
      [MODULE_VARIANTS.ON_BG]: {
        wrapperTv: 'border-primary',
        imageTv: ''
      },
      [MODULE_VARIANTS.ON_PRIMARY]: {
        wrapperTv: 'border-primary-text',
        imageTv: 'invert-[95%] sepia-[14%] saturate-[596%] hue-rotate-[348deg] brightness-[107%] contrast-[93%]'
      }
    }
  }
});
