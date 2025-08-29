import { tv } from 'tailwind-variants';

export const twoColumnLayout = tv({
  base: 'grid grid-cols-2 gap-x-20 gap-y-20'
});

export const textWithSideImage = tv({
  base: 'md:mx-auto md:max-w-3xl md:text-center xl:mx-[unset] xl:max-w-[unset] xl:text-left xl:py-image-side-spacing'
});
